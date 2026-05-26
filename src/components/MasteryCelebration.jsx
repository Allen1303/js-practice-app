import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ArrowRight } from "lucide-react";

export function MasteryCelebration({
  isConceptMastered,
  activeConcept,
  activeConceptId,
  setActiveConceptId,
  setActiveExerciseIndex,
  concepts,
}) {
  return (
    <AnimatePresence>
      {isConceptMastered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-zinc-900/40 backdrop-blur-md z-50 flex items-center justify-center p-4 select-none"
        >
          <motion.div
            initial={{ scale: 0.95, y: 15 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 15 }}
            className="bg-white border-2 border-[#F7DF1E] max-w-md w-full p-8 rounded-2xl text-center space-y-6 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-[#F7DF1E]" />

            <div className="mx-auto h-16 w-16 bg-[#F7DF1E] rounded-2xl flex items-center justify-center shadow-md animate-bounce border border-zinc-300">
              <Sparkles className="h-8 w-8 text-zinc-955" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-bold text-zinc-700 uppercase tracking-widest block font-bold">
                CATEGORY REPS MET!
              </span>
              <h3 className="text-2xl font-black text-zinc-900 tracking-tight text-center">
                Concept Mastered!
              </h3>
              <p className="text-sm text-zinc-650 leading-relaxed max-w-sm mx-auto font-sans font-normal">
                Outstanding work! You finished all high-density algorithms for{" "}
                <strong className="text-zinc-950 font-bold">
                  {activeConcept.title}
                </strong>
                , solidifying these callback structures into your repertoire.
              </p>
            </div>

            {/* Progress metrics */}
            <div className="bg-zinc-50 border border-zinc-200 p-4 rounded-xl flex items-center justify-around shadow-sm select-none">
              <div className="text-center">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                  Solved Tasks
                </span>
                <span className="text-base font-mono font-bold text-zinc-950">
                  {activeConcept.exercises.length} /{" "}
                  {activeConcept.exercises.length}
                </span>
              </div>
              <div className="h-8 w-[1px] bg-zinc-200" />
              <div className="text-center">
                <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block">
                  Mastery Score
                </span>
                <span className="text-base font-mono font-bold text-zinc-905">
                  100%
                </span>
              </div>
            </div>

            <div className="flex gap-3 justify-center pt-2 select-none">
              <button
                onClick={() => {
                  // Navigate to next category concept
                  const currentIdx = concepts.findIndex(
                    (c) => c.id === activeConceptId,
                  );
                  const nextIdx = (currentIdx + 1) % concepts.length;
                  setActiveConceptId(concepts[nextIdx].id);
                  setActiveExerciseIndex(0);
                }}
                className="w-full py-3 bg-[#F7DF1E] hover:bg-[#edd012] border border-zinc-300 text-sm font-bold text-zinc-950 rounded-xl shadow-sm cursor-pointer transition-all flex items-center justify-center gap-2"
              >
                Configure Next Concept <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
