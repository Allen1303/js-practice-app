import { Terminal, Play, Check, XCircle } from "lucide-react";

export function AssertionConsole({
  testResults,
  isRunningTests,
  handleRunTests,
}) {
  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden border-t border-zinc-200 min-h-[220px]">
      <div className="flex items-center justify-between px-6 py-2.5 bg-zinc-50 border-b border-zinc-200 shrink-0">
        <div className="flex items-center gap-2">
          <Terminal className="h-3.5 w-3.5 text-zinc-505" />
          <span className="text-xs font-mono font-bold uppercase tracking-wide text-zinc-705">
            Assertion Engine Output
          </span>
        </div>

        <button
          onClick={handleRunTests}
          disabled={isRunningTests}
          className="py-1.5 px-5 text-xs font-bold font-mono text-zinc-950 bg-[#F7DF1E] hover:bg-[#edd012] border border-zinc-300 active:translate-y-0.5 transition-all select-none rounded-lg flex items-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-50"
        >
          {isRunningTests ? (
            <>
              <div className="h-3 w-3 border-2 border-t-transparent border-zinc-950 rounded-full animate-spin" />
              Evaluating...
            </>
          ) : (
            <>
              <Play className="h-3 w-3 fill-current" />
              Run Code
            </>
          )}
        </button>
      </div>

      {/* Console logs */}
      <div className="flex-1 overflow-y-auto p-5 space-y-3 bg-zinc-50/40">
        {!testResults ? (
          <div className="h-full flex flex-col items-center justify-center text-zinc-400 space-y-1.5 text-xs font-mono">
            <Terminal className="h-6 w-6 text-zinc-305" />
            <span>No output. Click 'Run Code' to execute assertions.</span>
          </div>
        ) : (
          <div className="space-y-3">
            {/* General Summary strip */}
            <div className="p-3 rounded-xl flex items-center justify-between border text-xs font-mono bg-white border-zinc-200 shadow-sm">
              <span className="text-zinc-550 font-bold uppercase">
                Suite Results:
              </span>
              <div className="flex items-center gap-3">
                <span className="text-emerald-705 bg-emerald-50 px-2 py-0.5 rounded font-bold border border-emerald-200">
                  Passed: {testResults.filter((r) => r.passed).length}
                </span>
                <span className="text-rose-705 bg-rose-50 px-2 py-0.5 rounded font-bold border border-rose-200">
                  Failed: {testResults.filter((r) => !r.passed).length}
                </span>
              </div>
            </div>

            {/* Individual outcomes */}
            <div className="space-y-2">
              {testResults.map((result, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-xl border text-xs font-mono transition-all ${
                    result.passed
                      ? "bg-white border-zinc-200 hover:bg-zinc-50"
                      : "bg-red-50/40 border-red-200 hover:bg-red-50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-2">
                      {result.passed ? (
                        <div className="h-4 w-4 rounded bg-[#F7DF1E] flex items-center justify-center border border-zinc-350">
                          <Check className="h-3.5 w-3.5 text-zinc-950 font-bold" />
                        </div>
                      ) : (
                        <XCircle className="h-4 w-4 text-rose-505 shrink-0" />
                      )}
                      <span className="font-bold text-zinc-850">
                        {result.description}
                      </span>
                    </div>
                    <span
                      className={`text-[9px] uppercase tracking-wider px-2 py-0.5 rounded font-bold ${
                        result.passed
                          ? "text-zinc-800 bg-[#F7DF1E]/30"
                          : "text-rose-705 bg-rose-100"
                      }`}
                    >
                      {result.passed ? "PASS" : "FAIL"}
                    </span>
                  </div>

                  {/* Data comparison rows */}
                  <div className="mt-2.5 text-[11px] grid grid-cols-1 md:grid-cols-3 gap-3 text-zinc-650 pt-2 border-t border-zinc-200/65">
                    <div>
                      <span className="text-zinc-400 font-bold block text-[9px] uppercase tracking-wider">
                        Params:
                      </span>
                      <code className="text-zinc-805 block truncate font-mono">
                        {result.input}
                      </code>
                    </div>
                    <div>
                      <span className="text-zinc-400 font-bold block text-[9px] uppercase tracking-wider">
                        Expected:
                      </span>
                      <code className="text-zinc-805 block truncate font-mono">
                        {result.expected}
                      </code>
                    </div>
                    <div>
                      <span className="text-zinc-400 font-bold block text-[9px] uppercase tracking-wider">
                        Output / Return:
                      </span>
                      {result.error ? (
                        <code className="text-rose-600 block font-bold leading-relaxed whitespace-pre-line font-mono">
                          {result.error}
                        </code>
                      ) : (
                        <code
                          className={`${result.passed ? "text-[#a38b00]" : "text-rose-600"} block truncate font-mono`}
                        >
                          {result.actual}
                        </code>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
