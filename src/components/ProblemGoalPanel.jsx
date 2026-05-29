import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  BookmarkCheck,
  Check,
  ArrowRight,
  Lightbulb,
  ChevronRight,
  Trophy,
  Copy,
} from "lucide-react";
import { formatTextWithCode } from "../utils/textFormatter.jsx";
import { formatDifficulty } from "../utils/difficultyFormatter.js";
import { highlightJS } from "../utils/highlighter.js";

export function ProblemGoalPanel({
  activeConcept,
  activeExerciseIndex,
  setActiveExerciseIndex,
  setLeftTab,
  activeExercise,
  solvedExercises,
  activeHintsCount,
  setActiveHintsCount,
  handleRevealHint,
  journeyPreviewIdx,
  setJourneyPreviewIdx,
}) {
  const [copied, setCopied] = useState(false);

  const handleCopyExample = () => {
    if (!activeConcept?.codeSnippet) return;
    navigator.clipboard.writeText(activeConcept.codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      key="problem-panel"
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.15 }}
      className="space-y-6 flex-1 flex flex-col"
    >
      <div>
        <div className="flex items-center gap-1.5 text-zinc-400 font-mono text-xs uppercase tracking-wider font-bold">
          <span>
            Problem {activeExerciseIndex + 1} of{" "}
            {activeConcept.exercises.length}
          </span>
          <span className="text-zinc-300">•</span>
          <span
            className={`font-bold ${
              activeExercise.difficulty === "Warm-up"
                ? "text-sky-600"
                : activeExercise.difficulty?.includes("Easy") ||
                    activeExercise.difficulty?.includes("Core")
                  ? "text-emerald-600"
                  : activeExercise.difficulty?.includes("Medium") ||
                      activeExercise.difficulty?.includes("Mastery") ||
                      activeExercise.difficulty?.includes("Concept")
                    ? "text-amber-600"
                    : "text-rose-600"
            }`}
          >
            {formatDifficulty(activeExercise.difficulty)}
          </span>
        </div>
        <h2 className="text-lg font-extrabold tracking-tight text-zinc-900 mt-1 flex items-center gap-2">
          {activeExercise.title}
        </h2>
      </div>

      {/* Dynamic Concept Focus */}
      <div className="bg-[#fcf8e3]/80 border border-[#f3ebc0] rounded-xl p-4.5 space-y-3.5 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold tracking-wider text-[#8a6d3b] uppercase flex items-center gap-1.5">
            <Sparkles className="h-4 w-4 text-[#ecd214] fill-amber-100/50 animate-pulse" />
            Concept Lesson: How It Works
          </span>
          <span className="text-[9px] font-mono font-semibold text-amber-800 bg-amber-100/60 px-2 py-0.5 rounded-full border border-amber-200">
            Interactive Syntax
          </span>
        </div>

        <p className="text-xs text-zinc-755 leading-relaxed font-normal bg-white/95 p-3 rounded-lg border border-amber-100/60 font-sans shadow-2xs">
          {formatTextWithCode(activeExercise.conceptContext)}
        </p>

        {activeConcept?.codeSnippet && (
          <div className="border border-[#1a1c22] rounded-xl bg-[#282c34] overflow-hidden shadow-xs transition-all">
            <div className="flex items-center justify-between px-3.5 py-2 bg-[#21252b] border-b border-[#181a1f] select-none">
              <span className="text-[9px] font-mono font-bold tracking-wider text-[#abb2bf] uppercase">
                Example Use Case
              </span>
              <button
                type="button"
                onClick={handleCopyExample}
                title="Copy educational code snippet to clipboard"
                className={`text-[9.5px] font-mono font-bold px-2 py-0.8 rounded hover:bg-zinc-800 transition-all flex items-center gap-1 cursor-pointer ${
                  copied
                    ? "text-emerald-400"
                    : "text-zinc-400 hover:text-[#abb2bf]"
                }`}
              >
                <Copy className="h-3 w-3" />
                {copied ? "Copied! ✓" : "Copy Example"}
              </button>
            </div>
            <pre
              className="p-3.5 overflow-x-auto text-[11.5px] font-mono text-[#abb2bf] bg-[#282c34] leading-relaxed select-all"
              style={{
                fontFamily:
                  "JetBrains Mono, Fira Code, Consolas, Monaco, monospace",
              }}
              dangerouslySetInnerHTML={{
                __html: highlightJS(activeConcept.codeSnippet, true),
              }}
            />
          </div>
        )}
      </div>

      {/* Explanatory description card */}
      <div className="bg-zinc-50/70 border border-zinc-200 rounded-xl p-4.5 space-y-3">
        <span className="text-[10px] font-mono font-bold tracking-wider text-zinc-500 uppercase block">
          Your Practice Objective
        </span>
        <p className="text-sm text-zinc-700 leading-relaxed whitespace-pre-line font-normal">
          {formatTextWithCode(activeExercise.description)}
        </p>
      </div>

      {/* Visual Sandbox Capstone Banner */}
      {activeExerciseIndex === activeConcept.exercises.length - 1 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-purple-50 border border-purple-200/70 p-4 rounded-xl flex items-center justify-between shadow-xs relative overflow-hidden"
        >
          <div className="flex items-center gap-3 relative z-10">
            <div className="h-8 w-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600 shrink-0 border border-purple-300">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-purple-950 uppercase tracking-tight">
                Visual Sandbox Unlocked!
              </h4>
              <p className="text-[11px] text-purple-700 leading-relaxed font-sans">
                This is the concluding capstone! Select the{" "}
                <strong>Visual Sandbox</strong> tab above to view a graphical
                simulation dashboard.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setLeftTab("visualizer")}
            className="text-[10.5px] font-mono font-bold text-purple-800 bg-white hover:bg-purple-100 border border-purple-200 hover:border-purple-300 px-3 py-1.5 rounded-lg transition-all shadow-3xs shrink-0 cursor-pointer"
          >
            Open Sandbox →
          </button>
        </motion.div>
      )}

      {/* Mastery Progression Track & Pattern Progression Roadmap */}
      <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4.5 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold tracking-wider text-zinc-500 uppercase flex items-center gap-1.5">
            <BookmarkCheck className="h-4 w-4 text-emerald-600" />
            Pattern-Based Progression Roadmap
          </span>
          <span className="text-[9px] font-mono font-medium text-zinc-400 bg-zinc-100/80 px-2 py-0.5 rounded border border-zinc-250">
            Interactive Path
          </span>
        </div>

        {/* Timeline Road */}
        <div className="relative flex items-center justify-between px-2 pt-2 pb-1 bg-white p-3 rounded-lg border border-zinc-150">
          {/* Connecting line */}
          <div className="absolute left-[32px] right-[32px] top-[26px] h-[2px] bg-zinc-200 -z-0" />

          {/* Active connecting line up to current index */}
          <div
            className="absolute left-[32px] h-[2px] bg-gradient-to-r from-zinc-900 to-[#F7DF1E] transition-all duration-300 -z-0"
            style={{
              width:
                activeConcept.exercises.length > 1
                  ? `calc(${(journeyPreviewIdx / (activeConcept.exercises.length - 1)) * 100}% - ${journeyPreviewIdx === 0 ? 0 : 25}px)`
                  : "0%",
              top: "26px",
            }}
          />

          {activeConcept.exercises.map((ex, idx) => {
            const isCurrentActive = idx === activeExerciseIndex;
            const isCurrentlyPreviewed = idx === journeyPreviewIdx;
            const isSolved = solvedExercises[ex.id];

            return (
              <button
                key={ex.id}
                type="button"
                onClick={() => setJourneyPreviewIdx(idx)}
                className="relative flex flex-col items-center group cursor-pointer focus:outline-none z-10"
              >
                {/* Circle Node */}
                <div
                  className={`h-[28px] w-[28px] rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                    isCurrentlyPreviewed
                      ? "bg-zinc-950 border-[#F7DF1E] text-white shadow-md scale-110 shadow-zinc-950/20"
                      : isSolved
                        ? "bg-[#F7DF1E]/20 border-[#edd012] text-zinc-900 font-bold"
                        : "bg-white border-zinc-300 text-zinc-505 group-hover:border-zinc-450 hover:bg-zinc-50"
                  }`}
                >
                  {isSolved ? (
                    <Check className="h-3 w-3 text-zinc-955 stroke-[4px]" />
                  ) : (
                    <span className="text-[10px] font-mono font-bold">
                      {idx + 1}
                    </span>
                  )}
                </div>

                {/* Small marker under circle for current active exercise index */}
                {isCurrentActive && (
                  <div className="absolute -top-3.5 bg-zinc-950 text-white text-[7px] font-mono font-extrabold uppercase px-1 rounded border border-[#F7DF1E] shadow leading-none select-none">
                    now
                  </div>
                )}

                {/* Label */}
                <span
                  className={`text-[8.5px] font-mono mt-1 font-semibold truncate max-w-[65px] ${
                    isCurrentlyPreviewed
                      ? "text-zinc-950 font-bold"
                      : "text-zinc-400 group-hover:text-zinc-650"
                  }`}
                >
                  Practice {idx + 1}
                </span>
              </button>
            );
          })}
        </div>

        {/* Content panel explaining the connection between preview step and before */}
        <AnimatePresence mode="wait">
          <motion.div
            key={journeyPreviewIdx}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            transition={{ duration: 0.12 }}
            className="bg-zinc-50/50 border border-zinc-200/90 rounded-lg p-3 space-y-2.5"
          >
            {/* Preview Details */}
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-zinc-900 flex items-center gap-1.5">
                <span className="text-[9px] bg-zinc-900 text-amber-300 font-mono py-0.5 px-1.5 rounded border border-zinc-800">
                  Step {journeyPreviewIdx + 1}
                </span>
                {activeConcept.exercises[journeyPreviewIdx].title}
              </h3>
              {journeyPreviewIdx !== activeExerciseIndex && (
                <button
                  type="button"
                  onClick={() => {
                    setActiveExerciseIndex(journeyPreviewIdx);
                    setLeftTab("problem");
                  }}
                  className="text-[9px] font-mono font-bold text-zinc-955 bg-[#F7DF1E] hover:bg-[#edd012] px-2 py-1 rounded border border-zinc-350 flex items-center gap-1 transition-all active:scale-95 shadow-sm"
                >
                  Jump to Code <ArrowRight className="h-2.5 w-2.5" />
                </button>
              )}
            </div>

            <div className="text-xs text-zinc-650 leading-relaxed font-normal space-y-1.5">
              {journeyPreviewIdx === 0 ? (
                <div>
                  <p>
                    🎯 <strong>The Solid Foundation</strong>:
                  </p>
                  <p className="text-zinc-655 mt-1 pl-2 border-l border-zinc-300">
                    This is the starting point. Master the fundamental syntax
                    and properties first before layering auxiliary mechanics.
                  </p>
                </div>
              ) : (
                <div>
                  <p>
                    ⚡ <strong>The Incremental Evolution</strong> (Builds on
                    Step {journeyPreviewIdx}):
                  </p>
                  <p className="text-zinc-655 mt-1 pl-2 border-l-2 border-[#F7DF1E] bg-[#F7DF1E]/5 p-2 rounded">
                    <strong>Pattern Recognition Upgrade:</strong>{" "}
                    {formatTextWithCode(
                      activeConcept.exercises[journeyPreviewIdx].explanation,
                    )}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Hints & Solutions Area */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
          <span className="text-xs font-mono text-zinc-550 font-bold uppercase flex items-center gap-1.5">
            <Lightbulb className="h-3.5 w-3.5 text-[#ecd214]" />
            Progressive Hints ({activeHintsCount}/{activeExercise.hints.length})
          </span>

          {activeHintsCount < activeExercise.hints.length && (
            <button
              onClick={handleRevealHint}
              className="text-xs font-mono font-bold text-zinc-905 hover:underline flex items-center gap-0.5 cursor-pointer hover:text-zinc-950"
            >
              Reveal Hint <ChevronRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {activeHintsCount === 0 ? (
          <p className="text-xs text-zinc-400 font-light italic">
            Stuck? Click 'Reveal Hint' above to get an instant structural clue
            without spoiling the code.
          </p>
        ) : (
          <div className="space-y-2.5">
            {activeExercise.hints.slice(0, activeHintsCount).map((hint, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-yellow-50/40 border-l-4 border-[#F7DF1E] p-3 rounded-r-lg"
              >
                <span className="text-[10px] font-mono text-zinc-800 font-bold uppercase block mb-1">
                  Hint {i + 1}
                </span>
                <p className="text-xs text-zinc-700 font-normal leading-relaxed">
                  {formatTextWithCode(hint)}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
