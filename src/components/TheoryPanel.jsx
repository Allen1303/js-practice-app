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
  setSandboxView,
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
      className="space-y-6 font-sans select-none pb-8"
    >
      {/* Chapter header block */}
      <div className="border-b border-zinc-200 pb-3.5 select-none">
        <span className="text-[10px] font-mono font-black text-zinc-400 uppercase tracking-widest block mb-0.5">
          THEORY BLUEPRINT
        </span>
        <h2 className="text-2xl font-black text-zinc-900 tracking-tight flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-zinc-805" />
          {activeConcept.title}
        </h2>
      </div>

      {/* Book long reading description */}
      <div className="text-zinc-800 leading-[1.7] antialiased select-text text-[15.5px] space-y-4.5 font-normal">
        {activeConcept.longExplanation.split("\n\n").map((para, i) => (
          <p key={i}>{formatTextWithCode(para)}</p>
        ))}
      </div>

      {/* Read-only interactive snippet mockup */}
      <div className="border border-zinc-800 rounded-xl bg-[#282c34] overflow-hidden my-6 select-text shadow-sm">
        <div className="flex items-center justify-between px-4 py-2 bg-[#21252b] border-b border-zinc-900 select-none">
          <span className="text-[9.5px] font-mono font-bold tracking-wider text-zinc-400 uppercase">
            Interactive Syntax Reference
          </span>
          <span className="text-[9.5px] font-mono text-[#5c6370]">
            JS / ES6
          </span>
        </div>
        <pre
          className="p-4 overflow-x-auto text-[12.5px] font-mono text-[#abb2bf] bg-[#282c34] leading-relaxed select-all"
          style={{ fontFamily: "Consolas, Menlo, Monaco, monospace" }}
          dangerouslySetInnerHTML={{
            __html: highlightJS(activeConcept.codeSnippet, true),
          }}
        />
      </div>

      {/* LearnJS Recap guide box with checks */}
      <div className="border-2 border-emerald-500/20 rounded-xl bg-emerald-50/10 overflow-hidden shadow-xs mt-6 transition-all duration-300">
        <div className="flex items-center justify-between px-4 py-3 bg-emerald-50/30 border-b border-emerald-500/10 select-none">
          <span className="text-xs font-mono font-bold tracking-tight text-emerald-950 uppercase flex items-center gap-2">
            <GraduationCap className="h-4.5 w-4.5 text-emerald-650" />
            Chapter Interactive Recap
          </span>
          {allItemsChecked ? (
            <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100 border border-emerald-200 px-2.5 py-0.5 rounded-full uppercase flex items-center gap-1">
              <Sparkles className="h-3 w-3" /> fully reviewed
            </span>
          ) : (
            <span className="text-[10px] font-mono font-bold text-zinc-500">
              Checklist verification
            </span>
          )}
        </div>

        <div className="p-5 space-y-4.5 select-text">
          {/* Analogy */}
          <div className="flex items-start gap-3 bg-white p-3.5 rounded-xl border border-emerald-100 shadow-3xs">
            <div className="h-7 w-7 rounded-full bg-emerald-50 border border-emerald-150 flex items-center justify-center text-emerald-600 shrink-0 mt-0.5 select-none">
              <Compass className="h-4 w-4" />
            </div>
            <div className="space-y-0.5 font-sans leading-normal">
              <h4 className="text-xs font-bold text-emerald-950 uppercase tracking-tight">
                Standard Analogy:
              </h4>
              <p className="text-[12.5px] text-zinc-650 mt-0.5 leading-relaxed">
                {recap.analogy}
              </p>
            </div>
          </div>

          {/* TLDR */}
          <div className="space-y-1">
            <span className="text-[9.5px] font-mono font-bold text-emerald-800 tracking-wider uppercase block select-none">
              TL;DR Target:
            </span>
            <p className="text-xs text-zinc-800 font-sans leading-relaxed pl-2 border-l-2 border-emerald-650">
              {formatTextWithCode(recap.tldr)}
            </p>
          </div>

          {/* Checklist */}
          <div className="space-y-2 select-text">
            <span className="text-[9.5px] font-mono font-bold text-emerald-800 tracking-wider uppercase block select-none">
              💡 Interactive Verification: click to check off item
            </span>
            <div className="space-y-1.5 pl-0.5">
              {recap.keyTakeaways.map((item, idx) => {
                const isChecked = !!checkedItems[idx];
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleCheckItem(idx)}
                    className={`w-full text-left p-2.5 rounded-lg border text-xs font-sans transition-all flex items-start gap-2.5 cursor-pointer relative overflow-hidden ${
                      isChecked
                        ? "bg-emerald-50/50 border-emerald-300 text-emerald-950 shadow-3xs"
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
                        <span className="font-bold text-[10px]">✓</span>
                      )}
                    </div>
                    <span className="leading-relaxed select-none">
                      {formatTextWithCode(item)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Traps */}
          <div className="bg-amber-50/40 border border-amber-200/60 rounded-xl p-4 space-y-2 shadow-3xs">
            <span className="text-[9.5px] font-mono font-bold text-amber-800 tracking-wider uppercase flex items-center gap-1.5 select-none">
              <AlertOctagon className="h-4 w-4 text-amber-600 shrink-0" />
              Watch out! Beginner Pitfalls
            </span>
            <div className="space-y-2 text-zinc-700 font-sans">
              {recap.commonTraps.map((pit, i) => (
                <p
                  key={i}
                  className="text-[12px] leading-relaxed pl-2 border-l border-amber-300"
                >
                  {formatTextWithCode(pit)}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Chapter ladder steps */}
      <div className="border border-zinc-200 rounded-xl bg-zinc-50 p-4.5 space-y-3 mt-6">
        <span className="text-[10px] font-mono font-bold tracking-wider text-zinc-500 uppercase flex items-center gap-1.5 select-none">
          <Layers className="h-4 w-4 text-zinc-500" />
          Challenge Steps list ({activeConcept.exercises.length} Steps)
        </span>
        <p className="text-xs text-zinc-650 font-sans leading-relaxed font-normal">
          This series consists of {activeConcept.exercises.length} progressive
          exercises. Each challenge introduces a key paradigm shift to reinforce
          code logic:
        </p>

        <div className="grid grid-cols-1 gap-2 mt-2">
          {activeConcept.exercises.map((ex, idx) => (
            <div
              key={ex.id}
              className="flex items-start gap-2.5 p-2.5 rounded-lg bg-white border border-zinc-150 text-xs shadow-sm hover:border-zinc-350 hover:shadow transition-all cursor-pointer group"
              onClick={() => {
                setActiveExerciseIndex(idx);
                if (setSandboxView) {
                  setSandboxView("practice");
                }
                setLeftTab("problem");
              }}
            >
              <span className="flex-shrink-0 h-5 w-5 rounded-full bg-zinc-900 text-white font-mono text-[9px] font-extrabold flex items-center justify-center group-hover:bg-[#F7DF1E] group-hover:text-zinc-950 transition-colors">
                {idx + 1}
              </span>
              <div className="space-y-0.5 leading-normal font-sans">
                <p className="font-bold text-zinc-900 flex items-center gap-1.5">
                  {ex.title}
                  <span
                    className={`text-[8px] font-mono font-extrabold uppercase rounded px-1.5 py-0.2 ${
                      idx === activeExerciseIndex
                        ? "bg-zinc-900 text-white"
                        : "bg-zinc-100 text-zinc-500"
                    }`}
                  >
                    {idx === activeExerciseIndex
                      ? "focusing"
                      : formatDifficulty(ex.difficulty)}
                  </span>
                </p>
                <p className="text-zinc-550 text-[11px] leading-relaxed">
                  {idx === 0 ? (
                    formatTextWithCode(
                      "Baseline: Core syntax paradigm & basic function verification state.",
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

      <div className="pt-4 flex justify-end select-none">
        <button
          onClick={() => {
            setActiveExerciseIndex(0);
            if (setSandboxView) {
              setSandboxView("practice");
            }
            setLeftTab("problem");
          }}
          className="px-5 py-3 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-xs font-bold flex items-center gap-2 cursor-pointer shadow-md transition-all active:scale-[0.98]"
        >
          Begin Exercises <ArrowRight className="h-4 w-4 text-[#F7DF1E]" />
        </button>
      </div>
    </motion.div>
  );
}
