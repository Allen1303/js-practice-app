import { Layers, Check, Braces, Database, Terminal } from "lucide-react";

const CATEGORIES = [
  {
    id: "callbacks",
    title: "1. Isolated Callbacks",
    icon: Layers,
    subgroups: [
      {
        concepts: ["map-callbacks", "filter-callbacks", "reduce-callbacks"],
      },
    ],
  },
  {
    id: "functional-oop",
    title: "2. Functional & OOP Classes",
    icon: Braces,
    subgroups: [
      {
        title: "Functional & Scoping Elements",
        concepts: [
          "closures-scoping",
          "spread-destructuring-unpack",
          "optional-chaining-coalescing",
        ],
      },
      {
        title: "OOP Classes & Prototypes Section",
        concepts: ["oop-classes-prototype", "es6-maps-collections"],
      },
    ],
  },
  {
    id: "data-structures",
    title: "3. Basic Data Structure",
    icon: Database,
    subgroups: [
      {
        title: "Basic Data Structure",
        concepts: [
          "fcc-basic-algorithms",
          "object-dictionaries",
          "string-parsing",
          "array-search-verification",
          "set-unique-collections",
        ],
      },
      {
        title: "Advanced DSA Structures",
        concepts: ["linked-lists-trees", "stack-queue-dsa"],
      },
    ],
  },
  {
    id: "algorithms",
    title: "4. Algorithm Scripting",
    icon: Terminal,
    subgroups: [
      {
        title: "Algorithm Scripting",
        concepts: [
          "basic-algorithm-scripting",
          "intermediate-algorithm-scripting",
        ],
      },
      {
        title: "Sequential DSA Paradigms",
        concepts: ["two-pointer-sliding-window", "recursion-call-stack"],
      },
    ],
  },
];

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
      <div className="space-y-6 pb-6">
        {CATEGORIES.map((category) => {
          const IconComponent = category.icon;
          // Check if category has any matching concepts at all
          const totalCategoryConcepts = concepts.filter((c) =>
            category.subgroups.some((g) => g.concepts.includes(c.id)),
          );

          if (totalCategoryConcepts.length === 0) return null;

          return (
            <div key={category.id} className="space-y-3">
              <div className="flex items-center gap-2 text-zinc-500 font-mono text-[10.5px] uppercase font-bold tracking-wider px-2 border-b border-zinc-150 pb-1.5 pointer-events-none">
                <IconComponent className="h-3.5 w-3.5 text-zinc-400" />
                <span>{category.title}</span>
              </div>

              <div className="space-y-4">
                {category.subgroups.map((subgroup, subIdx) => {
                  const subgroupConcepts = concepts.filter((c) =>
                    subgroup.concepts.includes(c.id),
                  );
                  if (subgroupConcepts.length === 0) return null;

                  return (
                    <div key={subIdx} className="space-y-2">
                      {subgroup.title && (
                        <div className="text-[9.5px] font-mono font-bold tracking-widest uppercase text-zinc-400 px-2 pt-1 pointer-events-none">
                          {subgroup.title}
                        </div>
                      )}

                      <div className="space-y-2">
                        {subgroupConcepts.map((concept) => {
                          const solvedInConcept = concept.exercises.filter(
                            (e) => solvedExercises[e.id],
                          ).length;
                          const isSelected = concept.id === activeConceptId;
                          const isMastered =
                            solvedInConcept === concept.exercises.length &&
                            concept.exercises.length > 0;

                          return (
                            <button
                              key={concept.id}
                              onClick={() => {
                                setActiveConceptId(concept.id);
                                setActiveExerciseIndex(0);
                                setLeftTab("theory");
                              }}
                              className={`w-full text-left p-3 rounded-xl border transition-all duration-200 flex flex-col gap-1.5 group relative overflow-hidden cursor-pointer ${
                                isSelected
                                  ? "bg-yellow-50/60 border-[#F7DF1E] shadow-sm text-zinc-900 font-semibold"
                                  : "bg-white border-zinc-200 hover:bg-zinc-50 text-zinc-700"
                              }`}
                            >
                              {/* Subtle active state visual indicator */}
                              {isSelected && (
                                <div className="absolute top-0 bottom-0 left-0 w-1 bg-[#F7DF1E]" />
                              )}

                              <div className="flex items-start justify-between gap-1.5">
                                <h4 className="text-[11.5px] font-bold tracking-tight text-zinc-900 group-hover:text-zinc-950 transition-colors">
                                  {concept.title}
                                </h4>

                                {/* Mastery Level Badge */}
                                {isMastered ? (
                                  <span className="flex items-center gap-[2px] text-[8px] font-mono font-bold uppercase tracking-wider text-zinc-800 px-1 py-[1px] rounded bg-[#F7DF1E]/85 border border-[#edd012] shrink-0">
                                    <Check className="h-2 w-2 inline" /> OK
                                  </span>
                                ) : (
                                  <span className="text-[10px] font-mono text-zinc-400 shrink-0">
                                    {solvedInConcept}/{concept.exercises.length}
                                  </span>
                                )}
                              </div>

                              <p className="text-[10.5px] text-zinc-500 line-clamp-1 leading-normal font-normal">
                                {concept.shortDescription}
                              </p>

                              {/* Progressive bar meter */}
                              <div className="w-full bg-zinc-100 border border-zinc-150 h-1.5 rounded-full overflow-hidden mt-0.5">
                                <div
                                  className={`h-full rounded-full transition-all duration-300 ${isMastered ? "bg-[#F7DF1E]" : "bg-zinc-850"}`}
                                  style={{
                                    width: `${concept.exercises.length > 0 ? (solvedInConcept / concept.exercises.length) * 100 : 0}%`,
                                  }}
                                />
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
