import { Layers, Check } from "lucide-react";

export function ConceptSelector({
  concepts,
  solvedExercises,
  activeConceptId,
  setActiveConceptId,
  setActiveExerciseIndex,
  setLeftTab,
}) {
  return (
    <section className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-zinc-200 bg-white flex flex-col pt-5 px-4 overflow-y-auto shrink-0 max-h-[300px] lg:max-h-none">
      <div className="flex items-center gap-2 text-zinc-500 font-mono text-[11px] uppercase font-bold tracking-wider mb-4 px-2">
        <Layers className="h-3.5 w-3.5 text-zinc-650" />
        <span>Isolated Callbacks</span>
      </div>

      <div className="space-y-2.5 pb-6">
        {concepts.map((concept) => {
          const solvedInConcept = concept.exercises.filter(
            (e) => solvedExercises[e.id],
          ).length;
          const isSelected = concept.id === activeConceptId;
          const isMastered = solvedInConcept === concept.exercises.length;

          return (
            <button
              key={concept.id}
              onClick={() => {
                setActiveConceptId(concept.id);
                setActiveExerciseIndex(0);
                setLeftTab("theory");
              }}
              className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 flex flex-col gap-2 group relative overflow-hidden ${
                isSelected
                  ? "bg-yellow-50/60 border-[#F7DF1E] shadow-sm text-zinc-900"
                  : "bg-white border-zinc-200 hover:bg-zinc-50 text-zinc-700"
              }`}
            >
              {/* Subtle active state visual indicator */}
              {isSelected && (
                <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-[#F7DF1E]" />
              )}

              <div className="flex items-start justify-between gap-2">
                <h3 className="text-xs font-bold tracking-tight text-zinc-900 group-hover:text-zinc-950 transition-colors">
                  {concept.title}
                </h3>

                {/* Mastery Level Badge */}
                {isMastered ? (
                  <span className="flex items-center gap-1 text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-805 px-1.5 py-0.5 rounded bg-[#F7DF1E] border border-[#edd012]">
                    <Check className="h-3 w-3 inline" /> Mastered
                  </span>
                ) : (
                  <span className="text-[11px] font-mono text-zinc-400">
                    {solvedInConcept}/{concept.exercises.length} Done
                  </span>
                )}
              </div>

              <p className="text-[11px] text-zinc-500 line-clamp-2 leading-relaxed font-normal">
                {concept.shortDescription}
              </p>

              {/* Progressive bar meter */}
              <div className="w-full bg-zinc-100 border border-zinc-200 h-1.5 rounded-full overflow-hidden mt-1">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${isMastered ? "bg-[#F7DF1E]" : "bg-zinc-850"}`}
                  style={{
                    width: `${(solvedInConcept / concept.exercises.length) * 100}%`,
                  }}
                />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
