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
    title: "11. Async, Promises & Fetch",
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
      "Understand standard declarations const, let, and var, along with the behavior of hoisting.",
    details:
      "Using 'const' and 'let' prevents variables from hoisting to undefined, locking access in the Temporal Dead Zone until initialized. Avoid legacy var which hoists blindly.",
    takeaways: [
      "const guarantees references cannot be reassigned",
      "let is block-scoped and allows reassignment",
      "var hoists to outer function boundaries and is prone to scope leaks",
      "Temporal Dead Zone prevents using the variable before its definition line",
    ],
    codeSnippet: `// Temporal Dead Zone:
// console.log(x); // ReferenceError!
const x = 10;
let y = 20;`,
    relatedExerciseId: "closure-counter",
  },
  {
    id: "km-primitive-types",
    categoryId: "basics-types",
    title: "Primitive Types & typeof operator",
    summary:
      "Examine JavaScript primitive data types and type detection tools.",
    details:
      "Primitives (String, Number, Boolean, null, undefined, Symbol, BigInt) are immutable and passed by value. Objects are dynamic collections passed by reference.",
    takeaways: [
      "typeof operator returns the string representation of a value's type",
      "typeof null returns 'object' (legacy standard artifact)",
      "Strict mode ('use strict') prevents accidental global allocations",
    ],
    codeSnippet: `console.log(typeof "hello"); // "string"
console.log(typeof 42);      // "number"
console.log(typeof null);    // "object"`,
    relatedExerciseId: "fcc-reverse-string",
  },
  {
    id: "km-global-environment",
    categoryId: "basics-types",
    title: "ECMAScript & Global Environments",
    summary:
      "Discover self, globalThis, window, and execution rules in browsers and modules.",
    details:
      "The global environment provides access to built-in objects. window matches browsers, self matches workers, and globalThis standardizes runtime access across all environments.",
    takeaways: [
      "globalThis maps to window in the browser, and global in Node.js",
      "Strict equality (===) evaluates both category type and value without coercion",
    ],
    codeSnippet: `console.log(globalThis === window); // true (in browser)
"3" === 3; // false (strict type validation)`,
    relatedExerciseId: "fcc-reverse-string",
  },

  // 2. Numbers & Remainder
  {
    id: "km-numeric-parsing",
    categoryId: "numbers-math",
    title: "Numeric representation & Parse helper methods",
    summary:
      "Parse strings into values, handle NaNs, and format output strings.",
    details:
      "Use Number.parseInt(), Number.parseFloat(), and .toString() to control types. Check failures with Number.isNaN() to secure computations.",
    takeaways: [
      "Number.parseInt('42px') parses 42 correctly from strings",
      "NaN represents invalid math calculations (Not a Number)",
      "Numeric separator (_) allows writing readable large numbers",
    ],
    codeSnippet: `const price = Number.parseInt("150_000 USD", 10); // 150000
const largeNum = 1_000_000; // 1000000 (numeric separator)
Number.isNaN(NaN); // true`,
    relatedExerciseId: "safe-division",
  },
  {
    id: "km-division-remainder",
    categoryId: "numbers-math",
    title: "Division Remainder (%) Operator",
    summary:
      "Utilize division remaining portions to implement cyclic math boundaries.",
    details:
      "The division remainder operator (%) yields the absolute remainder. Indispensable for tracking modulo groups, limits, or odd/even states.",
    takeaways: [
      "x % 2 === 0 evaluates true for even integers",
      "Modulo resets bounds inside cyclic grids, lists, or steps",
    ],
    codeSnippet: `const isOdd = x % 2 !== 0;
const index = step % length; // resets boundary`,
    relatedExerciseId: "safe-division",
  },

  // 3. Strings & Text Methods
  {
    id: "km-string-access",
    categoryId: "strings-manipulation",
    title: "Character Access, Length, and Slices",
    summary:
      "Investigate individual characters, sequence lengths, and slice text portions.",
    details:
      "Strings are indexable. Access chars with Bracket [] or .at() which supports negative boundaries. Extract characters using .substring() or .slice() cleanly.",
    takeaways: [
      "str.length tracks character length",
      "str.at(-1) safely yields the last character without calculations",
      "str.split() splits text records into dynamic array elements",
    ],
    codeSnippet: `const text = "JavaScript";
console.log(text.at(-2)); // 'p'
console.log(text.slice(0, 4)); // "Java"`,
    relatedExerciseId: "fcc-reverse-string",
  },
  {
    id: "km-string-matching-regex",
    categoryId: "strings-manipulation",
    title: "Matches, Suffixes & Regular Exps",
    summary:
      "Trace string search occurrences with contains, find indices, and swap with regex filters.",
    details:
      "Utilize methods like .includes(), .startsWith(), .endsWith(), .replace(), and .replaceAll() combined with custom Regular Expression sequences.",
    takeaways: [
      "includes() provides easy case-sensitive verification",
      "replace() or replaceAll() swap matches with substitutes",
      "Regexes represent string lookup patterns (e.g. /\\d+/g for digits)",
    ],
    codeSnippet: `const msg = "Buy 2 apples and 3 bananas";
console.log(msg.includes("apple")); // true
console.log(msg.replace(/\\d/g, "#")); // "Buy # apples and # bananas"`,
    relatedExerciseId: "fcc-confirm-ending",
  },
  {
    id: "km-string-formatting",
    categoryId: "strings-manipulation",
    title: "String Formatting, Concatenations & Paddings",
    summary:
      "Clean user text variables using case transformations, trim operations, and string pads.",
    details:
      "Build templates with Template strings, join strings with Concatenations, and align visual tables with padStart and padEnd.",
    takeaways: [
      "Template literals support string interpolation: \`\${variable}\`",
      "toLowerCase() and toUpperCase() translate character casings",
      "trim() strips starting and trailing white paddings",
      "padStart() and padEnd() insert prefixes to match specified lengths",
    ],
    codeSnippet: `const name = "  Bob  ";
const clean = name.trim().toLowerCase(); // "bob"
const paddedId = "7".padStart(3, "0"); // "007"`,
    relatedExerciseId: "fcc-repeat-string",
  },

  // 4. Control Flow & Loops
  {
    id: "km-conditions-ternary",
    categoryId: "control-flow",
    title: "Branching Checks: if vs Ternary",
    summary:
      "Decide code actions using condition blocks and inline evaluation scripts.",
    details:
      "Use if/else chains to direct large pathways. Use Ternary Operator (condition ? true : false) for assignment expressions.",
    takeaways: [
      "Nullish Coalescing (??) guarantees fallbacks only when value is null or undefined",
      "Falsy coordinates include false, 0, '', null, undefined, and NaN",
    ],
    codeSnippet: `const state = active ? "Online" : "Offline";
const name = username ?? "Guest"; // Nullish coalescing`,
    relatedExerciseId: "safe-wallet-transfer",
  },
  {
    id: "km-loops-statements",
    categoryId: "control-flow",
    title: "Iteration Statements: for, for...in, for...of",
    summary:
      "Configure sequential code loops across ranges and array coordinates.",
    details:
      "Deploy standard for loops for incremental indices. Use for...of for array values. Use for...in for object key strings.",
    takeaways: [
      "for(let i=0; i<n; i++) tracks index numbers",
      "for...of iterates iterable values (Arrays, Sets, Maps)",
      "for...in tracks object keys and inherits prototypal keys",
    ],
    codeSnippet: `const words = ["a", "b"];
for (const word of words) { console.log(word); }`,
    relatedExerciseId: "safe-wallet-transfer",
  },

  // 5. Functions, Scopes & Closures
  {
    id: "km-functions-basics",
    categoryId: "functions-scopes",
    title: "Function Types, Arguments & ES6 Arrows",
    summary:
      "Build reusable blocks with traditional, arrow, and default-parameter definitions.",
    details:
      "Understand basic functions declaration, implicit returns in concise arrow forms, and fallback parameters.",
    takeaways: [
      "Arrow functions (=>) offer shorter bounds, omitting functional brackets",
      "Implicit returns occur inside arrow statements when omitting curly brackets",
      "Default parameters guard missing arguments safely on call frames",
    ],
    codeSnippet: `const multiply = (x, y = 5) => x * y;
console.log(multiply(2)); // 10`,
    relatedExerciseId: "closure-counter",
  },
  {
    id: "km-scopes-closures",
    categoryId: "functions-scopes",
    title: "Lexical Scope and Closures",
    summary:
      "Isolate programmatic variables inside scopes and build private data factories.",
    details:
      "A closure forms when an inner function retains lookup reference to its parent namespace even after that parent block completes execution.",
    takeaways: [
      "Lexical scoping looks upwards for variables definitions",
      "Closures encapsulate variables, shielding them from global access",
      "Hoisting transfers function declarations to the top on module launch",
    ],
    codeSnippet: `function createStore() {
  let val = 10;
  return { get: () => val, set: (v) => val = v };
}`,
    relatedExerciseId: "closure-counter",
  },
  {
    id: "km-functional-callbacks",
    categoryId: "functions-scopes",
    title: "Callbacks & Functional Programming Intro",
    summary:
      "Pass functions as parameters, implement callbacks, and write declarative logic.",
    details:
      "Passing functions to other functions creates callbacks. Functional Programming leverages pure functions and immutability.",
    takeaways: [
      "Callbacks power asynchronous actions and map transformations",
      "Pure functions consistently yield identical outputs given identical inputs",
    ],
    codeSnippet: `const exec = (cb) => cb("Executed");
exec(msg => console.log(msg));`,
    relatedExerciseId: "closure-multiplier",
  },
  {
    id: "km-generators-control",
    categoryId: "functions-scopes",
    title: "Generator Functions & yield",
    summary:
      "Control progress iterations manually with custom exit yield states.",
    details:
      "Generators pause execution mid-flight using 'yield' and resume when next() is triggered. Use yield* for delegating to other generators.",
    takeaways: [
      "Generators return an Iterator object providing next()",
      "yield yields the value structure, yield* expands iterable objects",
    ],
    codeSnippet: `function* idGenerator() {
  let id = 1;
  while (true) yield id++;
}
const gen = idGenerator();
gen.next().value; // 1`,
    relatedExerciseId: "closure-multiplier",
  },

  // 6. Handling Arrays & Spread
  {
    id: "km-array-element-access",
    categoryId: "arrays-basics",
    title: "Element Access, Length, and CRUD Methods",
    summary: "Manage elements in index lists using mutate and read procedures.",
    details:
      "Access with [] or .at(). Add to ends with .push(), extract with .pop(), and perform safe updates using .toSpliced().",
    takeaways: [
      "push() adds items, toSpliced() alters array blocks returning a safe copy",
      "join() merges index items using a custom delimiter string",
    ],
    codeSnippet: `const list = ["A", "B"];
const updated = list.toSpliced(1, 0, "X"); // ["A", "X", "B"]`,
    relatedExerciseId: "fcc-chunky-monkey",
  },
  {
    id: "km-spread-destructuring",
    categoryId: "arrays-basics",
    title: "Spread (...) & Array Destructuring",
    summary:
      "Merge array collections, extract variables, and handle arguments flexibly.",
    details:
      "Spread unpacks collection values. Destructuring unpacks first elements into variables, storing leftovers with rest triple-dots.",
    takeaways: [
      "Spread clones elements into arrays cleanly: [...arr1, ...arr2]",
      "Destructuring unpacks indexes inside brackets: const [first, second] = arr",
    ],
    codeSnippet: `const colors = ["red", "green", "blue"];
const [firstColor, ...otherColors] = colors; // "red", ["green", "blue"]`,
    relatedExerciseId: "coords-extractor",
  },
  {
    id: "km-arrays-objects",
    categoryId: "arrays-basics",
    title: "Arrays of Objects & Matrices",
    summary:
      "Combine dictionary attributes inside linear lists and navigate grid structures.",
    details:
      "A dominant schema for APIs. Navigating matrices or dynamic records uses multiple bracket indices like matrix[y][x].",
    takeaways: [
      "Filter, locate, and transform objects lists utilizing criteria checks",
      "Nested indices represent 2D table files",
    ],
    codeSnippet: `const users = [{ name: "Ann" }, { name: "Val" }];
const user = users[0].name; // "Ann"`,
    relatedExerciseId: "fcc-chunky-monkey",
  },

  // 7. Array Iteration Methods
  {
    id: "km-iterators-map-filter",
    categoryId: "array-iteration",
    title: "Data Transforms and Queries: map, filter, find, and forEach",
    summary:
      "Iterate across arrays to extract, filter, or locate matching items.",
    details:
      "map() transforms whole sequences. filter() keeps matching subset items. find() returns the first element or undefined. forEach() runs side effects.",
    takeaways: [
      "map() consistently outputs arrays matching the origin sizing",
      "filter() shrinks outputs depending on custom constraint booleans",
      "find() halts iteration instantly upon discovering its first match",
    ],
    codeSnippet: `const users = [{ id: 1 }, { id: 2 }];
const userOne = users.find(u => u.id === 1); // find`,
    relatedExerciseId: "map-trim-upper",
  },
  {
    id: "km-iterators-every-some",
    categoryId: "array-iteration",
    title: "Compliance Validations: every & some",
    summary:
      "Test array compliance with predicates to confirm absolute or partial alignments.",
    details:
      "every() validates if all elements satisfy criteria. some() validates if at least one satisfies.",
    takeaways: [
      "every() returns false if any element fails",
      "some() returns true on discovering its first compliant match",
    ],
    codeSnippet: `const ages = [18, 21, 15];
const allAdults = ages.every(a => a >= 18); // false
const hasAdult = ages.some(a => a >= 18);   // true`,
    relatedExerciseId: "search-find-positive",
  },
  {
    id: "km-reducer-aggregation",
    categoryId: "array-iteration",
    title: "Reductions & Structural Groupings",
    summary: "Consolidate collections and build grouped dictionary outputs.",
    details:
      "reduce() processes arrays down to aggregate sums or objects. Object.groupBy() splits indices into distinct categorized labels.",
    takeaways: [
      "reduce() propagates calculations inside an accumulator",
      "Object.groupBy() partitions records depending on key values",
    ],
    codeSnippet: `const nums = [1, 2, 3];
const sum = nums.reduce((acc, curr) => acc + curr, 0); // 6
const grp = Object.groupBy(nums, n => n % 2 === 0 ? 'even' : 'odd');`,
    relatedExerciseId: "reduce-multiplier",
  },

  // 8. Objects & Shorthands
  {
    id: "km-objects-properties",
    categoryId: "objects-structures",
    title: "Object Property Access & Shorthand",
    summary: "Write concise object declarations and dynamic path selectors.",
    details:
      "Access keys with dots or brackets. The double-dot in operator validates key availability.",
    takeaways: [
      "Bracket notation allows searching dynamic keys represented by variables",
      "Shorthand definitions allow leaving out values when matching names: { name }",
      "The in operator validates key presence: 'id' in user",
    ],
    codeSnippet: `const key = "role";
const user = { name: "Jill", [key]: "admin" }; // dynamic
console.log("role" in user); // true`,
    relatedExerciseId: "object-merge-conf",
  },
  {
    id: "km-objects-iteration",
    categoryId: "objects-structures",
    title: "Keys, Values & Entries Iteration",
    summary:
      "Extract indices datasets from dynamic objects using helper constructors.",
    details:
      "Objects did not possess built-in iteration loops due to inheritance. Object helper classes extract lists of keys, values, or entries.",
    takeaways: [
      "Object.keys() yields keys array strings",
      "Object.values() returns cell results listings",
      "Object.entries() harvests array tuples of [key, value] pairs",
    ],
    codeSnippet: `const config = { auth: true, dev: false };
const keys = Object.keys(config); // ["auth", "dev"]`,
    relatedExerciseId: "object-merge-conf",
  },

  // 9. Destructuring & Unpacking
  {
    id: "km-objects-unpacking",
    categoryId: "destructuring-operators",
    title: "Objects Destructuring & defaults",
    summary:
      "Extract multiple properties into variables with custom fallbacks.",
    details:
      "Direct assignment parsing reduces repetitive variable lines. Assign default fallbacks using equal signs inside the destructure block.",
    takeaways: [
      "Object destructuring matches keys: const { port } = server",
      "Fallback variables apply if the property returns undefined",
    ],
    codeSnippet: `const params = { host: "127.0.0.1" };
    const { host, port = 80 } = params; // defaults applied`,
    relatedExerciseId: "coords-extractor",
  },

  // 10. DOM Selectors & Events
  {
    id: "km-dom-selectors-search",
    categoryId: "dom-browser",
    title: "DOM Node Selection & NodeList",
    summary: "Find markup element items inside document viewports cleanly.",
    details:
      "Utilize querySelector and querySelectorAll to fetch Nodes via standard CSS selectors. Convert NodeList results to true Arrays to use map/filter.",
    takeaways: [
      "document.querySelector() selects the first matching element",
      "document.querySelectorAll() returns an iterable NodeList collection",
      "Array.from() or spread converts NodeLists into functional Arrays",
    ],
    codeSnippet: `const body = document.body;
const inputs = document.querySelectorAll(".form-input");
const inputsArr = Array.from(inputs); // real Array`,
    relatedExerciseId: "fcc-truncate-string",
  },
  {
    id: "km-dom-elements-classlist",
    categoryId: "dom-browser",
    title: "Styles & ClassList manipulation",
    summary: "Alter elements appearance and toggle layouts with classes.",
    details:
      "classList edits class strings. style updates inline properties. Toggle classes to handle responsive panels.",
    takeaways: [
      "classList supports add(), remove(), toggle(), and contains()",
      "Assigning to the .style object directly changes visual css properties",
    ],
    codeSnippet: `const sidebar = document.querySelector(".sidebar");
sidebar.classList.toggle("is-active");
sidebar.style.opacity = "0.9";`,
    relatedExerciseId: "fcc-truncate-string",
  },
  {
    id: "km-dom-manipulation-attributes",
    categoryId: "dom-browser",
    title: "DOM Attributes & Insertions",
    summary:
      "Mutate variables values, adjust datasets, and insert direct nodes.",
    details:
      "Edit custom properties with getAttribute/setAttribute. Mutate markup trees using innerHTML, insertAdjacentHTML, or .remove().",
    takeaways: [
      "dataset compiles custom data-* attributes into JavaScript objects",
      "closest() crawls up parent elements looking for CSS selector matches",
    ],
    codeSnippet: `const el = document.querySelector(".user-row");
const userId = el.dataset.userId; // matches data-user-id
const parentCard = el.closest(".card");`,
    relatedExerciseId: "fcc-truncate-string",
  },

  // 11. Async, Promises & Fetch
  {
    id: "km-async-foundations",
    categoryId: "async-javascript",
    title: "Promises, States & the Event Loop",
    summary:
      "Acknowledge asynchronous code execution using Promises and event loop stages.",
    details:
      "Promises manage the state transitions of independent tasks (Pending, Resolved, Rejected). The event loop prioritizes task schedules.",
    takeaways: [
      "New Promise() takes a constructor function: (resolve, reject)",
      "The Event Loop schedules async callback tasks in distinct queues",
      "State transitions from Pending to Resolved or Rejected are permanent",
    ],
    codeSnippet: `const task = new Promise((resolve, reject) => {
  setTimeout(() => resolve("Success!"), 100);
});`,
    relatedExerciseId: "async-resolve-delay",
  },
  {
    id: "km-async-await-flow",
    categoryId: "async-javascript",
    title: "Async/Await Control Flow",
    summary:
      "Write legible asynchronous routines using await pausing behaviors.",
    details:
      "Explicit keywords replace nested catch sequences. Async/Await parses promises as sequential code statements in the thread.",
    takeaways: [
      "async functions automatically return Promises",
      "await pauses code execution until target Promises settle",
      "Always wrap await commands in try-catch to manage server exceptions",
    ],
    codeSnippet: `async function loadData() {
  try {
    const data = await fetchProfileEx();
    return data;
  } catch (err) {
    console.error("Failed", err.message);
  }
}`,
    relatedExerciseId: "safe-json-parse",
  },
  {
    id: "km-promise-concurrency",
    categoryId: "async-javascript",
    title: "Concurrency: Promise.all & Promise.any",
    summary:
      "Resolve multiple network operations concurrently and design redundant callbacks.",
    details:
      "Promise.all() waits for all promises to resolve. Promise.any() returns the first successful promise.",
    takeaways: [
      "Promise.all() rejects immediately if any single promise fails",
      "Promise.any() ignores rejections, resolving with the first successful value",
    ],
    codeSnippet: `const profiles = [fetchUser(1), fetchUser(2)];
const results = await Promise.all(profiles);`,
    relatedExerciseId: "async-resolve-delay",
  },
  {
    id: "km-fetch-apis",
    categoryId: "async-javascript",
    title: "Fetch API & JSON parsing",
    summary:
      "Request resources from remote servers and configure exchange formats.",
    details:
      "Requires double-step promises: resolving transport headers, then parsing payloads into JSON objects using response.json().",
    takeaways: [
      "HTTP verbs control actions: GET reads, POST creates, PUT updates, DELETE removes",
      "response.ok checks status codes to verify success",
      "JSON.stringify() converts JS entities into serialized text",
    ],
    codeSnippet: `const res = await fetch("/api/users", { method: "POST", body: JSON.stringify({ id: 5 }) });
if (res.ok) {
  const data = await res.json();
}`,
    relatedExerciseId: "safe-json-parse",
  },

  // 12. OOP, Classes & super()
  {
    id: "km-classes-foundations",
    categoryId: "classes-oop",
    title: "Classes declaration and constructors",
    summary:
      "Model data using class blueprints, constructors, and instance variables.",
    details:
      "Constructors run automatically during new allocations. Declaring standard instance variables inside constructors binds them to the instance shape.",
    takeaways: [
      "Instances are initialized with the 'new' keyword",
      "Methods on the class are bound to prototypes, conserving memory allocations",
      "Prototypal inheritance allows sharing functions across object instances",
    ],
    codeSnippet: `class Laptop {
  constructor(brand) {
    this.brand = brand;
  }
}
const mac = new Laptop("Apple");`,
    relatedExerciseId: "oop-simple-book",
  },
  {
    id: "km-classes-getters-setters",
    categoryId: "classes-oop",
    title: "Getters, Setters & Private Fields",
    summary: "Build access restrictions and declare private attributes.",
    details:
      "Prefix private fields with #. Utilize get/set keywords to intercept property access and enforce data validations.",
    takeaways: [
      "get and set methods look like properties on the exterior: obj.balance = 100",
      "Private block variables (#field) shield fields from external mutations",
    ],
    codeSnippet: `class Bank {
  #balance = 0;
  get balance() { return this.#balance; }
  set balance(val) { if (val >= 0) this.#balance = val; }
}`,
    relatedExerciseId: "oop-secure-account",
  },
  {
    id: "km-oop-inheritance",
    categoryId: "classes-oop",
    title: "Inheritance, super(), and Prototypes",
    summary:
      "Extend parent shapes and resolve method chains via the prototype pipeline.",
    details:
      "Extending subclasses inherits parent methods. You must call super() in constructors before using 'this' to link the chain.",
    takeaways: [
      "extends copies parent behavior into subclasses",
      "super() runs parent constructors and links execution context 'this'",
      "PrototypeOf walks up prototype chains for fallback properties",
    ],
    codeSnippet: `class Car extends Vehicle {
  constructor(model, electric) {
    super(model); // links parent constructor
    this.electric = electric;
  }
}`,
    relatedExerciseId: "oop-inherited-vehicle",
  },
];
