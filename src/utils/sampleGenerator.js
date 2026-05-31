/**
 * Dynamically computes beautiful, original style console.log examples with expected values
 * for each practice exercise inline template, perfectly matching the learnjavascript.online aesthetic.
 */
export function getSampleUsage(e) {
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

  // Dynamic automatic test cases fallback builder
  const cases = e.testCases || [];
  const limit = Math.min(cases.length, 3);
  for (let i = 0; i < limit; i++) {
    const tc = cases[i];
    if (!tc) continue;

    let argsFormatted = "";
    if (tc.input && Array.isArray(tc.input)) {
      argsFormatted = tc.input
        .map((arg) => {
          if (typeof arg === "string") return `"${arg}"`;
          if (typeof arg === "number" || typeof arg === "boolean")
            return String(arg);
          if (arg === null) return "null";
          if (arg === undefined) return "undefined";
          return JSON.stringify(arg);
        })
        .join(", ");
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

    lines.push(
      `console.log(${e.functionName}(${argsFormatted})); // ${expectedFormatted}`,
    );
  }

  if (lines.length > 0) {
    return "\n\n// Sample usage - do not modify\n" + lines.join("\n") + "\n";
  }
  return "";
}
