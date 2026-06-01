import { useRef, useEffect } from "react";
import { Code, Lightbulb, RotateCcw, Sparkles } from "lucide-react";
import { highlightJS } from "../utils/highlighter.js";
import { formatTextWithCode } from "../utils/textFormatter.jsx";

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
  workspaceHeight = 500,
  setWorkspaceHeight,
}) {
  const highlightRef = useRef(null);
  const textareaRef = useRef(null);

  const handleScroll = (e) => {
    if (highlightRef.current) {
      highlightRef.current.scrollTop = e.target.scrollTop;
      highlightRef.current.scrollLeft = e.target.scrollLeft;
    }
  };

  useEffect(() => {
    if (textareaRef.current && highlightRef.current) {
      highlightRef.current.scrollTop = textareaRef.current.scrollTop;
      highlightRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  }, [currentCode]);

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

  const handleKeyDownLocal = (e) => {
    if (handleKeyDown) {
      handleKeyDown(e);
    }

    if (e.defaultPrevented) return;

    const textarea = textareaRef.current;
    if (!textarea) return;

    const { selectionStart, selectionEnd } = textarea;
    const key = e.key;

    if (key === "Tab") {
      e.preventDefault();
      const value = textarea.value;
      const newValue =
        value.slice(0, selectionStart) + "  " + value.slice(selectionEnd);
      handleCodeChange(newValue);
      setTimeout(() => {
        textarea.selectionStart = selectionStart + 2;
        textarea.selectionEnd = selectionStart + 2;
      }, 0);
      return;
    }

    if (selectionStart === selectionEnd) {
      const openPairs = {
        "(": ")",
        "[": "]",
        "{": "}",
        '"': '"',
        "'": "'",
        "`": "`",
      };

      if (openPairs[key] !== undefined) {
        e.preventDefault();
        const value = textarea.value;
        const closingChar = openPairs[key];

        const newValue =
          value.slice(0, selectionStart) +
          key +
          closingChar +
          value.slice(selectionStart);
        handleCodeChange(newValue);

        setTimeout(() => {
          textarea.selectionStart = selectionStart + 1;
          textarea.selectionEnd = selectionStart + 1;
        }, 0);
        return;
      }

      if (key === "Backspace") {
        const value = textarea.value;
        const prevChar = value[selectionStart - 1];
        const nextChar = value[selectionStart];
        const matchingPairs = {
          "(": ")",
          "[": "]",
          "{": "}",
          '"': '"',
          "'": "'",
          "`": "`",
        };
        if (prevChar && matchingPairs[prevChar] === nextChar) {
          e.preventDefault();
          const newValue =
            value.slice(0, selectionStart - 1) +
            value.slice(selectionStart + 1);
          handleCodeChange(newValue);
          setTimeout(() => {
            textarea.selectionStart = selectionStart - 1;
            textarea.selectionEnd = selectionStart - 1;
          }, 0);
          return;
        }
      }

      const closingChars = [")", "]", "}", '"', "'", "`"];
      if (closingChars.includes(key)) {
        const value = textarea.value;
        const nextChar = value[selectionStart];
        if (nextChar === key) {
          e.preventDefault();
          setTimeout(() => {
            textarea.selectionStart = selectionStart + 1;
            textarea.selectionEnd = selectionStart + 1;
          }, 0);
          return;
        }
      }

      if (key === "Enter") {
        const value = textarea.value;
        const prevChar = value[selectionStart - 1];
        const nextChar = value[selectionStart];
        if (prevChar === "{" && nextChar === "}") {
          e.preventDefault();
          const lines = value.slice(0, selectionStart).split("\n");
          const currentLine = lines[lines.length - 1];
          const indentMatch = currentLine.match(/^\s*/);
          const indent = indentMatch ? indentMatch[0] : "";
          const extraIndent = indent + "  ";
          const newValue =
            value.slice(0, selectionStart) +
            "\n" +
            extraIndent +
            "\n" +
            indent +
            value.slice(selectionStart);
          handleCodeChange(newValue);
          setTimeout(() => {
            textarea.selectionStart = selectionStart + 1 + extraIndent.length;
            textarea.selectionEnd = selectionStart + 1 + extraIndent.length;
          }, 0);
          return;
        }
      }
    }
  };

  return (
    <div
      style={{ height: `${workspaceHeight}px` }}
      className="shrink-0 flex flex-col overflow-hidden bg-[#282c34] border-b border-zinc-800 relative pb-1.5"
    >
      {/* Editor Action Code Tab-Strip */}
      <div className="flex items-center justify-between border-b border-[#181a1f] shrink-0 bg-[#1e222b] px-4 py-1.5">
        <div className="flex items-center gap-1.5 select-none">
          {/* Active solution file tab decoration */}
          <div className="flex items-center gap-2 bg-[#282c34] text-zinc-200 border-t-2 border-yellow-500 rounded-t px-3.5 py-1.5 text-xs font-mono font-bold shadow-xs select-none">
            <span className="h-3 w-3 bg-[#F7DF1E] text-zinc-900 rounded-[2px] font-mono font-extrabold text-[8px] flex items-center justify-center pt-0.5 leading-none">
              JS
            </span>
            index.js
          </div>
        </div>

        <div className="flex items-center gap-2">
          {activeExerciseIndex > 0 && (
            <button
              onClick={() => setShowPrevReference(!showPrevReference)}
              title="Compare with your solution from previous challenge step"
              className={`p-1 px-2.5 rounded transition-all flex items-center gap-1.5 text-[10.5px] font-mono border cursor-pointer ${
                showPrevReference
                  ? "bg-[#2c2b21] text-yellow-400 border-yellow-800/80 font-bold"
                  : "bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 border-zinc-700"
              }`}
            >
              <Lightbulb
                className={`h-3 w-3 ${showPrevReference ? "text-yellow-400 fill-yellow-400/20" : "text-zinc-500"}`}
              />
              <span>
                {showPrevReference ? "Hide evolution guide" : "Compare steps"}
              </span>
            </button>
          )}

          <button
            onClick={handleResetCode}
            title="Reset active code draft to initial lesson boilerplate"
            className="p-1 px-2.5 rounded bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors flex items-center gap-1.5 text-[10.5px] font-mono border border-zinc-700 cursor-pointer"
          >
            <RotateCcw className="h-3 w-3" /> Reset
          </button>
        </div>
      </div>

      {/* Code Workspace Frame */}
      <div className="flex-1 relative border-b border-[#181a1f] flex overflow-hidden min-h-[160px] bg-[#282c34]">
        {/* Line numbers rail */}
        <div className="w-11 bg-[#21252b] select-none flex flex-col pt-4 pb-4 font-mono text-[11px] text-[#4b5263] text-right pr-3 leading-6 border-r border-[#181a1f] shrink-0">
          {lineNumbers.map((num) => (
            <span key={num} className="block">
              {num}
            </span>
          ))}
        </div>

        {/* Code Highlight Overlay Frame */}
        <div className="flex-1 relative overflow-hidden bg-[#282c34]">
          <pre
            ref={highlightRef}
            className="absolute inset-0 p-4 m-0 w-full h-full bg-[#282c34] font-mono text-[13px] leading-6 whitespace-pre overflow-hidden pointer-events-none select-none z-0 text-[#abb2bf]"
            dangerouslySetInnerHTML={{
              __html: highlightJS(
                currentCode.endsWith("\n") ? currentCode + " " : currentCode,
                true,
              ),
            }}
          />
          <textarea
            ref={textareaRef}
            value={currentCode}
            onChange={(e) => handleCodeChange(e.target.value)}
            onKeyDown={handleKeyDownLocal}
            onScroll={handleScroll}
            className="absolute inset-0 p-4 m-0 w-full h-full bg-transparent text-transparent caret-yellow-400 font-mono text-[13px] focus:outline-none focus:ring-0 leading-6 resize-none overflow-auto whitespace-pre tab-calc selection:bg-[#3e4451]/70 z-10 font-bold"
            spellCheck="false"
            placeholder="// Enter your JavaScript code here..."
          />
        </div>

        {/* Side-by-Side Pattern Progression Upgrade Panel */}
        {showPrevReference && prevExercise && (
          <div className="w-[360px] border-l border-zinc-800 bg-[#21252b] p-4 overflow-y-auto flex flex-col space-y-4 text-xs font-sans shrink-0 shadow-2xl z-10">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
              <span className="font-mono font-bold text-zinc-300 tracking-wider uppercase text-[9.5px] flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-[#ecd214] fill-amber-100/10" />
                Pattern Evolution
              </span>
              <span className="text-[9px] font-mono bg-yellow-500/10 text-yellow-400 px-2 py-0.5 rounded border border-yellow-500/10 font-semibold">
                Step {activeExerciseIndex} → {activeExerciseIndex + 1}
              </span>
            </div>

            <div className="space-y-1">
              <h4 className="font-extrabold text-zinc-200 text-[11px] uppercase tracking-tight">
                Active Concept Path:
              </h4>
              <p className="text-zinc-400 leading-relaxed text-[11px]">
                Building from{" "}
                <strong className="text-white">{prevExercise.title}</strong> to{" "}
                <strong className="text-white">{prevExercise.title}</strong> in
                the curriculum sequence.
              </p>
            </div>

            <div className="bg-yellow-500/5 p-3 rounded-lg border border-yellow-500/10 space-y-1.5">
              <span className="text-[9px] font-mono text-yellow-400 font-bold uppercase tracking-wider block">
                Cognitive Delta (The Upgrade)
              </span>
              <p className="text-zinc-300 leading-normal text-[11px]">
                🎯 <strong className="text-white">Current delta shift:</strong>{" "}
                {formatTextWithCode(prevExercise.explanation, true)}
              </p>
            </div>

            <div className="flex-1 flex flex-col space-y-2 min-h-0 font-sans">
              <div className="flex items-center justify-between text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-wider">
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
                  className="text-[9px] font-mono font-bold text-zinc-950 bg-[#F7DF1E] hover:bg-[#edd012] border border-zinc-700 px-2 py-0.5 rounded shadow-sm transition-all cursor-pointer active:scale-95"
                  title="Load previous code to current workspace as code draft"
                >
                  Carry Code Forward
                </button>
              </div>

              <div className="relative flex-1 flex flex-col min-h-[160px] bg-[#282c34] rounded-lg overflow-hidden border border-zinc-950 shadow-inner">
                <div className="flex items-center justify-between px-3 py-1.5 bg-[#1a1c22] border-b border-[#121317] text-[9px] font-mono text-[#abb2bf]">
                  <span>
                    {prevCode ? "✅ REFERENCE CODE" : "DEFAULT TEMPLATE"}
                  </span>
                  <span>JS / READ-ONLY</span>
                </div>
                <pre
                  className="flex-1 p-3 font-mono text-[11px] leading-relaxed select-all overflow-auto bg-[#282c34] text-[#abb2bf]"
                  dangerouslySetInnerHTML={{
                    __html: highlightJS(prevCode || "", true),
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Adjustable Height Resize Drag Edge */}
      <div
        onMouseDown={handleMouseDown}
        className="absolute bottom-0 left-0 right-0 h-1.5 cursor-ns-resize bg-zinc-800/80 hover:bg-[#F7DF1E]/40 active:bg-[#F7DF1E]/70 transition-all z-30 flex items-center justify-center group"
        title="Drag up or down to resize workspace and assertion console"
      >
        <div className="w-12 h-1 rounded-full bg-zinc-650 group-hover:bg-[#F7DF1E] transition-colors" />
      </div>
    </div>
  );
}
