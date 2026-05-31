import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  HelpCircle,
  ChevronRight,
  Check,
  CheckCircle,
  Sparkles,
  ArrowRight,
  BookMarked,
  Lock,
} from "lucide-react";
import { highlightJS } from "../utils/highlighter.js";

export function Roadmap({
  knowledgeMapCategories,
  knowledgeMapTopics,
  completedTopics,
  completedTopicsCount,
  totalTopicsCount,
  completionRatePercent,
  searchQuery,
  setSearchQuery,
  selectedCategoryFilter,
  setSelectedCategoryFilter,
  expandedTopicId,
  setExpandedTopicId,
  toggleTopicProgress,
  jumpToExercise,
  clearAllMarkers,
}) {
  const maxedPercent = Math.min(completionRatePercent, 100);

  // Filter topics lists based on searching filters and category focus tabs
  const filteredTopics = useMemo(() => {
    return knowledgeMapTopics.filter((topic) => {
      const matchesCategory =
        selectedCategoryFilter === "all" ||
        topic.categoryId === selectedCategoryFilter;
      if (!matchesCategory) return false;
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        topic.title.toLowerCase().includes(q) ||
        topic.summary.toLowerCase().includes(q) ||
        topic.details.toLowerCase().includes(q) ||
        topic.takeaways.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [knowledgeMapTopics, searchQuery, selectedCategoryFilter]);

  return (
    <main className="flex-1 flex flex-col bg-zinc-50 min-h-[calc(100vh-77px)] overflow-y-auto">
      <div className="w-full max-w-7xl mx-auto px-6 py-8 flex flex-col gap-8 pb-20">
        {/* Header Jumbotron Banner */}
        <div className="bg-white border border-zinc-200 rounded-2xl p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 bottom-0 left-0 w-2 bg-[#F7DF1E]" />

          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                Syllabus Checklist
              </span>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500">
                Self-Paced Training
              </span>
            </div>
            <h2 className="text-[22px] font-black tracking-tight text-zinc-950 leading-none">
              LearnJS<span className="text-zinc-500 font-normal">.online</span>{" "}
              syllabus map
            </h2>
            <p className="text-sm text-zinc-600 leading-relaxed">
              Track your mastery through the official 12-chapter curriculum
              structure modeled after{" "}
              <strong className="text-zinc-900 font-semibold">
                LearnJS.online
              </strong>
              . Tick topics off when you are confident, and jump straight into
              the Interactive Sandbox to practice coding loops, strings, and
              lesson exercises!
            </p>
          </div>

          {/* Progress Circle / Widget */}
          <div className="bg-zinc-50 border border-zinc-200/80 p-5 rounded-2xl flex items-center justify-center gap-5 shrink-0 max-w-sm w-full md:w-auto shadow-inner select-none">
            <div className="text-center space-y-1">
              <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest block font-bold">
                YOUR COVERAGE
              </span>
              <div className="flex items-baseline justify-center gap-1.5">
                <span className="text-2xl font-mono font-black text-zinc-900">
                  {completedTopicsCount}
                </span>
                <span className="text-xs text-zinc-400 font-mono">/</span>
                <span className="text-sm text-zinc-505 font-mono">
                  {totalTopicsCount}
                </span>
              </div>
              <span className="text-[10px] font-mono text-zinc-650 font-semibold bg-white border border-zinc-200 px-2.5 py-0.5 rounded-full block shadow-sm">
                {completionRatePercent}% Mastered
              </span>
            </div>
            <div className="h-12 w-[1px] bg-zinc-200" />
            <div className="relative h-16 w-16 flex items-center justify-center">
              {/* Simple visual SVG ring */}
              <svg
                className="absolute inset-0 h-full w-full transform -rotate-90"
                viewBox="0 0 36 36"
              >
                <path
                  className="text-zinc-200"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-[#F7DF1E] transition-all duration-500"
                  strokeWidth="3.5"
                  strokeDasharray={`${maxedPercent}, 100`}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="text-xs font-mono font-black text-zinc-805 absolute">
                🚀
              </span>
            </div>
          </div>
        </div>

        {/* Main Interactive Controls Row */}
        <div className="flex flex-col md:flex-row items-center gap-4 bg-white border border-zinc-200 p-4 rounded-xl shadow-sm justify-between">
          {/* Dynamic search bar */}
          <div className="relative w-full md:max-w-md">
            <Search className="h-4.5 w-4.5 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search JavaScript concepts (e.g. slice, promises, objects)..."
              className="w-full pl-10 pr-4 py-2 text-xs bg-zinc-50 border border-zinc-200 focus:border-[#F7DF1E] focus:outline-none focus:bg-white text-zinc-900 placeholder-zinc-400 rounded-xl transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-405 hover:text-zinc-600 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Reset All Checkboxes helper */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-[11px] font-mono text-zinc-455 uppercase hidden lg:inline font-bold">
              Filters Active:
            </span>
            <span className="text-xs font-bold font-mono text-zinc-700 bg-zinc-100 border border-zinc-200 px-3 py-1.5 rounded-lg">
              Showing {filteredTopics.length} of {totalTopicsCount}
            </span>

            {completedTopicsCount > 0 && (
              <button
                onClick={clearAllMarkers}
                className="text-xs font-mono font-bold text-rose-600 hover:text-rose-700 hover:underline border border-dashed border-rose-300 bg-rose-50/50 px-3 py-1.5 rounded-lg cursor-pointer transition-colors"
              >
                Clear Markers
              </button>
            )}
          </div>
        </div>

        {/* Horizontal Chapter Select Buttons Container */}
        <div className="flex flex-wrap gap-2 pb-1 border-b border-zinc-200">
          <button
            onClick={() => setSelectedCategoryFilter("all")}
            className={`py-2 px-4 rounded-xl text-xs font-bold font-mono transition-all border cursor-pointer ${
              selectedCategoryFilter === "all"
                ? "bg-zinc-900 border-zinc-950 text-white shadow-sm"
                : "bg-white border-zinc-200 text-zinc-500 hover:bg-zinc-50"
            }`}
          >
            All Chapters
          </button>

          {knowledgeMapCategories.map((cat) => {
            const countOfCat = knowledgeMapTopics.filter(
              (t) => t.categoryId === cat.id,
            ).length;
            const completedInCat = knowledgeMapTopics.filter(
              (t) => t.categoryId === cat.id && completedTopics[t.id],
            ).length;
            const isCatFinished =
              completedInCat === countOfCat && countOfCat > 0;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategoryFilter(cat.id)}
                className={`py-2 px-3.5 rounded-xl text-xs font-bold font-mono transition-all border flex items-center gap-1.5 cursor-pointer ${
                  selectedCategoryFilter === cat.id
                    ? "bg-zinc-900 border-zinc-950 text-white shadow-sm"
                    : "bg-white border-zinc-200 text-zinc-600 hover:bg-zinc-50"
                }`}
              >
                {isCatFinished && <Check className="h-3 w-3 text-[#F7DF1E]" />}
                <span>{cat.title.split(". ")[1]}</span>
                <span
                  className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                    isCatFinished
                      ? "bg-[#F7DF1E]/20 text-zinc-800 font-bold"
                      : "bg-zinc-100 text-zinc-505"
                  }`}
                >
                  {completedInCat}/{countOfCat}
                </span>
              </button>
            );
          })}
        </div>

        {/* List of Curriculum Topic Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTopics.length === 0 ? (
            <div className="col-span-full bg-white border border-dashed border-zinc-300 p-12 rounded-2xl text-center space-y-2">
              <HelpCircle className="h-10 w-10 text-zinc-300 mx-auto" />
              <h3 className="text-base font-bold text-zinc-900">
                No syllabus topics matching "{searchQuery}"
              </h3>
              <p className="text-xs text-zinc-505 max-w-sm mx-auto font-normal">
                Try entering different Javascript search words, or clear the
                searches and verify the active Chapter headings.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategoryFilter("all");
                }}
                className="mt-3 px-4 py-2 bg-zinc-950 hover:bg-zinc-800 text-white font-mono text-xs font-bold rounded-lg cursor-pointer shadow"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredTopics.map((topic) => {
              const category = knowledgeMapCategories.find(
                (c) => c.id === topic.categoryId,
              );
              const isChecked = !!completedTopics[topic.id];
              const isExpanded = expandedTopicId === topic.id;

              // Linear progression syllabus lock:
              const topicIndex = knowledgeMapTopics.findIndex(
                (t) => t.id === topic.id,
              );
              const isUnlocked =
                topicIndex <= 0 ||
                !!completedTopics[knowledgeMapTopics[topicIndex - 1].id];

              return (
                <motion.div
                  layout="position"
                  key={topic.id}
                  className={`bg-white border rounded-2xl shadow-sm overflow-hidden transition-all duration-305 ${
                    isExpanded
                      ? "ring-2 ring-[#F7DF1E] shadow-md col-span-full md:col-span-full"
                      : !isUnlocked
                        ? "border-zinc-200 opacity-60 bg-zinc-50/50"
                        : "border-zinc-200 hover:shadow-md"
                  }`}
                >
                  {/* Card Header Portion */}
                  <div
                    onClick={() => {
                      if (isUnlocked) {
                        setExpandedTopicId(isExpanded ? null : topic.id);
                      }
                    }}
                    className={`p-5 flex items-start gap-4 justify-between select-none ${
                      isUnlocked ? "cursor-pointer group" : "cursor-not-allowed"
                    }`}
                  >
                    <div className="flex items-start gap-3.5 flex-1 select-none">
                      {/* Checkbox button triggers marker status without toggling card collapse */}
                      <button
                        type="button"
                        disabled={!isUnlocked}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isUnlocked) {
                            toggleTopicProgress(topic.id);
                          }
                        }}
                        title={
                          !isUnlocked
                            ? "This lesson is locked"
                            : isChecked
                              ? "Mark topic as incomplete"
                              : "Mark topic as mastered"
                        }
                        className={`shrink-0 mt-0.5 ${isUnlocked ? "text-zinc-655 hover:text-zinc-900 cursor-pointer" : "text-zinc-400 cursor-not-allowed"}`}
                      >
                        {!isUnlocked ? (
                          <div className="h-6 w-6 rounded-lg bg-zinc-100 flex items-center justify-center border border-zinc-200">
                            <Lock className="h-3.5 w-3.5 text-zinc-400" />
                          </div>
                        ) : isChecked ? (
                          <CheckCircle className="h-6.5 w-6.5 text-[#F7DF1E] fill-zinc-950" />
                        ) : (
                          <div className="h-6 w-6 rounded-lg border-2 border-zinc-300 hover:border-zinc-505 transition-colors" />
                        )}
                      </button>

                      <div className="space-y-1.5 select-none text-left">
                        <span
                          className={`inline-block text-[9px] font-mono font-bold tracking-wider uppercase px-2 py-0.5 rounded-md ${
                            category
                              ? category.lightColor
                              : "bg-zinc-100 text-zinc-505"
                          }`}
                        >
                          {category
                            ? category.title.split(". ")[1]
                            : "Syllabus Group"}
                        </span>

                        <h3 className="text-sm font-extrabold text-zinc-900 tracking-tight group-hover:text-zinc-950 select-none flex items-center gap-1.5">
                          {!isUnlocked && (
                            <Lock className="h-3 w-3 text-zinc-400 shrink-0" />
                          )}
                          {topic.title}
                        </h3>
                      </div>
                    </div>

                    {/* Expand indicator chevron */}
                    <div className="h-8 w-8 rounded-lg bg-zinc-50 flex items-center justify-center border border-zinc-200 text-zinc-400 group-hover:border-zinc-350 shrink-0 mt-0.5">
                      {!isUnlocked ? (
                        <Lock className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                      ) : (
                        <ChevronRight
                          className={`h-4.5 w-4.5 text-zinc-650 transition-transform duration-200 ${
                            isExpanded ? "rotate-90 text-zinc-900" : ""
                          }`}
                        />
                      )}
                    </div>
                  </div>

                  {/* Summary intro line (visible when collapsed) */}
                  {!isExpanded && (
                    <div
                      onClick={() => setExpandedTopicId(topic.id)}
                      className="px-5 pb-5 pt-0 text-xs text-zinc-505 leading-relaxed font-normal text-left cursor-pointer line-clamp-1 border-t border-dashed border-zinc-100 mt-[-4px]"
                    >
                      {topic.summary}{" "}
                      <span className="text-amber-600 font-mono text-[10px] ml-1.5 hover:underline font-bold">
                        Read details & explore snippet &rarr;
                      </span>
                    </div>
                  )}

                  {/* Expandable Body */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="border-t border-zinc-200 bg-zinc-50/50 p-6 space-y-6 text-left"
                      >
                        {/* Short Summary and Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-3.5">
                            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400 block font-bold">
                              Topic Concept manual
                            </span>
                            <p className="text-xs text-zinc-600 leading-relaxed whitespace-pre-line font-normal font-sans">
                              {topic.details}
                            </p>

                            <div className="space-y-2 bg-yellow-50/20 border border-amber-100 rounded-xl p-4">
                              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-amber-800 flex items-center gap-1 font-bold">
                                <Sparkles className="h-3.5 w-3.5 text-amber-600" />{" "}
                                Key Takeaways Checklist
                              </span>
                              <ul className="space-y-2 text-left">
                                {topic.takeaways.map((takeaway, tIdx) => (
                                  <li
                                    key={tIdx}
                                    className="text-xs text-zinc-700 flex items-start gap-1.5 font-normal"
                                  >
                                    <span className="text-[#a38b00] font-bold shrink-0 text-sm mt-[-2px]">
                                      &bull;
                                    </span>
                                    <span>{takeaway}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          {/* Live Code Snippet Display Card */}
                          <div className="flex flex-col border border-[#181a1f] rounded-xl overflow-hidden bg-[#282c34] shadow-sm">
                            <div className="flex items-center justify-between px-4 py-2 bg-[#21252b] border-b border-[#181a1f] shrink-0 select-none">
                              <span className="text-[10px] font-mono font-bold tracking-wider text-[#abb2bf] uppercase">
                                Interactive Syntax Sandbox template
                              </span>
                              <span className="text-[10px] font-mono text-[#5c6370]">
                                VANILLA JS
                              </span>
                            </div>
                            <pre
                              className="p-4 flex-1 overflow-x-auto text-[11px] font-mono text-[#abb2bf] bg-[#282c34] leading-relaxed select-all"
                              dangerouslySetInnerHTML={{
                                __html: highlightJS(topic.codeSnippet, true),
                              }}
                            />
                          </div>
                        </div>

                        {/* Direct Connection Jump back to Sandbox */}
                        <div className="pt-4 border-t border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-zinc-505">
                              Ready to build muscle memory with real code
                              assertions? See sandbox exercises!
                            </span>
                          </div>

                          <button
                            onClick={() =>
                              jumpToExercise(topic.relatedExerciseId)
                            }
                            className="py-2.5 px-5 bg-zinc-950 hover:bg-zinc-800 text-white font-mono text-xs font-bold rounded-xl flex items-center gap-2 shadow-md hover:shadow cursor-pointer transition-all active:scale-[0.98] border border-zinc-800"
                          >
                            Test This in the Sandbox{" "}
                            <ArrowRight className="h-4 w-4 text-[#F7DF1E]" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </main>
  );
}
