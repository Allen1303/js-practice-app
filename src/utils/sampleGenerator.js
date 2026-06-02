/**
 * Dynamically computes beautiful, original style console.log examples with expected values
 * for each practice exercise inline template, perfectly matching the learnjavascript.online aesthetic.
 */
function stringifyJS(obj, indent = "") {
  if (obj === null) return "null";
  if (obj === undefined) return "undefined";
  if (typeof obj === "function") {
    return obj.toString();
  }
  if (Array.isArray(obj)) {
    if (obj.length === 0) return "[]";
    // Check if simple small flat array of primitives to keep inline
    const isSimple = obj.every(
      (item) =>
        typeof item === "number" ||
        typeof item === "boolean" ||
        typeof item === "string",
    );
    if (isSimple && obj.length <= 5) {
      return (
        "[" +
        obj
          .map((item) =>
            typeof item === "string" ? `"${item}"` : String(item),
          )
          .join(", ") +
        "]"
      );
    }
    const items = obj.map((item) => stringifyJS(item, indent + "  "));
    return (
      "[\n" +
      items.map((item) => indent + "  " + item).join(",\n") +
      "\n" +
      indent +
      "]"
    );
  }
  if (typeof obj === "object") {
    const keys = Object.keys(obj);
    if (keys.length === 0) return "{}";
    const pairs = keys.map((key) => {
      const val = obj[key];
      const formattedKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key)
        ? key
        : JSON.stringify(key);
      return `${formattedKey}: ${stringifyJS(val, indent + "  ")}`;
    });
    return (
      "{\n" +
      pairs.map((pair) => indent + "  " + pair).join(",\n") +
      "\n" +
      indent +
      "}"
    );
  }
  if (typeof obj === "string") {
    return JSON.stringify(obj);
  }
  return String(obj);
}

export function getTopDeclarations(e) {
  if (!e) return "";

  // Custom templates of specialized closures/classes or async assertions
  if (
    e.id === "closure-counter" ||
    e.id === "closure-multiplier" ||
    e.id === "closure-auth" ||
    e.id === "closure-memoize" ||
    e.id === "class-book" ||
    e.id === "class-bank" ||
    e.id === "class-bank-account" ||
    e.id === "class-stack" ||
    e.id === "class-minstack" ||
    e.id === "class-emitter" ||
    e.id === "class-event-emitter" ||
    e.id === "class-query" ||
    e.id === "query-builder" ||
    e.id === "async-delay"
  ) {
    return "";
  }

  if (!e.functionName) return "";

  const cases = e.testCases || [];
  const limit = Math.min(cases.length, 3);
  let varsDecs = [];

  let paramNames = [];
  if (e.codeTemplate) {
    const fnDeclMatch = e.codeTemplate.match(/function\s+(\w+)\s*\(([^)]*)\)/);
    if (fnDeclMatch && fnDeclMatch[2]) {
      paramNames = fnDeclMatch[2]
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean);
    }
  }

  for (let i = 0; i < limit; i++) {
    const tc = cases[i];
    if (!tc) continue;

    const usedInTestCase = new Set();

    if (tc.input && Array.isArray(tc.input)) {
      tc.input.forEach((arg, j) => {
        if (arg !== null && typeof arg === "object") {
          const isArr = Array.isArray(arg);
          let baseName = "";
          if (
            paramNames[j] &&
            /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(paramNames[j])
          ) {
            baseName = paramNames[j];
          } else {
            baseName = isArr ? "list" : "data";
          }

          let varName = `${baseName}${i + 1}`;
          if (usedInTestCase.has(varName)) {
            let k = 2;
            while (usedInTestCase.has(`${varName}_${k}`)) {
              k++;
            }
            varName = `${varName}_${k}`;
          }
          usedInTestCase.add(varName);

          const valStr = stringifyJS(arg);
          varsDecs.push(`const ${varName} = ${valStr};`);
        }
      });
    }
  }

  if (varsDecs.length > 0) {
    return varsDecs.join("\n") + "\n\n";
  }
  return "";
}

export function getBottomUsage(e) {
  if (!e) return "";

  let lines = [];

  // Custom templates of specialized closures/classes or async assertions
  if (e.id === "closure-counter") {
    lines.push(`const counter = createCounter(10);`);
    lines.push(`console.log(counter.increment()); // 11`);
    lines.push(`console.log(counter.getValue()); // 11`);
    lines.push(`console.log(counter.decrement()); // 10`);
    return "\n\n// Sample usage - do not modify\n" + lines.join("\n") + "\n";
  }

  if (e.id === "closure-multiplier") {
    lines.push(`const double = createScaler(2);`);
    lines.push(`console.log(double(5)); // 10`);
    lines.push(`console.log(double(8)); // 16`);
    return "\n\n// Sample usage - do not modify\n" + lines.join("\n") + "\n";
  }

  if (e.id === "closure-auth") {
    lines.push(`const manager = createTokenManager();`);
    lines.push(`manager.setToken("secret-key");`);
    lines.push(`console.log(manager.hasToken()); // true`);
    lines.push(`manager.clearToken();`);
    lines.push(`console.log(manager.hasToken()); // false`);
    return "\n\n// Sample usage - do not modify\n" + lines.join("\n") + "\n";
  }

  if (e.id === "closure-memoize") {
    lines.push(`let temp = 0;`);
    lines.push(`const memoized = memoizeCalculation((x) => x + (++temp));`);
    lines.push(`console.log(memoized(5)); // 6`);
    lines.push(`console.log(memoized(5)); // 6 (cached!)`);
    return "\n\n// Sample usage - do not modify\n" + lines.join("\n") + "\n";
  }

  if (e.id === "class-book" || e.functionName === "Book") {
    lines.push(
      `const book = new Book("Eloquent JavaScript", "Marijn Haverbeke");`,
    );
    lines.push(
      `console.log(book.getDetails()); // "Eloquent JavaScript by Marijn Haverbeke"`,
    );
    return "\n\n// Sample usage - do not modify\n" + lines.join("\n") + "\n";
  }

  if (
    e.id === "class-bank" ||
    e.id === "class-bank-account" ||
    e.functionName === "BankAccount"
  ) {
    lines.push(`const account = new BankAccount("Alice", 100);`);
    lines.push(`account.deposit(50);`);
    lines.push(`console.log(account.getBalance()); // 150`);
    lines.push(`account.withdraw(30);`);
    lines.push(`console.log(account.getBalance()); // 120`);
    return "\n\n// Sample usage - do not modify\n" + lines.join("\n") + "\n";
  }

  if (
    e.id === "class-stack" ||
    e.id === "class-minstack" ||
    e.functionName === "MinStack"
  ) {
    lines.push(`const stack = new MinStack();`);
    lines.push(`stack.push(5);`);
    lines.push(`stack.push(3);`);
    lines.push(`stack.push(7);`);
    lines.push(`console.log(stack.getMin()); // 3`);
    lines.push(`stack.pop();`);
    lines.push(`console.log(stack.getMin()); // 3`);
    return "\n\n// Sample usage - do not modify\n" + lines.join("\n") + "\n";
  }

  if (
    e.id === "class-emitter" ||
    e.id === "class-event-emitter" ||
    e.functionName === "EventEmitter"
  ) {
    lines.push(`const emitter = new EventEmitter();`);
    lines.push(
      `emitter.on("greet", (name) => console.log(\`Hello, \${name}!\`));`,
    );
    lines.push(`emitter.emit("greet", "Alice"); // Logs: "Hello, Alice!"`);
    return "\n\n// Sample usage - do not modify\n" + lines.join("\n") + "\n";
  }

  if (
    e.id === "class-query" ||
    e.id === "query-builder" ||
    e.functionName === "QueryBuilder"
  ) {
    lines.push(`const query = new QueryBuilder("users");`);
    lines.push(
      `console.log(query.select("id", "name").where("active", true).build());`,
    );
    lines.push(`// "SELECT id, name FROM users WHERE active = true"`);
    return "\n\n// Sample usage - do not modify\n" + lines.join("\n") + "\n";
  }

  // Async delays or fetch
  if (e.id === "async-delay") {
    lines.push(
      `delayResolve("Succeeded", 100).then(val => console.log(val)); // "Succeeded"`,
    );
    return "\n\n// Sample usage - do not modify\n" + lines.join("\n") + "\n";
  }

  if (!e.functionName) return "";

  const cases = e.testCases || [];
  const limit = Math.min(cases.length, 3);
  let logLines = [];

  let paramNames = [];
  if (e.codeTemplate) {
    const fnDeclMatch = e.codeTemplate.match(/function\s+(\w+)\s*\(([^)]*)\)/);
    if (fnDeclMatch && fnDeclMatch[2]) {
      paramNames = fnDeclMatch[2]
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean);
    }
  }

  for (let i = 0; i < limit; i++) {
    const tc = cases[i];
    if (!tc) continue;

    const usedInTestCase = new Set();
    let argsInCall = [];
    if (tc.input && Array.isArray(tc.input)) {
      tc.input.forEach((arg, j) => {
        if (arg !== null && typeof arg === "object") {
          let baseName = "";
          if (
            paramNames[j] &&
            /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(paramNames[j])
          ) {
            baseName = paramNames[j];
          } else {
            baseName = Array.isArray(arg) ? "list" : "data";
          }
          let varName = `${baseName}${i + 1}`;
          if (usedInTestCase.has(varName)) {
            let k = 2;
            while (usedInTestCase.has(`${varName}_${k}`)) {
              k++;
            }
            varName = `${varName}_${k}`;
          }
          usedInTestCase.add(varName);
          argsInCall.push(varName);
        } else {
          if (typeof arg === "string") {
            argsInCall.push(`"${arg}"`);
          } else if (typeof arg === "function") {
            argsInCall.push(arg.toString());
          } else {
            argsInCall.push(String(arg));
          }
        }
      });
    }

    let expectedFormatted = "";
    if (tc.expected !== undefined) {
      if (typeof tc.expected === "string") {
        expectedFormatted = `"${tc.expected}"`;
      } else if (
        typeof tc.expected === "number" ||
        typeof tc.expected === "boolean"
      ) {
        expectedFormatted = String(tc.expected);
      } else if (tc.expected instanceof Map) {
        expectedFormatted = "Map";
      } else {
        expectedFormatted = JSON.stringify(tc.expected);
      }
    }

    logLines.push(
      `console.log(${e.functionName}(${argsInCall.join(", ")})); // ${expectedFormatted}`,
    );
  }

  if (logLines.length > 0) {
    return "\n\n// Sample usage - do not modify\n" + logLines.join("\n") + "\n";
  }
  return "";
}

// Alias for backwards-compatibility with older template migrations
export function getSampleUsage(e) {
  return getBottomUsage(e);
}

export function getFullExerciseTemplate(e) {
  if (!e) return "";
  return getTopDeclarations(e) + e.codeTemplate + getBottomUsage(e);
}
