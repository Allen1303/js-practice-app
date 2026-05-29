import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  BookOpen,
  Layers,
  ArrowRight,
  GraduationCap,
  AlertOctagon,
  Compass,
  Sparkles,
} from "lucide-react";
import { highlightJS } from "../utils/highlighter.js";
import { formatTextWithCode } from "../utils/textFormatter.jsx";
import { formatDifficulty } from "../utils/difficultyFormatter.js";
import { CONCEPT_RECAPS } from "../data/conceptRecaps.js";

export function TheoryPanel({
  activeConcept,
  activeExerciseIndex,
  setActiveExerciseIndex,
  setLeftTab,
}) {
  const recap = CONCEPT_RECAPS[activeConcept.id] || {
    analogy:
      "Think of this lesson like an essential toolbox item. Each function represents a specialized widget designed to make operations smoother, cleaner, and faster.",
    tldr: `Master the core mechanism of ${activeConcept.title} to manage complex datasets elegantly.`,
    keyTakeaways: [
      "🔄 **No Mutations**: Promotes writing pure function parameters.",
      "📦 **Clean Scoping**: Avoids global scope pollution.",
      "⚡ **High Performance**: Optimizes runtime calculations perfectly.",
    ],
    commonTraps: [
      "⚠️ **Off-by-One Index errors**: Remember matching items correctly inside arrays.",
      "⚠️ **Return statements missing**: Don't forget to push back the results from nested closures.",
    ],
  };

  const [checkedItems, setCheckedItems] = useState({});

  // Reset or load checked items state whenever active concept changes
  useEffect(() => {
    try {
      const stored = localStorage.getItem(
        `learnjs_recap_checks_${activeConcept.id}`,
      );
      if (stored) {
        setCheckedItems(JSON.parse(stored));
      } else {
        setCheckedItems({});
      }
    } catch {
      setCheckedItems({});
    }
  }, [activeConcept.id]);

  const toggleCheckItem = (idx) => {
    const updated = { ...checkedItems, [idx]: !checkedItems[idx] };
    setCheckedItems(updated);
    try {
      localStorage.setItem(
        `learnjs_recap_checks_${activeConcept.id}`,
        JSON.stringify(updated),
      );
    } catch (e) {
      console.warn("Storage write failed", e);
    }
  };

  const allItemsChecked =
    recap.keyTakeaways.length > 0 &&
    recap.keyTakeaways.every((_, idx) => checkedItems[idx]);

  return (
    <motion.div
      key="theory-panel"
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.15 }}
      className="space-y-6 animate-fade-in"
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
          <p key={i}>{formatTextWithCode(para)}</p>
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
          style={{ fontFamily: "Consolas, Monaco, monospace" }}
          dangerouslySetInnerHTML={{
            __html: highlightJS(activeConcept.codeSnippet, true),
          }}
        />
      </div>

      {/* Interactive Concept Recap Card (LearnJavaScript.online Style) */}
      <div className="border-2 border-emerald-500/35 rounded-xl bg-emerald-50/20 overflow-hidden shadow-xs mt-6 transition-all duration-300">
        <div className="flex items-center justify-between px-4.5 py-3.5 bg-emerald-50/60 border-b border-emerald-500/20">
          <span className="text-xs font-mono font-bold tracking-tight text-emerald-900 uppercase flex items-center gap-2">
            <GraduationCap className="h-4.5 w-4.5 text-emerald-600" />
            LearnJavaScript Recap Guide
          </span>
          {allItemsChecked ? (
            <span className="text-[10px] font-mono font-extrabold tracking-wide text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-full uppercase flex items-center gap-1 animate-pulse">
              <Sparkles className="h-3 w-3" /> Fully Reviewed
            </span>
          ) : (
            <span className="text-[10px] font-mono font-bold text-zinc-500">
              Interactive Checklist
            </span>
          )}
        </div>

        <div className="p-5 space-y-4.5">
          {/* Beginner-friendly Analogy Section */}
          <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-emerald-100 shadow-3xs">
            <div className="h-7 w-7 rounded-full bg-emerald-50 border border-emerald-200/50 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5">
              <Compass className="h-4 w-4" />
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-tight">
                The Real-World Analogy
              </h4>
              <p className="text-[11.5px] text-zinc-650 leading-relaxed font-sans mt-0.5">
                {recap.analogy}
              </p>
            </div>
          </div>

          {/* TL;DR Summary */}
          <div className="space-y-1">
            <span className="text-[9.5px] font-mono font-extrabold text-emerald-800 tracking-wider uppercase block">
              TL;DR Core Objective
            </span>
            <p className="text-xs text-zinc-800 font-sans leading-relaxed pl-1.5 border-l-2 border-emerald-500">
              {formatTextWithCode(recap.tldr)}
            </p>
          </div>

          {/* Key Takeaways Interactive Checklist */}
          <div className="space-y-2">
            <span className="text-[9.5px] font-mono font-extrabold text-emerald-800 tracking-wider uppercase block">
              💡 Interactive Verification: Can you answer these? (Click to check
              off)
            </span>
            <div className="space-y-1.5 pl-1">
              {recap.keyTakeaways.map((item, idx) => {
                const isChecked = !!checkedItems[idx];
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleCheckItem(idx)}
                    className={`w-full text-left p-2.5 rounded-lg border text-xs font-sans transition-all flex items-start gap-2.5 cursor-pointer relative overflow-hidden ${
                      isChecked
                        ? "bg-emerald-50/60 border-emerald-300 text-emerald-950 shadow-3xs"
                        : "bg-white border-zinc-200 text-zinc-700 hover:border-emerald-200 hover:bg-zinc-50/50"
                    }`}
                  >
                    <div
                      className={`mt-0.5 h-4 w-4 rounded border flex items-center justify-center shrink-0 transition-all ${
                        isChecked
                          ? "bg-emerald-600 border-emerald-600 text-white"
                          : "bg-white border-zinc-300"
                      }`}
                    >
                      {isChecked && (
                        <ArrowRight className="h-3 w-3 rotate-90 scale-x-[-1]" />
                      )}
                    </div>
                    <span className="leading-relaxed select-none">
                      {formatTextWithCode(item)}
                    </span>
                    {isChecked && (
                      <div className="absolute right-2 top-2 select-none h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Common Beginner Traps & Pitfalls */}
          <div className="bg-amber-50/60 border border-amber-200/50 rounded-xl p-4 space-y-2.5 shadow-3xs">
            <span className="text-[9.5px] font-mono font-extrabold text-amber-800 tracking-wider uppercase flex items-center gap-1.5 select-none">
              <AlertOctagon className="h-4 w-4 text-amber-600 shrink-0" />
              Watch out! Beginner Traps
            </span>
            <div className="space-y-2 text-zinc-700">
              {recap.commonTraps.map((pit, i) => (
                <p
                  key={i}
                  className="text-[11px] leading-relaxed pl-3 border-l border-amber-300/80"
                >
                  {formatTextWithCode(pit)}
                </p>
              ))}
            </div>
          </div>
        </div>
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
                      : formatDifficulty(ex.difficulty)}
                  </span>
                </p>
                <p className="text-zinc-600 font-sans text-[11px] leading-relaxed">
                  {idx === 0 ? (
                    formatTextWithCode(
                      "Baseline: Core syntax paradigm & baseline callback execution model.",
                    )
                  ) : (
                    <>Evolution: {formatTextWithCode(ex.explanation)}</>
                  )}
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
