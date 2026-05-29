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

export function AssertionConsole({
  activeExercise,
  currentCode,
  testResults,
  isRunningTests,
  handleRunTests,
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
      // Auto-switch to tests when changing exercises to keep learning flow natural
      setActiveTab("tests");
    }
  }, [activeExercise]);

  // Execute interactive custom evaluation
  const handleInvokeLive = async () => {
    if (!activeExercise || isInvoking) return;
    setIsInvoking(true);
    setCustomResult(null);

    // Minor execution shift for tactile feedback
    await new Promise((resolve) => setTimeout(resolve, 200));

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

  // Extract verification outputs
  const parsedResults = Array.isArray(testResults)
    ? testResults
    : testResults?.results || [];
  const suiteConsoleLogs = Array.isArray(testResults)
    ? []
    : testResults?.consoleLogs || [];
  const hasSuiteLogs = suiteConsoleLogs && suiteConsoleLogs.length > 0;

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden border-t border-zinc-200 min-h-[220px]">
      {/* Tab bar header */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between border-b border-zinc-200 shrink-0 bg-zinc-50 select-none">
        {/* Toggle Controls */}
        <div className="flex p-1 gap-1">
          <button
            onClick={() => setActiveTab("tests")}
            className={`py-1.5 px-4 text-xs font-mono font-bold uppercase tracking-wider rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "tests"
                ? "bg-white text-zinc-950 border-zinc-200 shadow-sm"
                : "bg-transparent text-zinc-500 border-transparent hover:text-zinc-850"
            }`}
          >
            <Terminal className="h-3.5 w-3.5 text-zinc-700" />
            Verification Suite
            {parsedResults.length > 0 && (
              <span
                className={`text-[9px] font-sans font-extrabold px-1.5 py-0.2 rounded-full border ${
                  parsedResults.every((r) => r.passed)
                    ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                    : "bg-amber-50 text-amber-800 border-amber-200"
                }`}
              >
                {parsedResults.filter((r) => r.passed).length}/
                {parsedResults.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("playground")}
            className={`py-1.5 px-4 text-xs font-mono font-bold uppercase tracking-wider rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
              activeTab === "playground"
                ? "bg-white text-zinc-950 border-[#F7DF1E] shadow-sm font-extrabold"
                : "bg-transparent text-zinc-500 border-transparent hover:text-zinc-850"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-yellow-500 fill-yellow-100" />
            Live Custom Console
            <span className="text-[8px] font-sans bg-amber-100/70 text-amber-850 border border-[#F7DF1E] px-1.5 py-0.2 rounded-full font-bold">
              PRO
            </span>
          </button>
        </div>

        {/* Dynamic Action Buttons inside Header aligned to active tab */}
        <div className="flex items-center gap-2 px-3 py-1 sm:py-0 shrink-0">
          {activeTab === "tests" ? (
            <button
              onClick={handleRunTests}
              disabled={isRunningTests}
              className="py-1 px-4.5 text-xs font-bold font-mono text-zinc-950 bg-[#F7DF1E] hover:bg-[#edd012] border border-zinc-300 active:translate-y-0.5 disabled:opacity-50 transition-all rounded-lg flex items-center gap-1.5 shadow-sm cursor-pointer whitespace-nowrap"
            >
              {isRunningTests ? (
                <>
                  <div className="h-3 w-3 border-2 border-t-transparent border-zinc-950 rounded-full animate-spin" />
                  Evaluating...
                </>
              ) : (
                <>
                  <Play className="h-3 w-3 fill-current" />
                  Run Tests
                </>
              )}
            </button>
          ) : (
            <button
              onClick={handleInvokeLive}
              disabled={isInvoking}
              className="py-1 px-4.5 text-xs font-bold font-mono text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-950 active:translate-y-0.5 disabled:opacity-50 transition-all rounded-lg flex items-center gap-1.5 shadow-sm cursor-pointer whitespace-nowrap"
            >
              {isInvoking ? (
                <>
                  <div className="h-3 w-3 border-2 border-t-transparent border-white rounded-full animate-spin" />
                  Calling...
                </>
              ) : (
                <>
                  <Play className="h-3 w-3 fill-current text-[#F7DF1E]" />
                  Invoke Live
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Main console content canvas */}
      <div className="flex-1 overflow-y-auto bg-zinc-50/45 p-4 space-y-3 min-h-0">
        {/* TAB 1: Verification Unit Tests */}
        {activeTab === "tests" && (
          <div className="space-y-3 animate-fadeIn">
            {!testResults ? (
              <div className="py-12 flex flex-col items-center justify-center text-zinc-400 space-y-2 text-xs font-mono">
                <Terminal className="h-7 w-7 text-zinc-300 stroke-[1.5px]" />
                <span className="font-sans text-zinc-500">
                  Suite is idle. Click 'Run Tests' or press{" "}
                  <kbd className="font-bold border border-zinc-200 bg-white px-1.5 py-0.5 rounded text-zinc-650">
                    Ctrl+Enter
                  </kbd>
                </span>
              </div>
            ) : (
              <div className="space-y-3">
                {/* Score Summary bar */}
                <div className="p-3 bg-white border border-zinc-200 rounded-xl flex items-center justify-between text-xs font-mono shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-zinc-444 font-bold uppercase tracking-wider text-[10px]">
                      Challenge Target ({activeExercise.functionName})
                    </span>
                  </div>
                  <div className="flex items-center gap-2 font-bold font-mono">
                    <span className="text-emerald-705 bg-emerald-50 px-2.5 py-0.8 rounded-lg border border-emerald-200">
                      Passed: {parsedResults.filter((r) => r.passed).length}
                    </span>
                    <span className="text-rose-705 bg-rose-50 px-2.5 py-0.8 rounded-lg border border-rose-200">
                      Failed: {parsedResults.filter((r) => !r.passed).length}
                    </span>
                  </div>
                </div>

                {/* Individual Case Outcomes */}
                <div className="grid grid-cols-1 gap-2.5">
                  {parsedResults.map((result, i) => (
                    <div
                      key={i}
                      className={`p-3 bg-white hover:bg-zinc-50/50 border rounded-xl font-mono text-xs transition-colors shadow-sm ${
                        result.passed
                          ? "border-zinc-200"
                          : "border-rose-200 bg-rose-50/10"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-center gap-2">
                          <div
                            className={`h-4.5 w-4.5 rounded-lg flex items-center justify-center border shrink-0 ${
                              result.passed
                                ? "bg-[#F7DF1E] border-zinc-350 text-zinc-950"
                                : "bg-rose-500 border-rose-600 text-white"
                            }`}
                          >
                            {result.passed ? (
                              <Check className="h-3 w-3 stroke-[3px]" />
                            ) : (
                              <span className="font-extrabold text-[10px]">
                                !
                              </span>
                            )}
                          </div>
                          <span className="font-sans font-bold text-zinc-800 text-[11.5px]">
                            {result.description}
                          </span>
                        </div>
                        <span
                          className={`text-[8.5px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                            result.passed
                              ? "text-zinc-700 bg-zinc-100"
                              : "text-rose-705 bg-rose-100"
                          }`}
                        >
                          {result.passed ? "PASS" : "FAIL"}
                        </span>
                      </div>

                      {/* Params comparison block */}
                      <div className="mt-2 text-[10.5px] grid grid-cols-1 md:grid-cols-3 gap-2 pt-2 border-t border-zinc-150 text-zinc-600">
                        <div>
                          <span className="text-zinc-400 font-bold block text-[8px] uppercase tracking-wider">
                            Parameters:
                          </span>
                          <code className="text-zinc-805 block truncate bg-zinc-50 border border-zinc-100 px-1.5 py-0.5 rounded text-[10px] my-0.5 font-mono">
                            {result.input}
                          </code>
                        </div>
                        <div>
                          <span className="text-zinc-400 font-bold block text-[8px] uppercase tracking-wider">
                            Expected Return:
                          </span>
                          <code className="text-zinc-805 block truncate bg-zinc-50 border border-zinc-100 px-1.5 py-0.5 rounded text-[10px] my-0.5 font-mono text-emerald-700 font-extrabold">
                            {result.expected}
                          </code>
                        </div>
                        <div>
                          <span className="text-zinc-400 font-bold block text-[8px] uppercase tracking-wider">
                            Actual Value:
                          </span>
                          {result.error ? (
                            <code className="text-rose-600 font-bold block bg-rose-50 border border-rose-100 px-1.5 py-0.5 rounded text-[10px] my-0.5 font-mono break-all leading-normal">
                              {result.error}
                            </code>
                          ) : (
                            <code
                              className={`block truncate bg-zinc-50 border px-1.5 py-0.5 rounded text-[10px] my-0.5 font-mono ${
                                result.passed
                                  ? "text-[#a38b00] border-zinc-200 font-bold"
                                  : "text-rose-600 border-rose-100 bg-rose-50/40"
                              }`}
                            >
                              {result.actual}
                            </code>
                          )}
                        </div>
                      </div>

                      {/* Captured output specifically for this testcase */}
                      {hasSuiteLogs &&
                        suiteConsoleLogs.some(
                          (log) => log.testId === result.testId,
                        ) && (
                          <div className="mt-2.5 p-2 bg-zinc-900 border border-zinc-950 text-zinc-300 rounded-lg text-[10.5px] space-y-1">
                            <span className="text-zinc-500 font-mono text-[8px] uppercase tracking-wider block border-b border-zinc-800 pb-1">
                              Captured console logs during this test:
                            </span>
                            {suiteConsoleLogs
                              .filter((log) => log.testId === result.testId)
                              .map((log, lIdx) => (
                                <div
                                  key={lIdx}
                                  className="font-mono flex items-start gap-1"
                                >
                                  <span className="text-zinc-500 font-bold select-none">
                                    &gt;&gt;
                                  </span>
                                  <pre className="whitespace-pre-wrap flex-1 leading-normal break-all font-mono text-amber-200">
                                    {log.text}
                                  </pre>
                                </div>
                              ))}
                          </div>
                        )}
                    </div>
                  ))}
                </div>

                {/* Trailing Global Initialization Console output banner */}
                {hasSuiteLogs &&
                  suiteConsoleLogs.some((l) => l.testId === null) && (
                    <div className="bg-zinc-900 border border-zinc-950 rounded-xl p-3.5 text-zinc-300 font-mono text-xs space-y-2.5 shadow-md">
                      <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
                        <span className="text-amber-400 font-bold text-[9px] uppercase tracking-widest flex items-center gap-1.5">
                          <Terminal className="h-3 w-3 stroke-[2.5px]" />
                          Top-Level Script Initialization Logs
                        </span>
                        <span className="text-zinc-500 text-[8.5px] font-sans font-medium uppercase tracking-wide">
                          Executed at load time
                        </span>
                      </div>
                      <p className="text-[10px] text-zinc-400 font-sans leading-relaxed">
                        These terminal lines printed automatically because your
                        code is invoked as a real program upon loading the
                        challenge sandbox!
                      </p>
                      <div className="space-y-1.5 pt-1">
                        {suiteConsoleLogs
                          .filter((l) => l.testId === null)
                          .map((log, lIdx) => (
                            <div
                              key={lIdx}
                              className="flex items-start gap-1 text-[11px]"
                            >
                              <span className="text-zinc-500 font-bold select-none">
                                &gt;
                              </span>
                              <pre className="whitespace-pre-wrap flex-1 text-zinc-100 font-mono leading-relaxed">
                                {log.text}
                              </pre>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Live Custom Invocation Playground console */}
        {activeTab === "playground" && (
          <div className="space-y-4 animate-fadeIn">
            {/* Header info card explaining mastery invocation */}
            <div className="flex flex-col md:flex-row gap-4 bg-white border border-zinc-200 rounded-xl p-4 shadow-sm items-start md:items-center justify-between">
              <div className="space-y-1 font-sans">
                <h4 className="text-xs font-black text-zinc-950 uppercase tracking-tight flex items-center gap-1.5">
                  <Command className="h-3.5 w-3.5 text-yellow-600" />
                  Custom Invocation Sandbox
                </h4>
                <p className="text-[11px] text-zinc-600 leading-relaxed max-w-xl">
                  Call your active function body{" "}
                  <code className="bg-zinc-100 text-zinc-950 px-1 py-0.5 rounded font-mono text-[9px] font-extrabold">
                    {activeExercise.functionName}()
                  </code>{" "}
                  with arbitrary values. Check boundary conditions, pass custom
                  variables, and analyze returns exactly like standard Node.js
                  consoles!
                </p>
              </div>

              {/* Prefill presets shortcuts */}
              {activeExercise.testCases &&
                activeExercise.testCases.length > 0 && (
                  <div className="space-y-1.5 shrink-0 w-full md:w-auto">
                    <span className="text-[8px] font-bold font-mono text-zinc-400 uppercase tracking-wider block">
                      Prefill Mock Arg presets:
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {activeExercise.testCases.map((tc, tcIdx) => {
                        const caseArgsStr = tc.input
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
                            key={tcIdx}
                            onClick={() => {
                              setCustomArgs(caseArgsStr);
                              setCustomResult(null);
                            }}
                            className="px-2 py-1 text-[9.5px] font-mono font-medium rounded-md border border-zinc-250 bg-zinc-50 hover:bg-zinc-100 hover:border-[#F7DF1E] transition-all cursor-pointer whitespace-nowrap"
                            title={`Prefill custom args with case ${tcIdx + 1}`}
                          >
                            Case {tcIdx + 1} args
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
            </div>

            {/* Input & Output Splitter row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left Column: Parameter Editor console */}
              <div className="bg-zinc-900 border border-zinc-950 rounded-xl p-4 flex flex-col space-y-3 text-zinc-300 shadow-md">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-widest flex items-center gap-1">
                    <Keyboard className="h-3 w-3 stroke-[2.5px] text-[#F7DF1E]" />
                    Input Parameter List
                  </span>
                  <button
                    onClick={() => {
                      setCustomArgs("");
                    }}
                    className="text-[9px] font-mono text-zinc-500 hover:text-white transition-colors cursor-pointer"
                  >
                    Clear Input
                  </button>
                </div>

                <div className="space-y-1.5 font-mono">
                  <div className="text-[11px] text-zinc-400 flex items-center gap-1 select-none">
                    <span>{activeExercise.functionName}(</span>
                    <span className="text-amber-400 animate-pulse italic">
                      ...your_parameters
                    </span>
                    <span>)</span>
                  </div>

                  {/* Text inputs field */}
                  <textarea
                    rows={3}
                    value={customArgs}
                    onChange={(e) => setCustomArgs(e.target.value)}
                    placeholder={`e.g. [1, 2, 3], 2      (items separated by commas)`}
                    className="w-full bg-[#1e222b] text-zinc-200 border border-zinc-800 rounded-lg p-3 text-xs font-mono leading-relaxed focus:outline-none focus:border-[#F7DF1E] resize-none placeholder-zinc-600 focus:ring-0"
                    spellCheck="false"
                  />
                </div>

                {/* Helpful instructions guidance helper */}
                <div className="text-[9.5px] text-zinc-500 font-sans leading-relaxed space-y-1 border-t border-zinc-850 pt-3">
                  <p>
                    💡 <strong>Writing Arguments Rule</strong>: Separate
                    multiple variables using commas. Wrap strings in quotes, and
                    lists in brackets.
                  </p>
                  <pre className="text-[8.5px] font-mono text-zinc-400 select-all bg-[#1e222b]/55 p-1 px-1.5 rounded border border-zinc-850/60 leading-normal">
                    {`Example 1:   ["beta", "  alpha "]\nExample 2:   [2, 10, 6]\nExample 3:   [{ "name": "Alice", "birthYear": 1996 }]`}
                  </pre>
                </div>

                <button
                  onClick={handleInvokeLive}
                  disabled={isInvoking}
                  className="w-full py-2 bg-[#F7DF1E] hover:bg-[#edd012] disabled:opacity-50 border border-[#edd012] cursor-pointer text-zinc-950 font-mono font-bold text-xs rounded-xl shadow transition-all flex items-center justify-center gap-2 mt-4"
                >
                  {isInvoking ? (
                    <>
                      <div className="h-3 w-3 border-2 border-t-transparent border-zinc-950 rounded-full animate-spin" />
                      Invoking Sandbox...
                    </>
                  ) : (
                    <>
                      <Play className="h-3 w-3 fill-current" />
                      Run Custom Call
                    </>
                  )}
                </button>
              </div>

              {/* Right Column: Dynamic evaluated output Terminal */}
              <div
                className="bg-[#282c34] border border-[#181a1f] rounded-xl flex flex-col p-4 text-[#abb2bf] shadow-md relative group min-h-[220px]"
                style={{ fontFamily: "Consolas, Monaco, monospace" }}
              >
                <div className="flex items-center justify-between border-b border-[#1f232a] pb-2 shrink-0 select-none">
                  <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase flex items-center gap-1">
                    <CornerDownRight className="h-3 w-3 text-yellow-500" />{" "}
                    Output Value Standard Stream
                  </span>
                  <span className="text-[8px] uppercase tracking-wider bg-zinc-800 text-[#F7DF1E] border border-zinc-700 font-bold font-sans px-1.5 py-0.2 rounded">
                    trial result
                  </span>
                </div>

                <div className="flex-1 overflow-y-auto mt-3 space-y-3 text-xs leading-relaxed font-mono">
                  {!customResult ? (
                    <div className="h-full flex flex-col items-center justify-center text-zinc-550 space-y-2 text-center text-[10.5px]">
                      <Terminal className="h-6 w-6 text-zinc-600" />
                      <span>
                        Ready for live arguments call. Click 'Run Custom Call'
                        above.
                      </span>
                    </div>
                  ) : (
                    <div className="space-y-3.5">
                      {/* Evaluation Return Output Area */}
                      <div className="space-y-1.5">
                        <span className="font-mono text-zinc-500 text-[8.5px] uppercase tracking-wider block">
                          Return Evaluated Output:
                        </span>
                        {customResult.success ? (
                          <div className="p-3 bg-zinc-900/60 border border-zinc-800/80 rounded-lg text-amber-200">
                            <span className="text-zinc-500 font-bold select-none mr-2">
                              &gt;&gt;
                            </span>
                            <pre className="inline whitespace-pre-wrap leading-relaxed select-all font-mono font-extrabold text-[12.5px]">
                              {customResult.result}
                            </pre>
                          </div>
                        ) : (
                          <div className="p-3 bg-rose-950/20 border border-rose-900/40 rounded-lg text-rose-300">
                            <span className="text-rose-500 font-bold select-none mr-2">
                              Exception &gt;&gt;
                            </span>
                            <pre className="inline whitespace-pre-wrap leading-relaxed select-all font-mono text-[11px] text-rose-400">
                              {customResult.error}
                            </pre>
                          </div>
                        )}
                      </div>

                      {/* Execution logging Console outputs */}
                      {customResult.consoleLogs &&
                        customResult.consoleLogs.length > 0 && (
                          <div className="space-y-2 border-t border-[#1f232a] pt-3">
                            <span className="font-mono text-zinc-500 text-[8.5px] uppercase tracking-wider block">
                              stdout console outputs:
                            </span>
                            <div className="bg-[#1e222b] border border-[#181a1f] rounded-lg p-3 space-y-1.5">
                              {customResult.consoleLogs.map((log, lIdx) => (
                                <div
                                  key={lIdx}
                                  className="flex items-start gap-1.5"
                                >
                                  <span className="text-zinc-650 font-bold select-none text-[9.5px]">
                                    &gt;
                                  </span>
                                  <pre className="whitespace-pre-wrap flex-1 text-zinc-300 leading-normal font-mono break-all text-[11px]">
                                    {log.text}
                                  </pre>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                      {/* Notice explaining trial constraints */}
                      <div className="text-[10px] text-zinc-500 bg-zinc-900/20 border border-zinc-850 p-2.5 rounded-lg font-sans leading-relaxed">
                        ⭐️ <strong>Challenge Status</strong>: Custom invocations
                        compile and run code in isolated sandbox closures,
                        providing perfect feedback without modifying your
                        official verification score.
                      </div>
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
