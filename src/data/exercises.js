export const CONCEPTS = [
  {
    id: "variables-numbers",
    title: "Variables, Numbers & Operators",
    shortDescription:
      "Master 'let' and 'const' variables, basic maths, and standard operators.",
    longExplanation:
      "Welcome to the absolute start of programming! Variables are containers for storing your application’s data.\n\n- **const**: Stands for constant. It cannot be reassigned after it gets a value.\n- **let**: Block-scoped variable that can be changed later.\n- **Basic Operators**: Use standard characters: `+` for addition, `-` for subtraction, `*` for multiplication, `/` for division, and `%` for remainder.\n- **typeof**: Handy operator to check what type of data you have in memory.",
    codeSnippet: `const age = 30;
let points = 10;
points = points + 5; // Reassignment is okay for 'let'
console.log(typeof age); // "number"`,
    exercises: [
      {
        id: "var-declaration",
        title: "Variable Declaration",
        difficulty: "Warm-up",
        codeSnippet: `const rate = 1.5;\nreturn rate;`,
        conceptContext:
          "Modern JavaScript uses `const` for values that never change and `let` for values that can change. Never use `var` in modern code because it lacks safety walls.",
        description:
          "Let's learn how to declare a variable! Declare a constant variable named `multiplier` and set it to `10`. Then, return the input parameter `x` multiplied by modern `multiplier`.",
        codeTemplate: `function multiplyByTen(x) {
  // Declare 'multiplier' with const and multiply x by it
  
}`,
        functionName: "multiplyByTen",
        hints: [
          "Declare your multiplier like this: const multiplier = 10;",
          "Multiply x by multiplier and return the result: return x * multiplier;",
        ],
        explanation:
          "Simple variable assignment using const guarantees the reference does not get rewritten.",
        testCases: [
          {
            id: 1,
            input: [5],
            expected: 50,
            description: "5 multiplied by 10 is 50",
          },
          {
            id: 2,
            input: [0],
            expected: 0,
            description: "0 multiplied by 10 is 0",
          },
        ],
      },
      {
        id: "number-addition",
        title: "Sum of Two Numbers",
        difficulty: "Warm-up",
        codeSnippet: `const sum = 5 + 3; // 8`,
        conceptContext:
          "Use the plus `+` operator to perform arithmetic addition in JavaScript.",
        description:
          "Write a function `sumTwo(a, b)` that adds the two parameter numbers `a` and `b` together and returns the sum.",
        codeTemplate: `function sumTwo(a, b) {
  // Add values a and b, and return the result
  
}`,
        functionName: "sumTwo",
        hints: [
          "Double check that you are explicitly writing the 'return' statement.",
          "Simply return: a + b;",
        ],
        explanation: "The addition operator + computes numbers sum easily.",
        testCases: [
          {
            id: 1,
            input: [10, 5],
            expected: 15,
            description: "10 and 5 is 15",
          },
          { id: 2, input: [-2, 8], expected: 6, description: "-2 and 8 is 6" },
        ],
      },
      {
        id: "num-remainder-odd",
        title: "Odd Number Checker",
        difficulty: "Warm-up",
        codeSnippet: `const isOdd = x % 2 !== 0;`,
        conceptContext:
          "The remainder `%` operator (often called modulo) computes the leftover from dividing two numbers. Check odd parity with `num % 2 !== 0`.",
        description:
          "Write a function `isOdd(num)` that returns `true` if the input number `num` is an odd number, and `false` if it is even.",
        codeTemplate: `function isOdd(num) {
  // Use remainder % 2 check to find odd numbers
  
}`,
        functionName: "isOdd",
        hints: [
          "An odd number divided by 2 has a remainder of 1 or -1 (if negative).",
          "You can check: num % 2 !== 0;",
        ],
        explanation:
          "Remainder operators division checking is standard for checking numerical parity.",
        testCases: [
          {
            id: 1,
            input: [7],
            expected: true,
            description: "7 is an odd number",
          },
          {
            id: 2,
            input: [12],
            expected: false,
            description: "12 is an even number",
          },
          {
            id: 3,
            input: [-5],
            expected: true,
            description: "Handles negative odd integers safely",
          },
        ],
      },
      {
        id: "num-parse",
        title: "Pixel Integer Extractor",
        difficulty: "DSA Easy",
        codeSnippet: `const sizeVal = Number.parseInt("16px", 10); // 16`,
        conceptContext:
          "In web layouts, CSS dimensions exist as strings like `'24px'`. Use `Number.parseInt(text, 10)` to extract the pure numerical integer, using radix base 10.",
        description:
          "Write a function `extractPixels(cssValue)` that parses and returns the raw numerical integer from a CSS dimension string (e.g. `'30px'`).",
        codeTemplate: `function extractPixels(cssValue) {
  // Extract number from css string (e.g. "24px" -> 24)
  
}`,
        functionName: "extractPixels",
        hints: [
          "Use Number.parseInt(cssValue, 10) to strip the letters and retrieve the integer.",
          "Always specify the 10 radix parameter for decimal numbering systems.",
        ],
        explanation:
          "Number.parseInt looks at strings left-to-right, discarding trailing non-numeric values seamlessly.",
        testCases: [
          {
            id: 1,
            input: ["24px"],
            expected: 24,
            description: "Extracts 24 from 24px string",
          },
          {
            id: 2,
            input: ["1080p"],
            expected: 1080,
            description: "Handles other trailing characters smoothly",
          },
        ],
      },
      {
        id: "number-typeof",
        title: "Check Variable Type",
        difficulty: "Warm-up",
        codeSnippet: `typeof "hello"; // "string"`,
        conceptContext:
          "The `typeof` operator inspects what primitive category you are working with, returning string indicators such as `'number'`, `'string'`, or `'boolean'.`",
        description:
          "Write a function `inspectType(value)` that takes any input and returns its typeof string description (like `'number'` or `'string'`).",
        codeTemplate: `function inspectType(value) {
  // Return the typeof value
  
}`,
        functionName: "inspectType",
        hints: [
          "Simply write: return typeof value;",
          "Do not wrap typeof in parentheses (though typeof(value) works, standard operator style is preferred).",
        ],
        explanation:
          "Evaluating runtime variable types checks memory invariants beautifully.",
        testCases: [
          {
            id: 1,
            input: [42],
            expected: "number",
            description: "42 is a number",
          },
          {
            id: 2,
            input: ["learnjs"],
            expected: "string",
            description: "learnjs is a string",
          },
          {
            id: 3,
            input: [true],
            expected: "boolean",
            description: "true is a boolean",
          },
        ],
      },
    ],
  },
  {
    id: "functions-basics",
    title: "Functions, Returns & Operators",
    shortDescription:
      "Learn parameters, return values, arrow syntax, and logical operators.",
    longExplanation:
      "Functions take inputs (parameters), do some calculations, and return a final value. Inside modern JavaScript, functions can be declared using the traditional function keyword or modern compact Arrow functions. You can also combine parameters using logical operators (like AND, OR, and NOT) to represent checks elegantly.\n\n- **Explicit Return**: Always write the word `return` inside a standard function body. If you omit it, the function returns `undefined`!\n- **Logical AND (`&&`)**: Checks if both conditions are true. If they are, it evaluates to true.\n- **Logical OR (`||`)**: Checks if at least one of the conditions is true. If yes, it evaluates to true.\n- **Logical NOT (`!`)**: Inverts any boolean value (e.g. `!true` is `false`).\n- **Arrow Functions**: Compact arrow syntax `() => ...` provides short, readable ways to declare functions.",
    codeSnippet: `// Standard declaration with logical AND operator
function isEligible(age, hasConsent) {
  return age >= 18 && hasConsent;
}

// Compact Arrow function with implicit return
const double = (num) => num * 2;

console.log(isEligible(19, true)); // true
console.log(double(10));           // 20`,
    exercises: [
      {
        id: "func-return",
        title: "The Double Return Goal",
        difficulty: "Warm-up",
        codeSnippet: `function doubleRec(val) {\n  return val * 2;\n}`,
        conceptContext:
          "Unlike console.log() which just makes words appear in terminal logs, the `return` statement stops function execution and hands the calculated result back to your application.",
        description:
          "Write a function `doubleValue(num)` that doubles the input variable `num` and explicitly returns the computed calculation.",
        codeTemplate: `function doubleValue(num) {
  // Be sure to explicitly use the 'return' keyword!
  
}`,
        functionName: "doubleValue",
        hints: [
          "If you write num * 2; without a return keyword, your function yields undefined.",
          "Correct way: return num * 2;",
        ],
        explanation:
          "Explicit returns stop local loops and yield physical memory storage values.",
        testCases: [
          { id: 1, input: [25], expected: 50, description: "Doubles 25 to 50" },
          { id: 2, input: [-4], expected: -8, description: "Doubles -4 to -8" },
        ],
      },
      {
        id: "func-arrow",
        title: "Refactoring to Arrow Function",
        difficulty: "Easy",
        codeSnippet: `const multiply = (x, y) => x * y;`,
        conceptContext:
          "Arrow functions (`const fn = (param) => expression`) are a modern, high-speed way to declare functions in ES6. If you omit the curly braces, the calculated result is returned implicitly without the `return` keyword!",
        description:
          "Write an arrow function named `tripleValue` that takes a single number parameter and returns it multiplied by three. Use the ES6 arrow function syntax with implicit return (no curly braces and no `return` keyword).",
        codeTemplate: `const tripleValue = `,
        functionName: "tripleValue",
        hints: [
          "The arrow function should be structured as: const tripleValue = (num) => num * 3;",
          "Ensure you do not write curly braces or the word return, so that ES6 returns it implicitly.",
        ],
        explanation:
          "Implicit returns in short arrows eliminate function-call clutter and look highly professional in modern codebases.",
        testCases: [
          { id: 1, input: [10], expected: 30, description: "Triples 10 to 30" },
          { id: 2, input: [-3], expected: -9, description: "Triples -3 to -9" },
          { id: 3, input: [0], expected: 0, description: "Triples 0 to 0" },
        ],
      },
      {
        id: "func-logical-operators",
        title: "Secure Access Passcode Gate",
        difficulty: "Easy",
        codeSnippet: `const canPass = (code, isAdmin) => code === 2026 || isAdmin;`,
        conceptContext:
          "Combine multiple rules inside your return statements using logical operators: `&&` (AND), `||` (OR), and `!` (NOT). This avoids complex nested `if` blocks and keeps your functions beautifully clean, returning simple true/false results.",
        description:
          "Write an arrow function `hasAccess(age, hasInvite, hasVipTicket)` that returns `true` if the person is an adult (age `18` or older) AND either has an invitation OR has a VIP ticket. Avoid using `if` or `else` statements — simply return the combined boolean expression containing your logical operators.",
        codeTemplate: `function hasAccess(age, hasInvite, hasVipTicket) {
  // Use logical operators (&&, ||) to check age and credentials together
  
}`,
        functionName: "hasAccess",
        hints: [
          "Check if age is adult: age >= 18",
          "Check credentials: hasInvite || hasVipTicket",
          "Combine them together with AND: (age >= 18) && (hasInvite || hasVipTicket)",
        ],
        explanation:
          "Short-circuiting boolean checking bypasses multi-layer execution logic, returning high-performance answers.",
        testCases: [
          {
            id: 1,
            input: [20, true, false],
            expected: true,
            description: "Adult with invite gets access",
          },
          {
            id: 2,
            input: [25, false, true],
            expected: true,
            description: "Adult with VIP ticket gets access",
          },
          {
            id: 3,
            input: [15, true, true],
            expected: false,
            description: "Underage with invite and VIP ticket is rejected",
          },
          {
            id: 4,
            input: [30, false, false],
            expected: false,
            description: "Adult without any credentials is rejected",
          },
        ],
      },
    ],
  },
  {
    id: "conditionals-logic",
    title: "Conditionals, Switch & Ternaries",
    shortDescription:
      "Master control structures: if-else, switch cases, and ternary operators.",
    longExplanation:
      "Conditions let your application execute different directions of code depending on calculations. Modern JavaScript uses standard if-else blocks, compact conditional (ternary) operators for fast state assignments, and switch statements to handle multiple concrete routes.\n\n- **If / Else**: Executes the first block if true, fallback block if false.\n- **Strict Equality (`===`)**: Always use `===` instead of `==`. The triple-equals verifies that both values are identical in value *and* data type.\n- **Ternary Operator (`? :`)**: A short inline if-else formula: `condition ? value_if_true : value_if_false`.\n- **Switch Case**: Matches an expression value against multiple case clauses.",
    codeSnippet: `// Ternary assignment
const message = isAdult ? "Adult" : "Minor";

// Switch statement
switch (command) {
  case "START":
    return "Running";
  case "STOP":
    return "Idle";
  default:
    return "Unknown";
}`,
    exercises: [
      {
        id: "cond-if",
        title: "Age Greeting Classifier",
        difficulty: "Warm-up",
        codeSnippet: `if (speed > 60) {\n  return "Fast";\n} else {\n  return "Normal";\n}`,
        conceptContext:
          "Use an `if` block to run code when a condition is true, and an `else` block to handle all other fallback conditions.",
        description:
          "Write a function `getAgeGreeting(age)` that takes an age number and returns the string `'Adult'` if the age is `18` or greater, and `'Minor'` if the age is less than `18`.",
        codeTemplate: `function getAgeGreeting(age) {
  // Use if and else statements to test if age is >= 18
  
}`,
        functionName: "getAgeGreeting",
        hints: [
          "Check standard numeric size checks: if (age >= 18) { ... }",
          "Inside the first branch write: return 'Adult'; and in the else branch: return 'Minor';",
        ],
        explanation:
          "Simple logical switches guide basic navigation state filters cleanly.",
        testCases: [
          {
            id: 1,
            input: [20],
            expected: "Adult",
            description: "20 is an adult",
          },
          {
            id: 2,
            input: [15],
            expected: "Minor",
            description: "15 is a minor",
          },
          {
            id: 3,
            input: [18],
            expected: "Adult",
            description: "Boundary check for age 18",
          },
        ],
      },
      {
        id: "cond-strict",
        title: "Strict Identity Comparison",
        difficulty: "Warm-up",
        codeSnippet: `console.log("5" === 5); // false (different types!)`,
        conceptContext:
          "Always favor strict equality `===` (triple-equals) inside modern programs. The weak matcher `==` auto-converts types behind your back (e.g., `'5' == 5` is true), which causes hidden, nasty bugs.",
        description:
          "Write a function `isIdentical(a, b)` that returns `true` if parameters `a` and `b` are exactly equal both in value and type using modern strict identity.",
        codeTemplate: `function isIdentical(a, b) {
  // Compare values using strict triple equality
  
}`,
        functionName: "isIdentical",
        hints: [
          "Check strictly with: a === b;",
          "Do not use == (double-equals).",
        ],
        explanation:
          "Strict identity === avoids browser type-coercion bypass vulnerabilities.",
        testCases: [
          {
            id: 1,
            input: ["hello", "hello"],
            expected: true,
            description: "Identical strings match",
          },
          {
            id: 2,
            input: ["5", 5],
            expected: false,
            description:
              "Prevents string and integer false equivalence matches",
          },
        ],
      },
      {
        id: "cond-ternary",
        title: "Inline Ternary Operator",
        difficulty: "Easy",
        codeSnippet: `const state = count > 0 ? "Active" : "Empty";`,
        conceptContext:
          "The ternary operator (`condition ? val1 : val2`) is a concise way to pick between two outcomes. It is extensively used in modern frontend development (such as React rendering elements conditionally).",
        description:
          "Write a function `checkAccessCode(entered, correct)` that returns `'Access Granted'` if the entered code is exactly equal to the correct code, and `'Access Denied'` otherwise. You MUST use a single ternary operator inside your return statement.",
        codeTemplate: `function checkAccessCode(entered, correct) {
  // Return a single conditional (ternary) expression
  
}`,
        functionName: "checkAccessCode",
        hints: [
          "Check equality: entered === correct",
          "Synthesize with the ternary: return entered === correct ? 'Access Granted' : 'Access Denied';",
        ],
        explanation:
          "Ternary shorthand reduces line nesting and keeps React state declarations neat.",
        testCases: [
          {
            id: 1,
            input: [2026, 2026],
            expected: "Access Granted",
            description: "Matching access codes grant entry",
          },
          {
            id: 2,
            input: [1234, 5678],
            expected: "Access Denied",
            description: "Mismatched access codes deny entry",
          },
        ],
      },
      {
        id: "cond-switch",
        title: "Action Dispatch Router",
        difficulty: "Easy",
        codeSnippet: `switch (action) {\n  case "PLAY": return "Playing";\n  default: return "Stopped";\n}`,
        conceptContext:
          "When dealing with multiple exact value comparisons (like menu options, action keys, or command logs), a nested structure of `if / else if` can look messy. A `switch` statement maps specific conditions to their corresponding results cleanly.",
        description:
          "Write a function `getSystemStatus(phase)` that takes a string of system states (`'INIT'`, `'RUNNING'`, `'PAUSED'`) and returns a translated feedback line:\\n- `'INIT'` returns `'System is starting up.'`\\n- `'RUNNING'` returns `'System is fully operational.'`\\n- `'PAUSED'` returns `'System is temporarily on hold.'`\\n- If it doesn't match any of these (default), it must return `'Unknown status.'`\\nUse a `switch` statement inside your function.",
        codeTemplate: `function getSystemStatus(phase) {
  // Implement a switch-case router for the 'phase' parameter
  
}`,
        functionName: "getSystemStatus",
        hints: [
          "Use: switch (phase) { ... }",
          "Provide distinct: case 'INIT': return 'System is starting up.';",
          "Make sure to add: default: return 'Unknown status.';",
        ],
        explanation:
          "Switch case actions map router events cleanly and avoid complex branch logic conditions.",
        testCases: [
          {
            id: 1,
            input: ["INIT"],
            expected: "System is starting up.",
            description: "INIT status maps correctly",
          },
          {
            id: 2,
            input: ["RUNNING"],
            expected: "System is fully operational.",
            description: "RUNNING status maps correctly",
          },
          {
            id: 3,
            input: ["PAUSED"],
            expected: "System is temporarily on hold.",
            description: "PAUSED status maps correctly",
          },
          {
            id: 4,
            input: ["UNKNOWN_XYZ"],
            expected: "Unknown status.",
            description: "Default status catches fallback cases",
          },
        ],
      },
    ],
  },
  {
    id: "strings-basics",
    title: "Strings & Simple Properties",
    shortDescription:
      "Learn how to query text sizes, normalize casing, and combine words.",
    longExplanation:
      "Strings represent text logs inside your programs. Learning how to search details, join text parts, and capitalize words forms the backbone of UI forms and interactive layouts.\n\n- **String Length**: Call `.length` directly on any string to see how many characters it contains (e.g. `'abc'.length` is `3`).\n- **Accessing Indices**: Grab individual characters at particular zero-based offsets using standard bracket coordinates: `text[0]` is the very first character.\n- **Case Changes**: Easily lowercase text using `.toLowerCase()` or uppercase it using `.toUpperCase()`.",
    codeSnippet: `const label = "Vite App";
console.log(label.length); // 8
console.log(label[0]); // "V"
console.log(label.toLowerCase()); // "vite app"`,
    exercises: [
      {
        id: "str-length",
        title: "Text Length Calculator",
        difficulty: "Warm-up",
        codeSnippet: `const charCount = "hello".length; // 5`,
        conceptContext:
          "The `.length` property of a string counts every individual character in a string, including empty spacing boundaries and formatting characters.",
        description:
          "Write a function `getStringLength(text)` that returns the total character count of the input parameter `text` string.",
        codeTemplate: `function getStringLength(text) {
  // Return the string length count
  
}`,
        functionName: "getStringLength",
        hints: [
          "Do not call .length as a function (e.g. text.length() will execute a crash check). It is a property, so write: text.length;",
        ],
        explanation:
          "Monitoring input lengths ensures user names fit within profile database bounds.",
        testCases: [
          {
            id: 1,
            input: ["JavaScript"],
            expected: 10,
            description: "JavaScript has 10 characters",
          },
          {
            id: 2,
            input: ["hello world"],
            expected: 11,
            description: "Space boundaries are included in the length counts",
          },
        ],
      },
      {
        id: "str-index-char",
        title: "First Character Extractor",
        difficulty: "Warm-up",
        codeSnippet: `const first = "React"[0]; // "R"`,
        conceptContext:
          "JavaScript strings are indexed starting from position zero `0`. To find the first letter of any text, query `text[0]`.",
        description:
          "Write a function `getFirstChar(text)` that takes a string and returns the first character from the string. Return `null` if the string is empty.",
        codeTemplate: `function getFirstChar(text) {
  // Return the very first character of the text, or null if the string is empty
  
}`,
        functionName: "getFirstChar",
        hints: [
          "Check whether the text size is empty first using: if (text.length === 0)",
          "Grab index coordinates inside brackets: text[0];",
        ],
        explanation:
          "Querying index numbers allows reading elements from primitive strings immediately.",
        testCases: [
          {
            id: 1,
            input: ["Vite"],
            expected: "V",
            description: "First character of Vite is V",
          },
          {
            id: 2,
            input: ["a"],
            expected: "a",
            description: "Handles single characters perfectly",
          },
          {
            id: 3,
            input: [""],
            expected: null,
            description: "Correctly handles empty parameter values",
          },
        ],
      },
    ],
  },
  {
    id: "foreach-callbacks",
    title: ".forEach() List Iteration",
    shortDescription:
      "Master side-effects, manual accumulation, and array scanning via .forEach() loops.",
    longExplanation:
      "The `.forEach()` method executes a provided callback function once for each array element. Unlike `.map()` or `.filter()`, it returns `undefined` and is used strictly to execute side-effects, such as mutating outer variables, logging info, or updating database collections.\n\n- **No New Array**: `.forEach()` does not generate or return a new list. It operates on the existing data or triggers outside actions.\n- **Parameters**: The callback receives the standard (element, index, originalArray) trio.",
    codeSnippet: `const scores = [10, 20, 30];
let sum = 0;
scores.forEach(num => { sum += num; });
console.log(sum); // 60`,
    exercises: [
      {
        id: "foreach-sum",
        title: "Manual Sum Accumulator",
        difficulty: "Warm-up",
        codeSnippet: `let total = 0;\n[1, 2, 3].forEach(n => total += n); // total is 6`,
        conceptContext:
          "While standard for-loops scan indices, `.forEach()` cleanly feeds element values directly into external tracker variables sequentially.",
        description:
          "Let's master basic side effects! Write a function `accumulateSum(nums)` that initializes a running sum variable at 0. Use `.forEach()` to iterate over `nums` and add each number to the running sum, then return the final sum.",
        codeTemplate: `function accumulateSum(nums) {
  let sum = 0;
  // Use .forEach() to add each number to sum
  
  return sum;
}`,
        functionName: "accumulateSum",
        hints: [
          "Call nums.forEach(num => { ... })",
          "Inside the callback, write: sum += num;",
          "Return the variable sum after the loop finishes.",
        ],
        explanation:
          "Manual state aggregation using local tracker variables is a robust pattern for custom list calculations.",
        testCases: [
          {
            id: 1,
            input: [[2, 4, 6]],
            expected: 12,
            description: "Sums standard positives correctly",
          },
          {
            id: 2,
            input: [[]],
            expected: 0,
            description: "Handles empty array elements",
          },
        ],
      },
      {
        id: "foreach-average",
        title: "Running List Average",
        difficulty: "Warm-up",
        codeSnippet: `let sum = 0;\n[2, 4].forEach(n => sum += n);\nconst avg = sum / 2; // 3`,
        conceptContext:
          "Building on manual sums, we can find average sizes by accumulating sum and checking lengths directly.",
        description:
          "Write a function `calculateAverage(nums)` that finds the numerical average of `nums` using `.forEach()`. If the array is empty, return `0` directly.",
        codeTemplate: `function calculateAverage(nums) {
  if (nums.length === 0) return 0;
  let runningSum = 0;
  // Use .forEach() to find sum, then divide by elements length
  
}`,
        functionName: "calculateAverage",
        hints: [
          "Test if nums.length is 0. If so, return 0.",
          "Perform nums.forEach(v => runningSum += v).",
          "Return runningSum / nums.length",
        ],
        explanation:
          "Combining counts with aggregated sums compiles simple average stats smoothly.",
        testCases: [
          {
            id: 1,
            input: [[10, 20, 30]],
            expected: 20,
            description: "Computes positive numbers average cleanly",
          },
          {
            id: 2,
            input: [[]],
            expected: 0,
            description: "An empty array returns 0 safely",
          },
        ],
      },
      {
        id: "foreach-log-string",
        title: "Log Statement Concatenator",
        difficulty: "Warm-up",
        codeSnippet: `let log = "";\n["A", "B"].forEach((char, i) => {\n  log += (i > 0 ? ", " : "") + char;\n}); // "A, B"`,
        conceptContext:
          "Dynamic string assembly utilizing active index locations lets you form custom comma-separated log structures on top of lists.",
        description:
          "Write a function `buildLogString(events)` that loops over an array of event strings using `.forEach()`. It should return a single concatenated string where each event is separated by `' | '`. If the array is empty, return an empty string `\"\"`.",
        codeTemplate: `function buildLogString(events) {
  let result = "";
  // Concatenate events using .forEach() with a ' | ' separator
  
  return result;
}`,
        functionName: "buildLogString",
        hints: [
          "Use the optional index parameter in .forEach((evt, idx) => { ... })",
          "If idx === 0, assign result = evt; otherwise, result += ' | ' + evt;",
        ],
        explanation:
          "Index checking avoids trailing delimiters in custom text files and log streams.",
        testCases: [
          {
            id: 1,
            input: [["Login", "Click", "Logout"]],
            expected: "Login | Click | Logout",
            description: "Accurately connects list items using custom pipes",
          },
          {
            id: 2,
            input: [[]],
            expected: "",
            description: "Returns empty string for empty input data lists",
          },
        ],
      },
      {
        id: "foreach-add-property",
        title: "Mutating Object List Registrar",
        difficulty: "DSA Easy",
        codeSnippet: `const users = [{ name: "A" }];\nusers.forEach((u, i) => u.id = i);\n// users is [{ name: "A", id: 0 }]`,
        conceptContext:
          "Because javascript copies object references, mutating properties inside a `.forEach()` iteration modifies the original objects directly.",
        description:
          "In full-stack architectures, updating object arrays with identifiers ensures relational integrity. Write a function `registerInboundUsers(users, baseID)` that iterates through an array of user objects and assigns each object an `accountID` property computed as `baseID + index`.",
        codeTemplate: `function registerInboundUsers(users, baseID) {
  // Mutate each user object by attaching an accountID computed via baseID + index
  
  return users;
}`,
        functionName: "registerInboundUsers",
        hints: [
          "Call users.forEach((user, index) => { ... })",
          "Inside the loop, assign: user.accountID = baseID + index;",
          "Return the modified 'users' array.",
        ],
        explanation:
          "Reference mutations directly inside lists enrich active row variables in-place without copying overhead.",
        testCases: [
          {
            id: 1,
            input: [[{ name: "Alice" }, { name: "Bob" }], 1000],
            expected: [
              { name: "Alice", accountID: 1000 },
              { name: "Bob", accountID: 1001 },
            ],
            description: "Assigns incremental IDs from a base integer offset",
          },
        ],
      },
      {
        id: "foreach-classify",
        title: "List Element Classifier",
        difficulty: "DSA Easy",
        codeSnippet: `const scores = [80, 50];\nconst pass = [], fail = [];\nscores.forEach(s => s >= 60 ? pass.push(s) : fail.push(s));`,
        conceptContext:
          "Pushing elements into completely separate external arrays compiles multi-bucket categories without modifying the original database arrays.",
        description:
          "Let's perform a bulk classification. Write a function `classifyScores(scores, threshold)` that splits a flat list of test scores into two separate arrays inside a return object: `passed` (scores >= threshold) and `failed` (scores < threshold). Return the resulting classification object.",
        codeTemplate: `function classifyScores(scores, threshold) {
  const passed = [];
  const failed = [];
  // Loop over scores and classify intopassed and failed baskets
  
  return { passed, failed };
}`,
        functionName: "classifyScores",
        hints: [
          "Loop over scores: scores.forEach(score => ...)",
          "Use condition: if (score >= threshold) passed.push(score); else failed.push(score);",
        ],
        explanation:
          "Multi-destination pushing sorts raw arrays into multi-bucket categories highly productively.",
        testCases: [
          {
            id: 1,
            input: [[85, 45, 90, 60], 70],
            expected: { passed: [85, 90], failed: [45, 60] },
            description:
              "Dispatches scores into success and failure buckets cleanly",
          },
        ],
      },
      {
        id: "foreach-frequency",
        title: "Frequency Map Generator",
        difficulty: "DSA Easy",
        codeSnippet: `const tally = {};\n["a", "b", "a"].forEach(char => {\n  tally[char] = (tally[char] || 0) + 1;\n}); // { a: 2, b: 1 }`,
        conceptContext:
          "Initializing missing keys to zero before incrementing counts compiles frequency profiles or lookup map directories.",
        description:
          "Write a function `buildFrequencyTally(items)` that returns an object tallying frequency counts. Use `.forEach()` to record how many times each string item appears in the array.",
        codeTemplate: `function buildFrequencyTally(items) {
  const tally = {};
  // Use .forEach() to count occurrences of each item in tally
  
  return tally;
}`,
        functionName: "buildFrequencyTally",
        hints: [
          "Iterate over items: items.forEach(item => { ... })",
          "Check tally[item]: tally[item] = (tally[item] || 0) + 1;",
        ],
        explanation:
          "Frequency dictionaries are standard for ranking search keywords and word statistics.",
        testCases: [
          {
            id: 1,
            input: [["apple", "banana", "apple"]],
            expected: { apple: 2, banana: 1 },
            description: "Tallies repeated word strings accurately",
          },
          {
            id: 2,
            input: [[]],
            expected: {},
            description: "Yields empty object for empty parameters",
          },
        ],
      },
      {
        id: "foreach-match-index",
        title: "Parity Positional Scaler",
        difficulty: "DSA Easy",
        codeSnippet: `const list = [10, 20, 30];\nlist.forEach((val, i, arr) => {\n  if (i % 2 === 0) arr[i] = val * 5;\n}); // [50, 20, 150]`,
        conceptContext:
          "Since the callback provides the original array reference, we can mutate or replace values at targeted locations directly inside the loop.",
        description:
          "Write a function `scaleEvenIndices(nums)` that takes an array of numbers and multiplies each element located at **even index positions** (0, 2, 4...) by `10`. Return the original modified array.",
        codeTemplate: `function scaleEvenIndices(nums) {
  // Use the third parameter of .forEach callback (the original array) to mutate in-place
  
  return nums;
}`,
        functionName: "scaleEvenIndices",
        hints: [
          "Invoke .forEach((val, index, array) => { ... })",
          "If index is even (index % 2 === 0), write: array[index] = val * 10;",
        ],
        explanation:
          "In-place modifications of arrays using indexing maps sequences efficiently without auxiliary allocations.",
        testCases: [
          {
            id: 1,
            input: [[1, 2, 3, 4, 5]],
            expected: [10, 2, 30, 4, 50],
            description: "Scales indices 0, 2, and 4 in-place cleanly",
          },
        ],
      },
      {
        id: "foreach-dom-emulation",
        title: "Simulated HTML Attributes Hydrator",
        difficulty: "DSA Easy",
        codeSnippet: `const elements = [{ tag: "p" }];\nelements.forEach(el => el.class = "lead");\n// elements has class set`,
        conceptContext:
          "Frontend state hydration relies on scanning nodes to configure custom stylesheet or configuration options before drawing them.",
        description:
          "Let's simulate standard browser UI setup. Write a function `hydrateDOMNodes(nodes, globalTheme)` that processes a list of mock DOM nodes `{ tag, classes: [] }`. It should append `globalTheme` into each node's `classes` array, and if the node represents a `'button'`, also add an `'btn-active'` class. Return the updated array.",
        codeTemplate: `function hydrateDOMNodes(nodes, globalTheme) {
  // Iterate and modify lists of node classes in place
  
  return nodes;
}`,
        functionName: "hydrateDOMNodes",
        hints: [
          "Loop over each node block using node.forEach(n => ...)",
          "Push globalTheme to n.classes.",
          "Check tag, push 'btn-active' to n.classes if tag matches 'button'.",
        ],
        explanation:
          "Mocking node setups before writing UI components is practical in SPA component designs.",
        testCases: [
          {
            id: 1,
            input: [
              [
                { tag: "div", classes: ["flex"] },
                { tag: "button", classes: [] },
              ],
              "dark-mode",
            ],
            expected: [
              { tag: "div", classes: ["flex", "dark-mode"] },
              { tag: "button", classes: ["dark-mode", "btn-active"] },
            ],
            description:
              "Applies themes and specialized class conditions correctly",
          },
        ],
      },
      {
        id: "foreach-nested-sum",
        title: "Matrix Flat-Sum Calculator",
        difficulty: "DSA Medium",
        codeSnippet: `let total = 0;\n[[1], [2, 3]].forEach(row => {\n  row.forEach(num => total += num);\n}); // total is 6`,
        conceptContext:
          "When dealing with multi-dimensional grids, nesting `.forEach()` handlers inside each other parses multi-level numbers perfectly.",
        description:
          "Write a function `sumMatrix(matrix)` that calculates the grand total of all numbers inside a 2D grid matrix of numbers using nested `.forEach()` loops.",
        codeTemplate: `function sumMatrix(matrix) {
  let grandTotal = 0;
  // Use nested .forEach() loops to sum each item in matrix
  
  return grandTotal;
}`,
        functionName: "sumMatrix",
        hints: [
          "The outer .forEach() takes a row: matrix.forEach(row => { ... })",
          "Inside it, write: row.forEach(val => grandTotal += val);",
        ],
        explanation:
          "Traversing grid arrays is straightforward when sequential inner-loop offsets execute row-by-row.",
        testCases: [
          {
            id: 1,
            input: [[[1, 2], [3], [4, 5]]],
            expected: 15,
            description: "Sums arbitrary dimensions correctly",
          },
        ],
      },
      {
        id: "foreach-pipeline",
        title: "Dynamic Processing Pipeline",
        difficulty: "DSA Medium",
        codeSnippet: `const state = { value: 10 };\nconst pipeline = [v => v + 2, v => v * 3];\npipeline.forEach(fn => {\n  state.value = fn(state.value);\n}); // state.value is 36`,
        conceptContext:
          "A pipeline is an array of functions. Using `.forEach()` to iterate over functions and apply them to a single state builds customizable transformer engines.",
        description:
          "Create a data validation compiler! Write a function `runPipeline(input, steps)` that takes an initial input value and an array of helper transformer functions `steps`. Iterate over the functions and pipe the output of each function as the input to the next. Return the final transformed value.",
        codeTemplate: `function runPipeline(input, steps) {
  let currentVal = input;
  // Use .forEach() to pipe currentVal through each step function
  
  return currentVal;
}`,
        functionName: "runPipeline",
        hints: [
          "Loop over steps: steps.forEach(func => { ... })",
          "Inside the loop, update currentVal: currentVal = func(currentVal);",
        ],
        explanation:
          "Function arrays act as dynamic middleware filters inside compilers and web routing architectures.",
        testCases: [
          {
            id: 1,
            input: [5, [(x) => x + 3, (x) => x * 2, (x) => x - 1]],
            expected: 15,
            description: "Executes pipeline step sequence in correct order",
          },
        ],
      },
    ],
  },
  {
    id: "map-callbacks",
    title: ".map() Callback Transform",
    shortDescription:
      "Learn how to transform every item in an array to create a brand new list.",
    longExplanation:
      "The `.map()` method is like a machine that takes an array and runs a function on every item inside it, one by one. It then gives you a brand-new array with all the updated values.\n\n- **Never Changes the Original**: The original array stays exactly the same. You always get a clean, new list back.\n- **Optional Info**: Inside your function, you can optionally access not just the current item, but also its position index and the entire original array.",
    codeSnippet: `// Example: Modern string sanitization using array mapping
const rawTags = ["  JavaScript ", " es6  ", " React  js "];
const cleanTags = rawTags.map(tag => tag.trim().toUpperCase());

console.log(cleanTags); // ["JAVASCRIPT", "ES6", "REACT  JS"]
console.log(rawTags);   // ["  JavaScript ", " es6  ", " React  js "] (remains unmodified)`,
    exercises: [
      {
        id: "map-trim-upper",
        title: "Clean Word Sanitizer",
        difficulty: "Warm-up",
        codeSnippet: `// Example Use Case: Clean trimming and casing
const raw = [" hello ", " world "];
const formatted = raw.map(str => str.trim().toUpperCase());
// ["HELLO", "WORLD"]`,
        conceptContext:
          "In JavaScript, strings have built-in methods like `.trim()` (removes whitespace from ends) and `.toUpperCase()` (makes text CAPITAL).\n\n💡 **Learn By Comparison: `.map()` vs `.forEach()`**:\n• Use `.map()` when you want to **transform** an array into a new one (it returns a new array of the same length).\n• Use `.forEach()` solely to **run side-effects** (like logging to console or pushing to an existing array) without returning anything.",
        description:
          "In JS, strings often contain messy formatting from input forms.\n\nWrite a function `cleanStrings(arr)` that takes an array of strings. It should use `.map()` to return a new array where each string has been trimmed of leading/trailing whitespaces and converted to uppercase.",
        codeTemplate: `function cleanStrings(arr) {
  // Use .map() to return clean, standardized uppercase terms
  
}`,
        functionName: "cleanStrings",
        hints: [
          "Call .map() on the input array 'arr'.",
          "For each element, call .trim() to clean whitespace.",
          "Chain .toUpperCase() after .trim() to change capitalization.",
        ],
        explanation:
          "Simple layout transformations using chainable standard string utility filters on map closures.",
        testCases: [
          {
            id: 1,
            input: [[" alpha ", "  beta  ", "gamma"]],
            expected: ["ALPHA", "BETA", "GAMMA"],
            description: "Standardized spacing and casing correctly",
          },
          {
            id: 2,
            input: [["test"]],
            expected: ["TEST"],
            description: "Simple single word check",
          },
        ],
      },
      {
        id: "map-fahrenheit-to-celsius",
        title: "Temperature Scale Transformer",
        difficulty: "Warm-up",
        codeSnippet: `const celsius = [32, 68].map(f => Math.round((f - 32) * 5 / 9)); // [0, 20]`,
        conceptContext:
          "To convert Fahrenheit temperatures to Celsius mathematically, use the formula: C = (F - 32) * 5/9. Running this calculation across arrays maps whole datasets instantly.",
        description:
          "You are working on a weather dashboard that aggregates temperature readings. Write a function `convertFToC(tempsF)` that maps an array of Fahrenheit temperatures into an array of equivalent Celsius temperatures. Round each resulting Celsius temperature to the nearest integer using Math.round().",
        codeTemplate: `function convertFToC(tempsF) {
  // Use .map() to convert Fahrenheit to Celsius and round each reading
  
}`,
        functionName: "convertFToC",
        hints: [
          "Apply .map() on tempsF.",
          "For each temp, compute (temp - 32) * 5 / 9.",
          "Be sure to wrap the calculation in Math.round() to return nice integers.",
        ],
        explanation:
          "Temperature data normalization handles device variation before presenting metric visualizer grids.",
        testCases: [
          {
            id: 1,
            input: [[32, 68, 104]],
            expected: [0, 20, 40],
            description:
              "Standard atmospheric conversions are mathematically sound",
          },
          {
            id: 2,
            input: [[-40, 50]],
            expected: [-40, 10],
            description: "Handles sub-zero boundary points smoothly",
          },
        ],
      },
      {
        id: "map-domain-emails",
        title: "Email Domain Standardizer",
        difficulty: "Warm-up",
        codeSnippet: `const emails = ["user1", "user2"].map(u => \`\${u}@company.com\`.toLowerCase());`,
        conceptContext:
          "Standardizing raw text records by appending fixed strings inside a mapping callback is common when formatting user details or system URLs.",
        description:
          "A school needs to generate corporate email addresses for new students. Write a function `generateEmails(usernames, domain)` that takes an array of usernames and a domain string (like 'school.edu'). It should return a new array where each username is appended with '@' and the domain name, all in lowercase.",
        codeTemplate: `function generateEmails(usernames, domain) {
  // Use .map() and template literals to append the lowercase domain
  
}`,
        functionName: "generateEmails",
        hints: [
          "Call .map() on usernames.",
          "Convert each username to lowercase and use template literals to concatenate '@' + domain inside the string.",
          "Be sure to call .toLowerCase() on the final built string to ensure standardized lowercase email records.",
        ],
        explanation:
          "Automating system record standardizations saves manual database update overhead.",
        testCases: [
          {
            id: 1,
            input: [["Alice", "BobSmith", "charlie"], "School.edu"],
            expected: [
              "alice@school.edu",
              "bobsmith@school.edu",
              "charlie@school.edu",
            ],
            description: "Correctly builds standard educational email domains",
          },
        ],
      },
      {
        id: "map-word-lengths",
        title: "Sentence Word Length Matrix",
        difficulty: "Warm-up",
        codeSnippet: `const lengths = "hi world".split(" ").map(w => w.length); // [2, 5]`,
        conceptContext:
          "Splitting a sentence string into individual word tokens allows you to map structures like word sizes for text visualization and wrap bounds.",
        description:
          "Write a function `getWordLengths(sentence)` that takes a sentence string. It should split the sentence by spaces into words, and then map those words to return a new array containing the character length of each word. If the sentence is an empty string, return an empty array [].",
        codeTemplate: `function getWordLengths(sentence) {
  // 1. Guard check for empty sentence
  // 2. Split sentence by space elements into an array of words
  // 3. Map word tokens to their corresponding lengths
  
}`,
        functionName: "getWordLengths",
        hints: [
          "Test if the sentence is an empty string, returning [] if so.",
          "Use sentence.split(' ') to split by single spaces.",
          "Map each word to its word.length properties.",
        ],
        explanation:
          "Casing and size metrics feed into adaptive natural language parsers beautifully.",
        testCases: [
          {
            id: 1,
            input: ["Learn JavaScript code"],
            expected: [5, 10, 4],
            description: "Returns individual lengths for multi-word strings",
          },
          {
            id: 2,
            input: ["  "],
            expected: [0, 0, 0],
            description: "Handles space divisions seamlessly",
          },
          {
            id: 3,
            input: [""],
            expected: [],
            description: "Handles empty string boundaries",
          },
        ],
      },
      {
        id: "map-scale-parity",
        title: "Position-Based Scalar Selector",
        difficulty: "DSA Easy",
        codeSnippet: `// Example Use Case: Accessing element index in .map()
const names = ["Alice", "Bob"];
const positionText = names.map((name, index) => \`\${index + 1}: \${name}\`);
// ["1: Alice", "2: Bob"]`,
        conceptContext:
          "The callback passed to `.map()` receives three arguments: the current element value, its index (zero-based position), and the original array.",
        description:
          "Now that you can map simple primitives, let's inject the optional element *index* parameters inside mapping callbacks!\n\nWrite a function `scaleByIndex(nums)` that transforms an array of integers utilizing this condition logic:\n- If the element value is **even**, return its value doubled (`val * 2`).\n- If the element value is **odd**, return its value multiplied by its current *element index* in the array (`val * index`).",
        codeTemplate: `function scaleByIndex(nums) {
  // Use the optional index parameter in your callback: .map((val, index) => ...)
  
}`,
        functionName: "scaleByIndex",
        hints: [
          "Include both parameters inside mapping callbacks: .map((num, i) => ...)",
          "Determine if 'num' is even with modulus operator: num % 2 === 0.",
          "Multiply odd numbers by their index value 'i', keeping even values multiplied by 2.",
        ],
        explanation:
          "Callback mapping handles multi-variable contexts such as matching arrays to their physical positional index values.",
        testCases: [
          {
            id: 1,
            input: [[10, 3, 5, 2]],
            expected: [20, 3, 10, 4],
            description: "Check mixed even and odd values with indices",
          },
          {
            id: 2,
            input: [[1, 1, 1]],
            expected: [0, 1, 2],
            description: "Pure odd arrays scaled strictly by indices",
          },
        ],
      },
      {
        id: "map-html-tags",
        title: "HTML List Tag Wrapper",
        difficulty: "DSA Easy",
        codeSnippet: `const tags = ["App", "Code"].map((val, idx) => \`<li id="\${idx}">\${val}</li>\`);`,
        conceptContext:
          "Wrapping dynamic raw data in structured HTML tag templates using index locations is how lists, tables, and trees are built inside modern frontend frameworks.",
        description:
          'Let\'s build a mini HTML list renderer! Write a function `wrapInListTags(items)` that takes an array of text labels. It should use `.map()` to return an array of HTML list string templates, wrapping each item in an <li> tag. Each tag should contain a unique id attribute matching its zero-based index in the array, like this: <li id="idx">value</li>.',
        codeTemplate: `function wrapInListTags(items) {
  // Use map's element index parameter to return template-escaped list items
  
}`,
        functionName: "wrapInListTags",
        hints: [
          "Pass a callback with two parameters: (item, idx).",
          'Return formatted string: `<li id="${idx}">${item}</li>` using backticks.',
        ],
        explanation:
          "Dynamic frontend templates are hydrated directly using element array indices for reliable browser reconciliation.",
        testCases: [
          {
            id: 1,
            input: [["Home", "Dashboard", "Settings"]],
            expected: [
              '<li id="0">Home</li>',
              '<li id="1">Dashboard</li>',
              '<li id="2">Settings</li>',
            ],
            description:
              "Yields clean HTML tags synchronized with active indices",
          },
        ],
      },
      {
        id: "map-extract-totals",
        title: "Cart Item Value Auditor",
        difficulty: "DSA Easy",
        codeSnippet: `const cart = [{ price: 10, qty: 2 }];\nconst totals = cart.map(item => item.price * item.qty);`,
        conceptContext:
          "E-commerce lists contain multiple product records. Computing line-item totals (price * quantity) transforms object collections into simple transaction streams.",
        description:
          "For a shopping cart analytics service, write a function `computeItemTotals(items)` that takes an array of objects representing items in a cart: { name, price, quantity }.\n\nIt should return a new array containing the total price value computed for each cart item (price * quantity).",
        codeTemplate: `function computeItemTotals(items) {
  // Map our object array into a single simple array of numbers
  
}`,
        functionName: "computeItemTotals",
        hints: [
          "Extract price and quantity from each item using dot notation or destructuring.",
          "Compute total = price * quantity inside .map().",
          "Return the calculated numbers array.",
        ],
        explanation:
          "Line-item computations are mapped prior to calculating global grand totals or tax rates.",
        testCases: [
          {
            id: 1,
            input: [
              [
                { name: "Book", price: 15, quantity: 2 },
                { name: "Pen", price: 2, quantity: 10 },
              ],
            ],
            expected: [30, 20],
            description: "Accurately computes line-item dollar totals",
          },
        ],
      },
      {
        id: "map-user-profiles",
        title: "Structured Profiles Extractor",
        difficulty: "DSA Easy",
        codeSnippet: `// Example Use Case: Transforming arrays of objects
const members = [{ name: "Alice", active: true }, { name: "Bob", active: false }];
const profiles = members.map(m => ({ username: m.name, status: m.active ? "Online" : "Offline" }));`,
        conceptContext:
          "Mapping is extremely useful for transforming arrays of objects. Code inside the map callback returns a brand-new structured object literal.",
        description:
          "Let's level up from primitive numbers and strings by transforming nested Objects!\n\nWrite a function `extractAges(users)` that takes an array of user profile objects with the structure: `{ name, birthYear }`.\n\nIt should return a new array containing objects formatted as: `{ username: name, age: currentAge }` where `currentAge` is calculated relative to the reference year **2026** (i.e. `2026 - birthYear`).",
        codeTemplate: `function extractAges(users) {
  // Map our list of profile objects to a clean simplified format
  
}`,
        functionName: "extractAges",
        hints: [
          "Pass an object inside the map callback, e.g. .map(user => ...)",
          "Extract properties: user.name and user.birthYear.",
          "Return a brand new object: { username: ..., age: ... }",
        ],
        explanation:
          "Filtering and reshaping complex key objects into simple payloads is a highly repeated practice in server requests.",
        testCases: [
          {
            id: 1,
            input: [
              [
                { name: "Alice", birthYear: 1996 },
                { name: "Bob", birthYear: 2002 },
              ],
            ],
            expected: [
              { username: "Alice", age: 30 },
              { username: "Bob", age: 24 },
            ],
            description: "Computes ages correctly relative to year 2026",
          },
        ],
      },
      {
        id: "map-diff-bounds",
        title: "Peak Normalized Distance Matrix",
        difficulty: "DSA Easy",
        codeSnippet: `// Example Use Case: Mapping with array-wide dynamic helpers
const grades = [80, 95, 70];
const maxGrade = Math.max(...grades); // 95
const gaps = grades.map(g => maxGrade - g);
// [15, 0, 25]`,
        conceptContext:
          "To map arrays relative to their global structure, query global variables or helpers first. For instance, use spread parameters with math helpers to discover the largest number in a dataset.",
        description:
          "Sometimes, before performing `.map()`, you need to calculate some collective metrics on the array.\n\nWrite a function `peakNormalize(nums)` that finds the absolute maximum value (the highest peak) in `nums`, and then returns a new array where each element `x` is replaced by its absolute difference from that maximum value (`Math.abs(peak - x)`).",
        codeTemplate: `function peakNormalize(nums) {
  // 1. Calculate the maximum value (peak) in the array using Math.max()
  // 2. Use .map() to calculate the distance of each element from that peak
  
}`,
        functionName: "peakNormalize",
        hints: [
          "Find the highest element inside your array using Math.max(...nums).",
          "Map each value by finding its absolute distance using Math.abs(peak - x).",
          "Remember that .map() does not alter the original array.",
        ],
        explanation:
          "Array transformations are highly responsive when utilizing aggregated dataset characteristics like average or minimum/maximum bounds first.",
        testCases: [
          {
            id: 1,
            input: [[2, 10, 6]],
            expected: [8, 0, 4],
            description: "Calculates offsets based on maximum peak (10)",
          },
          {
            id: 2,
            input: [[-5, -10, -1]],
            expected: [4, 9, 0],
            description: "Verifies negative peaks function seamlessly",
          },
        ],
      },
      {
        id: "map-coordinates",
        title: "Grid Coordinates Flat-Mapper",
        difficulty: "DSA Medium",
        codeSnippet: `// Example Use Case: Converting 2D grid coordinates to 1D indexes
const gridNodes = [{ r: 0, c: 5 }, { r: 2, c: 1 }];
const itemWidth = 10;
const linearOffsets = gridNodes.map(n => n.r * itemWidth + n.c);
// [5, 21]`,
        conceptContext:
          "In graphics processors and pathfinding engines, multidimensional coordinates are compressed into high-speed 1D flat lines with linear calculations.",
        description:
          "To complete the `.map()` sequence, let's solve a real graphics lookup equation.\n\nWrite a function `flattenCoordinates(nodes, width)` that processes a list of coordinate objects. Each node contains `{ r, c }` (representing rows and columns in a 2D grid matrix of size `width`).\n\nYour task is to map this coordinate array into an array of flat 1D linear indexes using the formula: `index = row * width + column`.",
        codeTemplate: `function flattenCoordinates(nodes, width) {
  // Map row/col details to direct linear storage offsets
  
}`,
        functionName: "flattenCoordinates",
        hints: [
          "Extract r (row) and c (column) variables from the node object.",
          "Multiply row index 'r' by 'width', then add column index 'c'.",
          "Return array of converted linear numbers.",
        ],
        explanation:
          "In discrete graphics software and path searches, high speed multi-dimensional data stores are optimized by flattening layouts to linear indices.",
        testCases: [
          {
            id: 1,
            input: [
              [
                { r: 0, c: 5 },
                { r: 2, c: 1 },
              ],
              10,
            ],
            expected: [5, 21],
            description: "Computes 1D grid mappings accurately for width 10",
          },
          {
            id: 2,
            input: [[{ r: 1, c: 0 }], 4],
            expected: [4],
            description: "Computes single index bounds correctly",
          },
        ],
      },
    ],
  },
  {
    id: "filter-callbacks",
    title: ".filter() Selection Controls",
    shortDescription:
      "Keep only the items in an array that match a specific condition or rule.",
    longExplanation:
      "The `.filter()` method lets you screen an array and pick out only the elements you want. It runs a test function on each item: if the item passes the test (returns `true`), it gets added to the new array. If not, it is left behind.\n\n- **Keeps the Original Safe**: Just like `.map()`, it won't change your original array. It just returns a fresh, smaller list.\n- **The True/False Rule**: Your helper function must return either `true` (to keep the item) or `false` (to throw it out).",
    codeSnippet: `// Example: Filtering temperature readings to keep only active states
const readings = [15, -3, 0, 22, -10, 8];
const validReadings = readings.filter(temp => temp >= 0);

console.log(validReadings); // [15, 0, 22, 8]
console.log(readings);      // [15, -3, 0, 22, -10, 8] (remains unmodified)`,
    exercises: [
      {
        id: "filter-positives",
        title: "Post-Zero Filter Sanitizer",
        difficulty: "Warm-up",
        codeSnippet: `// Example Use Case: Keep only values meeting positive threshold rules
const scores = [-10, 15, 0, 32, -5];
const positiveScores = scores.filter(score => score >= 0);
// [15, 0, 32]`,
        conceptContext:
          "The `.filter()` method tests every element in an array and keeps only those that return `true` from your test.\n\n💡 **Learn By Comparison: `.filter()` vs `.find()`**:\n• `.filter()` searches the entire list and **returns a NEW array** of all values that match (even if only 1 matches, it's still inside an array).\n• `.find()` **returns the single value of the first match** directly, and then stops looking immediately! If no matches exist, it returns `undefined`.",
        description:
          "Let's warm up with basic selection mechanics.\n\nWrite a function `keepPositives(nums)` that takes an array of numbers and filters them, keeping only elements that are positive or zero (`>= 0`).",
        codeTemplate: `function keepPositives(nums) {
  // Use .filter() to retain strictly non-negative numbers
  
}`,
        functionName: "keepPositives",
        hints: [
          "Call .filter() on your input coordinate 'nums'.",
          "The callback function should check if current number is greater than or equal to 0: num >= 0.",
          "Ensure you return that condition expression.",
        ],
        explanation:
          "Simple filter application verifying array elements against constant parameter bounds.",
        testCases: [
          {
            id: 1,
            input: [[-1, 0, 5, -8, 12]],
            expected: [0, 5, 12],
            description: "Prunes negative integers safely while retaining zero",
          },
        ],
      },
      {
        id: "filter-range",
        title: "Dynamic Range Clipper",
        difficulty: "Warm-up",
        codeSnippet: `const numbers = [10, 20, 30].filter(n => n >= 15 && n <= 25); // [20]`,
        conceptContext:
          "Passing contextual state boundaries in filter comparison routines dynamically limits list outcomes.",
        description:
          "Write a function `filterRange(nums, min, max)` that filters the `nums` array to keep only numbers that are between the values of `min` and `max` (inclusive).",
        codeTemplate: `function filterRange(nums, min, max) {
  // Return only numbers nested within the inclusive [min, max] range
  
}`,
        functionName: "filterRange",
        hints: [
          "Your callback condition is: item >= min && item <= max.",
          "Pass this simple logical relation to your .filter() statement directly.",
        ],
        explanation:
          "Inclusive interval constraints let you filter pricing ranges and paginated item scopes.",
        testCases: [
          {
            id: 1,
            input: [[5, 12, 18, 24, 30], 10, 25],
            expected: [12, 18, 24],
            description: "Keeps numbers lying within bounds correctly",
          },
        ],
      },
      {
        id: "filter-emails",
        title: "Inbound Email Validator",
        difficulty: "Warm-up",
        codeSnippet: `const raw = ["a@b.com", "abc"].filter(e => e.includes("@") && e.endsWith(".com"));`,
        conceptContext:
          "Validating inputs via multiple logical checks in filter callbacks helps sanitize raw form lists cleanly.",
        description:
          "Let's validate contact options! Write a function `filterEmails(emails)` that filters an array of email strings, keeping only valid email addresses. A valid email address MUST contain the character `'@'` AND end with either `'.com'` or `'.org'`. All other strings are skipped.",
        codeTemplate: `function filterEmails(emails) {
  // Filter for strings containing '@' and ending with '.com' or '.org'
  
}`,
        functionName: "filterEmails",
        hints: [
          "Use a combination of .includes('@') and checking ends.",
          "Check: email.includes('@') && (email.endsWith('.com') || email.endsWith('.org'))",
        ],
        explanation:
          "Filtering contact records is essential for keeping clean distribution databases.",
        testCases: [
          {
            id: 1,
            input: [["contact@company.com", "john.doe", "support@org.org"]],
            expected: ["contact@company.com", "support@org.org"],
            description: "Retains only formatted matching domain records",
          },
        ],
      },
      {
        id: "filter-symmetric-difference",
        title: "Exclusive Elements Filter",
        difficulty: "DSA Easy",
        codeSnippet: `const list1 = [1, 2], list2 = [2, 3];\nconst diff = list1.filter(x => !list2.includes(x)); // [1]`,
        conceptContext:
          "Subtracting sets using filter checks checks which elements are exclusive to particular collections.",
        description:
          "Write a function `filterExclusive(arr1, arr2)` that takes two separate arrays of numbers and returns a new list of elements that exist inside `arr1` but are **not** present in `arr2`. Use the array `.includes()` method.",
        codeTemplate: `function filterExclusive(arr1, arr2) {
  // Filter elements of arr1 that are not present inside arr2
  
}`,
        functionName: "filterExclusive",
        hints: [
          "Call .filter() on arr1.",
          "Inside callback, verify: !arr2.includes(item);",
        ],
        explanation:
          "Computing set differences is a primary tool for comparing lists.",
        testCases: [
          {
            id: 1,
            input: [
              [1, 2, 3, 4],
              [3, 4, 5],
            ],
            expected: [1, 2],
            description:
              "Retains only numbers exclusive to the first parameter array",
          },
        ],
      },
      {
        id: "filter-by-map-exists",
        title: "Index Lookup Integrity Filter",
        difficulty: "DSA Easy",
        codeSnippet: `const ids = [1, 2, 3];\nconst store = { 1: true };\nconst active = ids.filter(id => store[id]); // [1]`,
        conceptContext:
          "Filtering an array of keys using external index lookups or tables is very common when synchronizing multiple caches.",
        description:
          "Write a function `filterRegistered(ids, activeDirectory)` that takes an array of primitive user IDs and a lookup object `activeDirectory` (where registered IDs are keys mapped to boolean values). Filter the list of IDs, keeping only those that are present in the `activeDirectory` and marked `true`.",
        codeTemplate: `function filterRegistered(ids, activeDirectory) {
  // Use bracket notation to check existence inside activeDirectory
  
}`,
        functionName: "filterRegistered",
        hints: [
          "Check in filter: id => activeDirectory[id] === true or simply activeDirectory[id].",
        ],
        explanation:
          "Using fast dictionary lookups validates membership in constant O(1) time.",
        testCases: [
          {
            id: 1,
            input: [[101, 102, 103], { 101: true, 103: false }],
            expected: [101],
            description:
              "Matches IDs registered with truthy directories successfully",
          },
        ],
      },
      {
        id: "filter-active-students",
        title: "Academic Honor Roll Filter",
        difficulty: "DSA Easy",
        codeSnippet: `const classList = [{ name: "A", grades: [95], active: true }];\nconst honors = classList.filter(s => s.active && s.grades.some(g => g >= 90));`,
        conceptContext:
          "Combining flat property flags matching nested array inspections creates sophisticated business rules inside filters.",
        description:
          "Write a function `filterHonors(students)` that takes an array of object models represent students: `{ name, active, grades }` (where `grades` is a number list). It should filter the array, keeping only students who are marked `active: true` **AND** have at least one grade in their list of grades that is strictly **greater than or equal to 90**.",
        codeTemplate: `function filterHonors(students) {
  // Filter students based on active flag and grade properties
  
}`,
        functionName: "filterHonors",
        hints: [
          "Write the filter rule: s => s.active && s.grades.some(g => g >= 90);",
          "Ensure you use .some() to match if at least one grade qualifies.",
        ],
        explanation:
          "Compound conditions inside filters isolate qualifying entities instantly.",
        testCases: [
          {
            id: 1,
            input: [
              [
                { name: "Alice", active: true, grades: [85, 92] },
                { name: "Bob", active: false, grades: [95] },
                { name: "Charlie", active: true, grades: [70, 80] },
              ],
            ],
            expected: [{ name: "Alice", active: true, grades: [85, 92] }],
            description:
              "Filters matching active honors list students faithfully",
          },
        ],
      },
      {
        id: "filter-averages",
        title: "Dynamic Average Outliers Filter",
        difficulty: "DSA Easy",
        codeSnippet: `// Example Use Case: Filtering outliers relative to dynamic averages
const points = [10, 20, 30];
const average = points.reduce((a, b) => a + b) / points.length; // 20
const aboveAverage = points.filter(p => p > average);
// [30]`,
        conceptContext:
          "Callbacks can use variables declared outside the `.filter()` block. Calculating metrics beforehand lets you filter relative to dynamic totals.",
        description:
          "Building on the basic filter, let's work on dynamic criteria derived from the array itself.\n\nWrite a function `filterAverages(nums)` that calculates the average value of `nums` first, and then filters the array to keep only elements that are strictly **greater** than that average.",
        codeTemplate: `function filterAverages(nums) {
  // 1. Sum up nums and divide by array length to find the average.
  // 2. Filter keeping only items strictly greater than the average value.
  
}`,
        functionName: "filterAverages",
        hints: [
          "Use a quick loop or .reduce() to calculate the sum of elements, and divide by nums.length to get the average.",
          "If array length is 0, return [].",
          "Pass a filter callback: num => num > average.",
        ],
        explanation:
          "Using dynamic variables inside a filter comparison is typical for statistical outlier detection.",
        testCases: [
          {
            id: 1,
            input: [[10, 20, 30]],
            expected: [30],
            description:
              "Average is 20, keeps only elements strictly greater than 20",
          },
          {
            id: 2,
            input: [[5, 5, 5]],
            expected: [],
            description: "Handles arrays with no values above average",
          },
        ],
      },
      {
        id: "filter-uniques",
        title: "Occurrence Deduplicator Filter",
        difficulty: "DSA Easy",
        codeSnippet: `// Example Use Case: Finding items that appear exactly once
const items = [1, 2, 2, 3];
const uniqueItems = items.filter(num => items.indexOf(num) === items.lastIndexOf(num));
// [1, 3]`,
        conceptContext:
          "An element is unique in an array if its first occurrence index matches its last occurrence index, which can be queried using built-in array index helpers.",
        description:
          "Let's build on local searches to handle global-occurrence uniqueness filtering.\n\nWrite a function `filterUnique(nums)` that processes an array, returning a standard array containing only elements that appear **exactly once** in the entire collection.\n\nExample: `[1, 2, 2, 3]` should return `[1, 3]` since `2` has duplicate records.",
        codeTemplate: `function filterUnique(nums) {
  // Use indexOf and lastIndexOf in combination inside .filter()
  
}`,
        functionName: "filterUnique",
        hints: [
          "If an item is unique inside an array, its first index matches its last index position.",
          "Check in filter: nums.indexOf(num) === nums.lastIndexOf(num).",
        ],
        explanation:
          "Positional index searches like indexOf and lastIndexOf let you check uniqueness profiles in regular arrays directly.",
        testCases: [
          {
            id: 1,
            input: [[1, 2, 2, 3, 4, 4, 5]],
            expected: [1, 3, 5],
            description: "Prunes any repeated occurrences elements",
          },
          {
            id: 2,
            input: [[1, 1, 1]],
            expected: [],
            description: "Correctly handles completely duplicate series",
          },
        ],
      },
      {
        id: "filter-valleys",
        title: "Relational Neighbor Valley Filter",
        difficulty: "DSA Easy",
        codeSnippet: `// Example Use Case: Relational positional filtering with index
const list = [5, 2, 8, 1, 9];
const valleys = list.filter((num, i, arr) => {
  const isLeftSmaller = i === 0 || num < arr[i - 1];
  const isRightSmaller = i === arr.length - 1 || num < arr[i + 1];
  return isLeftSmaller && isRightSmaller;
});
// [2, 1]`,
        conceptContext:
          "Just like `.map()`, `.filter()` passes the element's index position as the second argument, and the complete array as the third. This lets you index adjacent neighbor cells.",
        description:
          "Now let's introduce *contextual sibling checking* by using the element index within `.filter()`!\n\nWrite a function `filterValleys(nums)` that filters a sequence, returning only local 'valleys'.\n\nA valley is defined as an element that is strictly smaller than its horizontal adjacent neighbors:\n- For interior elements, compare with elements immediately left and right.\n- For boundary elements (first and last elements), compare only with their single adjacent neighbor.",
        codeTemplate: `function filterValleys(nums) {
  // Access sibling elements using index params inside callback: .filter((num, index) => ...)
  
}`,
        functionName: "filterValleys",
        hints: [
          "Use three arguments inside filter: .filter((num, i, arr) => ...)",
          "Let left = i === 0 ? Infinity : arr[i - 1].",
          "Let right = i === arr.length - 1 ? Infinity : arr[i + 1].",
          "Check if num < left && num < right.",
        ],
        explanation:
          "Evaluating adjacent record boundaries inside filter indices checks geometric array properties cleanly and efficiently.",
        testCases: [
          {
            id: 1,
            input: [[5, 2, 8, 1, 9]],
            expected: [2, 1],
            description: "Locates intermediate and endpoint valley items",
          },
          {
            id: 2,
            input: [[1, 3, 2]],
            expected: [1, 2],
            description: "Correctly evaluates indexes at boundaries",
          },
        ],
      },
      {
        id: "filter-landmarks",
        title: "Stateful Monotonic Elevation Lands",
        difficulty: "DSA Medium",
        codeSnippet: `// Example Use Case: Stateful traversal using external conditions
const heights = [3, 1, 4, 2, 5];
let runningMax = -Infinity;
const peaks = heights.filter(h => {
  if (h > runningMax) {
    runningMax = h;
    return true;
  }
  return false;
});
// [3, 4, 5]`,
        conceptContext:
          "A filter callback can check and update a running reference variable tracking values from left-to-right (like the maximum height seen so far) in the outer function scope.",
        description:
          "To complete the `.filter()` curriculum, let's learn how to preserve dynamic outer state variables!\n\nWrite a function `filterLandmarks(nums)` that filters an array of heights. It must return a new array containing only elements that are strictly greater than **all** elements previously observed in the array to their left.\n\n(The first element is always included, as check is relative to pre-existing maximums).",
        codeTemplate: `function filterLandmarks(nums) {
  // Maintain a tracking variable (running max) in your outer function closure!
  // Update that variable as elements pass through .filter().
  
}`,
        functionName: "filterLandmarks",
        hints: [
          "Initialise a custom tracking threshold state inside your main body: let currentMax = -Infinity.",
          "Inside your filter callback, check if current element is larger than currentMax.",
          "If yes, set currentMax = current element and return true. Otherwise, return false.",
        ],
        explanation:
          "Keeping custom running accumulator thresholds inside filter closures allows evaluating progression paths beautifully.",
        testCases: [
          {
            id: 1,
            input: [[3, 1, 4, 2, 5]],
            expected: [3, 4, 5],
            description: "Keeps elements that exceed prior progressive records",
          },
          {
            id: 2,
            input: [[10, 5, 3]],
            expected: [10],
            description: "Decaying elevations return only the start height",
          },
        ],
      },
    ],
  },
  {
    id: "reduce-callbacks",
    title: ".reduce() Aggregation Models",
    shortDescription:
      "Combine all the items in an array down into a single value, object, or total.",
    longExplanation:
      "The `.reduce()` method is incredibly versatile. It lets you loop through an array and build up a single result step-by-step. This result can be a number (like a sum), a string, a brand-new object, or even another array!\n\n- **The Accumulator (Running Total)**: Think of the accumulator as a basket. As you visit each item, you update what's in the basket and pass it to the next step.\n- **Starting Value**: You always decide what the basket starts with (e.g., `0` for a sum, or `[]` for a list).",
    codeSnippet: `// Example: Calculating product aggregation with an initial factor
const multiplier = 10;
const dimensions = [2, 3, 4];
const totalProduct = dimensions.reduce((product, value) => product * value, multiplier);

console.log(totalProduct); // 240 (10 * 2 * 3 * 4)`,
    exercises: [
      {
        id: "reduce-find-max",
        title: "Maximum Number Finder",
        difficulty: "Warm-up",
        codeSnippet: `const max = [1, 5, 2].reduce((acc, curr) => curr > acc ? curr : acc, -Infinity); // 5`,
        conceptContext:
          "Instead of doing array sorting or math functions, comparing values element-by-element inside a reduce loop isolates maximums cleanly.",
        description:
          "Write a function `findMax(nums)` that takes an array of numbers and returns the maximum value in the array using `.reduce()`. If the array is empty, return `-Infinity`.",
        codeTemplate: `function findMax(nums) {
  // Use .reduce() to traverse and locate the largest number, starting the accumulator at -Infinity
  
}`,
        functionName: "findMax",
        hints: [
          "Set the initial accumulator value to -Infinity.",
          "Inside callback return: curr > acc ? curr : acc;",
        ],
        explanation:
          "Evaluating comparative maximums during reduction reduces auxiliary memory allocations to zero.",
        testCases: [
          {
            id: 1,
            input: [[-10, 5, 20, -2]],
            expected: 20,
            description: "Extracts highest positive boundary accurately",
          },
          {
            id: 2,
            input: [[]],
            expected: -Infinity,
            description: "Returns -Infinity for empty array fields",
          },
        ],
      },
      {
        id: "reduce-multiplier",
        title: "Secure Value Product Reducer",
        difficulty: "Warm-up",
        codeSnippet: `// Example Use Case: Condensing an array to a single product value
const factor = 10;
const nums = [2, 3, 4];
const product = nums.reduce((acc, curr) => acc * curr, factor);
// 240`,
        conceptContext:
          "The `.reduce((acc, curr) => ..., initialValue)` method loops through values, using the return value of the previous loop as `acc` for the next.\n\n💡 **Learn By Comparison: `.reduce()` vs `.map()`**:\n• `.map()` processes each item and returns a **new array containing the same number of items**.\n• `.reduce()` is for **condensing/shaping an array down into a single result** (such as a sum number, a combined string, or a grouped object). Use `.reduce()` when you need to collapse details to a single outcome.",
        description:
          "Let's warm up with a classic numeric total aggregator.\n\nWrite a function `multiplyAll(nums, initialMultiplier)` that multiplies all integers in an array together, utilizing a custom initial scaling value passed as the second argument.",
        codeTemplate: `function multiplyAll(nums, initialMultiplier) {
  // Reduce the values starting from initialMultiplier
  
}`,
        functionName: "multiplyAll",
        hints: [
          "Add initialMultiplier as the second parameter of your .reduce() call.",
          "Accumulator formula: return accumulator * currentItem.",
        ],
        explanation:
          "Simple multiplication reduction demonstrating initializing accumulator variables securely.",
        testCases: [
          {
            id: 1,
            input: [[2, 3, 4], 10],
            expected: 240,
            description: "Multiplies numbers cleanly (10 * 2 * 3 * 4)",
          },
        ],
      },
      {
        id: "reduce-cart-total",
        title: "Aesthetic Cart Value Aggregator",
        difficulty: "DSA Easy",
        codeSnippet: `const items = [{ price: 10, count: 2 }];\nconst total = items.reduce((acc, x) => acc + x.price * x.count, 0);`,
        conceptContext:
          "Financial and cart calculations frequently summarize nested quantities using a seed starting at zero.",
        description:
          "Write a function `computeCartTotal(items)` that takes an array of items: `{ price, multiplier, count }` and returns the aggregated billing total using `.reduce()`. Check if a `multiplier` exists on the item and apply it: `price * count * multiplier` (default multiplier to `1` if undefined). Start the accumulator at `0`.",
        codeTemplate: `function computeCartTotal(items) {
  // Accumulate total with .reduce() checking multiplication rules
  
}`,
        functionName: "computeCartTotal",
        hints: [
          "Initialise reduce with a starting value of 0.",
          "Inside accumulator callback add: acc + item.price * item.count * (item.multiplier || 1)",
        ],
        explanation:
          "Using fallback logical OR boundaries for optional properties ensures clean billing math.",
        testCases: [
          {
            id: 1,
            input: [
              [
                { price: 10, count: 2, multiplier: 1.5 },
                { price: 5, count: 4 },
              ],
            ],
            expected: 50,
            description: "Computes quantities and multipliers correctly",
          },
        ],
      },
      {
        id: "reduce-flatten",
        title: "Matrix Rows Grid Flattener",
        difficulty: "DSA Easy",
        codeSnippet: `// Example Use Case: Flat-concatenating structural multi-level matrices
const matrix = [[1, 2], [3], [4, 5]];
const flattened = matrix.reduce((acc, row) => acc.concat(row), []);
// [1, 2, 3, 4, 5]`,
        conceptContext:
          "An empty array initialized as the accumulator can be concatenated sequentially with nested rows inside a map closure.",
        description:
          "Now, let's learn how to flatten complex matrices without using the built-in `.flat()` array method.\n\nWrite a function `flattenGrid(grid)` that processes an array of nested arrays, merging them into a single 1D flat array using `.reduce()`.",
        codeTemplate: `function flattenGrid(grid) {
  // Melt nested grid array rows into a 1D collection
  
}`,
        functionName: "flattenGrid",
        hints: [
          "Initialize reduce with an empty array [].",
          "For each row inside the grid nested structure, merge items with: acc.concat(row).",
        ],
        explanation:
          "Merging nested levels is necessary when compiling raw spreadsheet row grids prior to parsing datasets.",
        testCases: [
          {
            id: 1,
            input: [[[1, 2], [3, 4], [5]]],
            expected: [1, 2, 3, 4, 5],
            description: "Concatenates rows to single dimension array",
          },
        ],
      },
      {
        id: "reduce-pivot-map",
        title: "Relational Pivot Mapper",
        difficulty: "DSA Easy",
        codeSnippet: `const list = [{ id: "a", name: "Alice" }];\nconst pivot = list.reduce((acc, u) => { acc[u.id] = u; return acc; }, {});`,
        conceptContext:
          "Grouping or index-mapping arrays of database objects into custom key-indexed maps speeds up search queries significantly.",
        description:
          "Let's pivot our rows! Write a function `pivotUserMap(users)` that takes an array of user objects: `{ id, name, role }` and reduces them into a single object keyed by each user's unique `id` property.",
        codeTemplate: `function pivotUserMap(users) {
  // Use .reduce() with an initial accumulator of an empty object {}
  
}`,
        functionName: "pivotUserMap",
        hints: [
          "Pass a callback (acc, user) => { ... } with initial value {}.",
          "Inside the callback, assign: acc[user.id] = user; and always return the accumulator: return acc;",
        ],
        explanation:
          "Pivoting rows into records simplifies linking active items with external state IDs.",
        testCases: [
          {
            id: 1,
            input: [
              [
                { id: "u1", name: "Alice" },
                { id: "u2", name: "Bob" },
              ],
            ],
            expected: {
              u1: { id: "u1", name: "Alice" },
              u2: { id: "u2", name: "Bob" },
            },
            description:
              "Re-keys array items into object dictionary maps successfully",
          },
        ],
      },
      {
        id: "reduce-freq-tally",
        title: "Word Frequency Dict Counter",
        difficulty: "DSA Easy",
        codeSnippet: `// Example Use Case: Tallying string frequencies into a hash count
const tallyWords = ["dog", "cat", "dog"];
const tally = tallyWords.reduce((acc, word) => {
  acc[word] = (acc[word] || 0) + 1;
  return acc;
}, {});
// { dog: 2, cat: 1 }`,
        conceptContext:
          "To count element counts, initialize with an empty object dictionary. In the callback, if the key does not exist yet inside accumulator, fallback to 0 and increment.",
        description:
          "Let's build on the object accumulator by dynamic key tallying!\n\nWrite a function `tallyFrequencies(words)` that reads an array of strings. It must return an object counting the occurrences of each word (word -> count matches).\n\nExample: `['apple', 'banana', 'apple']` -> `{ apple: 2, banana: 1 }`.",
        codeTemplate: `function tallyFrequencies(words) {
  // Build a vocabulary tally count using an empty object accumulator {}
  
}`,
        functionName: "tallyFrequencies",
        hints: [
          "Set your initialValue inside .reduce() to an empty object {}.",
          "Inside the loop, set key count: acc[word] = (acc[word] || 0) + 1.",
          "Return the updated accumulator object reference on each step.",
        ],
        explanation:
          "Object tally tracking is the perfect prerequisite to hash map lookups.",
        testCases: [
          {
            id: 1,
            input: [["dog", "cat", "dog", "bird"]],
            expected: { dog: 2, cat: 1, bird: 1 },
            description: "Tallies animals frequencies accurately",
          },
        ],
      },
      {
        id: "reduce-parity-obj",
        title: "Parity Object Partition Aggregator",
        difficulty: "DSA Easy",
        codeSnippet: `// Example Use Case: Grouping values into structured objects
values = [1, 2, 3, 4];
grouped = values.reduce((acc, num) => {
  if (num % 2 === 0) acc.evens.push(num);
  else acc.odds.push(num);
  return acc;
}, { evens: [], odds: [] });
// { evens: [2, 4], odds: [1, 3] }`,
        conceptContext:
          "The initial value can be an object instead of a primitive. Be sure to push to nested arrays and return the updated accumulator reference from each callback step.",
        description:
          "Now let's transition from accumulating single numbers to aggregating into *objects* with nested lists!\n\nWrite a function `partitionParity(nums)` that takes an array of integers and splits them into an object with two keys:\n- `evens`: An array containing all even values.\n- `odds`: An array containing all odd values.\n\nSolve this strictly inside a single functional `.reduce()` statement.",
        codeTemplate: `function partitionParity(nums) {
  // Map integers, initializing the reduce with custom object: { evens: [], odds: [] }
  
}`,
        functionName: "partitionParity",
        hints: [
          "Pass an object with initial empty lists { evens: [], odds: [] } inside reduce.",
          "Add current values to either key, then return the updated accumulator reference!",
        ],
        explanation:
          "Grouping and classifying arrays into key-value map indices is a classic database aggregation scenario.",
        testCases: [
          {
            id: 1,
            input: [[1, 2, 3, 4]],
            expected: { evens: [2, 4], odds: [1, 3] },
            description: "Partitions integers correctly",
          },
        ],
      },
      {
        id: "reduce-group-by-grade",
        title: "Category Classifier Reducer",
        difficulty: "DSA Medium",
        codeSnippet: `const users = [{ name: "A", role: "admin" }];\nconst grouped = users.reduce((acc, u) => {\n  acc[u.role] = acc[u.role] || [];\n  acc[u.role].push(u.name);\n  return acc;\n}, {});\n// { admin: ["A"] }`,
        conceptContext:
          "Combining dynamic array creation and lookup keys inside one reduction loop builds complete category group dictionaries.",
        description:
          "Write a function `groupByGrade(students)` that takes an array of student objects: `{ name, grade }` (where `grade` is a string letter like `'A'`, `'B'`).\n\nIt should reduce the list into a single grouping object where each key is a grade and the value is a standard array of student strings (`name`) corresponding to that grade.\n\nExample:\n`[{ name: 'Alice', grade: 'A' }, { name: 'Bob', grade: 'B' }, { name: 'Charlie', grade: 'A' }]` -> `{\n  A: ['Alice', 'Charlie'],\n  B: ['Bob']\n}`.",
        codeTemplate: `function groupByGrade(students) {
  // Reduce students into a group lookup object, starting with {}
  
}`,
        functionName: "groupByGrade",
        hints: [
          "The initial value of reduce must be an empty object {}.",
          "Initialize the array if missing: acc[student.grade] = acc[student.grade] || [];",
          "Push student.name into that array and always return acc.",
        ],
        explanation:
          "Reducing array tracks to categorized lists performs structured analytics transformations instantly.",
        testCases: [
          {
            id: 1,
            input: [
              [
                { name: "Alice", grade: "A" },
                { name: "Bob", grade: "B" },
                { name: "Charlie", grade: "A" },
              ],
            ],
            expected: { A: ["Alice", "Charlie"], B: ["Bob"] },
            description: "Assembles clean group list buckets keyed by grade",
          },
        ],
      },
      {
        id: "reduce-pipeline",
        title: "Array-Driven Middleware Composer",
        difficulty: "DSA Medium",
        codeSnippet: `const fns = [x => x + 2, x => x * 3];\nconst res = fns.reduce((val, f) => f(val), 10); // 36`,
        conceptContext:
          "Reducers are the canonical way to execute functional compositions, passing the resulting output of each step into the subsequent callback.",
        description:
          "Write a function `composeFunctions(initialVal, pipeline)` that takes a starting value and an array of mathematical functions. It should use `.reduce()` to pass the running value through each function in the pipeline in order, returning the final transformed output.",
        codeTemplate: `function composeFunctions(initialVal, pipeline) {
  // Use .reduce() to pipe initialVal through each function in pipeline
  
}`,
        functionName: "composeFunctions",
        hints: [
          "The accumulator acts as the running value, starting at initialVal.",
          "Simply return: pipeline.reduce((currVal, fn) => fn(currVal), initialVal);",
        ],
        explanation:
          "Pipeline compositions structure middleware frameworks like Redux and Express.",
        testCases: [
          {
            id: 1,
            input: [100, [(x) => x / 2, (x) => x - 10]],
            expected: 40,
            description:
              "Flows variable inputs through sequence boundaries sequentially",
          },
        ],
      },
      {
        id: "reduce-run-length",
        title: "Run-Length Sequence Encoder",
        difficulty: "DSA Medium",
        codeSnippet: `// Example Use Case: Compressing duplicate runs with reduce history
const items = ["a", "a", "b", "b", "b", "a"];
const compressed = items.reduce((acc, val) => {
  const last = acc[acc.length - 1];
  if (last && last[0] === val) last[1]++;
  else acc.push([val, 1]);
  return acc;
}, []);
// [["a", 2], ["b", 3], ["a", 1]]`,
        conceptContext:
          "Reductions can read historical records inside their active accumulator container to determine whether to combine or push data.",
        description:
          "To complete the `.reduce()` system, let's solve a real sequence data compression algorithm.\n\nWrite a function `runLengthEnc(chars)` that uses `.reduce()` to compress sequential duplicate elements.\n\nIt should return an array of arrays, where each sub-array contains `[char, count]`.\n\nExample:\n`['a', 'a', 'b', 'b', 'b', 'a']` -> `[['a', 2], ['b', 3], ['a', 1]]`.",
        codeTemplate: `function runLengthEnc(chars) {
  // Compress repeating subsequences into paired tracks
  
}`,
        functionName: "runLengthEnc",
        hints: [
          "Start your accumulator with [].",
          "Check the last tuple inside your accumulator list: let last = acc[acc.length - 1].",
          "If last item exists and last[0] === character, increment counts: last[1]++.",
          "Else, push a new run pair sequence: acc.push([char, 1]).",
        ],
        explanation:
          "Compression pipelines check immediate history inside reduction blocks to bundle repetitive signals efficiently.",
        testCases: [
          {
            id: 1,
            input: [["a", "a", "b", "b", "b", "a"]],
            expected: [
              ["a", 2],
              ["b", 3],
              ["a", 1],
            ],
            description: "Segments character tracks securely",
          },
        ],
      },
    ],
  },
  {
    id: "object-dictionaries",
    title: "Object Key-Value Maps",
    shortDescription:
      "Use JavaScript objects as custom dictionaries to lookup information instantly.",
    longExplanation:
      "Standard arrays are great, but finding an item in a huge list can be slow because you might have to scan the whole array. JavaScript objects let you store things as key-value pairs (like a word and its definition) so you can find them instantly.\n\n- **Instant Lookups**: Checking if a key exists is super fast using the `in` keyword (e.g., `'username' in user`).\n- **Smart Caching**: You can save results in an object as you calculate them, so you never have to do the same work twice.",
    codeSnippet: `// Example: Object key checks and default settings merging
const defaultSettings = { theme: 'light', zoom: 100 };
const userProfile = { theme: 'dark' };

const mergedConfig = { ...defaultSettings, ...userProfile };
console.log(mergedConfig); // { theme: "dark", zoom: 100 }

// Checking for key existence in O(1) time
const key = 'zoom';
if (key in mergedConfig) {
  console.log(\`Setting '\${key}' exists with value:\`, mergedConfig[key]); // 100
}`,
    exercises: [
      {
        id: "object-merge-conf",
        title: "Selective Default config Merger",
        difficulty: "Warm-up",
        codeSnippet: `// Example Use Case: Merging default and override configurations
const defaults = { host: "127.0.0.1", port: 8080 };
const userOverrides = { port: 3000 };
const finalConfig = { ...defaults, ...userOverrides };
// { host: "127.0.0.1", port: 3000 }`,
        conceptContext:
          "The ES6 Spread operator clones dictionary properties into brand new objects: properties inside active override elements update existing matching default keys safely.",
        description:
          "Let's warm up with basic object key manipulation and fallback searches.\n\nWrite a function `mergeConfig(defaults, overrides)` that takes a defaults dictionary and overrides list of keys.\n\nIt should return a new object containing the default configuration values, except where overriding parameters are provided inside `overrides`.",
        codeTemplate: `function mergeConfig(defaults, overrides) {
  // Example inputs:
  // defaults = { theme: "light", debug: false }
  // overrides = { theme: "dark" }
  //
  // TODO: Create and return a new object that merges both together.
  // Properties in 'overrides' should override those in 'defaults'.
  // Hint: Rest/Spread operators can do this in one line!
  
}`,
        functionName: "mergeConfig",
        hints: [
          "Use the Spread Operator ... to merge: { ...defaults, ...overrides }.",
          "This easily overrides preexisting duplicate keys while retaining older keys.",
        ],
        explanation:
          "Immutable dictionaries merges prevent side-effects on client settings profiles.",
        testCases: [
          {
            id: 1,
            input: [{ theme: "light", debug: false }, { theme: "dark" }],
            expected: { theme: "dark", debug: false },
            description:
              "Applies explicit replacements over standard default entries",
          },
        ],
      },
      {
        id: "object-two-sum",
        title: "Two Sum Hash Map Lookup",
        difficulty: "DSA Easy",
        codeSnippet: `// Example Use Case: Linear-time Two-Sum using index lookups
const nums = [2, 7, 11, 15];
const target = 9;
const seen = {}; // num -> index
let result;
for (let i = 0; i < nums.length; i++) {
  const complement = target - nums[i];
  if (complement in seen) {
    result = [seen[complement], i];
    break;
  }
  seen[nums[i]] = i;
}
// result is [0, 1]`,
        conceptContext:
          "Instead of searching for matching pairs using nested loops, caching checked numbers in a lookup dictionary resolves target matches in constant O(1) time per element.",
        description:
          "Let's build on basic dictionary lookups to solve a classic DSA algorithm in linear time!\n\nWrite a function `twoSumLookup(nums, target)` that seeks the index positions of two numbers in `nums` that add up to `target`.\n\nYou must achieve **O(N) linear runtime** by using an object as a coordinate lookup tracker. Nested loops are forbidden!",
        codeTemplate: `function twoSumLookup(nums, target) {
  // Example inputs:
  // nums = [2, 7, 11, 15], target = 9
  //
  // TODO: Return an array of the two indices [index1, index2] whose values sum to the target.
  // Use a lookup object to track numbers we've seen: { [number]: index }
  // Check if (target - currentNum) is already in your lookup table.
  const seen = {}; // num -> index
  
}`,
        functionName: "twoSumLookup",
        hints: [
          "Initialize an empty map: let seen = {}.",
          "On loop step 'i', check if (target - nums[i]) exists inside seen map.",
          "If present, return [seen[target - nums[i]], i]. Else save: seen[nums[i]] = i.",
        ],
        explanation:
          "Caching past items prevents expensive secondary passes, solving requirements in high speed linear O(N) times.",
        testCases: [
          {
            id: 1,
            input: [[2, 7, 11, 15], 9],
            expected: [0, 1],
            description: "Matches indices 0 and 1 representing 2 and 7",
          },
          {
            id: 2,
            input: [[3, 2, 4], 6],
            expected: [1, 2],
            description: "Matches duplicate sums in list",
          },
        ],
      },
      {
        id: "object-anagram-check",
        title: "O(N) Anagram Match Counts",
        difficulty: "DSA Easy",
        codeSnippet: `// Example Use Case: Creating key-count frequency maps
const charCount = {};
const text = "apple";
for (const char of text) {
  charCount[char] = (charCount[char] || 0) + 1;
}
// charCount is { a: 1, p: 2, l: 1, e: 1 }`,
        conceptContext:
          "An anagram has identical character balance counts. Building occurrence tallies with objects compares string signatures instantly without sorting lists.",
        description:
          "Now, let's compare two datasets using maps of character occurrences.\n\nWrite a function `isAnagramLookup(s, t)` which verifies if strings `s` and `t` are anagrams in strict **O(N)** time.\n\nAn anagram contains identical letters in exactly the same quantities (frequency counts).",
        codeTemplate: `function isAnagramLookup(s, t) {
  // Example inputs:
  // s = "listen", t = "silent"
  //
  // TODO: Return true if s and t are anagrams, false otherwise.
  // 1. If s.length !== t.length, return false immediately.
  // 2. Build a frequency count object of letters in s (e.g., { 'l': 1, 'i': 1... })
  // 3. Loop through t and decrement or check counts.
  
}`,
        functionName: "isAnagramLookup",
        hints: [
          "Build an object holding letter counts from first string 's'.",
          "Subtract counts using characters in string 't'.",
          "If counts drop below zero or key does not exist, return false.",
        ],
        explanation:
          "Frequency dictionaries process string comparisons in a single O(N) pass, outperforming standard O(N log N) sorts.",
        testCases: [
          {
            id: 1,
            input: ["listen", "silent"],
            expected: true,
            description: "Identical letter quantities detected",
          },
          {
            id: 2,
            input: ["rat", "car"],
            expected: false,
            description: "Letters do not align matches",
          },
        ],
      },
      {
        id: "object-index-users",
        title: "Structured Database Indexer",
        difficulty: "DSA Easy",
        codeSnippet: `// Example Use Case: Grouping database collections dynamically
const roles = [{ user: "Ann", role: "Dev" }, { user: "Val", role: "Dev" }];
const index = roles.reduce((acc, obj) => {
  if (!acc[obj.role]) acc[obj.role] = [];
  acc[obj.role].push(obj.user);
  return acc;
}, {});
// { Dev: ["Ann", "Val"] }`,
        conceptContext:
          "Looping through records allows building a dynamic index repository on a category field where each key points to an array for structured fast grouping.",
        description:
          "Let's build on grouping logic by indexing list datasets into categorized object arrays.\n\nWrite a function `indexUsers(users)` which processes a user objects array: `[{ name: '...', dept: '...' }]`.\n\nIt should return an object where each key is a department name, and its value is an array of names belonging to that department.\n\nExample:\n`[{ name: 'Alice', dept: 'HR' }, { name: 'Bob', dept: 'IT' }, { name: 'Charlie', dept: 'HR' }]` ->\n`{ HR: ['Alice', 'Charlie'], IT: ['Bob'] }`.",
        codeTemplate: `function indexUsers(users) {
  // Example 'users' input structure:
  // [
  //   { name: "Alice", dept: "HR" },
  //   { name: "Bob", dept: "IT" },
  //   { name: "Charlie", dept: "HR" }
  // ]
  //
  // TODO: Build and return an object grouping names by department:
  // { HR: ["Alice", "Charlie"], IT: ["Bob"] }
  
}`,
        functionName: "indexUsers",
        hints: [
          "Create an empty object bucket: let depts = {}.",
          "For each user: check if depts[user.dept] exists. If not, set as [].",
          "Push user.name to the matching array list.",
        ],
        explanation:
          "Database systems index table indices into dynamic sub-arrays for fast structural queries.",
        testCases: [
          {
            id: 1,
            input: [
              [
                { name: "Alice", dept: "HR" },
                { name: "Bob", dept: "IT" },
                { name: "Charlie", dept: "HR" },
              ],
            ],
            expected: { HR: ["Alice", "Charlie"], IT: ["Bob"] },
            description: "Segments departments list correctly",
          },
        ],
      },
      {
        id: "object-consecutive-seq",
        title: "Continuous Streak Hash Crawler",
        difficulty: "DSA Medium",
        codeSnippet: `// Example Use Case: Fast set queries with lookup indicators
const lookup = { 100: true, 4: true, 200: true, 1: true, 3: true, 2: true };
const checkStart = !(3 in lookup); // false (not start)
const findStart = !(100 - 1 in lookup); // true (100 is start)`,
        conceptContext:
          "To identify sequence streaks in linear time, save elements into an object lookup index. Then, query only element starts to bypass duplicate checks.",
        description:
          "To complete the Object Dictionaries sequence, let's solve a high-speed streak validation test.\n\nWrite a function `longestStreak(nums)` that takes an array of unsorted integers and identifies the length of its longest consecutive sequence of numbers.\n\nExample: `[100, 4, 30, 1, 3, 2]` contains consecutive sequence `1, 2, 3, 4`, returning a length of `4`.\n\nAchieve O(N) complexity using helper hash maps.",
        codeTemplate: `function longestStreak(nums) {
  // Example inputs:
  // nums = [100, 4, 200, 1, 3, 2]
  //
  // TODO: Find the length of the longest consecutive elements sequence.
  // 1. Store all numbers in a lookup object so checking list numbers takes O(1) time.
  // 2. Loop through nums. If (num - 1) is not in our set/object, we've found the start of a sequence!
  // 3. From there, count up (num + 1, num + 2, etc.) to calculate the sequence length.
  
}`,
        functionName: "longestStreak",
        hints: [
          "Store numbers in an object map checking existences: seen[x] = true.",
          "Iterate nums. If (num - 1) exists, skip (since it's not the start of a streak).",
          "If it is a streak origin, count up consecutive numbers sequentially from that start point.",
        ],
        explanation:
          "Hashing ensures constant time O(1) checks which allows tracking long contiguous runs in strict O(N) intervals.",
        testCases: [
          {
            id: 1,
            input: [[100, 4, 200, 1, 3, 2]],
            expected: 4,
            description: "Locates streaks representing 1, 2, 3, 4",
          },
          {
            id: 2,
            input: [[0, 3, 7, 2, 5, 8, 4, 6, 0, 1]],
            expected: 9,
            description: "Large mixed dataset checked instantly",
          },
        ],
      },
    ],
  },
  {
    id: "closures-scoping",
    title: "Closures & Modular Scope",
    shortDescription:
      "Create functions that remember variables from where they were first defined.",
    longExplanation:
      "A closure happens when an inner function remembers and has access to the variables of its outer function, even after the outer function has finished running. Think of it as a function with 'memory'.\n\n- **Private Data (Secret Bags)**: You can hide variables inside a function so that external code cannot touch or mess with them.\n- **Custom Factories**: You can write a function that creates other functions with customized pre-saved settings.",
    codeSnippet: `// Example: Private state retention using closures
function createCounter(stepValue) {
  let count = 0; // Private state variable
  return function() {
    count += stepValue;
    return count;
  };
}

const incrementByTwo = createCounter(2);
console.log(incrementByTwo()); // 2
console.log(incrementByTwo()); // 4 (remembers and persists private 'count')`,
    exercises: [
      {
        id: "closure-counter",
        title: "Private Counter Factory",
        difficulty: "Warm-up",
        codeSnippet: `// Example Use Case: Encapsulated private state methods
function makeCounter(val) {
  let count = val;
  return {
    add: () => ++count,
    get: () => count
  };
}
const myCounter = makeCounter(10);
myCounter.add(); // 11`,
        conceptContext:
          "Variables declared inside the outer function persist in memory within the returned functions, keeping them isolated from external modification.",
        description:
          "Let's warm up with basic lexical encapsulation.\n\nWrite a function `createCounter(startValue)` that returns an object containing three methods:\n- `increment()`: adds 1 to private count and returns it.\n- `decrement()`: subtracts 1 from private count and returns it.\n- `getValue()`: returns current private count.",
        codeTemplate: `function createCounter(startValue) {
  // Define a private variable 'count' inside this lexical function scope
  // Return methods that close over and manipulate this count safely
  
}`,
        functionName: "createCounter",
        hints: [
          "Let count = startValue; inside the main function body.",
          "Return an object: { increment() { count++; return count; }, ... }.",
        ],
        explanation:
          "Encapsulating internal values prevents external scripts from directly corrupting core variables.",
        testCases: [
          {
            id: 1,
            input: [10],
            expected: [11, 10, 10],
            description:
              "Correctly increments, decrements, and fetches values sequentially",
          },
        ],
      },
      {
        id: "closure-multiplier",
        title: "Configurable Scaler Factory",
        difficulty: "DSA Easy",
        codeSnippet: `// Example Use Case: Custom function factory with factor variables
function multiplier(factor) {
  return num => num * factor;
}
const double = multiplier(2);
double(5); // 10`,
        conceptContext:
          "Outer configuration variables get sealed inside custom functions returned as formulas.",
        description:
          "Building on private state retention, let's create custom mathematical functions initialized with configuration options.\n\nWrite a function `createScaler(factor)` that returns an inner function. That returned function should take a number `n` and return the product of that number and the encapsulated `factor`.",
        codeTemplate: `function createScaler(factor) {
  // Return an anonymous function that multiplies its argument by the outer 'factor'
  
}`,
        functionName: "createScaler",
        hints: [
          "The outer function takes a factor. The inner function takes a number: function(n) { ... }.",
          "Return the calculation: n * factor.",
        ],
        explanation:
          "Function factories allow pre-configuring custom reusable arithmetic configurations beautifully.",
        testCases: [
          {
            id: 1,
            input: [5, 10],
            expected: 50,
            description: "Correctly scales parameter 10 by factor 5",
          },
          {
            id: 2,
            input: [2.5, 4],
            expected: 10,
            description: "Scales fractional values correctly",
          },
        ],
      },
      {
        id: "closure-auth",
        title: "Lexical Secure Token Manager",
        difficulty: "DSA Easy",
        codeSnippet: `// Example Use Case: Lexical private token container
function authStore() {
  let token = null;
  return {
    set: (val) => token = val,
    has: () => token !== null
  };
}
const store = authStore();
store.set("secret_key");
store.has(); // true`,
        conceptContext:
          "Token stores inside closures prevent global space leak. Methods read or write to private local variables without any window leaks.",
        description:
          "Let's build on configurable closures to secure authentication protocols.\n\nWrite a function `createTokenManager()` that encapsulates a private `token` field (initially `null`). It should return an object matching these operational traits:\n- `setToken(newToken)`: sets the private token value.\n- `hasToken()`: returns true if token is NOT `null`, otherwise returns false.\n- `clearToken()`: resets the token to `null`.",
        codeTemplate: `function createTokenManager() {
  // Encapsulate a private token variable within the closure environment
  
}`,
        functionName: "createTokenManager",
        hints: [
          "Set a let token = null; variable inside the outer scope.",
          "Provide get, set, and clear methods returning/setting this token value.",
        ],
        explanation:
          "Token managers prevent credentials exposure in open client scopes.",
        testCases: [
          {
            id: 1,
            input: ["API-SEC-982"],
            expected: [true, false],
            description: "Verifies token saving, tracking, and deletion",
          },
        ],
      },
      {
        id: "closure-memoize",
        title: "Closed Cache calculation Memoizer",
        difficulty: "DSA Easy",
        codeSnippet: `// Example Use Case: Outer-scoped cache dictionary check
function memoize(func) {
  const cache = {};
  return val => {
    if (val in cache) return cache[val];
    cache[val] = func(val);
    return cache[val];
  };
}
const square = memoize(x => x * x);
square(4); // 16 (computes and caches)
square(4); // 16 (retrieves from cache)`,
        conceptContext:
          "A cache object stored inside a closure's lexical sphere lets returned functions bypass redundant, slow calculation routes.",
        description:
          "Now let's build a caching gateway for calculations!\n\nWrite a function `memoizeCalculation(func)` that takes an expensive single-argument function `func`.\n\nIt should return a memoized closure function. When called, this wrapper must first check if the input parameter has been cached before: \n- If yes, return the cached result.\n- If no, run the calculation, store the result in a private dictionary object inside the closure, and return it.",
        codeTemplate: `function memoizeCalculation(func) {
  // Create an internal cache dictionary: let cache = {}
  // Return an inner function that intercepts incoming values
  
}`,
        functionName: "memoizeCalculation",
        hints: [
          "Store calculations inside a let cache = {} object.",
          "Inside the returned function: check if (arg in cache) is true.",
          "If not, compute value: let res = func(arg) and store: cache[arg] = res.",
        ],
        explanation:
          "Memoization caches save processing power on identical computationally heavy calls.",
        testCases: [
          {
            id: 1,
            input: [8],
            expected: 16,
            description:
              "Computes once, while secondary lookups fetch from cached keys",
          },
        ],
      },
      {
        id: "closure-stream",
        title: "Moving Average Stream Tracker",
        difficulty: "DSA Medium",
        codeSnippet: `// Example Use Case: Lexical sequence streaming array window
function limitStream(period) {
  const values = [];
  return val => {
    values.push(val);
    const window = values.slice(-period);
    return window.reduce((a, b) => a + b, 0) / window.length;
  };
}
const streamer = limitStream(3);
streamer(10); // 10
streamer(20); // 15`,
        conceptContext:
          "Sliding window telemetry tracks continuous input feeds. Appending values to enclosed arrays, then slicing the tail, manages sliding metrics nicely.",
        description:
          "To complete the Closure sequence, let's create a dynamic running numbers data stream analyzer.\n\nWrite a function `createAverageStreamer(period)` that tracks numbers in sliding windows.\n\nIt returns a streamer function that accepts a number `val`, pushes it to a private list, and returns the average of the last `period` elements in that list (or the average of all items if the stream holds fewer elements than `period`).",
        codeTemplate: `function createAverageStreamer(period) {
  // Encapsulate an array of received elements in closure memory
  
}`,
        functionName: "createAverageStreamer",
        hints: [
          "Maintain a running array of received values inside your closure environment.",
          "On each execution of the streamer function, append the new value.",
          "Slice the list to obtain the last 'period' values, sum them, and divide by the window size.",
        ],
        explanation:
          "Continuous window statistics trackers parse rolling streams securely inside functional closures.",
        testCases: [
          {
            id: 1,
            input: [3, [10, 20, 30, 40]],
            expected: [10, 15, 20, 30],
            description:
              "Computes active sliding averages for period 3 windows",
          },
        ],
      },
    ],
  },
  {
    id: "string-parsing",
    title: "String Parsing & Formatting",
    shortDescription:
      "Split, search, clean, and rebuild string text in JavaScript easily.",
    longExplanation:
      "In JavaScript, you cannot change a string directly—once created, it is set in stone. To modify text, you use helper methods to create fresh, updated strings. Mastering these text tools is essential for cleaning up dirty user inputs or parsing raw data.\n\n- **Slicing and Splitting**: Use `.split()` to cut text into chunks, `.join()` to glue elements together, `.slice()` to grab specific segments, and `.trim()` to sweep away clumsy spaces.",
    codeSnippet: `// Example: Text formatting and index slicing
const fullName = "Sarah Connor";
const [firstName, lastName] = fullName.split(" ");
const initialGreeting = firstName + " " + lastName.slice(0, 1) + ".";

console.log(initialGreeting); // "Sarah C."`,
    exercises: [
      {
        id: "string-template-interpolation",
        title: "Template Literal Interpolator",
        difficulty: "Warm-up",
        codeSnippet: `// Example Use Case: String generation
const user = "Alice";
const greeting = \`Hello, \${user}!\`; // "Hello, Alice!"`,
        conceptContext:
          "Template literals inside backticks (`) allow seamless variable and expression injection via standard ${} markers.",
        description:
          'Let\'s practice the most common way to build modern strings in JavaScript: using backticks and string interpolation!\n\nWrite a function `greetUser(name, role)` that uses a template literal to construct a customized greeting line.\n\nIt should return exactly: `"Welcome [name], your role is [role]"`',
        codeTemplate: `function greetUser(name, role) {
  // Return a template literal combining name and role
  
}`,
        functionName: "greetUser",
        hints: [
          "Use backticks (`) instead of single or double quotes for the string wrapper.",
          "Insert variables directly into the template string using ${name} and ${role}.",
        ],
        explanation:
          "Dynamic string interpolation replaces old string concatenation, creating cleaner and highly readable layouts.",
        testCases: [
          {
            id: 1,
            input: ["Alice", "admin"],
            expected: "Welcome Alice, your role is admin",
            description: "Interpolates name 'Alice' and role 'admin'",
          },
          {
            id: 2,
            input: ["Bob", "moderator"],
            expected: "Welcome Bob, your role is moderator",
            description: "Interpolates name 'Bob' and role 'moderator'",
          },
        ],
      },
      {
        id: "string-trim-spaces",
        title: "User Input Whitespace Cleanser",
        difficulty: "Warm-up",
        codeSnippet: `// Example Use Case: Removing accidental margins from input values
const message = "  Hello  ";
const clean = message.trim(); // "Hello"`,
        conceptContext:
          "The `.trim()` method removes empty space characters from both the beginning and end of a string without altering the internal text gaps.",
        description:
          "Scrub messy inputs by sweeping away accidental spaces at the start or end of a string using `.trim()`!\n\nWrite a function `cleanUsername(username)` that receives a string and returns it with all leading and trailing whitespaces removed.",
        codeTemplate: `function cleanUsername(username) {
  // Remove leading and trailing spaces
  
}`,
        functionName: "cleanUsername",
        hints: [
          "Call the .trim() method on the username argument.",
          "Remember that strings are immutable, so .trim() returns a fresh new string. Return this result.",
        ],
        explanation:
          "Cleaning input fields validates names and search queries safely before executing database lookups.",
        testCases: [
          {
            id: 1,
            input: ["   sarah_connor   "],
            expected: "sarah_connor",
            description:
              "Trims wide borders of leading and trailing spaces successfully",
          },
          {
            id: 2,
            input: ["john_doe"],
            expected: "john_doe",
            description: "Leaves properly structured names intact",
          },
        ],
      },
      {
        id: "string-case-normalization",
        title: "Case-Insensitive Email Normalizer",
        difficulty: "Warm-up",
        codeSnippet: `// Example Use Case: Case-insensitive email checks
const userEmail = "Sarah.Connor@Skynet.Com";
const normal = userEmail.toLowerCase(); // "sarah.connor@skynet.com"`,
        conceptContext:
          "Using `.toLowerCase()` or `.toUpperCase()` normalizes input elements, securing lookup matching keys from erratic casing mismatches.",
        description:
          "Make user searches or credentials case-insensitive by normalizing text to lower or upper case!\n\nWrite a function `normalizeEmail(email)` that receives a string and returns a completely lowercased version of the email address.",
        codeTemplate: `function normalizeEmail(email) {
  // Convert input email string to lowercase
  
}`,
        functionName: "normalizeEmail",
        hints: [
          "Use the built-in .toLowerCase() method on your email parameter.",
          "It does not accept any arguments and returns the newly normalized string.",
        ],
        explanation:
          "Normalizing data ensures that comparisons like 'User@Mail.com === user@mail.com' resolve securely to true.",
        testCases: [
          {
            id: 1,
            input: ["Sarah.Connor@Skynet.Com"],
            expected: "sarah.connor@skynet.com",
            description: "Normalizes a mix of upper and lower case letters",
          },
          {
            id: 2,
            input: ["ADMIN@domain.org"],
            expected: "admin@domain.org",
            description: "Slashes general all-cap inputs down",
          },
        ],
      },
      {
        id: "string-regex-match",
        title: "Secure Warning Validator & Sanitizer",
        difficulty: "Warm-up",
        codeSnippet: `// Examples:
"[SECURE] SPEED WARNING 1".startsWith("[SECURE]"); // true
"SPEED WARNING".includes("WARNING"); // true
"WARNING 123".replace(/[0-9]/g, ""); // "WARNING "`,
        conceptContext:
          "Use .startsWith(), .includes(), and .replace() with Regex categories to cleanly filter, validate, and sanitize structured log payloads.",
        description:
          'Let\'s validate and clean security transmission logs using search indicators and regular expressions!\n\nWrite a function `processMessage(msg)` that checks the following conditions on the input `msg` string:\n1. Check if the message starts with the prefix `"[SECURE]"` using `.startsWith()`.\n2. Check if the message contains the keyword `"WARNING"` using `.includes()`.\n3. If both conditions are met, clean the message by removing all numeric digits (characters `0-9`) using a global replace regex `/\\d/g` or `/[0-9]/g`, and return the cleaned string.\n4. If either condition is not met, return the string `"INVALID"`.',
        codeTemplate: `function processMessage(msg) {
  // 1. Verify startsWith "[SECURE]" and includes "WARNING"
  // 2. If valid, remove all numeric digits and return
  // 3. Otherwise return "INVALID"
  
}`,
        functionName: "processMessage",
        hints: [
          "Use if (msg.startsWith('[SECURE]') && msg.includes('WARNING')) to run the validation check.",
          "To clean digits, call msg.replace(/[0-9]/g, '') or use the \\\\d pattern regex globally.",
          "Ensure you return 'INVALID' if the checks fail.",
        ],
        explanation:
          "Combining basic string searches like startsWith and includes with powerful regular expression swaps cleans complex inputs without complex loop logic.",
        testCases: [
          {
            id: 1,
            input: ["[SECURE] SERVER ALERT WARNING 911"],
            expected: "[SECURE] SERVER ALERT WARNING ",
            description: "Valid secure message with digits cleaned",
          },
          {
            id: 2,
            input: ["[PUBLIC] WARNING LEVEL 4"],
            expected: "INVALID",
            description: "Fails prefix check and returns INVALID",
          },
          {
            id: 3,
            input: ["[SECURE] STANDARD DATA OK 200"],
            expected: "INVALID",
            description: "Fails keyword check and returns INVALID",
          },
        ],
      },
      {
        id: "string-slice-segments",
        title: "Area Code Segment Extractor",
        difficulty: "Warm-up",
        codeSnippet: `// Example Use Case: Extracting fixed slices from serial text codes
const text = "JavaScript";
const part = text.slice(0, 4); // "Java"`,
        conceptContext:
          "Extracting specific subsets of characters is simplified using standard string `.slice(startIndex, endIndexExclusive)` offsets.",
        description:
          "Extract portions of text from a string using ranges with `.slice(start, end)`!\n\nWrite a function `getAreaCode(phoneNumber)` that extracts and returns only the first three characters of a phone number string.",
        codeTemplate: `function getAreaCode(phoneNumber) {
  // Extract the first 3 characters representing the area code
  
}`,
        functionName: "getAreaCode",
        hints: [
          "Call .slice() on your phone string argument.",
          "The start index parameter should be 0, and the end index (exclusive) should be 3.",
        ],
        explanation:
          "Slicing slices complex logs and formatting phone codes into localized regional blocks easily.",
        testCases: [
          {
            id: 1,
            input: ["415-555-2671"],
            expected: "415",
            description: "Extracts area code from formatted phone blocks",
          },
          {
            id: 2,
            input: ["2129876543"],
            expected: "212",
            description: "Processes uniform numeric buffers smoothly",
          },
        ],
      },
      {
        id: "string-html-builder",
        title: "Sanitized HTML Button Builder",
        difficulty: "DSA Easy",
        codeSnippet: `// Example Use Case: Combining sanitizers in web component template wrappers
const choice = "  Save  ";
const type = "blue";
const elem = \`<span class="TAG-\${type.toUpperCase()}">\${choice.trim()}</span>\`;
// "<span class=\"TAG-BLUE\">Save</span>"`,
        conceptContext:
          "Production UI component renderers coordinate string template strings, trim whitespace scrubs, and standardize casing blocks simultaneously.",
        description:
          "Let's coordinate all the string tools you've learned to build a clean web component!\n\nWrite a function `buildHTMLButton(label, variant)` that constructs an interactive HTML button tag string.\n\nYour function must:\n1. Remove all leading and trailing whitespaces from `label` using `.trim()`.\n2. Convert `variant` completely to uppercase using `.toUpperCase()` so that the output style is formatted like `BTN-PRIMARY`.\n3. Wrap the results inside standard HTML button tags using a backtick template literal: `<button class=\"BTN-[variant]\">[label]</button>`.\n\nExample: `buildHTMLButton('   Click Me   ', 'primary')` would return `'<button class=\"BTN-PRIMARY\">Click Me</button>'`.",
        codeTemplate: `function buildHTMLButton(label, variant) {
  // Clean the label, transform the variant, and format the output HTML button tag
  
}`,
        functionName: "buildHTMLButton",
        hints: [
          "First call .trim() on label and assign it to a variable.",
          "Call .toUpperCase() on variant.",
          'Return the finalized HTML tag using a backtick template literal: \`<button class="BTN-\${cleanVariant}">\${cleanLabel}</button>\`.',
        ],
        explanation:
          "Combining multiple string methods enables declarative generation of robust UI views without risking formatting visual leaks.",
        testCases: [
          {
            id: 1,
            input: ["  Save Config  ", "primary"],
            expected: '<button class="BTN-PRIMARY">Save Config</button>',
            description:
              "Fuses trimmed label and uppercased primary class variant together",
          },
          {
            id: 2,
            input: ["Delete Record", "danger"],
            expected: '<button class="BTN-DANGER">Delete Record</button>',
            description:
              "Properly formats danger state classes and preserves input sizes",
          },
        ],
      },
    ],
  },
  {
    id: "array-search-verification",
    title: "Array Search & Checks",
    shortDescription:
      "Find specific elements and verify check status rules in list arrays.",
    longExplanation:
      "Searching through lists is a fundamental task. Instead of writing long and repetitive loop lines, JavaScript gives you built-in methods to query your data directly and elegantly.\n\n- **`.find()`**: Grabs the very first item that matches your custom search rule.\n- **`.some()`**: Returns `true` if at least one item matches your rule, and immediately stops searching.\n- **`.every()`**: Checks if *every single* item in the array passes your rule, returning `false` the moment one fails.",
    codeSnippet: `// Example: Finding the first matching element in a collection
const logs = [-5, -2, 4, -1, 10];
const firstPositiveLog = logs.find(num => num > 0);

console.log(firstPositiveLog); // 4`,
    exercises: [
      {
        id: "search-find-positive",
        title: "First Positive Number Finder",
        difficulty: "Warm-up",
        codeSnippet: `// Example Use Case: Finding the first positive metric in a series
const logs = [-5, -2, 4, -1, 10];
const firstPositiveLog = logs.find(num => num > 0);
// 4`,
        conceptContext:
          "The `.find()` utility walks your collection left-to-right and extracts the first single item that triggers your true/false test, returning undefined immediately if no items pass.",
        description:
          "Let's warm up with basic search lookups.\n\nWrite a function `firstPositive(nums)` that takes an array of numbers and returns the **first** element that is strictly positive (`> 0`). If no positive numbers exist, return `undefined`.",
        codeTemplate: `function firstPositive(nums) {
  // Use .find() to return the first positive number
  
}`,
        functionName: "firstPositive",
        hints: [
          "Call .find() on nums.",
          "The callback check should return: num > 0.",
        ],
        explanation:
          "Finding individual occurrences simplifies searching sorted databases on target coordinates.",
        testCases: [
          {
            id: 1,
            input: [[-10, -5, 0, 7, -2, 12]],
            expected: 7,
            description: "Locates first positive integer successfully",
          },
          {
            id: 2,
            input: [[-1, -2, -3]],
            expected: undefined,
            description:
              "Returns undefined when sequence doesn't contain positive values",
          },
        ],
      },
      {
        id: "search-contains-underage",
        title: "Age Compliance verifier",
        difficulty: "DSA Easy",
        codeSnippet: `// Example Use Case: Lenient check for any underage attendees
const ages = [21, 25, 16, 30];
const hasMinor = ages.some(age => age < 18);
// true`,
        conceptContext:
          "The `.some()` utility performs an existential verification. It yields true if at least one item satisfies your condition, halting the search immediately on the first match.",
        description:
          "Verify safety conditions across dynamic collections.\n\nWrite a function `hasUnderage(ages, limit)` that checks whether there resides any customer in the array `ages` whose age is strictly less than the specified integer `limit`.",
        codeTemplate: `function hasUnderage(ages, limit) {
  // Use .some() to short circuit when compliance limits are violated
  
}`,
        functionName: "hasUnderage",
        hints: [
          "Call .some() on ages.",
          "Check whether the current visitor is younger than limit parameter: age < limit.",
        ],
        explanation:
          "Short-circuit checks avoid scanning complete arrays once violations are triggered.",
        testCases: [
          {
            id: 1,
            input: [[21, 25, 18, 30], 21],
            expected: true,
            description: "Correctly identifies presence of underage value (18)",
          },
          {
            id: 2,
            input: [[25, 30, 42], 21],
            expected: false,
            description: "Accurately passes all-compliant lists",
          },
        ],
      },
      {
        id: "search-all-even-positives",
        title: "Homogeneous Evens compliance Check",
        difficulty: "DSA Easy",
        codeSnippet: `// Example Use Case: Strict validation of homogeneous even numbers
const integers = [2, 4, 8, 10];
const allEven = integers.every(num => num % 2 === 0);
// true`,
        conceptContext:
          "The `.every()` helper enforces strict general collection compliance. It ensures that every single item conforms to your testing criteria, returning false right away if a single failure is detected.",
        description:
          "Enforce strict compliance standards across dynamic transaction collections.\n\nWrite a function `allEvenPositives(nums)` that checks if **all** numbers inside `nums` are both even (`x % 2 === 0`) AND strictly positive (`x > 0`).",
        codeTemplate: `function allEvenPositives(nums) {
  // Use .every() to assert that all elements satisfy your double requirement
  
}`,
        functionName: "allEvenPositives",
        hints: [
          "Call .every() on the array parameters.",
          "Check: num > 0 && num % 2 === 0.",
        ],
        explanation:
          "Asserting universal rules across data elements validates datasets integrity beautifully.",
        testCases: [
          {
            id: 1,
            input: [[2, 4, 8, 10]],
            expected: true,
            description: "Asserts positive check on all-even list",
          },
          {
            id: 2,
            input: [[2, -4, 8]],
            expected: false,
            description: "Successfully rejects list because of negative item",
          },
          {
            id: 3,
            input: [[2, 5, 8]],
            expected: false,
            description: "Successfully rejects list because of odd item",
          },
        ],
      },
      {
        id: "search-find-first-repeating",
        title: "First Duplicated Character Finder",
        difficulty: "DSA Easy",
        codeSnippet: `// Example Use Case: Finding first duplicate by comparing index boundaries
const word = "hello";
const firstRepeatIdx = [...word].findIndex((char, i, arr) => arr.indexOf(char) !== i);
// 3 (representing 'l')`,
        conceptContext:
          "Checking item frequencies inside sequences is solved by monitoring positional indices. If the first discovered position of a character is different from its current index, it has been encountered before.",
        description:
          "Locate the primary duplicate item within streams!\n\nWrite a function `firstRepeatingChar(str)` that scans a string and returns the **first** character that appears more than once.\n\nExample: `'abcdefb'` should return `'b'` since it represents the first letter we encounter a duplicate for.",
        codeTemplate: `function firstRepeatingChar(str) {
  // Use .find() or standard loop with indexOf checking to find duplicate positions
  
}`,
        functionName: "firstRepeatingChar",
        hints: [
          "Convert the string characters to an array: const chars = str.split('').",
          "Use .find() on chars: find( (char, i) => str.indexOf(char) !== i ).",
        ],
        explanation:
          "Positional checking isolates repeating tokens easily in single iteration sweeps.",
        testCases: [
          {
            id: 1,
            input: ["abcdefb"],
            expected: "b",
            description: "Locates first repeating character accurately",
          },
          {
            id: 2,
            input: ["xyz"],
            expected: undefined,
            description:
              "Returns undefined when all characters are entirely unique",
          },
        ],
      },
      {
        id: "search-find-subarray-target",
        title: "Subarray Range Target Sum Indexer",
        difficulty: "DSA Medium",
        codeSnippet: `// Example Use Case: Continuous range verification check
const sequence = [10, 2, 3, 7];
const containsTarget = (sequence.reduce((acc, current) => acc + current, 0) === 22);
// true`,
        conceptContext:
          "Locating matching subsegments uses sliding pointer coordinate sweeps to compute linear sums of contiguous slices relative to a specific target boundary.",
        description:
          "Find continuous sequences that add up to target limits!\n\nWrite a function `findSubarraySum(nums, target)` that locates a contiguous sub-array whose elements add up to exactly `target`.\n\nReturn an array containing start and end index boundaries: `[startIdx, endIdx]`.\n\nExample:\n`findSubarraySum([1, 4, 20, 3, 10, 5], 33)` -> `[2, 4]` (since 20 + 3 + 10 = 33).",
        codeTemplate: `function findSubarraySum(nums, target) {
  // Loop using parent pointer 'i' and inner pointer 'j' (or sliding windows) to track continuous totals
  
}`,
        functionName: "findSubarraySum",
        hints: [
          "Loop starting index 'i' from 0 to array length.",
          "Inside, loop secondary index 'j' accumulation: sum up values from i to j.",
          "If currentSum equals target, return [i, j]. If sum exceeds target, break early.",
        ],
        explanation:
          "Continuous index searches solve classic pipeline scheduling and buffers limit validations.",
        testCases: [
          {
            id: 1,
            input: [[1, 4, 20, 3, 10, 5], 33],
            expected: [2, 4],
            description: "Locates correct intermediate range sum accurately",
          },
          {
            id: 2,
            input: [[1, 2, 3], 6],
            expected: [0, 2],
            description: "Finds complete list arrays matches",
          },
        ],
      },
    ],
  },
  {
    id: "optional-chaining-coalescing",
    title: "Optional Chaining & Nullish Coalescing",
    shortDescription:
      "Safely query nested object fields and provide default fallbacks without crashing.",
    longExplanation:
      "When working with objects that have nested layers, your app can crash if you try to read a property from something that does not exist. JavaScript has two modern operators to protect your code:\n\n- **Optional Chaining (`?.`)**: Safely inspects nested fields. If any part of the path is missing, it immediately stops and returns `undefined` instead of throwing a screen-freezing error.\n- **Nullish Coalescing (`??`)**: Lets you provide a fallback default value only when a field is strictly missing (`null` or `undefined`). This keeps legitimate values like `false` or `0` intact!",
    codeSnippet: `// Example: Safely crawling nested objects with fallback values
const user = {
  name: "Leo",
  profile: {
    address: null // nested address layer is empty
  }
};

const coordinates = user?.profile?.address?.coordinates ?? "No coordinate profile found";
console.log(coordinates); // "No coordinate profile found"`,
    exercises: [
      {
        id: "safe-nested-attr",
        title: "Nested coordinates extractor",
        difficulty: "Warm-up",
        codeSnippet: `// Example Use Case: Accessing deep path parameters safely
const profile = { contact: { emails: ["a@b.com"] } };
const primaryEmail = profile?.contact?.emails?.[0] ?? "no-email";
// "a@b.com"`,
        conceptContext:
          "Deep objects can have parts missing at runtime. Placing optional chaining operator between attributes safely returns undefined if any node is empty.",
        description:
          "Let's warm up with basic safe lookups.\n\nWrite a function `getNestedCoordinates(user)` that safely extracts the map coordinates of a user. Check the parameter structure shown in the code editor comments to trace the layout.\n\nIf the coordinates or any intermediate layers are missing, fall back to `'No coordinate profile found'`.",
        codeTemplate: `function getNestedCoordinates(user) {
  // Example 'user' object structure:
  // {
  //   profile: {
  //     address: {
  //       coordinates: "40.71, -74.00"
  //     }
  //   }
  // }
  //
  // TODO: Securely extract and return the coordinates from the user profile,
  // or return 'No coordinate profile found' if any part of the path is missing.
  
}`,
        functionName: "getNestedCoordinates",
        hints: [
          "Access safely: const coords = user?.profile?.address?.coordinates.",
          "Use coalescing: return coords ?? 'No coordinate profile found'.",
        ],
        explanation:
          "Protecting pathway queries prevents deep API structures from crashing web applications.",
        testCases: [
          {
            id: 1,
            input: [{ profile: { address: { coordinates: "40.71, -74.00" } } }],
            expected: "40.71, -74.00",
            description: "Fetches valid deeply nested values",
          },
          {
            id: 2,
            input: [{ profile: {} }],
            expected: "No coordinate profile found",
            description:
              "Correctly handles incomplete nested properties without crashing",
          },
        ],
      },
      {
        id: "safe-preference-lookup",
        title: "Dynamic Default Preference Picker",
        difficulty: "DSA Easy",
        codeSnippet: `// Example Use Case: Distinguishing missing values from zero/false
const metrics = { count: 0 };
const score = metrics?.count ?? 10;
// 0`,
        conceptContext:
          "Nullish coalescing filters strictly for null or undefined. This ensures that valid but potentially falsy values like false or 0 are preserved, unlike standard OR operations.",
        description:
          "Let's explore selection mechanics where falsy inputs must be preserved!\n\nWrite a function `getUserThemePreference(settings)` that queries a user's customized theme settings to extract their active mode preference.\n\nVerify the settings structure in the code comments first. If the theme preference is completely omitted or undefined, return `true` as your fallback. Ensure that any explicitly configured settings (even falsy ones) are fully respected and not overridden by mistake.",
        codeTemplate: `function getUserThemePreference(settings) {
  // Example 'settings' object structure:
  // {
  //   theme: {
  //     darkMode: false  // true, false, or undefined
  //   }
  // }
  //
  // TODO: Retrieve the darkMode value dynamically from the user theme settings.
  // If the setting is omitted or undefined, return true. Ensure explicit false configurations remain preserved.
  
}`,
        functionName: "getUserThemePreference",
        hints: [
          "Query: const pref = settings?.theme?.darkMode.",
          "Apply ?? coalition: return pref ?? true.",
          "Remember that using || would incorrectly overwrite 'false' with the fallback.",
        ],
        explanation:
          "Nullish checks accurately distinguish defined false flags from missing properties.",
        testCases: [
          {
            id: 1,
            input: [{ theme: { darkMode: false } }],
            expected: false,
            description: "Retains explicitly specified false coordinates",
          },
          {
            id: 2,
            input: [{ theme: null }],
            expected: true,
            description: "Replaces missing levels with correct defaults",
          },
        ],
      },
      {
        id: "safe-matrix-bound",
        title: "Grid Out of Bounds Protector",
        difficulty: "DSA Easy",
        codeSnippet: `// Example Use Case: Safely accessing indices inside multi-dimensional structures
const matrix = [[1, 2]];
const value = matrix?.[0]?.[5] ?? -1;
// -1`,
        conceptContext:
          "Matrix lookups are protected by checking parent rows before indexing column cells. Chaining bracket notation prevents out-of-bounds runtime errors.",
        description:
          "Shield multi-dimensional array indexes from throwing out-of-bounds runtime errors!\n\nWrite a function `safeMatrixLookup(grid, row, col)` that securely fetches a single slot value inside a 2D grid matrix.\n\nAvoid any script crashes by gracefully returning `-1` if the coordinates are out of bounds.",
        codeTemplate: `function safeMatrixLookup(grid, row, col) {
  // Example 'grid' matrix structure:
  // [
  //   [1, 2],
  //   [3, 4]
  // ]
  //
  // TODO: Securely trace the value inside the 2D grid matrix at the specified
  // row and column coordinate index positions. If out of bounds, return -1.
  
}`,
        functionName: "safeMatrixLookup",
        hints: [
          "Apply optional bracket indexing: return grid?.[row]?.[col] ?? -1.",
        ],
        explanation:
          "Bracket chaining guards matrix coordinate searches against unexpected out-of-boundary runtime exceptions.",
        testCases: [
          {
            id: 1,
            input: [
              [
                [1, 2],
                [3, 4],
              ],
              1,
              0,
            ],
            expected: 3,
            description: "Correctly maps valid row and coordinate indexes",
          },
          {
            id: 2,
            input: [
              [
                [5, 6],
                [7, 8],
              ],
              5,
              0,
            ],
            expected: -1,
            description:
              "Replaces array-out-of-bounds exception with -1 securely",
          },
        ],
      },
      {
        id: "safe-log-sensor",
        title: "Nested telemetry diagnostics Picker",
        difficulty: "DSA Easy",
        codeSnippet: `// Example Use Case: Executing functions that may be undefined
const driver = { start: () => "OK" };
const message = driver?.start?.() ?? "inactive";
// "OK"`,
        conceptContext:
          "Chaining can be merged with dynamic function executions. If a targeted method is not implemented, the statement stops safely and outputs undefined, which can then be bypassed with fallback values.",
        description:
          "Extract sensor streams from dynamic diagnostic payloads!\n\nWrite a function `getSensorStatus(device)` that retrieves a device's vital health status. Use optional chaining to run `fetchMetrics` safely and fetch the status property, falling back to `'OFFLINE'` if the metrics are not resolved.",
        codeTemplate: `function getSensorStatus(device) {
  // Safely execute optional methods and fall back on static pathways
  
}`,
        functionName: "getSensorStatus",
        hints: [
          "Check method: let status = device?.fetchMetrics?.()?.status.",
          "Coalesce: return status ?? 'OFFLINE'.",
        ],
        explanation:
          "Evaluating optional diagnostic methods ensures modular device drivers function safely under missing parameters.",
        testCases: [
          {
            id: 1,
            input: [{ fetchMetrics: () => ({ status: "HEALTHY" }) }],
            expected: "HEALTHY",
            description:
              "Successfully executes dynamic diagnostic metrics methods",
          },
          {
            id: 2,
            input: [{ fetchMetrics: () => ({ status: "WARNING" }) }],
            expected: "WARNING",
            description: "Falls back securely when status is WARNING",
          },
          {
            id: 3,
            input: [{ fetchMetrics: () => ({ status: "OFFLINE" }) }],
            expected: "OFFLINE",
            description: "Correctly handles OFFLINE status values",
          },
        ],
      },
      {
        id: "safe-path-crawler",
        title: "Dynamic directory config Crawler",
        difficulty: "DSA Medium",
        codeSnippet: `// Example Use Case: Traversing nested tracks using keys list
const config = { database: { host: "localhost" } };
const path = ["database", "host"];
let resolved = config;
for (const key of path) {
  resolved = resolved?.[key];
}
// resolved is "localhost"`,
        conceptContext:
          "Traversal of unstructured deep settings is secured by dynamic bracket lookups. Walking keys sequentially yields values if pathways remain unbroken.",
        description:
          "Build a safe path resolver!\n\nWrite a function `crawlPath(obj, pathKeys)` that takes a nested object and an array of keys representing a coordinate pathway.\n\nit should traverse the target object along that sequence of keys, returning the final resolved value.\n\nIf at any layer the pathway breaks (the current key resolves to `null` or `undefined`), return `'PATH_BLOCKED'`.",
        codeTemplate: `function crawlPath(obj, pathKeys) {
  // Example inputs:
  // obj = { sys: { app: { port: 8080 } } }
  // pathKeys = ["sys", "app", "port"]
  //
  // TODO: Resolve the value at the nested path described by pathKeys.
  // If at any step along this path the lookup is null or undefined, return 'PATH_BLOCKED'.
  
}`,
        functionName: "crawlPath",
        hints: [
          "Initialize a let curr = obj; variable.",
          "Use a loop: for (const key of pathKeys) { curr = curr?.[key]; }.",
          "Return: return curr ?? 'PATH_BLOCKED'.",
        ],
        explanation:
          "Dynamic directory path traversal prevents crashes when parsing unstructured deep settings formats.",
        testCases: [
          {
            id: 1,
            input: [{ sys: { app: { port: 8080 } } }, ["sys", "app", "port"]],
            expected: 8080,
            description: "Navigates path arrays cleanly to find values",
          },
          {
            id: 2,
            input: [{ sys: { dev: {} } }, ["sys", "prod", "host"]],
            expected: "PATH_BLOCKED",
            description:
              "Yields BLOCKED indicators smoothly under broken branches",
          },
        ],
      },
    ],
  },
  {
    id: "set-unique-collections",
    title: "Unique Collections with Sets",
    shortDescription:
      "Store lists of unique values and eliminate duplicate records effortlessly.",
    longExplanation:
      "A `Set` is a built-in object in JavaScript that acts like an array, but with one special rule: it can **never** hold duplicate values. If you try to add an item that is already there, the Set will simply ignore it!\n\n- **Super-Fast Checks**: Unlike arrays, which must search from start to finish, a Set can instantly tell you if it contains an item using `mySet.has(value)`.\n- **Quick deduplication**: You can clean all duplicates out of an array in a single line of code: `[...new Set(myArray)]`.",
    codeSnippet: `// Example: Complete array deduplication and size queries
const duplicates = [1, 2, 2, 3, 1, 4];
const uniqueSet = new Set(duplicates);

console.log(uniqueSet.has(2)); // true
console.log([...uniqueSet]);   // [1, 2, 3, 4]`,
    exercises: [
      {
        id: "set-deduplicate-list",
        title: "Array Cleaner Deduplicator",
        difficulty: "Warm-up",
        codeSnippet: `// Example Use Case: Instantly removing raw array duplicate values
const items = [1, 2, 2, 3, 1, 4];
const unique = [...new Set(items)];
// [1, 2, 3, 4]`,
        conceptContext:
          "Set data structures represent native lists where each value can exist exactly once. This capability makes them ideal for instant duplicate extraction.",
        description:
          "Let's warm up with basic Set deduplication.\n\nWrite a function `deduplicateList(arr)` that quickly prunes duplicate values from an array, returning a clean deduplicated array.",
        codeTemplate: `function deduplicateList(arr) {
  // Use Set and spread operators to clear all array duplication
  
}`,
        functionName: "deduplicateList",
        hints: [
          "Load the input into a Set: const cleanSet = new Set(arr).",
          "Convert the Set back to an array: return [...cleanSet].",
        ],
        explanation:
          "Set instantiation filters lists instantly, simplifying data sanitization pipelines.",
        testCases: [
          {
            id: 1,
            input: [[5, 2, 8, 2, 5, 12]],
            expected: [5, 2, 8, 12],
            description: "Deduplicates numbers list safely",
          },
          {
            id: 2,
            input: [[1, 1, 1, 1]],
            expected: [1],
            description: "Collapses identical items cleanly",
          },
        ],
      },
      {
        id: "set-common-elements",
        title: "Mathematical Intersection Tracker",
        difficulty: "DSA Easy",
        codeSnippet: `// Example Use Case: Finding intersecting items in constant lookup complexity
const listA = [1, 2, 3];
const setB = new Set([2, 3, 4]);
const intersection = listA.filter(item => setB.has(item));
// [2, 3]`,
        conceptContext:
          "Overlapping values in two lists can be found efficiently. Converting one list to a Set gives us fast search capabilities, avoiding high computational overhead.",
        description:
          "Let's perform dynamic set intersection comparisons!\n\nWrite a function `findCommon(arr1, arr2)` that takes two arrays. It should return a deduplicated array containing elements that are present in **both** inputs.\n\nYour code should run in optimum linear **O(N + M)** time using Sets.",
        codeTemplate: `function findCommon(arr1, arr2) {
  // Use a seen Set to filter overlap elements in linear complexity
  
}`,
        functionName: "findCommon",
        hints: [
          "Convert arr2 into a Set: const set2 = new Set(arr2).",
          "Filter the unique elements from arr1 that exist inside set2: return [...new Set(arr1)].filter(x => set2.has(x)).",
        ],
        explanation:
          "Set membership lookups replace slow quadratic O(N²) array loops with high speed linear algorithms.",
        testCases: [
          {
            id: 1,
            input: [
              [1, 2, 2, 3],
              [2, 3, 4],
            ],
            expected: [2, 3],
            description: "Finds common intersecting elements",
          },
          {
            id: 2,
            input: [
              [5, 9],
              [1, 2],
            ],
            expected: [],
            description: "Correctly handles completely distinct lists",
          },
        ],
      },
      {
        id: "set-unique-characters",
        title: "Unique Characters String Tracker",
        difficulty: "DSA Easy",
        codeSnippet: `// Example Use Case: Verifying string has no repeating letters
const input = "prism";
const isUnique = new Set(input).size === input.length;
// true`,
        conceptContext:
          "Checking unique letters can compare sizes. If a collection of character entries contains no redundant values, its size remains identical to the initial count.",
        description:
          "Determine string metrics swiftly with size evaluations.\n\nWrite a function `isAllUniqueChars(str)` that checks whether all characters in a string are entirely distinct from one another.\n\nReturn `true` if every character appears exactly once. Otherwise, return `false`. Your code should execute in optimum linear **O(N)** time using Sets.",
        codeTemplate: `function isAllUniqueChars(str) {
  // Compare native sizes to evaluate unique character limits
  
}`,
        functionName: "isAllUniqueChars",
        hints: [
          "Create a Set from string characters: const charSet = new Set(str).",
          "Compare: return charSet.size === str.length.",
        ],
        explanation:
          "Set sizes reflect unique membership profiles, validating duplicates in a single comparison check.",
        testCases: [
          {
            id: 1,
            input: ["prism"],
            expected: true,
            description: "Identifies entirely distinctive character list",
          },
          {
            id: 2,
            input: ["hello"],
            expected: false,
            description: "Catches duplicate characters safely",
          },
        ],
      },
      {
        id: "set-symmetric-difference",
        title: "Exclusive Symmetric Difference Tracker",
        difficulty: "DSA Easy",
        codeSnippet: `// Example Use Case: Extracting exclusive items that exist in only one list
const a = new Set([1, 2]);
const b = new Set([2, 3]);
const diff = [1, 2, 3].filter(x => a.has(x) !== b.has(x));
// [1, 3]`,
        conceptContext:
          "Symmetric Difference extracts elements that exist in one collection but not both. This search filters and merges elements based on presence checks.",
        description:
          "Now let's compute set differences across compound groupings.\n\nWrite a function `symmetricDifference(arr1, arr2)` that identifies exclusive elements. It must return a deduplicated array containing elements that are present in `arr1` but not `arr2`, OR present in `arr2` but not `arr1`.\n\nEnsure that the output array contains only unique values and is constructed in linear time.",
        codeTemplate: `function symmetricDifference(arr1, arr2) {
  // Find distinct outer parts from both collections
  
}`,
        functionName: "symmetricDifference",
        hints: [
          "Convert both arrays into Sets: s1 = new Set(arr1) and s2 = new Set(arr2).",
          "Filter elements in arr1 that are not in s2, and elements in arr2 that are not in s1.",
          "Add both arrays together (e.g. using concat), deduplicate the merged list via Set, and spread return.",
        ],
        explanation:
          "Set differences identify distinct discrepancies between records pools in scalable, single pass lookups.",
        testCases: [
          {
            id: 1,
            input: [
              [1, 2, 3],
              [3, 4, 5],
            ],
            expected: [1, 2, 4, 5],
            description: "Finds symmetric differences correctly",
          },
          {
            id: 2,
            input: [
              [1, 1, 2],
              [2, 2],
            ],
            expected: [1],
            description: "Deduplicates exclusive inputs correctly",
          },
        ],
      },
      {
        id: "set-target-sum-seen",
        title: "Seen Set Two Sum Crawler",
        difficulty: "DSA Medium",
        codeSnippet: `// Example Use Case: Tracking numbers checked to find target pairs
const seenSet = new Set();
const additionGoal = 8;
const numbers = [5, 3, 10];
let foundPair = false;
for (const val of numbers) {
  if (seenSet.has(additionGoal - val)) foundPair = true;
  seenSet.add(val);
}
// true`,
        conceptContext:
          "Pair matches are evaluated by tracking historical parameters. Storing checked indices allows O(1) membership lookups for completing algebraic pairs.",
        description:
          "To complete the Sets series, let's solve an extremely optimized search equation.\n\nWrite a function `hasPairWithSum(nums, target)` that takes an array of integers and checks if there exists any pair of numbers that add up to exactly the `target` value.\n\nAchieve O(N) runtime complexity by saving checked values in a single `Set`, checking `target - currentNum` occurrences in O(1) time. Nested loops are forbidden!",
        codeTemplate: `function hasPairWithSum(nums, target) {
  // Use a seen values Set to track lookup records in linear O(N) complexity
  
}`,
        functionName: "hasPairWithSum",
        hints: [
          "Initialize a let seen = new Set().",
          "Loop through each num inside nums.",
          "Calculate the matching complement: target - num.",
          "If seen.has(complement) is true, return true. Else, add num to seen: seen.add(num).",
          "If the loop exits without finding matches, return false.",
        ],
        explanation:
          "Tracking history inside Seen sets validates pair associations in single lines of execution.",
        testCases: [
          {
            id: 1,
            input: [[10, 15, 3, 7], 17],
            expected: true,
            description: "Matches 10 and 7 summing to 17",
          },
          {
            id: 2,
            input: [[1, 2, 3, 9], 8],
            expected: false,
            description: "Correctly rejects non matching lists",
          },
        ],
      },
    ],
  },
  {
    id: "two-pointer-sliding-window",
    title: "Promises & Delay Timers",
    shortDescription:
      "Manage asynchronous delays, callbacks, and parallel timers using ES6 Promises.",
    longExplanation:
      "Unlike synchronous operations that block standard execution, modern JavaScript handles delays and network callbacks using Promises.\n\n- **Promises**: Represents a container for a value that is either resolved now, in the future, or never.\n- **Async / Await**: Clean syntax that pauses line completion until your Promise resolves, cleanly wrapping async procedures in sequential structures.",
    codeSnippet: `// Example: Timed delay Promise resolving custom values
const delayWithResult = (value, ms) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), ms);
  });
};

delayWithResult("Hello prompt resolved!", 1000)
  .then(word => console.log(word)); // "Hello prompt resolved!" after 1 second`,
    exercises: [
      {
        id: "delay-resolve",
        title: "Timed Delay Promise",
        difficulty: "Warm-up",
        codeSnippet: `// Example Use Case: Registering an asynchronous timeout task
const task = new Promise((resolve) => setTimeout(() => resolve("done"), 100));
// Resolves after 100 milliseconds`,
        conceptContext:
          "Asynchronous delay timers use Promise wrappers around native callback functions, putting resolve actions inside standard setTimeout events.",
        description:
          "Write a function `delayResolve(value, ms)` that returns a Promise. The Promise should resolve with the given `value` after `ms` milliseconds.",
        codeTemplate: `function delayResolve(value, ms) {
  // Return a new Promise resolving with the given value after ms milliseconds
  
}`,
        functionName: "delayResolve",
        hints: [
          "Return a new Promise: return new Promise((resolve) => { ... })",
          "Register a setTimeout inside: setTimeout(() => resolve(value), ms)",
          "The Promise resolves with the value argument.",
        ],
        explanation:
          "Delays execution safely, providing standard promise foundations.",
        testCases: [
          {
            id: 1,
            input: ["Success", 10],
            expected: "Success",
            description: "Resolves with Success",
          },
          {
            id: 2,
            input: [42, 5],
            expected: 42,
            description: "Resolves with number 42",
          },
        ],
      },
      {
        id: "promisify-callback",
        title: "Promisify Callback API",
        difficulty: "DSA Easy",
        codeSnippet: `// Example Use Case: Converting double-parameter callback flows
const legacyAPI = (id, cb) => cb(null, "retrieved_data");
const promisified = (id) => new Promise((resolve, reject) => {
  legacyAPI(id, (err, res) => err ? reject(err) : resolve(res));
});
// Resolves with "retrieved_data"`,
        conceptContext:
          "Node.js uses error-first callbacks. Wrapping those routines inside Promise constructors allows you to handle successes via resolve triggers and failures via reject triggers.",
        description:
          "Write a function `promisify(fn)` that takes a function `fn(arg, callback)` where callback has the signature `(error, result)`. Your function should return another function that accepts `arg` and returns a Promise. That Promise resolves with the result or rejects with the error.",
        codeTemplate: `function promisify(fn) {
  // Return a function accepting arg and returning a Promise wrapping callback behavior
  
}`,
        functionName: "promisify",
        hints: [
          "Return an inner function: return function(arg) { ... }",
          "Return a new Promise inside: return new Promise((resolve, reject) => { ... })",
          "Execute the callback: fn(arg, (err, res) => { if (err) reject(err); else resolve(res); })",
        ],
        explanation:
          "Converts callback interfaces into chainable Promises, enabling compatibility with async/await.",
        testCases: [
          {
            id: 1,
            input: ["hello"],
            expected: "hello!",
            description: "Resolves callback string on success",
          },
          {
            id: 2,
            input: ["fail"],
            expected: "Error: Failed",
            description: "Rejects callback with Node-style error",
          },
        ],
      },
      {
        id: "promise-all-safe",
        title: "Safe Promise.all Settler",
        difficulty: "DSA Easy",
        codeSnippet: `// Example Use Case: Gathering concurrent outcomes without halting on partial errors
const requests = [Promise.resolve("data"), Promise.reject(new Error("error"))];
const statusChecks = requests.map(p => p.then(v => ({ status: "fulfilled", value: v })).catch(e => ({ status: "rejected", reason: e.message })));
Promise.all(statusChecks).then(console.log);
// [{ status: "fulfilled", value: "data" }, { status: "rejected", reason: "error" }]`,
        conceptContext:
          "Concurrent processing uses array mappings. Injecting self-contained .catch blocks around individual child nodes prevents single failures from crashing adjacent achievements.",
        description:
          "Write a function `allSafe(promises)` that accepts an array of Promises and returns a Promise resolving to an array of objects representing their outcomes. Each outcome object must have the shape `{ status: 'fulfilled', value: ... }` on success, or `{ status: 'rejected', reason: ... }` on rejection. Use Promise.all underneath inside standard .then() / .catch() maps.",
        codeTemplate: `function allSafe(promises) {
  // Wrap each promise to self-catch and return unified status object, then feed to Promise.all
  
}`,
        functionName: "allSafe",
        hints: [
          "Map the promises array: promises.map(p => p.then(val => ({ status: 'fulfilled', value: val })).catch(err => ({ status: 'rejected', reason: err.message })))",
          "Pass this mapped array of self-safeguarded promises directly to Promise.all()",
        ],
        explanation:
          "Executes promises concurrently while preventing single failures from discarding valid adjacent resolutions.",
        testCases: [
          {
            id: 1,
            input: [
              [
                { val: "A", fail: false },
                { val: "B", fail: false },
              ],
            ],
            expected: [
              { status: "fulfilled", value: "A" },
              { status: "fulfilled", value: "B" },
            ],
            description: "Resolves all inputs gracefully",
          },
          {
            id: 2,
            input: [
              [
                { val: "A", fail: false },
                { val: "boom", fail: true },
              ],
            ],
            expected: [
              { status: "fulfilled", value: "A" },
              { status: "rejected", reason: "boom" },
            ],
            description:
              "Captures partial error while preserving other resolutions",
          },
        ],
      },
      {
        id: "async-fetch-json",
        title: "Mock API User Fetcher",
        difficulty: "DSA Easy",
        codeSnippet: `// Example Use Case: Safely invoking asynchronous APIs
async function fetchConfig(apiCall) {
  try {
    return await apiCall();
  } catch (err) {
    return "default_config";
  }
}`,
        conceptContext:
          "Structured exception handling guards network operations. Placing async requests in try-catch blocks isolates connection timeouts and supplies fallback datasets.",
        description:
          "Write an `async` function `fetchUserData(userId, mockFetch)` that calls `mockFetch(userId)` (which returns a Promise resolving to a user object: `{ username }`). Your function should return the uppercase representation of `username`. If the request fails or throws an error, catch the exception cleanly and return `'GUEST'`. Assume mockFetch is provided to you.",
        codeTemplate: `async function fetchUserData(userId, mockFetch) {
  // Fetch user data inside a try/catch block, returning uppercase username or fallbacks
  
}`,
        functionName: "fetchUserData",
        hints: [
          "Wrap your execution path in try { ... } catch (err) { ... }",
          "Await the fetch result: const data = await mockFetch(userId)",
          "Return the uppercase name target: return data.username.toUpperCase()",
          "On catch block failure, return the fallback string 'GUEST'",
        ],
        explanation:
          "Secures external API requests under reliable try-catch boundary systems.",
        testCases: [
          {
            id: 1,
            input: [123],
            expected: "JOHN_DOE",
            description: "Successfully parses username to uppercase",
          },
          {
            id: 2,
            input: [999],
            expected: "GUEST",
            description: "Swallows API error and returns fallback string GUEST",
          },
        ],
      },
      {
        id: "auto-retry-promise",
        title: "Auto-Retry Executor",
        difficulty: "DSA Medium",
        codeSnippet: `// Example Use Case: Attempting retry loops around unreliable pipelines
async function tryDownload(getTask) {
  for (let i = 0; i < 3; i++) {
    try {
      return await getTask();
    } catch (err) {
      if (i === 2) throw err;
    }
  }
}`,
        conceptContext:
          "Persistent execution models wrap unreliable pipelines in chronological retry iterations, capturing successive errors up until targeted failure budgets are fully exhausted.",
        description:
          "Write an `async` function `retryPromise(fn, maxRetries)` that takes an async function `fn` (which returns a Promise) and tries executing it. If it rejects or fails, retry execution up to `maxRetries` times. If it succeeds at any attempt, return the resolved value. If all attempts fail, reject with the final error from the last execution.",
        codeTemplate: `async function retryPromise(fn, maxRetries) {
  // Loop up to maxRetries times, awaiting fn() execution and recovering on failures
  
}`,
        functionName: "retryPromise",
        hints: [
          "Use a standard for loop from 1 to maxRetries",
          "Inside a try...catch block, await fn() and return the result instantly if it resolves",
          "On loop termination (all attempts exhausted), throw or let the final error reject",
        ],
        explanation:
          "Provides robust network request recovery sequences across transient offline phases.",
        testCases: [
          {
            id: 1,
            input: [3, 5],
            expected: "Success",
            description: "Succeeds on the third attempt under budget limit 5",
          },
          {
            id: 2,
            input: [4, 2],
            expected: "Error: Fail",
            description:
              "Rejects with final error if exhausted maxRetries limit 2",
          },
        ],
      },
    ],
  },
  {
    id: "spread-destructuring-unpack",
    title: "ES6 Rest, Spread & Unpacking",
    shortDescription:
      "Unpack fields easily and copy or combine objects and arrays.",
    longExplanation:
      "JavaScript has powerful shortcuts to help you pull values out of objects or arrays and glue details together with minimal code.\n\n- **Destructuring**: Pull out specific values from an object or array and save them directly as variables in one clean line (e.g., `const { name, age } = user`).\n- **Spread (`...`)**: Scatter the contents of an object or array into a new one. This is perfect for copying or combining lists and settings without changing the originals.",
    codeSnippet: `// Example: Object destructuring assignment with default fallbacks
const coordinates = { x: 10, y: 25 };
const { x, y, z = 0 } = coordinates;

console.log(x); // 10
console.log(y); // 25
console.log(z); // 0 (fallback default applied because z was undefined)`,
    exercises: [
      {
        id: "coords-extractor",
        title: "Fallback Coordinate Deconstructor",
        difficulty: "Warm-up",
        codeSnippet: `// Example Use Case: Extracting coordinates with fallback assignments
const coordinates = { x: 10, y: 25 };
const { x, y, z = 0 } = coordinates;
// x is 10, y is 25, z is 0 (fallback)`,
        conceptContext:
          "Destructuring pulls designated fields out of complex structures. Fallback values can be supplied in line to safeguard against missing values.",
        description:
          "Unpack three-dimensional nodes down to two planes cleanly.\n\nWrite a function `extractCoords(point)` that takes a point object containing properties `x`, `y`, and optionally `z`.\n\nUtilizing ES6 Object Destructuring with default values in a single line if possible:\n- Extract properties `x` and `y`.\n- Extract property `z`, falling back to `0` if `z` is `undefined` or not declared.\n- Return an array containing these values: `[x, y, z]`.",
        codeTemplate: `function extractCoords(point) {
  // Destructure x, y, and z (with a fallback default of 0) from the input point object
  
}`,
        functionName: "extractCoords",
        hints: [
          "Match properties inside object assignment syntax: const { x, y, z = 0 } = point.",
          "Return a direct array compiling these: [x, y, z].",
        ],
        explanation:
          "Destructuring assignments shield operations against undefined parameter properties.",
        testCases: [
          {
            id: 1,
            input: [{ x: 5, y: 12, z: 20 }],
            expected: [5, 12, 20],
            description: "Extracts coordinates completely with explicit z",
          },
          {
            id: 2,
            input: [{ x: 8, y: 3 }],
            expected: [8, 3, 0],
            description: "Gracefully falls back to 0 when z is absent",
          },
        ],
      },
      {
        id: "merge-profile",
        title: "Rest-Stripped Profile Merger",
        difficulty: "DSA Easy",
        codeSnippet: `// Example Use Case: Filtering delicate keys using rest parameters
const payload = { id: 1, secretToken: "TOKEN_SECRET", data: "open" };
const { secretToken, ...filteredPayload } = payload;
// filteredPayload is { id: 1, data: "open" }`,
        conceptContext:
          "Rest parameter syntax is able to capture all remaining properties after certain keys are extracted, allowing you to isolate and filter specific fields.",
        description:
          "Perform clean profile merges for dynamic directories, ensuring delicate keys like database tracking credentials are never leaked.\n\nWrite a function `mergeProfile(baseProfile, overrides)` that takes a base user object and an overrides object.\n\nIt should:\n- Double-merge both objects: base profile gets decorated with overrides.\n- Standardize the output by stripping out the specific property `dbToken` from the returned merged collection using the Rest operator.\n- Return this safe merged dictionary.",
        codeTemplate: `function mergeProfile(baseProfile, overrides) {
  // Merge both collections, and filter out dbToken cleanly via rest destructuring
  
}`,
        functionName: "mergeProfile",
        hints: [
          "Perform a shallow merge first: const merged = { ...baseProfile, ...overrides }.",
          "Using destructuring, isolate the dbToken while storing everything else into a Rest variable: const { dbToken, ...publicProfile } = merged.",
          "Return that publicProfile object.",
        ],
        explanation:
          "Stripping security variables is clean and safe using ES6 rest/destructuring patterns.",
        testCases: [
          {
            id: 1,
            input: [
              { name: "Sam", age: 19, dbToken: "XYZ_883" },
              { age: 20, status: "active" },
            ],
            expected: { name: "Sam", age: 20, status: "active" },
            description:
              "Updates properties correctly while deleting database credentials",
          },
        ],
      },
      {
        id: "gather-rest-sum",
        title: "Variable Arguments Adder",
        difficulty: "DSA Easy",
        codeSnippet: `// Example Use Case: Aggregating dynamic function parameters
const sumAll = (...values) => values.reduce((sum, v) => sum + v, 0);
const total = sumAll(2, 4, 6);
// 12`,
        conceptContext:
          "Rest parameter arrays collect variable inputs into a standard array. This lets functions support arguments of arbitrary count without manual arguments object lookups.",
        description:
          "Handle variable input arguments lists cleanly without standard loop offsets.\n\nWrite a function `gatherRestSum(multiplier, ...numbers)` that takes an initial factor multiplier, followed by a variable quantity of dynamic integers.\n\nIt should use the Rest parameter to capture those integers in an array, double-map or sum them, and return their combined total multiplied by the initial multiplier factor value.\n\nIf no numbers are provided, return `0`.",
        codeTemplate: `function gatherRestSum(multiplier, ...numbers) {
  // Capture dynamic values inside numbers array, aggregate them, and multiply by multiplier
  
}`,
        functionName: "gatherRestSum",
        hints: [
          "The arguments signature '(multiplier, ...numbers)' already wraps succeeding values inside an array called 'numbers'.",
          "Calculate the sum of elements in 'numbers' (e.g. using .reduce((sum, n) => sum + n, 0)).",
          "Multiply this sum result by the 'multiplier' value and return.",
        ],
        explanation:
          "Flexible signatures allow writing fluid, high-reusability SDK helper interfaces.",
        testCases: [
          {
            id: 1,
            input: [10, 1, 2, 3],
            expected: 60,
            description: "Combines 1+2+3 (6) and scales by 10 (60)",
          },
          {
            id: 2,
            input: [4],
            expected: 0,
            description:
              "Correctly evaluates to 0 when no extra numbers are supplied",
          },
        ],
      },
      {
        id: "deep-merge-config",
        title: "Single-Level Nested Config Double-Merger",
        difficulty: "DSA Easy",
        codeSnippet: `// Example Use Case: Inductive sub-key merging
const defaults = { ui: { theme: "light" } };
const userConfig = { ui: { font: "Inter" } };
const updated = { ...defaults, ui: { ...defaults.ui, ...userConfig.ui } };
// { ui: { theme: "light", font: "Inter" } }`,
        conceptContext:
          "Shallow copies overwrite nested properties entirely when parent keys collide. To combine nested properties, inner fields must be spread individually.",
        description:
          "Let's perform precision structural object combinations!\n\nWrite a function `deepMergeConfig(base, target)` that combines two config objects. Both contain a nested sub-configuration under the key `theme`.\n\nYour task is to merge both objects cleanly. Make sure that:\n- Normal parameters are overridden properly.\n- The sub-object dictionary under the key `theme` is merged individually (so that properties inside `base.theme` are retained unless explicitly overwritten by `target.theme`).\n- Return the completed merged configuration object.",
        codeTemplate: `function deepMergeConfig(base, target) {
  // Use spread operators on both parent and nested levels to blend configuration setups safely
  
}`,
        functionName: "deepMergeConfig",
        hints: [
          "Combine base and target first, then explicitly replace the 'theme' key properties with client-merged options: theme: { ...(base.theme || {}), ...(target.theme || {}) }.",
          "Assure you make the root level accessible, like: return { ...base, ...target, theme: { ...(base.theme || {}), ...(target.theme || {}) } }.",
        ],
        explanation:
          "Preserving nested properties rather than wiping them is a vital part of configuring settings clients.",
        testCases: [
          {
            id: 1,
            input: [
              { debug: true, theme: { primary: "blue", density: "compact" } },
              { port: 3000, theme: { primary: "yellow" } },
            ],
            expected: {
              debug: true,
              port: 3000,
              theme: { primary: "yellow", density: "compact" },
            },
            description:
              "Merges root attributes and nested theme setups correctly",
          },
        ],
      },
      {
        id: "swap-nested-coordinate",
        title: "Matrix Coordinate Destructuring Rotator",
        difficulty: "DSA Medium",
        codeSnippet: `// Example Use Case: Extracting elements from 2D structures in one step
const gridValues = [[1, 2], [3, 4]];
const [[topLeft, topRight], [bottomLeft, bottomRight]] = gridValues;
// topLeft is 1, bottomRight is 4`,
        conceptContext:
          "Hierarchical array destructuring lets you unpack structured matrix dimensions in a single statement, avoiding temp variables.",
        description:
          "Perform clean geometric shifts in a 2D matrix coordinates grid using unpacking patterns.\n\nWrite a function `rotateNestedPair(coords)` that takes a pairs matrix structured as: `[[x1, y1], [x2, y2]]`.\n\nit should:\n- Destructure and unpack these four variables in a single step.\n- Reassemble and return this pair swapped and rotated in the following structure: `[[y2, x2], [y1, x1]]`.",
        codeTemplate: `function rotateNestedPair(coords) {
  // Unpack coords cleanly via nested array destructuring pattern to swap positions instantly
  
}`,
        functionName: "rotateNestedPair",
        hints: [
          "Deconstruct using nested arrays: const [[x1, y1], [x2, y2]] = coords.",
          "Re-compile the elements back in swapped order as requested: [[y2, x2], [y1, x1]].",
        ],
        explanation:
          "Array destructuring swaps data structures cleanly without relying on manual temporary index holders.",
        testCases: [
          {
            id: 1,
            input: [
              [
                [
                  [1, 2],
                  [3, 4],
                ],
              ],
            ],
            expected: [
              [4, 3],
              [2, 1],
            ],
            description: "Swaps coordinates values and sub-arrays perfectly",
          },
        ],
      },
    ],
  },
  {
    id: "oop-classes-prototype",
    title: "Class Blueprint Specs",
    shortDescription:
      "Build structural templates to create objects with custom data and actions.",
    longExplanation:
      "Classes are blueprints for creating objects with matching shapes and actions. Instead of manually writing individual objects, you construct a template class so you can easily instantiate hundreds of matching instances.\n\n- **The Constructor**: A special function that runs once when you create a new object (using the `new` keyword) to set up initial variables.\n- **Subclasses and Inheritance**: Create specialized blueprints that inherit all properties and actions from a parent template (using the `extends` keyword).",
    codeSnippet: `// Example: Standard class constructor and method blueprints
class MemberProfile {
  constructor(username, status) {
    this.username = username;
    this.status = status;
  }
  
  getDetails() {
    return \`\${this.username} is \${this.status}\`;
  }
}

const user = new MemberProfile("Alice", "online");
console.log(user.getDetails()); // "Alice is online"`,
    exercises: [
      {
        id: "oop-simple-book",
        title: "Class-Based Book Descriptor",
        difficulty: "Warm-up",
        codeSnippet: `// Example Use Case: Generating standardized book collections
class CatalogBook {
  constructor(title) {
    this.title = title;
  }
}
const item = new CatalogBook("Dune");
// item is { title: "Dune" }`,
        conceptContext:
          "JavaScript classes are templates implemented via constructor functions. Calling them with the 'new' keyword creates a structured object instance.",
        description:
          "Construct a basic digital book profile generator.\n\nCreate a JavaScript class named `Book` that matches these qualities:\n- Constructor takes `title` and `author`.\n- Sets these as accessible object properties `this.title` and `this.author`.\n- Provides a method `getDetails()` which returns the string format: `'Title by Author'`.",
        codeTemplate: `class Book {
  // Implement constructor setting title and author, with a getDetails method
  
}`,
        functionName: "Book",
        hints: [
          "Define: class Book { ... }.",
          "Add: constructor(title, author) { this.title = title; this.author = author; }.",
          "Add: getDetails() { return this.title + ' by ' + this.author; }.",
        ],
        explanation:
          "Classes act as predictable code structure packages, mapping characteristics to modular services.",
        testCases: [
          {
            id: 1,
            input: ["The Hobbit", "J.R.R. Tolkien"],
            expected: "The Hobbit by J.R.R. Tolkien",
            description: "Formats book details accurately",
          },
        ],
      },
      {
        id: "oop-secure-account",
        title: "Guarded Bank Account Ledger",
        difficulty: "DSA Easy",
        codeSnippet: `// Example Use Case: Utilizing getters and setters to protect properties
class Wallet {
  constructor() { this._cash = 0; }
  get cash() { return this._cash; }
  set cash(amount) { if (amount >= 0) this._cash = amount; }
}
const stash = new Wallet();
stash.cash = -50; // Ignored!
// stash.cash remains 0`,
        conceptContext:
          "Getters and setters intercept reads and writes on class properties dynamically, enabling validations before the internal fields are updated.",
        description:
          "Configure security checks around transaction operations.\n\nCreate a class `BankAccount` that has:\n- Constructor that accepts standard account string `id` and `initialBalance`.\n- Properties `this.id` and a private-facing field `this._balance` (initially set to `initialBalance`).\n- A getter `balance` which fetches the current `_balance` rating.\n- A setter `balance(newAmount)` which updates `_balance` only if `newAmount` is greater than or equal to `0`. If negative, ignore the update entirely (i.e. do not alter `_balance`).",
        codeTemplate: `class BankAccount {
  // Implement constructor with getter/setter balance protecting against negative deposits
  
}`,
        functionName: "BankAccount",
        hints: [
          "Define a custom getter: get balance() { return this._balance; }.",
          "Define a custom setter: set balance(val) { if (val >= 0) this._balance = val; }.",
          "Make sure both variables are bound in constructor: this.id = id; this._balance = initialBalance;.",
        ],
        explanation:
          "Getters and setters enforce validation constraints on important internal data.",
        testCases: [
          {
            id: 1,
            input: ["ACC101", 500],
            expected: [500, 1200, 1200],
            description:
              "Grants legal deposits while silently rejecting negative values",
          },
        ],
      },
      {
        id: "oop-vector",
        title: "Immutable Vector Calculator",
        difficulty: "DSA Easy",
        codeSnippet: `// Example Use Case: Generating fresh calculation outputs immutably
class Point {
  constructor(x) { this.x = x; }
  shift(dx) { return new Point(this.x + dx); }
}
const basePt = new Point(5);
const shiftedPt = basePt.shift(10);
// basePt.x is still 5, shiftedPt.x is 15`,
        conceptContext:
          "Immutable objects avoid changing their inner properties, and instead return brand new class instances whenever calculations are performed.",
        description:
          "Perform coordinate calculation rules without corrupting original points datasets.\n\nCreate a class `Vector` that has:\n- Constructor accepting `x` and `y` numeric values.\n- A method `add(otherVector)` which adds coordinate fields cleanly, returning a brand new Vector instance with the resulting sum indices. (Original vectors must remain unchanged).",
        codeTemplate: `class Vector {
  // Create an arithmetic vector class that produces new vector products immutably
  
}`,
        functionName: "Vector",
        hints: [
          "Initialize values in constructor: this.x = x; this.y = y;.",
          "In add(other): calculate const newX = this.x + other.x; and const newY = this.y + other.y;.",
          "Return a new instance: return new Vector(newX, newY);",
        ],
        explanation:
          "Immutable class operations prevent side-effects in complex graphics engines.",
        testCases: [
          {
            id: 1,
            input: [
              [1, 5],
              [10, 20],
            ],
            expected: [11, 25],
            description: "Immutably unions vectors accurately",
          },
        ],
      },
      {
        id: "oop-inherited-vehicle",
        title: "Derived Electric Vehicle Subclass",
        difficulty: "DSA Easy",
        codeSnippet: `// Example Use Case: Inheriting parent models via subclasses
class Machine {
  constructor(name) { this.name = name; }
}
class RoboticCoring extends Machine {
  constructor(name, brand) {
    super(name);
    this.brand = brand;
  }
}
const client = new RoboticCoring("Corer", "CoreTech");
// client is structured with BOTH parent and child characteristics`,
        conceptContext:
          "Specialized models extend parent blueprints. Inherited parameters are passed to parent constructor functions using super constructor triggers.",
        description:
          "Unify parent behaviors across specialized product catalog classes.\n\n- Create a parent class `Vehicle` which has constructor taking `make` and `model` (sets `this.make` and `this.model`) and provides a getter `description` that yields 'Make Model'.\n- Create a subclass `ElectricCar` that extends `Vehicle`. It adds parameter `batteryCapacity` (kWh) in its constructor. Override the `description` getter to additionally return the battery capacity: 'Make Model (batteryCapacity kWh)'.",
        codeTemplate: `class Vehicle {
  // Define parent Vehicle class with description getter
  constructor(make, model) {
    this.make = make;
    this.model = model;
  }
  get description() {
    return this.make + ' ' + this.model;
  }
}
class ElectricCar extends Vehicle {
  // Extend Vehicle, implementing super constructor calls and overriding details description
  
}`,
        functionName: "ElectricCar",
        hints: [
          "Vehicles description getter returns: return this.make + ' ' + this.model;.",
          "ElectricCars constructor should call super: super(make, model). Then set this.batteryCapacity = batteryCapacity;.",
          "ElectricCar description getter should return: return super.description + ' (' + this.batteryCapacity + ' kWh)';",
        ],
        explanation:
          "Inheritance avoids coding duplications, managing nested entities structure cleanly.",
        testCases: [
          {
            id: 1,
            input: ["Tesla", "Model S", 100],
            expected: "Tesla Model S (100 kWh)",
            description: "Constructs electric subclasses correctly",
          },
        ],
      },
      {
        id: "oop-min-stack",
        title: "Class-Based High-Velocity MinStack",
        difficulty: "DSA Medium",
        codeSnippet: `// Example Use Case: Maintaining secondary tracks for tracking properties
class TrackingStack {
  constructor() {
    this.data = [];
    this.tracker = [];
  }
}`,
        conceptContext:
          "Complex structures manage parallel properties under the hood. Parallel arrays track auxiliary metrics to support fast status checks without scanning values.",
        description:
          "To complete the OOP classes track, let's engineer an elegant high-performance Data Structure Class!\n\nCreate a Class `MinStack` which operates exactly like a stack (Last-In-First-Out) but can find the minimum value in correct constant O(1) time.\n\nImplement these methods:\n- `push(val)`: pushes element onto stack.\n- `pop()`: removes top element of stack.\n- `top()`: fetches top element's value without removing it.\n- `getMin()`: fetches the absolute minimum element currently present inside the stack in constant O(1) time.",
        codeTemplate: `class MinStack {
  constructor() {
    // Initialize standard storage arrays in constructor
    
  }
  push(val) {
    
  }
  pop() {
    
  }
  top() {
    
  }
  getMin() {
    
  }
}`,
        functionName: "MinStack",
        hints: [
          "Maintain two arrays: this.stack = [] and this.minStack = [].",
          "When pushing: push to stack. Also push to minStack: the new value if minStack is empty, or Math.min(val, currentMin) represents top of minStack.",
          "When popping: pop from both stack and minStack.",
          "Ensure top() and getMin() return trailing array boundary slots in O(1) time: this.stack[this.stack.length - 1].",
        ],
        explanation:
          "Bundling advanced algorithms inside class types is the core foundation of high speed SDK engineering.",
        testCases: [
          {
            id: 1,
            input: [[10, 20, 5, 30]],
            expected: [5, 10],
            description:
              "Registers values and fetches minimums securely at any given layer of pop operations",
          },
        ],
      },
      {
        id: "oop-singleton-registry",
        title: "Thread-Safe Singleton Registry",
        difficulty: "DSA Medium",
        conceptContext:
          "In professional enterprise architectures, a 'Singleton' is a design pattern that limits instantiation of a class to exactly one single instance. In ES6 classes, we can implement this by caching our instance on a private-facing tracker during instantiation and returning that same instance on subsequent calls.",
        description:
          "Let's engineer a shared central configuration registry for our platform credentials!\n\nCreate a Class `Registry` that restricts itself to a single instance.\n- Its constructor should check if a shared instance already exists. If it does, discard the fresh instantiation and return the preexisting instance.\n- Set up an internal hash map field `this._store` (as an object or ES6 Map) on that single instance.\n- Setup a method `set(key, val)` that adds a configuration setting.\n- Setup a method `get(key)` that retrieves a configuration setting.\n- Ensure that all instantiations of `new Registry()` share the exact same internal store state (i.e. modifying fields in instance A updates instance B automatically).",
        codeTemplate: `class Registry {
  constructor() {
    // Implement Singleton caching check to return exactly the same instance reference
    
  }
  set(key, val) {
    
  }
  get(key) {
    
  }
}`,
        functionName: "Registry",
        hints: [
          "Define a static field on the Class: write `if (Registry.instance) { return Registry.instance; }` inside the constructor.",
          "Cache the instance reference: `Registry.instance = this;` inside the constructor before continuing.",
          "Initialize the store: `this._store = {};` inside the constructor.",
          "Write `set(key, val) { this._store[key] = val; }` and `get(key) { return this._store[key]; }`.",
        ],
        explanation:
          "The Singleton pattern ensures resource-heavy registries (like database pools or logging aggregators) are never duplicated needlessly.",
        testCases: [
          {
            id: 1,
            input: ["super-secret-firebase-api-key"],
            expected: [true, "super-secret-firebase-api-key"],
            description:
              "Verifies that multi-instantiated Registry references match and retrieve shared keys",
          },
        ],
      },
      {
        id: "oop-stateful-pubsub",
        title: "Event Mediator PubSub Class",
        difficulty: "DSA Medium",
        conceptContext:
          "In reactive UI development, a 'Publish-Subscribe' (PubSub) system decouples modules by letting objects listen for particular named event topics and trigger callback lists when events occur.",
        description:
          "Let's engineer an event emitter system!\n\nCreate a Class `EventEmitter` that supports event subscription, unsubscription, and publishing.\n- It should have an internal variable (e.g. `this._events = {}`) storing callback arrays keyed by event name.\n- A method `subscribe(event, callback)` that stores the callback under the matching event key. It **must** return a subscription object with an `unsubscribe()` method that removes that specific callback from the event list.\n- A method `publish(event, ...args)` that iterates and invokes all subscribed callbacks of that event key, passing the rest parameter arguments `args` directly to them.",
        codeTemplate: `class EventEmitter {
  constructor() {
    this._events = {};
  }
  subscribe(event, callback) {
    // Register subscription callback and return a subscription object containing unsubscribe()
    
  }
  publish(event, ...args) {
    // Invoke all registered callbacks of this event using rest parameter arguments
    
  }
}`,
        functionName: "EventEmitter",
        hints: [
          "Initialize the registry as an object in the constructor: `this._events = {};`.",
          "In `subscribe(event, cb)`, check if `this._events[event]` exists. If not, set it to `[]`. Push `cb` to it.",
          "Return `{ unsubscribe: () => { this._events[event] = this._events[event].filter(x => x !== cb); } }`.",
          "In `publish(event, ...args)`, check if any callbacks are registered. If so, loop and trigger: `this._events[event].forEach(cb => cb(...args))`.",
        ],
        explanation:
          "PubSub models form the backbone of state synchronization engines and layout render queues.",
        testCases: [
          {
            id: 1,
            input: ["click", "data-payload-125"],
            expected: ["data-payload-125", 0],
            description:
              "Correctly publishes event parameters to multiple subscribers, and stops after unsubscription",
          },
        ],
      },
      {
        id: "oop-builder-pattern",
        title: "Fluent Database Query Builder",
        difficulty: "DSA Medium",
        conceptContext:
          "In database SDKs (like Knex or TypeORM), the Builder Pattern provides a fluent interface to construct complex configurations, returning reference to `this` inside each step.",
        description:
          "Let's assemble elegant database client calls!\n\nCreate a Class `QueryBuilder` that supports chainable builder commands.\n- Property `this.query = { fields: '*', table: '', conditions: [], limitValue: null }` should hold the active query configuration.\n- Method `from(table)` sets `this.query.table` to the table name string.\n- Method `select(fields)` (where fields is an array of strings, e.g. `['id', 'name']`) sets `this.query.fields` to that string array.\n- Method `where(condition)` accepts a string condition (e.g. `'age > 18'`) and pushes it into the `this.query.conditions` array.\n- Method `limit(num)` sets `this.query.limitValue` to the number `num`.\n- Method `build()` compiles the configuration into a structured query object: `{ fields: this.query.fields, table: this.query.table, where: this.query.conditions, limit: this.query.limitValue }`.\n- Ensure each setting method (except `build`) returns the instance reference `this` to empower fluent chain loading (e.g. `const query = new QueryBuilder().from('users').limit(10).build();`).",
        codeTemplate: `class QueryBuilder {
  constructor() {
    this.query = {
      fields: '*',
      table: '',
      conditions: [],
      limitValue: null
    };
  }
  from(table) {
    
  }
  select(fields) {
    
  }
  where(condition) {
    
  }
  limit(num) {
    
  }
  build() {
    
  }
}`,
        functionName: "QueryBuilder",
        hints: [
          "Inside `from(table)`, write `this.query.table = table; return this;`.",
          "Inside `select(fields)`, write `this.query.fields = fields; return this;`.",
          "Inside `where(condition)`, write `this.query.conditions.push(condition); return this;`.",
          "Inside `limit(num)`, write `this.query.limitValue = num; return this;`.",
          "Inside `build()`, assemble the final shape: `return { fields: this.query.fields, table: this.query.table, where: this.query.conditions, limit: this.query.limitValue };`.",
        ],
        explanation:
          "The Builder pattern decouples complex, multi-variable object constructions from constructor initializers, making API suites readable.",
        testCases: [
          {
            id: 1,
            input: ["users", ["id", "name"], "age > 18", 10],
            expected: {
              fields: ["id", "name"],
              table: "users",
              where: ["age > 18"],
              limit: 10,
            },
            description:
              "Correctly chaining methods yields a perfectly assembled and matching database query model",
          },
        ],
      },
    ],
  },
  {
    id: "es6-maps-collections",
    title: "ES6 Map & WeakMap Collections",
    shortDescription:
      "Master Map and WeakMap collections for advanced key-value pairing and private metadata.",
    longExplanation:
      "While traditional JavaScript Objects map keys to values, they are limited to string or symbol keys and are subject to prototype pollution.\n\n- **ES6 Map**: Allows *any* value (numbers, objects, or functions) to serve as keys, remembers insertion order, and tracks count via `.size`.\n- **ES6 WeakMap**: Keys must be objects and are held weakly, allowing garbage-collection reclaiming memory when objects are dereferenced.",
    codeSnippet: `// Example: Creating and manipulating ES6 Map collections
const tally = new Map();
tally.set("apples", 3);
tally.set("banana", (tally.get("banana") || 0) + 1);

console.log(tally.get("apples")); // 3
console.log(tally.has("oranges")); // false`,
    exercises: [
      {
        id: "map-frequency-counter",
        title: "Clean Dictionary Word Indexer",
        difficulty: "DSA Easy",
        codeSnippet: `// Example Use Case: Registering word frequency scores
const scores = new Map();
scores.set("item", (scores.get("item") || 0) + 1);
// scores.get("item") is 1`,
        conceptContext:
          "ES6 Maps provide a prototype-safe lookup profile, establishing keys that are independent of built-in object properties and prototype inheritance chains.",
        description:
          "Write a function `frequencyMap(arr)` that tallies occurrences of strings inside an array. It should return an ES6 `Map` mapping each unique element to its total frequency count.",
        codeTemplate: `function frequencyMap(arr) {
  // Return an ES6 Map counting element frequencies
  
}`,
        functionName: "frequencyMap",
        hints: [
          "Initialize: const counts = new Map();",
          "Loop over elements. Use map.has(item) ? map.get(item) : 0 to fetch count",
          "Increment and write back using counts.set(item, currentCount + 1)",
        ],
        explanation:
          "Maintains unique key counts cleanly without colliding on inherited Object prototype keys.",
        testCases: [
          {
            id: 1,
            input: [["apple", "banana", "apple"]],
            expected: new Map([
              ["apple", 2],
              ["banana", 1],
            ]),
            description: "Tally frequency of fruit strings in Map",
          },
        ],
      },
      {
        id: "map-object-keys",
        title: "Object Memory Mapping Store",
        difficulty: "DSA Easy",
        codeSnippet: `// Example Use Case: Mapping metadata directly to object structures
const elementNode = { tag: "div" };
const nodesRegistry = new Map();
nodesRegistry.set(elementNode, { clicked: true });
// nodesRegistry.get(elementNode) is { clicked: true }`,
        conceptContext:
          "Unlike plain objects, ES6 Maps allow developers to use objects directly as lookup keys, keeping reference addresses separate from value associations.",
        description:
          "Write a function `trackSessionStates(sessions, statuses)` that takes an array of session objects and an array of status strings of equal length. Map each object directly to its corresponding status inside an ES6 `Map`. Return the completed Map.",
        codeTemplate: `function trackSessionStates(sessions, statuses) {
  // Map sessions objects to corresponding statuses inside a single ES6 Map
  
}`,
        functionName: "trackSessionStates",
        hints: [
          "Create a new Map: const map = new Map();",
          "Iterate over sessions using a for loop or forEach index mapping sessions[i] directly to statuses[i]",
          "Set connections: map.set(sessions[i], statuses[i])",
        ],
        explanation:
          "Demonstrates object reference keys in ES6 Maps, preserving identity boundaries.",
        testCases: [
          {
            id: 1,
            input: [
              [{ id: 1 }, { id: 2 }],
              ["active", "idle"],
            ],
            expected: new Map([
              [{ id: 1 }, "active"],
              [{ id: 2 }, "idle"],
            ]),
            description: "Map session objects to statuses",
          },
        ],
      },
      {
        id: "map-iterator-sum",
        title: "Map Inventory Synchronizer",
        difficulty: "DSA Easy",
        codeSnippet: `// Example Use Case: Combining collections by iterating Map values
const baseMap = new Map([["A", 10]]);
const offsetMap = new Map([["A", 5], ["B", 2]]);
const merged = new Map(baseMap);
for (const [k, v] of offsetMap) {
  merged.set(k, (merged.get(k) || 0) + v);
}
// merged has key "A" with value 15`,
        conceptContext:
          "Map structures are iterable collections, meaning they expose entry, key, and value traversers which can be iterated cleanly via standard loops.",
        description:
          "Write a function `mergeInventoryMaps(mapA, mapB)` that merges two ES6 Map objects, where keys are item names and values are stock quantities. Return a new Map mapping item names to the combined sum of stock quantities.",
        codeTemplate: `function mergeInventoryMaps(mapA, mapB) {
  // Create a combined Map summing values from mapA and mapB
  
}`,
        functionName: "mergeInventoryMaps",
        hints: [
          "Create a copy from mapA: const merged = new Map(mapA);",
          "Loop over entries in mapB: for (const [key, val] of mapB.entries())",
          "Check if merged already has the key. If yes, add val to it; otherwise set key to val",
        ],
        explanation:
          "Uses native Map iteration capabilities to merge entries efficiently.",
        testCases: [
          {
            id: 1,
            input: [
              new Map([
                ["apples", 5],
                ["pears", 3],
              ]),
              new Map([
                ["pears", 10],
                ["oranges", 2],
              ]),
            ],
            expected: new Map([
              ["apples", 5],
              ["pears", 13],
              ["oranges", 2],
            ]),
            description: "Sum matching inventory keys",
          },
        ],
      },
      {
        id: "map-grouping-keys",
        title: "Relational Data Grouping Map",
        difficulty: "DSA Easy",
        codeSnippet: `// Example Use Case: Multi-value categorization
const entries = [{ cat: "A", val: 1 }, { cat: "A", val: 2 }];
const buckets = new Map();
entries.forEach(item => {
  if (!buckets.has(item.cat)) buckets.set(item.cat, []);
  buckets.get(item.cat).push(item.val);
});
// buckets has "A" mapping to [1, 2]`,
        conceptContext:
          "Map databases group data by dynamic variables or nested values without suffering from key collision or automatic prototype conversion.",
        description:
          "Write a function `bulkGroupUsersByRole(users)` that takes an array of user objects: `{ username, role }`. Return an ES6 Map where keys are roles and values are arrays of usernames that have that role.",
        codeTemplate: `function bulkGroupUsersByRole(users) {
  // Group users into array bucket arrays by their role string
  
}`,
        functionName: "bulkGroupUsersByRole",
        hints: [
          "Create private map: const map = new Map();",
          "Iterate over users. Extract role and username",
          "If map doesn't have the role bucket, create it: map.set(role, []). Then push username.",
        ],
        explanation:
          "Enables relational grouping models using Map collections.",
        testCases: [
          {
            id: 1,
            input: [
              [
                { username: "ali", role: "admin" },
                { username: "bo", role: "user" },
                { username: "cat", role: "admin" },
              ],
            ],
            expected: new Map([
              ["admin", ["ali", "cat"]],
              ["user", ["bo"]],
            ]),
            description:
              "Correctly groups usernames into corresponding role buckets",
          },
        ],
      },
      {
        id: "map-weakmap-cache",
        title: "WeakMap Metadata Cache Manager",
        difficulty: "DSA Medium",
        codeSnippet: `// Example Use Case: Setting leak-free cache associations
const heavyData = { dataRef: "val" };
const lookupCache = new WeakMap();
lookupCache.set(heavyData, { computedValue: 42 });
// lookupCache has dynamic key-value pair that auto-garbage-collects when heavyData reference is dropped`,
        conceptContext:
          "WeakMaps hold key references weakly. When an object key is dereferenced, its WeakMap cached pair automatically cleanses from system memory, preventing leaks.",
        description:
          "Write a function `cacheCompute(fn)` that implements object memoization. It should return a function wrapping `fn(obj)`. When called with an object `obj`, if `obj` exists in your internal `WeakMap`, return the cached result. Otherwise, execute `fn(obj)`, record the outcome in the WeakMap, and return the resolved result.",
        codeTemplate: `function cacheCompute(fn) {
  // Use a WeakMap instance to memoize outputs of object inputs
  
}`,
        functionName: "cacheCompute",
        hints: [
          "Declare: const cache = new WeakMap();",
          "Return wrapper function: return function(obj) { ... }",
          "Check cache: if (cache.has(obj)) return cache.get(obj);",
          "Compute, cache, and return: const res = fn(obj); cache.set(obj, res); return res;",
        ],
        explanation:
          "Binds calculation payloads to objects via WeakMap keys, enabling safe, leak-free caching.",
        testCases: [
          {
            id: 1,
            input: [],
            expected: true,
            description: "Caches computation and avoids extra execution calls",
          },
        ],
      },
    ],
  },
  {
    id: "recursion-call-stack",
    title: "Recursion & Call Stack Frames",
    shortDescription:
      "Write elegant functions that solve big problems by calling themselves with smaller inputs.",
    longExplanation:
      "Recursion is a fascinating technique where a function calls **itself** to break down a large problem into smaller, bite-sized tasks. Think of it like nested Russian nesting dolls: you open each layer until you find the prize inside.\n\n- **The Base Case**: Your parachute! This is the core condition that stops the function from calling itself forever. If you forget your base case, your program will crash with a 'stack overflow'.\n- **Ideal for Tree Structures**: Essential for winding through nested menus, folder filesystems, or HTML document branches.",
    codeSnippet: `// Example: Recursive summation of integers under n
function sumUp(n) {
  if (n <= 1) return n; // Base Case: the stop rule
  return n + sumUp(n - 1); // Recursive Step: adding and calling itself with smaller input
}

console.log(sumUp(4)); // 10 (4 + 3 + 2 + 1)`,
    exercises: [
      {
        id: "recursion-factorial",
        title: "Mathematical Factorial Calculator",
        difficulty: "Warm-up",
        codeSnippet: `// Example Use Case: Calculating combinatorics permutations recursively
const findPermutationsCount = (n) => {
  if (n <= 1) return 1;
  return n * findPermutationsCount(n - 1);
};
// findPermutationsCount(3) is 6`,
        conceptContext:
          "Recursive algorithms split tasks into smaller representations of themselves. A strict conditional check (the base case) is mandatory to prevent execution loops.",
        description:
          "Let's warm up with base-case validation! How it works: In compounding percentages, mathematical permutations, or building probability arrays in graphics engines, recursive formulas model multi-layered combinations elegantly.\n\nWrite a recursive function `factorial(n)` that calculates `n!` recursively. (Do not use loops like `for` or `while`).",
        codeTemplate: `function factorial(n) {
  // Base case: if n is 1 or less, return 1
  // Recursive step: n * factorial(n - 1)
  
}`,
        functionName: "factorial",
        hints: [
          "Establish the base case first: if (n <= 1) return 1;",
          "Otherwise, call the function recursively: return n * factorial(n - 1);",
        ],
        explanation:
          "Computes factorials using call-stack branching to build cumulative values elegantly.",
        testCases: [
          {
            id: 1,
            input: [5],
            expected: 120,
            description: "5! is equal to 120",
          },
          { id: 2, input: [0], expected: 1, description: "0! is equal to 1" },
        ],
      },
      {
        id: "recursion-array-flattener",
        title: "Deeply Nested Array Flattener",
        difficulty: "DSA Easy",
        codeSnippet: `// Example Use Case: Dismantling arrays with unknown dimensions
const nestedList = [1, [2, [3]]];
const extract = (arr) => arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? extract(val) : val), []);
// extract(nestedList) is [1, 2, 3]`,
        conceptContext:
          "Hierarchical arrays can be expanded by inspecting each list element recursively. Dynamic recursion allows flattening deeply nested arrays.",
        description:
          "Traverse deep nested hierarchies recursively! How it works: In rendering recursive components (like comments threads or directories menus), elements can be nested inside multiple nested subdirectories. Unpacking them into a linear array is standard practice.\n\nWrite a recursive function `deepFlatten(arr)` that takes an array containing nested arrays of any level of depth, and returns a single flat array.",
        codeTemplate: `function deepFlatten(arr) {
  // Traverse and reduce/loop recursively to assemble items into a single flat array
  
}`,
        functionName: "deepFlatten",
        hints: [
          "Initialize an empty output: const flat = [];",
          "Loop over each element in 'arr': using standard loop or .reduce().",
          "Check if item is array: if (Array.isArray(element)) { flat.push(...deepFlatten(element)); } else { flat.push(element); }",
          "Return the flat array.",
        ],
        explanation:
          "Recursively inspecting elements flattens arbitrary depths, mimicking recursive directory crawls perfectly.",
        testCases: [
          {
            id: 1,
            input: [[[1, [2, [3, 4]], 5]]],
            expected: [1, 2, 3, 4, 5],
            description: "Dismantles depth levels completely",
          },
        ],
      },
      {
        id: "recursion-fibonacci",
        title: "Recursive Fibonacci Indexer",
        difficulty: "Warm-up",
        codeSnippet: `// Example Use Case: Formulating growth values recursively
const findGrowthRate = (term) => {
  if (term <= 0) return 0;
  if (term === 1) return 1;
  return findGrowthRate(term - 1) + findGrowthRate(term - 2);
};
// findGrowthRate(4) is 3`,
        conceptContext:
          "Symmetric branching models complex mathematical growth by creating multiple recursive invocations side-by-side in each execution step.",
        description:
          "Write a recursive function `fibonacci(n)` that returns the n-th Fibonacci number. Assume n >= 0.",
        codeTemplate: `function fibonacci(n) {
  // Base cases: n <= 0 returns 0, n === 1 returns 1
  
}`,
        functionName: "fibonacci",
        hints: [
          "Identify your base cases: if n === 0 return 0; if n === 1 return 1.",
          "In recursive step, calculate the sum of the previous two numbers: return fibonacci(n-1) + fibonacci(n-2);",
        ],
        explanation:
          "Models branching recursion by dividing calculations into sub-branches.",
        testCases: [
          {
            id: 1,
            input: [6],
            expected: 8,
            description: "Calculates the 6th Fibonacci term (8)",
          },
          {
            id: 2,
            input: [1],
            expected: 1,
            description: "Calculates the 1st Fibonacci term (1)",
          },
        ],
      },
      {
        id: "recursion-sum-range",
        title: "Recursive Number Range Accumulator",
        difficulty: "Warm-up",
        codeSnippet: `// Example Use Case: Running countdown aggregators
const sumCountdown = (start) => {
  if (start <= 1) return start;
  return start + sumCountdown(start - 1);
};
// sumCountdown(3) is 6`,
        conceptContext:
          "Accumulating number sequences recursively reduces the value towards the base case, stacking addition frames in memory.",
        description:
          "Write a recursive function `sumRange(n)` that calculates the sum of all positive integers from 1 up to `n`. For example, `sumRange(4)` should return `10` (4 + 3 + 2 + 1). If `n` is 1 or less, return `n`.",
        codeTemplate: `function sumRange(n) {
  // Base case: if n is 1 or less, return n; otherwise add n to sumRange(n - 1)
  
}`,
        functionName: "sumRange",
        hints: [
          "Establish base case: if (n <= 1) return n;",
          "Otherwise return: return n + sumRange(n - 1);",
        ],
        explanation:
          "Sums ranges sequentially using stack memory frame structures.",
        testCases: [
          {
            id: 1,
            input: [4],
            expected: 10,
            description: "Calculates sum of 4 + 3 + 2 + 1",
          },
          {
            id: 2,
            input: [1],
            expected: 1,
            description: "Handles single case boundary safely",
          },
        ],
      },
      {
        id: "recursion-reverse-string",
        title: "Recursive String Reverser",
        difficulty: "DSA Easy",
        codeSnippet: `// Example Use Case: Reversing single character layers recursively
const reverseWord = (word) => {
  if (word.length <= 1) return word;
  return reverseWord(word.slice(1)) + word[0];
};
// reverseWord("car") is "rac"`,
        conceptContext:
          "Strings are modified recursively by slicing characters, recursively processing the remaining slice, and combining parts.",
        description:
          "Write a recursive function `reverseString(str)` that accepts a string `str` and returns its reversed version. For example, `reverseString('abc')` should return `'cba'`. (Do NOT use loops or native `.split().reverse().join()` methods).",
        codeTemplate: `function reverseString(str) {
  // Base case: if empty or single length string, return str
  // Otherwise, return the reversed remainder of the substring plus the first letter
  
}`,
        functionName: "reverseString",
        hints: [
          "Base case: if (str.length <= 1) return str;",
          "Recursive Step: return reverseString(str.slice(1)) + str[0];",
        ],
        explanation:
          "Recursively unwinds string characters backwards using call-stack frames.",
        testCases: [
          {
            id: 1,
            input: ["hello"],
            expected: "olleh",
            description: "Reverses standard string hello to olleh",
          },
          {
            id: 2,
            input: ["a"],
            expected: "a",
            description: "Maintains single-length letter perfectly",
          },
        ],
      },
    ],
  },
  {
    id: "linked-lists-trees",
    title: "Dates, Times & Milestones",
    shortDescription:
      "Work with Date objects, calculate time gaps, parse formats, and construct localized relative calendar strings.",
    longExplanation:
      "Time tracking and calendar scheduling are fundamental requirements in software interfaces. Modern JavaScript provides the `Date` constructor and internationalization APIs for robust temporal manipulations.\n\n- **Date Instance representation**: Houses absolute millisecond offsets from the Unix epoch (January 1, 1970 UTC).\n- **Date Parsing & Methods**: Retrieve or modify calendar boundaries cleanly using local or UTC helper methods.",
    codeSnippet: `// Example: Dynamic Date interval and offset calculations
const start = new Date("2026-05-15");
const end = new Date("2026-05-20");

// absolute difference in days
const diffTime = Math.abs(end - start);
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
console.log(diffDays); // 5

// adding days offset securely
start.setDate(start.getDate() + 10);
console.log(start.toISOString().slice(0, 10)); // "2026-05-25"`,
    exercises: [
      {
        id: "date-difference",
        title: "Date Milestone Difference",
        difficulty: "DSA Easy",
        codeSnippet: `// Example Use Case: Finding the gap between two calendar milestones
const dayDelta = Math.abs(new Date("2026-05-15") - new Date("2026-05-20"));
const daysCount = Math.floor(dayDelta / (1000 * 60 * 60 * 24));
// 5`,
        conceptContext:
          "Subtracting Date instances yields their raw difference in milliseconds, which can then be converted into standard calendar days using division operations.",
        description:
          "Write a function `getDaysBetweenDates(dateStr1, dateStr2)` that accepts two date strings in `YYYY-MM-DD` format and returns the absolute difference in full calendar days as an integer.",
        codeTemplate: `function getDaysBetweenDates(dateStr1, dateStr2) {
  // Convert strings to Date objects, divide absolute millisecond difference by standard day multiplier
  
}`,
        functionName: "getDaysBetweenDates",
        hints: [
          "Create Date instances: const d1 = new Date(dateStr1); const d2 = new Date(dateStr2);",
          "Obtain millisecond difference: Math.abs(d2 - d1);",
          "Convert to days dividing by milliseconds in a day: (1000 * 60 * 60 * 24)",
        ],
        explanation:
          "Normalizes calendar inputs to millisecond counters for reliable interval arithmetic.",
        testCases: [
          {
            id: 1,
            input: ["2026-05-20", "2026-05-27"],
            expected: 7,
            description: "Calculates exactly 7 days milestone gap",
          },
          {
            id: 2,
            input: ["2026-05-27", "2026-05-20"],
            expected: 7,
            description:
              "Maintains positive integer offset when order is reversed",
          },
        ],
      },
      {
        id: "date-weekday",
        title: "Localized Weekday Name",
        difficulty: "Warm-up",
        codeSnippet: `// Example Use Case: Resolving weekday name using standard localization
const nameDay = new Date("2026-05-25").toLocaleDateString("en-US", { weekday: "long" });
// "Monday"`,
        conceptContext:
          "JavaScript engines format date points directly to human-friendly week representations using localized calendars and standard formatting helpers.",
        description:
          "Write a function `getWeekdayName(dateStr)` that accepts a date string in `YYYY-MM-DD` format and returns the full day of the week in English (e.g. `'Monday'`, `'Tuesday'`, `'Wednesday'`).",
        codeTemplate: `function getWeekdayName(dateStr) {
  // Parse date string and return localized weekday string
  
}`,
        functionName: "getWeekdayName",
        hints: [
          "Instantiate the date: const d = new Date(dateStr);",
          "Use Intl.DateTimeFormat with day name configs: return d.toLocaleDateString('en-US', { weekday: 'long' });",
          "Ensure timezone offsets do not shift days by parsing with slashes or standard separators if formatting locally.",
        ],
        explanation:
          "Formats timestamp points to human-centric locale outputs using date localized formatting.",
        testCases: [
          {
            id: 1,
            input: ["2026-05-25"],
            expected: "Monday",
            description: "Correctly identifies 2026-05-25 as Monday",
          },
          {
            id: 2,
            input: ["2026-05-27"],
            expected: "Wednesday",
            description: "Correctly identifies 2026-05-27 as Wednesday",
          },
        ],
      },
      {
        id: "date-add-days",
        title: "Project Deadline Calculator",
        difficulty: "DSA Easy",
        codeSnippet: `// Example Use Case: Incremental date calculations
const deadline = new Date("2026-05-15");
deadline.setDate(deadline.getDate() + 10);
// deadline value is updated to representing May 25, 2026`,
        conceptContext:
          "Adding day counts cleanly relies on setting setDate metrics relative to active getDate parameters, shielding operations from rollover calculations.",
        description:
          "Write a function `addDaysToDate(dateStr, days)` that accepts a date string in `YYYY-MM-DD` format and an integer `days`, and returns a new date string in `YYYY-MM-DD` format with the offset applied.",
        codeTemplate: `function addDaysToDate(dateStr, days) {
  // Increment dates safely, returning flat YYYY-MM-DD formatted strings
  
}`,
        functionName: "addDaysToDate",
        hints: [
          "Instantiate: const d = new Date(dateStr);",
          "Apply offset: d.setDate(d.getDate() + days);",
          "Format back: return d.toISOString().slice(0, 10);",
          "Make sure any timezone shifts do not corrupt dates. Using UTC methods can improve safety: d.setUTCDate(d.getUTCDate() + days); return d.toISOString().slice(0, 10);",
        ],
        explanation:
          "Handles calendar month overflows and leap years transparently using native Date arithmetic.",
        testCases: [
          {
            id: 1,
            input: ["2026-05-20", 5],
            expected: "2026-05-25",
            description: "Identifies standard offset milestone",
          },
          {
            id: 2,
            input: ["2026-12-31", 1],
            expected: "2027-01-01",
            description: "Resolves year rollover boundaries gracefully",
          },
        ],
      },
      {
        id: "date-is-leap",
        title: "Leap Year Evaluator",
        difficulty: "Warm-up",
        codeSnippet: `// Example Use Case: Checking leap rules via astronomical intervals
const divideYear = (y) => (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0);
// true or false`,
        conceptContext:
          "Divisibility checks identify leap years, validating calendar dates by checking if February possesses an extra day.",
        description:
          "Write a function `isLeapYear(year)` that checks if a calendar year is a leap year. A year is a leap year if it is divisible by 4, but not by 100, unless it is also divisible by 400.",
        codeTemplate: `function isLeapYear(year) {
  // Check divisibility rules for leap years
  
}`,
        functionName: "isLeapYear",
        hints: [
          "Check standard divisibility: (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)",
          "An alternative trick: check if new Date(year, 1, 29).getMonth() === 1 to see if Feb has 29 days!",
        ],
        explanation:
          "Employs modular bounds arithmetic to declare leap year alignments accurately.",
        testCases: [
          {
            id: 1,
            input: [2024],
            expected: true,
            description: "Checks leap year divisible by 4",
          },
          {
            id: 2,
            input: [2026],
            expected: false,
            description:
              "Declares leap year false for standard non-divisible years",
          },
        ],
      },
      {
        id: "date-time-elapsed",
        title: "Relative Elapsed Time Parser",
        difficulty: "DSA Medium",
        codeSnippet: `// Example Use Case: Formulating relative countdowns
const displayPast = (gap) => gap < 60 ? "moments ago" : "longer ago";
// "moments ago"`,
        conceptContext:
          "Produce human relative strings by scaling elapsed timestamp offsets and compiling descriptions according to proportional measurements representing minutes, hours, or days.",
        description:
          "Write a function `formatRelativeTime(seconds)` that accepts an integer `seconds` representing a positive elapsed time. It should return a string format as follows: if `< 60` return `'X seconds ago'`, if `< 3600` return `'Y minutes ago'`, if `< 86400` return `'Z hours ago'`, and otherwise return `'W days ago'`.",
        codeTemplate: `function formatRelativeTime(seconds) {
  // Perform floor divisions to return formatted scale elapsed text segments
  
}`,
        functionName: "formatRelativeTime",
        hints: [
          "If seconds < 60, return `${seconds} seconds ago`",
          "If seconds < 3600, calculate minutes: Math.floor(seconds / 60) and return `${minutes} minutes ago`",
          "If seconds < 86400, calculate hours: Math.floor(seconds / 3600) and return `${hours} hours ago`",
          "Otherwise, calculate days: Math.floor(seconds / 86400) and return `${days} days ago`",
        ],
        explanation:
          "Formats numeric raw offsets into real-world relative user milestones.",
        testCases: [
          {
            id: 1,
            input: [45],
            expected: "45 seconds ago",
            description: "Renders seconds interval under 1 minute",
          },
          {
            id: 2,
            input: [120],
            expected: "2 minutes ago",
            description: "Renders minutes scale floor interval",
          },
          {
            id: 3,
            input: [7200],
            expected: "2 hours ago",
            description: "Renders hours scale floor interval",
          },
          {
            id: 4,
            input: [172800],
            expected: "2 days ago",
            description: "Renders days scale floor interval",
          },
        ],
      },
    ],
  },
  {
    id: "stack-queue-dsa",
    title: "Stacks, Queues & Monotonic Flow",
    shortDescription:
      "Enforce linear structures like Stacks (first-in-last-out) and Queues (first-in-first-out).",
    longExplanation:
      "Sometimes we need lists that enforce specific rules on how items enter and leave. Stacks and Queues are simple but incredibly useful arrays that have strict entry and exit lanes.\n\n- **Stack (LIFO / Last In, First Out)**: Think of a stack of plates. You add new plates to the top, and you can only take plates off the top. This is used in browser back buttons and undo history!\n- **Queue (FIFO / First In, First Out)**: Think of a line at a grocery checkout. The first person to join the line is the first one served. Great for ordering printer tasks or message background jobs.",
    codeSnippet: `// Example: Tracking matching items using a LIFO Stack
const bracketStack = [];
bracketStack.push("(");
bracketStack.push("[");

// Reached closing brace, pop the top of stack to verify matches
const lastOpener = bracketStack.pop(); 
console.log(lastOpener); // "["
console.log(bracketStack); // ["("]`,
    exercises: [
      {
        id: "stack-valid-parentheses",
        title: "Valid Parentheses Matcher",
        difficulty: "Warm-up",
        codeSnippet: `// Example Use Case: Storing parenthesis opener states inside arrays
const openTags = ["{", "["];
const lastOpenTag = openTags.pop();
// lastOpenTag is "[", openTags is ["{"]`,
        conceptContext:
          "Parentheses checks verify bracket symmetries by matching opening symbols against popped stack values, ensuring structured nesting syntax compliance.",
        description:
          "Verify nesting structure constraints!\n\nWrite a function `isValidParentheses(s)` that takes a string of bracket symbols: `(`, `)`, `[`, `]`, `{`, and `}`. It must evaluate whether the nested brace structure is completely valid.\n\nAn input string is valid if opening brackets are closed by the same type of brackets, and closed in the correct chronological nesting order.",
        codeTemplate: `function isValidParentheses(s) {
  // Use a stack to trace opening brackets and match them against closing brackets
  
}`,
        functionName: "isValidParentheses",
        hints: [
          "Initialize an empty array to serve as your stack.",
          "Map closing brackets to their matching opening brackets, e.g., ')' maps to '(', etc.",
          "Iterate over each character: if it's an opening bracket, push it. If it is a closing bracket, pop the top of the stack and compare. If it doesn't match or stack is empty, return false.",
          "Return true if and only if the stack is completely empty at the end.",
        ],
        explanation:
          "Brace checking forms the underlying parser compilation framework for matching code syntax trees in modern editors.",
        testCases: [
          {
            id: 1,
            input: ["()[]{}"],
            expected: true,
            description: "Validates fully closed matching sequences",
          },
          {
            id: 2,
            input: ["(]"],
            expected: false,
            description: "Rejects unmatched braces",
          },
          {
            id: 3,
            input: ["([{}])"],
            expected: true,
            description: "Validates deeply nested matching sequence",
          },
          {
            id: 4,
            input: ["["],
            expected: false,
            description: "Rejects unclosed opening bracket list",
          },
        ],
      },
      {
        id: "stack-backspace-compare",
        title: "Backspace String Comparator",
        difficulty: "DSA Easy",
        codeSnippet: `// Example Use Case: Processing backspaces iteratively
const buffer = [];
const addInput = (char) => char === "#" ? buffer.pop() : buffer.push(char);
addInput("a"); addInput("b"); addInput("#");
// buffer is ["a"]`,
        conceptContext:
          "Keyboard backspace events mutate ongoing strings. Applying array modifiers simulates real-time text deletion cleanly.",
        description:
          "Compare two typing sequences containing active backspaces.\n\nWrite a function `backspaceCompare(s, t)` that evaluates if the two typing strings `s` and `t` result in the exact same typed word. The character `#` represents a backspace key (erasing the previously typed character if any).\n\nProcess both strings using a stack, build their final states, and compare them for structural match.",
        codeTemplate: `function backspaceCompare(s, t) {
  // Process both input strings through helper stacks to rebuild and compare final words
  
}`,
        functionName: "backspaceCompare",
        hints: [
          "Create a helper function to compile a character string using a stack: const process = (str) => { ... }.",
          "Loop through each character: if char !== '#', push it to the stack. If char === '#', pop from stack (if not empty).",
          "Convert each stack back to a string and check if the processed s equals the processed t.",
        ],
        explanation:
          "The command-stack design pattern handles undo steps and delete registers across user input buffers.",
        testCases: [
          {
            id: 1,
            input: ["ab#c", "ad#c"],
            expected: true,
            description: "Both sequences map to 'ac' after resolving deletions",
          },
          {
            id: 2,
            input: ["ab##", "c#d#"],
            expected: true,
            description:
              "Handles empty strings correctly (both reduce to empty)",
          },
          {
            id: 3,
            input: ["a#c", "b"],
            expected: false,
            description: "Identifies mismatched outcomes: 'c' vs 'b'",
          },
        ],
      },
      {
        id: "stack-simplify-path",
        title: "Unix Directory Path Simplifier",
        difficulty: "DSA Easy-Medium",
        codeSnippet: `// Example Use Case: Directory path manipulation
const segments = ["home", "user", "..", "projects"];
const pathStack = [];
segments.forEach(dir => dir === ".." ? pathStack.pop() : pathStack.push(dir));
// pathStack contains ["home", "projects"]`,
        conceptContext:
          "Splitting input paths by delimiters uncovers dynamic directory jumps, converting complex relative file addresses into absolute paths.",
        description:
          "Resolve complex relative paths down to clean canonical Unix files.\n\nWrite a function `simplifyPath(path)` that takes an absolute Unix file path (e.g., `'/home//foo/../bar/'`) and simplifies it to the canonical form.\n\nYour canonical form must start with a single `'/'`, directories must be separated by a single `'/'`, the path must not end with a trailing `'/'`, and it must only contain directory names (excluding current '.' or parent '..' jumps).",
        codeTemplate: `function simplifyPath(path) {
  // Split path elements, process directory traversals using a stack, and join them with /
  
}`,
        functionName: "simplifyPath",
        hints: [
          "Split the path string by '/' using path.split('/'). This gives a clean array of parts.",
          "Initialize a directory stack: const stack = [].",
          "Iterate over parts: if part matches '' or '.', skip it. If part matches '..', pop from stack. Otherwise, push part.",
          "Join the stack with '/' and prefix with '/' to specify absolute file coordinate: '/' + stack.join('/')",
        ],
        explanation:
          "Operating system shells dynamically normalize messy path lines down to absolute disk directories using directory trees.",
        testCases: [
          {
            id: 1,
            input: ["/home/"],
            expected: "/home",
            description: "Frees trailing slashes cleanly",
          },
          {
            id: 2,
            input: ["/home//foo/"],
            expected: "/home/foo",
            description: "Collapses repeating path slashes",
          },
          {
            id: 3,
            input: ["/../"],
            expected: "/",
            description: "Prevents navigating past root directories",
          },
          {
            id: 4,
            input: ["/a/./b/../../c/"],
            expected: "/c",
            description: "Applies parent folder jumps accurately",
          },
        ],
      },
      {
        id: "stack-next-greater",
        title: "Next Greater Element Tracker",
        difficulty: "DSA Easy-Medium",
        codeSnippet: `// Example Use Case: Maintaining monotonic indexes
const numbers = [2, 10, 5];
const indexes = [0]; // Tracks index of 2
// 10 is greater than numbers[0], resolving index 0's next greater value to 10`,
        conceptContext:
          "Monotonic stacks sort index coordinates. If newly evaluated values exceed current stack benchmarks, we locate their greater successor in O(N).",
        description:
          "Locate successor values dynamically.\n\nWrite a function `nextGreaterElement(nums)` that accepts an array of integers and returns an array of the same length containing the 'next greater' element for each item.\n\nThe next greater element of a value at index `i` is the first element to its right that is strictly greater than `nums[i]`. If no greater element exists to its right, assign a default value of `-1` for that index coordinate.",
        codeTemplate: `function nextGreaterElement(nums) {
  // Use a stack to track pending elements that are looking for their next greater successor
  
}`,
        functionName: "nextGreaterElement",
        hints: [
          "Initialize a results array filled with -1 of length nums.length.",
          "Initialize an empty stack: const stack = [] which will store *indexes*.",
          "Iterate through nums from index 0 to nums.length - 1.",
          "Within a loop: while (stack.length > 0 && nums[i] > nums[stack[stack.length - 1]]), pop the top index from the stack, and assign results[poppedIdx] = nums[i].",
          "Push the current index `i` onto the stack.",
        ],
        explanation:
          "Monotonic stacks pre-solve upcoming threshold values in continuous stream calculations, optimizing O(N^2) checks to O(N).",
        testCases: [
          {
            id: 1,
            input: [[4, 5, 2, 25]],
            expected: [5, 25, 25, -1],
            description: "Matches standard list with scattered greater jumps",
          },
          {
            id: 2,
            input: [[13, 7, 6, 12]],
            expected: [-1, 12, 12, -1],
            description:
              "Handles falling values and terminal boundaries correctly",
          },
          {
            id: 3,
            input: [[5, 4, 3, 2, 1]],
            expected: [-1, -1, -1, -1, -1],
            description: "Returns -1 for strictly decreasing sequences",
          },
        ],
      },
      {
        id: "stack-evaluate-rpn",
        title: "Reverse Polish Expression Evaluator",
        difficulty: "DSA Medium",
        codeSnippet: `// Example Use Case: Processing postfix equations
const args = [3, 4, "+"];
const operands = [];
// push 3, push 4. Reached operator, pop them to sum: 3 + 4 = 7`,
        conceptContext:
          "Postfix mathematical formulas place operators after arguments. Standard stacks process these files sequentially without bracket rules.",
        description:
          "Design a stack-based equation calculator!\n\nWrite a function `evalRPN(tokens)` that evaluates an arithmetic expression presented in Reverse Polish Notation. Operators are represented by the strings `'+'`, `'-'`, `'*'`, and `'/'`.\n\nAssume valid input arrays. Division should perform integer division (truncating toward zero, e.g., floating outcomes like `1.5` truncate to `1`, while `-1.5` truncates to `-1`).",
        codeTemplate: `function evalRPN(tokens) {
  // Loop through tokens, push numbers, and evaluate binary expressions utilizing popped operands
  
}`,
        functionName: "evalRPN",
        hints: [
          "Prepare a stack to hold numerical arguments: const stack = [].",
          "For each token: if isNaN(Number(token)) is false, push the number representation: stack.push(Number(token)).",
          "If it is an operator: pop the right operand: const b = stack.pop(), then pop the left operand: const a = stack.pop().",
          "Evaluate the operator on a and b (e.g. standard +, -, *, or Math.trunc(a / b) for division) and push the answer back to the stack.",
          "Return the sole remaining element in the stack.",
        ],
        explanation:
          "Compiler engines convert nesting mathematical brace expressions into stack queues to safely execute operations on CPU registers.",
        testCases: [
          {
            id: 1,
            input: [["2", "1", "+", "3", "*"]],
            expected: 9,
            description: "Calculates (2 + 1) * 3 = 9 correctly",
          },
          {
            id: 2,
            input: [["4", "13", "5", "/", "+"]],
            expected: 6,
            description:
              "Computes 4 + (13 / 5) with zero-truncated division cleanly",
          },
          {
            id: 3,
            input: [
              [
                "10",
                "6",
                "9",
                "3",
                "+",
                "-11",
                "*",
                "/",
                "*",
                "17",
                "+",
                "5",
                "+",
              ],
            ],
            expected: 22,
            description:
              "Correctly handles deep compound calculations and negative signs",
          },
        ],
      },
    ],
  },
  {
    id: "fcc-basic-algorithms",
    title: "Array & Object Mechanics",
    shortDescription:
      "Practice core operations on arrays and objects, like cloning, deleting, and looping keys.",
    longExplanation:
      "These exercises will help you get comfortable with the absolute essentials of managing lists and objects. You will learn how to add and remove items, clone collections safely, run dynamic checks on properties, and find files or list configurations easily.",
    codeSnippet: `// Example: Dynamic array queue and stack modifications
const queue = ["apple", "banana"];

// Adding an item to the end of array
queue.push("cherry"); // ["apple", "banana", "cherry"]

// Removing the first item from array
const first = queue.shift(); // returns "apple", leaving ["banana", "cherry"]

console.log(queue); // ["banana", "cherry"]
console.log(first); // "apple"`,
    exercises: [
      {
        id: "ds-cart-queue",
        title: "Shopping Cart Queue Mutator",
        difficulty: "Warm-up",
        codeSnippet: `// Example Use Case: Managing sequential task buffers
const taskQueue = ["taskA"];
taskQueue.push("taskB");
const processed = taskQueue.shift();
// processed is "taskA", taskQueue is ["taskB"]`,
        conceptContext:
          "Array modifiers mutates lists in-place. Default parameters safeguard functions by assuring arguments resolve to valid structures even when left undefined.",
        description:
          "Write a function `manageCartQueue(cart = [], action, item)` that takes a `cart` array, an `action` string ('push', 'unshift', 'pop', or 'shift'), and an optional `item` string.\n\n- If the action is `'push'`, add the item to the end of the cart and return the cart.\n- If the action is `'unshift'`, add the item to the start of the cart and return the cart.\n- If the action is `'pop'`, remove the last item from the cart and return the cart.\n- If the action is `'shift'`, remove the first item from the cart and return the cart.\n\nYour code must mutate the original array in-place and return the updated array, leveraging ES6 parameters where possible.",
        codeTemplate: `function manageCartQueue(cart = [], action, item) {
  // Mutate cart ordering leveraging push, pop, shift, and unshift
  
}`,
        functionName: "manageCartQueue",
        hints: [
          "Use ES6 default parameters to ensure `cart` is safely initialized to an empty array.",
          "Check the action string using a clean switch statement or dynamic if-else conditions.",
          "Invoke the corresponding method: `cart.push(item)`, `cart.unshift(item)`, `cart.pop()`, or `cart.shift()`, then return the updated cart.",
        ],
        explanation:
          "Deepens your baseline knowledge of array order modifiers, using ES6 default parameter safeguards.",
        testCases: [
          {
            id: 1,
            input: [["laptop", "mouse"], "push", "keyboard"],
            expected: ["laptop", "mouse", "keyboard"],
            description: "Pushes item to end of cart",
          },
          {
            id: 2,
            input: [["laptop", "mouse"], "unshift", "charger"],
            expected: ["charger", "laptop", "mouse"],
            description: "Unshifts item to beginning of cart",
          },
          {
            id: 3,
            input: [["laptop", "mouse"], "pop"],
            expected: ["laptop"],
            description: "Pops last item out of cart",
          },
          {
            id: 4,
            input: [["laptop", "mouse"], "shift"],
            expected: ["mouse"],
            description: "Shifts first item out of cart",
          },
        ],
      },
      {
        id: "ds-catalog-splicer",
        title: "Store Catalog Splicer & Cloner",
        difficulty: "DSA Easy",
        codeSnippet: `// Example Use Case: Intercepting and replacing midpoint categories inline
const words = ["A", "B", "C"];
words.splice(1, 1, "NEW_B");
const clonedList = [...words];
// clonedList contains ["A", "NEW_B", "C"]`,
        conceptContext:
          "Splice operations insert or drop elements at designated array offsets, while the spread operator generates isolated shallow clones to protect reference records.",
        description:
          "Let's perform a bulk replacement operation on our store catalog lists!\n\nWrite a function `updateCatalog(catalog, startIndex, deleteCount, newItems)` that modifies the original `catalog` array in-place: removes `deleteCount` elements starting at index `startIndex` and inserts the contents of the `newItems` array at that location.\n\nFinally, return a brand new shallow copy of the modified catalog using the ES6 Spread Operator (`...`).",
        codeTemplate: `function updateCatalog(catalog, startIndex, deleteCount, newItems) {
  // Splice new items into catalog, then clone and return using spread operator
  
}`,
        functionName: "updateCatalog",
        hints: [
          "Call splice on catalog: catalog.splice(startIndex, deleteCount, ...newItems);.",
          "The '...' spread syntax inside splice argument unpacks the entire `newItems` array elements inline.",
          "To copy the array and return, spread it inside brackets: return [...catalog]; to avoid mutating references elsewhere.",
        ],
        explanation:
          "Utilizes splice combined with ES6 spread operations to insert custom sections and return fresh shallow copies.",
        testCases: [
          {
            id: 1,
            input: [["shirt", "pants", "hat"], 1, 1, ["shoes", "socks"]],
            expected: ["shirt", "shoes", "socks", "hat"],
            description:
              "Splices index 1, replaces pants with shoes and socks correctly",
          },
          {
            id: 2,
            input: [["apple", "banana"], 0, 2, ["orange"]],
            expected: ["orange"],
            description: "Overwrites entire catalog correctly",
          },
        ],
      },
      {
        id: "ds-shelf-finder",
        title: "Multi-Dimensional Warehouse Locator",
        difficulty: "DSA Easy",
        codeSnippet: `// Example Use Case: Element search validation
const subLevels = ["east_aisle", "west_aisle"];
const search = subLevels.includes("west_aisle");
// search is true`,
        conceptContext:
          "The includes helper performs search validations, verifying structural member coordinates by returning a clean boolean flag.",
        description:
          "In our warehouse, products are organized across multiple rows of shelves, styled as a 2D multi-dimensional array `shelves` (e.g. `[['apples', 'pears'], ['bananas'], ['lemons']]`). We need to scan our inventory and report which shelf indices contain a target product.\n\nWrite a function `findProductShelves(shelves, target)` that iterates over the outer `shelves` array and checks if the inner shelf contains the `target` product using `includes()`. Return a new array with all matching shelf indices.",
        codeTemplate: `function findProductShelves(shelves, target) {
  // Loop shelves and use the ES6 includes() method to locate shelf numbers containing target product
  
}`,
        functionName: "findProductShelves",
        hints: [
          "Initialize an empty results index list or use modern array aggregators.",
          "Iterate over shelves. You can use standard loops or modern loops like `for (let i = 0; i < shelves.length; i++)`.",
          "For each inner shelf array, check if it contains the target product using `shelves[i].includes(target)` of ES6 instead of `indexOf`.",
          "If the condition is met, push the current index `i` into the matching array.",
        ],
        explanation:
          "Combines looping logic with ES6 includes() boolean presence filters.",
        testCases: [
          {
            id: 1,
            input: [
              [["apples", "pears"], ["bananas"], ["apples", "oranges"]],
              "apples",
            ],
            expected: [0, 2],
            description: "Identifies apple shelf coordinates",
          },
          {
            id: 2,
            input: [[["jeans", "t-shirt"], ["shoes"]], "hat"],
            expected: [],
            description: "Returns empty list when item is absent from shelves",
          },
        ],
      },
      {
        id: "ds-profile-updater",
        title: "Nested User Preference Registrar",
        difficulty: "DSA Easy",
        codeSnippet: `// Example Use Case: Dynamic key registration and cleanup
const core = { info: { a: 1 } };
core.info["b"] = 2;
delete core.info["a"];
// core.info is { b: 2 }`,
        conceptContext:
          "Computing dynamic property associations inside objects leverages bracket entries, while standard check and delete helpers audit metadata boundaries.",
        description:
          "Let's manage registered user profile metadata! Each user has a profile of user details mapping a nested `preferences` object.\n\nWrite a function `manageUserProfile(profile, targetKey, newValue, purgeKey)` that:\n\n1. Adds or updates a property `targetKey` with value `newValue` inside the nested `profile.preferences` object (use dynamic bracket notation `profile.preferences[targetKey] = newValue`).\n2. Checks if an outdated property `purgeKey` is present inside `profile.preferences` using `.hasOwnProperty()`. If present, delete it using the `delete` keyword.\n3. Returns the modified complete `profile` object.",
        codeTemplate: `function manageUserProfile(profile, targetKey, newValue, purgeKey) {
  // Modify targetKey using brackets, check and delete purgeKey in profile.preferences
  
}`,
        functionName: "manageUserProfile",
        hints: [
          "Access the inner preference using brackets: `profile.preferences[targetKey] = newValue;`.",
          "Check presence using hasOwnProperty: `if (profile.preferences.hasOwnProperty(purgeKey))`.",
          "If present, delete: `delete profile.preferences[purgeKey];`.",
          "Return the modified parent profile object.",
        ],
        explanation:
          "Validates object mutations and key property checks using dynamic key entries.",
        testCases: [
          {
            id: 1,
            input: [
              {
                id: 101,
                username: "alex",
                preferences: { theme: "light", newsletter: true },
              },
              "theme",
              "dark",
              "newsletter",
            ],
            expected: {
              id: 101,
              username: "alex",
              preferences: { theme: "dark" },
            },
            description:
              "Updates theme preference to dark and deletes the newsletter key successfully",
          },
          {
            id: 2,
            input: [
              { id: 102, username: "sam", preferences: { fontSize: 14 } },
              "colorScheme",
              "high-contrast",
              "language",
            ],
            expected: {
              id: 102,
              username: "sam",
              preferences: { fontSize: 14, colorScheme: "high-contrast" },
            },
            description:
              "Adds colorScheme safely and leaves structural profile parts intact without errors",
          },
        ],
      },
      {
        id: "ds-inventory-auditor",
        title: "Iterative Category Stock Auditor",
        difficulty: "DSA Medium",
        codeSnippet: `// Example Use Case: Processing dynamic objects iteratively
const items = { apple: 10, orange: 20 };
const keys = Object.keys(items);
// keys is ["apple", "orange"]`,
        conceptContext:
          "Extracting dictionary keys and looping dynamic parameters cleanly is managed by entries translators, avoiding prototype property pollutions.",
        description:
          "To achieve complete data structures mastery, let's build an e-commerce inventory reporting auditor using modern ES6+ object entries techniques!\n\nWrite a function `auditStockGaps(inventory, minThreshold)` that audits a nested store `inventory` object (where categories map product names to their custom current stock counts). Your auditor must:\n\n1. Iterate through categories (keys) inside `inventory` using modern object iteration blocks.\n2. In each active category, collect all item keys whose values (stock) are strictly less than `minThreshold` and push them into a single `lowStockItems` flat list.\n3. Using `Object.keys()`, extract a list of categories that contain *one or more* low-stock items and store them inside an array named `flaggedCategories`.\n\nReturn a report object formatted precisely as follows:\n```javascript\n{\n  lowStockItems: [ ...all low stocked item names... ],\n  flaggedCategories: [ ...audited categories containing low items... ]\n}\n```",
        codeTemplate: `function auditStockGaps(inventory, minThreshold) {
  // Scan inventory categories using ES6 iterations, compile lowStockItems and flaggedCategories
  
}`,
        functionName: "auditStockGaps",
        hints: [
          "Initialize lowStockItems = [] and flaggedCategories = [].",
          "Convert inventory to pairs using `Object.entries(inventory)`. Loop them: `for (const [category, products] of Object.entries(inventory)) { ... }`.",
          "Inside, loop products also using `Object.entries(products)`: `for (const [product, stock] of Object.entries(products)) { ... }`.",
          "Using array destructuring is cleaner! If `stock < minThreshold`, push `product` into `lowStockItems`.",
          "If any product inside the category was under the threshold, push `category` into `flaggedCategories`.",
        ],
        explanation:
          "Integrates nested dictionary iteration using ES6 Object.entries() and destructuring.",
        testCases: [
          {
            id: 1,
            input: [
              {
                grocery: { apples: 12, bananas: 3 },
                beverages: { milk: 1, juice: 10 },
              },
              5,
            ],
            expected: {
              lowStockItems: ["bananas", "milk"],
              flaggedCategories: ["grocery", "beverages"],
            },
            description:
              "Correctly groups bananas and milk under the min threshold, flagging both categories",
          },
          {
            id: 2,
            input: [
              {
                apparel: { shirts: 20 },
                accessories: { sunglasses: 0 },
              },
              1,
            ],
            expected: {
              lowStockItems: ["sunglasses"],
              flaggedCategories: ["accessories"],
            },
            description:
              "Audits accessory list properly while discarding ample stock items from other categories",
          },
        ],
      },
      {
        id: "ds-deep-freeze",
        title: "Immutable Nested Object Guard",
        difficulty: "DSA Medium",
        codeSnippet: `// Example Use Case: Locking complex configs deeply
const settings = { style: { color: "red" } };
Object.freeze(settings);
// settings.style.color can still be modified because freeze is shallow`,
        conceptContext:
          "Shallow locking restricts root edits. Recursively applying freezing ensures deep mutability blocks, preventing downstream overrides.",
        description:
          "Let's build a recursive state locking vault!\n\nWrite a function `deepFreeze(obj)` that recursively locks the properties of `obj` (making them immutable).\n\nYour function must:\n1. Call `Object.freeze(obj)` on the target.\n2. Get all key properties of `obj` using `Object.keys()`.\n3. Recursively check if any of the values is an object or array (i.e. `typeof obj[key] === 'object' && obj[key] !== null`). If so, recursively invoke `deepFreeze(obj[key])` on them.\n4. Finally, return the fully frozen parent `obj`.",
        codeTemplate: `function deepFreeze(obj) {
  // Recursively freeze nested children object/array properties, then freeze obj
  
}`,
        functionName: "deepFreeze",
        hints: [
          "Call Object.freeze(obj) first.",
          "Iterate over keys: Object.keys(obj).forEach(key => ...).",
          "If typeof obj[key] === 'object' and it is not null, recursively call deepFreeze(obj[key]).",
          "Return the modified obj.",
        ],
        explanation:
          "Deep freezing ensures absolute immutability, which acts as a foundational principle in state libraries like Redux.",
        testCases: [
          {
            id: 1,
            input: [{ user: { profile: { age: 25 } } }],
            expected: [true, true],
            description: "Verifies the root and child nested fields are frozen",
          },
        ],
      },
      {
        id: "ds-matrix-transpose",
        title: "Matrix Row-Column Transposer",
        difficulty: "DSA Easy-Medium",
        codeSnippet: `// Example Use Case: Grid swapping calculations
const grid = [[10, 20]];
// Swap outer dimensions to build cols: [[10], [20]]`,
        conceptContext:
          "Transposing 2D coordinate systems moves horizontal coordinates to vertical layouts, reorganizing databases records into columns.",
        description:
          "Let's align a 2D dataset coordinates!\n\nWrite a function `transposeMatrix(matrix)` that accepts a 2D array of grid numbers and returns its mathematical transpose.\n- Assume a rectangular grid (each row has the same length, but rows vs cols count might differ).\n- Return a fresh translocated 2D array without mutating the input.",
        codeTemplate: `function transposeMatrix(matrix) {
  // Map row coordinates into cleanly swapped column lists
  
}`,
        functionName: "transposeMatrix",
        hints: [
          "Determine row length: const rows = matrix.length.",
          "Determine column length: const cols = matrix[0] ? matrix[0].length : 0.",
          "Construct a new outer array of length 'cols': write \`Array.from({ length: cols }, (_, c) => ...)\`.",
          "Map each column index 'c' to a row elements array: \`Array.from({ length: rows }, (_, r) => matrix[r][c])\`.",
        ],
        explanation:
          "Transposing values handles coordinate translation cleanly when swapping viewport orientations in canvas grids.",
        testCases: [
          {
            id: 1,
            input: [
              [
                [
                  [1, 2, 3],
                  [4, 5, 6],
                ],
              ],
            ],
            expected: [
              [1, 4],
              [2, 5],
              [3, 6],
            ],
            description: "Transforms a 2x3 matrix into a 3x2 matrix perfectly",
          },
          {
            id: 2,
            input: [
              [
                [
                  [1, 2],
                  [3, 4],
                ],
              ],
            ],
            expected: [
              [1, 3],
              [2, 4],
            ],
            description: "Transposes a standard square 2x2 grid successfully",
          },
        ],
      },
      {
        id: "ds-nested-key-deleter",
        title: "Recursive Nested Object Omitter",
        difficulty: "DSA Medium",
        codeSnippet: `// Example Use Case: Stripping sensitive credentials recursively
const record = { email: "a@x.com", auth: { pwd: "123" } };
// Recursively search nested shapes to strip key "pwd" cleanly`,
        conceptContext:
          "Sanitizing nesting layers recursively sweeps credentials fields before synchronizing datasets with browser memory channels.",
        description:
          "Let's secure nested records!\n\nWrite a function `omitKeyRecursive(obj, targetKey)` that recursively removes all properties matching `targetKey` from a source object or array of objects.\n\n- Do not mutate the original object; return a clean deeply cloned copy with the specified key deleted from all levels of nesting.\n- Handle nested objects, arrays of objects, and arrays containing other nested structures.",
        codeTemplate: `function omitKeyRecursive(obj, targetKey) {
  // Recursively omit matching keys from clones of objects and arrays
  
}`,
        functionName: "omitKeyRecursive",
        hints: [
          "Check base conditions first: if \`obj === null\` or \`typeof obj !== 'object'\`, return \`obj\`.",
          "If \`obj\` is an array, map its elements: \`return obj.map(item => omitKeyRecursive(item, targetKey))\`.",
          "If it is a plain object, create a new object: \`let copy = {}\`.",
          "Loop over keys \`Object.keys(obj)\`: if \`key !== targetKey\`, assign \`copy[key] = omitKeyRecursive(obj[key], targetKey)\`.",
          "Return the pruned \`copy\`.",
        ],
        explanation:
          "Deep filters let systems clean PII fields recursively before syncing states with client devices.",
        testCases: [
          {
            id: 1,
            input: [
              { id: 1, secret: "123", profile: { name: "Bob", secret: "foo" } },
              "secret",
            ],
            expected: { id: 1, profile: { name: "Bob" } },
            description:
              "Recursively deletes specified matching keys from both root and nested layers",
          },
          {
            id: 2,
            input: [[{ secret: "xyz", value: 10 }, { value: 20 }], "secret"],
            expected: [{ value: 10 }, { value: 20 }],
            description:
              "Handles arrays of nested objects perfectly, deleting targeted keys",
          },
        ],
      },
    ],
  },
  {
    id: "basic-algorithm-scripting",
    title: "Basic Function Scripting",
    shortDescription:
      "Practice basic script tasks like counting words or checking text inputs.",
    longExplanation:
      "This beginner-friendly section will get you writing complete programs to perform realistic text, array, and data formatting tasks. You will practice cleaning text, counting items in lists, sorting numbers, and filtering elements to build solid scripting intuition.",
    codeSnippet: `// Example: Case-insensitive character occurrences checking
const phrase = "JavaScript ES6";
const targetChar = "s";

// Spreading string into character array, brushing, and filtering target matches
const matches = [...phrase].filter(char => char.toLowerCase() === targetChar.toLowerCase());

console.log(matches.length); // 2`,
    exercises: [
      {
        id: "count-char-occurrence",
        title: "Character Speed Scanner",
        difficulty: "Warm-up",
        codeSnippet: `// Example Use Case: Matching specific characters in user logs
const sample = "Error Code: FFFF";
const count = [...sample].filter(c => c === "F").length;
// count is 4`,
        conceptContext:
          "Spreading a string converts a series of text characters into an array, which allows functional filters to iterate over individual letters cleanly.",
        description:
          "Write a function `countCharOccurrence(str, char)` that counts how many times a given single character `char` appears in the string `str`. Your implementation MUST be case-insensitive and should showcase elegant, blockless ES6 arrow function syntax.",
        codeTemplate: `function countCharOccurrence(str, char) {
  // Count specific letters inside input sentences (case-insensitive)
  
}`,
        functionName: "countCharOccurrence",
        hints: [
          "Convert your string into a character array using the modern ES6 spread operator: `[...str]`.",
          "Use the `.filter()` array helper with an arrow function to compare characters in a case-insensitive manner (e.g. converting both to lowercase).",
          "Return the length of the filtered array.",
        ],
        explanation:
          "Employs ES6 string spreading combined with modern array filters to replace traditional imperative loops.",
        testCases: [
          {
            id: 1,
            input: ["AbcdA", "a"],
            expected: 2,
            description: "Counts case-insensitive characters properly",
          },
          {
            id: 2,
            input: ["hello", "l"],
            expected: 2,
            description: "Tracks double repeating letters",
          },
          {
            id: 3,
            input: ["abc", "z"],
            expected: 0,
            description: "Handles cases with zero occurrences gracefully",
          },
        ],
      },
      {
        id: "build-frequency-map",
        title: "Sentence Word Frequency Map",
        difficulty: "DSA Easy",
        codeSnippet: `// Example Use Case: Indexing text elements elegantly
const words = ["hi", "hi", "hey"];
const freq = words.reduce((acc, w) => {
  acc[w] = (acc[w] || 0) + 1;
  return acc;
}, {});
// freq is { hi: 2, hey: 1 }`,
        conceptContext:
          "Aggregating strings inside dynamic lookup dictionaries is managed by reducers, mapping keyword metrics cleanly.",
        description:
          "Let's expand letter scans to full sentence word counting!\n\nWrite a function `buildFrequencyMap(sentence)` that takes a sentence string, splits it by spaces, and returns an object containing the lowercase count of each word. Make sure to remove any common trailing punctuation like commas, periods, exclamation points, and question marks `[, . ! ?]` beforehand so words parse cleanly, and implement it using ES6 `.reduce()`.",
        codeTemplate: `function buildFrequencyMap(sentence) {
  // Split words by space, strip basic punctuation, and map frequencies
  
}`,
        functionName: "buildFrequencyMap",
        hints: [
          "Clean trailing punctuation elements using regex: `sentence.replace(/[.,!?]/g, '')`.",
          "Convert the cleaned string to lowercase and split it by spaces to isolate individual words in an array.",
          "Call `.reduce((map, word) => { ... }, {})` to accumulate counts into a fresh lookup object, keeping your function purely functional.",
        ],
        explanation:
          "Translates primitive lists into a hashed frequency lookup table utilizing ES6 reduce aggregators.",
        testCases: [
          {
            id: 1,
            input: ["apple banana, apple! BANANA."],
            expected: { apple: 2, banana: 2 },
            description: "Strips punctuation and lowercases words correctly",
          },
          {
            id: 2,
            input: ["hello hello world"],
            expected: { hello: 2, world: 1 },
            description: "Understands simple spaced sentences correctly",
          },
        ],
      },
      {
        id: "filter-high-frequency-words",
        title: "Top-Tier Keyword Selector",
        difficulty: "DSA Easy",
        codeSnippet: `// Example Use Case: Filtering dictionary occurrences
const counts = { "cat": 5, "dog": 1 };
const topKeys = Object.keys(counts).filter(k => counts[k] > 2);
// topKeys is ["cat"]`,
        conceptContext:
          "Retrieving list filters and chaining alphabetized sorting methods isolates the highest ranking elements inside record collections.",
        description:
          "Now let's filter our dynamic frequency outputs!\n\nWrite a function `filterHighFrequencyWords(sentence, threshold)` that calculates word frequencies in a sentence (ignoring punctuation and casings) and returns an array of unique words that appear at least `threshold` times. This output array MUST be sorted alphabetically using modern array chaining.",
        codeTemplate: `function filterHighFrequencyWords(sentence, threshold) {
  // 1. Build frequency map
  // 2. Filter keys that meet or exceed the threshold
  // 3. Return the filtered words array sorted alphabetically
  
}`,
        functionName: "filterHighFrequencyWords",
        hints: [
          "First compute word frequencies identical to your buildFrequencyMap routine or call it.",
          "Extract all dictionary keys into an array using ES6 `Object.keys(freq)`.",
          "Perform a `.filter(word => freq[word] >= threshold)` on these keys.",
          "Invoke `.sort()` on the resulting list to ensure alphabetized ordering, utilizing succinct method chaining.",
        ],
        explanation:
          "Integrates dictionary mapping with functional filtering and alphabetical array sorting.",
        testCases: [
          {
            id: 1,
            input: ["the dog chased the cat and the dog", 2],
            expected: ["dog", "the"],
            description:
              "Filters words and returns them in perfect alphabetical order",
          },
          {
            id: 2,
            input: ["sweet sour sweet sweet salty", 3],
            expected: ["sweet"],
            description: "Extracts single high-frequency exceptions correctly",
          },
        ],
      },
      {
        id: "find-most-frequent-k-words",
        title: "Highly Popular Topic Sorter",
        difficulty: "DSA Medium",
        codeSnippet: `// Example Use Case: Multi-criteria sorted lists
const list = ["apple", "cherry"];
// Alphabetical backup locale compare checks: a.localeCompare(b)`,
        conceptContext:
          "Dynamic descending sorting matched with backup locale checking handles ties in word frequency lists, ensuring correct sorting order.",
        description:
          "Let's expand on our frequency sorters!\n\nWrite a function `findMostFrequentKWords(sentence, k)` that processes the sentence, counts individual word occurrences (lowercased without punctuation), and returns an array of the top `k` most frequent words. Sort the output in descending order of frequency. If multiple words have the exact same frequency, sort those words in alphabetical order.",
        codeTemplate: `function findMostFrequentKWords(sentence, k) {
  // Extract top k elements sorted by count descending, then alphabetically on count ties
  
}`,
        functionName: "findMostFrequentKWords",
        hints: [
          "Compile word frequency counts just like prior steps.",
          "Extract the unique keys list, then call `.sort((a, b) => ...)` with a custom comparison arrow function.",
          "Compare the counts: `freq[b] !== freq[a] ? freq[b] - freq[a] : a.localeCompare(b)`.",
          "Slice the sorted keys array from 0 to k using `.slice(0, k)`.",
        ],
        explanation:
          "Combines frequency mapping with multi-criteria custom sorting formulas used in analytics engines.",
        testCases: [
          {
            id: 1,
            input: ["banana apple banana cherry apple banana orange", 2],
            expected: ["banana", "apple"],
            description: "Returns top 2 popular items correctly",
          },
          {
            id: 2,
            input: ["b a c b a c", 2],
            expected: ["a", "b"],
            description:
              "Resolves alphabetical tie-breakers beautifully on identical match counts",
          },
        ],
      },
      {
        id: "frequent-subsegment-analyzer",
        title: "Target Subsegment Search Matcher",
        difficulty: "DSA Medium",
        codeSnippet: `// Example Use Case: Finding the highest scoring match
const targetHits = { "apple": 3, "pear": 1 };
// Select target keyword with highest frequency count using active dictionary indexes`,
        conceptContext:
          "Checking frequency counts against dedicated target keywords allows analytical systems to match relevant topics.",
        description:
          "To complete the frequency progression, let's match frequency indexes against a pre-selected blacklist or category list of search keywords!\n\nWrite a function `frequentSubsegmentAnalyzer(sentence, targets)` that counts word occurrences in `sentence` (case-insensitive, ignoring punctuation) and returns the word from the `targets` array that has the absolute highest frequency count in `sentence`.\n\n- If none of the words in `targets` appear in the sentence at all, return `null`.\n- If there is a tie between multiple targets, return the matching target word that appears *earlier/first* in the `targets` array.",
        codeTemplate: `function frequentSubsegmentAnalyzer(sentence, targets) {
  // Match frequency table results against targeted list search queries
  
}`,
        functionName: "frequentSubsegmentAnalyzer",
        hints: [
          "Map word frequency counts from sentence first.",
          "Use `.reduce()` on the `targets` array to choose the word with the highest occurrence count.",
          "When comparing, check if `freq[curr] > freq[acc]`. If both are equal or curr is not in freq, retain the earlier target.",
          "Verify if your final computed high score is greater than 0; if not, return `null`.",
        ],
        explanation:
          "Demonstrates practical document analyzer matches, intersecting freeform input grids with target reference datasets.",
        testCases: [
          {
            id: 1,
            input: [
              "The quick clever fox jumped over the lazy sleeping fox",
              ["fox", "lazy", "dog"],
            ],
            expected: "fox",
            description:
              "Selects target word with highest frequency successfully",
          },
          {
            id: 2,
            input: ["hello world", ["cat", "dog"]],
            expected: null,
            description:
              "Returns null when zero target criteria matches are found",
          },
          {
            id: 3,
            input: ["cat dog mouse", ["dog", "cat"]],
            expected: "dog",
            description:
              "Resolves ties in favor of array index priorities inside the targets array",
          },
        ],
      },
      {
        id: "algo-array-chunk",
        title: "Paginated Sub-Sequence Chunker",
        difficulty: "DSA Easy",
        codeSnippet: `// Example Use Case: Batch calculation streams
const source = [10, 20, 30, 40];
const firstPage = source.slice(0, 2);
// firstPage is [10, 20]`,
        conceptContext:
          "Splitting elements into fixed sized slices supports table paging and paginated API pagination schemes.",
        description:
          "Let's construct a paginating array utility!\n\nWrite a function `chunkArray(arr, size)` that splits an array `arr` into nested subarrays of length `size`.\n\n- If `arr` cannot be split evenly, the final chunk will simply contain the remaining trailing elements.\n- Return a single nested array containing these individual chunks in order.",
        codeTemplate: `function chunkArray(arr, size) {
  // Split array elements into nested subsets using slice calculations
  
}`,
        functionName: "chunkArray",
        hints: [
          "Initialize an empty results list: `let chunks = [];`.",
          "Write a standard `for` loop that steps forward by `size` on each iterator step: `for (let i = 0; i < arr.length; i += size)`.",
          "Use `.slice(i, i + size)` to extract the chunk subset of range elements.",
          "Push that slice directly into the results array.",
        ],
        explanation:
          "Array chunking is a foundational utility used across paginators, batch download managers, and rendering lists.",
        testCases: [
          {
            id: 1,
            input: [[1, 2, 3, 4, 5], 2],
            expected: [[1, 2], [3, 4], [5]],
            description:
              "Splits five elements into intervals of two, leaving a trailing single item chunk",
          },
          {
            id: 2,
            input: [["a", "b", "c"], 5],
            expected: [["a", "b", "c"]],
            description: "Correctly handles sizes exceeding the array length",
          },
        ],
      },
      {
        id: "algo-title-case",
        title: "Title Case Sentence Formatter",
        difficulty: "DSA Easy",
        codeSnippet: `// Example Use Case: Formatting display names
const word = "hello";
const title = word[0].toUpperCase() + word.slice(1);
// title is "Hello"`,
        conceptContext:
          "Standardizing casing styles requires isolating first characters for capital translation and appending the remaining string values lowercase.",
        description:
          "Let's standardize word casings!\n\nWrite a function `titleCase(str)` that receives a full string sentence and returns it nicely formatted in Title Case format.\n- Ensure that words are separated by a single space character in the resultant string.",
        codeTemplate: `function titleCase(str) {
  // Convert Str into matching words, capitalise initial index values, and join back with space
  
}`,
        functionName: "titleCase",
        hints: [
          "Convert the entire string to lowercase first: \`str.toLowerCase()\`.",
          "Split the sentence into individual words: \`.split(' ')\`.",
          "Map through the words array: for each word, capitalize the first index: \`word[0].toUpperCase() + word.slice(1)\` (or handle empty words).",
          "Re-join the resulting mapped array back with standard spaces: \`.join(' ')\`.",
        ],
        explanation:
          "Dynamic string token parsing handles layout transformations in newsfeeds and content management portals.",
        testCases: [
          {
            id: 1,
            input: ["I'm a lItTlE tEaPoT"],
            expected: "I'm A Little Teapot",
            description:
              "Format title capitalization perfectly with correct casing across scattered alphabets",
          },
          {
            id: 2,
            input: ["sHoRt AnD sToUt"],
            expected: "Short And Stout",
            description:
              "Takes lowercased or mixed casing string lines and converts them cleanly",
          },
        ],
      },
      {
        id: "algo-fib-sum-odds",
        title: "Odd Fibonacci Generator & Sum",
        difficulty: "DSA Medium",
        codeSnippet: `// Example Use Case: Compiling odd numbers
const numbers = [1, 2, 3];
const oddsOnly = numbers.filter(n => n % 2 !== 0);
// oddsOnly is [1, 3]`,
        conceptContext:
          "Summing specific number patterns builds a sequence programmatically, keeping bounds matched while isolating remainder values.",
        description:
          "Let's aggregate sequence subsets!\n\nWrite a function `sumFibs(num)` that returns the sum of all **odd** Fibonacci numbers that are less than or equal to `num`.\n\n- The first two numbers in the Fibonacci sequence are 1 and 1.\n- For example, passing `4` should return `5` because the Fibonacci numbers up to 4 are `1, 1, 2, 3`, and the sum of the odd ones is `1 + 1 + 3 = 5`.",
        codeTemplate: `function sumFibs(num) {
  // Generate sequence elements progressively and accumulate odd value matches
  
}`,
        functionName: "sumFibs",
        hints: [
          "Initialize three variables: \`let prev = 0; let curr = 1; let sum = 0;\`.",
          "Set up an iterative \`while\` loop that runs while \`curr <= num\`.",
          "If the current number is odd (\`curr % 2 !== 0\`), add it to the active accumulation: \`sum += curr\`.",
          "Step forward in the sequence: \`const next = prev + curr; prev = curr; curr = next;\`.",
          "Return the final sum.",
        ],
        explanation:
          "Iterative sequence filters compute dynamic thresholds in linear O(N) step speeds without triggering Call Stack overflows.",
        testCases: [
          {
            id: 1,
            input: [4],
            expected: 5,
            description:
              "Calculates sum of odd Fibonacci integers up to 4 correctly: 1 + 1 + 3 = 5",
          },
          {
            id: 2,
            input: [1000],
            expected: 1785,
            description:
              "Computes total sum of larger odd Fibonacci integers up to 1000 successfully",
          },
        ],
      },
    ],
  },
  {
    id: "intermediate-algorithm-scripting",
    title: "Intermediate Algorithm Scripting",
    shortDescription:
      "Solve intermediate problems with schedules, timelines, and overlapping ranges.",
    longExplanation:
      "Take your skills further by solving intermediate problems. You will work with ranges, manage calendars, find overlapping schedule spots, and learn how to align nested lists and timelines sequentially.",
    codeSnippet: `// Example: Checking adjacent sequences and sorting bounds
const steps = [1, 2, 3, 6, 7];
const intervals = [];

let start = steps[0];
let prev = steps[0];

for (let i = 1; i < steps.length; i++) {
  if (steps[i] === prev + 1) {
    prev = steps[i];
  } else {
    intervals.push([start, prev]);
    start = steps[i];
    prev = steps[i];
  }
}
intervals.push([start, prev]);

console.log(intervals); // [[1, 3], [6, 7]]`,
    exercises: [
      {
        id: "find-continuous-ranges",
        title: "Continuous Integer Range Compactor",
        difficulty: "DSA Easy",
        codeSnippet: `// Example Use Case: Finding connected sequences
const indices = [1, 2, 4];
// Detect contiguous breaks (difference !== 1) to cluster ranges`,
        conceptContext:
          "Iterating elements and tracking value sequence gaps groups continuous segments into tuple arrays.",
        description:
          "Write a function `findContinuousRanges(nums)` that takes a sorted array of unique integers and groups adjacent sequential numbers together, returning them as a list of interval coordinate tuples `[start, end]`.",
        codeTemplate: `function findContinuousRanges(nums) {
  // Pack adjacent sequences into interval bounds [start, end]
  
}`,
        functionName: "findContinuousRanges",
        hints: [
          "If nums array is empty, return an empty array [] immediately.",
          "Initialize a results range array. Track a start = nums[0] and prev = nums[0].",
          "Loop index from 1 to nums.length: if nums[i] is adjacent (nums[i] === prev + 1), update prev. If not (break in range), push [start, prev] and reset start = nums[i] and prev = nums[i].",
          "After the loop, push the remaining interval [start, prev].",
        ],
        explanation:
          "Compacts continuous sequences into concise intervals, typical of compression routines.",
        testCases: [
          {
            id: 1,
            input: [[1, 2, 3, 5, 6, 8]],
            expected: [
              [1, 3],
              [5, 6],
              [8, 8],
            ],
            description:
              "Packs linear values into three separate compact groups",
          },
          {
            id: 2,
            input: [[10, 11, 12, 13]],
            expected: [[10, 13]],
            description:
              "Squeezes standard continuous spans into a single block",
          },
          {
            id: 3,
            input: [[]],
            expected: [],
            description: "Correctly handles empty arrays",
          },
        ],
      },
      {
        id: "merge-overlapping-intervals",
        title: "Timeline Overlaps Merger",
        difficulty: "DSA Medium",
        codeSnippet: `// Example Use Case: Collapsing scheduled time sessions
const times = [[1, 3], [2, 4]];
// Resolve overlap bounds dynamically to return [[1, 4]]`,
        conceptContext:
          "Sorting interval arrays by their initial coordinate lets comparison blocks merge intersecting boundaries.",
        description:
          "Now that we can represent integer intervals, let's learn how to merge them when they overlap!\n\nWrite a function `mergeOverlappingIntervals(intervals)` that takes an array of arbitrary nested interval pairs `[start, end]`. It should sort them by start times and merge all overlapping boundaries, returning a new list of consolidated, sorted disjoint intervals.",
        codeTemplate: `function mergeOverlappingIntervals(intervals) {
  // Sort by start coordinates, then loop and merge overlapping boundaries
  
}`,
        functionName: "mergeOverlappingIntervals",
        hints: [
          "If the input has 1 or 0 intervals, return it immediately.",
          "Sort intervals ascending by start value: intervals.sort((a, b) => a[0] - b[0]).",
          "Initialize merged = [intervals[0]]. Loop over remaining intervals: check if current starts <= the end of the last item in merged. If yes, merge end values (update merged[last][1] = Math.max(end, currEnd)). If no, push new interval.",
        ],
        explanation:
          "Standard greedy-scheduler interval merger, consolidating sparse time grids.",
        testCases: [
          {
            id: 1,
            input: [
              [
                [1, 3],
                [8, 10],
                [2, 6],
                [15, 18],
              ],
            ],
            expected: [
              [1, 6],
              [8, 10],
              [15, 18],
            ],
            description:
              "Merges overlapping intervals and leaves independent bounds untouched",
          },
          {
            id: 2,
            input: [
              [
                [1, 4],
                [4, 5],
              ],
            ],
            expected: [[1, 5]],
            description:
              "Merges intervals with touching boundary numbers together",
          },
        ],
      },
      {
        id: "insert-and-merge-interval",
        title: "Live Event Timeline Inserter",
        difficulty: "DSA Medium",
        codeSnippet: `// Example Use Case: Injecting new events into disjoint arrays
const list = [[1, 5]];
// Insert [2, 7] and reduce output loops to return [[1, 7]]`,
        conceptContext:
          "Adding incoming tuples into pre-sorted interval systems scales cleanly by joining contiguous or overlapping borders sequentially.",
        description:
          "Let's apply our interval merging rules to handle live calendar additions!\n\nWrite a function `insertAndMergeInterval(intervals, newInterval)` that takes a list of pre-sorted, non-overlapping intervals, inserts a `newInterval` tuple into the correct position, and merges any overlapping bounds, returning the updated sorted disjoint intervals array.",
        codeTemplate: `function insertAndMergeInterval(intervals, newInterval) {
  // Insert a new event interval into sorted timetables and resolve merge overlaps
  
}`,
        functionName: "insertAndMergeInterval",
        hints: [
          "You can push newInterval onto intervals list.",
          "Then, invoke your mergeOverlappingIntervals function to sort and resolve overlapping ranges efficiently.",
          "Ensure your code is clean and handles situations where the list begins empty.",
        ],
        explanation:
          "Implements event insertions inside live calendars without breaking disjoint bounds rules.",
        testCases: [
          {
            id: 1,
            input: [
              [
                [1, 3],
                [6, 9],
              ],
              [2, 5],
            ],
            expected: [
              [1, 5],
              [6, 9],
            ],
            description:
              "Inserts overlap bounds, joining two segments together",
          },
          {
            id: 2,
            input: [
              [
                [1, 2],
                [3, 5],
                [6, 7],
                [8, 10],
              ],
              [4, 8],
            ],
            expected: [
              [1, 2],
              [3, 10],
            ],
            description:
              "Fuses multiple intervals together upon crossing midpoints",
          },
        ],
      },
      {
        id: "find-interval-intersection",
        title: "Coordinated Free Time Finder",
        difficulty: "DSA Medium",
        codeSnippet: `// Example Use Case: Finding intersecting hours
const userA = [[1, 5]];
const userB = [[3, 6]];
// Keep intersection ranges: [[3, 5]]`,
        conceptContext:
          "Scanning two sorted disjoint arrays using pointers measures maximum starts against minimum ends to locate structural intersections.",
        description:
          "Let's extract overlapping segments between two separate timetables!\n\nWrite a function `findIntervalIntersection(listA, listB)` that takes two separate lists of disjoint, sorted intervals, detects all overlapping ranges, and returns a new array of intersection intervals.",
        codeTemplate: `function findIntervalIntersection(listA, listB) {
  // Traverse both sorted timetables simultaneously and record intersections
  
}`,
        functionName: "findIntervalIntersection",
        hints: [
          "Initialize pointers i = 0, j = 0 and results = [].",
          "Ensure pointers are in bounds (i < listA.length && j < listB.length).",
          "Calculate overlap bounds: start = Math.max(listA[i][0], listB[j][0]), end = Math.min(listA[i][1], listB[j][1]).",
          "If (start <= end), push [start, end] into results.",
          "Increment pointer (if listA[i][1] < listB[j][1], i++; else j++;).",
        ],
        explanation:
          "Simultaneous linear scans identifying meeting times across discrete schedules.",
        testCases: [
          {
            id: 1,
            input: [
              [
                [0, 2],
                [5, 10],
              ],
              [
                [1, 5],
                [8, 12],
              ],
            ],
            expected: [
              [1, 2],
              [5, 5],
              [8, 10],
            ],
            description:
              "Extracts intersection segments including point intersections",
          },
          {
            id: 2,
            input: [
              [[1, 10]],
              [
                [2, 3],
                [5, 7],
              ],
            ],
            expected: [
              [2, 3],
              [5, 7],
            ],
            description:
              "Identifies multiple intersections occurring inside a broad master interval",
          },
        ],
      },
      {
        id: "schedule-free-slots",
        title: "Ultimate Team Sync Calendar Finder",
        difficulty: "DSA Hard",
        codeSnippet: `// Example Use Case: Extracting free gaps in calendar lists
const busyMerged = [[10, 12], [13, 14]];
// Subtract busy limits from total time bounds to locate team availabilities`,
        conceptContext:
          "Extracting free meeting slots gathers all members' busy calendars, flattens them, resolves merges, and returns gaps.",
        description:
          "To achieve complete mastery, let's build a real calendar scheduler!\n\nWrite a function `scheduleFreeSlots(schedules, workingHours, minDuration)` that takes:\n- `schedules`: an array of individual calendars, where each calendar is a list of busy interval tuples `[start, end]` (e.g., `[[[12, 13], [14, 15]], [[12, 14]]]`)\n- `workingHours`: a tuple representing the start and end of the boundary day `[dayStart, dayEnd]` (e.g., `[9, 17]`)\n- `minDuration`: the minimum duration needed to schedule a free slot\n\nYour task is to merge everyone's busy intervals, look for gaps inside `workingHours`, and return a list of free interval slots that are at least `minDuration` long.",
        codeTemplate: `function scheduleFreeSlots(schedules, workingHours, minDuration) {
  // 1. Flatten and merge busy schedules of all members using mergeOverlappingIntervals logic
  // 2. Walk through gaps inside active workingHours bounds
  // 3. Filter open segments meeting the minDuration requirement
  
}`,
        functionName: "scheduleFreeSlots",
        hints: [
          "Collect all busy intervals of all people into one flat array.",
          "Sort and merge these busy intervals using your mergeOverlappingIntervals logic.",
          "Scan the gaps between these busy intervals inside the workingHours boundary [dayStart, dayEnd]. Track current = dayStart; loop sorted merged events: if current < event.start and event.start - current >= minDuration, push [current, event.start]; update current = Math.max(current, event.end).",
          "If current < dayEnd and dayEnd - current >= minDuration, push [current, dayEnd].",
        ],
        explanation:
          "The ultimate peak of real-world calendar management systems, coordinating multiple schedule streams using interval merging.",
        testCases: [
          {
            id: 1,
            input: [
              [
                [
                  [12, 13],
                  [14, 15],
                ],
                [[12, 14]],
              ],
              [9, 17],
              1,
            ],
            expected: [
              [9, 12],
              [15, 17],
            ],
            description:
              "Coordinates multiple busy calendar timelines and extracts available slots",
          },
          {
            id: 2,
            input: [[[[9, 10]], [[10, 11]]], [9, 12], 1],
            expected: [[11, 12]],
            description: "Detects gaps nicely in touching busy grids",
          },
        ],
      },
      {
        id: "algo-group-and-tally",
        title: "Multiclass Inventory Group & Aggregate",
        difficulty: "DSA Medium",
        codeSnippet: `// Example Use Case: Aggregating transaction sums dynamically
const txs = [{ label: "A", amt: 100 }, { label: "A", amt: 50 }];
// Reduce items to compile: { A: 150 }`,
        conceptContext:
          "Applying reduce loops maps dynamic datasets to aggregate objects categories, compiling final numeric totals in O(N) runtime speeds.",
        description:
          "Let's build a clean analytics reducer!\n\nWrite a function `groupAndTally(items, groupKey, sumKey)` that takes:\n- `items`: an array of transaction/inventory objects (e.g. `[{ category: 'grocery', price: 10 }, { category: 'beverages', price: 5 }, { category: 'grocery', price: 4 }]`)\n- `groupKey`: a string pointing to the property to group by (e.g. `'category'`)\n- `sumKey`: a string pointing to the property whose values we should aggregate (e.g. `'price'`)\n\nYour function must reduce these items to return a single dictionary object mapping each unique group value to the sum of its aggregated numerical values.",
        codeTemplate: `function groupAndTally(items, groupKey, sumKey) {
  // Solve aggregate sums categorized by groupKey using ES6 reduce
  
}`,
        functionName: "groupAndTally",
        hints: [
          "Call `.reduce()` on the `items` array with an initial value of an empty object `{}`: `items.reduce((acc, item) => { ... }, {})`.",
          "Extract the grouping label: `const groupVal = item[groupKey];`.",
          "Extract the numerical value to add: `const numericVal = item[sumKey] || 0;`.",
          "Check if `acc[groupVal]` exists. If not, set it to 0. Add `numericVal` to it.",
          "Make sure to return `acc` from your helper callback on each iteration step!",
        ],
        explanation:
          "Dynamic group-by tally aggregates process multi-variable records inside a single, highly-optimized linear O(N) pass.",
        testCases: [
          {
            id: 1,
            input: [
              [
                { category: "A", value: 10 },
                { category: "B", value: 20 },
                { category: "A", value: 5 },
              ],
              "category",
              "value",
            ],
            expected: { A: 15, B: 20 },
            description:
              "Correctly groups item targets by matching Category keys and sums their corresponding values",
          },
          {
            id: 2,
            input: [
              [
                { department: "IT", cost: 100 },
                { department: "HR", cost: 50 },
                { department: "IT", cost: 250 },
              ],
              "department",
              "cost",
            ],
            expected: { IT: 350, HR: 50 },
            description:
              "Groups departments by expense and computes distinct tallies perfectly",
          },
        ],
      },
    ],
  },
];
