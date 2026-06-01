import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  RotateCcw,
  Play,
  Check,
  AlertCircle,
  RefreshCw,
  Terminal,
  Globe,
  BookOpen,
  Layers,
  Sliders,
  Cpu,
  HelpCircle,
} from "lucide-react";

export function BrowserSimulator({
  activeExercise,
  activeConcept,
  currentCode,
}) {
  const [inputs, setInputs] = useState([]);
  const [paramNames, setParamNames] = useState([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [lastEvaluatedCode, setLastEvaluatedCode] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Parse parameters and initialize their default values based on the active test case
  useEffect(() => {
    if (!activeExercise) return;

    // Get input parameters from the first test case
    const firstTest = activeExercise.testCases?.[0];
    const defaultInputs = Array.isArray(firstTest?.input)
      ? firstTest.input
      : [firstTest?.input];

    // Parse functional parameter names from codeTemplate
    const codeTemplate = activeExercise.codeTemplate || "";
    let names = [];
    const funcMatch = codeTemplate.match(/function\s+\w+\s*\(([^)]*)\)/);

    if (funcMatch) {
      names = funcMatch[1]
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    }

    // Fallback if no names found
    while (names.length < defaultInputs.length) {
      names.push(`param${names.length + 1}`);
    }
    // Truncate if we have more names than test inputs
    names = names.slice(0, defaultInputs.length);

    setParamNames(names);
    setInputs(defaultInputs);
    setError(null);
    setResult(null);
  }, [activeExercise]);

  // Execute the user's active code within a safe browser container
  const evaluateUserCode = () => {
    if (!activeExercise || !currentCode) return;

    try {
      setError(null);

      // 1. Compile function definition from active editor text
      const compiledFunction = new Function(`
        ${currentCode}
        if (typeof ${activeExercise.functionName} === 'undefined') {
          throw new Error('Function "${activeExercise.functionName}" is not exported or defined.');
        }
        return ${activeExercise.functionName};
      `)();

      // 2. Deep clone inputs to prevent accidental mutation of visualizer state
      const processedInputs = inputs.map((val) => {
        // If it looks like a string representing an array/object, try to parse it
        if (typeof val === "string") {
          const trimmed = val.trim();
          if (
            (trimmed.startsWith("[") && trimmed.endsWith("]")) ||
            (trimmed.startsWith("{") && trimmed.endsWith("}"))
          ) {
            try {
              return JSON.parse(trimmed);
            } catch (e) {
              // Fallback to raw string if it's not valid JSON
              return val;
            }
          }
        }
        return val;
      });

      // 3. Invoke user function
      const output = compiledFunction(...processedInputs);
      setResult(output);
      setLastEvaluatedCode(currentCode);
    } catch (err) {
      setError(
        err.message || "An unexpected runtime validation error occurred.",
      );
      setResult(null);
    }
  };

  // Re-run evaluation whenever inputs or code updates
  useEffect(() => {
    evaluateUserCode();
  }, [inputs, currentCode, activeExercise]);

  const handleInputChange = (index, value) => {
    const updated = [...inputs];
    updated[index] = value;
    setInputs(updated);
  };

  const handleResetInputs = () => {
    setIsRefreshing(true);
    const firstTest = activeExercise.testCases?.[0];
    const defaultInputs = Array.isArray(firstTest?.input)
      ? firstTest.input
      : [firstTest?.input];
    setInputs(defaultInputs || []);
    setError(null);
    setTimeout(() => setIsRefreshing(false), 400);
  };

  // Determine returned type descriptor
  const getResultType = (val) => {
    if (val === null) return "Null";
    if (val === undefined) return "Undefined";
    if (Array.isArray(val)) return "Array";
    if (val instanceof Promise) return "Promise";
    return typeof val;
  };

  // Helper: detect if string outcome is likely raw HTML content
  const isHTMLOutput = (val) => {
    if (typeof val !== "string") return false;
    const clean = val.trim();
    return (
      clean.startsWith("<") &&
      clean.endsWith(">") &&
      (clean.includes("class=") ||
        clean.includes("style=") ||
        clean.includes("id="))
    );
  };

  return (
    <div
      className="flex-1 flex flex-col justify-between space-y-4"
      id="browser-simulator-root"
    >
      {/* Simulation Browser Frame (learnjavascript.online premium style) */}
      <div className="bg-zinc-100 rounded-2xl border border-zinc-200 shadow-sm overflow-hidden flex flex-col flex-grow">
        {/* Browser Top Chrome Controls bar */}
        <div className="bg-[#e4e4e7] px-4 py-2 border-b border-zinc-200 flex items-center justify-between select-none">
          {/* OS Circle Buttons */}
          <div className="flex gap-1.5 items-center">
            <span className="w-3 h-3 rounded-full bg-rose-450 block hover:opacity-80 transition-opacity" />
            <span className="w-3 h-3 rounded-full bg-amber-450 block hover:opacity-80 transition-opacity" />
            <span className="w-3 h-3 rounded-full bg-emerald-500 block hover:opacity-80 transition-opacity" />
          </div>

          {/* Address URL Tab Bar */}
          <div className="flex-1 mx-6 max-w-md">
            <div className="bg-white/90 border border-zinc-250 rounded-lg text-[11px] font-mono py-1 px-3.5 text-zinc-650 flex items-center justify-between shadow-3xs">
              <div className="flex items-center gap-1.5 truncate">
                <Globe className="h-3.5 w-3.5 text-zinc-450 shrink-0" />
                <span className="text-zinc-400">http://localhost:3000/</span>
                <span className="text-zinc-800 font-bold shrink-0">
                  {activeExercise?.functionName || "playground"}
                </span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={evaluateUserCode}
                  className="p-0.5 hover:bg-zinc-100 rounded transition-colors text-zinc-550"
                  title="Force evaluate logic"
                >
                  <RefreshCw
                    className={`h-3 w-3 ${isRefreshing ? "animate-spin" : ""}`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Connected BadgeStatus */}
          <div>
            <span className="text-[9px] font-mono font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-55/90 border border-emerald-300 px-2.5 py-0.8 rounded-full flex items-center gap-1 animate-pulse">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />{" "}
              Online
            </span>
          </div>
        </div>

        {/* Content Section representing the physical browser viewport screen */}
        <div className="bg-white p-4 sm:p-5 flex-grow flex flex-col justify-between min-h-[350px]">
          {/* Section Header */}
          <div className="border-b border-zinc-100 pb-2 mb-3">
            <span className="text-[10px] uppercase font-mono font-bold text-zinc-405 tracking-wider block mb-1">
              Active Browser Viewport
            </span>
            <h3 className="text-base font-black tracking-tight text-zinc-900 capitalize">
              {activeExercise?.title?.replace(/[-_]+/g, " ") ||
                "Browser Sandbox Preview"}
            </h3>
            <p className="text-xs text-zinc-500 font-sans mt-0.5">
              Test your functional return logic using custom sliders, knobs, and
              text arguments.
            </p>
          </div>

          {/* Interactive Playground Cards Area */}
          <div className="space-y-4 flex-grow flex flex-col justify-center">
            {/* Custom interactive view for Number Division Remainder check */}
            {activeExercise?.functionName === "getDivisionRemainderBy2" ? (
              <div className="max-w-md mx-auto w-full text-center p-4 bg-zinc-50 border border-zinc-200 rounded-xl space-y-3 shadow-3xs">
                <h4 className="text-xs font-semibold text-zinc-805 font-mono">
                  Division Remainder Simulator
                </h4>
                <div className="flex flex-col items-center gap-1.5">
                  <label className="text-[10px] font-mono font-bold text-zinc-500 uppercase">
                    Enter Input Number
                  </label>
                  <input
                    type="number"
                    autoComplete="off"
                    value={inputs[0] || ""}
                    onChange={(e) =>
                      handleInputChange(0, parseInt(e.target.value, 10) || 0)
                    }
                    className="text-center font-mono text-lg font-bold p-1.5 bg-white border border-zinc-300 rounded-lg w-28 focus:border-yellow-500 focus:outline-hidden"
                    placeholder="Enter value"
                  />
                </div>
                <div className="pt-2 border-t border-zinc-250">
                  <p className="text-xs font-sans font-medium text-zinc-800 leading-relaxed">
                    Division remainder by 2 is:{" "}
                    <span className="font-mono font-black text-rose-600 text-sm underline decoration-yellow-400">
                      {result !== null && result !== undefined
                        ? String(result)
                        : "."}
                    </span>
                  </p>
                </div>
              </div>
            ) : isHTMLOutput(result) ? (
              /* Custom rendered state if the return value is a clean HTML string component */
              <div className="flex flex-col items-center justify-center space-y-3">
                <div className="p-1.5 border border-emerald-250 bg-emerald-500/5 text-emerald-800 rounded-lg text-[11px] font-mono font-bold px-3.5 flex items-center gap-1.5 mb-1 shadow-4xs">
                  <Check className="h-3.5 w-3.5 text-emerald-600 animate-pulse" />{" "}
                  Raw HTML Tag Rendered Below:
                </div>
                {/* Dynamically injected HTML Button or Node */}
                <div
                  className="p-5 border border-zinc-200 rounded-xl bg-zinc-50/40 w-full max-w-sm flex items-center justify-center min-h-[80px] shadow-3xs"
                  dangerouslySetInnerHTML={{ __html: result }}
                />
                <span className="text-[9.5px] font-sans text-zinc-450 italic">
                  Any HTML returned standard string is physical compiled and
                  mounted inside the Sandbox.
                </span>
              </div>
            ) : (
              /* Standard adaptable inputs generator matching every other exercise signature */
              <div className="max-w-md mx-auto w-full bg-zinc-50/50 border border-zinc-200 p-3.5 rounded-xl space-y-3 shadow-4xs text-left">
                <span className="text-[9px] uppercase font-mono font-extrabold tracking-widest text-[#a38b00] flex items-center gap-1">
                  <Sliders className="h-3 w-3" /> Parameter Form Controls
                </span>

                <div className="space-y-3">
                  {paramNames.map((name, index) => {
                    const currentVal = inputs[index];
                    const isBool = typeof currentVal === "boolean";
                    const isNum = typeof currentVal === "number";

                    return (
                      <div
                        key={index}
                        className="flex items-center justify-between gap-4 py-1.5 border-b border-zinc-150 last:border-b-0"
                      >
                        <div className="space-y-0.5 shrink-0">
                          <code className="text-xs font-mono font-extrabold text-zinc-800">
                            {name}
                          </code>
                          <span className="text-[9px] font-mono text-zinc-400 font-bold block uppercase mt-0.5">
                            {isBool ? "Boolean" : isNum ? "Integer" : "String"}
                          </span>
                        </div>

                        {/* Boolean Controller */}
                        {isBool ? (
                          <input
                            type="checkbox"
                            checked={!!currentVal}
                            onChange={(e) =>
                              handleInputChange(index, e.target.checked)
                            }
                            className="h-4.5 w-4.5 text-zinc-900 border-zinc-300 rounded cursor-pointer"
                          />
                        ) : isNum ? (
                          /* Number Controller inside Form */
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() =>
                                handleInputChange(
                                  index,
                                  (Number(currentVal) || 0) - 1,
                                )
                              }
                              className="w-6.5 h-6.5 bg-white hover:bg-zinc-200 border border-zinc-300 text-zinc-700 rounded-md font-bold transition-all cursor-pointer flex items-center justify-center text-xs select-none"
                            >
                              -
                            </button>
                            <input
                              type="number"
                              value={currentVal ?? 0}
                              onChange={(e) =>
                                handleInputChange(
                                  index,
                                  parseInt(e.target.value, 10) || 0,
                                )
                              }
                              className="text-center font-mono text-xs font-black p-1.5 bg-white border border-zinc-300 rounded-md w-14 focus:outline-hidden"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                handleInputChange(
                                  index,
                                  (Number(currentVal) || 0) + 1,
                                )
                              }
                              className="w-6.5 h-6.5 bg-white hover:bg-zinc-200 border border-zinc-300 text-zinc-700 rounded-md font-bold transition-all cursor-pointer flex items-center justify-center text-xs select-none"
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          /* Standard String Controller */
                          <input
                            type="text"
                            autoComplete="new-password"
                            spellCheck="false"
                            autoCapitalize="off"
                            autoCorrect="off"
                            data-lpignore="true"
                            value={String(currentVal ?? "")}
                            onChange={(e) =>
                              handleInputChange(index, e.target.value)
                            }
                            className="text-xs px-2.5 py-1.5 w-3/5 bg-white border border-zinc-300 rounded-lg font-mono focus:border-yellow-500 focus:outline-hidden text-left leading-none"
                          />
                        )}
                      </div>
                    );
                  })}

                  {inputs.length === 0 && (
                    <div className="text-center text-zinc-400 font-mono text-xs italic py-2 select-none">
                      No argument entries required for this exercise.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Browser compilation, status, and raw returned outputs footer bar */}
          <div className="mt-4 border-t border-zinc-150 pt-3 flex flex-col gap-2 shadow-4xs">
            {error ? (
              /* Compilation & runtime exception banner alerts */
              <div className="flex gap-2 p-3 bg-rose-50 border border-rose-250 rounded-xl items-start shadow-3xs animate-shake">
                <AlertCircle className="h-4 w-4 text-rose-600 shrink-0 mt-0.5" />
                <div className="text-left leading-tight">
                  <span className="text-[9.5px] font-mono font-bold uppercase tracking-widest text-rose-800">
                    Browser Runtime Exception
                  </span>
                  <p className="text-[12px] text-rose-700 font-medium font-mono leading-relaxed select-text mt-1">
                    {error}
                  </p>
                </div>
              </div>
            ) : (
              /* Deep charcoal standard output console viewer */
              <div className="bg-zinc-950 rounded-xl p-3 text-left border border-zinc-800 shadow-xl overflow-hidden relative group">
                <div className="flex items-center justify-between gap-4 mb-2 pb-1.5 border-b border-zinc-800 select-none">
                  <div className="flex items-center gap-1.5 text-[9.5px] font-mono text-zinc-400 uppercase font-black tracking-wider">
                    <Terminal className="h-3.5 w-3.5 text-yellow-500 shrink-0" />
                    <span>Returned JavaScript Object</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-yellow-500 shrink-0 animate-pulse" />
                    <span className="text-zinc-500 shrink-0">
                      Type: {getResultType(result)}
                    </span>
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={handleResetInputs}
                      className="p-1 px-2.5 bg-zinc-900 hover:bg-zinc-800 rounded-lg font-mono text-[9px] text-zinc-350 font-bold tracking-tight uppercase flex items-center gap-1 cursor-pointer border border-zinc-750/70 transition-colors"
                    >
                      <RotateCcw className="h-2.5 w-2.5" /> reset inputs
                    </button>
                  </div>
                </div>

                <pre className="font-mono text-xs text-[#F7DF1E] bg-[#F7DF1E]/5 p-2 rounded-lg border border-yellow-500/10 break-all overflow-x-auto select-all max-h-[110px] leading-relaxed">
                  {result !== null && result !== undefined ? (
                    typeof result === "object" ? (
                      JSON.stringify(result, null, 2)
                    ) : (
                      String(result)
                    )
                  ) : (
                    <span className="text-zinc-650 italic">
                      No output returned (Check your syntax above)
                    </span>
                  )}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
