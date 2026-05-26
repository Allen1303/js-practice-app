export function deepEqual(a, b) {
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

export function formatValue(val) {
  if (val === undefined) return "undefined";
  if (val === null) return "null";
  if (typeof val === "string") return `"${val}"`;
  if (typeof val === "function") return "function() { ... }";
  if (val instanceof Map) {
    try {
      return "Map(" + JSON.stringify(Array.from(val.entries())) + ")";
    } catch {
      return "Map";
    }
  }
  if (typeof val === "object") {
    try {
      return JSON.stringify(val);
    } catch {
      return "[Object]";
    }
  }
  return String(val);
}

export async function runExerciseTests(exercise, userCode) {
  const results = [];

  try {
    // Compile functions cleanly without TS compiler noise
    const compiledFunction = new Function(`
      ${userCode}
      if (typeof ${exercise.functionName} === 'undefined') {
        throw new Error("Function '${exercise.functionName}' is not defined. Please check your function name.");
      }
      return ${exercise.functionName};
    `);

    const userFunc = compiledFunction();

    // Run each case
    for (const tc of exercise.testCases) {
      try {
        let actual;
        let passed = false;

        // Specialized integration workflows
        if (exercise.id === "closure-counter") {
          const counter = userFunc(tc.input[0]);
          if (
            !counter ||
            typeof counter.increment !== "function" ||
            typeof counter.decrement !== "function" ||
            typeof counter.getValue !== "function"
          ) {
            throw new Error(
              "Returned object must contain increment(), decrement(), and getValue() methods.",
            );
          }
          const inc = counter.increment();
          const dec = counter.decrement();
          const val = counter.getValue();
          actual = [inc, dec, val];
          passed = deepEqual(actual, tc.expected);
        } else if (exercise.id === "closure-multiplier") {
          const scaler = userFunc(tc.input[0]);
          if (typeof scaler !== "function") {
            throw new Error(
              "createScaler must return an inner function closure.",
            );
          }
          actual = scaler(tc.input[1]);
          passed = deepEqual(actual, tc.expected);
        } else if (exercise.id === "closure-auth") {
          const mgr = userFunc();
          if (
            !mgr ||
            typeof mgr.setToken !== "function" ||
            typeof mgr.hasToken !== "function" ||
            typeof mgr.clearToken !== "function"
          ) {
            throw new Error(
              "Returned object must contain setToken(), hasToken(), and clearToken() methods.",
            );
          }
          mgr.setToken(tc.input[0]);
          const hasBefore = mgr.hasToken();
          mgr.clearToken();
          const hasAfter = mgr.hasToken();
          actual = [hasBefore, hasAfter];
          passed = deepEqual(actual, tc.expected);
        } else if (exercise.id === "closure-memoize") {
          let callCount = 0;
          const original = (x) => {
            callCount++;
            return x * 2;
          };
          const memoized = userFunc(original);
          if (typeof memoized !== "function") {
            throw new Error(
              "memoizeCalculation must return a wrapped function.",
            );
          }
          const first = memoized(tc.input[0]);
          const second = memoized(tc.input[0]);

          actual = first;
          passed =
            first === tc.expected && second === tc.expected && callCount === 1;
          if (callCount > 1) {
            throw new Error(
              `Target function was executed ${callCount} times. Memoization was not engaged.`,
            );
          }
        } else if (exercise.id === "closure-stream") {
          const streamer = userFunc(tc.input[0]);
          if (typeof streamer !== "function") {
            throw new Error(
              "createAverageStreamer must return a streamer function.",
            );
          }
          const resultsArr = tc.input[1].map((v) => streamer(v));
          actual = resultsArr;
          passed = deepEqual(actual, tc.expected);
        } else if (exercise.id === "oop-simple-book") {
          const book = new userFunc(tc.input[0], tc.input[1]);
          actual = book.getDetails();
          passed = deepEqual(actual, tc.expected);
        } else if (exercise.id === "oop-secure-account") {
          const account = new userFunc(tc.input[0], tc.input[1]);
          const before = account.balance;
          account.balance = before + 700;
          const after = account.balance;
          account.balance = -100;
          const finalVal = account.balance;
          actual = [before, after, finalVal];
          passed = deepEqual(actual, tc.expected);
        } else if (exercise.id === "oop-vector") {
          const v1 = new userFunc(tc.input[0][0], tc.input[0][1]);
          const v2 = new userFunc(tc.input[1][0], tc.input[1][1]);
          const sumResult = v1.add(v2);
          if (
            sumResult &&
            sumResult.x !== undefined &&
            sumResult.y !== undefined
          ) {
            actual = [sumResult.x, sumResult.y];
          } else {
            actual = null;
          }
          passed =
            deepEqual(actual, tc.expected) &&
            v1.x === tc.input[0][0] &&
            v1.y === tc.input[0][1];
        } else if (exercise.id === "oop-inherited-vehicle") {
          const electricCar = new userFunc(
            tc.input[0],
            tc.input[1],
            tc.input[2],
          );
          actual = electricCar.description;
          passed = deepEqual(actual, tc.expected);
        } else if (exercise.id === "oop-min-stack") {
          const minStack = new userFunc();
          const pValues = tc.input[0];
          pValues.forEach((v) => minStack.push(v));
          const m1 = minStack.getMin();
          minStack.pop();
          minStack.pop();
          const m2 = minStack.getMin();
          actual = [m1, m2];
          passed = deepEqual(actual, tc.expected);
        } else if (exercise.id === "ds-deep-freeze") {
          const inputObj = tc.input[0];
          const returnedObj = userFunc(inputObj);
          const rootFrozen = Object.isFrozen(returnedObj);
          const childFrozen = !!(
            returnedObj &&
            returnedObj.user &&
            Object.isFrozen(returnedObj.user) &&
            returnedObj.user.profile &&
            Object.isFrozen(returnedObj.user.profile)
          );
          actual = [rootFrozen, childFrozen];
          passed = deepEqual(actual, tc.expected);
        } else if (exercise.id === "oop-singleton-registry") {
          const reg1 = new userFunc();
          const reg2 = new userFunc();
          reg1.set("apiKey", tc.input[0]);
          const keyIn2 = reg2.get("apiKey");
          actual = [reg1 === reg2, keyIn2];
          passed = deepEqual(actual, tc.expected);
        } else if (exercise.id === "oop-stateful-pubsub") {
          const emitter = new userFunc();
          let received = [];
          const sub = emitter.subscribe(tc.input[0], (data) => {
            received.push(data);
          });
          emitter.publish(tc.input[0], tc.input[1]);
          sub.unsubscribe();
          emitter.publish(tc.input[0], "never-received");
          actual = [received[0], received.length - 1];
          passed = deepEqual(actual, tc.expected);
        } else if (exercise.id === "oop-builder-pattern") {
          const builder = new userFunc();
          const built = builder
            .from(tc.input[0])
            .select(tc.input[1])
            .where(tc.input[2])
            .limit(tc.input[3])
            .build();
          actual = built;
          passed = deepEqual(actual, tc.expected);
        } else if (exercise.id === "map-group-anagrams") {
          const rawResult = userFunc(tc.input[0]);
          if (Array.isArray(rawResult)) {
            const sortedInner = rawResult.map((grp) =>
              Array.isArray(grp) ? [...grp].sort() : grp,
            );
            sortedInner.sort((a, b) => a.join(",").localeCompare(b.join(",")));
            actual = sortedInner;
          } else {
            actual = rawResult;
          }
          const expectedSorted = tc.expected.map((grp) => [...grp].sort());
          expectedSorted.sort((a, b) => a.join(",").localeCompare(b.join(",")));
          passed = deepEqual(actual, expectedSorted);
        } else if (exercise.id === "recursion-binary-search") {
          actual = userFunc(
            tc.input[0],
            tc.input[1],
            0,
            tc.input[0].length - 1,
          );
          passed = actual === tc.expected;
        } else if (exercise.id === "recursion-generate-permutations") {
          const rawResult = userFunc(tc.input[0]);
          actual = Array.isArray(rawResult) ? [...rawResult].sort() : rawResult;
          const expectedSorted = [...tc.expected].sort();
          passed = deepEqual(actual, expectedSorted);
        } else if (exercise.id === "list-reverse") {
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
        } else if (exercise.id === "list-has-cycle") {
          const buildListWithCycle = (arr, cyclePos) => {
            if (!arr || arr.length === 0) return null;
            const nodes = arr.map((v) => ({ val: v, next: null }));
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
        } else if (
          exercise.id === "tree-max-depth" ||
          exercise.id === "tree-is-valid-bst"
        ) {
          const buildTree = (obj) => {
            if (!obj) return null;
            return {
              val: obj.val,
              left: buildTree(obj.left),
              right: buildTree(obj.right),
            };
          };
          const rootNode = buildTree(tc.input[0]);
          actual = userFunc(rootNode);
          passed = actual === tc.expected;
        } else if (exercise.id === "tree-lowest-common-ancestor") {
          const buildTree = (obj) => {
            if (!obj) return null;
            return {
              val: obj.val,
              left: buildTree(obj.left),
              right: buildTree(obj.right),
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
          // Normal pure function execution
          const inputClones = JSON.parse(JSON.stringify(tc.input));
          actual = userFunc(...inputClones);
          passed = deepEqual(actual, tc.expected);
        }

        results.push({
          testId: tc.id,
          description: tc.description,
          input: tc.input.map((i) => formatValue(i)).join(", "),
          expected: formatValue(tc.expected),
          actual: formatValue(actual),
          passed,
        });
      } catch (err) {
        // Check if the test explicitly expects a thrown Error
        const expectedErrorMsg =
          typeof tc.expected === "string" && tc.expected.startsWith("Error:");
        if (
          expectedErrorMsg &&
          (err.message === tc.expected.replace("Error: ", "") ||
            "Error: " + err.message === tc.expected)
        ) {
          results.push({
            testId: tc.id,
            description: tc.description,
            input: tc.input.map((i) => formatValue(i)).join(", "),
            expected: formatValue(tc.expected),
            actual: formatValue(tc.expected),
            passed: true,
          });
        } else {
          results.push({
            testId: tc.id,
            description: tc.description,
            input: tc.input.map((i) => formatValue(i)).join(", "),
            expected: formatValue(tc.expected),
            actual: "Runtime Error",
            passed: false,
            error: err.message || String(err),
          });
        }
      }
    }
  } catch (err) {
    results.push({
      testId: 0,
      description: "Syntax and compilation review",
      input: "Source compilation",
      expected: "Success",
      actual: "Compilation Failure",
      passed: false,
      error: err.message || String(err),
    });
  }

  return results;
}
