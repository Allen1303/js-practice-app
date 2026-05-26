import { Trophy, Download, Code, BookMarked } from "lucide-react";

export function Header({
  totalSolvedCount,
  totalExercisesCount,
  viewMode,
  setViewMode,
  handleExportToJS,
}) {
  return (
    <header className="border-b border-zinc-200 bg-white sticky top-0 z-50 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
      <div className="flex items-center gap-3">
        {/* Famous Yellow JS square logo badge */}
        <div className="h-10 w-10 bg-[#F7DF1E] rounded-lg flex items-center justify-center shadow-sm border border-zinc-350 select-none">
          <span className="font-mono font-black text-lg text-zinc-900 leading-none pt-2 pr-1">
            JS
          </span>
        </div>
        <div>
          <span className="font-mono text-[10px] font-bold tracking-wider text-zinc-500 uppercase">
            Self-Paced Training Hub
          </span>
          <h1 className="text-xl font-bold tracking-tight text-zinc-900 flex items-center gap-2">
            LearnJS{" "}
            <span className="text-zinc-400 font-normal">DSA Sandbox</span>
          </h1>
        </div>
      </div>

      {/* View Mode Switching segmented control */}
      <div className="flex bg-zinc-100 border border-zinc-200 p-1 rounded-xl shadow-sm select-none">
        <button
          onClick={() => setViewMode("sandbox")}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer ${
            viewMode === "sandbox"
              ? "bg-white text-zinc-950 shadow-sm border border-zinc-200"
              : "text-zinc-500 hover:text-zinc-850"
          }`}
        >
          <Code className="h-3.5 w-3.5 text-zinc-700" />
          DSA Sandbox
        </button>

        <button
          onClick={() => setViewMode("knowledge")}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold font-mono transition-all cursor-pointer ${
            viewMode === "knowledge"
              ? "bg-white text-zinc-950 shadow-sm border border-zinc-200"
              : "text-zinc-500 hover:text-zinc-850"
          }`}
        >
          <BookMarked className="h-3.5 w-3.5 text-amber-500 fill-transparent" />
          Syllabus Roadmap
        </button>
      </div>

      {/* Header CTA Tools */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
        {/* Highly Visible Offline Export Trigger */}
        <button
          id="btn_export_offline"
          onClick={handleExportToJS}
          title="Download fully annotated offline JS training playground package for VS Code / Node.js"
          className="flex items-center justify-center gap-2 px-4 py-2 bg-[#F7DF1E] hover:bg-[#edd012] border border-zinc-350 rounded-xl cursor-pointer hover:shadow-md active:scale-[0.98] transition-all text-xs font-bold text-zinc-900"
        >
          <Download className="h-4 w-4 text-zinc-850" /> Export Offline JS
          Playground (.js)
        </button>

        {/* Global Level Indicator using bright Yellow styles */}
        <div className="flex items-center gap-4 bg-zinc-100 border border-zinc-200 px-4 py-2 rounded-xl">
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-zinc-755" />
            <span className="text-xs font-mono text-zinc-600 font-medium whitespace-nowrap uppercase">
              Active Solutions
            </span>
          </div>
          <div className="flex items-center gap-1.5 bg-white border border-zinc-200 px-2.5 py-1 rounded-lg">
            <span className="text-sm font-mono font-bold text-zinc-900">
              {totalSolvedCount}
            </span>
            <span className="text-xs text-zinc-400 font-mono">/</span>
            <span className="text-xs text-zinc-500 font-mono">
              {totalExercisesCount}
            </span>
          </div>
          <div className="hidden lg:block w-24 h-2 bg-zinc-200 rounded-full overflow-hidden border border-zinc-300">
            <div
              className="h-full bg-[#F7DF1E] border-r border-[#edd012] transition-all duration-500"
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
