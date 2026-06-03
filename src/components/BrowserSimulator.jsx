import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Sparkles, RotateCcw, Play, Check, AlertCircle, RefreshCw,
  Terminal, Globe, BookOpen, Layers, Sliders, Cpu, HelpCircle,
  Plus, Trash2, ChevronDown, ChevronRight, Braces, Info,
  MapPin, Download, HardDrive, Zap, Compass, Folder, ArrowRight,
  Lock, Unlock, Settings, Eye, Server, CheckCircle2, AlertTriangle,
  ShoppingCart, User, Tag, Filter, Ticket, Users, CheckSquare, Package
} from "lucide-react";

// Deep object update helper
const setDeepValue = (obj, path, value) => {
  if (path.length === 0) return value;
  const copy = Array.isArray(obj) ? [...obj] : { ...obj };
  const [key, ...rest] = path;
  copy[key] = setDeepValue((copy[key] !== null && typeof copy[key] === "object") ? copy[key] : {}, rest, value);
  return copy;
};

// Deep object key deletion helper
const deleteDeepKey = (obj, path) => {
  if (path.length === 0) return obj;
  const copy = Array.isArray(obj) ? [...obj] : { ...obj };
  const [key, ...rest] = path;
  if (rest.length === 0) {
    if (Array.isArray(copy)) {
      copy.splice(Number(key), 1);
    } else {
      delete copy[key];
    }
  } else if (copy[key] !== null && typeof copy[key] === "object") {
    copy[key] = deleteDeepKey(copy[key], rest);
  }
  return copy;
};

// Deep object key rename helper
const renameDeepKey = (obj, path, oldKey, newKey) => {
  if (!newKey.trim() || oldKey === newKey) return obj;
  const copy = Array.isArray(obj) ? [...obj] : { ...obj };
  if (path.length === 0) {
    if (!Array.isArray(copy)) {
      copy[newKey] = copy[oldKey];
      delete copy[oldKey];
    }
    return copy;
  }
  const [key, ...rest] = path;
  if (copy[key] !== null && typeof copy[key] === "object") {
    copy[key] = renameDeepKey(copy[key], rest, oldKey, newKey);
  }
  return copy;
};

// Recursive node visual editor component
function InteractiveObjectNode({ label, val, path = [], onUpdate, parentIsArray = false }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [newKey, setNewKey] = useState("");
  const [newValType, setNewValType] = useState("string");
  const [isAdding, setIsAdding] = useState(false);

  const isObject = val !== null && typeof val === "object" && !Array.isArray(val);
  const isArray = Array.isArray(val);
  const isNull = val === null;

  const handleValueChange = (newV) => {
    onUpdate("update", path, newV);
  };

  const handleTypeChange = (type) => {
    let defaultVal;
    if (type === "string") defaultVal = "";
    else if (type === "number") defaultVal = 0;
    else if (type === "boolean") defaultVal = false;
    else if (type === "object") defaultVal = {};
    else if (type === "array") defaultVal = [];
    else if (type === "null") defaultVal = null;
    onUpdate("update", path, defaultVal);
  };

  const handleAddChild = () => {
    if (!newKey.trim()) return;
    let fallbackVal = "";
    if (newValType === "number") fallbackVal = 0;
    else if (newValType === "boolean") fallbackVal = false;
    else if (newValType === "object") fallbackVal = {};
    else if (newValType === "array") fallbackVal = [];
    else if (newValType === "null") fallbackVal = null;

    onUpdate("add", [...path, newKey.trim()], fallbackVal);
    setNewKey("");
    setIsAdding(false);
  };

  if (isObject || isArray) {
    const keys = isObject ? Object.keys(val) : Array.from({ length: val.length }, (_, i) => i);
    return (
      <div className="border-l border-zinc-250 pl-3.5 ml-1.5 my-1.5 font-sans relative">
        <div className="flex items-center justify-between py-1 group/node min-w-0">
          <div className="flex items-center gap-1.5 min-w-0">
            <button
              type="button"
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-0.5 text-zinc-400 hover:text-zinc-650 transition-colors shrink-0"
            >
              {isCollapsed ? (
                <ChevronRight className="h-3.5 w-3.5" />
              ) : (
                <ChevronDown className="h-3.5 w-3.5" />
              )}
            </button>
            <span className="font-mono text-xs font-semibold text-zinc-600 truncate">
              {label || (isArray ? "array" : "object")}
            </span>
            <span className="text-[9px] font-mono px-1.5 py-0.2 bg-zinc-100 text-zinc-450 border border-zinc-200 rounded-sm uppercase tracking-wider scale-90 shrink-0">
              {isArray ? `Array(${val.length})` : "Obj"}
            </span>
          </div>

          <div className="flex items-center gap-1 opacity-0 group-hover/node:opacity-100 focus-within:opacity-100 transition-opacity shrink-0">
            {isObject && (
              <button
                type="button"
                onClick={() => setIsAdding(!isAdding)}
                className="p-1 px-1.5 bg-zinc-100 hover:bg-zinc-200 text-zinc-650 rounded border border-zinc-200 text-[9.5px] font-mono flex items-center gap-1 cursor-pointer font-bold animate-fadeIn"
                title="Add property"
              >
                <Plus className="h-3 w-3" /> Add
              </button>
            )}
            <button
              type="button"
              onClick={() => onUpdate("delete", path)}
              className="p-1 text-rose-500 hover:bg-rose-50 hover:text-rose-600 rounded cursor-pointer border border-transparent hover:border-rose-100"
              title="Delete property"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          </div>
        </div>

        {isAdding && (
          <div className="p-2 bg-yellow-50/70 border border-yellow-250 rounded-lg space-y-1.5 my-1.5 max-w-xs shadow-4xs animate-fadeIn text-[11px]">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-zinc-800 font-mono">Key:</span>
              <input
                type="text"
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                placeholder="e.g. coordinates"
                className="text-xs p-1 px-2 border border-zinc-300 bg-white rounded-md w-full font-mono outline-hidden focus:border-yellow-500 text-zinc-800"
              />
            </div>
            <div className="flex items-center justify-between gap-1.5">
              <select
                value={newValType}
                onChange={(e) => setNewValType(e.target.value)}
                className="text-xs p-1 bg-white border border-zinc-250 rounded font-mono text-zinc-700"
              >
                <option value="string">String</option>
                <option value="number">Number</option>
                <option value="boolean">Boolean</option>
                <option value="object">Object {}</option>
                <option value="array">Array []</option>
                <option value="null">Null</option>
              </select>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="text-[9.5px] font-bold p-1 px-2 bg-zinc-150 text-zinc-650 rounded cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddChild}
                  className="text-[9.5px] font-bold p-1 px-2.5 bg-yellow-500 text-yellow-950 rounded cursor-pointer border border-yellow-600"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}

        {!isCollapsed && (
          <div className="space-y-0.5">
            {keys.map((k) => {
              const childVal = val[k];
              const childPath = [...path, k];
              return (
                <div key={k} className="relative group/prop flex flex-col">
                  <InteractiveObjectNode
                    label={
                      isObject ? (
                        <input
                          type="text"
                          defaultValue={k}
                          onBlur={(e) => {
                            const entered = e.target.value.trim();
                            if (entered && entered !== k) {
                              onUpdate("rename", childPath, entered);
                            }
                          }}
                          className="font-mono text-xs font-semibold text-zinc-700 bg-zinc-100 border border-zinc-200 hover:border-zinc-350 focus:bg-white focus:outline-hidden focus:ring-1 focus:ring-yellow-500 rounded px-1.5 py-0.5 transition-all text-left w-24 shrink-0 truncate font-extrabold focus:w-36 focus:relative focus:z-10"
                        />
                      ) : (
                        `[${k}]`
                      )
                    }
                    val={childVal}
                    path={childPath}
                    onUpdate={onUpdate}
                    parentIsArray={isArray}
                  />
                </div>
              );
            })}
            {keys.length === 0 && (
              <span className="text-zinc-400 font-mono text-[9px] italic block pl-4">
                empty {isArray ? "array" : "object"}
              </span>
            )}
          </div>
        )}
      </div>
    );
  }

  // Primitive value editor rendering
  return (
    <div className="flex items-center justify-between gap-3 py-1 group/item border-b border-zinc-100/50 last:border-0 pl-1.5 hover:bg-zinc-50/50 rounded-sm transition-colors">
      <div className="flex items-center gap-1 min-w-0 shrink-0">
        <span className="font-mono text-xs font-semibold text-zinc-500 flex items-center min-w-[60px]">
          {label || "prop"}:
        </span>
        <select
          value={isNull ? "null" : typeof val}
          onChange={(e) => handleTypeChange(e.target.value)}
          className="text-[9px] text-zinc-400 bg-transparent border-0 outline-hidden font-mono scale-90 cursor-pointer hover:text-zinc-650"
        >
          <option value="string">string</option>
          <option value="number">number</option>
          <option value="boolean">boolean</option>
          <option value="object">object</option>
          <option value="null">null</option>
        </select>
      </div>

      <div className="flex items-center gap-1.5 shrink min-w-0">
        {val === null ? (
          <span className="text-zinc-400 font-mono text-[10px] font-bold bg-zinc-50 border border-zinc-200 px-1.5 py-0.2 rounded select-none">
            null
          </span>
        ) : typeof val === "boolean" ? (
          <input
            type="checkbox"
            checked={val}
            onChange={(e) => handleValueChange(e.target.checked)}
            className="h-4.5 w-4.5 text-zinc-900 border-zinc-300 rounded cursor-pointer shrink-0"
          />
        ) : typeof val === "number" ? (
          <input
            type="number"
            value={val}
            onChange={(e) => handleValueChange(Number(e.target.value) || 0)}
            className="w-16 font-mono text-xs p-0.5 border border-zinc-200 bg-white rounded text-right font-black focus:border-yellow-500 focus:outline-hidden text-zinc-800"
          />
        ) : (
          <input
            type="text"
            value={val}
            onChange={(e) => handleValueChange(e.target.value)}
            className="w-24 sm:w-36 font-mono text-[11px] p-0.5 border border-zinc-200 bg-white rounded text-left text-zinc-805 font-medium focus:outline-hidden focus:border-yellow-500 truncate"
          />
        )}

        <button
          type="button"
          onClick={() => onUpdate("delete", path)}
          className="p-1 text-zinc-400 hover:text-rose-500 hover:bg-rose-50 rounded cursor-pointer opacity-0 group-hover/item:opacity-100 focus-within:opacity-100 transition-opacity"
          title="Delete property"
        >
          <Trash2 className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}

// Parent controller to offer live representation, Visual mode, and JSON source code mode
function ObjectEditorParent({ name, value, onChange }) {
  const [mode, setMode] = useState("form"); // "form" | "json"
  const [jsonError, setJsonError] = useState(null);
  const [rawJson, setRawJson] = useState("");

  useEffect(() => {
    setRawJson(JSON.stringify(value, null, 2));
  }, [value]);

  const handleUpdate = (action, path, payload) => {
    let updated;
    if (action === "update") {
      updated = setDeepValue(value, path, payload);
    } else if (action === "delete") {
      updated = deleteDeepKey(value, path);
    } else if (action === "add") {
      updated = setDeepValue(value, path, payload);
    } else if (action === "rename") {
      const parentPath = path.slice(0, -1);
      const oldKey = path[path.length - 1];
      updated = renameDeepKey(value, parentPath, oldKey, payload);
    }
    onChange(updated);
  };

  const handleJsonChange = (valStr) => {
    setRawJson(valStr);
    try {
      const parsed = JSON.parse(valStr);
      onChange(parsed);
      setJsonError(null);
    } catch (err) {
      setJsonError(err.message);
    }
  };

  return (
    <div className="bg-white border border-zinc-200 rounded-xl p-3 space-y-2.5 shadow-4xs text-left w-full select-text max-w-sm sm:max-w-md mx-auto">
      <div className="flex items-center justify-between border-b border-zinc-150 pb-2">
        <div className="flex items-center gap-1.5">
          <Braces className="h-4 w-4 text-[#a38b00] shrink-0" />
          <span className="font-mono text-xs font-black text-zinc-855 uppercase tracking-tight">
            Object: <span className="text-[#a38b00] lowercase font-bold font-mono">{name}</span>
          </span>
        </div>
        <div className="flex rounded-md p-0.5 bg-zinc-100 border border-zinc-200 scale-90">
          <button
            type="button"
            onClick={() => setMode("form")}
            className={`px-2 py-0.8 text-[9px] font-mono leading-none tracking-tight font-extrabold rounded cursor-pointer transition-all ${mode === "form" ? "bg-white text-zinc-900 border border-zinc-200 shadow-4xs font-black" : "text-zinc-500 hover:text-zinc-805"
              }`}
          >
            Visual Form
          </button>
          <button
            type="button"
            onClick={() => setMode("json")}
            className={`px-2 py-0.8 text-[9px] font-mono leading-none tracking-tight font-extrabold rounded cursor-pointer transition-all ${mode === "json" ? "bg-white text-zinc-900 border border-zinc-200 shadow-4xs font-black" : "text-zinc-500 hover:text-zinc-855"
              }`}
          >
            Raw JSON
          </button>
        </div>
      </div>

      {mode === "form" ? (
        <div className="py-1">
          <InteractiveObjectNode
            label={name}
            val={value}
            path={[]}
            onUpdate={handleUpdate}
          />
          <div className="mt-3 bg-zinc-50 p-2 border border-zinc-150 rounded-lg text-[10px] text-zinc-450 font-sans flex items-center gap-1.5">
            <Info className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
            <span className="leading-tight">Rename keys inline. Dynamic types sync live to your active return solution.</span>
          </div>
        </div>
      ) : (
        <div className="space-y-1.5">
          <textarea
            value={rawJson}
            onChange={(e) => handleJsonChange(e.target.value)}
            className="w-full h-32 font-mono text-[11px] p-2 bg-zinc-950 text-[#F7DF1E] border border-zinc-800 rounded-lg focus:outline-hidden focus:border-yellow-500 leading-relaxed"
            spellCheck="false"
          />
          {jsonError && (
            <div className="p-1 px-2.5 bg-rose-50 border border-rose-250 rounded text-[9.5px] font-mono text-rose-600 flex items-center gap-1.5">
              <AlertCircle className="h-3.5 w-3.5 text-rose-500 shrink-0" />
              <span>Format: Invalid JSON syntax</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ==========================================
// BESPOKE REAL-WORLD MILESTONE APPLICATIONS
// ==========================================

function DeliveryCoordinatorApp({ inputs, result, handleInputChange }) {
  const [profileExists, setProfileExists] = useState(true);
  const [addressExists, setAddressExists] = useState(true);
  const [coordsValue, setCoordsValue] = useState("40.71, -74.00");

  useEffect(() => {
    const updatedUser = {};
    if (profileExists) {
      updatedUser.profile = {};
      if (addressExists) {
        updatedUser.profile.address = {};
        if (coordsValue !== null && coordsValue !== undefined) {
          updatedUser.profile.address.coordinates = coordsValue;
        }
      }
    }
    handleInputChange(0, updatedUser);
  }, [profileExists, addressExists, coordsValue]);

  const pathBlocked = typeof result !== "string" || result.includes("found") || result.includes("No");

  return (
    <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 max-w-md mx-auto text-left shadow-2xs font-sans w-full">
      <div className="flex items-center gap-1.5 text-yellow-600 mb-3">
        <Compass className="h-4.5 w-4.5 text-yellow-500 shrink-0" />
        <span className="text-[11px] font-mono font-black uppercase tracking-wider">🛰️ Global Logistics Router</span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between bg-white p-2 border border-zinc-200 rounded-lg shadow-4xs">
          <span className="text-xs font-semibold text-zinc-700">User Has Profile Node?</span>
          <input
            type="checkbox"
            checked={profileExists}
            onChange={(e) => setProfileExists(e.target.checked)}
            className="h-4.5 w-4.5 text-zinc-900 border-zinc-300 rounded cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between bg-white p-2 border border-zinc-200 rounded-lg shadow-4xs disabled:opacity-50">
          <span className={`text-xs font-semibold text-zinc-700 ${!profileExists ? "text-zinc-400" : ""}`}>Profile Contains Address?</span>
          <input
            type="checkbox"
            checked={addressExists}
            disabled={!profileExists}
            onChange={(e) => setAddressExists(e.target.checked)}
            className="h-4.5 w-4.5 text-zinc-900 border-zinc-300 rounded cursor-pointer disabled:opacity-50"
          />
        </div>

        <div className="space-y-1">
          <span className={`text-[10px] font-mono font-extrabold uppercase tracking-widest block ${(!profileExists || !addressExists) ? "text-zinc-400" : "text-zinc-500"}`}>
            Destination Coordinates
          </span>
          <input
            type="text"
            value={coordsValue}
            disabled={!profileExists || !addressExists}
            onChange={(e) => setCoordsValue(e.target.value)}
            placeholder="e.g. 40.71, -74.00"
            className="w-full text-xs p-2 bg-white border border-zinc-250 rounded-lg font-mono focus:border-yellow-500 focus:outline-hidden text-zinc-800 disabled:bg-zinc-100 disabled:text-zinc-400"
          />
        </div>
      </div>

      <div className="border-t border-zinc-200 pt-3 mt-4">
        <div className="bg-zinc-950 text-white rounded-lg p-3 space-y-1.5 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:10px_10px]" />

          <div className="flex items-center justify-between relative z-10">
            <span className="text-[10px] font-mono text-zinc-400 uppercase font-black">Live Coordinate Output</span>
            <span className={`text-[9px] font-mono font-bold px-1.5 rounded ${pathBlocked ? "bg-rose-500/20 text-rose-300" : "bg-emerald-500/25 text-emerald-400"}`}>
              {pathBlocked ? "ROUTE BLOCKED" : "DELIVERY UNLOCKED"}
            </span>
          </div>

          <p className="text-xs font-mono text-yellow-300 font-bold select-all truncate relative z-10">
            {String(result ?? "Pending...")}
          </p>

          <div className="h-24 w-full bg-zinc-900 border border-zinc-800 rounded-md relative overflow-hidden flex items-center justify-center mt-2">
            <AnimatePresence mode="popLayout">
              {pathBlocked ? (
                <motion.div
                  key="blocked"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center p-2 z-10"
                >
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mx-auto mb-1 animate-pulse" />
                  <span className="text-[9.5px] font-mono text-zinc-400 block font-bold">Omitted or Blocked Coordinates</span>
                </motion.div>
              ) : (
                <motion.div
                  key="routed"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center z-10"
                >
                  <div className="relative inline-block">
                    <span className="absolute -inset-1.5 rounded-full bg-emerald-500/30 animate-ping" />
                    <MapPin className="h-5 w-5 text-emerald-400 mx-auto relative z-10" />
                  </div>
                  <div className="space-y-0.5 mt-1">
                    <span className="text-[10.5px] font-mono font-bold text-zinc-200 block">Package Synced ({coordsValue})</span>
                    <span className="text-[8.5px] font-sans text-zinc-400 block leading-tight">GPS routing vector aligned successfully to linear channel.</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function ButtonBuilderApp({ inputs, result, handleInputChange }) {
  const [typedLabel, setTypedLabel] = useState(inputs[0] || "  Buy Seat Now  ");
  const [selectedVariant, setSelectedVariant] = useState(inputs[1] || "primary");
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    handleInputChange(0, typedLabel);
    handleInputChange(1, selectedVariant);
  }, [typedLabel, selectedVariant]);

  const trimmed = typedLabel.trim() || "(Empty Label)";
  const variantUpper = selectedVariant.toUpperCase();

  let btnStyle = "bg-yellow-500 hover:bg-yellow-400 text-yellow-950 border-yellow-600 shadow-[0_4px_12px_rgba(234,179,8,0.2)]";
  if (variantUpper === "DANGER") btnStyle = "bg-rose-600 hover:bg-rose-500 text-white border-rose-700 shadow-[0_4px_12px_rgba(244,63,94,0.2)]";
  else if (variantUpper === "WARNING") btnStyle = "bg-amber-500 hover:bg-amber-400 text-amber-950 border-amber-600 shadow-[0_4px_12px_rgba(245,158,11,0.2)]";
  else if (variantUpper === "SUCCESS") btnStyle = "bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-700 shadow-[0_4px_12px_rgba(16,185,129,0.2)]";
  else if (variantUpper === "NEUTRAL") btnStyle = "bg-zinc-200 hover:bg-zinc-300 text-zinc-800 border-zinc-400";

  return (
    <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 max-w-md mx-auto text-left shadow-2xs font-sans w-full">
      <div className="flex items-center gap-1.5 text-zinc-700 mb-3">
        <Server className="h-4.5 w-4.5 text-yellow-500 shrink-0" />
        <span className="text-[11px] font-mono font-black uppercase tracking-wider">🛠️ HTML Design System Engine</span>
      </div>

      <div className="space-y-3.5">
        <div>
          <label className="text-[10px] font-mono font-bold text-zinc-550 uppercase block mb-1">Label text (Includes whitespace for .trim())</label>
          <input
            type="text"
            value={typedLabel}
            onChange={(e) => setTypedLabel(e.target.value)}
            className="text-xs p-2.5 bg-white border border-zinc-250 rounded-lg w-full font-mono focus:border-yellow-500 focus:outline-hidden text-zinc-800"
          />
        </div>

        <div>
          <label className="text-[10px] font-mono font-bold text-zinc-550 uppercase block mb-1">Class variant</label>
          <div className="grid grid-cols-4 gap-1.5">
            {["primary", "danger", "warning", "success"].map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setSelectedVariant(v)}
                className={`text-[9.5px] py-1.5 px-1 rounded-md font-mono border font-extrabold cursor-pointer transition-all uppercase ${selectedVariant === v
                    ? "bg-zinc-900 text-yellow-400 border-zinc-900"
                    : "bg-white text-zinc-650 hover:bg-zinc-100 border-zinc-200"
                  }`}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-200 pt-3 mt-4">
        <span className="text-[10px] font-mono font-bold text-zinc-500 block uppercase mb-1.5">Live DOM Render Preview</span>
        <div className="bg-white border border-zinc-200 rounded-xl p-5 flex flex-col items-center justify-center min-h-[100px] select-none gap-2 relative overflow-hidden bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:12px_12px]">
          {result && typeof result === "string" && result.startsWith("<button") ? (
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => setClickCount(c => c + 1)}
              className={`px-5 py-2 rounded-lg border text-xs font-semibold tracking-tight transition-all uppercase cursor-pointer ${btnStyle}`}
            >
              {trimmed}
            </motion.button>
          ) : (
            <span className="text-rose-500 font-mono text-[10px] text-center">Waiting for your functional HTML output string...</span>
          )}

          {clickCount > 0 && (
            <span className="text-[9px] font-mono text-emerald-600 block animate-fadeIn mt-1">
              ✨ Interaction Clicks: <span className="font-extrabold">{clickCount}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function PathCrawlerApp({ inputs, result, handleInputChange }) {
  const directoryConfig = {
    system: {
      gateway: {
        host: "spanner.production.gcp",
        port: 443,
        secure: true
      },
      monitoring: {
        healthy: true,
        metrics: "active"
      }
    }
  };

  const [activeKeys, setActiveKeys] = useState(inputs[1] || ["system", "gateway", "host"]);
  const [customKeyText, setCustomKeyText] = useState(activeKeys.join("."));

  useEffect(() => {
    handleInputChange(0, directoryConfig);
    handleInputChange(1, activeKeys);
  }, [activeKeys]);

  const handleChipClick = (keysList) => {
    setActiveKeys(keysList);
    setCustomKeyText(keysList.join("."));
  };

  const handleCustomSubmit = () => {
    const parsed = customKeyText.split(".").map(s => s.trim()).filter(Boolean);
    setActiveKeys(parsed);
  };

  const pathBlocked = typeof result === "string" && result.includes("BLOCKED");

  return (
    <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 max-w-md mx-auto text-left shadow-2xs font-sans w-full">
      <div className="flex items-center gap-1.5 text-zinc-700 mb-3">
        <Folder className="h-4.5 w-4.5 text-yellow-500 shrink-0" />
        <span className="text-[11px] font-mono font-black uppercase tracking-wider">📂 Directory Path Resolver</span>
      </div>

      <div className="space-y-3">
        <div className="space-y-1">
          <label className="text-[10px] font-mono font-bold text-zinc-450 block">Preset Database Pathways</label>
          <div className="flex flex-wrap gap-1">
            <button
              onClick={() => handleChipClick(["system", "gateway", "host"])}
              className={`text-[9px] font-mono py-1 px-2 rounded border font-bold cursor-pointer transition-colors ${JSON.stringify(activeKeys) === JSON.stringify(["system", "gateway", "host"]) ? "bg-zinc-900 text-yellow-400 border-zinc-900" : "bg-white border-zinc-200"}`}
            >
              Gateway Host
            </button>
            <button
              onClick={() => handleChipClick(["system", "gateway", "port"])}
              className={`text-[9px] font-mono py-1 px-2 rounded border font-bold cursor-pointer transition-colors ${JSON.stringify(activeKeys) === JSON.stringify(["system", "gateway", "port"]) ? "bg-zinc-900 text-yellow-400 border-zinc-900" : "bg-white border-zinc-200"}`}
            >
              Port Index
            </button>
            <button
              onClick={() => handleChipClick(["system", "monitoring", "healthy"])}
              className={`text-[9px] font-mono py-1 px-2 rounded border font-bold cursor-pointer transition-colors ${JSON.stringify(activeKeys) === JSON.stringify(["system", "monitoring", "healthy"]) ? "bg-zinc-900 text-yellow-400 border-zinc-900" : "bg-white border-zinc-200"}`}
            >
              Metrics Health
            </button>
            <button
              onClick={() => handleChipClick(["system", "firewall", "blocked"])}
              className={`text-[9px] font-mono py-1 px-2 rounded border font-bold text-rose-600 border-rose-200 cursor-pointer transition-colors ${JSON.stringify(activeKeys) === JSON.stringify(["system", "firewall", "blocked"]) ? "bg-rose-950 text-rose-300 border-rose-950" : "bg-white"}`}
            >
              Broken Branch
            </button>
          </div>
        </div>

        <div className="flex gap-1.5">
          <input
            type="text"
            value={customKeyText}
            onChange={(e) => setCustomKeyText(e.target.value)}
            placeholder="system.gateway.host"
            className="text-xs p-2 bg-white border border-zinc-250 rounded-lg flex-grow font-mono focus:outline-hidden"
          />
          <button
            onClick={handleCustomSubmit}
            className="px-3 py-1.5 text-xs font-bold font-mono text-zinc-950 bg-yellow-500 hover:bg-yellow-400 border border-yellow-600 rounded-lg cursor-pointer"
          >
            Trace
          </button>
        </div>
      </div>

      <div className="border-t border-zinc-200 pt-3 flex flex-col sm:flex-row gap-3 mt-3">
        <div className="p-2.5 bg-white border border-zinc-200 rounded-xl font-mono text-[9px] text-zinc-500 w-full sm:w-1/2 space-y-1 select-none">
          <span className="font-sans font-bold text-zinc-400 block uppercase text-[8px] tracking-wider mb-2">TARGET DATABASE YAML</span>
          <div className="space-y-0.5">
            <div className="text-zinc-800 font-bold">📂 configuration</div>
            <div className="pl-3">📂 <span className={`${activeKeys[0] === "system" ? "text-emerald-600 font-extrabold" : ""}`}>system</span></div>
            <div className="pl-6">├── 📂 <span className={`${activeKeys[0] === "system" && activeKeys[1] === "gateway" ? "text-emerald-600 font-extrabold" : ""}`}>gateway</span></div>
            <div className="pl-9 text-[8px]">
              ├── 📄 host: <span className={`${activeKeys[0] === "system" && activeKeys[1] === "gateway" && activeKeys[2] === "host" ? "text-emerald-500 font-bold bg-emerald-50 px-1 rounded" : ""}`}>"spanner.prod"</span>
            </div>
            <div className="pl-9 text-[8px]">
              └── 📄 port: <span className={`${activeKeys[0] === "system" && activeKeys[1] === "gateway" && activeKeys[2] === "port" ? "text-emerald-500 font-bold bg-emerald-50 px-1 rounded" : ""}`}>443</span>
            </div>
            <div className="pl-6">└── 📂 <span className={`${activeKeys[0] === "system" && activeKeys[1] === "monitoring" ? "text-emerald-600 font-extrabold" : ""}`}>monitoring</span></div>
          </div>
        </div>

        <div className="bg-zinc-950 text-white rounded-xl p-3 flex-grow flex flex-col justify-between min-h-[90px] border border-zinc-850">
          <div>
            <div className="text-[8.5px] font-mono uppercase tracking-wider text-zinc-500">Execution Output</div>
            <pre className="font-mono text-xs font-bold text-yellow-300 select-all truncate mt-1">
              {result !== undefined ? (
                typeof result === "object" ? JSON.stringify(result) : String(result)
              ) : "undefined"}
            </pre>
          </div>
          <div className="pt-2 border-t border-zinc-800 text-[10px] font-mono mt-1">
            {pathBlocked ? (
              <span className="text-rose-400 font-bold">PATH_BLOCKED</span>
            ) : (
              <span className="text-emerald-400 font-bold">OK_RESOLVED</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function GPUCoordFlatMapperApp({ inputs, result, handleInputChange }) {
  const [selectedWidth, setSelectedWidth] = useState(inputs[1] || 8);
  const [activeCell, setActiveCell] = useState({ r: 1, c: 2 });

  useEffect(() => {
    handleInputChange(0, [activeCell]);
    handleInputChange(1, selectedWidth);
  }, [activeCell, selectedWidth]);

  const calculatedOffset = Array.isArray(result) ? result[0] : (typeof result === "number" ? result : null);

  return (
    <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 max-w-md mx-auto text-left shadow-2xs font-sans w-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5 text-zinc-700">
          <Cpu className="h-4.5 w-4.5 text-yellow-500 shrink-0" />
          <span className="text-[11px] font-mono font-black uppercase tracking-wider">💾 GPU VRAM Framebuffer</span>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          <span className="text-[9px] font-mono font-bold text-zinc-500 uppercase">Width:</span>
          <select
            value={selectedWidth}
            onChange={(e) => setSelectedWidth(Number(e.target.value))}
            className="text-[10px] font-mono bg-white border border-zinc-350 rounded p-0.5 font-bold"
          >
            <option value={4}>4 col</option>
            <option value={6}>6 col</option>
            <option value={8}>8 col</option>
            <option value={10}>10 col</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-1">
          <span className="text-[9px] uppercase font-mono tracking-widest text-zinc-450 font-bold block">1. Toggle Grid Pixel Coordinates</span>
          <div
            style={{ gridTemplateColumns: `repeat(${selectedWidth}, minmax(0, 1fr))` }}
            className="grid gap-1 bg-zinc-200 p-2 rounded-xl"
          >
            {Array.from({ length: 4 }).map((_, r) => (
              Array.from({ length: selectedWidth }).map((_, c) => {
                const isActive = activeCell.r === r && activeCell.c === c;
                return (
                  <button
                    key={`${r}-${c}`}
                    type="button"
                    onClick={() => setActiveCell({ r, c })}
                    className={`h-6 min-w-[12px] rounded transition-all cursor-pointer font-mono text-[8px] text-center font-semibold flex items-center justify-center border ${isActive
                        ? "bg-zinc-900 border-yellow-500 text-yellow-400 font-extrabold"
                        : "bg-white hover:bg-zinc-50 text-zinc-400 border-zinc-250"
                      }`}
                  >
                    {r},{c}
                  </button>
                );
              })
            ))}
          </div>
        </div>

        <div className="bg-zinc-950 text-white rounded-xl p-3 border border-zinc-800 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-[8.5px] font-mono text-zinc-550 uppercase tracking-wider block">Flat index (Formula: row * width + col)</span>
            <span className="text-[10.5px] text-zinc-300">Evaluating: <span className="font-mono text-zinc-400">{activeCell.r} * {selectedWidth} + {activeCell.c}</span></span>
          </div>
          <span className="font-mono text-xs bg-zinc-900 px-2 py-1 rounded border border-zinc-850 text-yellow-400 font-black">
            Index: {calculatedOffset !== null && calculatedOffset !== undefined ? calculatedOffset : "No output"}
          </span>
        </div>

        <div className="space-y-1">
          <span className="text-[9px] uppercase font-mono tracking-widest text-[#a38b05] font-black block">2. Hardware Dynamic Tape Buffer Register</span>
          <div className="flex items-center bg-zinc-900 p-2 border border-zinc-850 rounded-xl overflow-x-auto gap-1">
            {Array.from({ length: 4 * selectedWidth }).map((_, idx) => {
              const matchesCalculated = idx === calculatedOffset;
              return (
                <div
                  key={idx}
                  className={`h-8 w-8 min-w-[32px] rounded border transition-all text-center flex flex-col justify-center select-none font-mono text-[9px] ${matchesCalculated
                      ? "bg-yellow-500 border-yellow-600 text-yellow-950 font-black scale-102 shadow-4xs ring-1 ring-yellow-400 animate-pulse"
                      : "bg-zinc-950 border-zinc-850 text-zinc-650"
                    }`}
                >
                  <span className="text-[7px] text-zinc-550 font-semibold block leading-none">0x{idx.toString(16).toUpperCase()}</span>
                  <span className="font-semibold">{idx}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function RadarElevationApp({ inputs, result, handleInputChange }) {
  const [elevations, setElevations] = useState(inputs[0] || [3, 1, 4, 2, 5]);

  useEffect(() => {
    handleInputChange(0, elevations);
  }, [elevations]);

  const handleElevationChange = (idx, val) => {
    const updated = [...elevations];
    updated[idx] = Math.max(0, Math.min(10, val));
    setElevations(updated);
  };

  const peaksList = Array.isArray(result) ? result : [];

  return (
    <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 max-w-md mx-auto text-left shadow-2xs font-sans w-full">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5 text-zinc-700">
          <Zap className="h-4.5 w-4.5 text-yellow-500 shrink-0" />
          <span className="text-[11px] font-mono font-black uppercase tracking-wider">⛰️ Flight Monotonic Peak Radar</span>
        </div>
        <button
          onClick={() => setElevations([3, 1, 4, 2, 5])}
          className="text-[9.5px] font-mono uppercase tracking-tight py-1 px-2.5 hover:bg-zinc-200 rounded-md bg-white border border-zinc-300 font-extrabold cursor-pointer transition-colors"
        >
          reset
        </button>
      </div>

      <div className="space-y-3.5">
        <div className="bg-white border border-zinc-200 rounded-xl p-3 flex items-end justify-between min-h-[140px] gap-1.5 select-none relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:100%_12px]" />

          {elevations.map((h, idx) => {
            let isVerifiedPeak = true;
            for (let i = 0; i < idx; i++) {
              if (elevations[i] >= h) isVerifiedPeak = false;
            }

            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 relative z-10 w-full col-span-1">
                {isVerifiedPeak ? (
                  <span className="bg-yellow-500 border border-yellow-600 rounded text-[7.5px] font-bold px-1 text-yellow-950 font-mono tracking-tight animate-bounce">
                    🚩 PEAK
                  </span>
                ) : (
                  <span className="text-[7.5px] font-mono text-zinc-300">
                    valley
                  </span>
                )}

                <div className="relative w-full flex justify-center h-16 bg-zinc-50/20">
                  <div
                    style={{ height: `${h * 10}%` }}
                    className={`w-3/4 rounded-t transition-all border ${isVerifiedPeak
                        ? "bg-gradient-to-t from-yellow-500 via-amber-400 to-amber-300 border-amber-500 shadow-[0_0_8px_rgba(234,179,8,0.15)]"
                        : "bg-zinc-200 border-zinc-250 opacity-40"
                      }`}
                  />
                </div>

                <div className="flex flex-col items-center gap-0.5">
                  <span className="font-mono text-[10px] font-extrabold text-zinc-650">{h}</span>
                  <div className="flex gap-0.5">
                    <button
                      type="button"
                      onClick={() => handleElevationChange(idx, h - 1)}
                      className="w-3.5 h-3.5 bg-white border border-zinc-300 hover:bg-zinc-200 rounded cursor-pointer flex items-center justify-center font-bold text-[8px]"
                    >
                      -
                    </button>
                    <button
                      type="button"
                      onClick={() => handleElevationChange(idx, h + 1)}
                      className="w-3.5 h-3.5 bg-white border border-zinc-300 hover:bg-zinc-200 rounded cursor-pointer flex items-center justify-center font-bold text-[8px]"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-zinc-950 text-white rounded-xl p-3 border border-zinc-850 flex items-center justify-between">
          <div>
            <span className="text-[8.5px] font-mono text-zinc-500 uppercase tracking-wider block font-black">Filtered Peak landmarks</span>
            <span className="font-mono text-yellow-400 font-extrabold text-xs">
              [{peaksList.join(", ")}]
            </span>
          </div>
          <span className="text-emerald-450 font-mono text-[10px] font-bold">
            {Math.round((peaksList.length / elevations.length) * 100)}% peak visibility
          </span>
        </div>
      </div>
    </div>
  );
}

function DataArchiverApp({ inputs, result, handleInputChange }) {
  const [inputText, setInputText] = useState("AAAAABBBCC");

  useEffect(() => {
    handleInputChange(0, inputText.split(""));
  }, [inputText]);

  const compressedArray = Array.isArray(result) ? result : [];

  return (
    <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 max-w-md mx-auto text-left shadow-2xs font-sans w-full">
      <div className="flex items-center gap-1.5 text-zinc-700 mb-3">
        <HardDrive className="h-4.5 w-4.5 text-yellow-500 shrink-0" />
        <span className="text-[11px] font-mono font-black uppercase tracking-wider">⚡ Run-Length Data Compressor</span>
      </div>

      <div className="space-y-3 mb-3">
        <div className="space-y-1">
          <label className="text-[10px] font-mono font-bold text-zinc-450 block uppercase">Raw character inputs stream</label>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value.toUpperCase())}
            placeholder="Type sequences e.g. AAABBB"
            className="text-xs p-2.5 bg-white border border-zinc-250 w-full rounded-lg font-mono tracking-widest uppercase focus:outline-hidden font-bold"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="p-2.5 bg-white border border-zinc-200 rounded-xl text-center">
          <span className="text-[8px] font-mono text-zinc-400 uppercase block font-semibold">Raw Overlook</span>
          <div className="font-mono text-lg font-black text-zinc-800">{inputText.length} Bytes</div>
        </div>

        <div className="p-2.5 bg-zinc-950 border border-zinc-850 rounded-xl text-center text-white">
          <span className="text-[8px] font-mono text-zinc-500 uppercase block font-semibold">RLE Packet Size</span>
          <div className="font-mono text-lg font-black text-yellow-300">{compressedArray.length * 2} Bytes</div>
        </div>
      </div>

      {inputText.length > 0 && (
        <div className="bg-white border border-zinc-205 rounded-xl p-2.5 space-y-1 mb-3">
          <div className="flex justify-between text-[9px] font-mono font-bold text-zinc-500 uppercase">
            <span>SaaS Savings Ratio</span>
            <span className="text-emerald-600">{Math.max(0, Math.round(((inputText.length - compressedArray.length * 2) / inputText.length) * 100))}% Economy Ratio</span>
          </div>
          <div className="w-full bg-zinc-100 rounded-full h-1.5 overflow-hidden">
            <div
              style={{ width: `${Math.max(4, Math.min(100, Math.round(((inputText.length - compressedArray.length * 2) / inputText.length) * 100)))}%` }}
              className="bg-emerald-500 h-full rounded-full transition-all"
            />
          </div>
        </div>
      )}

      <div className="border-t border-zinc-200 pt-3">
        <span className="text-[9px] font-mono font-black text-zinc-450 block uppercase mb-1">Live Archive Packet Map</span>
        <div className="flex flex-wrap gap-1 p-1.5 bg-zinc-900 border border-zinc-850 rounded-lg min-h-[36px] items-center">
          {compressedArray.map((tuple, idx) => {
            if (!Array.isArray(tuple)) return null;
            return (
              <div
                key={idx}
                className="bg-zinc-950 border border-zinc-800 text-yellow-405 rounded-md p-1 font-mono text-[9px] flex items-center gap-1 border-dashed"
              >
                <span className="bg-yellow-500 text-yellow-950 px-1 rounded font-black text-[8.5px]">{tuple[0]}</span>
                <span className="text-zinc-500">x</span>
                <span className="text-white font-extrabold">{tuple[1]}</span>
              </div>
            );
          })}
          {compressedArray.length === 0 && (
            <span className="text-zinc-600 font-mono text-[9px] italic pl-1">Empty registry...</span>
          )}
        </div>
      </div>
    </div>
  );
}

function UserProfileApp({ inputs, result, error, handleInputChange, activeExercise }) {
  const [userName, setUserName] = useState("Charlie");
  const [userBirthYear, setUserBirthYear] = useState(1996);
  const [userPlan, setUserPlan] = useState("premium");
  const [userAddress, setUserAddress] = useState(true);
  const [userCoords, setUserCoords] = useState("40.71, -74.00");

  useEffect(() => {
    const activeObj = {
      name: userName,
      birthYear: Number(userBirthYear) || 1996,
      role: userPlan,
      isPremium: userPlan === "premium" || userPlan === "admin",
      profile: {
        address: userAddress ? {
          city: "New York",
          coordinates: userCoords,
          postalCode: "10001"
        } : null
      }
    };

    if (activeExercise.functionName === "extractAges") {
      handleInputChange(0, [activeObj]);
    } else {
      handleInputChange(0, activeObj);
    }
  }, [userName, userBirthYear, userPlan, userAddress, userCoords, activeExercise]);

  const outputValue = typeof result === "object" ? JSON.stringify(result) : String(result);

  return (
    <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 max-w-md mx-auto text-left shadow-2xs font-sans w-full">
      <div className="flex items-center justify-between mb-3 border-b border-zinc-150 pb-1.5">
        <div className="flex items-center gap-1.5 text-zinc-700">
          <User className="h-4 w-4 text-yellow-500 shrink-0" />
          <span className="text-[11px] font-mono font-black uppercase tracking-wider">👤 SaaS Profile Manager</span>
        </div>
        <span className="text-[8.5px] font-mono text-zinc-455 uppercase font-black">Object Logic</span>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-0.5">
            <label className="text-[9px] font-mono font-bold text-zinc-500 uppercase">Username name</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="text-xs p-1.5 px-2 bg-white border border-zinc-250 w-full rounded-lg font-sans focus:outline-hidden text-zinc-800 font-bold"
            />
          </div>
          <div className="space-y-0.5">
            <label className="text-[9px] font-mono font-bold text-zinc-500 uppercase">Birth year</label>
            <input
              type="number"
              value={userBirthYear}
              onChange={(e) => setUserBirthYear(Number(e.target.value) || 0)}
              className="text-xs p-1.5 px-2 bg-white border border-zinc-250 w-full rounded-lg font-mono focus:outline-hidden text-zinc-800 font-bold"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-0.5">
            <label className="text-[9px] font-mono font-bold text-zinc-500 uppercase">Account tier role</label>
            <select
              value={userPlan}
              onChange={(e) => setUserPlan(e.target.value)}
              className="text-xs p-1.5 bg-white border border-zinc-250 w-full rounded-lg font-sans focus:outline-hidden font-bold"
            >
              <option value="premium">Premium Pro</option>
              <option value="admin">Administrator Staff</option>
              <option value="guest">Free Guest Tier</option>
            </select>
          </div>
          <div className="space-y-1 justify-center flex flex-col pt-2.5">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="hasAddressInput"
                checked={userAddress}
                onChange={(e) => setUserAddress(e.target.checked)}
                className="h-4 w-4 text-zinc-900 border-zinc-350 rounded cursor-pointer"
              />
              <label htmlFor="hasAddressInput" className="text-[10px] font-sans font-bold text-zinc-650 cursor-pointer select-none">Has Address?</label>
            </div>
          </div>
        </div>

        {userAddress && (
          <div className="space-y-0.5">
            <label className="text-[9px] font-mono font-bold text-zinc-505 uppercase">GPS Coordinates</label>
            <input
              type="text"
              value={userCoords}
              onChange={(e) => setUserCoords(e.target.value)}
              className="text-xs p-1.5 px-2 bg-white border border-zinc-250 w-full rounded-lg font-mono focus:outline-hidden text-zinc-850 font-semibold"
            />
          </div>
        )}

        <div className="border-t border-zinc-200 pt-3 mt-2">
          <span className="text-[9px] font-mono font-bold text-zinc-450 block uppercase mb-2">Live Member ID Card rendering</span>

          <div className="relative bg-zinc-90 w-full rounded-2xl p-4 overflow-hidden border border-zinc-805 shadow-md bg-zinc-950">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-yellow-400 via-[#F7DF1E] to-amber-500" />
            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-[#F7DF1E]/5 rounded-full blur-xl pointer-events-none" />

            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1">
                <span className={`text-[8.5px] font-mono font-bold tracking-widest px-2 py-0.5 rounded-full ${userPlan === "premium" || userPlan === "admin" ? "bg-yellow-500/20 text-yellow-400" : "bg-zinc-800 text-zinc-400"}`}>
                  {userPlan.toUpperCase()} MEMBER
                </span>
                <h4 className="text-sm font-black font-sans text-zinc-100">{userName || "Anonymous Guest"}</h4>
                <p className="text-[10px] font-mono text-zinc-400">Born: {userBirthYear} • Age relative to 2026: <strong className="text-zinc-200 font-extrabold">{2026 - userBirthYear}</strong></p>
                {userAddress && (
                  <p className="text-[9px] text-[#F7DF1E] font-mono mt-1 opacity-90 flex items-center gap-1">
                    <MapPin className="h-2.5 w-2.5 shrink-0 text-yellow-400" /> Coords: {userCoords || "None"}
                  </p>
                )}
              </div>

              <div className="text-right">
                <span className="text-[7.5px] font-mono text-zinc-505 block uppercase font-bold">Return payload</span>
                <div className="font-mono text-[10px] text-green-400 font-bold bg-zinc-90 w-28 border border-zinc-800 p-1 px-2.5 rounded-lg mt-1 max-w-[130px] truncate" title={outputValue}>
                  {result !== undefined && result !== null ? outputValue : "undefined"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CartBudgetApp({ inputs, result, error, handleInputChange, activeExercise }) {
  const [items, setItems] = useState([
    { name: "💻 Developer Laptop", price: 1200, qty: 1 },
    { name: "🖱️ Ergonomic Mouse", price: 80, qty: 2 },
    { name: "🎧 ANC Headphones", price: 250, qty: 1 }
  ]);
  const [couponCode, setCouponCode] = useState("SAVE10");

  useEffect(() => {
    if (activeExercise.functionName === "scaleByIndex" || activeExercise.functionName === "keepPositives" || activeExercise.functionName === "peakNormalize") {
      const flatList = items.map(i => i.price * i.qty).filter(Boolean);
      handleInputChange(0, flatList);
    } else if (activeExercise.id === "reduce-run-length") {
      const charStr = items.map(i => i.name.charAt(2).toUpperCase()).join("");
      handleInputChange(0, charStr.split(""));
    } else {
      handleInputChange(0, items);
      handleInputChange(1, couponCode);
    }
  }, [items, couponCode, activeExercise]);

  const handleQtyChange = (idx, step) => {
    const updated = [...items];
    updated[idx].qty = Math.max(0, updated[idx].qty + step);
    setItems(updated);
  };

  const calculatedOutput = typeof result === "object" ? JSON.stringify(result) : String(result ?? "0");

  return (
    <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 max-w-md mx-auto text-left shadow-2xs font-sans w-full">
      <div className="flex items-center justify-between mb-3 border-b border-zinc-150 pb-1.5">
        <div className="flex items-center gap-1.5 text-zinc-700">
          <ShoppingCart className="h-4 w-4 text-yellow-500 shrink-0" />
          <span className="text-[11px] font-mono font-black uppercase tracking-wider">🛒 Live Commerce checkout Register</span>
        </div>
        <span className="text-[8.5px] font-mono text-zinc-455 uppercase font-black">Reduce / Closures</span>
      </div>

      <div className="space-y-3">
        <span className="text-[9px] uppercase font-mono tracking-widest text-[#a38b00] font-bold block">1. Cart Inventory list & counts</span>
        <div className="space-y-1.5">
          {items.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between bg-white p-2 border border-zinc-200 rounded-xl shadow-4xs">
              <div className="space-y-0.5">
                <span className="text-xs font-bold text-zinc-850 block leading-tight">{item.name}</span>
                <span className="text-[9.5px] font-mono text-zinc-450 block">Price: ${item.price} each</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-zinc-550 font-bold block">${item.price * item.qty}</span>
                <div className="flex items-center border border-zinc-200 rounded-lg overflow-hidden shrink-0 select-none bg-zinc-50">
                  <button
                    type="button"
                    onClick={() => handleQtyChange(idx, -1)}
                    className="w-5 h-5 font-bold text-xs hover:bg-zinc-200 flex items-center justify-center cursor-pointer text-zinc-650"
                  >
                    -
                  </button>
                  <span className="w-6 text-center text-[10.5px] font-mono font-black text-zinc-805">{item.qty}</span>
                  <button
                    type="button"
                    onClick={() => handleQtyChange(idx, 1)}
                    className="w-5 h-5 font-bold text-xs hover:bg-zinc-200 flex items-center justify-center cursor-pointer text-zinc-650"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-dashed border-zinc-250 pt-3 mt-3">
          <div className="bg-white border border-zinc-200 border-dashed rounded-xl p-3 text-zinc-800 font-mono space-y-1.5 text-xs relative overflow-hidden shadow-3xs">
            <div className="absolute top-0 inset-x-0 h-1 bg-zinc-205 border-b border-zinc-100" />

            <div className="flex items-center justify-between text-[10px] font-sans font-bold text-zinc-455 uppercase tracking-wider pb-1.5 border-b border-zinc-100">
              <span>Checkout Receipt</span>
              <span>EST. 2026/06</span>
            </div>

            <div className="space-y-1 pt-1 text-[11px]">
              <div className="flex justify-between text-zinc-550 font-medium">
                <span>Total Items quantity:</span>
                <span>{items.reduce((acc, current) => acc + current.qty, 0)} units</span>
              </div>
              <div className="flex justify-between text-zinc-550 font-medium">
                <span>Active coupon code:</span>
                <span className="text-[#a38b00] font-bold">{couponCode}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-200 flex items-center justify-between">
              <span className="font-sans font-black text-xs text-zinc-900">Your JS solution Output:</span>
              <span className="text-xs bg-zinc-950 text-[#F7DF1E] px-2.5 py-1.5 rounded-lg font-black border border-zinc-800 text-right min-w-[90px] truncate" title={calculatedOutput}>
                {calculatedOutput}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CatalogSearchApp({ inputs, result, error, handleInputChange, activeExercise }) {
  const [catalog, setCatalog] = useState([
    "  JavaScript ",
    " es6-standards  ",
    " React-Framework ",
    " Tailwind CSS  "
  ]);
  const [customWord, setCustomWord] = useState("");

  useEffect(() => {
    handleInputChange(0, catalog);
  }, [catalog]);

  const handleAddWord = () => {
    const word = customWord;
    if (word.trim()) {
      setCatalog([...catalog, word]);
      setCustomWord("");
    }
  };

  const handleRemoveWord = (idx) => {
    setCatalog(catalog.filter((_, i) => i !== idx));
  };

  const outputList = Array.isArray(result) ? result : [];

  return (
    <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 max-w-md mx-auto text-left shadow-2xs font-sans w-full">
      <div className="flex items-center justify-between mb-3 border-b border-zinc-150 pb-1.5">
        <div className="flex items-center gap-1.5 text-zinc-700">
          <Tag className="h-4 w-4 text-yellow-500 shrink-0" />
          <span className="text-[11px] font-mono font-black uppercase tracking-wider">🏷️ Live Array catalog Engine</span>
        </div>
        <span className="text-[8.5px] font-mono text-zinc-455 uppercase font-black">Map / Search</span>
      </div>

      <div className="space-y-3">
        <div className="flex gap-2.5">
          <input
            type="text"
            value={customWord}
            onChange={(e) => setCustomWord(e.target.value)}
            placeholder="Type raw word e.g. '  TypeScript '"
            className="flex-grow text-xs p-2 bg-white border border-zinc-250 rounded-lg font-mono focus:outline-hidden text-zinc-800 font-bold"
            onKeyDown={(e) => e.key === "Enter" && handleAddWord()}
          />
          <button
            type="button"
            onClick={handleAddWord}
            className="px-3 py-1.5 text-xs font-bold font-mono text-zinc-955 bg-yellow-500 hover:bg-yellow-400 border border-yellow-600 rounded-lg cursor-pointer shrink-0"
          >
            Add Item
          </button>
        </div>

        <span className="text-[9px] uppercase font-mono tracking-widest text-zinc-455 font-bold block pt-1">Original Entries vs. Transformed return list</span>
        <div className="space-y-1.5 max-h-[140px] overflow-y-auto pr-1">
          {catalog.map((item, idx) => {
            const transformedVal = outputList[idx];
            return (
              <div key={idx} className="group flex items-center justify-between gap-3 bg-white p-2 border border-zinc-200 rounded-xl shadow-4xs">
                <div className="space-y-0.5 truncate pl-1">
                  <span className="font-mono text-[10px] text-zinc-400 block truncate">Orig: <code className="bg-zinc-100 p-0.5 px-1 rounded font-bold">"{item}"</code></span>
                  <span className="font-mono text-xs font-extrabold text-zinc-700 block truncate">
                    Parsed result:{" "}
                    <code className="text-zinc-950 bg-zinc-100 p-0.5 px-1.5 border border-zinc-255 rounded font-black">
                      {transformedVal !== undefined ? JSON.stringify(transformedVal) : "(Waiting...)"}
                    </code>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveWord(idx)}
                  className="p-1 text-zinc-405 hover:text-rose-500 hover:bg-rose-50 rounded transition-colors shrink-0 cursor-pointer"
                  title="Remove word"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            );
          })}
          {catalog.length === 0 && (
            <div className="text-center text-zinc-400 font-mono text-xs italic py-4 select-none">
              Catalog empty. Add some variables above!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function OutlierFilterApp({ inputs, result, error, handleInputChange, activeExercise }) {
  const [points, setPoints] = useState([12, -5, 32, 0, 18, -4]);

  useEffect(() => {
    handleInputChange(0, points);
  }, [points]);

  const handlePointChange = (idx, step) => {
    const updated = [...points];
    updated[idx] = updated[idx] + step;
    setPoints(updated);
  };

  const handleAddPoint = () => {
    setPoints([...points, Math.floor(Math.random() * 50) - 20]);
  };

  const handleResetPoints = () => {
    setPoints([12, -5, 32, 0, 18, -4]);
  };

  const filteredMatches = Array.isArray(result) ? result : [];

  return (
    <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 max-w-md mx-auto text-left shadow-2xs font-sans w-full">
      <div className="flex items-center justify-between mb-3 border-b border-zinc-150 pb-1.5">
        <div className="flex items-center gap-1.5 text-zinc-700 font-bold">
          <Filter className="h-4 w-4 text-yellow-500 shrink-0" />
          <span className="text-[11px] font-mono font-black uppercase tracking-wider">⚡ Interactive Array Filtering Terminal</span>
        </div>
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={handleAddPoint}
            className="text-[9px] font-mono uppercase tracking-tight py-1 px-2 hover:bg-zinc-150 rounded border border-zinc-300 font-extrabold cursor-pointer bg-white"
          >
            + Add
          </button>
          <button
            type="button"
            onClick={handleResetPoints}
            className="text-[9px] font-mono uppercase tracking-tight py-1 px-2 hover:bg-zinc-150 rounded border border-zinc-300 font-extrabold cursor-pointer bg-white"
          >
            reset
          </button>
        </div>
      </div>

      <div className="space-y-3.5">
        <span className="text-[9px] uppercase font-mono tracking-widest text-[#a38b00] font-bold block">Adjust metrics and observe live filter gates limits</span>

        <div className="bg-white border border-zinc-200 rounded-2xl p-4 flex items-end justify-between min-h-[140px] gap-2 md:gap-3 relative overflow-hidden bg-[radial-gradient(#f1f5f9_1px,transparent_1px)] bg-[size:10px_10px]">
          {points.map((val, idx) => {
            const isMatch = filteredMatches.includes(val);
            const displayPercentage = Math.max(5, Math.min(100, Math.abs(val) * 2.2));

            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end relative z-10">
                <div className="relative w-full flex justify-center h-20 items-end">
                  <div
                    style={{ height: `${displayPercentage}%` }}
                    className={`w-4/5 rounded-t transition-all border ${isMatch
                        ? (val >= 0
                          ? "bg-gradient-to-t from-emerald-500 to-emerald-400 border-zinc-300 shadow-[0_0_8px_rgba(16,185,129,0.15)]"
                          : "bg-gradient-to-t from-zinc-800 to-zinc-700 border-zinc-900")
                        : "bg-zinc-150 border-zinc-250 opacity-30"
                      }`}
                  />
                </div>

                <div className="flex flex-col items-center gap-0.5">
                  <span className={`font-mono text-[10px] font-black ${isMatch ? "text-emerald-700" : "text-zinc-400"}`}>{val}</span>
                  <div className="flex gap-0.5">
                    <button
                      type="button"
                      onClick={() => handlePointChange(idx, -5)}
                      className="w-3.5 h-3.5 bg-white border border-zinc-250 hover:bg-zinc-100 rounded cursor-pointer flex items-center justify-center font-bold text-[8px]"
                    >
                      -
                    </button>
                    <button
                      type="button"
                      onClick={() => handlePointChange(idx, 5)}
                      className="w-3.5 h-3.5 bg-white border border-zinc-250 hover:bg-zinc-100 rounded cursor-pointer flex items-center justify-center font-bold text-[8px]"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-[#18181b] text-white rounded-xl p-3 border border-zinc-850 flex items-center justify-between">
          <div>
            <span className="text-[8.5px] font-mono text-[#a1a1aa] uppercase tracking-wider block font-black">Passed Filtered list output</span>
            <span className="font-mono text-yellow-450 font-extrabold text-xs">
              [{filteredMatches.join(", ")}]
            </span>
          </div>
          <span className="text-emerald-455 font-mono text-[10px] font-bold bg-emerald-950/40 p-1 px-2 border border-emerald-800 rounded">
            {points.length > 0 ? Math.round((filteredMatches.length / points.length) * 100) : 0}% Yield Rate
          </span>
        </div>
      </div>
    </div>
  );
}

function TemplateCardApp({ inputs, result, error, handleInputChange, activeExercise }) {
  const [guestName, setGuestName] = useState("Charlie Archer");
  const [seatName, setSeatName] = useState("Gate 12B");
  const [roleLevel, setRoleLevel] = useState("VIP Platinum");

  useEffect(() => {
    handleInputChange(0, guestName);
    handleInputChange(1, roleLevel);
    handleInputChange(2, seatName);
  }, [guestName, seatName, roleLevel]);

  return (
    <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 max-w-md mx-auto text-left shadow-2xs font-sans w-full">
      <div className="flex items-center justify-between mb-3 border-b border-zinc-150 pb-1.5">
        <div className="flex items-center gap-1.5 text-zinc-700 font-bold">
          <Ticket className="h-4 w-4 text-yellow-500 shrink-0" />
          <span className="text-[11px] font-mono font-black uppercase tracking-wider">🎟️ Dynamic Ticket templates Engine</span>
        </div>
        <span className="text-[8.5px] font-mono text-[#71717a] uppercase font-semibold">String Template</span>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-0.5">
            <label className="text-[9px] font-mono font-bold text-zinc-500 uppercase">Guest client name</label>
            <input
              type="text"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="text-xs p-1.5 px-2 bg-white border border-zinc-250 w-full rounded-lg font-sans focus:outline-hidden text-zinc-855 font-bold"
            />
          </div>
          <div className="space-y-0.5">
            <label className="text-[9px] font-mono font-bold text-zinc-500 uppercase">Ticket pass designation</label>
            <input
              type="text"
              value={roleLevel}
              onChange={(e) => setRoleLevel(e.target.value)}
              className="text-xs p-1.5 px-2 bg-white border border-zinc-250 w-full rounded-lg font-sans focus:outline-hidden text-zinc-855 font-bold"
            />
          </div>
        </div>

        <div className="space-y-0.5">
          <label className="text-[9px] font-mono font-bold text-zinc-455 uppercase block">Boarding gate/Seat index</label>
          <input
            type="text"
            value={seatName}
            onChange={(e) => setSeatName(e.target.value)}
            className="text-xs p-1.5 px-2 bg-white border border-zinc-250 w-full rounded-lg font-mono focus:outline-hidden text-zinc-855 font-bold"
          />
        </div>

        <div className="border-t border-zinc-200 pt-3 mt-2">
          <span className="text-[9px] font-mono font-bold text-zinc-455 block uppercase mb-2">Physical boarding pass rendering</span>

          <div className="relative bg-zinc-955 border border-zinc-800 text-white p-5 rounded-2xl overflow-hidden shadow-md select-none bg-[radial-gradient(#27272a_1px,transparent_1px)] bg-[size:16px_16px]">
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center justify-between pb-3 border-b border-zinc-805">
              <div className="flex items-center gap-1.5 animate-pulse">
                <Sparkles className="h-4 w-4 text-[#F7DF1E]" />
                <span className="text-[10px] font-mono text-zinc-200 font-bold tracking-widest uppercase">STAR VIRTUAL FLIGHTWAYS</span>
              </div>
              <span className="text-[9px] font-mono text-[#F7DF1E] font-black">{seatName}</span>
            </div>

            <div className="py-4 space-y-2.5 text-center">
              <div className="text-center font-mono text-xs bg-zinc-900 border border-zinc-800 text-[#F7DF1E] p-3 rounded-xl min-h-[46px] flex items-center justify-center leading-relaxed">
                {result ? String(result) : <span className="text-zinc-650 italic">Waiting for string returned logic...</span>}
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-zinc-800 text-[8px] font-mono text-zinc-500 uppercase font-black">
              <span>BOARDING PASS TICKET</span>
              <span>EST. YEAR 2026</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SetRegistryApp({ inputs, result, error, handleInputChange, activeExercise }) {
  const [guestList, setGuestList] = useState(["John Doe", "Jane Smith", "John Doe", "Bob Vance", "Jane Smith"]);
  const [typedGuest, setTypedGuest] = useState("");

  useEffect(() => {
    handleInputChange(0, guestList);
  }, [guestList]);

  const handleInviteGuest = () => {
    const term = typedGuest.trim();
    if (term) {
      setGuestList([...guestList, term]);
      setTypedGuest("");
    }
  };

  const handleGuestClick = (name) => {
    setGuestList([...guestList, name]);
  };

  const handlePruneList = () => {
    setGuestList([]);
  };

  let uniqueResultsCount = 0;
  let finalKeysList = [];

  if (result) {
    if (result instanceof Set) {
      finalKeysList = Array.from(result);
      uniqueResultsCount = result.size;
    } else if (Array.isArray(result)) {
      finalKeysList = result;
      uniqueResultsCount = result.length;
    } else if (typeof result === "object") {
      finalKeysList = Object.keys(result);
      uniqueResultsCount = finalKeysList.length;
    }
  }

  const isDeduplicated = uniqueResultsCount < guestList.length;

  return (
    <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-4 max-w-md mx-auto text-left shadow-2xs font-sans w-full">
      <div className="flex items-center justify-between mb-3 border-b border-zinc-150 pb-1.5">
        <div className="flex items-center gap-1.5 text-zinc-700 font-bold">
          <Users className="h-4 w-4 text-yellow-500 shrink-0" />
          <span className="text-[11px] font-mono font-black uppercase tracking-wider">👥 Event Guest list & Dedup registry</span>
        </div>
        <button
          type="button"
          onClick={handlePruneList}
          className="text-[9px] font-mono uppercase tracking-tight py-1 px-2 hover:bg-rose-50 hover:text-rose-655 rounded border border-rose-200 font-extrabold cursor-pointer bg-white"
        >
          Clear
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex gap-1.5">
          <input
            type="text"
            value={typedGuest}
            onChange={(e) => setTypedGuest(e.target.value)}
            placeholder="Invite and add guests... e.g. 'John'"
            className="flex-grow text-xs p-1.5 px-2 bg-white border border-zinc-250 rounded-lg focus:outline-hidden font-bold"
            onKeyDown={(e) => e.key === "Enter" && handleInviteGuest()}
          />
          <button
            type="button"
            onClick={handleInviteGuest}
            className="px-3 py-1.5 text-xs font-bold font-mono text-zinc-955 bg-yellow-500 hover:bg-yellow-400 border border-yellow-600 rounded-lg cursor-pointer"
          >
            Invite
          </button>
        </div>

        <div className="flex items-center gap-1 overflow-x-auto py-1 select-none">
          <span className="text-[8.5px] font-mono text-zinc-400 uppercase font-black tracking-tight mr-1 shrink-0">Add duplicate:</span>
          {["John Doe", "Jane Smith", "Bob Vance"].map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => handleGuestClick(name)}
              className="text-[8.5px] font-sans border border-zinc-200 hover:bg-zinc-100 rounded p-1 px-2 cursor-pointer font-bold shrink-0 bg-white"
            >
              + {name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 border-t border-zinc-200 pt-3">
          <div className="space-y-1 w-full min-w-0">
            <span className="text-[8px] font-mono text-[#71717a] uppercase block font-bold leading-none">Original entries ({guestList.length})</span>
            <div className="bg-white border border-zinc-200 rounded-xl p-2 h-28 overflow-y-auto space-y-1">
              {guestList.map((g, idx) => (
                <div key={idx} className="font-mono text-[9.5px] p-1 bg-zinc-50 border border-zinc-150 rounded flex items-center justify-between gap-1 select-none font-bold">
                  <span className="truncate pr-1 text-zinc-650">{g}</span>
                  <span className="text-[7.5px] font-bold text-zinc-400">#{idx + 1}</span>
                </div>
              ))}
              {guestList.length === 0 && (
                <div className="text-zinc-300 italic text-[9px] font-mono text-center pt-8">Empty deck...</div>
              )}
            </div>
          </div>

          <div className="space-y-1 w-full min-w-0">
            <span className="text-[8px] font-mono text-[#71717a] uppercase block font-bold leading-none">Deduplicated list ({uniqueResultsCount})</span>
            <div className="bg-zinc-95 w-full rounded-xl p-2 h-28 overflow-y-auto space-y-1 bg-zinc-955 text-yellow-450 border border-zinc-800">
              {finalKeysList.map((gu, idx) => (
                <div key={idx} className="font-mono text-[9.5px] p-1 bg-zinc-900 border border-zinc-800 rounded flex items-center justify-between gap-1">
                  <span className="truncate font-black text-zinc-100">{gu}</span>
                  <span className="text-[7.5px] font-mono bg-yellow-500/10 px-1 rounded border border-yellow-500/10 text-yellow-550 font-bold animate-pulse">unique</span>
                </div>
              ))}
              {finalKeysList.length === 0 && (
                <div className="text-zinc-650 italic text-[9px] font-mono text-center pt-8">No returns...</div>
              )}
            </div>
          </div>
        </div>

        {isDeduplicated && (
          <div className="bg-emerald-50 border border-emerald-250 p-2 text-[10px] text-emerald-800 rounded-lg flex items-center gap-1.5 font-bold shadow-4xs animate-fade-in">
            <CheckSquare className="h-4 w-4 text-emerald-650 shrink-0" />
            <span>Success: Guests list deduplicated successfully!</span>
          </div>
        )}
      </div>
    </div>
  );
}

function SaaSConsoleApp({ activeExercise, inputs, result, error, handleInputChange, paramNames }) {
  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-5 shadow-xs font-sans w-full max-w-md mx-auto text-left relative overflow-hidden">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-zinc-100">
        <div className="flex items-center gap-2 text-zinc-900 font-bold">
          <Sliders className="h-4 w-4 text-zinc-600 shrink-0" />
          <span className="text-sm tracking-tight">Interactive Controls</span>
        </div>
        <span className="text-[10px] font-mono font-medium text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full select-none shrink-0 animate-pulse">
          Sandbox Live
        </span>
      </div>

      <div className="space-y-4">
        <div className="space-y-2.5">
          {paramNames.map((name, index) => {
            const currentVal = inputs[index];
            const isBool = typeof currentVal === "boolean";
            const isNum = typeof currentVal === "number";

            return (
              <div key={index} className="space-y-1 bg-zinc-50 border border-zinc-150 p-3 rounded-xl">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-mono font-bold text-zinc-600">
                    {name}
                  </label>
                  <span className="text-[9px] font-mono font-bold text-zinc-400 capitalize">
                    {isBool ? "boolean" : isNum ? "number" : "string"}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-4 mt-1">
                  {isBool ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={!!currentVal}
                        onChange={(e) => handleInputChange(index, e.target.checked)}
                        className="h-4.5 w-4.5 text-zinc-900 bg-white rounded-md cursor-pointer border-zinc-300 focus:ring-0 focus:outline-hidden"
                      />
                      <span className="text-xs font-mono text-zinc-600">{currentVal ? "true" : "false"}</span>
                    </div>
                  ) : isNum ? (
                    <div className="flex items-center gap-2 w-full justify-end">
                      <button
                        type="button"
                        onClick={() => handleInputChange(index, (Number(currentVal) || 0) - 1)}
                        className="w-7 h-7 bg-white hover:bg-zinc-100 border border-zinc-300 rounded-lg text-zinc-650 font-bold transition-all cursor-pointer flex items-center justify-center text-xs shadow-4xs"
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={currentVal ?? 0}
                        onChange={(e) => handleInputChange(index, parseInt(e.target.value, 10) || 0)}
                        className="text-center font-mono text-xs font-bold p-1 bg-white border border-zinc-300 w-16 rounded-lg focus:outline-hidden text-zinc-800"
                      />
                      <button
                        type="button"
                        onClick={() => handleInputChange(index, (Number(currentVal) || 0) + 1)}
                        className="w-7 h-7 bg-white hover:bg-zinc-100 border border-zinc-300 rounded-lg text-zinc-650 font-bold transition-all cursor-pointer flex items-center justify-center text-xs shadow-4xs"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <input
                      type="text"
                      value={typeof currentVal === "object" ? JSON.stringify(currentVal) : String(currentVal ?? "")}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val.trim().startsWith("{") || val.trim().startsWith("[")) {
                          try {
                            handleInputChange(index, JSON.parse(val));
                            return;
                          } catch (err) { }
                        }
                        handleInputChange(index, val);
                      }}
                      className="text-xs p-2 bg-white border border-zinc-305 rounded-lg w-full font-mono focus:outline-hidden text-[#18181b] focus:border-zinc-500 font-medium"
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="bg-zinc-950 text-white rounded-xl p-3.5 border border-zinc-850 space-y-2 font-mono text-xs">
          <div className="flex items-center justify-between text-[10px] text-zinc-450 font-sans border-b border-zinc-850 pb-1.5 font-bold uppercase tracking-wider select-none">
            <span>Result Output</span>
            <span className="text-emerald-400 font-mono font-bold bg-emerald-950/40 px-2 py-0.5 border border-emerald-900 rounded">SUCCESS</span>
          </div>
          <div className="space-y-1">
            <div className="text-[11px] text-zinc-400 font-sans leading-relaxed">
              Your function <code className="font-mono text-[#F7DF1E] text-xs">{activeExercise?.functionName}</code> returned:
            </div>
            <pre className="font-mono text-sm text-[#F7DF1E] font-black break-all py-1 select-all select-text overflow-x-auto">
              {error ? `Error: ${error}` : JSON.stringify(result, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// HUMAN INTERACTIVE OUTCOME PHRASE GENERATOR
// ==========================================
const getFittedMessage = (funcName, inputs, result) => {
  if (result === null || result === undefined) {
    if (funcName === "getDivisionRemainderBy2" || funcName === "evenOrOdd" || funcName === "isOdd") {
      return "Even or odd? .";
    }
    return "Check your implementation above to see the result.";
  }

  const roundedResult = typeof result === "number" ? Math.round(result * 100) / 100 : result;

  if (funcName === "getDivisionRemainderBy2" || funcName === "evenOrOdd" || funcName === "isOdd") {
    // Exact match for the "Division remainder" demo on learnjavascript.online
    const inputVal = Number(inputs[0]);
    if (isNaN(inputVal)) {
      return "Even or odd? .";
    }
    if (inputVal % 2 !== 0) {
      return "Even or odd? odd.";
    }
    return "Even or odd? even.";
  }

  // Fallbacks
  const isDefaultString = typeof result === "object" ? JSON.stringify(result) : String(roundedResult);

  switch (funcName) {
    case "multiplyByTen":
      return `Result of multiplying by 10 is ${isDefaultString}.`;
    case "sumTwo":
      return `The sum of ${inputs[0] ?? 0} and ${inputs[1] ?? 0} is ${isDefaultString}.`;
    case "extractPixels":
      return `Parsed pixel value is ${isDefaultString}.`;
    case "inspectType":
      return `The variable type is ${isDefaultString}.`;
    case "doubleValue":
      return `The doubled value is ${isDefaultString}.`;
    case "canVote":
      return `Allowed to vote? ${result === true ? "yes." : "no."}`;
    case "getWelcomeMessage":
      return `Greeting message: "${isDefaultString}"`;
    case "shoutString":
      return `Shouted text: "${isDefaultString}"`;
    case "formatPrice":
      return `Price string: "${isDefaultString}"`;
    case "getFallbackUser":
      return `Active identifier: "${isDefaultString}"`;
    case "getArrayLength":
      return `Total record count: ${isDefaultString}.`;
    case "getLastElement":
      return `Last element is "${isDefaultString}".`;
    default:
      if (typeof result === "boolean") {
        return `Satisfied? ${result ? "yes (true)." : "no (false)."}`;
      }
      return `Outcome of challenge task: ${isDefaultString}.`;
  }
};

// ==========================================
// BROWSER SIMULATOR WRAPPER COMPONENT
// ==========================================

export function BrowserSimulator({ activeExercise, activeConcept, currentCode, activeExerciseIndex = 0, solvedExercises = {} }) {
  const [inputs, setInputs] = useState([]);
  const [paramNames, setParamNames] = useState([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [lastEvaluatedCode, setLastEvaluatedCode] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const isSolved = activeExercise && solvedExercises && solvedExercises[activeExercise.id] === true;

  // Parse parameters and initialize their default values based on the active test case
  useEffect(() => {
    if (!activeExercise) return;

    // Get input parameters from the first test case
    const firstTest = activeExercise.testCases?.[0];
    const defaultInputs = Array.isArray(firstTest?.input) ? firstTest.input : [firstTest?.input];

    // Parse functional parameter names from codeTemplate
    const codeTemplate = activeExercise.codeTemplate || "";
    let names = [];
    const funcMatch = codeTemplate.match(/function\s+\w+\s*\(([^)]*)\)/);

    if (funcMatch) {
      names = funcMatch[1].split(",").map(s => s.trim()).filter(Boolean);
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
      const processedInputs = inputs.map(val => {
        // If it looks like a string representing an array/object, try to parse it
        if (typeof val === "string") {
          const trimmed = val.trim();
          if ((trimmed.startsWith("[") && trimmed.endsWith("]")) || (trimmed.startsWith("{") && trimmed.endsWith("}"))) {
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
      setError(err.message || "An unexpected runtime validation error occurred.");
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
    const defaultInputs = Array.isArray(firstTest?.input) ? firstTest.input : [firstTest?.input];
    setInputs(defaultInputs || []);
    setError(null);
    setTimeout(() => setIsRefreshing(false), 400);
  };

  return (
    <div className="flex-grow flex flex-col justify-between" id="browser-simulator-root">

      {/* Modern, custom gold-accented browser bar */}
      <div className="bg-zinc-100/90 h-11 rounded-t-xl flex items-center justify-between px-4 border border-zinc-200 border-b-0 border-t-2 border-t-[#F7DF1E] shrink-0 select-none">

        {/* Mock window controls */}
        <div className="flex items-center gap-1.5 focus-none">
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-300 block hover:bg-neutral-400 transition-colors" />
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-300 block hover:bg-neutral-400 transition-colors" />
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-300 block hover:bg-neutral-400 transition-colors" />
        </div>

        {/* Address Bar Simulation */}
        <div className="bg-white border border-zinc-200 text-zinc-500 font-mono text-[10px] py-1 px-8 rounded-md shadow-3xs max-w-xs w-full truncate text-center font-bold tracking-tight select-all">
          localhost:3000/sandbox
        </div>

        <div className="text-[10.5px] font-mono font-bold uppercase tracking-wider text-zinc-400 hidden sm:block">Live Window</div>
      </div>

      {/* Main viewport area - exact color matches Image 1 */}
      <div className="bg-[#fafafc] p-6 sm:p-8 flex-grow rounded-b-2xl border border-zinc-200 flex flex-col justify-between min-h-[360px] relative">

        <div className="space-y-6 flex-grow flex flex-col justify-start">
          {/* Big Title */}
          <div>
            <h3 className="text-3xl font-bold leading-tight text-zinc-900 font-sans tracking-tight">
              {activeExercise?.title?.replace(/[-_]+/g, " ") || "Browser Sandbox"}
            </h3>
          </div>

          {/* Interactive Case Selectors rendered as subtle tag pills */}
          {activeExercise?.testCases && activeExercise.testCases.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 py-1.5 text-[11px] text-zinc-505 font-sans select-none">
              <span className="font-semibold text-zinc-400 mr-1">Preset inputs:</span>
              {activeExercise.testCases.map((tc, tcIdx) => {
                const isCurrentMatch = JSON.stringify(inputs) === JSON.stringify(Array.isArray(tc.input) ? tc.input : [tc.input]);
                return (
                  <button
                    key={tcIdx}
                    type="button"
                    onClick={() => {
                      const defaultInputs = Array.isArray(tc.input) ? tc.input : [tc.input];
                      setInputs(defaultInputs);
                    }}
                    className={`px-3 py-1.5 rounded-sm border text-[11px] font-sans font-semibold transition-all cursor-pointer ${isCurrentMatch
                        ? "bg-[#F7DF1E] border-[#edd012] text-zinc-900 shadow-xs animate-none"
                        : "bg-white hover:bg-zinc-50 border-zinc-200 text-zinc-600"
                      }`}
                  >
                    {tc.description || `Case ${tcIdx + 1}`}
                  </button>
                );
              })}
            </div>
          )}

          {/* User Application Display Area */}
          <div className="space-y-5 flex-grow flex flex-col justify-start max-w-sm mt-1">

            {/* Custom interactive view for Number Division Remainder check / Odd Parity / any standard app */}
            <div className="space-y-4">
              {paramNames.map((name, index) => {
                const currentVal = inputs[index];
                const isBool = typeof currentVal === "boolean";
                const isNum = typeof currentVal === "number";
                const isObject = typeof currentVal === "object" && currentVal !== null;

                let labelText = `Enter ${name}`;
                if (activeExercise?.functionName === "isOdd" || activeExercise?.functionName === "getDivisionRemainderBy2" || activeExercise?.functionName === "evenOrOdd") {
                  labelText = "Enter number";
                } else if (activeExercise?.functionName === "multiplyByTen") {
                  labelText = "Enter x";
                } else if (activeExercise?.functionName === "sumTwo") {
                  labelText = index === 0 ? "Enter a" : "Enter b";
                } else if (name.toLowerCase() === "num" || name.toLowerCase() === "x") {
                  labelText = "Enter number";
                } else if (name.toLowerCase() === "str" || name.toLowerCase() === "text") {
                  labelText = "Enter text";
                }

                if (isObject) {
                  return (
                    <div key={index} className="py-1">
                      <ObjectEditorParent
                        name={name}
                        value={currentVal}
                        onChange={(updatedVal) => handleInputChange(index, updatedVal)}
                      />
                    </div>
                  );
                }

                return (
                  <div key={index} className="space-y-1.5 text-left animate-fadeIn">
                    <label className="block text-xs font-bold text-zinc-600 uppercase tracking-wider font-sans">
                      {labelText}
                    </label>
                    {isBool ? (
                      <div className="flex items-center gap-2.5 py-1">
                        <input
                          type="checkbox"
                          checked={!!currentVal}
                          onChange={(e) => handleInputChange(index, e.target.checked)}
                          className="h-5 w-5 text-zinc-900 focus:ring-[#F7DF1E]/30 rounded-md cursor-pointer border-zinc-350 bg-white accent-[#F7DF1E]"
                        />
                        <span className="text-sm font-sans text-zinc-650 font-medium">True / Activated</span>
                      </div>
                    ) : isNum ? (
                      <input
                        type="number"
                        value={inputs[index] ?? ""}
                        onChange={(e) => handleInputChange(index, parseInt(e.target.value, 10) || 0)}
                        className="bg-white border border-zinc-200 rounded-md py-2.5 px-3.5 text-sm w-full block focus:ring-2 focus:ring-[#F7DF1E]/20 focus:border-[#edd012] outline-none transition-all shadow-4xs font-sans text-zinc-850"
                        placeholder="Enter value"
                      />
                    ) : (
                      <input
                        type="text"
                        value={typeof currentVal === "object" ? JSON.stringify(currentVal) : String(currentVal ?? "")}
                        onChange={(e) => {
                          const val = e.target.value;
                          if (val.trim().startsWith("{") || val.trim().startsWith("[")) {
                            try {
                              handleInputChange(index, JSON.parse(val));
                              return;
                            } catch (err) { }
                          }
                          handleInputChange(index, val);
                        }}
                        className="bg-white border border-zinc-200 rounded-md py-2.5 px-3.5 text-sm w-full block focus:ring-2 focus:ring-[#F7DF1E]/20 focus:border-[#edd012] outline-none transition-all shadow-4xs font-sans text-zinc-850"
                        placeholder="Type text"
                      />
                    )}
                  </div>
                );
              })}

              {(!paramNames || paramNames.length === 0) && (
                <div className="text-sm text-zinc-500 italic py-1">
                  No adjustable inputs needed for this browser app.
                </div>
              )}
            </div>

            {/* Direct human outcome display block */}
            <div className="pt-3 animate-fadeIn">
              <p className="text-base text-zinc-850 font-sans leading-relaxed tracking-tight">
                {getFittedMessage(activeExercise?.functionName, inputs, result)}
              </p>
            </div>

            {/* Compilation/Runtime Exception indicator */}
            {error && (
              <div className="flex gap-2 p-3 bg-rose-50 border border-rose-150 rounded-xl text-left text-xs text-rose-700 font-sans leading-normal mt-2 select-text animate-shake">
                <AlertCircle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-rose-800">Browser Exception</span>
                  <p className="font-mono text-rose-600 mt-0.5">{error}</p>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
