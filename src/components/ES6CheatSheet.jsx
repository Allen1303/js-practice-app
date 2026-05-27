import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Sparkles,
  Copy,
  Check,
  Terminal,
  HelpCircle,
  Code,
  ListFilter,
  ArrowRight,
} from "lucide-react";
import { highlightJS } from "../utils/highlighter.js";

const CHEAT_SHEET_TOPICS = [
  {
    id: "arrow-functions",
    title: "Arrow Functions (=>)",
    description:
      "Write shorter, more elegant functions, with implicit returns for single-line expressions.",
    es5: `// Old Way (ES5)
var double = function(x) {
  return x * 2;
};

var greet = function(name) {
  return "Hello " + name;
};`,
    es6: `// Modern Way (ES6+)
const double = x => x * 2;

const greet = name => \`Hello \${name}\`;`,
    takeaway:
      "Arrow functions omit 'function' and 'return' descriptors. Singly-defined parameters don't require parentheses, and curly brackets are obsolete for single-expression statements.",
    relatedConceptId: "map-callbacks",
  },
  {
    id: "template-literals",
    title: "Template Literals (` `)",
    description:
      "Build premium strings without messy string concatenation, plus support for multi-line formatting.",
    es5: `// Old Way (ES5)
var name = "Alice";
var age = 30;
var greeting = "Hello, my name is " 
  + name + " and I am " 
  + age + " years old.";`,
    es6: `// Modern Way (ES6+)
const name = "Alice";
const age = 30;
const greeting = \`Hello, my name is \${name} and I am \${age} years old.\`;`,
    takeaway:
      "Utilize backticks (\`) instead of quotation marks. Embed any dynamic JavaScript expression instantly inside the \${expression} closure.",
    relatedConceptId: "string-parsing",
  },
  {
    id: "destructuring",
    title: "Destructuring & Arrays",
    description:
      "Extract object properties or array positions into local variables in a single declarative statement.",
    es5: `// Old Way (ES5)
var user = { name: "Bob", role: "Admin" };
var userName = user.name;
var userRole = user.role;

var points = [10, 20];
var x = points[0];
var y = points[1];`,
    es6: `// Modern Way (ES6+)
const user = { name: "Bob", role: "Admin" };
const { name, role } = user;

const points = [10, 20];
const [x, y] = points;`,
    takeaway:
      "Unpacks values directly. If properties don't exist, you can assign immediate default values like: const { name, id = 99 } = user.",
    relatedConceptId: "spread-destructuring-unpack",
  },
  {
    id: "spread-rest",
    title: "Spread & Rest Operators (...)",
    description:
      "Unpack sets of values to copy arrays/objects, or bundle infinite function parameters together.",
    es5: `// Old Way (ES5)
var items = [1, 2];
var cloned = items.concat();
cloned.push(3);

function sum() {
  var args = Array.prototype.slice.call(arguments);
  return args.reduce(function(a, b) { return a + b; }, 0);
}`,
    es6: `// Modern Way (ES6+)
const items = [1, 2];
const cloned = [...items, 3];

// Rest parameters gather infinite inputs
const sum = (...args) => {
  return args.reduce((a, b) => a + b, 0);
};`,
    takeaway:
      "The spread operator (...) shallow-copies values in-place. Rest parameters gather a dynamic list of arguments into a clean physical array inside parameters.",
    relatedConceptId: "spread-destructuring-unpack",
  },
  {
    id: "optional-chaining",
    title: "Optional Chaining & Nullish Coalescing",
    description:
      "Safely navigate deep nested objects without checking every level, and use precise empty fallbacks.",
    es5: `// Old Way (ES5)
var user = { profile: { address: null } };
var street = "Unknown";
if (user && user.profile && user.profile.address) {
  street = user.profile.address.street;
}

var maxRetries = 0;
// Problem: || treats 0 as falsy!
var retries = maxRetries || 3; // Yields 3, incorrect!`,
    es6: `// Modern Way (ES6+)
const user = { profile: { address: null } };
const street = user?.profile?.address?.street ?? "Unknown";

const maxRetries = 0;
// Nullish coalescing ?? protects falsiness (0, "")
const retries = maxRetries ?? 3; // Yields 0, correct!`,
    takeaway:
      "?. returns undefined immediately if an element is null or undefined. ?? falls back ONLY on null or undefined, preserving empty strings or zeros.",
    relatedConceptId: "optional-chaining-coalescing",
  },
  {
    id: "array-methods",
    title: "Functional Array Methods",
    description:
      "Ditch mutable 'for' loops! Use modern callbacks to map, filter, or reduce arrays in place.",
    es5: `// Old Way (ES5)
var numbers = [1, 2, 3, 4];
var evenDoubled = [];
for (var i = 0; i < numbers.length; i++) {
  if (numbers[i] % 2 === 0) {
    evenDoubled.push(numbers[i] * 2);
  }
}`,
    es6: `// Modern Way (ES6+)
const numbers = [1, 2, 3, 4];

const evenDoubled = numbers
  .filter(x => x % 2 === 0)
  .map(x => x * 2);`,
    takeaway:
      "Ditch 'for' iteration variables and mutable state. Functional chains map elements fluently to maintain immutability and reduce logical bugs.",
    relatedConceptId: "map-callbacks",
  },
];

export function ES6CheatSheet({ onSelectConcept, currActiveConceptId }) {
  const [copiedId, setCopiedId] = useState(null);
  const [filterQuery, setFilterQuery] = useState("");

  const handleCopy = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  const filteredTopics = CHEAT_SHEET_TOPICS.filter(
    (t) =>
      t.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(filterQuery.toLowerCase()) ||
      t.takeaway.toLowerCase().includes(filterQuery.toLowerCase()),
  );

  return (
    <motion.div
      key="es6-cheat-sheet"
      initial={{ opacity: 0, y: 5 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -5 }}
      transition={{ duration: 0.15 }}
      className="space-y-6"
    >
      <div>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-zinc-900 tracking-tight flex items-center gap-2">
            <Sparkles className="h-4.5 w-4.5 text-yellow-500 fill-yellow-100" />
            ES6 Modern Syntax Guide
          </h2>
          <span className="text-[9px] font-mono font-bold text-zinc-400 bg-zinc-100 border border-zinc-200 px-2.5 py-0.5 rounded-full select-none uppercase">
            LearnJS Engine
          </span>
        </div>
        <p className="text-[10px] font-mono font-bold text-zinc-400 mt-0.5">
          QUICK REFERENCE CHEATSHEET
        </p>
      </div>

      <p className="text-xs text-zinc-650 leading-relaxed font-sans">
        Unlike dusty legacy JavaScript guides, this workspace mandates pristine
        <strong> ES6+ Standards</strong>. Always prefer functional operators,
        block scoping, and immutable syntax. Explore typical code patterns
        below:
      </p>

      {/* Filter search bar */}
      <div className="relative">
        <input
          type="text"
          value={filterQuery}
          onChange={(e) => setFilterQuery(e.target.value)}
          placeholder="Filter ES6 features (e.g. arrow, spread)..."
          className="w-full px-3.5 py-2 text-xs bg-zinc-50 border border-zinc-200 focus:border-[#F7DF1E] focus:outline-none focus:bg-white text-zinc-900 placeholder-zinc-400 rounded-xl transition-all"
        />
        {filterQuery && (
          <button
            onClick={() => setFilterQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono font-bold text-zinc-400 hover:text-zinc-600"
          >
            Clear
          </button>
        )}
      </div>

      {/* Render topics */}
      <div className="space-y-6">
        {filteredTopics.length === 0 ? (
          <div className="p-8 border border-dashed border-zinc-200 rounded-xl text-center space-y-2">
            <HelpCircle className="h-8 w-8 text-zinc-300 mx-auto" />
            <p className="text-xs text-zinc-400 italic">
              No syntax match listed.
            </p>
          </div>
        ) : (
          filteredTopics.map((topic) => {
            const isCopyingES5 = copiedId === `${topic.id}-es5`;
            const isCopyingES6 = copiedId === `${topic.id}-es6`;
            const isRelatedActive =
              topic.relatedConceptId === currActiveConceptId;

            return (
              <div
                key={topic.id}
                className="border border-zinc-200 rounded-xl bg-white p-4 space-y-4 hover:shadow-md hover:border-zinc-300 transition-all"
              >
                <div>
                  <h3 className="text-xs font-black text-zinc-900 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#F7DF1E]" />
                    {topic.title}
                  </h3>
                  <p className="text-[11.5px] text-zinc-600 mt-1 leading-relaxed">
                    {topic.description}
                  </p>
                </div>

                {/* Side by side code comparisons */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
                  {/* Left Column: ES5 Old */}
                  <div className="border border-zinc-150 rounded-lg overflow-hidden bg-zinc-100 flex flex-col">
                    <div className="flex items-center justify-between px-3 py-1.5 bg-zinc-150/80 border-b border-zinc-250 shrink-0 select-none">
                      <span className="text-[8.5px] font-mono font-bold text-zinc-500 uppercase tracking-wider">
                        ES5 (Traditional)
                      </span>
                      <button
                        onClick={() => handleCopy(`${topic.id}-es5`, topic.es5)}
                        className="text-zinc-450 hover:text-zinc-800 transition-colors cursor-pointer"
                        title="Copy traditional style syntax"
                      >
                        {isCopyingES5 ? (
                          <Check className="h-3 w-3 text-emerald-600" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </button>
                    </div>
                    <pre
                      className="p-3 overflow-x-auto text-[10.5px] font-mono text-zinc-700 leading-relaxed bg-[#F3F4F6]"
                      style={{ fontFamily: "Consolas, Monaco, monospace" }}
                    >
                      {topic.es5}
                    </pre>
                  </div>

                  {/* Right Column: ES6 Modern */}
                  <div className="border border-[#181a1f] rounded-lg overflow-hidden bg-[#282c34] flex flex-col shadow-inner">
                    <div className="flex items-center justify-between px-3 py-1.5 bg-[#21252b] border-b border-[#181a1f] shrink-0 select-none">
                      <span className="text-[8.5px] font-mono font-bold text-[#F7DF1E] uppercase tracking-wider flex items-center gap-1">
                        <Terminal className="h-2.5 w-2.5 stroke-[3px]" /> ES6+
                        (MODERN STANDARDS)
                      </span>
                      <button
                        onClick={() => handleCopy(`${topic.id}-es6`, topic.es6)}
                        className="text-[#abb2bf] hover:text-white transition-colors cursor-pointer"
                        title="Copy modern style syntax"
                      >
                        {isCopyingES6 ? (
                          <Check className="h-3 w-3 text-[#98c379]" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </button>
                    </div>
                    <pre
                      className="p-3 overflow-x-auto text-[10.5px] font-mono text-[#abb2bf] bg-[#282c34] leading-relaxed"
                      style={{ fontFamily: "Consolas, Monaco, monospace" }}
                      dangerouslySetInnerHTML={{
                        __html: highlightJS(topic.es6, true),
                      }}
                    />
                  </div>
                </div>

                {/* Conceptual Takeaway and Link */}
                <div className="bg-yellow-50/30 p-3 rounded-lg border border-[#F7DF1E]/30 text-[11px] leading-relaxed text-zinc-755 space-y-2 text-left">
                  <p>
                    💡 <strong>Takeaway</strong>: {topic.takeaway}
                  </p>

                  <div className="pt-1.5 border-t border-dashed border-[#F7DF1E]/30 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-zinc-500">
                      Chapter alignment: {topic.relatedConceptId}
                    </span>
                    <button
                      type="button"
                      onClick={() => onSelectConcept(topic.relatedConceptId)}
                      className={`text-[9.5px] font-mono font-bold flex items-center gap-1 px-2.5 py-1.2 rounded-lg border transition-all cursor-pointer ${
                        isRelatedActive
                          ? "bg-zinc-150 border-zinc-250 text-zinc-600 cursor-not-allowed"
                          : "bg-white border-[#F7DF1E] text-zinc-950 hover:bg-[#F7DF1E]"
                      }`}
                      disabled={isRelatedActive}
                    >
                      {isRelatedActive
                        ? "Active Subject"
                        : "Load Sandbox Module"}
                      {!isRelatedActive && <ArrowRight className="h-3 w-3" />}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </motion.div>
  );
}
