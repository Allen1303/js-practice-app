import React, { useState, useEffect } from "react";
import {
  Terminal,
  Play,
  Check,
  XCircle,
  Sparkles,
  RefreshCcw,
  Command,
  ArrowRight,
  CornerDownRight,
  Keyboard,
} from "lucide-react";
import { runCustomEvaluation } from "../utils/executor.js";

const formatArguments = (input) => {
  if (!Array.isArray(input)) return String(input);
  return input
    .map((arg) => {
      if (arg === null) return "null";
      if (arg === undefined) return "undefined";
      if (arg instanceof Map) {
        try {
          return "Map(" + JSON.stringify(Array.from(arg.entries())) + ")";
        } catch {
          return "Map";
        }
      }
      if (arg instanceof Set) {
        try {
          return "Set(" + JSON.stringify(Array.from(arg.values())) + ")";
        } catch {
          return "Set";
        }
      }
      if (typeof arg === "object") {
        try {
          return JSON.stringify(arg);
        } catch (e) {
          return "[Object]";
        }
      }
      if (typeof arg === "string") {
        return `"${arg}"`;
      }
      return String(arg);
    })
    .join(", ");
};

export function AssertionConsole({
  activeExercise,
  currentCode,
  testResults,
  isRunningTests,
  handleRunTests,
  autoRun,
  toggleAutoRun,
  handleNextStep,
  solvedExercises,
}) {
  const [activeTab, setActiveTab] = useState("tests"); // "tests" | "playground"
  const [customArgs, setCustomArgs] = useState("");
  const [customResult, setCustomResult] = useState(null);
  const [isInvoking, setIsInvoking] = useState(false);

  // Sync / prefill custom trial arguments whenever the active exercise changes
  useEffect(() => {
    if (activeExercise) {
      const initialArgs = activeExercise.testCases?.[0]
        ? activeExercise.testCases[0].input
            .map((arg) => {
              if (typeof arg === "string") return `"${arg}"`;
              try {
                return JSON.stringify(arg);
              } catch {
                return String(arg);
              }
            })
            .join(", ")
        : "";
      setCustomArgs(initialArgs);
      setCustomResult(null);
      setActiveTab("tests");
    }
  }, [activeExercise]);

  const handleInvokeLive = async () => {
    if (!activeExercise || isInvoking) return;
    setIsInvoking(true);
    setCustomResult(null);
    await new Promise((resolve) => setTimeout(resolve, 150));

    try {
      const evaluation = await runCustomEvaluation(
        activeExercise,
        currentCode,
        customArgs,
      );
      setCustomResult(evaluation);
    } catch (err) {
      setCustomResult({
        success: false,
        error: "Runtime execution wrapper failed:\n" + err.message,
        consoleLogs: [],
      });
    } finally {
      setIsInvoking(false);
    }
  };

  const parsedResults = Array.isArray(testResults)
    ? testResults
    : testResults?.results || [];
  const suiteConsoleLogs = Array.isArray(testResults)
    ? []
    : testResults?.consoleLogs || [];
  const hasSuiteLogs = suiteConsoleLogs && suiteConsoleLogs.length > 0;
  const allPassed =
    parsedResults.length > 0 && parsedResults.every((r) => r.passed);

  return (
    <div className="flex-1 flex flex-col bg-[#111216] overflow-hidden border-t border-zinc-800 min-h-[220px]">
      {/* Tab bar header */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between border-b border-zinc-800 shrink-0 bg-[#16171d] select-none px-4 py-1.5 gap-2">
        {/* Toggle Controls */}
        <div className="flex gap-1.5">
          <button
            onClick={() => setActiveTab("tests")}
            className={`py-1.5 px-3 rounded-lg text-xs font-mono font-bold uppercase transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "tests"
                ? "bg-[#252833] text-white border border-[#3a3f50]"
                : "bg-transparent text-zinc-400 hover:text-white border border-transparent"
            }`}
          >
            <Terminal className="h-3.5 w-3.5 text-zinc-400" />
            Test Console
            {parsedResults.length > 0 && (
              <span
                className={`text-[9px] font-sans font-extrabold px-1.5 py-0.2 rounded-full ${
                  parsedResults.every((r) => r.passed)
                    ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                    : "bg-amber-950 text-amber-400 border border-amber-800"
                }`}
              >
                {parsedResults.filter((r) => r.passed).length}/
                {parsedResults.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("playground")}
            className={`py-1.5 px-3 rounded-lg text-xs font-mono font-bold uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "playground"
                ? "bg-[#252833] text-white border border-[#3a3f50]"
                : "bg-transparent text-zinc-400 hover:text-white border border-transparent"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-yellow-500 fill-yellow-500/10" />
            Interactive Trial
            <span className="text-[7.5px] font-mono bg-[#F7DF1E]/10 text-[#F7DF1E] border border-[#F7DF1E]/20 px-1 py-0.2 rounded font-bold">
              PRO
            </span>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 shrink-0">
          {activeTab === "tests" && (
            <label className="flex items-center gap-2 cursor-pointer select-none text-[10px] font-mono font-bold text-zinc-400 hover:text-white transition-colors mr-1">
              <input
                type="checkbox"
                checked={autoRun}
                onChange={toggleAutoRun}
                className="h-3.5 w-3.5 accent-[#F7DF1E] rounded border-zinc-700 bg-zinc-900 text-zinc-900 focus:ring-0 cursor-pointer"
              />
              <span>Auto-run tests</span>
            </label>
          )}

          {activeTab === "tests" ? (
            <button
              onClick={handleRunTests}
              disabled={isRunningTests}
              className="py-1 px-4 text-xs font-bold font-mono text-zinc-950 bg-[#F7DF1E] hover:bg-[#edd012] disabled:opacity-50 transition-all rounded-lg flex items-center gap-1.5 shadow-md cursor-pointer whitespace-nowrap active:scale-[0.98]"
            >
              {isRunningTests ? (
                <>
                  <div className="h-3 w-3 border-2 border-t-transparent border-zinc-950 rounded-full animate-spin" />
                  Running...
                </>
              ) : (
                <>
                  <Play className="h-3 w-3 fill-current text-zinc-950" />
                  Run Tests
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleInvokeLive}
              disabled={isInvoking}
              className="py-1 px-4 text-xs font-bold font-mono text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-50 transition-all rounded-lg flex items-center gap-1.5 shadow-md cursor-pointer whitespace-nowrap active:scale-[0.98]"
            >
              {isInvoking ? (
                <>
                  <div className="h-3 w-3 border-2 border-t-transparent border-white rounded-full animate-spin" />
                  Running...
                </>
              ) : (
                <>
                  <Play className="h-3 w-3 fill-current text-white" />
                  Run Custom
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Console outputs area */}
      <div className="flex-1 overflow-y-auto bg-[#111216] p-5 space-y-4 min-h-0 select-text">
        {activeTab === "tests" && (
          <div className="space-y-4">
            {!testResults ? (
              <div className="py-12 flex flex-col items-center justify-center text-zinc-500 space-y-2 text-xs font-mono">
                <Terminal className="h-8 w-8 text-zinc-600 stroke-[1.5px]" />
                <span className="text-zinc-400 font-sans">
                  No test results yet. Press the big CTA to test code.
                </span>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Score Summary */}
                <div className="pb-3 border-b border-zinc-800 flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">
                    Testing Solution:
                  </span>
                  <div className="flex gap-2.5 font-bold">
                    <span className="text-emerald-400 bg-emerald-950/40 px-2.5 py-0.5 rounded border border-emerald-900/60">
                      Passed: {parsedResults.filter((r) => r.passed).length}
                    </span>
                    <span className="text-rose-400 bg-rose-950/40 px-2.5 py-0.5 rounded border border-rose-900/60">
                      Failed: {parsedResults.filter((r) => !r.passed).length}
                    </span>
                  </div>
                </div>

                {/* Units List */}
                <div className="space-y-3 font-mono">
                  {parsedResults.map((result, i) => (
                    <div
                      key={i}
                      className="text-xs space-y-1 block border-b border-zinc-900 pb-3"
                    >
                      <div className="flex items-center gap-2">
                        {result.passed ? (
                          <span className="text-emerald-400 font-extrabold text-[14px]">
                            ✓
                          </span>
                        ) : (
                          <span className="text-rose-500 font-extrabold text-[14px]">
                            ✕
                          </span>
                        )}
                        <span className="text-zinc-300 font-bold font-mono">
                          {activeExercise.functionName}(
                          {formatArguments(result.input)})
                        </span>
                        <span className="text-zinc-500 font-normal italic text-[11px] ml-1">
                          — {result.description}
                        </span>
                      </div>

                      {/* Expected / Got format like learnjavascript.online */}
                      <div className="pl-5 space-y-0.5 font-mono text-[11px] leading-relaxed">
                        <div className="text-zinc-500">
                          <span>// Expected: </span>
                          <span className="text-zinc-400 font-semibold">
                            {result.expected}
                          </span>
                        </div>
                        <div>
                          <span className="text-zinc-550 mr-1">// Got:</span>
                          {result.error ? (
                            <span className="text-rose-400 font-bold bg-rose-950/30 px-1 py-0.5 rounded border border-rose-900/40">
                              Error: {result.error}
                            </span>
                          ) : (
                            <span
                              className={
                                result.passed
                                  ? "text-emerald-400 font-semibold"
                                  : "text-rose-400 font-semibold bg-rose-950/20 px-1 border border-rose-900/30 rounded"
                              }
                            >
                              {result.actual}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Render isolated logs specifically matching this item */}
                      {hasSuiteLogs &&
                        suiteConsoleLogs.some(
                          (log) => log.testId === result.testId,
                        ) && (
                          <div className="mt-2 pl-5">
                            <div className="bg-[#18191f] border border-[#2b2d38] rounded p-2.5 space-y-1 font-mono text-[10.5px]">
                              <span className="text-zinc-500 text-[8px] uppercase tracking-wider block border-b border-zinc-800 pb-1 font-bold">
                                stdout:
                              </span>
                              {suiteConsoleLogs
                                .filter((log) => log.testId === result.testId)
                                .map((log, lIdx) => (
                                  <pre
                                    key={lIdx}
                                    className="text-yellow-400 whitespace-pre-wrap leading-relaxed truncate font-mono"
                                  >
                                    {log.text}
                                  </pre>
                                ))}
                            </div>
                          </div>
                        )}
                    </div>
                  ))}
                </div>

                {/* All Passed Success Banner */}
                {allPassed && (
                  <div className="bg-emerald-950/60 border border-emerald-800/80 rounded-xl p-4.5 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg animate-fade-in my-2">
                    <div className="flex items-center gap-3">
                      <div className="h-7 w-7 rounded-full bg-emerald-500 text-zinc-950 flex items-center justify-center font-bold text-xs">
                        ✓
                      </div>
                      <div>
                        <h4 className="text-xs font-bold uppercase tracking-tight font-mono text-emerald-400">
                          All tests passed!
                        </h4>
                        <p className="text-[11px] text-zinc-300 font-sans leading-relaxed mt-0.5">
                          Spectacular! Your solution is 100% correct. Moving
                          forward.
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="py-1.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-mono text-xs font-extrabold rounded-lg flex items-center gap-1.5 shadow active:scale-[0.98] cursor-pointer whitespace-nowrap"
                    >
                      Next exercise{" "}
                      <ArrowRight className="h-3.5 w-3.5 text-zinc-950 stroke-[2.5px]" />
                    </button>
                  </div>
                )}

                {/* Overall standard inputs load time stdout logs */}
                {hasSuiteLogs &&
                  suiteConsoleLogs.some((l) => l.testId === null) && (
                    <div className="bg-[#18191f] border border-[#22242b] rounded-xl p-3 text-zinc-300 font-mono text-xs space-y-1.5">
                      <span className="text-amber-400 font-bold text-[9px] uppercase tracking-widest block border-b border-[#2d2f3d] pb-1">
                        Stdout console outputs:
                      </span>
                      {suiteConsoleLogs
                        .filter((l) => l.testId === null)
                        .map((log, lIdx) => (
                          <pre
                            key={lIdx}
                            className="text-white whitespace-pre-wrap font-mono leading-relaxed pl-1"
                          >
                            {log.text}
                          </pre>
                        ))}
                    </div>
                  )}
              </div>
            )}
          </div>
        )}

        {activeTab === "playground" && (
          <div className="space-y-4">
            <div className="bg-[#18191f] border border-zinc-800 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 font-sans">
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-zinc-200 uppercase tracking-tight flex items-center gap-1.5">
                  <Command className="h-3.5 w-3.5 text-yellow-500" />
                  Custom Sandbox Invocation
                </h4>
                <p className="text-[11px] text-zinc-400 leading-normal max-w-lg">
                  Run standard trials of your active function closure `
                  {activeExercise?.functionName || "solve"}()` with custom mock
                  arguments.
                </p>
              </div>

              {activeExercise.testCases?.length > 0 && (
                <div className="space-y-1 w-full md:w-auto">
                  <span className="text-[8.5px] font-bold text-zinc-500 uppercase tracking-wider block">
                    Presets:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {activeExercise.testCases.map((tc, idx) => {
                      const argsStr = tc.input
                        .map((arg) => {
                          if (typeof arg === "string") return `"${arg}"`;
                          try {
                            return JSON.stringify(arg);
                          } catch {
                            return String(arg);
                          }
                        })
                        .join(", ");
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            setCustomArgs(argsStr);
                            setCustomResult(null);
                          }}
                          className="px-2 py-0.5 text-[9.5px] font-mono rounded bg-zinc-850 hover:bg-zinc-800 text-zinc-300 border border-zinc-700 hover:border-zinc-500 cursor-pointer"
                        >
                          Case {idx + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Parameters Box */}
              <div className="bg-[#18191f] border border-zinc-800 rounded-xl p-4 flex flex-col space-y-3">
                <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider">
                  Inputs / Arguments List:
                </span>

                <div className="space-y-1.5 font-mono text-[11px]">
                  <div className="text-zinc-400 font-mono">
                    {activeExercise.functionName}(
                    <span className="text-yellow-500 text-[10px] animate-pulse">
                      arguments
                    </span>
                    )
                  </div>
                  <textarea
                    rows={3}
                    value={customArgs}
                    onChange={(e) => setCustomArgs(e.target.value)}
                    placeholder="e.g. [1, 2, 3], ''"
                    className="w-full bg-[#111216] text-white border border-zinc-800 rounded-lg p-3 text-xs font-mono leading-relaxed focus:outline-none focus:border-yellow-500 resize-none pr-3"
                    spellCheck="false"
                  />
                  <span className="text-[9.5px] text-zinc-500 font-sans block leading-normal mt-1">
                    Divide values using commas. Arrays inside brackets `[ ]`,
                    objects inside braces `{"{ }"}`.
                  </span>
                </div>

                <button
                  onClick={handleInvokeLive}
                  disabled={isInvoking}
                  className="py-2 px-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-mono text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow active:translate-y-0.5 cursor-pointer mt-2"
                >
                  <Play className="h-3 w-3 fill-current" />
                  Run Input Arguments
                </button>
              </div>

              {/* Output Result Canvas */}
              <div className="bg-[#18191f] border border-zinc-800 rounded-xl p-4 flex flex-col font-mono text-xs">
                <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider block border-b border-zinc-800 pb-2">
                  Standard Stream Return:
                </span>

                <div className="flex-1 mt-3 space-y-3">
                  {!customResult ? (
                    <div className="h-full py-8 flex flex-col items-center justify-center text-zinc-650 text-center text-[10.5px]">
                      <Terminal className="h-5 w-5 text-zinc-650" />
                      <span>
                        Standard trial output is empty. Run arguments box.
                      </span>
                    </div>
                  ) : (
                    <div className="space-y-3 select-text">
                      <div className="space-y-1">
                        <span className="text-zinc-500 text-[9px] uppercase tracking-wider">
                          Output Value:
                        </span>
                        {customResult.success ? (
                          <pre className="p-3 bg-[#111216] border border-zinc-800 rounded-lg text-emerald-400 font-extrabold whitespace-pre-wrap leading-relaxed select-all text-sm">
                            {customResult.result}
                          </pre>
                        ) : (
                          <pre className="p-3 bg-rose-950/20 border border-rose-900/40 rounded-lg text-rose-400 whitespace-pre-wrap leading-normal select-all">
                            {customResult.error}
                          </pre>
                        )}
                      </div>

                      {customResult.consoleLogs?.length > 0 && (
                        <div className="space-y-1 pt-1">
                          <span className="text-zinc-500 text-[9px] uppercase tracking-wider">
                            Stdout print lines:
                          </span>
                          <div className="bg-[#111216] border border-zinc-800 rounded-lg p-2.5 space-y-1">
                            {customResult.consoleLogs.map((log, li) => (
                              <pre
                                key={li}
                                className="text-zinc-300 whitespace-pre-wrap truncate leading-relaxed"
                              >
                                {log.text}
                              </pre>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
