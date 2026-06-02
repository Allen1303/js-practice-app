import { useState, useEffect, useMemo } from "react";
import { AnimatePresence } from "motion/react";
import { CONCEPTS as RAW_CONCEPTS } from "./data/exercises.js";
import {
  KNOWLEDGE_MAP_CATEGORIES,
  KNOWLEDGE_MAP_TOPICS,
} from "./data/knowledgeMap.js";
import { runExerciseTests, runCustomEvaluation } from "./utils/executor.js";
import {
  getSampleUsage,
  getTopDeclarations,
  getBottomUsage,
  getFullExerciseTemplate,
} from "./utils/sampleGenerator.js";

// Import modular sub-components
import { Header } from "./components/Header.jsx";
import { ConceptSelector } from "./components/ConceptSelector.jsx";
import { ExerciseNavigator } from "./components/ExerciseNavigator.jsx";
import { TheoryPanel } from "./components/TheoryPanel.jsx";
import { ProblemGoalPanel } from "./components/ProblemGoalPanel.jsx";
import { CodeWorkspace } from "./components/CodeWorkspace.jsx";
import { AssertionConsole } from "./components/AssertionConsole.jsx";
import { Roadmap } from "./components/Roadmap.jsx";
import { MasteryCelebration } from "./components/MasteryCelebration.jsx";
import { ES6CheatSheet } from "./components/ES6CheatSheet.jsx";
import { NotesPanel } from "./components/NotesPanel.jsx";
import { VisualSandbox } from "./components/VisualSandbox.jsx";
import { FlashcardWorkspace } from "./components/FlashcardWorkspace.jsx";
import { BrowserSimulator } from "./components/BrowserSimulator.jsx";

import {
  CheckCircle,
  Code,
  BookOpen,
  Sparkles,
  Edit3,
  RotateCcw,
  Globe,
} from "lucide-react";

// Absolute order of concepts from Core Foundations to Practical Algorithms
const CONCEPTS_ORDER = [
  "string-parsing",
  "optional-chaining-coalescing",
  "array-search-verification",
  "map-callbacks",
  "filter-callbacks",
  "reduce-callbacks",
  "object-dictionaries",
  "spread-destructuring-unpack",
  "set-unique-collections",
  "es6-maps-collections",
  "closures-scoping",
  "two-pointer-sliding-window", // Promises & async
  "recursion-call-stack",
  "linked-lists-trees", // Dates & Milestones
  "oop-classes-prototype",
  "fcc-basic-algorithms",
  "stack-queue-dsa",
  "basic-algorithm-scripting",
  "intermediate-algorithm-scripting",
];

const CONCEPTS = [...RAW_CONCEPTS].sort((a, b) => {
  const indexA = CONCEPTS_ORDER.indexOf(a.id);
  const indexB = CONCEPTS_ORDER.indexOf(b.id);
  return (indexA !== -1 ? indexA : 99) - (indexB !== -1 ? indexB : 99);
});

export default function App() {
  // Navigation / Active Selection State
  const [activeConceptId, setActiveConceptId] = useState(CONCEPTS[0].id);
  const [activeExerciseIndex, setActiveExerciseIndex] = useState(0);
  const [journeyPreviewIdx, setJourneyPreviewIdx] = useState(0);
  const [showPrevReference, setShowPrevReference] = useState(false);

  // Sync journey preview index when active exercise changes
  useEffect(() => {
    setJourneyPreviewIdx(activeExerciseIndex);
  }, [activeExerciseIndex, activeConceptId]);

  // Left side Tab selection ("theory" | "problem")
  const [leftTab, setLeftTab] = useState("problem");

  // Choose sub-view inside sandbox: "learn" (study guide page) or "practice" (code editor challenge)
  const [sandboxView, setSandboxView] = useState("learn");

  // User source code dictionary
  const [userCodes, setUserCodes] = useState({});

  // Solved exercise tracking
  const [solvedExercises, setSolvedExercises] = useState({});

  // Active testing states
  const [testResults, setTestResults] = useState(null);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [activeHintsCount, setActiveHintsCount] = useState(0);

  // Persistent Auto-Run state mimicking learnjavascript.online
  const [autoRun, setAutoRun] = useState(() => {
    try {
      const stored = localStorage.getItem("learnjs_autorun_tests");
      return stored === "true";
    } catch {
      return false;
    }
  });

  const toggleAutoRun = () => {
    const nextVal = !autoRun;
    setAutoRun(nextVal);
    try {
      localStorage.setItem("learnjs_autorun_tests", String(nextVal));
    } catch {}
  };

  // Handle moving to the next exercise/concept seamlessly (like learnjavascript.online)
  const handleNextStep = () => {
    if (activeExerciseIndex < activeConcept.exercises.length - 1) {
      setActiveExerciseIndex(activeExerciseIndex + 1);
      setLeftTab("problem");
    } else {
      // Find the next concept
      const currentIdx = CONCEPTS.findIndex((c) => c.id === activeConceptId);
      if (currentIdx !== -1 && currentIdx < CONCEPTS.length - 1) {
        const nextConcept = CONCEPTS[currentIdx + 1];
        setActiveConceptId(nextConcept.id);
        setActiveExerciseIndex(0);
        setSandboxView("learn");
        setLeftTab("theory");
      }
    }
  };

  // Knowledge Map / Curriculum view states
  const [viewMode, setViewMode] = useState("sandbox"); // "sandbox" | "knowledge"
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("all");
  const [completedTopics, setCompletedTopics] = useState({});
  const [expandedTopicId, setExpandedTopicId] = useState(null);

  // Adjustable workspace height state with localStorage auto-saving
  const [workspaceHeight, setWorkspaceHeight] = useState(() => {
    try {
      const stored = localStorage.getItem("learnjs_workspace_height");
      return stored ? parseInt(stored, 10) : 500; // default for 20 lines
    } catch {
      return 500;
    }
  });

  const saveWorkspaceHeight = (h) => {
    setWorkspaceHeight(h);
    try {
      localStorage.setItem("learnjs_workspace_height", h.toString());
    } catch (e) {
      console.warn("Storage write failed", e);
    }
  };

  // Load and apply persistent progress from localStorage
  useEffect(() => {
    try {
      const defaultTemplates = {};
      CONCEPTS.forEach((c) => {
        c.exercises.forEach((e) => {
          defaultTemplates[e.id] = getFullExerciseTemplate(e);
        });
      });

      const storedCodes = localStorage.getItem("learnjs_play_codes");
      if (storedCodes) {
        const parsed = JSON.parse(storedCodes);
        const upgraded = { ...defaultTemplates };
        Object.keys(parsed).forEach((key) => {
          const exercise = CONCEPTS.flatMap((c) => c.exercises).find(
            (e) => e.id === key,
          );
          if (exercise) {
            const originalTemplate = exercise.codeTemplate;
            const parsedVal = parsed[key];
            let nextVal = parsedVal;
            if (
              key === "string-template-interpolation" &&
              typeof nextVal === "string"
            ) {
              // Replace old stale expected comments to prevent user confusion
              nextVal = nextVal.replace(
                /Welcome,\s*Alice!\s*Your\s*role\s*is:\s*admin\./gi,
                "Welcome Alice, your role is admin",
              );
              nextVal = nextVal.replace(
                /Welcome,\s*Bob!\s*Your\s*role\s*is:\s*moderator\./gi,
                "Welcome Bob, your role is moderator",
              );
              // Correct the colon insertion so active code matches official assert expectations
              nextVal = nextVal.replace(
                /your\s*role\s*is:\s*\$\{role\}/gi,
                "your role is ${role}",
              );
            }

            const cleanParsed =
              typeof parsedVal === "string"
                ? parsedVal.split("// Sample usage")[0].trim()
                : "";
            const cleanOriginal =
              typeof originalTemplate === "string"
                ? originalTemplate.trim()
                : "";
            const cleanTopOriginal = (
              getTopDeclarations(exercise) + originalTemplate
            ).trim();

            if (typeof nextVal === "string") {
              const funcBody = nextVal.split("// Sample usage")[0].trim();
              const topDecs = getTopDeclarations(exercise);

              if (
                cleanParsed === cleanOriginal ||
                cleanParsed === cleanTopOriginal ||
                !parsedVal ||
                parsedVal === originalTemplate
              ) {
                upgraded[key] = getFullExerciseTemplate(exercise);
              } else {
                // Keep custom body, ensure it has top declarations
                let upgradedBody = funcBody;
                if (topDecs && !upgradedBody.includes(topDecs.trim())) {
                  upgradedBody = topDecs + upgradedBody;
                }
                upgraded[key] = upgradedBody + getBottomUsage(exercise);
              }
            } else {
              upgraded[key] = getFullExerciseTemplate(exercise);
            }
          } else {
            upgraded[key] = parsed[key];
          }
        });
        setUserCodes(upgraded);
        try {
          localStorage.setItem("learnjs_play_codes", JSON.stringify(upgraded));
        } catch (storageErr) {
          console.warn(
            "Could not save migrated codes on initialization: ",
            storageErr,
          );
        }
      } else {
        setUserCodes(defaultTemplates);
      }

      const storedProgress = localStorage.getItem("learnjs_play_progress");
      if (storedProgress) {
        setSolvedExercises(JSON.parse(storedProgress));
      }

      const storedTopics = localStorage.getItem("learnjs_covered_topics");
      if (storedTopics) {
        setCompletedTopics(JSON.parse(storedTopics));
      }
    } catch (e) {
      console.error("Error reading localStorage", e);
    }
  }, []);

  const toggleTopicProgress = (topicId) => {
    const updated = {
      ...completedTopics,
      [topicId]: !completedTopics[topicId],
    };
    setCompletedTopics(updated);
    try {
      localStorage.setItem("learnjs_covered_topics", JSON.stringify(updated));
    } catch (e) {
      console.warn("Storage write failed", e);
    }
  };

  const clearAllMarkers = () => {
    if (confirm("Reset all custom syllabus checkbox markers?")) {
      setCompletedTopics({});
      localStorage.removeItem("learnjs_covered_topics");
    }
  };

  const handleResetFullWorkspace = () => {
    if (
      confirm(
        "⚠️ CRITICAL RESET ⚠️\n\nThis action will completely delete all of your:\n- Solved progress indicators\n- Custom modified solutions\n- Checklist markers on the Roadmap\n- Interactive Notebook notes\n\nAre you sure you want to delete everything and start fresh?",
      )
    ) {
      if (
        confirm(
          "Confirm one final time: This cannot be undone. Are you absolutely sure?",
        )
      ) {
        try {
          localStorage.removeItem("learnjs_play_codes");
          localStorage.removeItem("learnjs_play_progress");
          localStorage.removeItem("learnjs_covered_topics");
          localStorage.removeItem("learnjs_play_notes");

          setSolvedExercises({});
          setCompletedTopics({});

          const defaultTemplates = {};
          CONCEPTS.forEach((c) => {
            c.exercises.forEach((e) => {
              defaultTemplates[e.id] = getFullExerciseTemplate(e);
            });
          });
          setUserCodes(defaultTemplates);
          setTestResults(null);

          alert(
            "Reset successful. All states restored to pristine default conditions.",
          );
          window.location.reload();
        } catch (err) {
          alert("Error resetting profile: " + err.message);
        }
      }
    }
  };

  // Save changes to localStorage on state changes
  const saveCodesToStorage = (updatedCodes) => {
    setUserCodes(updatedCodes);
    try {
      localStorage.setItem("learnjs_play_codes", JSON.stringify(updatedCodes));
    } catch (e) {
      console.warn("Storage write failed", e);
    }
  };

  const saveProgressToStorage = (updatedProgress) => {
    setSolvedExercises(updatedProgress);
    try {
      localStorage.setItem(
        "learnjs_play_progress",
        JSON.stringify(updatedProgress),
      );
    } catch (e) {
      console.warn("Storage write failed", e);
    }
  };

  // Select active values
  const activeConcept =
    CONCEPTS.find((c) => c.id === activeConceptId) || CONCEPTS[0];
  const activeExercise =
    activeConcept.exercises[activeExerciseIndex] || activeConcept.exercises[0];

  const currentCode = useMemo(() => {
    const code = userCodes[activeExercise.id];
    if (!code) {
      return getFullExerciseTemplate(activeExercise);
    }
    if (
      code === activeExercise.codeTemplate &&
      !code.includes("// Sample usage")
    ) {
      return getFullExerciseTemplate(activeExercise);
    }
    return code;
  }, [userCodes, activeExercise]);

  const prevExercise =
    activeExerciseIndex > 0
      ? activeConcept.exercises[activeExerciseIndex - 1]
      : null;

  const prevCode = useMemo(() => {
    if (!prevExercise) return "";
    const code = userCodes[prevExercise.id];
    if (!code) {
      return getFullExerciseTemplate(prevExercise);
    }
    if (
      code === prevExercise.codeTemplate &&
      !code.includes("// Sample usage")
    ) {
      return getFullExerciseTemplate(prevExercise);
    }
    return code;
  }, [userCodes, prevExercise]);

  // Reset hint count whenever switching exercises
  useEffect(() => {
    setActiveHintsCount(0);
    setTestResults(null);
  }, [activeConceptId, activeExerciseIndex]);

  // Handle source edits
  const handleCodeChange = (val) => {
    const updated = { ...userCodes, [activeExercise.id]: val };
    saveCodesToStorage(updated);
  };

  // Debounced auto-test execution on type (LearnJavaScript style)
  useEffect(() => {
    if (!autoRun) return;

    const timer = setTimeout(async () => {
      try {
        const evaluation = await runExerciseTests(activeExercise, currentCode);
        setTestResults(evaluation);

        const allPassed =
          evaluation.results &&
          evaluation.results.length > 0 &&
          evaluation.results.every((res) => res.passed);
        if (allPassed) {
          const updatedProgress = {
            ...solvedExercises,
            [activeExercise.id]: true,
          };
          saveProgressToStorage(updatedProgress);
        }
      } catch (err) {
        console.error("Auto-run tests exception: ", err);
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [currentCode, autoRun, activeExercise.id]);

  // Reset template action
  const handleResetCode = () => {
    if (
      confirm(
        "Are you sure you want to reset this exercise to its default starter code? Any changes will be overwritten.",
      )
    ) {
      const updated = {
        ...userCodes,
        [activeExercise.id]: getFullExerciseTemplate(activeExercise),
      };
      saveCodesToStorage(updated);
      setTestResults(null);
    }
  };

  // Evaluate execution tests
  const handleRunTests = async () => {
    setIsRunningTests(true);
    setTestResults(null);

    // Simulate slight lag to make testing feel organic and rewarding
    await new Promise((resolve) => setTimeout(resolve, 350));

    try {
      const evaluation = await runExerciseTests(activeExercise, currentCode);
      setTestResults(evaluation);

      const allPassed =
        evaluation.results &&
        evaluation.results.length > 0 &&
        evaluation.results.every((res) => res.passed);
      if (allPassed) {
        const updatedProgress = {
          ...solvedExercises,
          [activeExercise.id]: true,
        };
        saveProgressToStorage(updatedProgress);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsRunningTests(false);
    }
  };

  // Calculate stats
  const totalExercisesCount = CONCEPTS.reduce(
    (sum, c) => sum + c.exercises.length,
    0,
  );
  const totalSolvedCount = Object.keys(solvedExercises).filter(
    (id) => solvedExercises[id],
  ).length;

  const currentConceptSolvedCount = activeConcept.exercises.filter(
    (e) => solvedExercises[e.id],
  ).length;
  const isConceptMastered =
    currentConceptSolvedCount === activeConcept.exercises.length;

  const currentExerciseStatus = solvedExercises[activeExercise.id];

  // Incremental Hint Reveal
  const handleRevealHint = () => {
    if (activeHintsCount < activeExercise.hints.length) {
      setActiveHintsCount(activeHintsCount + 1);
    }
  };

  // Keyboard shortcuts mimicking learnjavascript.online
  const handleKeyDown = (e) => {
    // Cmd+Enter, Ctrl+Enter or Cmd+S, Ctrl+S to run tests
    if (
      (e.metaKey || e.ctrlKey) &&
      (e.key === "Enter" || e.key.toLowerCase() === "s")
    ) {
      e.preventDefault();
      handleRunTests();
      return;
    }

    // Alt + H to reveal next hint
    if (e.altKey && e.key.toLowerCase() === "h") {
      e.preventDefault();
      handleRevealHint();
      return;
    }

    // Alt + ArrowRight to go to next step
    if (e.altKey && e.key === "ArrowRight") {
      e.preventDefault();
      handleNextStep();
      return;
    }

    // Alt + ArrowLeft to go to previous step
    if (e.altKey && e.key === "ArrowLeft") {
      e.preventDefault();
      if (activeExerciseIndex > 0) {
        setActiveExerciseIndex(activeExerciseIndex - 1);
        setLeftTab("problem");
      }
      return;
    }
  };

  // Jump straight from syllabus topic to corresponding code practice exercise
  const jumpToExercise = (exerciseId) => {
    for (const concept of CONCEPTS) {
      const idx = concept.exercises.findIndex((e) => e.id === exerciseId);
      if (idx !== -1) {
        setActiveConceptId(concept.id);
        setActiveExerciseIndex(idx);
        setViewMode("sandbox");
        setSandboxView("practice");
        setLeftTab("problem");
        return;
      }
    }
  };

  // Sort knowledge map topics in the same order as CONCEPTS in interactive tab
  const sortedKnowledgeMapTopics = useMemo(() => {
    return [...KNOWLEDGE_MAP_TOPICS].sort((a, b) => {
      const idxA = CONCEPTS.findIndex((c) =>
        c.exercises.some((ex) => ex.id === a.relatedExerciseId),
      );
      const idxB = CONCEPTS.findIndex((c) =>
        c.exercises.some((ex) => ex.id === b.relatedExerciseId),
      );

      const posA = idxA !== -1 ? idxA : 999;
      const posB = idxB !== -1 ? idxB : 999;

      if (posA !== posB) {
        return posA - posB;
      }

      return KNOWLEDGE_MAP_TOPICS.indexOf(a) - KNOWLEDGE_MAP_TOPICS.indexOf(b);
    });
  }, []);

  const sortedKnowledgeMapCategories = useMemo(() => {
    return [...KNOWLEDGE_MAP_CATEGORIES].sort((a, b) => {
      const firstTopicIndexA = sortedKnowledgeMapTopics.findIndex(
        (t) => t.categoryId === a.id,
      );
      const firstTopicIndexB = sortedKnowledgeMapTopics.findIndex(
        (t) => t.categoryId === b.id,
      );

      const posA = firstTopicIndexA !== -1 ? firstTopicIndexA : 999;
      const posB = firstTopicIndexB !== -1 ? firstTopicIndexB : 999;

      return posA - posB;
    });
  }, [sortedKnowledgeMapTopics]);

  // Curriculum stats calculations
  const totalTopicsCount = sortedKnowledgeMapTopics.length;
  const completedTopicsCount = Object.keys(completedTopics).filter(
    (id) => completedTopics[id],
  ).length;
  const completionRatePercent =
    totalTopicsCount > 0
      ? Math.round((completedTopicsCount / totalTopicsCount) * 100)
      : 0;

  // Line wrapping logic for custom editor lines
  const lineCount = currentCode.split("\n").length;
  const lineNumbers = Array.from(
    { length: Math.max(lineCount, 20) },
    (_, i) => i + 1,
  );

  return (
    <div className="h-screen max-h-screen overflow-hidden bg-zinc-50 text-zinc-900 flex flex-col font-sans selection:bg-yellow-200 selection:text-zinc-900 md:h-screen md:max-h-screen md:overflow-hidden">
      {/* Universal Sticky Header Component */}
      <Header
        totalSolvedCount={totalSolvedCount}
        totalExercisesCount={totalExercisesCount}
        viewMode={viewMode}
        setViewMode={setViewMode}
        handleResetFullWorkspace={handleResetFullWorkspace}
      />

      {/* Primary Content View Switch */}
      {viewMode === "flashcards" ? (
        <FlashcardWorkspace />
      ) : viewMode === "sandbox" ? (
        sandboxView === "learn" ? (
          <main className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0 min-w-0">
            {/* Chapter & Concept Navigation Column */}
            <ConceptSelector
              concepts={CONCEPTS}
              solvedExercises={solvedExercises}
              activeConceptId={activeConceptId}
              setActiveConceptId={setActiveConceptId}
              setActiveExerciseIndex={setActiveExerciseIndex}
              setLeftTab={setLeftTab}
              setSandboxView={setSandboxView}
            />

            {/* Spacious Concept Study Hub Content Area */}
            <div className="flex-1 overflow-y-auto bg-white border-l border-zinc-200">
              <div className="max-w-4xl mx-auto py-10 px-6 sm:px-10">
                <TheoryPanel
                  activeConcept={activeConcept}
                  activeExerciseIndex={activeExerciseIndex}
                  setActiveExerciseIndex={setActiveExerciseIndex}
                  setLeftTab={setLeftTab}
                  setSandboxView={setSandboxView}
                />
              </div>
            </div>
          </main>
        ) : (
          <main className="flex-1 flex flex-col overflow-hidden min-h-0 min-w-0">
            {/* Compact Practice Workspace Header / Navigation Strip */}
            <div className="bg-zinc-900 border-b border-zinc-850 px-6 py-2.5 flex items-center justify-between shrink-0 shadow-sm text-white">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSandboxView("learn")}
                  className="flex items-center gap-2 text-xs font-mono font-bold text-zinc-300 hover:text-white px-3 py-1.5 rounded-lg border border-zinc-805 hover:border-zinc-700 bg-zinc-950/60 transition-all cursor-pointer shadow-inner active:scale-95"
                >
                  <span>←</span> Back to Study Guide
                </button>
                <div className="h-4 w-[1px] bg-zinc-800 hidden sm:block"></div>
                <div className="hidden sm:block">
                  <span className="text-[9px] font-mono text-zinc-400 uppercase font-semibold">
                    Active Concept
                  </span>
                  <p className="text-xs font-bold font-sans text-zinc-200 leading-none">
                    {activeConcept.title}
                  </p>
                </div>
              </div>

              {/* Quick pagination stepping indicators inside heading bar */}
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-zinc-400 font-bold hidden md:inline">
                  Practice Steps:
                </span>
                <div className="flex bg-zinc-950 rounded-lg p-1 border border-zinc-800 overflow-x-auto select-none">
                  {activeConcept.exercises.map((ex, idx) => {
                    const isCur = idx === activeExerciseIndex;
                    const isSol = solvedExercises[ex.id];
                    return (
                      <button
                        key={ex.id}
                        onClick={() => setActiveExerciseIndex(idx)}
                        className={`h-7 w-7 rounded-md text-[11px] font-mono font-bold flex items-center justify-center transition-all cursor-pointer ${
                          isCur
                            ? "bg-[#F7DF1E] text-zinc-955 shadow-md transform scale-105"
                            : isSol
                              ? "text-emerald-400 hover:bg-zinc-90 w-7 h-7"
                              : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900"
                        }`}
                        title={ex.title}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Two-Column Editor Pane Split (Free from Chapter selection crowding!) */}
            <section className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0 min-w-0">
              {/* Left Column: Learning Materials / Guidelines Tabbed View */}
              <div className="w-full md:w-1/2 border-b md:border-b-0 md:border-r border-zinc-200 flex flex-col bg-[#faf8f5] overflow-y-auto min-h-0 min-w-0">
                {/* Top Selector ribbon for individual puzzle repetition status */}
                <ExerciseNavigator
                  activeConcept={activeConcept}
                  activeExerciseIndex={activeExerciseIndex}
                  setActiveExerciseIndex={setActiveExerciseIndex}
                  setLeftTab={setLeftTab}
                  solvedExercises={solvedExercises}
                  currentConceptSolvedCount={currentConceptSolvedCount}
                />

                {/* Guide/Goal Selection controls */}
                <div className="flex border-b border-zinc-200 bg-zinc-100/60 p-0.5 shrink-0 select-none overflow-x-auto">
                  <button
                    onClick={() => setLeftTab("problem")}
                    className={`flex-1 min-w-[110px] py-1 px-2 rounded-md text-[11px] font-bold font-mono tracking-tight flex items-center justify-center gap-1 transition-colors cursor-pointer ${
                      leftTab === "problem"
                        ? "bg-white text-zinc-950 border border-zinc-200 shadow-sm"
                        : "text-zinc-500 hover:text-zinc-950"
                    }`}
                  >
                    <Code className="h-3 w-3 shrink-0" />
                    <span className="whitespace-nowrap">Problem Goal</span>
                  </button>

                  <button
                    onClick={() => setLeftTab("browser")}
                    className={`flex-1 min-w-[110px] py-1 px-2 rounded-md text-[11px] font-bold font-mono tracking-tight flex items-center justify-center gap-1 transition-colors cursor-pointer ${
                      leftTab === "browser"
                        ? "bg-white text-zinc-950 border border-emerald-400 shadow-sm font-extrabold"
                        : "text-zinc-500 hover:text-zinc-950"
                    }`}
                  >
                    <Globe className="h-3 w-3 text-emerald-500 shrink-0" />
                    <span className="whitespace-nowrap">Browser Tab</span>
                  </button>

                  <button
                    onClick={() => setLeftTab("es6")}
                    className={`flex-1 min-w-[105px] py-1 px-2 rounded-md text-[11px] font-bold font-mono tracking-tight flex items-center justify-center gap-1 transition-colors cursor-pointer ${
                      leftTab === "es6"
                        ? "bg-white text-zinc-950 border border-[#F7DF1E] shadow-sm font-extrabold"
                        : "text-zinc-500 hover:text-zinc-950"
                    }`}
                  >
                    <Sparkles className="h-3 w-3 text-yellow-500 shrink-0 fill-yellow-101" />
                    <span className="whitespace-nowrap">ES6 Sheets</span>
                  </button>

                  <button
                    onClick={() => setLeftTab("notes")}
                    className={`flex-1 min-w-[100px] py-1 px-2 rounded-md text-[11px] font-bold font-mono tracking-tight flex items-center justify-center gap-1 transition-colors cursor-pointer ${
                      leftTab === "notes"
                        ? "bg-white text-zinc-950 border border-[#EDD012] shadow-sm font-extrabold"
                        : "text-zinc-500 hover:text-zinc-950"
                    }`}
                  >
                    <Edit3 className="h-3 w-3 text-[#F7DF1E] shrink-0" />
                    <span className="whitespace-nowrap">My Notes</span>
                  </button>

                  <button
                    onClick={() => setLeftTab("visualizer")}
                    className={`flex-1 min-w-[120px] py-1 px-2 rounded-md text-[11px] font-bold font-mono tracking-tight flex items-center justify-center gap-1 transition-colors cursor-pointer relative ${
                      leftTab === "visualizer"
                        ? "bg-white text-zinc-950 border border-purple-300 shadow-sm font-extrabold"
                        : "text-zinc-500 hover:text-zinc-950"
                    }`}
                  >
                    <Sparkles
                      className={`h-3 w-3 text-purple-500 shrink-0 ${activeExerciseIndex === activeConcept.exercises.length - 1 ? "animate-pulse" : ""}`}
                    />
                    <span className="whitespace-nowrap flex items-center gap-1">
                      Visual Sandbox
                      {activeExerciseIndex ===
                        activeConcept.exercises.length - 1 && (
                        <span className="h-1.5 w-1.5 rounded-full bg-purple-500 relative flex shrink-0">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                        </span>
                      )}
                    </span>
                  </button>
                </div>

                {/* Dynamic View Panel (Theory manual / active exercise problem / ES6 cheatsheet) */}
                <div className="p-4 flex-1 flex flex-col justify-between overflow-y-auto min-h-0">
                  <AnimatePresence mode="wait">
                    {leftTab === "es6" ? (
                      <ES6CheatSheet
                        onSelectConcept={(conceptId) => {
                          setActiveConceptId(conceptId);
                          setActiveExerciseIndex(0);
                          setSandboxView("learn");
                          setLeftTab("theory");
                        }}
                        currActiveConceptId={activeConceptId}
                      />
                    ) : leftTab === "notes" ? (
                      <NotesPanel
                        activeExercise={activeExercise}
                        activeConcept={activeConcept}
                      />
                    ) : leftTab === "visualizer" ? (
                      <VisualSandbox
                        activeConcept={activeConcept}
                        activeExercise={activeExercise}
                        solvedExercises={solvedExercises}
                        userCodes={userCodes}
                      />
                    ) : leftTab === "browser" ? (
                      <BrowserSimulator
                        activeExercise={activeExercise}
                        activeConcept={activeConcept}
                        currentCode={currentCode}
                        activeExerciseIndex={activeExerciseIndex}
                        solvedExercises={solvedExercises}
                      />
                    ) : (
                      <ProblemGoalPanel
                        activeConcept={activeConcept}
                        activeExerciseIndex={activeExerciseIndex}
                        setActiveExerciseIndex={setActiveExerciseIndex}
                        setLeftTab={setLeftTab}
                        activeExercise={activeExercise}
                        solvedExercises={solvedExercises}
                        activeHintsCount={activeHintsCount}
                        setActiveHintsCount={setActiveHintsCount}
                        handleRevealHint={handleRevealHint}
                        journeyPreviewIdx={journeyPreviewIdx}
                        setJourneyPreviewIdx={setJourneyPreviewIdx}
                        handleNextStep={handleNextStep}
                      />
                    )}
                  </AnimatePresence>

                  {/* Exercise Solved Milestone Card */}
                  {currentExerciseStatus && (
                    <div className="mt-8 bg-zinc-900 text-white rounded-xl p-4 flex items-center gap-3 shadow-md border border-zinc-800">
                      <div className="h-8 w-8 rounded-lg bg-[#F7DF1E] flex items-center justify-center shrink-0">
                        <CheckCircle className="h-4.5 w-4.5 text-zinc-950" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[#F7DF1E]">
                          Repetition Completed!
                        </h4>
                        <p className="text-xs text-zinc-300 font-sans">
                          You solved this repetition. Switch to the next to keep
                          building muscle!
                        </p>
                      </div>
                    </div>
                  )}

                  {isConceptMastered && (
                    <div className="mt-4 bg-emerald-950 text-white rounded-xl p-4.5 border border-emerald-800 shadow-lg animate-fade-in space-y-2.5">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-lg bg-emerald-500 flex items-center justify-center text-zinc-100">
                          <Sparkles className="h-4 w-4 text-zinc-905 fill-zinc-905" />
                        </div>
                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-300">
                          🎓 Concept fully Mastered!
                        </h4>
                      </div>
                      <p className="text-[11px] text-zinc-200 leading-relaxed font-sans">
                        Amazing job! You successfully completed all{" "}
                        {activeConcept.exercises.length} repetitions for{" "}
                        <strong>{activeConcept.title}</strong>. Head over to the{" "}
                        <strong>Concept Guide</strong> tab on the left to review
                        your interactive, beginner-friendly Concept Recap!
                      </p>
                      <button
                        onClick={() => setLeftTab("theory")}
                        className="w-full text-center py-2 px-3 rounded bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold font-mono text-[10.5px] tracking-tight uppercase shadow transition-all active:scale-[0.98] cursor-pointer"
                      >
                        Open Concept Recap Guide →
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Code Editor workspace & Live assertion outputs */}
              <div className="flex-1 flex flex-col overflow-hidden bg-white min-h-0 min-w-0">
                <CodeWorkspace
                  currentCode={currentCode}
                  handleCodeChange={handleCodeChange}
                  handleKeyDown={handleKeyDown}
                  activeExerciseIndex={activeExerciseIndex}
                  showPrevReference={showPrevReference}
                  setShowPrevReference={setShowPrevReference}
                  prevExercise={prevExercise}
                  activeExercise={activeExercise}
                  handleResetCode={handleResetCode}
                  prevCode={prevCode}
                  lineNumbers={lineNumbers}
                  workspaceHeight={workspaceHeight}
                  setWorkspaceHeight={saveWorkspaceHeight}
                />

                <AssertionConsole
                  activeExercise={activeExercise}
                  currentCode={currentCode}
                  testResults={testResults}
                  isRunningTests={isRunningTests}
                  handleRunTests={handleRunTests}
                  autoRun={autoRun}
                  toggleAutoRun={toggleAutoRun}
                  handleNextStep={handleNextStep}
                  solvedExercises={solvedExercises}
                />
              </div>
            </section>
          </main>
        )
      ) : (
        /* Isolated Curriculum Topics Map / Syllabus Roadmap View */
        <Roadmap
          knowledgeMapCategories={sortedKnowledgeMapCategories}
          knowledgeMapTopics={sortedKnowledgeMapTopics}
          completedTopics={completedTopics}
          completedTopicsCount={completedTopicsCount}
          totalTopicsCount={totalTopicsCount}
          completionRatePercent={completionRatePercent}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategoryFilter={selectedCategoryFilter}
          setSelectedCategoryFilter={setSelectedCategoryFilter}
          expandedTopicId={expandedTopicId}
          setExpandedTopicId={setExpandedTopicId}
          toggleTopicProgress={toggleTopicProgress}
          jumpToExercise={jumpToExercise}
          clearAllMarkers={clearAllMarkers}
        />
      )}

      {/* Dynamic Animated Mastery Celebration Dialog Overlay */}
      <MasteryCelebration
        isConceptMastered={isConceptMastered}
        activeConcept={activeConcept}
        activeConceptId={activeConceptId}
        setActiveConceptId={setActiveConceptId}
        setActiveExerciseIndex={setActiveExerciseIndex}
        concepts={CONCEPTS}
        setSandboxView={setSandboxView}
      />
    </div>
  );
}
