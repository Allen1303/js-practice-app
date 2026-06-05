export const KNOWLEDGE_MAP_CATEGORIES = [
  {
    id: "basics-types",
    title: "1. Variables & Foundations",
    color: "from-sky-500 to-blue-600",
    lightColor: "bg-sky-50 text-sky-750 border-sky-200",
  },
  {
    id: "numbers-math",
    title: "2. Numbers & Remainder",
    color: "from-purple-500 to-indigo-600",
    lightColor: "bg-purple-50 text-purple-750 border-purple-200",
  },
  {
    id: "strings-manipulation",
    title: "3. Strings & Text Methods",
    color: "from-amber-500 to-orange-600",
    lightColor: "bg-amber-50 text-amber-750 border-amber-200",
  },
  {
    id: "control-flow",
    title: "4. Control Flow & Loops",
    color: "from-red-500 to-rose-600",
    lightColor: "bg-red-50 text-red-750 border-red-200",
  },
  {
    id: "functions-scopes",
    title: "5. Functions, Scopes & Closures",
    color: "from-teal-500 to-emerald-600",
    lightColor: "bg-teal-50 text-teal-750 border-teal-200",
  },
  {
    id: "arrays-basics",
    title: "6. Handling Arrays & Spread",
    color: "from-orange-500 to-pink-500",
    lightColor: "bg-orange-50 text-orange-750 border-orange-200",
  },
  {
    id: "array-iteration",
    title: "7. Array Iteration Methods (FP)",
    color: "from-cyan-500 to-blue-500",
    lightColor: "bg-cyan-50 text-cyan-750 border-cyan-200",
  },
  {
    id: "objects-structures",
    title: "8. Objects & Shorthands",
    color: "from-rose-500 to-pink-600",
    lightColor: "bg-rose-50 text-rose-750 border-rose-200",
  },
  {
    id: "destructuring-operators",
    title: "9. Destructuring & Unpacking",
    color: "from-indigo-500 to-violet-600",
    lightColor: "bg-indigo-50 text-indigo-750 border-indigo-200",
  },
  {
    id: "dom-browser",
    title: "10. DOM Selectors & Events",
    color: "from-emerald-500 to-green-600",
    lightColor: "bg-emerald-50 text-emerald-750 border-emerald-200",
  },
  {
    id: "async-javascript",
    title: "11. Promises & Asynchronous JS",
    color: "from-fuchsia-500 to-purple-600",
    lightColor: "bg-fuchsia-50 text-fuchsia-750 border-fuchsia-200",
  },
  {
    id: "classes-oop",
    title: "12. OOP, Classes & super()",
    color: "from-zinc-600 to-slate-800",
    lightColor: "bg-zinc-100 text-zinc-750 border-zinc-300",
  },
];

export const KNOWLEDGE_MAP_TOPICS = [
  // 1. Variables & Foundations
  {
    id: "km-variables-hoisting",
    categoryId: "basics-types",
    title: "Variables, Hoisting & Temporal Dead Zone",
    summary:
      "Master the fundamental containers for storing your application's data. Learn how const, let, and var behave differently in memory.",
    details:
      "When writing code, you need memory drawers to save integers, words, or lists. Modern JavaScript has two gold-standard drawers: 'const' and 'let'. Older JavaScript used 'var', which behaves unpredictability because of 'hoisting'—an artifact where JavaScript processes your variable declarations before executing anything else. By using 'let' or 'const', we prevent these variables from being read before they are declared, trapping them in a safe 'Temporal Dead Zone' to keep our programs bug-free.",
    takeaways: [
      "📌 const: Ideal default choice. It stands for constant. It guarantees your variable reference cannot be reassigned to a completely new value.",
      "✏️ let: Perfect for items that will change over time, like loop indexes or score counters.",
      "⚠️ var: A legacy choice that exhibits scope-leaking behaviors. It lacks safety barriers and should be avoided.",
      "🧱 Temporal Dead Zone (TDZ): A guard rail that prevents you from accidentally using a variable before the line that officially defines it.",
    ],
    codeSnippet: `// Temporal Dead Zone guard in action:
// console.log(counter); // Crash check: ReferenceError!
const counter = 100;
let score = 20; // safe block scope`,
    relatedExerciseId: "var-declaration",
  },
  {
    id: "km-primitive-types",
    categoryId: "basics-types",
    title: "Primitive Types & typeof operator",
    summary:
      "Discover the physical material blocks that make up all data in JavaScript, and how to identify them safely.",
    details:
      "In computer systems, data is divided into simple structural items called 'primitives' and deep containers called 'objects'. Primitives are extremely fast to process because they are immutable (they cannot be dismantled or altered). There are seven total primitives: String, Number, Boolean, null, undefined, Symbol, and BigInt. To safely inspect what kind of data you are holding, use the built-in 'typeof' keyword, which returns a text description of the container type.",
    takeaways: [
      "📦 Immutability: Primitive values can't be modified. When you uppercase a word, you're actually casting a brand new word, not modifying the old one.",
      "🔧 typeof: A built-in detector. For example, typeof 'cat' returns 'string' and typeof 99 returns 'number'.",
      "🐛 typeof null glitch: Be careful! Running typeof null returns 'object' because of an ancient standard oversight in early browser versions.",
      "🛑 Strict mode ('use strict'): A toggle that tells JavaScript to enforce clean rules, instantly throwing errors on sloppy actions.",
    ],
    codeSnippet: `console.log(typeof "learning"); // "string"
console.log(typeof 2026);       // "number"
console.log(typeof null);       // "object" (heritage trap!)`,
    relatedExerciseId: "number-typeof",
  },
  {
    id: "km-global-environment",
    categoryId: "basics-types",
    title: "ECMAScript & Global Environments",
    summary:
      "Understand how your code interfaces with the wider global environment, from browsers to Node.js servers.",
    details:
      "JavaScript is a standardized language defined by ECMAScript rules. It runs in different host environments—such as the browser window, server setups, or web background workers. Each environment establishes a special global object container that holds built-in tools (like console.log). To write universal code that works everywhere, ECMAScript created 'globalThis'—a standardized name that automatically translates to the local global environment object.",
    takeaways: [
      "🌐 globalThis: A universal bridging adapter that maps to window in the browser, and global on Node.js servers.",
      "⚡ Strict Equality (===): Always use triple equals! It verifies both the data value *and* the type, preventing risky behind-the-scenes auto-conversions.",
      "📜 ECMAScript standards: Guide how modern JavaScript continues to evolve with clean features year over year.",
    ],
    codeSnippet: `// Identical global objects mapping:
console.log(globalThis === window); // true inside browser tabs
console.log("5" === 5); // false (strict comparison checks the type)`,
    relatedExerciseId: "cond-strict",
  },

  // 2. Numbers & Remainder
  {
    id: "km-numeric-parsing",
    categoryId: "numbers-math",
    title: "Numeric representation & Parse helper methods",
    summary:
      "Learn how to parse digits out of messy text lines, handle invalid calculations, and format numbers cleanly.",
    details:
      "Often, data retrieved from networks contains numbers combined with text characters (like '$150' or '24px'). JavaScript provides powerful parsing helpers like 'Number.parseInt()' and 'Number.parseFloat()' to strip away alphabet characters and extract pure mathematical numbers. If a calculation is physically impossible (such as dividing a word), the system outputs a special value called NaN (Not a Number) which can be caught using 'Number.isNaN()'.",
    takeaways: [
      "✂️ Number.parseInt(): Extracts whole integer values from text lines, scanning left-to-right until non-numeric items appear.",
      "📏 Multiplier bases: Always specify a base parameter (usually base 10 under decimal standards) inside parseInt.",
      "🧼 Number.isNaN(): The only reliable way to check for mathematical failures, as NaN !== NaN is true in standard JavaScript.",
      "💸 Numeric separators (_): Allow you to place underscores inside large numbers (like 1_500_000) to make them readable without affecting calculations.",
    ],
    codeSnippet: `const price = Number.parseInt("150_000 USD", 10); // 150000
    const cleanPi = Number.parseFloat("3.14seconds");  // 3.14
    console.log(Number.isNaN(NaN)); // true`,
    relatedExerciseId: "num-parse",
  },
  {
    id: "km-division-remainder",
    categoryId: "numbers-math",
    title: "Division Remainder (%) Operator",
    summary:
      "Uncover the magic of the modulo and remainder operator for cyclic steps, limits, and patterns.",
    details:
      "The division remainder operator (%) is a secret weapon in mathematical code. Instead of giving you the result of a division, it yields only the amount 'left over' after dividing. For example, `10 % 3` is `1` because `3` fits into `10` three times with `1` left over. This is incredibly useful for finding odd/even numbers, limiting index lists so they loop back around, or triggering cyclic game actions.",
    takeaways: [
      "⚖️ Odd/Even tester: Any integer `n` is even if `n % 2 === 0`, and odd if `n % 2 !== 0`.",
      "🔄 Infinite Loop Restarter: The expression `index % totalLength` ensures the rating stays strictly bounded, resetting to 0 whenever it overflows.",
      "🧮 Cyclic Patterns: Ideal for building carousel sliders or recurring color sequences.",
    ],
    codeSnippet: `const isEven = (num) => num % 2 === 0;
    const wrapIndex = (step, max) => step % max; // reset boundaries`,
    relatedExerciseId: "num-remainder-odd",
  },

  // 3. Strings & Text Methods
  {
    id: "km-string-access",
    categoryId: "strings-manipulation",
    title: "Character Access, Length, and Slices",
    summary:
      "Inspect sentence lengths, grab individual letters, and slice segments out of text files smoothly.",
    details:
      "Strings are chainable lists of characters. Traditional JavaScript uses square brackets to access letters by index (starting at 0). Modern JavaScript adds the elegant `.at()` method, which lets you pass negative numbers to read backwards from the end. If you want to carve out a specific text section, methods like `.slice()` are ideal for clean extractions without manual text-character loops.",
    takeaways: [
      "📏 str.length: Tells you exactly how many characters (including spaces) are inside your text string.",
      "🎯 str.at(-1): Safely grabs the very last character of a sentence without tedious `str.length - 1` mathematics.",
      "✂️ str.slice(start, end): Harvests a clean excerpt of your text from the start index up to (but not including) the end index.",
    ],
    codeSnippet: `const code = "ReactBuild";
    console.log(code.at(-1)); // "d" (retrieved backward)
    console.log(code.slice(0, 5)); // "React" (exclusive slice)`,
    relatedExerciseId: "str-length",
  },
  {
    id: "km-string-matching-regex",
    categoryId: "strings-manipulation",
    title: "Matches, Suffixes & Regular Exps",
    summary:
      "Search sentences for words, check starters, and clean content using simple Regular Expression filters.",
    details:
      "Instead of manually building complex loops to match words inside paragraphs, use standard string search tools. `.includes()` returns a simple true/false if a term exists. `.startsWith()` and `.endsWith()` verify boundary letters. For advanced scanning patterns (like checking for emails, phone patterns, or digits), JavaScript supports 'Regular Expressions' (Regex) to replace matching blocks instantly.",
    takeaways: [
      "🔍 str.includes(word): A fast, case-sensitive search tool that returns a simple true/false checklist.",
      "🔄 str.replace() & replaceAll(): Swaps matching text segments with an upgraded substitute string.",
      "🪄 Regular Expressions: Written between slashes (like `/pattern/g`), they allow you to search for abstract categories of characters at once.",
    ],
    codeSnippet: `const sentence = "Grade: A+";
    console.log(sentence.includes("A+")); // true
    // Replace all non-letters with empty spaces:
    console.log(sentence.replace(/[^a-zA-Z]/g, "")); // "Grade"`,
    relatedExerciseId: "string-regex-match",
  },
  {
    id: "km-string-formatting",
    categoryId: "strings-manipulation",
    title: "String Formatting, Concatenations & Paddings",
    summary:
      "Standardize user inputs with lowercasing, trim messy side margins, and pad timestamps elegantly.",
    details:
      "To write clean programs, you must normalize input data before storing it. Trim off sloppy whitespace borders with `.trim()`. Standardize casing using `.toLowerCase()`. You can also template parameters easily with Backtick literals, and align visual displays using `.padStart()` (ideal for turning short numbers like '7' into double-digit timestamps like '07').",
    takeaways: [
      "🪄 Template Literals: Use backticks (\`\`) and dollar-brackets (\`\${value}\`) to blend variables directly inside sentences without messy plus symbols.",
      "🧹 str.trim(): Automatically sweeps away annoying outer spaces, tabs, or newlines from user form inputs.",
      "🛡️ toLowerCase() & toUpperCase(): Normalizes inputs to prevent case mismatch searching issues.",
      "🕖 padStart(length, char): Pads the beginning of a text with a fallback character until it spans the goal length.",
    ],
    codeSnippet: `const userEmail = "  Allen@gmail.com  ";
    const normalized = userEmail.trim().toLowerCase(); // "allen@gmail.com"
    const secondsText = "5".padStart(2, "0"); // "05" (clean clock output)`,
    relatedExerciseId: "string-trim-spaces",
  },

  // 4. Control Flow & Loops
  {
    id: "km-conditions-ternary",
    categoryId: "control-flow",
    title: "Branching Checks: if vs Ternary",
    summary:
      "Learn to design decision pathways inside your programs, choosing when to use conditional blocks.",
    details:
      "Programs must react dynamically depending on user preferences. Use traditional `if/else` paths for large structural branches. For simpler variable assignments, choose the inline 'Ternary Operator' (`condition ? ifTrue : ifFalse`). To handle optional or missing settings securely, deploy modern safeguards like Nullish Coalescing (`??`) to provide reliable default options.",
    takeaways: [
      "🧱 if/else blocks: Direct large execution pathways inside your algorithms.",
      "🔀 Ternary (? :): An inline shortcut that makes assignments short, clean, and highly readable.",
      "⚙️ Nullish Coalescing (??): Checks strictly for null or undefined. This ensures that legitimate falsy values (like 0 or false) are not mistakenly ignored.",
      "❌ Falsy equivalents: In JavaScript, only 6 values evaluate as false: false, 0, '', null, undefined, and NaN.",
    ],
    codeSnippet: `const age = 21;
const message = age >= 18 ? "Access Granted" : "Too Young";
const theme = userTheme ?? "default-light"; // coalescing fallback`,
    relatedExerciseId: "safe-preference-lookup",
  },
  {
    id: "km-loops-statements",
    categoryId: "control-flow",
    title: "Iteration Statements: for, for...in, for...of",
    summary:
      "Walk through arrays, sets, and object key structures using standard repeating loop structures.",
    details:
      "When dealing with lists of products or profiles, you need your code to loop over each item. Use standard index loops when you need access to index numbers. Choose `for...of` when you simply want to walk through the elements of an array, set, or map. Choose `for...in` when you need to inspect the keys inside an object dictionary.",
    takeaways: [
      "🔢 Index Loop (for let i=0): Gives you precise control over indices, step increments, and directions.",
      "🚶‍♀️ for...of Loop: The modern choice for reading items directly from arrays, sets, or maps without index mathematics.",
      "⚙️ for...in Loop: Tailor-made for looping over the key labels inside an object database drawer.",
      "🛑 break / continue: Useful keys to immediately halt loops ('break') or skip over a single step ('continue').",
    ],
    codeSnippet: `const tasks = ["write", "test"];
for (const task of tasks) {
  console.log("Active Task:", task);
}
// Looping over dynamic numbers: for (let i = 0; i < 5; i++) { ... }`,
    relatedExerciseId: "foreach-sum",
  },

  // 5. Functions, Scopes & Closures
  {
    id: "km-functions-basics",
    categoryId: "functions-scopes",
    title: "Function Types, Arguments & ES6 Arrows",
    summary:
      "Write clean, reusable blocks of instructions using modern arrow functions and fallback parameters.",
    details:
      "Functions are the active mechanisms of your application. Declared traditionally or via modern compact Arrow syntax, they receive arguments and process computations. Always specify default parameters internally in your function definitions to prevent crashes when a user forgets to pass an expected value.",
    takeaways: [
      "🎯 Arrow Functions (=>): Provide a short, modern syntax. They do not bind their own execution context, making them safe for callback methods.",
      "⚡ Implicit Return: Arrow functions written without curly braces automatically return the calculated output, reducing clutter.",
      "🛡️ Default Parameters: Fallback values (e.g. `(user = 'Guest')`) that activate automatically if an argument is absent.",
    ],
    codeSnippet: `const greetUser = (name = "Developer") => \`Hello, \${name}!\`;
console.log(greetUser()); // "Hello, Developer!" (default parameter applied)`,
    relatedExerciseId: "func-return",
  },
  {
    id: "km-scopes-closures",
    categoryId: "functions-scopes",
    title: "Lexical Scope and Closures",
    summary:
      "Understand how lexical boundaries dictate variable vision, and build state-remembering functional bags.",
    details:
      "Every function establishes its own lexical field boundaries. Variables defined inside a function remain invisible to the global scope outside. A 'Closure' occurs when an inner function remembers and has access to references of variables inside the outer scope, even after that parent block completes execution.",
    takeaways: [
      "🧱 Lexical Bubble: Functions can look upwards for parent variables, but parent scopes cannot look inside functions.",
      "🎒 Closure retention: Enables functions to maintain privately held counters or configs securely in background memory.",
      "🔒 Data Encapsulation: Prevents external blocks from editing internal state parameters directly.",
    ],
    codeSnippet: `function makeMultiplier(factor) {
  return (num) => num * factor; // remembers 'factor' via closure
}
const double = makeMultiplier(2);
console.log(double(15)); // 30`,
    relatedExerciseId: "closure-counter",
  },
  {
    id: "km-functional-callbacks",
    categoryId: "functions-scopes",
    title: "Callbacks & Functional Programming Intro",
    summary:
      "Pass executable functions inside other functions as arguments to build flexible flow controls.",
    details:
      "In JavaScript, functions are first-class citizens. This means you can store them in variables and pass them as parameters into other functions (callbacks). Functional Programming encourages passing instructions dynamically and writing 'pure functions' that do not mutate underlying variables.",
    takeaways: [
      "🔧 Callback: A function passed as an argument to be invoked later once a task completes.",
      "💎 Pure Functions: Consistently construct identical outputs given identical values, leaving outer environments untouched.",
      "🔄 Immutability: Standard practice in FP. Clone arrays and objects instead of modifying the originals.",
    ],
    codeSnippet: `const processInput = (val, cb) => cb(val);
console.log(processInput(5, x => x * 2)); // 10`,
    relatedExerciseId: "map-scale-parity",
  },
  {
    id: "km-generators-control",
    categoryId: "functions-scopes",
    title: "Generator Functions & yield",
    summary:
      "Create lazy-evaluating step functions that pause and resume execution using the yield keyword.",
    details:
      "Generator functions block execution and yield state control back to callers midway. Instead of running immediately from line 1 to the end, generator functions (marked with `function*`) pause at each `yield` line and resume only when `.next()` is triggered externally.",
    takeaways: [
      "⏳ Lazy Execution: Perfect for loading infinite series, giant datasets, or chunked pages.",
      "⏸️ pause / resume: The yield statement acts as a custom breakpoint, preserving local variables intact.",
      "🔧 Iterators sequence: Generators return an iterator container configured with `.next()` methods.",
    ],
    codeSnippet: `function* numberStream() {
  let num = 1;
  while (true) yield num++; // infinite stream
}
const stream = numberStream();
console.log(stream.next().value); // 1
console.log(stream.next().value); // 2 (resumed cleanly)`,
    relatedExerciseId: "closure-stream",
  },

  // 6. Handling Arrays & Spread
  {
    id: "km-array-element-access",
    categoryId: "arrays-basics",
    title: "Element Access, Length, and CRUD Methods",
    summary:
      "Perform array manipulation operations like inserting, extracting, and rewriting list indices cleanly.",
    details:
      "Arrays are lists of values. JavaScript contains built-in methods to perform CRUD operations (Create, Read, Update, Delete) on them. `.push()` and `.pop()` manage items at the end, while `.shift()` and `.unshift()` manage items at the beginning. Methods like `.toSpliced()` allow you to overwrite indices safely without modifying your original list.",
    takeaways: [
      "🧹 Tail Management: Use `.push()` to append, and `.pop()` to remove elements from the tail end of your list.",
      "🧬 toSpliced(): Mutates intermediate array blocks cleanly while returning a safe copy (original array stays safe).",
      "📦 join(): Assembles all string elements in an array into a single sentence using a custom divider string.",
    ],
    codeSnippet: `const basket = ["apple", "cherry"];
const newBasket = basket.toSpliced(1, 0, "banana"); 
console.log(basket);    // ["apple", "cherry"] (pristine!)
console.log(newBasket); // ["apple", "banana", "cherry"]`,
    relatedExerciseId: "ds-cart-queue",
  },
  {
    id: "km-spread-destructuring",
    categoryId: "arrays-basics",
    title: "Spread (...) & Array Destructuring",
    summary:
      "Duplicate list structures, extract first values, and merge collections in single lines.",
    details:
      "Unpacking items inside array lists is a daily task. The modern triple-dot 'Spread Operator' (`...`) duplicate-clones values from array drawers into a new array. When extracting values, 'Destructuring' allows you to grab early indexes directly into distinct variables.",
    takeaways: [
      "✨ Spread Operator: Unpacks array items, making array copying or merging a breeze: `[...list1, ...list2]`.",
      "🏷️ Destructuring: Maps array indices instantly into named variables: `const [first, second] = arr;`.",
      "🎒 Rest pattern: Collects remaining trailing values inside an independent array block.",
    ],
    codeSnippet: `const coordinates = [12, 45, 99];
const [x, y, ...rest] = coordinates; // x=12, y=45, rest=[99]
const cloned = [...coordinates]; // safe duplicated clone`,
    relatedExerciseId: "swap-nested-coordinate",
  },
  {
    id: "km-arrays-objects",
    categoryId: "arrays-basics",
    title: "Arrays of Objects & Matrices",
    summary:
      "Work with array collections holding deep profile objects or multi-dimensional matrix layout coordinates.",
    details:
      "Almost all data sent by APIs utilizes an array of objects. Handling this data requires nesting key-lookups inside array traversals. Multiplying array dimensions also produces 'Matrices' (2D grids) where accessing items requires multiple bracket mappings like `matrix[y][x]`.",
    takeaways: [
      "📊 Structured collections: Ideal template for storing profile rows, shop product details, or ledger logs.",
      "📐 Matrices (2D lists): Grids or tables represented as nested arrays. The outer index selects the row, the inner selects the column.",
    ],
    codeSnippet: `const matrix = [
  [1, 2],
  [3, 4]
];
console.log(matrix[1][0]); // 3 (row index 1, col index 0)`,
    relatedExerciseId: "map-user-profiles",
  },

  // 7. Array Iteration Methods
  {
    id: "km-iterators-map-filter",
    categoryId: "array-iteration",
    title: "Data Transforms: map, filter, find, and forEach",
    summary:
      "Harness the power of declarative loop functions to transform, filter, search, and update lists.",
    details:
      "Instead of writing standard manual `for` loops, utilize functional iteration methods. `.map()` transforms every element. `.filter()` sifts items based on custom requirements. `.find()` checks until a match is found and returns it. `.forEach()` executes side effects for each element.",
    takeaways: [
      "🔄 map(): Consistently returns an array containing the exact same number of items as the input.",
      "🟢 filter(): Produces a subset array consisting strictly of elements that triggered `true` conditions.",
      "🚀 find(): Stops looping the exact millisecond a match triggers, returning that direct entry.",
    ],
    codeSnippet: `const scores = [80, 45, 95];
const passes = scores.filter(s => s >= 50); // [80, 95]
const tripled = scores.map(s => s * 3);     // [240, 135, 285]`,
    relatedExerciseId: "map-trim-upper",
  },
  {
    id: "km-iterators-every-some",
    categoryId: "array-iteration",
    title: "Compliance Validations: every & some",
    summary:
      "Check list compliance, testing if either all or some elements align with rules.",
    details:
      "Validating inputs requires checks. Use `.every()` when you must confirm that *all* elements in your array satisfy a requirement. Use `.some()` when you only need *at least one* element to pass.",
    takeaways: [
      "⚖️ every(): Evaluates as false the moment a single element fails, providing robust validation guarantees.",
      "🚀 some(): Short-circuits and returns true as soon as one matching element is found.",
      "⚡ High Performance: Both methods halt iteration immediately once their evaluation is proven.",
    ],
    codeSnippet: `const users = [{ age: 21 }, { age: 15 }];
const allAdults = users.every(u => u.age >= 18); // false
const hasMinor = users.some(u => u.age < 18);    // true`,
    relatedExerciseId: "search-all-even-positives",
  },
  {
    id: "km-reducer-aggregation",
    categoryId: "array-iteration",
    title: "Reductions & Structural Groupings",
    summary:
      "Compile arrays down into single calculated outcomes or create structured group dictionaries.",
    details:
      "Use `.reduce()` when you need to condense an array into a single result (like an aggregate sum, a text string, or a customized lookup map). To split items into structured groups by category, use `Object.groupBy()`.",
    takeaways: [
      "📥 reduce(): Tracks progress inside an accumulator variable ('acc') as it rolls down the array list.",
      "🏁 Anchor: Always set a starting accumulator object (like `0` or `{}`) to lock in your expected result shape.",
      "📂 Object.groupBy(): Organizes children into separate group boxes based on key labels.",
    ],
    codeSnippet: `const products = [
  { group: "A", val: 10 },
  { group: "B", val: 20 }
];
// Summing values:
const total = products.reduce((acc, p) => acc + p.val, 0); // 30`,
    relatedExerciseId: "reduce-parity-obj",
  },

  // 8. Objects & Shorthands
  {
    id: "km-objects-properties",
    categoryId: "objects-structures",
    title: "Object Property Access & Shorthand",
    summary:
      "Read and write object keys cleanly, using bracket notations and ES6 property shortcuts.",
    details:
      "Objects store properties in key-value pairs. Read keys using Dot notation for static properties, or Bracket notation when the key name is stored inside a variable. You can also skip repeating key names when writing objects if your variables already match the key names.",
    takeaways: [
      "🏷️ Bracket lookup: The only way to retrieve properties using a dynamic variable (e.g. `user[attributeName]`).",
      "📦 ES6 Shorthand: Writing `{ username }` instead of `{ username: username }` keeps code tidy.",
      "👀 in operator: Checks if a property exists directly inside an object drawer.",
    ],
    codeSnippet: `const category = "rating";
const game = { title: "Zelda", [category]: 10 }; // dynamic key
console.log("rating" in game); // true`,
    relatedExerciseId: "ds-profile-updater",
  },
  {
    id: "km-objects-iteration",
    categoryId: "objects-structures",
    title: "Keys, Values & Entries Iteration",
    summary:
      "Convert objects into indexable array collections of keys or values for easy looping.",
    details:
      "Unlike arrays, objects are not directly indexable with loops. To iterate over an object, convert it into an array first. Use `Object.keys()` to extract property names, `Object.values()` to extract property values, or `Object.entries()` to get tuples of `[key, value]` pairs.",
    takeaways: [
      "🔑 Object.keys(): Returns an array containing the names of all keys inside the object.",
      "💎 Object.values(): Returns an array of the active values stored inside the object.",
      "⚖️ Object.entries(): Returns an array of nested arrays, where each subclass holds `[key, value]`.",
    ],
    codeSnippet: `const specs = { ram: "16GB", cpu: "M3" };
const keysList = Object.keys(specs); // ["ram", "cpu"]
const entriesList = Object.entries(specs); // [["ram", "16GB"], ["cpu", "M3"]]`,
    relatedExerciseId: "ds-inventory-auditor",
  },

  // 9. Destructuring & Unpacking
  {
    id: "km-objects-unpacking",
    categoryId: "destructuring-operators",
    title: "Objects Destructuring & defaults",
    summary:
      "Extract properties directly out of objects into variables, with safe fallback defaults.",
    details:
      "Repeatedly writing `const host = server.host` is redundant. Avoid this duplication with Object Destructuring, which extracts multiple properties inside braces. You can also define default values during destructuring as a fallback in case a property is missing.",
    takeaways: [
      "🧱 Clean brackets mapping: Extracts properties in a single line (e.g., `const { ram, price } = macbook`).",
      "🕖 Destructuring Defaults: Safely fall back to default values if the property evaluates as undefined.",
      "🏷️ Alias Renaming: Rename extracted variables on the fly to avoid naming conflicts: `const { id: userId } = user`.",
    ],
    codeSnippet: `const profile = { name: "Alex" };
const { name, role = "User" } = profile; // role falls back to "User"
console.log(role); // "User"`,
    relatedExerciseId: "coords-extractor",
  },

  // 10. DOM Selectors & Events
  {
    id: "km-dom-selectors-search",
    categoryId: "dom-browser",
    title: "DOM Node Selection & NodeList",
    summary:
      "Find and select markup elements on your webpage using standard CSS selectors.",
    details:
      "To update your interface dynamically, your script must locate HTML elements. Use `querySelector` to find the first element that matches a selector, or `querySelectorAll` to find all matching elements. The result of a multi-selector query is a 'NodeList', which you should convert to a standard array before running transformation methods like `.map()`.",
    takeaways: [
      "🎯 document.querySelector(): Selects the first element that matches your CSS selector.",
      "🧱 document.querySelectorAll(): Returns an iterable list of all matching elements.",
      "📦 Array.from(): Converts a NodeList into a standard array to unlock methods like `.map()` and `.filter()`.",
    ],
    codeSnippet: `const submitBtn = document.querySelector("#submit");
const inputBlocks = document.querySelectorAll(".text-field");
const inputsArray = Array.from(inputBlocks); // convert to standard array`,
    relatedExerciseId: "string-html-builder",
  },
  {
    id: "km-dom-elements-classlist",
    categoryId: "dom-browser",
    title: "Styles & ClassList manipulation",
    summary:
      "Change element styling, toggle layouts, and update visual designs using CSS classes.",
    details:
      "Avoid applying inline styles directly inside your JS scripts. Instead, write clean styles inside CSS classes and toggle them onto your elements using `.classList`. This separation of concerns keeps your styling organized and performant.",
    takeaways: [
      "🎨 .classList: Supports `.add()`, `.remove()`, `.contains()`, and `.toggle()` to manage classes easily.",
      "🧱 .style: Use only when you need to assign dynamic values (such as pixel positions calculated at runtime).",
    ],
    codeSnippet: `const mobileMenu = document.querySelector(".nav-menu");
// Toggle open class:
mobileMenu.classList.toggle("is-expanded");`,
    relatedExerciseId: "ds-profile-updater",
  },
  {
    id: "km-dom-manipulation-attributes",
    categoryId: "dom-browser",
    title: "DOM Attributes & Insertions",
    summary:
      "Read element details, work with custom datasets, and append HTML nodes dynamically.",
    details:
      "Elements often store data in attributes (like `href` or custom `data-*` tags). Use JavaScript's `.dataset` property to read these parameters. You can also crawl up the parent HTML tree using `.closest()` to find wrapping wrappers dynamically.",
    takeaways: [
      "💾 .dataset: Translates custom `data-user-id` attributes on your HTML tags into readable object keys in your scripts.",
      "🧗 .closest(): Climbs up parent elements to locate the nearest wrapping container that matches the selector.",
    ],
    codeSnippet: `const rowItem = document.querySelector(".profile-item");
const rawUserId = rowItem.dataset.userId; // extracts data-user-id
const parentWrapper = rowItem.closest(".parent-card"); // climbs parent tree`,
    relatedExerciseId: "safe-path-crawler",
  },

  // 11. Promises & Asynchronous JS
  {
    id: "km-two-pointers-basics",
    categoryId: "async-javascript",
    title: "Promise Foundations & Resolving",
    summary:
      "Handle background tasks, network requests, and timers without blocking browser actions.",
    details:
      "Normally, JavaScript runs consecutively line-by-line. To run background actions that take time (such as database queries or fetch requests) without locking up the page, use Promises. A Promise is a placeholder container for a future value, allowing you to use `.then()` and `.catch()` callbacks to handle outcomes.",
    takeaways: [
      "🧱 Lifecycle States: Promises start as **pending**, and transition to **fulfilled** (success) or **rejected** (failure).",
      "🤝 Promise Wrapper: Create a Promise with `new Promise((resolve, reject) => { ... })`.",
      "🧹 Resolving: Call `resolve()` when your background task finishes to return your data to the caller.",
    ],
    codeSnippet: `const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));
wait(500).then(() => console.log("Time is up!"));`,
    relatedExerciseId: "delay-resolve",
  },
  {
    id: "km-two-pointers-fast-slow",
    categoryId: "async-javascript",
    title: "Asynchronous Functions (async/await)",
    summary:
      "Write asynchronous statements that read like simple, clean, linear commands.",
    details:
      "The `async/await` syntax makes asynchronous code incredibly clean and easy to follow. Marking a function with `async` ensures it returns a Promise. Writing `await` pauses the code execution thread at that line until the Promise yields its data, eliminating nested callback chains.",
    takeaways: [
      "📝 async keyword: Unlocks the use of `await` inside the function's scope.",
      "⏸️ await keyword: Suspends code execution cleanly without freezing the browser's thread.",
      "🛡️ try...catch: Essential safeguard used around await actions to catch and handle errors gracefully.",
    ],
    codeSnippet: `async function fetchProduct() {
  try {
    const data = await requestAPI("/product");
    return data.id;
  } catch (err) {
    return "default-product-id"; // safe fallback
  }
}`,
    relatedExerciseId: "async-fetch-json",
  },
  {
    id: "km-sliding-window-fixed",
    categoryId: "async-javascript",
    title: "Parallel Promise Executions",
    summary:
      "Coordinate multiple asynchronous promises in parallel to maximize application loading speed.",
    details:
      "Instead of executing network fetches or timers in sequence (waiting for one to finish before starting the next), trigger them concurrently! Use `Promise.all()` to run files loaded or API fetches in parallel, waiting for all of them to resolve together.",
    takeaways: [
      "🚀 High Concurrency: Fires all requests together, cutting down page-load times.",
      "🧱 Promise.all(): Resolves once all items pass successfully, rejecting instantly if any single item fails.",
      "🛡️ Promise.allSettled(): Waits for all tasks to complete, returning individual outcome details for every item.",
    ],
    codeSnippet: `const [profile, settings] = await Promise.all([
  loadProfile(),
  loadSettings()
]);`,
    relatedExerciseId: "promise-all-safe",
  },
  {
    id: "km-sliding-window-dynamic",
    categoryId: "async-javascript",
    title: "Promisification of Callback APIs",
    summary:
      "Adapt old-school, callback-based utilities into modern, clean Promise-based structures.",
    details:
      "Many older JavaScript tools and platform APIs require you to pass an 'error-first callback' function to handle parameters. Bridging these old platforms into modern async/await patterns requires 'Promisification'—wrapping the old callback structure inside a new Promise.",
    takeaways: [
      "🌉 API Adapter: Elevates legacy callback utilities so they support standard Async/Await keywords.",
      "🧱 Pattern: Returns a `new Promise((resolve, reject)` wrapper that intercepts error/success arguments inside callbacks.",
    ],
    codeSnippet: `const promisifiedTimer = (duration) => {
  return new Promise((resolve, reject) => {
    legacyTimerCall(duration, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};`,
    relatedExerciseId: "promisify-callback",
  },

  // 12. OOP, Classes & super()
  {
    id: "km-classes-foundations",
    categoryId: "classes-oop",
    title: "Classes declaration and constructors",
    summary:
      "Model data into self-contained blueprints that group properties and functions together.",
    details:
      "Classes are blueprints for creating structured objects. The constructor function runs automatically whenever a new object is created using the `new` keyword, setting up the initial state properties on your new instance.",
    takeaways: [
      "🧱 Blueprints Class: Defines what specifications (properties) and methods an object has.",
      "🏗️ Constructor: The initialization function that runs when you call `new ClassName()`.",
      "🧠 Memory Efficient: Methods declared in the blueprint are shared via the prototype, keeping memory footprint low.",
    ],
    codeSnippet: `class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}
const favBook = new Book("Hobbit", "Tolkien");`,
    relatedExerciseId: "oop-simple-book",
  },
  {
    id: "km-classes-getters-setters",
    categoryId: "classes-oop",
    title: "Getters, Setters & Private Fields",
    summary:
      "Secure variables within objects using private fields, and control properties access with custom get/set actions.",
    details:
      "Keep the internal workings of your objects safe from outside code. Prefix properties with `#` to make them completely private. You can then write custom `get` and `set` methods to safely view and update these private values while enforcing strict validations.",
    takeaways: [
      "🔒 Private Fields (#): Prevents external scripts from reading or altering sensitive variables directly.",
      "⚙️ Getters & Setters: Act as controlled security checkpoints around your object's internal properties.",
    ],
    codeSnippet: `class Vault {
  #code = "1234"; // private property
  get code() { return "****"; } // secure preview getter
  set code(newCode) { if (newCode.length === 4) this.#code = newCode; }
}`,
    relatedExerciseId: "oop-secure-account",
  },
  {
    id: "km-oop-inheritance",
    categoryId: "classes-oop",
    title: "Inheritance, super(), and Prototypes",
    summary:
      "Extend parent classes to build subcategories of objects, using super() to inherit properties.",
    details:
      "Inheritance allows subclasses to inherit properties and methods from a parent class using the `extends` keyword. When building a subclass constructor, you must call `super()` first to initialize the parent's properties and link the execution context.",
    takeaways: [
      "🧬 extends: Copies the behavior of a parent class into a specialized subclass.",
      "⚡ super(): Runs the parent's constructor function and initializes the `this` context inside your subclass.",
      "🧱 Prototype Chain: The lookup system JavaScript uses to search up the parent tree for methods.",
    ],
    codeSnippet: `class Athlete extends User {
  constructor(name, sport) {
    super(name); // parent initialization
    this.sport = sport;
  }
}`,
    relatedExerciseId: "oop-inherited-vehicle",
  },
];
