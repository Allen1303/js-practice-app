import { useState, useEffect, useMemo } from "react";
import { AnimatePresence } from "motion/react";
import { CONCEPTS } from "./data/exercises.js";
import {
  KNOWLEDGE_MAP_CATEGORIES,
  KNOWLEDGE_MAP_TOPICS,
} from "./data/knowledgeMap.js";
import { runExerciseTests, runCustomEvaluation } from "./utils/executor.js";

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

import {
  CheckCircle,
  Code,
  BookOpen,
  Sparkles,
  Edit3,
  RotateCcw,
} from "lucide-react";

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

  // User source code dictionary
  const [userCodes, setUserCodes] = useState({});

  // Solved exercise tracking
  const [solvedExercises, setSolvedExercises] = useState({});

  // Active testing states
  const [testResults, setTestResults] = useState(null);
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [activeHintsCount, setActiveHintsCount] = useState(0);

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
          defaultTemplates[e.id] = e.codeTemplate;
        });
      });

      const storedCodes = localStorage.getItem("learnjs_play_codes");
      if (storedCodes) {
        setUserCodes({ ...defaultTemplates, ...JSON.parse(storedCodes) });
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
              defaultTemplates[e.id] = e.codeTemplate;
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
  const currentCode =
    userCodes[activeExercise.id] ?? activeExercise.codeTemplate;
  const prevExercise =
    activeExerciseIndex > 0
      ? activeConcept.exercises[activeExerciseIndex - 1]
      : null;
  const prevCode = prevExercise
    ? (userCodes[prevExercise.id] ?? prevExercise.codeTemplate)
    : "";

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

  // Reset template action
  const handleResetCode = () => {
    if (
      confirm(
        "Are you sure you want to reset this exercise to its default starter code? Any changes will be overwritten.",
      )
    ) {
      const updated = {
        ...userCodes,
        [activeExercise.id]: activeExercise.codeTemplate,
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

  // Keyboard shortcut to run: Cmd+Enter or Ctrl+Enter
  const handleKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      handleRunTests();
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
        setLeftTab("problem");
        return;
      }
    }
  };

  // Curriculum stats calculations
  const totalTopicsCount = KNOWLEDGE_MAP_TOPICS.length;
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
      {viewMode === "sandbox" ? (
        <main className="flex-1 flex flex-col lg:flex-row overflow-hidden min-h-0 min-w-0">
          {/* Chapter & Concept Navigation Column */}
          <ConceptSelector
            concepts={CONCEPTS}
            solvedExercises={solvedExercises}
            activeConceptId={activeConceptId}
            setActiveConceptId={setActiveConceptId}
            setActiveExerciseIndex={setActiveExerciseIndex}
            setLeftTab={setLeftTab}
          />

          {/* Core Sandbox Working Panels split */}
          <section className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-0 min-w-0">
            {/* Left Column: Learning Materials / Guidelines Tabbed View */}
            <div className="w-full md:w-1/2 border-b md:border-b-0 md:border-r border-zinc-200 flex flex-col bg-white overflow-y-auto min-h-0 min-w-0">
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
              <div className="flex border-b border-zinc-200 bg-zinc-100/60 p-1 shrink-0 select-none overflow-x-auto">
                <button
                  onClick={() => setLeftTab("problem")}
                  className={`flex-1 min-w-[120px] py-1.5 px-3 rounded-lg text-xs font-bold font-mono tracking-tight flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    leftTab === "problem"
                      ? "bg-white text-zinc-950 border border-zinc-200 shadow-sm"
                      : "text-zinc-500 hover:text-zinc-950"
                  }`}
                >
                  <Code className="h-3.5 w-3.5 shrink-0" />
                  <span className="whitespace-nowrap">Problem Goal</span>
                </button>

                <button
                  onClick={() => setLeftTab("theory")}
                  className={`flex-1 min-w-[120px] py-1.5 px-3 rounded-lg text-xs font-bold font-mono tracking-tight flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                    leftTab === "theory"
                      ? "bg-white text-zinc-950 border border-zinc-200 shadow-sm"
                      : "text-zinc-500 hover:text-zinc-950"
                  }`}
                >
                  <BookOpen className="h-3.5 w-3.5 shrink-0" />
                  <span className="whitespace-nowrap">Learn Theory</span>
                </button>

                <button
                  onClick={() => setLeftTab("es6")}
                  className={`flex-1 min-w-[115px] py-1.5 px-2.5 rounded-lg text-xs font-bold font-mono tracking-tight flex items-center justify-center gap-1 transition-colors cursor-pointer ${
                    leftTab === "es6"
                      ? "bg-white text-zinc-950 border border-[#F7DF1E] shadow-sm font-extrabold"
                      : "text-zinc-500 hover:text-zinc-950"
                  }`}
                >
                  <Sparkles className="h-3.5 w-3.5 text-yellow-500 shrink-0 fill-yellow-100" />
                  <span className="whitespace-nowrap">ES6 Sheets</span>
                </button>

                <button
                  onClick={() => setLeftTab("notes")}
                  className={`flex-1 min-w-[110px] py-1.5 px-2.5 rounded-lg text-xs font-bold font-mono tracking-tight flex items-center justify-center gap-1 transition-colors cursor-pointer ${
                    leftTab === "notes"
                      ? "bg-white text-zinc-950 border border-[#EDD012] shadow-sm font-extrabold"
                      : "text-zinc-500 hover:text-zinc-950"
                  }`}
                >
                  <Edit3 className="h-3.5 w-3.5 text-[#F7DF1E] shrink-0" />
                  <span className="whitespace-nowrap">My Notes</span>
                </button>

                <button
                  onClick={() => setLeftTab("visualizer")}
                  className={`flex-1 min-w-[125px] py-1.5 px-2.5 rounded-lg text-xs font-bold font-mono tracking-tight flex items-center justify-center gap-1 transition-colors cursor-pointer relative ${
                    leftTab === "visualizer"
                      ? "bg-white text-zinc-950 border border-purple-300 shadow-sm font-extrabold"
                      : "text-zinc-500 hover:text-zinc-950"
                  }`}
                >
                  <Sparkles
                    className={`h-3.5 w-3.5 text-purple-500 shrink-0 ${activeExerciseIndex === activeConcept.exercises.length - 1 ? "animate-pulse" : ""}`}
                  />
                  <span className="whitespace-nowrap flex items-center gap-1.5">
                    Visual Sandbox
                    {activeExerciseIndex ===
                      activeConcept.exercises.length - 1 && (
                      <span className="h-2 w-2 rounded-full bg-purple-500 relative flex shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                      </span>
                    )}
                  </span>
                </button>
              </div>

              {/* Dynamic View Panel (Theory manual / active exercise problem / ES6 cheatsheet) */}
              <div className="p-6 flex-1 flex flex-col justify-between overflow-y-auto min-h-0">
                <AnimatePresence mode="wait">
                  {leftTab === "theory" ? (
                    <TheoryPanel
                      activeConcept={activeConcept}
                      activeExerciseIndex={activeExerciseIndex}
                      setActiveExerciseIndex={setActiveExerciseIndex}
                      setLeftTab={setLeftTab}
                    />
                  ) : leftTab === "es6" ? (
                    <ES6CheatSheet
                      onSelectConcept={(conceptId) => {
                        setActiveConceptId(conceptId);
                        setActiveExerciseIndex(0);
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
              />
            </div>
          </section>
        </main>
      ) : (
        /* Isolated Curriculum Topics Map / Syllabus Roadmap View */
        <Roadmap
          knowledgeMapCategories={KNOWLEDGE_MAP_CATEGORIES}
          knowledgeMapTopics={KNOWLEDGE_MAP_TOPICS}
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
      />
    </div>
  );
}
