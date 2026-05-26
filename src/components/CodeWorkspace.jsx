import { Code, Lightbulb, RotateCcw, Sparkles } from "lucide-react";

export function CodeWorkspace({
  currentCode,
  handleCodeChange,
  handleKeyDown,
  activeExerciseIndex,
  showPrevReference,
  setShowPrevReference,
  prevExercise,
  handleResetCode,
  prevCode,
  lineNumbers,
  workspaceHeight = 560,
  setWorkspaceHeight,
}) {
  const handleMouseDown = (e) => {
    e.preventDefault();
    const startY = e.clientY;
    const startHeight = workspaceHeight;

    const handleMouseMove = (moveEvent) => {
      const deltaY = moveEvent.clientY - startY;
      const newHeight = Math.max(220, Math.min(800, startHeight + deltaY));
      if (setWorkspaceHeight) {
        setWorkspaceHeight(newHeight);
      }
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      style={{ height: `${workspaceHeight}px` }}
      className="shrink-0 flex flex-col overflow-hidden bg-white border-b border-zinc-200 relative pb-1.5"
    >
      {/* Editor Action Header */}
      <div className="flex items-center justify-between border-b border-zinc-200 shrink-0 bg-white px-6 py-3">
        <span className="text-xs font-mono font-bold tracking-wider text-zinc-700 uppercase flex items-center gap-1.5">
          <Code className="h-4 w-4 text-[#ecd214]" />
          Interactive JS Workspace
        </span>

        <div className="flex items-center gap-2">
          {activeExerciseIndex > 0 && (
            <button
              onClick={() => setShowPrevReference(!showPrevReference)}
              title="See model solution or code from previous challenge as reference"
              className={`p-1 px-2.5 rounded transition-all flex items-center gap-1.5 text-[11px] font-mono border cursor-pointer ${
                showPrevReference
                  ? "bg-amber-100/75 text-amber-950 border-amber-300 shadow-sm font-bold"
                  : "bg-zinc-100 text-zinc-650 hover:text-zinc-950 hover:bg-zinc-200 border-zinc-200"
              }`}
            >
              <Lightbulb
                className={`h-3.5 w-3.5 ${showPrevReference ? "text-amber-600 fill-amber-300" : "text-zinc-400"}`}
              />
              <span>
                {showPrevReference
                  ? "Hide Evolution Guide"
                  : "Compare Step Upgrade"}
              </span>
            </button>
          )}

          <button
            onClick={handleResetCode}
            title="Reset template code"
            className="p-1 px-2.5 rounded bg-zinc-100 text-zinc-650 hover:text-zinc-950 hover:bg-zinc-200 transition-colors flex items-center gap-1.5 text-[11px] font-mono border border-zinc-200 cursor-pointer"
          >
            <RotateCcw className="h-3 w-3" /> Reset
          </button>
        </div>
      </div>

      {/* Code Workspace Frame */}
      <div className="flex-1 relative border-b border-zinc-200 flex overflow-hidden min-h-[160px] bg-white">
        {/* Line numbers rail using Consolas styling */}
        <div className="w-12 bg-zinc-50 select-none flex flex-col pt-4 pb-4 font-mono text-xs text-zinc-400 text-right pr-3 leading-6 border-r border-zinc-200 shrink-0">
          {lineNumbers.map((num) => (
            <span key={num} className="block">
              {num}
            </span>
          ))}
        </div>

        {/* Code TextArea using pure Consolas font mappings */}
        <textarea
          value={currentCode}
          onChange={(e) => handleCodeChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 p-4 bg-white text-zinc-900 font-mono text-sm focus:outline-none focus:ring-0 leading-6 resize-none overflow-y-auto whitespace-pre tab-calc selection:bg-[#F7DF1E]/45 focus:bg-zinc-50/20"
          spellCheck="false"
          placeholder="// Enter your JavaScript code here..."
        />

        {/* Quick shortcut overlay logo */}
        <div className="absolute bottom-2 left-16 text-[10px] font-mono text-zinc-400 select-none pointer-events-none hidden md:block z-20">
          Press{" "}
          <kbd className="bg-zinc-100 px-1 py-0.5 rounded border border-zinc-200 font-bold text-zinc-650">
            Ctrl + Enter
          </kbd>{" "}
          to run tests
        </div>

        {/* Side-by-Side Pattern Progression Upgrade Panel */}
        {showPrevReference && prevExercise && (
          <div className="w-[360px] border-l border-zinc-200 bg-zinc-50 p-4 overflow-y-auto flex flex-col space-y-4 text-xs font-sans shrink-0 shadow-[-4px_0_12px_rgba(0,0,0,0.02)] z-10">
            <div className="flex items-center justify-between border-b border-zinc-200 pb-2">
              <span className="font-mono font-bold text-zinc-800 tracking-wider uppercase text-[9.5px] flex items-center gap-1">
                <Sparkles className="h-3.5 w-3.5 text-[#ecd214] fill-amber-100" />
                Pattern Evolution
              </span>
              <span className="text-[9px] font-mono bg-amber-50 text-amber-800 px-1.5 py-0.5 rounded border border-amber-200/60 font-semibold">
                Step {activeExerciseIndex} → {activeExerciseIndex + 1}
              </span>
            </div>

            <div className="space-y-1">
              <h4 className="font-extrabold text-zinc-805 text-[11px] uppercase tracking-tight">
                Active Concept Path:
              </h4>
              <p className="text-zinc-650 leading-relaxed text-[11px]">
                Building from{" "}
                <strong className="text-zinc-900">{prevExercise.title}</strong>{" "}
                to{" "}
                <strong className="text-zinc-900">{prevExercise.title}</strong>{" "}
                in the curriculum sequence.
              </p>
            </div>

            <div className="bg-amber-50/50 p-3 rounded-lg border border-amber-200/60 space-y-1.5">
              <span className="text-[9px] font-mono text-amber-800 font-bold uppercase tracking-wider block">
                Cognitive Delta (The Upgrade)
              </span>
              <p className="text-zinc-700 leading-normal text-[11px]">
                🎯{" "}
                <strong className="text-zinc-950">Current delta shift:</strong>{" "}
                {prevExercise.explanation}
              </p>
            </div>

            <div className="flex-1 flex flex-col space-y-2 min-h-0 font-sans">
              <div className="flex items-center justify-between text-[9px] font-mono font-bold text-zinc-550 uppercase tracking-wider">
                <span>Step {activeExerciseIndex} Reference Code</span>
                <button
                  onClick={() => {
                    if (
                      confirm(
                        "Replace your active workspace draft with your solve from the previous step? Current draft will be overwritten.",
                      )
                    ) {
                      handleCodeChange(prevCode);
                    }
                  }}
                  className="text-[9px] font-mono font-bold text-zinc-800 bg-[#F7DF1E] hover:bg-[#edd012] border border-zinc-350 px-2 py-0.5 rounded shadow-sm transition-all cursor-pointer active:scale-95"
                  title="Load previous code to current workspace as code draft"
                >
                  Carry Code Forward
                </button>
              </div>

              <div className="relative flex-1 flex flex-col min-h-[160px] bg-zinc-950 rounded-lg overflow-hidden border border-zinc-850 shadow-inner">
                <div className="flex items-center justify-between px-3 py-1.5 bg-zinc-900 border-b border-zinc-850 text-[9px] font-mono text-zinc-400">
                  <span>
                    {prevCode ? "✅ REFERENCE CODE" : "DEFAULT TEMPLATE"}
                  </span>
                  <span>JS / READ-ONLY</span>
                </div>
                <pre className="flex-1 p-3 font-mono text-[11px] leading-relaxed select-all overflow-auto text-yellow-300 bg-zinc-950">
                  <code>{prevCode}</code>
                </pre>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Adjustable Height Resize Drag Edge */}
      <div
        onMouseDown={handleMouseDown}
        className="absolute bottom-0 left-0 right-0 h-1.5 cursor-ns-resize bg-zinc-200/40 hover:bg-[#F7DF1E]/50 active:bg-[#F7DF1E]/80 transition-all z-30 flex items-center justify-center group"
        title="Drag up or down to resize workspace and assertion console"
      >
        <div className="w-12 h-1 rounded-full bg-zinc-300 group-hover:bg-zinc-650 transition-colors" />
      </div>
    </div>
  );
}
