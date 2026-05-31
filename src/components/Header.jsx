import { Trophy, Code, BookMarked, RotateCcw, Layers } from "lucide-react";

export function Header({
  totalSolvedCount,
  totalExercisesCount,
  viewMode,
  setViewMode,
  handleResetFullWorkspace,
}) {
  return (
    <header className="border-b border-zinc-200 bg-white sticky top-0 z-50 px-6 py-2.5 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs select-none">
      <div className="flex items-center gap-3">
        {/* Famous Yellow JS square logo badge */}
        <div className="h-9 w-9 bg-[#F7DF1E] rounded flex items-center justify-center shadow-xs border border-zinc-300 select-none shrink-0">
          <span className="font-mono font-black text-base text-zinc-900 leading-none pt-1">
            JS
          </span>
        </div>
        <div>
          <h1 className="text-base font-extrabold tracking-tight text-zinc-900 flex items-center gap-1 leading-none">
            learnJS
            <span className="text-[8px] font-mono font-extrabold uppercase tracking-wide px-1.5 py-0.2 rounded bg-[#F7DF1E]/15 border border-[#edd012] text-zinc-900 leading-none">
              PRO
            </span>
          </h1>
          <span className="font-mono text-[8px] font-bold tracking-widest text-zinc-400 uppercase block mt-0.5">
            interactive companion
          </span>
        </div>
      </div>

      {/* View Mode Switching segmented control */}
      <div className="flex bg-zinc-150/80 border border-zinc-200/80 p-0.5 rounded-lg select-none">
        <button
          onClick={() => setViewMode("sandbox")}
          className={`flex items-center gap-1 px-3 py-1.2 rounded-md text-xs font-bold font-sans transition-all cursor-pointer ${
            viewMode === "sandbox"
              ? "bg-white text-zinc-950 shadow-xs border border-zinc-200/80"
              : "text-zinc-500 hover:text-zinc-800"
          }`}
        >
          <Code className="h-3 w-3 text-zinc-650" />
          Interactive Lessons
        </button>

        <button
          onClick={() => setViewMode("knowledge")}
          className={`flex items-center gap-1 px-3 py-1.2 rounded-md text-xs font-bold font-sans transition-all cursor-pointer ${
            viewMode === "knowledge"
              ? "bg-white text-zinc-950 shadow-xs border border-zinc-200/80"
              : "text-zinc-500 hover:text-zinc-800"
          }`}
        >
          <BookMarked className="h-3 w-3 text-amber-500" />
          Syllabus Map
        </button>

        <button
          onClick={() => setViewMode("flashcards")}
          className={`flex items-center gap-1 px-3 py-1.2 rounded-md text-xs font-bold font-sans transition-all cursor-pointer ${
            viewMode === "flashcards"
              ? "bg-white text-zinc-950 shadow-xs border border-zinc-200/80"
              : "text-zinc-500 hover:text-zinc-800"
          }`}
        >
          <Layers className="h-3 w-3 text-emerald-500" />
          Flashcards
        </button>
      </div>

      {/* Header CTA Tools */}
      <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-start">
        {/* Subtle low-profile Reset Progress Button */}
        <button
          onClick={handleResetFullWorkspace}
          title="Completely reset sandbox progress, written codes, syllabus indicators, and notebook comments to initial state"
          className="flex items-center justify-center gap-1 px-2.5 py-1.5 text-zinc-400 hover:text-rose-600 bg-white hover:bg-rose-50/20 border border-zinc-200 hover:border-rose-100 rounded-lg cursor-pointer transition-all text-xs font-semibold font-sans"
        >
          <RotateCcw className="h-3 w-3" />
          <span>Reset Progress</span>
        </button>

        {/* Global Level Indicator using bright Yellow styles */}
        <div className="flex items-center gap-3 bg-zinc-50 border border-zinc-200 px-3 py-1 rounded-lg">
          <div className="flex items-center gap-1.5">
            <Trophy className="h-3.5 w-3.5 text-amber-500" />
            <span className="text-[10px] font-bold text-zinc-500 whitespace-nowrap uppercase font-mono">
              Solved
            </span>
          </div>
          <div className="flex items-center gap-1 bg-white border border-zinc-200 px-2 py-0.5 rounded">
            <span className="text-xs font-mono font-bold text-zinc-900">
              {totalSolvedCount}
            </span>
            <span className="text-[10px] text-zinc-400 font-mono">/</span>
            <span className="text-xs text-zinc-500 font-mono">
              {totalExercisesCount}
            </span>
          </div>
          <div className="hidden md:block w-16 h-1.5 bg-zinc-200 rounded-full overflow-hidden border border-zinc-250">
            <div
              className="h-full bg-[#F7DF1E] transition-all duration-500"
              style={{
                width: `${totalExercisesCount > 0 ? (totalSolvedCount / totalExercisesCount) * 100 : 0}%`,
              }}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
