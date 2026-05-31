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
  handleNextStep,
}) {
  const [copied, setCopied] = useState(false);

  const handleCopyExample = () => {
    const snippet = activeExercise?.codeSnippet || activeConcept?.codeSnippet;
    if (!snippet) return;
    navigator.clipboard.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <motion.div
      key="problem-panel"
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.15 }}
      className="space-y-6 flex-1 flex flex-col font-sans select-none"
    >
      {/* Title block */}
      <div className="border-b border-zinc-200 pb-3">
        <div className="flex items-center gap-2 text-zinc-400 font-mono text-[10px] uppercase font-bold tracking-wide select-none">
          <span>
            Exercise {activeExerciseIndex + 1} of{" "}
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
        <h2 className="text-xl font-black tracking-tight text-zinc-900 mt-1 select-text">
          {activeExercise.title}
        </h2>
      </div>

      {/* Real Lesson Material / Text context */}
      <div className="space-y-4 text-zinc-805 leading-relaxed font-sans text-neutral-800 antialiased select-text text-[15px]">
        <p className="font-normal bg-zinc-50 border border-zinc-150 p-4 rounded-xl leading-relaxed">
          {formatTextWithCode(activeExercise.conceptContext)}
        </p>

        {(activeExercise?.codeSnippet || activeConcept?.codeSnippet) && (
          <div className="border border-zinc-800 rounded-xl bg-[#282c34] overflow-hidden shadow-xs transition-all my-2.5">
            <div className="flex items-center justify-between px-3.5 py-2 bg-[#21252b] border-b border-zinc-900 select-none">
              <span className="text-[9.5px] font-mono font-bold tracking-wider text-zinc-400 uppercase">
                Interactive Reference Snippet
              </span>
              <button
                type="button"
                onClick={handleCopyExample}
                className={`text-[9.5px] font-mono font-bold px-2 py-0.5 rounded hover:bg-zinc-800 transition-all flex items-center gap-1 cursor-pointer ${
                  copied
                    ? "text-emerald-400"
                    : "text-zinc-400 hover:text-[#abb2bf]"
                }`}
              >
                <Copy className="h-3 w-3 inline-block" />
                {copied ? "Copied! ✓" : "Copy block"}
              </button>
            </div>
            <pre
              className="p-3.5 overflow-x-auto text-[12px] font-mono text-[#abb2bf] bg-[#282c34] leading-relaxed select-all"
              style={{ fontFamily: "Consolas, Monaco, Courier New, monospace" }}
              dangerouslySetInnerHTML={{
                __html: highlightJS(
                  activeExercise.codeSnippet || activeConcept.codeSnippet,
                  true,
                ),
              }}
            />
          </div>
        )}
      </div>

      {/* "Your Goal" Instructions Card (learnjavascript.online layout) */}
      <div className="bg-[#fffdf5] border-l-4 border-yellow-500 border-t border-r border-b border-zinc-200/80 rounded-r-xl p-5 space-y-3.5 select-text">
        <h4 className="text-[11px] font-mono font-bold tracking-widest text-[#a38b00] uppercase flex items-center gap-1.5 select-none">
          <BookmarkCheck className="h-4 w-4 text-yellow-600 shrink-0" />
          Your Practice Goal
        </h4>
        <p className="text-zinc-800 leading-relaxed text-[14.5px] font-medium antialiased">
          {formatTextWithCode(activeExercise.description)}
        </p>
      </div>

      {/* Solution Advance CTA (LearnJS style) */}
      {solvedExercises[activeExercise.id] && (
        <motion.div
          initial={{ opacity: 0, y: 7 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex items-center justify-between text-white shadow-xl relative overflow-hidden"
        >
          <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-[#F7DF1E]" />
          <div className="space-y-0.5 pl-2 leading-tight">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#F7DF1E]">
              Challenge verified
            </h4>
            <p className="text-[11.5px] text-zinc-400 font-sans">
              Practice completed successfully. Advance to of the next step!
            </p>
          </div>
          <button
            type="button"
            onClick={handleNextStep}
            className="py-2.5 px-4 bg-[#F7DF1E] hover:bg-[#edd012] text-zinc-950 font-mono text-xs font-bold rounded-lg flex items-center gap-2 shadow-md transition-all active:scale-[0.98] cursor-pointer"
          >
            Advance step{" "}
            <ArrowRight className="h-4 w-4 text-zinc-950 stroke-[2.5px]" />
          </button>
        </motion.div>
      )}

      {/* Visual Sandbox Capstone Banner */}
      {activeExerciseIndex === activeConcept.exercises.length - 1 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-purple-50/50 border border-purple-200/70 p-4 rounded-xl flex items-center justify-between shadow-xs relative overflow-hidden select-none"
        >
          <div className="flex items-center gap-3 relative z-10">
            <div className="h-8 w-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-650 shrink-0 border border-purple-300">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-purple-950 uppercase tracking-tight">
                Interactive simulation Sandbox
              </h4>
              <p className="text-[11px] text-purple-750 leading-relaxed font-sans">
                You've reached the final step! View standard states in{" "}
                <strong>Visual Sandbox</strong>.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setLeftTab("visualizer")}
            className="text-[10.5px] font-mono font-bold text-purple-800 bg-white hover:bg-purple-100 border border-purple-200 px-3 py-1.5 rounded-lg transition-all shadow-3xs cursor-pointer select-none"
          >
            Open Sandbox
          </button>
        </motion.div>
      )}

      {/* Mastery Roadmap Track */}
      <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4.5 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold tracking-wider text-zinc-500 uppercase flex items-center gap-1.5">
            <BookmarkCheck className="h-4 w-4 text-zinc-500" />
            Active Chapter Step index
          </span>
          <span className="text-[9px] font-mono font-medium text-zinc-400 bg-zinc-100/80 px-2 py-0.5 rounded border border-zinc-200">
            Path progression
          </span>
        </div>

        {/* Timeline Path */}
        <div className="relative flex items-center justify-between px-2 pt-2 pb-1 bg-white p-3 rounded-lg border border-zinc-150">
          <div className="absolute left-[32px] right-[32px] top-[26px] h-[2px] bg-zinc-150 -z-0" />
          <div
            className="absolute left-[32px] h-[2px] bg-zinc-800 transition-all duration-350 -z-0"
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
                        ? "bg-emerald-50 border-emerald-500 text-emerald-800 font-bold"
                        : "bg-white border-zinc-200 text-zinc-400 group-hover:border-zinc-400 hover:bg-zinc-50"
                  }`}
                >
                  {isSolved ? (
                    <span className="text-[11px] text-emerald-600 font-bold">
                      ✓
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono font-bold leading-none">
                      {idx + 1}
                    </span>
                  )}
                </div>

                {isCurrentActive && (
                  <div className="absolute -top-3.5 bg-zinc-950 text-white text-[7px] font-mono font-extrabold uppercase px-1 rounded border border-zinc-800 shadow leading-none select-none">
                    now
                  </div>
                )}

                <span
                  className={`text-[8.5px] font-mono mt-1 font-semibold truncate max-w-[65px] ${
                    isCurrentlyPreviewed
                      ? "text-zinc-950 font-bold"
                      : "text-zinc-400 group-hover:text-zinc-600"
                  }`}
                >
                  Step {idx + 1}
                </span>
              </button>
            );
          })}
        </div>

        {/* Content detail row */}
        <AnimatePresence mode="wait">
          <motion.div
            key={journeyPreviewIdx}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -3 }}
            transition={{ duration: 0.12 }}
            className="bg-zinc-50/50 border border-zinc-200 rounded-lg p-3 space-y-2 select-text"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-zinc-900 flex items-center gap-1.5">
                <span className="text-[8.5px] bg-zinc-900 text-yellow-400 font-mono py-0.5 px-1.5 rounded">
                  Step {journeyPreviewIdx + 1} Goal
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
                  className="text-[9px] font-mono font-bold text-zinc-950 bg-[#F7DF1E] hover:bg-[#edd012] px-2 py-0.5 rounded border border-zinc-350 transition-all active:scale-95 shadow-xs"
                >
                  Load Step →
                </button>
              )}
            </div>

            <div className="text-xs text-zinc-650 leading-relaxed">
              {journeyPreviewIdx === 0 ? (
                <p>
                  ⚡ <strong>Step focus</strong>: Fundamental parameters
                  validation and base algorithm return state.
                </p>
              ) : (
                <p>
                  ⚡ <strong>Step focus</strong>:{" "}
                  {formatTextWithCode(
                    activeConcept.exercises[journeyPreviewIdx].explanation,
                  )}
                </p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Hints */}
      <div className="space-y-2.5 pt-2 border-t border-zinc-250 select-text">
        <div className="flex items-center justify-between pb-1 select-none">
          <span className="text-xs font-mono text-zinc-600 font-bold uppercase flex items-center gap-1.5">
            <Lightbulb className="h-3.5 w-3.5 text-yellow-500" />
            Hints & Guidance ({activeHintsCount}/{activeExercise.hints.length})
          </span>

          {activeHintsCount < activeExercise.hints.length && (
            <button
              onClick={handleRevealHint}
              className="text-xs font-mono font-bold text-zinc-800 hover:underline flex items-center gap-0.5 cursor-pointer hover:text-zinc-950"
            >
              Reveal clue <ChevronRight className="h-3.5 w-3.5 inline-block" />
            </button>
          )}
        </div>

        {activeHintsCount === 0 ? (
          <p className="text-xs text-zinc-400 italic">
            Stuck? Click 'Reveal clue' to show help without spoiling code.
          </p>
        ) : (
          <div className="space-y-2">
            {activeExercise.hints.slice(0, activeHintsCount).map((hint, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-yellow-50/50 border-l-4 border-yellow-500 p-3 rounded-r-lg"
              >
                <span className="text-[9px] font-mono text-yellow-800 font-bold uppercase block mb-0.5">
                  Clue {i + 1}
                </span>
                <p className="text-xs text-zinc-700 leading-relaxed font-sans">
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
