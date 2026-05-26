import { motion } from "motion/react";
import { BookOpen, Layers, ArrowRight } from "lucide-react";
import { highlightJS } from "../utils/highlighter.js";

export function TheoryPanel({
  activeConcept,
  activeExerciseIndex,
  setActiveExerciseIndex,
  setLeftTab,
}) {
  return (
    <motion.div
      key="theory-panel"
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.15 }}
      className="space-y-6"
    >
      <div>
        <h2 className="text-lg font-extrabold text-zinc-900 tracking-tight flex items-center gap-2">
          <BookOpen className="h-4.5 w-4.5 text-zinc-700" />
          {activeConcept.title} Guide
        </h2>
        <p className="text-[10px] font-mono font-bold text-zinc-400 mt-0.5">
          THEORY MANUAL
        </p>
      </div>

      <div className="text-zinc-650 leading-relaxed text-sm space-y-4 font-sans text-zinc-750">
        {activeConcept.longExplanation.split("\n\n").map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      {/* Read only code Snippet */}
      <div className="border border-[#181a1f] rounded-xl bg-[#282c34] overflow-hidden mt-6">
        <div className="flex items-center justify-between px-4 py-2 bg-[#21252b] border-b border-[#181a1f] animate-fade-in">
          <span className="text-[10px] font-mono font-bold tracking-wider text-[#abb2bf] uppercase">
            Interactive Syntax Reference
          </span>
          <span className="text-[10px] font-mono text-[#5c6370]">JS / ES6</span>
        </div>
        <pre
          className="p-4 overflow-x-auto text-xs font-mono text-[#abb2bf] bg-[#282c34] leading-relaxed select-all"
          dangerouslySetInnerHTML={{
            __html: highlightJS(activeConcept.codeSnippet, true),
          }}
        />
      </div>

      {/* Chapter Pattern Blueprint Map */}
      <div className="border border-zinc-200 rounded-xl bg-zinc-50 p-4.5 space-y-3 mt-6">
        <span className="text-[10px] font-mono font-bold tracking-wider text-zinc-500 uppercase flex items-center gap-1.5">
          <Layers className="h-4 w-4 text-zinc-650" />
          Skills Progression Ladder ({activeConcept.exercises.length} Steps)
        </span>
        <p className="text-xs text-zinc-600 leading-relaxed font-normal">
          Our curriculum is carefully engineered as a progressive ladder to
          build muscle memory. Rather than unrelated puzzles, these{" "}
          {activeConcept.exercises.length} challenges build sequentially in
          complexity:
        </p>

        <div className="space-y-2 mt-2">
          {activeConcept.exercises.map((ex, idx) => (
            <div
              key={ex.id}
              className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white border border-zinc-150 text-xs shadow-sm hover:border-zinc-300 hover:shadow-md transition-all cursor-pointer group"
              onClick={() => {
                setActiveExerciseIndex(idx);
                setLeftTab("problem");
              }}
            >
              <span className="flex-shrink-0 h-5 w-5 rounded-full bg-zinc-950 text-white font-mono text-[9px] font-extrabold flex items-center justify-center group-hover:bg-[#F7DF1E] group-hover:text-zinc-950 transition-colors">
                {idx + 1}
              </span>
              <div className="space-y-0.5">
                <p className="font-bold text-zinc-900 leading-normal flex items-center gap-1.5">
                  {ex.title}
                  <span
                    className={`text-[8px] font-mono font-extrabold uppercase rounded px-1.5 py-0.2 ${
                      idx === activeExerciseIndex
                        ? "bg-zinc-900 text-white"
                        : "bg-zinc-100 text-zinc-505"
                    }`}
                  >
                    {idx === activeExerciseIndex
                      ? "active focus"
                      : ex.difficulty}
                  </span>
                </p>
                <p className="text-zinc-500 font-mono text-[10.5px] leading-relaxed">
                  {idx === 0
                    ? "Baseline: Core syntax paradigm & baseline callback execution model."
                    : `Evolution: ${ex.explanation}`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <button
          onClick={() => {
            setActiveExerciseIndex(0);
            setLeftTab("problem");
          }}
          className="px-5 py-3 rounded-xl bg-zinc-905 text-white hover:bg-zinc-800 font-mono text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md transition-all active:scale-[0.98] border border-zinc-850"
        >
          Start Practice 1: {activeConcept.exercises[0].title}{" "}
          <ArrowRight className="h-4 w-4 text-[#F7DF1E]" />
        </button>
      </div>
    </motion.div>
  );
}
