import { CONCEPTS } from "../data/exercises.js";

/**
 * Generates the source contents for a standalone offline JS practice file.
 * This file contains all exercises and an automated console-based test runner
 * that executes perfectly under any Node.js environment.
 */
export function generateOfflineJSFile() {
  let output = `/**
 * =========================================================================
 *              LEARNPLAYGROUND: OFFLINE JAVASCRIPT MASTER-CLASS
 * =========================================================================
 *
 * Welcome to your offline training ground!
 * This program contains every single concept, explanation, and exercise
 * from the LearnJS Sandbox, including targeted DSA problems.
 *
 * INSTRUCTIONS:
 * 1. Open this file in your desktop editor (like VS Code, Atom, or Vim).
 * 2. Write your implementation inside the function bodies or classes provided.
 * 3. Save the file.
 * 4. Run the file in your local terminal:
 *    node learnjs-offline-playground.js
 *
 * The built-in testing engine at the bottom of this file will execute
 * automatically, test your solutions, and print a real-time progress update.
 *
 * Happy practicing!
 * =========================================================================
 */

`;

  // Append each concept and its exercises
  CONCEPTS.forEach((concept, cIdx) => {
    output += `// =========================================================================\n`;
    output += `// MODULE ${cIdx + 1}: ${concept.title.toUpperCase()}\n`;
    output += `// =========================================================================\n`;
    output += `/*\n * ${concept.shortDescription}\n *\n * THEORY & CONTEXT:\n * ${concept.longExplanation.replace(/\n/g, "\n * ")}\n */\n\n`;

    concept.exercises.forEach((ex, eIdx) => {
      output += `/**\n`;
      output += ` * Exercise ${cIdx + 1}.${eIdx + 1}: ${ex.title}\n`;
      output += ` * Difficulty: ${ex.difficulty}\n`;
      output += ` *\n`;
      output += ` * CONCEPT CONTEXT:\n`;
      output += ` * ${ex.conceptContext}\n`;
      output += ` *\n`;
      output += ` * DESCRIPTION:\n`;
      output += ` * ${ex.description.replace(/\n/g, "\n * ")}\n`;
      output += ` *\n`;
      output += ` * HINTS:\n`;
      ex.hints.forEach((hint, hIdx) => {
        output += ` *   ${hIdx + 1}. ${hint}\n`;
      });
      output += ` */\n`;
      output += `${ex.codeTemplate}\n\n`;
    });
  });

  // Append the test runner code
  output += `
// =========================================================================
//                   AUTOMATED OFFLINE TEST RUNNER (Node.js)
// =========================================================================
// This section handles evaluating your functions. Do not modify the code below.

const TEST_CONCEPTS = JSON.parse(${JSON.stringify(
    JSON.stringify(
      CONCEPTS,
      (key, value) => {
        if (value instanceof Map) {
          return { __type: "Map", data: Array.from(value.entries()) };
        }
        return value;
      },
      2,
    ),
  )}, (key, value) => {
  if (value && value.__type === "Map") {
    return new Map(value.data);
  }
  return value;
});

function deepEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (typeof a !== typeof b) return false;

  if (Array.isArray(a)) {
    if (!Array.isArray(b)) return false;
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false;
    }
    return true;
  }

  if (a instanceof Map && b instanceof Map) {
    if (a.size !== b.size) return false;
    for (const [key, val] of a) {
      if (!b.has(key)) return false;
      if (!deepEqual(val, b.get(key))) return false;
    }
    return true;
  }

  if (typeof a === "object") {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    for (const key of keysA) {
      if (!keysB.includes(key)) return false;
      if (!deepEqual(a[key], b[key])) return false;
    }
    return true;
  }

  return false;
}

function formatValue(val) {
  if (val === undefined) return "undefined";
  if (val === null) return "null";
  if (typeof val === "string") return '"' + val + '"';
  if (typeof val === "function") return "function()";
  if (val instanceof Map) {
    try {
      return "Map(" + JSON.stringify(Array.from(val.entries())) + ")";
    } catch {
      return "Map";
    }
  }
  if (typeof val === "object") {
    try { return JSON.stringify(val); } catch { return "[Object]"; }
  }
  return String(val);
}

async function runTests() {
  console.log("\\n\\x1b[33m%s\\x1b[0m", "=======================================================");
  console.log("\\x1b[33m%s\\x1b[0m", "          START JAVASCRIPT OFFLINE RUNNER              ");
  console.log("\\x1b[33m%s\\x1b[0m", "=======================================================");

  let totalSolved = 0;
  let totalExercises = 0;

  for (const concept of TEST_CONCEPTS) {
    console.log("\\n\\x1b[36m%s\\x1b[0m", "📦 Concept: " + concept.title);
    console.log("-----------------------------------------");

    let conceptPassedCount = 0;

    for (const ex of concept.exercises) {
      totalExercises++;
      let exPassed = true;
      let errorMsg = null;
      let testResultsSummary = [];

      // Check if function or class is defined
      let userFunc;
      try {
        userFunc = eval(ex.functionName);
      } catch (err) {
        exPassed = false;
        errorMsg = "Not defined / compiles with ReferenceError - ensure you define " + ex.functionName;
      }

      if (userFunc) {
        for (const tc of ex.testCases) {
          try {
            let actual;
            let passed = false;

            // Handle custom tests
            if (ex.id === "closure-counter") {
              const counter = userFunc(tc.input[0]);
              const inc = counter.increment();
              const dec = counter.decrement();
              const val = counter.getValue();
              actual = [inc, dec, val];
              passed = deepEqual(actual, tc.expected);
            } else if (ex.id === "closure-multiplier") {
              const scaler = userFunc(tc.input[0]);
              actual = scaler(tc.input[1]);
              passed = deepEqual(actual, tc.expected);
            } else if (ex.id === "closure-auth") {
              const mgr = userFunc();
              mgr.setToken(tc.input[0]);
              const hasBefore = mgr.hasToken();
              mgr.clearToken();
              const hasAfter = mgr.hasToken();
              actual = [hasBefore, hasAfter];
              passed = deepEqual(actual, tc.expected);
            } else if (ex.id === "closure-memoize") {
              let count = 0;
              const orig = (x) => { count++; return x * 2; };
              const memoObj = userFunc(orig);
              const f1 = memoObj(tc.input[0]);
              const f2 = memoObj(tc.input[0]);
              actual = f1;
              passed = f1 === tc.expected && f2 === tc.expected && count === 1;
            } else if (ex.id === "closure-stream") {
              const streamer = userFunc(tc.input[0]);
              actual = tc.input[1].map(v => streamer(v));
              passed = deepEqual(actual, tc.expected);
            } else if (ex.id === "async-resolve-delay") {
              const promise = userFunc(tc.input[0], tc.input[1]);
              actual = await promise;
              passed = deepEqual(actual, tc.expected);
            } else if (ex.id === "async-chain-doubler") {
              const mockPromise = tc.input[0] === "RESOLVED_5"
                ? Promise.resolve(5)
                : Promise.reject(new Error("Timeout Exception"));
              actual = await userFunc(mockPromise);
              passed = deepEqual(actual, tc.expected);
            } else if (ex.id === "async-race-fastest") {
              const delayPromise = (ms, val) => new Promise(r => setTimeout(() => r(val), ms));
              let pA, pB;
              if (tc.input[0] === "RACE_A_FAST") {
                pA = delayPromise(2, "Fast Resolution");
                pB = delayPromise(20, "Slow Resolution");
              } else {
                pA = delayPromise(20, "Slow Resolution B");
                pB = delayPromise(2, "Fast Resolution B");
              }
              actual = await userFunc(pA, pB);
              passed = deepEqual(actual, tc.expected);
            } else if (ex.id === "async-compile-all") {
              const mixedPromises = [
                Promise.resolve(100),
                Promise.reject(new Error("Error")),
                Promise.resolve(300)
              ];
              actual = await userFunc(mixedPromises);
              passed = deepEqual(actual, tc.expected);
            } else if (ex.id === "async-sequential") {
              const factories = [
                () => new Promise(r => setTimeout(() => r("Task 1"), 2)),
                () => new Promise(r => setTimeout(() => r("Task 2"), 1)),
                () => new Promise(r => setTimeout(() => r("Task 3"), 3))
              ];
              actual = await userFunc(factories);
              passed = deepEqual(actual, tc.expected);
            } else if (ex.id === "oop-simple-book") {
              const book = new userFunc(tc.input[0], tc.input[1]);
              actual = book.getDetails();
              passed = deepEqual(actual, tc.expected);
            } else if (ex.id === "oop-secure-account") {
              const account = new userFunc(tc.input[0], tc.input[1]);
              const before = account.balance;
              account.balance = before + 700;
              const after = account.balance;
              account.balance = -100;
              const finalVal = account.balance;
              actual = [before, after, finalVal];
              passed = deepEqual(actual, tc.expected);
            } else if (ex.id === "oop-vector") {
              const v1 = new userFunc(tc.input[0][0], tc.input[0][1]);
              const v2 = new userFunc(tc.input[1][0], tc.input[1][1]);
              const sumResult = v1.add(v2);
              actual = sumResult ? [sumResult.x, sumResult.y] : null;
              passed = deepEqual(actual, tc.expected) && v1.x === tc.input[0][0];
            } else if (ex.id === "oop-inherited-vehicle") {
              const electricCar = new userFunc(tc.input[0], tc.input[1], tc.input[2]);
              actual = electricCar.description;
              passed = deepEqual(actual, tc.expected);
            } else if (ex.id === "oop-min-stack") {
              const minStack = new userFunc();
              tc.input[0].forEach(v => minStack.push(v));
              const m1 = minStack.getMin();
              minStack.pop();
              minStack.pop();
              const m2 = minStack.getMin();
              actual = [m1, m2];
              passed = deepEqual(actual, tc.expected);
            } else if (ex.id === "map-group-anagrams") {
              const rawResult = userFunc(tc.input[0]);
              if (Array.isArray(rawResult)) {
                const sortedInner = rawResult.map(grp => Array.isArray(grp) ? [...grp].sort() : grp);
                sortedInner.sort((a, b) => a.join(",").localeCompare(b.join(",")));
                actual = sortedInner;
              } else {
                actual = rawResult;
              }
              const expectedSorted = tc.expected.map(grp => [...grp].sort());
              expectedSorted.sort((a, b) => a.join(",").localeCompare(b.join(",")));
              passed = deepEqual(actual, expectedSorted);
            } else if (ex.id === "recursion-binary-search") {
              actual = userFunc(tc.input[0], tc.input[1], 0, tc.input[0].length - 1);
              passed = actual === tc.expected;
            } else if (ex.id === "recursion-generate-permutations") {
              const rawResult = userFunc(tc.input[0]);
              actual = Array.isArray(rawResult) ? [...rawResult].sort() : rawResult;
              const expectedSorted = [...tc.expected].sort();
              passed = deepEqual(actual, expectedSorted);
            } else if (ex.id === "list-reverse") {
              const buildList = (arr) => {
                if (!arr || arr.length === 0) return null;
                const head = { val: arr[0], next: null };
                let curr = head;
                for (let i = 1; i < arr.length; i++) {
                  curr.next = { val: arr[i], next: null };
                  curr = curr.next;
                }
                return head;
              };
              const listHead = buildList(tc.input[0]);
              const resultHead = userFunc(listHead);
              const listToArray = (head) => {
                const res = [];
                let curr = head;
                const seen = new Set();
                while (curr && !seen.has(curr)) {
                  seen.add(curr);
                  res.push(curr.val);
                  curr = curr.next;
                }
                return res;
              };
              actual = listToArray(resultHead);
              passed = deepEqual(actual, tc.expected);
            } else if (ex.id === "list-has-cycle") {
              const buildListWithCycle = (arr, cyclePos) => {
                if (!arr || arr.length === 0) return null;
                const nodes = arr.map(v => ({ val: v, next: null }));
                for (let i = 0; i < nodes.length - 1; i++) {
                  nodes[i].next = nodes[i + 1];
                }
                if (cyclePos >= 0 && cyclePos < nodes.length) {
                  nodes[nodes.length - 1].next = nodes[cyclePos];
                }
                return nodes[0];
              };
              const listHead = buildListWithCycle(tc.input[0], tc.input[1]);
              actual = userFunc(listHead);
              passed = actual === tc.expected;
            } else if (ex.id === "tree-max-depth" || ex.id === "tree-is-valid-bst") {
              const buildTree = (obj) => {
                if (!obj) return null;
                return {
                  val: obj.val,
                  left: buildTree(obj.left),
                  right: buildTree(obj.right)
                };
              };
              const rootNode = buildTree(tc.input[0]);
              actual = userFunc(rootNode);
              passed = actual === tc.expected;
            } else if (ex.id === "tree-lowest-common-ancestor") {
              const buildTree = (obj) => {
                if (!obj) return null;
                return {
                  val: obj.val,
                  left: buildTree(obj.left),
                  right: buildTree(obj.right)
                };
              };
              const rootNode = buildTree(tc.input[0]);
              const findNode = (root, val) => {
                if (!root) return null;
                if (root.val === val) return root;
                return findNode(root.left, val) || findNode(root.right, val);
              };
              const pNode = findNode(rootNode, tc.input[1]);
              const qNode = findNode(rootNode, tc.input[2]);
              const result = userFunc(rootNode, pNode, qNode);
              actual = result ? result.val : null;
              passed = actual === tc.expected;
            } else {
              const inputClones = JSON.parse(JSON.stringify(tc.input));
              actual = userFunc(...inputClones);
              passed = deepEqual(actual, tc.expected);
            }

            if (!passed) {
              exPassed = false;
            }
            testResultsSummary.push({ tcId: tc.id, passed, input: tc.input, expected: tc.expected, actual });
          } catch (err) {
            // Check if the test explicitly expects a thrown Error
            const expectedErrorMsg = typeof tc.expected === "string" && tc.expected.startsWith("Error:");
            if (expectedErrorMsg && (err.message === tc.expected.replace("Error: ", "") || ("Error: " + err.message) === tc.expected)) {
              actual = tc.expected;
              passed = true;
              testResultsSummary.push({ tcId: tc.id, passed: true, input: tc.input, expected: tc.expected, actual });
            } else {
              exPassed = false;
              errorMsg = err.message || String(err);
            }
          }
        }
      }

      if (exPassed && userFunc) {
        conceptPassedCount++;
        totalSolved++;
        console.log("  \\x1b[32m%s\\x1b[0m", "✔ " + ex.title + " (PASSED)");
      } else {
        console.log("  \\x1b[31m%s\\x1b[0m", "✘ " + ex.title + " (FAILED)");
        if (errorMsg) {
          console.log("    \\x1b[90m%s\\x1b[0m", "└── Error: " + errorMsg);
        } else {
          testResultsSummary.forEach(tr => {
            if (!tr.passed) {
              console.log("    \\x1b[90m%s\\x1b[0m", "└── Case Fail: Input: " + formatValue(tr.input[0]) + " | Expected: " + formatValue(tr.expected) + " | Got: " + formatValue(tr.actual));
            }
          });
        }
      }
    }

    const pct = Math.round((conceptPassedCount / concept.exercises.length) * 100);
    console.log("  \\x1b[90m%s\\x1b[0m", "Module Progress: " + conceptPassedCount + "/" + concept.exercises.length + " (" + pct + "%)");
  }

  console.log("\\n\\x1b[33m%s\\x1b[0m", "=======================================================");
  console.log("\\x1b[1m%s\\x1b[0m", "                 TRAINING RECAP REPORT                 ");
  console.log("\\x1b[33m%s\\x1b[0m", "=======================================================");
  console.log("  Overall Solved: " + totalSolved + " of " + totalExercises + " exercises");
  const overallPct = Math.round((totalSolved / totalExercises) * 100);
  console.log("  Mastery Score:  " + overallPct + "%");
  
  if (totalSolved === totalExercises) {
    console.log("\\n  \\x1b[32m%s\\x1b[0m", "🏆 AMAZING WORK! You have achieved 100% JavaScript Mastery!");
  } else {
    console.log("\\n  \\x1b[33m%s\\x1b[0m", "Keep going! Fill in the unfinished functions to hit 100%!");
  }
  console.log("\\x1b[33m%s\\x1b[0m", "=======================================================\\n");
}

setTimeout(() => {
  runTests().catch(console.error);
}, 100);
`;

  return output;
}

/**
 * Initiates the client-side browser file download sequence.
 */
export function triggerOfflineDownload() {
  const codeString = generateOfflineJSFile();
  const blob = new Blob([codeString], {
    type: "text/javascript;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "learnjs-offline-playground.js");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
