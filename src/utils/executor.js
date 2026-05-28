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
  const consoleLogs = [];
  let currentTestCaseId = null;

  const customConsole = {
    log: (...args) => {
      const formatted = args
        .map((a) => {
          if (a === undefined) return "undefined";
          if (a === null) return "null";
          try {
            return typeof a === "object"
              ? JSON.stringify(a, null, 2)
              : String(a);
          } catch {
            return String(a);
          }
        })
        .join(" ");
      consoleLogs.push({
        testId: currentTestCaseId,
        type: "log",
        text: formatted,
      });
    },
    error: (...args) => {
      const formatted = args
        .map((a) => (typeof a === "object" ? JSON.stringify(a) : String(a)))
        .join(" ");
      consoleLogs.push({
        testId: currentTestCaseId,
        type: "error",
        text: formatted,
      });
    },
    warn: (...args) => {
      const formatted = args
        .map((a) => (typeof a === "object" ? JSON.stringify(a) : String(a)))
        .join(" ");
      consoleLogs.push({
        testId: currentTestCaseId,
        type: "warn",
        text: formatted,
      });
    },
  };

  try {
    // Compile functions cleanly with shadowed console variable
    const compiledFunction = new Function(
      "console",
      `
      ${userCode}
      if (typeof ${exercise.functionName} === 'undefined') {
        throw new Error("Function '${exercise.functionName}' is not defined. Please check your function name.");
      }
      return ${exercise.functionName};
    `,
    );

    // Initialization run
    currentTestCaseId = null; // represents pre-test file level execution
    const userFunc = compiledFunction(customConsole);

    // Run each case
    for (const tc of exercise.testCases) {
      currentTestCaseId = tc.id;
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
        } else if (exercise.id === "map-weakmap-cache") {
          let callCount = 0;
          const original = (obj) => {
            callCount++;
            return (obj.val || 0) * 2;
          };
          const memoized = userFunc(original);
          const o1 = { val: 5 };
          const first = memoized(o1);
          const second = memoized(o1);
          actual = first;
          passed = first === 10 && second === 10 && callCount === 1;
        } else if (exercise.id === "localstorage-mock-tracker") {
          const store = {};
          const mockStorage = {
            setItem: (k, v) => {
              store[k] = v;
            },
            getItem: (k) => store[k] || null,
            removeItem: (k) => {
              delete store[k];
            },
          };
          userFunc(mockStorage, { id: 101, name: "Ali" });
          const savedStr = store["user_profile"];
          const reloaded = userFunc(mockStorage, null);
          actual = [typeof savedStr, reloaded];
          passed =
            savedStr &&
            typeof savedStr === "string" &&
            deepEqual(reloaded, { id: 101, name: "Ali" });
        } else if (exercise.id === "promisify-callback") {
          const legacyFn = (arg, cb) => {
            if (arg === "fail") cb(new Error("Failed"));
            else cb(null, arg + "!");
          };
          const promised = userFunc(legacyFn);
          try {
            const res = await promised(tc.input[0]);
            actual = res;
          } catch (err) {
            actual = "Error: " + err.message;
          }
          passed = actual === tc.expected;
        } else if (exercise.id === "promise-all-safe") {
          const promises = tc.input[0].map((item) => {
            if (item.fail) return Promise.reject(new Error(item.val));
            return Promise.resolve(item.val);
          });
          const res = await userFunc(promises);
          actual = res.map((o) =>
            o.status === "fulfilled"
              ? { status: "fulfilled", value: o.value }
              : {
                  status: "rejected",
                  reason: o.reason?.message || o.error || o.reason,
                },
          );
          passed = deepEqual(actual, tc.expected);
        } else if (exercise.id === "async-fetch-json") {
          const mockFetch = (id) => {
            if (id === 999) return Promise.reject(new Error("Not Found"));
            return Promise.resolve({ username: "john_doe" });
          };
          actual = await userFunc(tc.input[0], mockFetch);
          passed = actual === tc.expected;
        } else if (exercise.id === "auto-retry-promise") {
          let callCount = 0;
          const mockFn = () => {
            callCount++;
            if (callCount < tc.input[0])
              return Promise.reject(new Error("Fail"));
            return Promise.resolve("Success");
          };
          try {
            actual = await userFunc(mockFn, tc.input[1]);
          } catch (err) {
            actual = "Error: " + err.message;
          }
          passed = actual === tc.expected;
        } else {
          // Normal pure function execution
          const inputClones = JSON.parse(JSON.stringify(tc.input));
          const result = userFunc(...inputClones);
          actual = result instanceof Promise ? await result : result;
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

  return { results, consoleLogs };
}

export async function runCustomEvaluation(exercise, userCode, rawArgumentsStr) {
  const consoleLogs = [];
  const customConsole = {
    log: (...args) => {
      const formatted = args
        .map((a) => {
          if (a === undefined) return "undefined";
          if (a === null) return "null";
          try {
            return typeof a === "object"
              ? JSON.stringify(a, null, 2)
              : String(a);
          } catch {
            return String(a);
          }
        })
        .join(" ");
      consoleLogs.push({ type: "log", text: formatted });
    },
    error: (...args) => {
      const formatted = args
        .map((a) => (typeof a === "object" ? JSON.stringify(a) : String(a)))
        .join(" ");
      consoleLogs.push({ type: "error", text: formatted });
    },
    warn: (...args) => {
      const formatted = args
        .map((a) => (typeof a === "object" ? JSON.stringify(a) : String(a)))
        .join(" ");
      consoleLogs.push({ type: "warn", text: formatted });
    },
  };

  let parsedArgs = [];
  try {
    if (rawArgumentsStr.trim() !== "") {
      const parseFunction = new Function(`return [ ${rawArgumentsStr} ];`);
      parsedArgs = parseFunction();
    }
  } catch (parseErr) {
    return {
      success: false,
      error:
        'Arguments syntax is invalid.\nExample of valid inputs:\n  For lists: [4, 5, 2], 2\n  For matrices: [[1, 2], [3, 4]]\n  For strings: "hello", "world"\n\nDetails: ' +
        parseErr.message,
      consoleLogs: [],
    };
  }

  try {
    const compiledFunction = new Function(
      "console",
      `
      ${userCode}
      if (typeof ${exercise.functionName} === 'undefined') {
        throw new Error("Function '${exercise.functionName}' is not defined. Please check your function name.");
      }
      return ${exercise.functionName};
    `,
    );

    const userFunc = compiledFunction(customConsole);
    const inputClones = JSON.parse(JSON.stringify(parsedArgs));

    let resultValue;

    if (exercise.id === "closure-counter") {
      const counter = userFunc(inputClones[0]);
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
      resultValue = {
        incrementOutput: inc,
        decrementOutput: dec,
        finalValue: val,
      };
    } else if (exercise.id === "closure-multiplier") {
      const scaler = userFunc(inputClones[0]);
      if (typeof scaler !== "function") {
        throw new Error("createScaler must return an inner function closure.");
      }
      resultValue = scaler(inputClones[1]);
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
      mgr.setToken(inputClones[0]);
      const hasBefore = mgr.hasToken();
      mgr.clearToken();
      const hasAfter = mgr.hasToken();
      resultValue = {
        hasTokenBeforeClear: hasBefore,
        hasTokenAfterClear: hasAfter,
      };
    } else if (exercise.id === "closure-memoize") {
      let callCount = 0;
      const original = (x) => {
        callCount++;
        return x * 2;
      };
      const memoized = userFunc(original);
      if (typeof memoized !== "function") {
        throw new Error("memoizeCalculation must return a wrapped function.");
      }
      const first = memoized(inputClones[0] ?? 5);
      const second = memoized(inputClones[0] ?? 5);
      resultValue = {
        firstCallOutput: first,
        secondCallOutput: second,
        underlyingExecutions: callCount,
      };
    } else if (exercise.id === "closure-stream") {
      const streamer = userFunc(inputClones[0]);
      if (typeof streamer !== "function") {
        throw new Error(
          "createAverageStreamer must return a streamer function.",
        );
      }
      const vals = inputClones[1] || [10, 20, 30];
      const streamHistoryList = vals.map((v) => streamer(v));
      resultValue = { streamerHistoryList };
    } else if (exercise.id === "oop-simple-book") {
      const book = new userFunc(inputClones[0], inputClones[1]);
      resultValue = book.getDetails();
    } else if (exercise.id === "oop-secure-account") {
      const account = new userFunc(inputClones[0], inputClones[1]);
      const before = account.balance;
      account.balance = before + (inputClones[2] ?? 500);
      const after = account.balance;
      resultValue = { initialBalance: before, balanceAfterDeposit: after };
    } else if (exercise.id === "oop-vector") {
      const v1 = new userFunc(
        inputClones[0]?.[0] ?? 1,
        inputClones[0]?.[1] ?? 2,
      );
      const v2 = new userFunc(
        inputClones[1]?.[0] ?? 3,
        inputClones[1]?.[1] ?? 4,
      );
      const sumResult = v1.add(v2);
      resultValue = sumResult ? { x: sumResult.x, y: sumResult.y } : null;
    } else if (exercise.id === "oop-inherited-vehicle") {
      const electricCar = new userFunc(
        inputClones[0],
        inputClones[1],
        inputClones[2],
      );
      resultValue = electricCar.description;
    } else if (exercise.id === "oop-min-stack") {
      const minStack = new userFunc();
      const pValues = inputClones[0] || [4, 9, 2, 7];
      pValues.forEach((v) => minStack.push(v));
      const m1 = minStack.getMin();
      minStack.pop();
      const m2 = minStack.getMin();
      resultValue = {
        elementsPushed: pValues,
        initialMin: m1,
        minAfterOnePop: m2,
      };
    } else if (exercise.id === "ds-deep-freeze") {
      const returnedObj = userFunc(
        inputClones[0] || { val: 1, user: { profile: { name: "Bob" } } },
      );
      const rootFrozen = Object.isFrozen(returnedObj);
      const childFrozen = !!(
        returnedObj &&
        returnedObj.user &&
        Object.isFrozen(returnedObj.user) &&
        returnedObj.user.profile &&
        Object.isFrozen(returnedObj.user.profile)
      );
      resultValue = {
        rootFrozen,
        nestedPropertiesFrozen: childFrozen,
        result: returnedObj,
      };
    } else if (exercise.id === "oop-singleton-registry") {
      const reg1 = new userFunc();
      const reg2 = new userFunc();
      reg1.set("apiKey", inputClones[0] ?? "SECRET_TOKEN");
      const keyIn2 = reg2.get("apiKey");
      resultValue = {
        areSingletonsSameInstance: reg1 === reg2,
        retrievedKeyFromSecondInstance: keyIn2,
      };
    } else if (exercise.id === "oop-stateful-pubsub") {
      const emitter = new userFunc();
      let received = [];
      const sub = emitter.subscribe(inputClones[0], (data) => {
        received.push(data);
      });
      emitter.publish(inputClones[0], inputClones[1]);
      sub.unsubscribe();
      resultValue = { eventSubscribed: inputClones[0], receivedData: received };
    } else if (exercise.id === "oop-builder-pattern") {
      const builder = new userFunc();
      const built = builder
        .from(inputClones[0])
        .select(inputClones[1])
        .where(inputClones[2])
        .limit(inputClones[3])
        .build();
      resultValue = built;
    } else if (exercise.id === "map-weakmap-cache") {
      let callCount = 0;
      const original = (obj) => {
        callCount++;
        return (obj.val || 0) * 2;
      };
      const memoized = userFunc(original);
      const o1 = { val: inputClones[0] ?? 10 };
      const first = memoized(o1);
      const second = memoized(o1);
      resultValue = {
        firstCallOutput: first,
        secondCallOutput: second,
        underlyingExecutions: callCount,
      };
    } else if (exercise.id === "localstorage-mock-tracker") {
      const store = {};
      const mockStorage = {
        setItem: (k, v) => {
          store[k] = v;
        },
        getItem: (k) => store[k] || null,
        removeItem: (k) => {
          delete store[k];
        },
      };
      userFunc(mockStorage, inputClones[0]);
      const reloaded = userFunc(mockStorage, null);
      resultValue = {
        simulatedStorageContents: store,
        retrievedDataOnReload: reloaded,
      };
    } else if (exercise.id === "promisify-callback") {
      const legacyFn = (arg, cb) => {
        if (arg === "fail") cb(new Error("Failed"));
        else cb(null, arg + "!");
      };
      const promised = userFunc(legacyFn);
      const res = await promised(inputClones[0]);
      resultValue = res;
    } else if (exercise.id === "promise-all-safe") {
      const promises = (inputClones[0] || []).map((item) => {
        if (item.fail) return Promise.reject(new Error(item.val));
        return Promise.resolve(item.val);
      });
      const res = await userFunc(promises);
      resultValue = res.map((o) =>
        o.status === "fulfilled"
          ? { status: "fulfilled", value: o.value }
          : {
              status: "rejected",
              reason: o.reason?.message || o.error || o.reason,
            },
      );
    } else if (exercise.id === "async-fetch-json") {
      const mockFetch = (id) => {
        if (id === 999) return Promise.reject(new Error("Not Found"));
        return Promise.resolve({ username: "john_doe" });
      };
      resultValue = await userFunc(inputClones[0], mockFetch);
    } else if (exercise.id === "auto-retry-promise") {
      let callCount = 0;
      const mockFn = () => {
        callCount++;
        if (callCount < inputClones[0])
          return Promise.reject(new Error("Fail"));
        return Promise.resolve("Success");
      };
      resultValue = await userFunc(mockFn, inputClones[1]);
    } else {
      const evalResult = userFunc(...inputClones);
      resultValue =
        evalResult instanceof Promise ? await evalResult : evalResult;
    }

    return {
      success: true,
      result: formatValue(resultValue),
      consoleLogs,
      error: null,
    };
  } catch (err) {
    return {
      success: false,
      result: null,
      consoleLogs,
      error: err.message || String(err),
    };
  }
}
