import { CheckCircle } from "lucide-react";
import { formatDifficulty } from "../utils/difficultyFormatter.js";

export function ExerciseNavigator({
  activeConcept,
  activeExerciseIndex,
  setActiveExerciseIndex,
  setLeftTab,
  solvedExercises,
  currentConceptSolvedCount,
}) {
  return (
    <>
      {/* Horizontal Exercise Selection Indicators */}
      <div className="flex items-center justify-between border-b border-zinc-200 shrink-0 bg-white/95 backdrop-blur-sm sticky top-0 px-6 py-3 z-10">
        <span className="text-xs font-mono text-zinc-500 uppercase font-bold tracking-wide">
          Dynamic Reps ({activeConcept.exercises.length} Needed)
        </span>

        <div className="text-[10px] font-mono text-zinc-755 bg-[#F7DF1E]/20 border border-[#edd012] px-2.5 py-0.5 rounded animate-pulse">
          {currentConceptSolvedCount === activeConcept.exercises.length
            ? "⭐️ CATEGORY MASTERED"
            : `Done: ${currentConceptSolvedCount} of ${activeConcept.exercises.length}`}
        </div>
      </div>

      {/* Rep selector ribbon */}
      <div
        className="grid divide-x divide-zinc-200 border-b border-zinc-200 shrink-0 bg-zinc-50"
        style={{
          gridTemplateColumns: `repeat(${activeConcept.exercises.length}, minmax(0, 1fr))`,
        }}
      >
        {activeConcept.exercises.map((ex, idx) => {
          const isSelected = idx === activeExerciseIndex;
          const isSolved = solvedExercises[ex.id];

          return (
            <button
              key={ex.id}
              onClick={() => {
                setActiveExerciseIndex(idx);
                setLeftTab("problem");
              }}
              className={`p-3 text-center flex flex-col items-center justify-center gap-1 group relative transition-colors ${
                isSelected
                  ? "bg-white text-zinc-900"
                  : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800"
              }`}
            >
              <span className="text-[10px] uppercase font-mono tracking-wider font-bold block select-none">
                PRACTICE {idx + 1}
              </span>

              <div className="flex items-center justify-center mt-1">
                {isSolved ? (
                  <CheckCircle className="h-4.5 w-4.5 text-zinc-950 shrink-0 fill-[#F7DF1E]" />
                ) : (
                  <div
                    className={`h-3.5 w-3.5 rounded-full border transition-all ${
                      isSelected
                        ? "border-[#F7DF1E] bg-[#F7DF1E]/40"
                        : "border-zinc-300 group-hover:border-zinc-400"
                    }`}
                  />
                )}
              </div>

              <span className="text-[9px] font-mono text-zinc-400 mt-1 select-none">
                {formatDifficulty(ex.difficulty)}
              </span>

              {/* Active highlight bar under selector */}
              {isSelected && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#F7DF1E]" />
              )}
            </button>
          );
        })}
      </div>
    </>
  );
}
