import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  BookmarkCheck,
  Check,
  ArrowRight,
  Lightbulb,
  ChevronRight,
  Trophy,
} from "lucide-react";

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
                : activeExercise.difficulty === "DSA Easy"
                  ? "text-[#a28a00]"
                  : activeExercise.difficulty === "DSA Medium"
                    ? "text-amber-600"
                    : "text-rose-600"
            }`}
          >
            {activeExercise.difficulty}
          </span>
        </div>
        <h2 className="text-lg font-extrabold tracking-tight text-zinc-900 mt-1 flex items-center gap-2">
          {activeExercise.title}
        </h2>
      </div>

      {/* Dynamic Concept Focus */}
      <div className="bg-amber-50/45 border border-amber-200/85 rounded-xl p-4.5 space-y-2.5">
        <span className="text-[10px] font-mono font-bold tracking-wider text-amber-800 uppercase flex items-center gap-1.5">
          <Sparkles className="h-4 w-4 text-amber-600 fill-amber-100 animate-pulse" />
          Concept Lesson: How It Works
        </span>
        <p className="text-xs text-zinc-700 leading-relaxed font-normal bg-white/75 p-3 rounded-lg border border-amber-100 font-mono">
          {activeExercise.conceptContext}
        </p>
      </div>

      {/* Explanatory description card */}
      <div className="bg-zinc-50/70 border border-zinc-200 rounded-xl p-4.5 space-y-3">
        <span className="text-[10px] font-mono font-bold tracking-wider text-zinc-500 uppercase block">
          Your Practice Objective
        </span>
        <p className="text-sm text-zinc-700 leading-relaxed whitespace-pre-line font-normal">
          {activeExercise.description}
        </p>
      </div>

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
                  className="text-[9px] font-mono font-bold text-zinc-950 bg-[#F7DF1E] hover:bg-[#edd012] px-2 py-1 rounded border border-zinc-350 flex items-center gap-1 transition-all active:scale-95 shadow-sm"
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
                  <p className="text-zinc-650 mt-1 pl-2 border-l border-zinc-300">
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
                    {activeConcept.exercises[journeyPreviewIdx].explanation}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Methodological comparison note for pattern recognition */}
      <div className="bg-[#10b981]/5 border border-emerald-200/60 rounded-xl p-4.5 space-y-2.5">
        <span className="text-[10px] font-mono font-bold tracking-wider text-emerald-800 uppercase flex items-center gap-1.5">
          <Trophy className="h-4 w-4 text-emerald-600 fill-emerald-100/50" />
          The Pattern-Recognition Advantage
        </span>
        <p className="text-xs text-zinc-650 leading-relaxed font-normal font-sans">
          Unlike traditional platforms that present isolated, unstructured
          riddles, this curriculum is engineered as an{" "}
          <strong>incremental ladder</strong>. Each topic's 5 exercises build
          directly upon the preceding step's solution.
        </p>
        <div className="text-[10.5px] text-zinc-505 font-mono pl-3 border-l-2 border-emerald-500/40 space-y-1">
          <div>
            • Layer one mechanic at a time to develop syntax muscle memory.
          </div>
          <div>
            • Press{" "}
            <strong className="text-[#a1871a] bg-amber-50 px-1 py-0.2 rounded border border-amber-200/40">
              Compare Step Upgrade
            </strong>{" "}
            in the editor to instantly reference or import your previous
            solution code.
          </div>
        </div>
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
                  {hint}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
