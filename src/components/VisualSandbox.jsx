import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles,
  Play,
  RotateCcw,
  Plus,
  Trash2,
  ArrowRight,
  Layers,
  Settings,
  Check,
  Compass,
  Cpu,
  HelpCircle,
  Eye,
  Calendar,
  Clock,
  CornerRightDown,
  ShieldAlert,
  BadgeCheck,
  Zap,
  Lock,
  Unlock,
  RefreshCw,
} from "lucide-react";

export function VisualSandbox({
  activeConcept,
  activeExercise,
  solvedExercises,
  userCodes,
}) {
  const conceptId = activeConcept?.id || "map-callbacks";

  // State configurations for various visualizer types
  // 1. Map Callbacks
  const [mapInput, setMapInput] = useState([
    "  javascript  ",
    "   es6  ",
    " ReactJS ",
  ]);
  const [mapMapped, setMapMapped] = useState([]);
  const [isMapping, setIsMapping] = useState(false);

  // 2. Filter Callbacks
  const [filterArr, setFilterArr] = useState([15, -7, 24, 0, -12, 8]);
  const [filterThreshold, setFilterThreshold] = useState(0);

  // 3. Reduce Callbacks
  const [reduceText, setReduceText] = useState("AAAAABBBCC");
  const [reduceStep, setReduceStep] = useState(0);

  // 4. Object Key-Value Maps
  const [objQuery, setObjQuery] = useState("theme");
  const [searchMode, setSearchMode] = useState(null); // 'linear' | 'hash' | null
  const [activeIndex, setActiveIndex] = useState(-1);
  const [searchSuccess, setSearchSuccess] = useState(false);
  const [objStore, setObjStore] = useState([
    { key: "theme", value: "dark" },
    { key: "zoom", value: "115%" },
    { key: "layout", value: "grid" },
    { key: "username", value: "dev_coder" },
  ]);

  // 5. Closures
  const [closureStream, setClosureStream] = useState([5, 8]);
  const [closureStep, setClosureStep] = useState(3);

  // 6. String Parsing
  const [decompressStr, setDecompressStr] = useState("a4b2c3a1");
  const [decompressedGrid, setDecompressedGrid] = useState([]);
  const [sandboxLabel, setSandboxLabel] = useState("   Save Changes   ");
  const [sandboxVariant, setSandboxVariant] = useState("primary");

  // 7. Array Search
  const [searchTarget, setSearchTarget] = useState(12);
  const [searchArray] = useState([2, 5, 8, 12, 19, 23]);
  const [currentSearchIdx, setCurrentSearchIdx] = useState(-1);

  // 8. Optional Chaining
  const [chainConfig, setChainConfig] = useState({
    theme: "cyberpunk",
    user: {
      profile: {
        address: {
          city: "Neo-Tokyo",
          coordinates: "35.6762, 139.6503",
        },
      },
    },
  });
  const [chainHighlightPath, setChainHighlightPath] = useState([]);

  // 9. Sets
  const [setInput, setSetInput] = useState(
    "apple, banana, apple, cherry, banana",
  );
  const [setUnique, setSetUnique] = useState([]);

  // 10. Promises / Delays
  const [promiseLogs, setPromiseLogs] = useState([]);
  const [promiseStatus, setPromiseStatus] = useState("Idle");
  const [promiseCountdown, setPromiseCountdown] = useState(0);

  // 11. Rest & Spread
  const [baseObj, setBaseObj] = useState({ name: "Alex", score: 98 });
  const [spreadExtra, setSpreadExtra] = useState({
    rank: "Elite",
    active: true,
  });

  // 12. OOP Classes
  const [classSpeed, setClassSpeed] = useState(85);
  const [classColor, setClassColor] = useState("emerald");
  const [carInstances, setCarInstances] = useState([]);

  // 13. Map / WeakMap Collections
  const [mapLedger, setMapLedger] = useState(
    new Map([
      [{ name: "Server_Alpha" }, "Active Port 3000"],
      [{ name: "Server_Beta" }, "Standby Port 5000"],
    ]),
  );

  // 14. Recursion
  const [recurseWord, setRecurseWord] = useState("CODE");
  const [recurseStack, setRecurseStack] = useState([]);
  const [isRecursionRunning, setIsRecursionRunning] = useState(false);

  // 15. Dates & Milestones
  const [selectedDate, setSelectedDate] = useState("2026-06-01");

  // 16. Stacks & Queues (RPN Calculator)
  const [rpnInput, setRpnInput] = useState("3 4 + 2 *");
  const [rpnStack, setRpnStack] = useState([]);
  const [rpnStepsLog, setRpnStepsLog] = useState([]);
  const [isRpnRunning, setIsRpnRunning] = useState(false);

  // 17. Array & Object Mechanics
  const [cartItems, setCartItems] = useState(["Laptop 💻", "Mouse 🐭"]);

  // 18. Basic Function Scripting (Title Case)
  const [titleCaseText, setTitleCaseText] = useState(
    "built with modern modules and hooks",
  );

  // 19. Intermediate (Calendar Overlaps)
  const [teamSlotA, setTeamSlotA] = useState([10, 14]);
  const [teamSlotB, setTeamSlotB] = useState([12, 17]);

  // RESET ALL INNER STATES WHEN CONCEPT ID MOVES
  useEffect(() => {
    setIsMapping(false);
    setMapMapped([]);
    setDecompressedGrid([]);
    setRecurseStack([]);
    setIsRecursionRunning(false);
    setCurrentSearchIdx(-1);
    setRpnStack([]);
    setRpnStepsLog([]);
    setIsRpnRunning(false);
    setSearchMode(null);
    setPromiseLogs([]);
    setPromiseStatus("Idle");
  }, [conceptId]);

  // ACTION METHODS FOR VISUALIZERS
  const handleRunMapVis = async () => {
    if (isMapping) return;
    setIsMapping(true);
    setMapMapped([]);
    for (let i = 0; i < mapInput.length; i++) {
      await new Promise((r) => setTimeout(r, 450));
      const val = mapInput[i].trim().toUpperCase();
      setMapMapped((prev) => [...prev, val]);
    }
    setIsMapping(false);
  };

  const traverseLinearObjSearch = async () => {
    if (searchMode) return;
    setSearchMode("linear");
    setSearchSuccess(false);
    for (let i = 0; i < objStore.length; i++) {
      setActiveIndex(i);
      await new Promise((r) => setTimeout(r, 400));
      if (objStore[i].key === objQuery) {
        setSearchSuccess(true);
        break;
      }
    }
    await new Promise((r) => setTimeout(r, 1000));
    setSearchMode(null);
    setActiveIndex(-1);
  };

  const executeHashObjSearch = async () => {
    if (searchMode) return;
    setSearchMode("hash");
    setSearchSuccess(false);
    setActiveIndex(-2); // instantly hits the match
    await new Promise((r) => setTimeout(r, 600));
    const idx = objStore.findIndex((o) => o.key === objQuery);
    if (idx !== -1) {
      setSearchSuccess(true);
      setActiveIndex(idx);
    }
    await new Promise((r) => setTimeout(r, 1500));
    setSearchMode(null);
    setActiveIndex(-1);
  };

  const triggerRecursiveReverse = async () => {
    if (isRecursionRunning) return;
    setIsRecursionRunning(true);
    setRecurseStack([]);
    const length = recurseWord.length;

    // Call stack pushing phase
    for (let i = 0; i <= length; i++) {
      const remainingStr = recurseWord.slice(i);
      setRecurseStack((prev) => [
        ...prev,
        { name: `reverse("${remainingStr}")`, depth: i },
      ]);
      await new Promise((r) => setTimeout(r, 450));
    }

    // Stack unwinding phase
    for (let i = length; i >= 0; i--) {
      await new Promise((r) => setTimeout(r, 450));
      setRecurseStack((prev) => prev.slice(0, -1));
    }
    setIsRecursionRunning(false);
  };

  const handleRunPromises = async () => {
    setPromiseLogs([]);
    setPromiseStatus("Spawning Connection Node...");
    setPromiseLogs((prev) => [...prev, "⚡ Promise instance initiated."]);

    await new Promise((r) => setTimeout(r, 700));
    setPromiseStatus("Retrying transmission...");
    setPromiseLogs((prev) => [
      ...prev,
      "❌ Network bottleneck: Failed (503 Service Unavailable)",
    ]);

    for (let i = 3; i > 0; i--) {
      setPromiseCountdown(i);
      setPromiseLogs((prev) => [...prev, `⏳ Retrying in ${i}s...`]);
      await new Promise((r) => setTimeout(r, 1000));
    }
    setPromiseCountdown(0);
    setPromiseStatus("Delivering packets...");
    setPromiseLogs((prev) => [
      ...prev,
      "📡 Network retry handshake completed!",
    ]);

    await new Promise((r) => setTimeout(r, 800));
    setPromiseStatus("Operation Resolved!");
    setPromiseLogs((prev) => [
      ...prev,
      "🚀 Connection restored! Output: Resolved API status - Code 200",
    ]);
  };

  const processRpnStack = async () => {
    if (isRpnRunning) return;
    setIsRpnRunning(true);
    setRpnStack([]);
    setRpnStepsLog([]);
    const tokens = rpnInput.trim().split(/\s+/);

    for (let index = 0; index < tokens.length; index++) {
      const token = tokens[index];
      setRpnStepsLog((p) => [...p, `Processing token: '${token}'`]);

      if (!isNaN(token)) {
        setRpnStack((p) => [...p, parseInt(token, 10)]);
        await new Promise((r) => setTimeout(r, 750));
      } else {
        // Operator popped
        if (["+", "-", "*", "/"].includes(token)) {
          setRpnStepsLog((p) => [
            ...p,
            `Found operator '${token}'. Popping two values...`,
          ]);
          await new Promise((r) => setTimeout(r, 500));

          setRpnStack((p) => {
            if (p.length < 2) {
              setRpnStepsLog((l) => [
                ...l,
                `⚠️ Error: Insufficient parameters in stack!`,
              ]);
              return p;
            }
            const b = p[p.length - 1];
            const a = p[p.length - 2];
            let res = 0;
            if (token === "+") res = a + b;
            if (token === "-") res = a - b;
            if (token === "*") res = a * b;
            if (token === "/") res = Math.floor(a / b);

            setRpnStepsLog((l) => [
              ...l,
              `Computed: ${a} ${token} ${b} = ${res}`,
            ]);
            return [...p.slice(0, -2), res];
          });
          await new Promise((r) => setTimeout(r, 900));
        }
      }
    }
    setIsRpnRunning(false);
  };

  // Helper calculation
  const calculatedDaysDiff = () => {
    const start = new Date();
    const end = new Date(selectedDate);
    const diff = end - start;
    const days = Math.round(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  const exercisesForThisConcept = activeConcept?.exercises || [];
  const solvedCountInThisConcept = exercisesForThisConcept.filter(
    (e) => solvedExercises?.[e.id],
  ).length;
  const isConceptMastered =
    solvedCountInThisConcept === exercisesForThisConcept.length &&
    exercisesForThisConcept.length > 0;

  return (
    <div
      className="space-y-5 flex-1 flex flex-col justify-between"
      id="visual-sandbox-screen"
    >
      {/* Dynamic Capstone Mini-App Premium Banner */}
      <div className="bg-yellow-500/5 border border-yellow-500/25 rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 select-none relative overflow-hidden shadow-3xs">
        <div className="absolute top-0 bottom-0 left-0 w-1.5 bg-[#F7DF1E]" />
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="h-9 w-9 rounded-xl bg-zinc-900 flex items-center justify-center shrink-0 shadow-sm border border-zinc-800">
            <Sparkles className="h-4.5 w-4.5 text-[#F7DF1E]" />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-amber-800">
                CAPSTONE MINI-APP
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#F7DF1E] animate-ping" />
            </div>
            <h3 className="text-xs font-black text-zinc-950 tracking-tight leading-none mt-1 shadow-sm">
              Active Browser Widget Simulator
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-end sm:self-center">
          {isConceptMastered ? (
            <span className="text-[10px] font-mono font-black uppercase tracking-wider text-emerald-800 bg-[#F7DF1E]/15 border border-[#edd012] px-3 py-1 rounded-full flex items-center gap-1 shadow-3xs">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />{" "}
              Custom Logic Unlocked!
            </span>
          ) : (
            <span className="text-[9.5px] font-mono font-bold uppercase tracking-wider bg-zinc-150 border border-zinc-200 text-zinc-650 px-3 py-1 rounded-full">
              PRACTICE TO UNLOCK • {solvedCountInThisConcept}/
              {exercisesForThisConcept.length}
            </span>
          )}
        </div>
      </div>

      <div className="mt-[-8px]">
        <div className="flex items-center gap-1.5 text-zinc-400 font-mono text-[10px] uppercase tracking-wider font-extrabold pb-0.5">
          <span>Simulation Console</span>
          <span className="text-zinc-300">•</span>
          <span className="text-[#a38b00] flex items-center gap-1 font-bold">
            <Sparkles className="h-3 w-3 animate-pulse" /> Live Sandbox
          </span>
        </div>
        <h2 className="text-base font-extrabold tracking-tight text-zinc-900 flex items-center gap-2 leading-none">
          {activeConcept.title} Capstone
        </h2>
      </div>

      {/* CORE GRAPHICAL SIMULATORS BASED ON CONCEPT ID */}
      <div className="flex-1 bg-zinc-950/2 p-5 rounded-2xl border border-zinc-200/90 shadow-2xs overflow-hidden flex flex-col justify-center min-h-[340px] bg-linear-to-b from-zinc-50/50 to-zinc-100/50">
        {/* CHAPTER 1: Map Callbacks */}
        {conceptId === "map-callbacks" && (
          <div className="space-y-5 w-full">
            <div className="flex justify-between items-center bg-white p-2.5 rounded-lg border border-zinc-200 shadow-3xs">
              <span className="text-[10px] font-mono font-bold tracking-tight text-zinc-400">
                INPUT STRINGS ARRAY
              </span>
              <button
                onClick={handleRunMapVis}
                disabled={isMapping}
                className="bg-zinc-900 text-white hover:bg-[#F7DF1E] hover:text-zinc-950 text-xs px-3.5 py-1.5 rounded-lg font-bold font-mono transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Play className="h-3.5 w-3.5" />{" "}
                {isMapping ? "Mapping..." : "Run arr.map()"}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 bg-white/70 p-4.5 rounded-xl border border-zinc-200">
                <span className="text-[10px] font-mono font-bold text-zinc-500 uppercase block">
                  Raw Inputs Array
                </span>
                <div className="space-y-2">
                  {mapInput.map((val, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <span className="text-[10px] font-mono text-zinc-400">
                        arr[{idx}]
                      </span>
                      <input
                        type="text"
                        value={val}
                        disabled={isMapping}
                        onChange={(e) => {
                          const updated = [...mapInput];
                          updated[idx] = e.target.value;
                          setMapInput(updated);
                        }}
                        className="flex-1 text-xs px-2.5 py-1.5 bg-white border border-zinc-200 rounded font-mono focus:border-zinc-550 focus:outline-hidden"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2 bg-zinc-900 text-zinc-100 p-4.5 rounded-xl border border-zinc-800 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase block">
                    Returned Cleansed Output
                  </span>
                  <div className="space-y-2 mt-4">
                    {mapInput.map((_, idx) => (
                      <div
                        key={idx}
                        className="flex gap-2 items-center min-h-[32px]"
                      >
                        <span className="text-[10px] font-mono text-zinc-500">
                          [{idx}]
                        </span>
                        <AnimatePresence>
                          {mapMapped[idx] ? (
                            <motion.span
                              initial={{ scale: 0.8, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="text-xs px-3 py-1 bg-yellow-500/10 text-[#F7DF1E] border border-yellow-500/35 rounded-full font-mono font-bold shadow-xs flex items-center gap-1"
                            >
                              <Check className="h-3 w-3 text-yellow-400" />"
                              {mapMapped[idx]}"
                            </motion.span>
                          ) : (
                            <span className="text-zinc-650 text-[11px] font-mono italic">
                              Waiting ...
                            </span>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-t border-zinc-800 pt-3 text-[9.5px] font-mono text-zinc-500">
                  Code:{" "}
                  <code className="text-yellow-400">
                    word.trim().toUpperCase()
                  </code>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CHAPTER 2: Filter Callbacks */}
        {conceptId === "filter-callbacks" && (
          <div className="space-y-5 w-full">
            <div className="space-y-2.5 bg-white p-4.5 rounded-xl border border-zinc-250 shadow-3xs">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-zinc-900 font-mono">
                  Filter Threshold Settings
                </span>
                <span className="text-xs font-mono font-bold bg-zinc-100 text-zinc-800 px-2.5 py-0.8 border border-zinc-200 rounded-full">
                  Keep items &gt;= {filterThreshold}
                </span>
              </div>
              <input
                type="range"
                min="-15"
                max="30"
                value={filterThreshold}
                onChange={(e) =>
                  setFilterThreshold(parseInt(e.target.value, 10))
                }
                className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-900"
              />
            </div>

            <div className="bg-white/85 p-5.5 rounded-xl border border-zinc-200">
              <span className="text-[10px] font-mono font-bold tracking-tight text-zinc-400 uppercase block mb-3">
                Live Filter Pipeline Visualizer
              </span>
              <div className="flex justify-between gap-2.5 items-end h-[110px] max-w-sm mx-auto">
                {filterArr.map((num, idx) => {
                  const passed = num >= filterThreshold;
                  return (
                    <div
                      key={idx}
                      className="flex-1 flex flex-col items-center gap-1.5"
                    >
                      <div
                        style={{
                          height: `${Math.max(15, Math.abs(num) * 2.8)}px`,
                        }}
                        className={`w-full max-w-[28px] rounded transition-all duration-300 flex items-center justify-center font-mono text-[9px] font-bold ${
                          passed
                            ? "bg-emerald-500/15 text-emerald-800 border border-emerald-400 shadow-xs"
                            : "bg-rose-50 border border-rose-200 text-rose-300 relative overflow-hidden"
                        }`}
                      >
                        {num}
                        {!passed && (
                          <div className="absolute inset-0 bg-rose-500/5 rotate-15 flex items-center justify-center opacity-30 select-none">
                            ✕
                          </div>
                        )}
                      </div>
                      <span
                        className={`text-[10px] font-mono font-bold ${passed ? "text-emerald-600" : "text-zinc-300"}`}
                      >
                        {passed ? "PASS" : "OUT"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* CHAPTER 3: Reduce Callbacks */}
        {conceptId === "reduce-callbacks" && (
          <div className="space-y-4 w-full">
            <div className="bg-white p-4.5 rounded-xl border border-zinc-200 space-y-3 shadow-3xs">
              <span className="text-[10px] font-mono font-bold tracking-wider text-zinc-500 uppercase">
                Input Sequence for Run-Length Reduce Encoding
              </span>
              <input
                type="text"
                value={reduceText}
                onChange={(e) => {
                  setReduceText(
                    e.target.value.toUpperCase().replace(/[^A-Z]/g, ""),
                  );
                  setReduceStep(0);
                }}
                placeholder="E.g. AAAAABBB"
                className="w-full text-sm px-3.5 py-2.5 bg-white border border-zinc-200 rounded-lg font-mono focus:border-zinc-550 focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/80 p-4.5 rounded-xl border border-zinc-200 flex flex-col justify-between">
                <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase mb-2">
                  Linear Character Feed
                </span>
                <div className="flex gap-1.5 flex-wrap">
                  {reduceText.split("").map((char, idx) => (
                    <span
                      key={idx}
                      className="h-7 w-7 rounded bg-zinc-900 border border-zinc-800 text-zinc-100 flex items-center justify-center font-mono font-bold text-xs shadow-3xs"
                    >
                      {char}
                    </span>
                  ))}
                </div>
                <div className="text-[10.5px] font-mono text-zinc-500 mt-4 leading-relaxed font-sans">
                  The accumulator acts as a persistent tracking object,
                  appending matches and lengths as we reduce over the string.
                </div>
              </div>

              <div className="bg-zinc-900 text-zinc-200 p-4.5 rounded-xl border border-zinc-850 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase">
                    Encoded Output Result
                  </span>
                  <div className="mt-4 bg-zinc-950/70 p-3.5 rounded border border-zinc-800 text-center font-mono text-lg font-black tracking-widest text-[#F7DF1E]">
                    {(() => {
                      if (!reduceText) return "EMPTY";
                      let encoded = "";
                      let i = 0;
                      while (i < reduceText.length) {
                        let count = 1;
                        while (
                          i + 1 < reduceText.length &&
                          reduceText[i] === reduceText[i + 1]
                        ) {
                          count++;
                          i++;
                        }
                        encoded += reduceText[i] + count;
                        i++;
                      }
                      return encoded;
                    })()}
                  </div>
                </div>
                <span className="text-[9.5px] font-mono text-zinc-500 mt-3 block text-right">
                  Reduced back in O(N) time & space
                </span>
              </div>
            </div>
          </div>
        )}

        {/* CHAPTER 4: Object Dictionaries */}
        {conceptId === "object-dictionaries" && (
          <div className="space-y-4 w-full">
            <div className="flex items-center gap-2.5 bg-white p-3 rounded-lg border border-zinc-200 shadow-3xs">
              <span className="text-xs font-bold text-zinc-700 font-mono">
                SEARCH KEY:
              </span>
              <select
                value={objQuery}
                onChange={(e) => {
                  setObjQuery(e.target.value);
                  setSearchSuccess(false);
                }}
                className="text-xs font-mono font-bold px-2 py-1.5 bg-zinc-50 border border-zinc-200 rounded cursor-pointer"
              >
                <option value="theme">"theme"</option>
                <option value="zoom">"zoom"</option>
                <option value="layout">"layout"</option>
                <option value="username">"username"</option>
                <option value="non_existent">"non_existent"</option>
              </select>

              <button
                onClick={traverseLinearObjSearch}
                disabled={searchMode !== null}
                className="bg-zinc-800 text-white hover:bg-zinc-950 text-xs px-3.5 py-1.5 rounded font-bold font-mono transition-all cursor-pointer disabled:opacity-40 ml-auto"
              >
                Linear (Slow Array Search)
              </button>

              <button
                onClick={executeHashObjSearch}
                disabled={searchMode !== null}
                className="bg-yellow-500 text-zinc-950 hover:bg-yellow-600 text-xs px-3.5 py-1.5 rounded font-bold font-mono transition-all cursor-pointer disabled:opacity-40 shadow-xs"
              >
                O(1) Direct Map Lookup
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {objStore.map((obj, idx) => {
                const isCurrentActive = idx === activeIndex;
                const isLinearSuccess =
                  searchMode === "linear" && isCurrentActive && searchSuccess;
                const isHashSuccess =
                  searchMode === "hash" && isCurrentActive && searchSuccess;

                return (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-xl border transition-all duration-300 text-center flex flex-col justify-center min-h-[90px] cursor-default bg-white relative ${
                      isLinearSuccess || isHashSuccess
                        ? "bg-emerald-500/10 border-emerald-400 shadow-emerald-500/20 shadow-xs"
                        : isCurrentActive
                          ? "bg-rose-500/10 border-rose-450 scale-[1.03]"
                          : "border-zinc-200 shadow-3xs hover:border-zinc-300"
                    }`}
                  >
                    <span className="text-[10px] font-mono text-zinc-400 block mb-0.5">
                      Key
                    </span>
                    <span className="text-xs font-mono font-extrabold text-zinc-900 block truncate">
                      "{obj.key}"
                    </span>
                    <span className="w-4 h-[1px] bg-zinc-200 mx-auto my-1.5"></span>
                    <span className="text-xs font-bold text-zinc-600 font-sans">
                      "{obj.value}"
                    </span>

                    {/* Linear tracing overlay */}
                    {isCurrentActive &&
                      searchMode === "linear" &&
                      !isLinearSuccess && (
                        <div className="absolute inset-0 bg-rose-500/5 border border-rose-400 rounded-xl flex items-center justify-center animate-pulse">
                          <span className="text-[10px] font-mono font-black text-rose-500 tracking-wider">
                            CHECKING...
                          </span>
                        </div>
                      )}
                    {isCurrentActive && searchSuccess && (
                      <div className="absolute -top-2.5 -right-1 bg-emerald-600 text-white border border-emerald-800 text-[8px] font-mono uppercase px-1.5 py-0.5 rounded-full font-bold shadow animate-bounce">
                        MATCH!
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="bg-zinc-900/5 p-3 rounded-lg border border-zinc-200 text-[10.5px] font-mono text-zinc-600 text-center leading-relaxed">
              {searchMode === "linear" &&
                "🔍 Scanning array indices sequentially... Complexity: O(N) Worst Case."}
              {searchMode === "hash" &&
                "⚡ Direct structural evaluation! Complexity: O(1) Instant Retrieval."}
              {!searchMode &&
                "Select a key and trigger a search to inspect the computational complexity difference."}
            </div>
          </div>
        )}

        {/* CHAPTER 5: Closures */}
        {conceptId === "closures-scoping" && (
          <div className="space-y-4 w-full text-center">
            <div className="max-w-sm mx-auto bg-white border border-zinc-200 rounded-2xl p-5 shadow-3xs space-y-4.5 relative">
              {/* Outer Capsule / Boundary */}
              <div className="border border-blue-400/30 bg-blue-50/20 p-4.5 rounded-2xl relative shadow-2xs overflow-hidden">
                <span className="absolute top-2.5 left-3 text-[9px] font-mono font-bold text-blue-500 uppercase tracking-widest leading-none">
                  🔐 Private Closure Scope
                </span>

                <div className="mt-4 flex gap-2 justify-center items-center">
                  {closureStream.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ scale: 0.5, opacity: 0, y: 10 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      className="h-8 w-8 rounded-full bg-blue-500 border border-blue-600 text-white flex items-center justify-center font-mono font-bold text-xs shadow-xs"
                    >
                      {item}
                    </motion.div>
                  ))}
                  {closureStream.length === 0 && (
                    <span className="text-[11px] font-mono text-blue-400/70 italic">
                      Stream cache buffer is empty
                    </span>
                  )}
                </div>

                <div className="mt-4 bg-zinc-950 text-[#F7DF1E] text-xs font-mono font-extrabold py-1.5 px-3 rounded-full inline-block border border-zinc-800 shadow-3xs">
                  Lexical Memory Array: [{closureStream.join(", ")}]
                </div>
              </div>

              {/* Outside Controls */}
              <div className="space-y-3">
                <div className="flex gap-2.5">
                  <button
                    onClick={() => {
                      const rand = Math.floor(Math.random() * 20);
                      setClosureStream((prev) => [...prev, rand]);
                    }}
                    className="flex-1 bg-zinc-900 border border-zinc-800 hover:bg-zinc-950 hover:border-zinc-950 text-white text-xs py-2 rounded-xl font-bold font-mono transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="h-4 w-4 text-[#F7DF1E]" /> Feed Closure
                    (Push Item)
                  </button>

                  <button
                    onClick={() => setClosureStream([])}
                    className="border border-zinc-200 hover:border-zinc-300 bg-white text-zinc-650 hover:text-zinc-900 text-xs px-3.5 rounded-xl font-bold font-mono transition-all flex items-center justify-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="h-3.5 w-3.5" /> Reset
                  </button>
                </div>

                {closureStream.length > 0 && (
                  <div className="bg-[#fcf8e3] border border-[#f3ebc0] rounded-xl p-3 text-center">
                    <span className="text-[10px] font-mono font-bold text-amber-800 block mb-0.5">
                      MOVING AVERAGE OUTCOME
                    </span>
                    <span className="text-sm font-sans font-black text-amber-900">
                      {Math.round(
                        (closureStream.reduce((s, x) => s + x, 0) /
                          closureStream.length) *
                          100,
                      ) / 100}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* CHAPTER 6: String Parsing */}
        {conceptId === "string-parsing" &&
          (() => {
            const evalResult = (() => {
              const userCode = userCodes?.["string-html-builder"];
              if (!userCode) {
                return {
                  isUser: false,
                  html: `<button class="BTN-${sandboxVariant.toUpperCase()}">${sandboxLabel.trim()}</button>`,
                  error: null,
                };
              }
              try {
                const compiledFunction = new Function(`
                ${userCode}
                if (typeof buildHTMLButton === 'undefined') {
                  throw new Error('buildHTMLButton is not defined');
                }
                return buildHTMLButton;
              `);
                const userFunc = compiledFunction();
                const output = userFunc(sandboxLabel, sandboxVariant);
                return { isUser: true, html: output, error: null };
              } catch (e) {
                return {
                  isUser: true,
                  html: `<button class="BTN-${sandboxVariant.toUpperCase()}">${sandboxLabel.trim()}</button>`,
                  error: e.message,
                };
              }
            })();

            // Determine button style dynamically for the live browser mock preview
            const variantLower = sandboxVariant.toLowerCase().trim();
            let buttonBg =
              "bg-[#F7DF1E] text-zinc-950 hover:bg-zinc-800 hover:text-white";
            let focusColor = "ring-yellow-400";
            if (variantLower === "success") {
              buttonBg = "bg-emerald-600 text-white hover:bg-emerald-700";
              focusColor = "ring-emerald-400";
            } else if (variantLower === "danger") {
              buttonBg = "bg-rose-600 text-white hover:bg-rose-700";
              focusColor = "ring-rose-400";
            } else if (
              variantLower === "warning" ||
              variantLower === "warning"
            ) {
              buttonBg = "bg-amber-500 text-zinc-950 hover:bg-amber-600";
              focusColor = "ring-amber-400";
            }

            return (
              <div className="space-y-4 w-full">
                {/* Controller Box */}
                <div className="bg-white p-4.5 rounded-xl border border-zinc-200 space-y-4 shadow-3xs text-left">
                  <span className="text-[10px] font-mono font-bold tracking-wider text-zinc-500 uppercase block">
                    Interactive Widget Parameters
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Label Input with visual space markers */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-zinc-600 font-mono flex items-center justify-between">
                        <span>Label String Content:</span>
                        <span className="text-[9px] text-zinc-400 font-normal">
                          Trims spaces live
                        </span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={sandboxLabel}
                          onChange={(e) => setSandboxLabel(e.target.value)}
                          placeholder="  Click Me  "
                          className="w-full text-xs px-3 py-2 bg-zinc-50 border border-zinc-200 rounded font-mono focus:border-zinc-550 focus:outline-hidden"
                        />
                        {sandboxLabel.startsWith(" ") ||
                        sandboxLabel.endsWith(" ") ? (
                          <span
                            className="absolute right-2.5 top-2.5 h-1.5 w-1.5 rounded-full bg-amber-500"
                            title="Contains edge spaces"
                          />
                        ) : null}
                      </div>
                    </div>

                    {/* Variant Selection pills */}
                    <div className="space-y-1.5">
                      <label className="text-[11px] font-bold text-zinc-600 font-mono block">
                        Style Variant (`variant`):
                      </label>
                      <div className="flex gap-1.5 flex-wrap">
                        {["primary", "success", "danger", "warning"].map(
                          (v) => (
                            <button
                              key={v}
                              onClick={() => setSandboxVariant(v)}
                              className={`text-[10px] font-mono font-bold px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer capitalize ${
                                sandboxVariant === v
                                  ? "bg-zinc-900 border-zinc-900 text-white shadow-3xs"
                                  : "bg-white border-zinc-200 text-zinc-650 hover:bg-zinc-50"
                              }`}
                            >
                              {v}
                            </button>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Transformation pipeline view */}
                <div className="bg-zinc-50/50 p-4 rounded-xl border border-zinc-200 text-left space-y-3">
                  <span className="text-[10px] font-mono font-extrabold text-zinc-400 uppercase tracking-tight block">
                    Method Execution Order (Step-by-step)
                  </span>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs">
                    {/* Step 1 */}
                    <div className="bg-white p-2.5 rounded-lg border border-zinc-150 flex flex-col justify-between">
                      <div>
                        <span className="font-mono text-[9px] font-bold text-[#b59e00] block">
                          STEP 1 • TEXT DE-SPACING
                        </span>
                        <span className="font-semibold text-zinc-800">
                          .trim()
                        </span>
                      </div>
                      <div className="mt-1.5 font-mono text-[11px] bg-zinc-50 p-1 px-1.5 rounded text-zinc-500 overflow-x-auto whitespace-nowrap">
                        &quot;
                        <span className="bg-amber-100 text-amber-800 line-through rounded">
                          {sandboxLabel.match(/^\s*/)?.[0]}
                        </span>
                        <span className="text-zinc-900 font-bold font-sans">
                          {sandboxLabel.trim()}
                        </span>
                        <span className="bg-amber-100 text-amber-800 line-through rounded">
                          {sandboxLabel.match(/\s*$/)?.[0]}
                        </span>
                        &quot;
                      </div>
                    </div>

                    {/* Step 2 */}
                    <div className="bg-white p-2.5 rounded-lg border border-zinc-150 flex flex-col justify-between">
                      <div>
                        <span className="font-mono text-[9px] font-bold text-[#b59e00] block">
                          STEP 2 • CASE ALIGNMENT
                        </span>
                        <span className="font-semibold text-zinc-800">
                          .toUpperCase()
                        </span>
                      </div>
                      <div className="mt-1.5 font-mono text-[11px] bg-zinc-50 p-1 px-1.5 rounded text-zinc-900 font-black">
                        &quot;{sandboxVariant.toUpperCase()}&quot;
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="bg-white p-2.5 rounded-lg border border-zinc-150 flex flex-col justify-between">
                      <div>
                        <span className="font-mono text-[9px] font-bold text-[#b59e00] block">
                          STEP 3 • BRACES INTERPOLATOR
                        </span>
                        <span className="font-semibold text-zinc-800">
                          Template literal (`)
                        </span>
                      </div>
                      <div
                        className="mt-1.5 font-mono text-[10px] bg-zinc-50 p-1 px-1.5 rounded text-zinc-650 overflow-x-auto whitespace-nowrap"
                        title={evalResult.html}
                      >
                        &lt;button class=&quot;BTN-...
                      </div>
                    </div>
                  </div>
                </div>

                {/* Dynamic live browser mini app simulator */}
                <div className="bg-zinc-100 rounded-xl border border-zinc-200 overflow-hidden shadow-sm">
                  {/* Simulated Browser Bar */}
                  <div className="bg-zinc-150 px-3 py-2 border-b border-zinc-200 flex items-center justify-between">
                    <div className="flex gap-1.5 items-center">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400 block" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 block" />
                    </div>
                    <div className="bg-white/80 border border-zinc-200 rounded text-[9.5px] font-mono px-6 py-0.5 text-zinc-500">
                      localhost:3000/exercise-preview
                    </div>
                    <div className="flex items-center gap-1">
                      {evalResult.isUser && !evalResult.error ? (
                        <span className="text-[8.5px] font-mono font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 border border-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-1 animate-pulse">
                          ● Live Code
                        </span>
                      ) : (
                        <span className="text-[8.5px] font-mono font-bold uppercase tracking-wider text-zinc-500 bg-zinc-100 border border-zinc-300 px-2 py-0.5 rounded-full">
                          Emulated
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Simulated Content Area */}
                  <div className="bg-white p-6 min-h-[140px] flex flex-col items-center justify-center gap-3 relative">
                    {/* Compiled error notice if student made syntax code error */}
                    {evalResult.error ? (
                      <div className="text-center p-3 max-w-sm bg-rose-50 border border-rose-100 rounded-lg space-y-1">
                        <span className="text-[9px] font-mono font-bold text-rose-700 uppercase tracking-widest block">
                          Runtime compilation error
                        </span>
                        <p className="text-[11px] font-sans text-rose-600 leading-tight">
                          {evalResult.error}
                        </p>
                      </div>
                    ) : (
                      <>
                        {/* Live rendered interactive element */}
                        <button
                          className={`px-4.5 py-2.5 text-xs font-bold rounded-lg font-sans transition-all shadow-3xs cursor-pointer select-none active:scale-98 ${buttonBg}`}
                        >
                          {sandboxLabel.trim()}
                        </button>
                        <p className="text-[10px] font-sans text-zinc-400 italic">
                          Click component to inspect interactive press logic
                          feedback
                        </p>
                      </>
                    )}
                  </div>

                  {/* Generated Source Output */}
                  <div className="bg-zinc-950 p-3.5 border-t border-zinc-800 text-left">
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[9px] font-mono font-black text-zinc-500 uppercase tracking-wide">
                        Returned HTML String Output:
                      </span>
                      <span className="text-[8px] font-mono text-zinc-500">
                        String type length: {evalResult.html?.length || 0}
                      </span>
                    </div>
                    <pre className="font-mono text-[11px] text-[#F7DF1E] bg-[#F7DF1E]/5 p-2 rounded border border-yellow-500/10 break-all overflow-x-auto whitespace-pre-wrap select-all">
                      {evalResult.html}
                    </pre>
                  </div>
                </div>
              </div>
            );
          })()}

        {/* CHAPTER 7: Array Search */}
        {conceptId === "array-search-verification" && (
          <div className="space-y-4 w-full">
            <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-zinc-200 shadow-3xs">
              <span className="text-xs font-bold text-zinc-700 font-mono">
                TARGET SEARCH ITEM:
              </span>
              <input
                type="number"
                value={searchTarget}
                onChange={(e) => {
                  setSearchTarget(parseInt(e.target.value, 10));
                  setCurrentSearchIdx(-1);
                }}
                className="w-16 text-center text-xs font-mono font-bold px-2 py-1 bg-zinc-50 border border-zinc-200 rounded"
              />
              <button
                onClick={async () => {
                  for (let i = 0; i < searchArray.length; i++) {
                    setCurrentSearchIdx(i);
                    await new Promise((r) => setTimeout(r, 600));
                    if (searchArray[i] === searchTarget) break;
                  }
                }}
                className="bg-zinc-900 text-white hover:bg-[#F7DF1E] hover:text-zinc-950 text-xs px-3.5 py-1.5 rounded font-bold font-mono transition-all ml-auto cursor-pointer"
              >
                Scan Array Trace
              </button>
            </div>

            <div className="grid grid-cols-6 gap-2">
              {searchArray.map((num, idx) => {
                const isActive = idx === currentSearchIdx;
                const isMatch = num === searchTarget;
                const completedAndPassed = isActive && isMatch;

                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border text-center transition-all duration-300 flex flex-col justify-center min-h-[85px] bg-white ${
                      completedAndPassed
                        ? "bg-emerald-500/10 border-emerald-400 scale-[1.03] shadow-emerald-500/15 shadow-xs"
                        : isActive
                          ? "bg-rose-500/10 border-rose-400 scale-[1.03]"
                          : "border-zinc-200 shadow-3xs"
                    }`}
                  >
                    <span className="text-[9px] font-mono text-zinc-400 block">
                      idx [{idx}]
                    </span>
                    <span className="text-base font-black text-zinc-900 mt-1 font-mono">
                      {num}
                    </span>
                    <span className="text-[8px] font-mono font-bold uppercase mt-1 leading-none text-zinc-400">
                      {completedAndPassed ? "MATCH" : isActive ? "CHECK" : ""}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* CHAPTER 8: Optional Chaining */}
        {conceptId === "optional-chaining-coalescing" && (
          <div className="space-y-4 w-full">
            <div className="flex border border-zinc-200 bg-white rounded-xl p-3.5 justify-between items-center shadow-3xs">
              <span className="text-xs font-bold font-mono text-zinc-700">
                TOGGLE OBJECT LAYER PRESENCE:
              </span>
              <div className="flex gap-4">
                <label className="flex items-center gap-1.5 text-xs text-zinc-700 select-none font-mono cursor-pointer">
                  <input
                    type="checkbox"
                    checked={chainConfig.user !== null}
                    onChange={(e) => {
                      setChainConfig((p) => ({
                        ...p,
                        user: e.target.checked
                          ? { profile: { address: { city: "Neo-Tokyo" } } }
                          : null,
                      }));
                    }}
                  />{" "}
                  user
                </label>
                <label className="flex items-center gap-1.5 text-xs text-zinc-700 select-none font-mono cursor-pointer">
                  <input
                    type="checkbox"
                    checked={
                      chainConfig.user?.profile !== null &&
                      chainConfig.user !== null
                    }
                    disabled={chainConfig.user === null}
                    onChange={(e) => {
                      setChainConfig((p) => ({
                        ...p,
                        user: p.user
                          ? {
                              ...p.user,
                              profile: e.target.checked
                                ? { address: { city: "Neo-Tokyo" } }
                                : null,
                            }
                          : null,
                      }));
                    }}
                  />{" "}
                  profile
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-zinc-900 text-zinc-200 p-4.5 rounded-xl border border-zinc-850 flex flex-col justify-between">
                <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase">
                  Live Chained Expression Crawler
                </span>
                <div className="mt-4 font-mono text-[11px] space-y-1.5 text-[#abb2bf] bg-zinc-950 p-3 rounded border border-zinc-800">
                  <div>
                    const city = user?.profile?.address?.city ?? "Default
                    Casing";
                  </div>
                  <div className="border-t border-zinc-900 my-2 pt-2 text-[10px] leading-relaxed text-zinc-550">
                    <div>Evaluation steps:</div>
                    <div
                      style={{
                        color: chainConfig.user ? "#98c379" : "#e06c75",
                      }}
                    >
                      - user:{" "}
                      {chainConfig.user ? "OBJECT" : "NULL (Stop crawl)"}
                    </div>
                    <div
                      style={{
                        color: chainConfig.user?.profile
                          ? "#98c379"
                          : "#e06c75",
                      }}
                    >
                      - user?.profile:{" "}
                      {chainConfig.user?.profile ? "OBJECT" : "NULL/UNDEFINED"}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-4.5 rounded-xl border border-zinc-250 shadow-3xs flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase">
                    Resolved Value outcome
                  </span>
                  <div className="my-4 text-center font-mono font-extrabold text-[#F7DF1E] bg-zinc-900 py-3.5 rounded-lg border border-zinc-950 shadow">
                    "
                    {chainConfig.user?.profile?.address?.city ??
                      "DEFAULT CASING"}
                    "
                  </div>
                </div>
                <span className="text-[9px] font-mono font-bold tracking-wide uppercase text-zinc-400 leading-none block">
                  Status:{" "}
                  {chainConfig.user?.profile?.address?.city
                    ? "CRAWL COMPLETED"
                    : "SAFE COALESCING RETRACT"}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* CHAPTER 9: Sets */}
        {conceptId === "set-unique-collections" && (
          <div className="space-y-4 w-full">
            <div className="bg-white p-4.5 rounded-xl border border-zinc-200 space-y-2 shadow-3xs">
              <span className="text-[10px] font-mono font-bold tracking-wider text-zinc-500 uppercase block mb-1">
                Delimited String Tag List
              </span>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={setInput}
                  onChange={(e) => setSetInput(e.target.value)}
                  placeholder="apple, banana, apple"
                  className="flex-1 text-xs px-2.5 py-1.5 bg-zinc-50 border border-zinc-200 rounded font-mono focus:border-zinc-550 focus:outline-hidden"
                />
                <button
                  onClick={() => {
                    const tags = setInput
                      .split(",")
                      .map((t) => t.trim())
                      .filter(Boolean);
                    setSetUnique([...new Set(tags)]);
                  }}
                  className="bg-zinc-900 text-white hover:bg-[#F7DF1E] hover:text-zinc-950 text-xs px-4 rounded font-mono font-bold transition-all cursor-pointer"
                >
                  Process Set
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/80 p-4 rounded-xl border border-zinc-200 flex flex-col justify-between">
                <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase block mb-2">
                  Original Inputs stream
                </span>
                <div className="flex flex-wrap gap-1.5 h-full items-center">
                  {setInput.split(",").map((p, idx) => {
                    const val = p.trim();
                    if (!val) return null;
                    return (
                      <span
                        key={idx}
                        className="px-2.5 py-1.5 bg-zinc-100 border border-zinc-250 text-zinc-700 font-mono text-xs rounded-md shadow-3xs"
                      >
                        {val}
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 text-zinc-100 p-4 rounded-xl flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase block mb-2">
                    Processed Set Storage
                  </span>
                  <div className="flex flex-wrap gap-1.5 min-h-[36px] items-center">
                    {setUnique.map((val, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="px-2.5 py-1.5 bg-yellow-500/10 text-[#F7DF1E] border border-yellow-500/35 font-mono text-xs font-bold rounded-full shadow"
                      >
                        {val}
                      </motion.span>
                    ))}
                    {setUnique.length === 0 && (
                      <span className="text-[10.5px] font-mono text-zinc-500 italic block">
                        No unique records cached
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-[9.5px] font-mono text-zinc-500 mt-4 leading-none">
                  Total index size:{" "}
                  <strong className="text-[#F7DF1E]">{setUnique.length}</strong>{" "}
                  elements
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CHAPTER 10: Promises */}
        {conceptId === "two-pointer-sliding-window" && (
          <div className="space-y-4 w-full">
            <div className="flex justify-between items-center bg-white p-3.5 rounded-lg border border-zinc-200 shadow-3xs">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-zinc-700 font-mono">
                  CONNECTION RUNNER:
                </span>
                <span
                  className={`text-[10px] font-mono uppercase font-black px-2 py-0.5 rounded ${
                    promiseStatus.includes("Failed") || promiseCountdown > 0
                      ? "bg-rose-100 text-rose-800 border border-rose-300 animate-pulse"
                      : promiseStatus.includes("Resolved")
                        ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                        : "bg-zinc-100 text-zinc-700 border border-zinc-300"
                  }`}
                >
                  {promiseStatus}
                </span>
              </div>
              <button
                onClick={handleRunPromises}
                disabled={
                  promiseCountdown > 0 ||
                  promiseStatus.includes("Connection") ||
                  promiseStatus.includes("pack")
                }
                className="bg-zinc-900 text-white hover:bg-[#F7DF1E] hover:text-zinc-950 text-xs px-4 py-1.8 rounded font-bold font-mono transition-all cursor-pointer disabled:opacity-40"
              >
                Initiate Handshake Fetch
              </button>
            </div>

            <div className="bg-zinc-900 text-zinc-200 p-4.5 rounded-xl border border-zinc-800 h-[105px] overflow-y-auto font-mono text-[10px] leading-relaxed space-y-1 select-all">
              {promiseLogs.map((log, idx) => (
                <div
                  key={idx}
                  className={
                    log.includes("❌")
                      ? "text-rose-400"
                      : log.includes("Resolved")
                        ? "text-emerald-400"
                        : "text-zinc-305"
                  }
                >
                  {log}
                </div>
              ))}
              {promiseLogs.length === 0 && (
                <div className="text-zinc-500 italic">
                  Logs terminal output buffer idle... Click 'Initiate Handshake
                  Fetch'
                </div>
              )}
            </div>
          </div>
        )}

        {/* CHAPTER 11: Destructuring */}
        {conceptId === "spread-destructuring-unpack" && (
          <div className="space-y-4 w-full">
            <div className="bg-white p-4.5 rounded-xl border border-zinc-200 space-y-3.5 shadow-3xs">
              <span className="text-[10px] font-mono font-bold tracking-wider text-zinc-500 uppercase block">
                Input Configuration Objects
              </span>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-zinc-400 block">
                    Base Profile
                  </span>
                  <input
                    type="text"
                    value={baseObj.name}
                    onChange={(e) =>
                      setBaseObj((p) => ({ ...p, name: e.target.value }))
                    }
                    className="w-full text-xs px-2 py-1.5 bg-zinc-50 border border-zinc-200 rounded font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-zinc-400 block">
                    Base Score
                  </span>
                  <input
                    type="number"
                    value={baseObj.score}
                    onChange={(e) =>
                      setBaseObj((p) => ({
                        ...p,
                        score: parseInt(e.target.value, 10),
                      }))
                    }
                    className="w-full text-xs px-2 py-1.5 bg-zinc-50 border border-zinc-200 rounded font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/80 p-4.5 rounded-xl border border-zinc-200 flex flex-col justify-between">
                <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase">
                  Unpacked Destructuring Code
                </span>
                <div className="mt-2.5 font-mono text-[10.5px] bg-zinc-950 p-3 leading-relaxed rounded border border-zinc-800 text-[#abb2bf] select-all">
                  <div>
                    const base = &#123; name: "{baseObj.name}", score:{" "}
                    {baseObj.score} &#125;;
                  </div>
                  <div>
                    const combined = &#123; ...base, rank: "Elite" &#125;;
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900 text-zinc-200 p-4.5 rounded-xl border border-zinc-850 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase block mb-1">
                    Spread Aggregated Outcome
                  </span>
                  <div className="my-2.5 font-mono text-xs bg-zinc-950 p-3.5 rounded border border-zinc-800 text-[#F7DF1E] shadow">
                    &#123; name: "{baseObj.name}", score: {baseObj.score}, rank:
                    "Elite", active: true &#125;
                  </div>
                </div>
                <span className="text-[9.5px] font-mono text-zinc-500 leading-none">
                  Calculated destructured state dynamically
                </span>
              </div>
            </div>
          </div>
        )}

        {/* CHAPTER 12: Class Blueprints */}
        {conceptId === "oop-classes-prototype" && (
          <div className="space-y-4 w-full">
            <div className="flex border border-zinc-200 bg-white rounded-xl p-3.5 justify-between items-center shadow-3xs gap-4 overflow-x-auto">
              <div className="flex gap-3.5 items-center">
                <span className="text-xs font-bold font-mono text-zinc-700 uppercase">
                  SPECIATION TYPE:
                </span>
                <button
                  onClick={() => setClassColor("emerald")}
                  className={`px-2.5 py-1 rounded-md text-xs font-bold font-mono border select-none cursor-pointer ${classColor === "emerald" ? "bg-emerald-100 border-emerald-400 text-emerald-800" : "bg-white border-zinc-300 text-zinc-500"}`}
                >
                  Emerald Leaf 🍃
                </button>
                <button
                  onClick={() => setClassColor("sky")}
                  className={`px-2.5 py-1 rounded-md text-xs font-bold font-mono border select-none cursor-pointer ${classColor === "sky" ? "bg-sky-100 border-sky-400 text-sky-800" : "bg-white border-zinc-300 text-zinc-500"}`}
                >
                  Sky Glide ☁️
                </button>
              </div>

              <button
                onClick={() => {
                  const id = Date.now();
                  setCarInstances((p) => [
                    ...p,
                    {
                      id,
                      type: `EvCar_${classColor}`,
                      speed: classSpeed,
                      color: classColor,
                    },
                  ]);
                }}
                className="bg-zinc-900 text-white hover:bg-[#F7DF1E] hover:text-zinc-950 text-xs px-3.5 py-1.8 rounded font-mono font-bold transition-all shrink-0 cursor-pointer"
              >
                Instantiate Class
              </button>
            </div>

            <div className="bg-white/80 p-4.5 rounded-xl border border-zinc-200">
              <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-tight block mb-3">
                Instantiated Object Registry (Memory Heap)
              </span>
              <div className="flex gap-2 flex-wrap min-h-[70px] items-center justify-center">
                {carInstances.map((car, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg border border-zinc-250 bg-white text-center shadow-3xs min-w-[100px]"
                  >
                    <span className="text-[8px] font-mono text-zinc-450 uppercase block">
                      Object instance [{idx}]
                    </span>
                    <strong className="text-xs font-mono text-zinc-800 block truncate leading-tight mt-0.5">
                      {car.type}
                    </strong>
                    <button
                      onClick={() =>
                        setCarInstances((p) => p.filter((c) => c.id !== car.id))
                      }
                      className="text-[9px] font-mono font-bold text-rose-500 hover:text-rose-700 uppercase tracking-wider block mx-auto mt-2 cursor-pointer"
                    >
                      Delete Heap
                    </button>
                  </div>
                ))}
                {carInstances.length === 0 && (
                  <span className="text-[10.5px] font-mono text-zinc-400 italic">
                    Memory heap is empty. Click Instantiate Class to allocate
                    RAM.
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* CHAPTER 13: Maps & WeakMaps */}
        {conceptId === "es6-maps-collections" && (
          <div className="space-y-4 w-full">
            <div className="bg-zinc-900 border border-zinc-850 p-4 rounded-xl text-zinc-100 flex flex-col justify-between">
              <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase block mb-2">
                ES6 Map Storage Key-Value ledger
              </span>
              <div className="space-y-2 mt-2">
                {[...mapLedger.entries()].map(([key, val], idx) => (
                  <div
                    key={idx}
                    className="bg-zinc-950 p-3 rounded border border-zinc-800 flex justify-between items-center text-xs font-mono"
                  >
                    <span className="text-yellow-400">
                      Object reference Key: &#123; name: "{key.name}" &#125;
                    </span>
                    <span className="text-zinc-400">➡️ value: "{val}"</span>
                  </div>
                ))}
              </div>
              <p className="text-[10px] font-mono text-zinc-550 leading-relaxed mt-4 font-sans border-t border-zinc-850 pt-3">
                Unlike standard JavaScript objects where keys represent
                stringified markers, ES6 Map instances hold actual abstract
                address markers mapping values to live references properly.
              </p>
            </div>
          </div>
        )}

        {/* CHAPTER 14: Recursion */}
        {conceptId === "recursion-call-stack" && (
          <div className="space-y-4 w-full text-center">
            <div className="flex border border-zinc-200 bg-white rounded-xl p-3 justify-between items-center shadow-3xs max-w-sm mx-auto">
              <span className="text-xs font-bold font-mono text-zinc-700">
                INPUT WORD:
              </span>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={recurseWord}
                  onChange={(e) =>
                    setRecurseWord(
                      e.target.value.toUpperCase().replace(/[^A-Z]/g, ""),
                    )
                  }
                  placeholder="E.g. TYPE"
                  className="w-20 text-center text-xs font-mono font-bold px-2 py-1 bg-zinc-50 border border-zinc-200 rounded"
                />
                <button
                  onClick={triggerRecursiveReverse}
                  disabled={isRecursionRunning}
                  className="bg-zinc-900 text-white hover:bg-[#F7DF1E] hover:text-zinc-950 text-xs px-3.5 py-1.5 rounded font-mono font-bold transition-all cursor-pointer disabled:opacity-40"
                >
                  Recurse
                </button>
              </div>
            </div>

            <div className="max-w-xs mx-auto border border-zinc-200 bg-white p-4.5 rounded-2xl shadow-3xs flex flex-col justify-end min-h-[160px] items-center space-y-1.5">
              <span className="text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-widest block mb-1">
                Visual call stack frames
              </span>
              <AnimatePresence>
                {recurseStack.map((frame, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ scale: 0.8, opacity: 0, y: -10 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="text-xs px-3 py-1 bg-blue-500/10 text-blue-600 border border-blue-400 rounded-lg font-mono font-semibold max-w-[190px] text-center shadow-3xs animate-pulse leading-none flex items-center justify-center gap-1"
                  >
                    <CornerRightDown className="h-3 w-3" /> {frame.name}
                  </motion.div>
                ))}
                {recurseStack.length === 0 && (
                  <span className="text-[10px] font-mono text-zinc-400 italic">
                    Call Stack completely resolved. Out-of-bounds frames: Empty
                  </span>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* CHAPTER 15: Dates & Milestones */}
        {conceptId === "linked-lists-trees" && (
          <div className="space-y-4 w-full">
            <div className="flex border border-zinc-200 bg-white rounded-xl p-3.5 justify-between items-center shadow-3xs max-w-sm mx-auto">
              <span className="text-xs font-bold font-mono text-zinc-700">
                SELECT TARGET DATE:
              </span>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="text-xs font-mono font-bold px-2 py-1.5 bg-zinc-50 border border-zinc-200 rounded outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4.5 rounded-xl border border-zinc-250 shadow-3xs flex flex-col justify-between">
                <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase">
                  Input Absolute Representation
                </span>
                <div className="mt-2.5 font-mono text-xs bg-zinc-900 p-3.5 rounded border border-zinc-950 text-[#F7DF1E] shadow leading-none select-all">
                  new Date("{selectedDate}").toISOString()
                </div>
              </div>

              <div className="bg-zinc-900 text-zinc-250 p-4.5 rounded-xl border border-zinc-800 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase block mb-1">
                    Time Delta Difference
                  </span>
                  <div className="my-2 text-center font-mono font-black text-white text-lg tracking-wide bg-zinc-950 p-3 rounded border border-zinc-850">
                    {calculatedDaysDiff()} days
                  </div>
                </div>
                <span className="text-[9px] font-mono text-zinc-550 block">
                  Calculated relative UTC milestones dynamically
                </span>
              </div>
            </div>
          </div>
        )}

        {/* CHAPTER 16: Stacks & Queues */}
        {conceptId === "stack-queue-dsa" && (
          <div className="space-y-4.5 w-full">
            <div className="flex border border-zinc-200 bg-white p-3 rounded-lg justify-between items-center shadow-3xs max-w-md mx-auto">
              <span className="text-xs font-extrabold font-mono text-zinc-700 truncate mr-3 uppercase">
                RPN Expression:
              </span>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={rpnInput}
                  onChange={(e) => setRpnInput(e.target.value)}
                  placeholder="3 4 + 2 *"
                  className="w-24 text-center text-xs font-mono font-bold px-2.5 py-1.5 bg-zinc-50 border border-zinc-200 rounded focus:border-zinc-550 focus:outline-none"
                />
                <button
                  onClick={processRpnStack}
                  disabled={isRpnRunning}
                  className="bg-zinc-900 text-white hover:bg-[#F7DF1E] hover:text-zinc-950 text-xs px-3.5 py-1.5 rounded font-mono font-bold transition-all cursor-pointer disabled:opacity-40"
                >
                  Solve Stack
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Stack visualizer column */}
              <div className="bg-white border border-zinc-200 rounded-2xl p-4.5 shadow-3xs flex flex-col justify-end min-h-[170px] items-center space-y-1.5 relative overflow-hidden">
                <span className="absolute top-2.5 left-3 text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-widest leading-none">
                  📥 Vertical LIFO Stack Container
                </span>

                <div className="flex flex-col-reverse w-full max-w-[140px] border-x border-b-4 border-zinc-350 min-h-[105px] p-1 bg-zinc-50/50 rounded-b-lg space-y-1.5 space-y-reverse justify-start">
                  <AnimatePresence>
                    {rpnStack.map((val, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ y: -80, scale: 0.8, opacity: 0 }}
                        animate={{ y: 0, scale: 1, opacity: 1 }}
                        exit={{ scale: 0.7, opacity: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 220,
                          damping: 16,
                        }}
                        className="text-xs px-3 py-1 bg-[#F7DF1E]/10 text-zinc-900 border border-zinc-950 rounded font-mono font-black text-center shadow-xs leading-none"
                      >
                        {val}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {rpnStack.length === 0 && (
                    <div className="text-[10px] font-mono text-zinc-400 italic text-center py-8">
                      Stack empty. Feed integers.
                    </div>
                  )}
                </div>
              </div>

              {/* Logs visualizer column */}
              <div className="bg-zinc-900 border border-zinc-805 text-zinc-100 p-4 rounded-2xl flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono font-black text-zinc-400 uppercase block mb-1">
                    State Log history
                  </span>
                  <div className="max-h-[120px] overflow-y-auto space-y-1 pt-1 font-mono text-[9px] leading-relaxed select-all">
                    {rpnStepsLog.map((log, idx) => (
                      <div
                        key={idx}
                        className={
                          log.includes("Computed")
                            ? "text-[#F7DF1E]"
                            : log.includes("Error")
                              ? "text-rose-400"
                              : "text-zinc-400"
                        }
                      >
                        └ {log}
                      </div>
                    ))}
                    {rpnStepsLog.length === 0 && (
                      <div className="text-zinc-500 italic">
                        Waiting to process stack tokens...
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-[9.5px] font-mono text-zinc-500 mt-2">
                  Completed sequential stack calculations
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CHAPTER 17: Array Mutators */}
        {conceptId === "fcc-basic-algorithms" && (
          <div className="space-y-4 w-full">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 bg-white border border-zinc-200 rounded-xl p-3.5 shadow-3xs gap-y-2.5">
              <button
                onClick={() => setCartItems((p) => [...p, "Book 📖"])}
                className="bg-zinc-900 hover:bg-zinc-950 text-white px-2 py-1.5 rounded text-[10.5px] font-mono font-bold transition-all cursor-pointer select-none"
              >
                push("Book")
              </button>
              <button
                onClick={() => setCartItems((p) => p.slice(0, -1))}
                className="border border-zinc-200 hover:border-zinc-300 text-zinc-650 px-2 py-1.5 rounded text-[10.5px] font-mono font-bold transition-all cursor-pointer select-none bg-white"
              >
                pop()
              </button>
              <button
                onClick={() => setCartItems((p) => ["Key 🔑", ...p])}
                className="bg-zinc-900 hover:bg-zinc-950 text-white px-2 py-1.5 rounded text-[10.5px] font-mono font-bold transition-all cursor-pointer select-none"
              >
                unshift("Key")
              </button>
              <button
                onClick={() => setCartItems((p) => p.slice(1))}
                className="border border-zinc-200 hover:border-zinc-300 text-zinc-650 px-2 py-1.5 rounded text-[10.5px] font-mono font-bold transition-all cursor-pointer select-none bg-white"
              >
                shift()
              </button>
            </div>

            <div className="bg-white/80 p-5 rounded-xl border border-zinc-200 flex flex-col justify-between">
              <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase block mb-3">
                Live Warehouse items array
              </span>
              <div className="flex gap-2 flex-wrap min-h-[44px] items-center justify-center">
                <AnimatePresence>
                  {cartItems.map((item, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.5, opacity: 0 }}
                      className="px-3.5 py-1.8 bg-zinc-900 text-white font-mono text-xs rounded-xl border border-zinc-850 shadow-3xs font-extrabold flex items-center gap-1.5"
                    >
                      <span className="text-[9px] font-mono text-zinc-500 font-bold">
                        [{idx}]
                      </span>
                      {item}
                    </motion.span>
                  ))}
                  {cartItems.length === 0 && (
                    <span className="text-[10.5px] font-mono text-zinc-400 italic">
                      No warehouse inventory elements allocated
                    </span>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}

        {/* CHAPTER 18: Basic Function Scripting */}
        {conceptId === "basic-algorithm-scripting" && (
          <div className="space-y-4 w-full">
            <div className="bg-white p-4.5 rounded-xl border border-zinc-200 space-y-2 shadow-3xs">
              <span className="text-[10px] font-mono font-bold tracking-wider text-zinc-500 uppercase block mb-1">
                Standard raw sentences casing
              </span>
              <input
                type="text"
                value={titleCaseText}
                onChange={(e) => setTitleCaseText(e.target.value)}
                placeholder="built with modern modules and hooks"
                className="w-full text-xs px-2.5 py-1.5 bg-zinc-50 border border-zinc-200 rounded font-mono focus:border-zinc-550 focus:outline-hidden"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white/80 p-4.5 rounded-xl border border-zinc-200 flex flex-col justify-between">
                <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase">
                  Interactive Formatter code
                </span>
                <div className="mt-2 text-xs font-mono bg-zinc-950 p-3 rounded border border-zinc-800 text-[#abb2bf] select-all leading-relaxed">
                  <div>
                    const formatted = text.split(" ")
                    <br />
                    &nbsp;&nbsp;.map(w =&gt; w[0].toUpperCase() +
                    w.slice(1).toLowerCase())
                    <br />
                    &nbsp;&nbsp;.join(" ");
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 text-[#F7DF1E] p-4.5 rounded-xl flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase block mb-1">
                    Title Case Outcome result
                  </span>
                  <div className="my-3 text-center font-mono font-extrabold text-base bg-zinc-950 py-3.5 rounded border border-zinc-850 shadow truncate px-2 text-white">
                    {titleCaseText
                      ? titleCaseText
                          .split(" ")
                          .map((w) =>
                            w
                              ? w[0].toUpperCase() + w.slice(1).toLowerCase()
                              : "",
                          )
                          .join(" ")
                      : "Empty input"}
                  </div>
                </div>
                <span className="text-[9.5px] font-mono text-zinc-500 leading-none">
                  Delivering fully compliant formatting standards
                </span>
              </div>
            </div>
          </div>
        )}

        {/* CHAPTER 19: Intermediate overlapping intervals */}
        {conceptId === "intermediate-algorithm-scripting" && (
          <div className="space-y-4 w-full">
            <div className="bg-white p-4 rounded-xl border border-zinc-200 space-y-3 shadow-3xs">
              <span className="text-[10px] font-mono font-bold tracking-wider text-zinc-500 uppercase block">
                Interval Schedule Slider Controls (Hours 0-24)
              </span>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono font-bold">
                  <span className="text-blue-600">
                    Event Slot A: [{teamSlotA[0]}h - {teamSlotA[1]}h]
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="24"
                    value={teamSlotA[1]}
                    onChange={(e) =>
                      setTeamSlotA([teamSlotA[0], parseInt(e.target.value, 10)])
                    }
                    className="w-1/2 cursor-pointer h-1 bg-zinc-200 appearance-none rounded accent-blue-600"
                  />
                </div>

                <div className="flex justify-between items-center text-xs font-mono font-bold">
                  <span className="text-amber-600">
                    Event Slot B: [{teamSlotB[0]}h - {teamSlotB[1]}h]
                  </span>
                  <input
                    type="range"
                    min="0"
                    max="24"
                    value={teamSlotB[1]}
                    onChange={(e) =>
                      setTeamSlotB([teamSlotB[0], parseInt(e.target.value, 10)])
                    }
                    className="w-1/2 cursor-pointer h-1 bg-zinc-200 appearance-none rounded accent-amber-600"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white/80 p-5 rounded-xl border border-zinc-200 text-center relative h-[100px] flex items-center justify-center">
              <span className="absolute top-2.5 left-3 text-[9px] font-mono font-bold text-zinc-400 uppercase tracking-widest leading-none">
                Timeline collision intersection
              </span>

              {(() => {
                const overlapStart = Math.max(teamSlotA[0], teamSlotB[0]);
                const overlapEnd = Math.min(teamSlotA[1], teamSlotB[1]);
                const hasOverlap = overlapStart < overlapEnd;

                return hasOverlap ? (
                  <div className="bg-[#fcf8e3] p-4.5 rounded-xl border border-[#f3ebc0] inline-block animate-pulse">
                    <span className="text-xs font-mono font-extrabold text-amber-800">
                      ⚡ OVERLAPPING REGION DETECTED: [{overlapStart}h -{" "}
                      {overlapEnd}h]
                    </span>
                  </div>
                ) : (
                  <div className="bg-zinc-100 p-4.5 rounded-xl border border-zinc-200 text-zinc-400 font-mono text-xs font-extrabold">
                    ✅ TIMELINES DISJOINT: NO COLLISION
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </div>

      {/* FOOTER TIPS ACTIONABLE */}
      <div className="bg-zinc-900 text-white rounded-xl p-4 flex items-center gap-3 border border-zinc-850 shadow-md">
        <div className="h-8 w-8 rounded-lg bg-yellow-500/20 text-[#F7DF1E] flex items-center justify-center shrink-0 border border-yellow-500/40">
          <Layers className="h-4 w-4" />
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#F7DF1E]">
            Interactive Sandbox active
          </h4>
          <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
            All updates on this interactive deck are calculated locally on your
            private browser thread. Toggle indices, entries, or bounds to
            inspect data streams.
          </p>
        </div>
      </div>
    </div>
  );
}
