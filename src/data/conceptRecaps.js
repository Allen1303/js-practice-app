export const CONCEPT_RECAPS = {
  "map-callbacks": {
    analogy:
      "Think of `.map()` like a factory conveyor belt of raw ingredients. As each item moves past, a worker transforms it into a finished product. The conveyor belt has the same number of items at the end, but they are all transformed!",
    tldr: "Use `.map()` when you want to transform every item in an array to create a brand new list of the exact same length.",
    keyTakeaways: [
      "🔄 **Always Returns a New Array**: The original array remains completely untouched.",
      "📏 **Same Length**: The length of the new array is always identical to the original list.",
      "🔧 **Item-by-Item mapping**: Your function describes how to transform a *single* element, and JavaScript handles the loop.",
    ],
    commonTraps: [
      "⚠️ **Forgetting the return value**: Inside curly braces `{}`, you *must* use the `return` keyword, otherwise your elements will end up as `undefined`!",
      "⚠️ **Conventions mixed output**: Don't use `.map()` if you do not want as many items in the output. For that, use `.filter()`! ",
    ],
  },
  "filter-callbacks": {
    analogy:
      "Think of `.filter()` like a security guard screening a guest list at a VIP club. If the guest name returns `true` (matches the invite rule), they walk inside. If `false`, they get ignored!",
    tldr: "Use `.filter()` to screen an array and build a smaller list containing only the items that pass your custom true/false condition checklist.",
    keyTakeaways: [
      "🛡️ **Pristine Source**: The original array stays unchanged, and you get a clean filtered subset back.",
      "🟢 **Boolean Filter**: Your callback function *must* return a Boolean (`true` to keep, `false` to discard).",
      "📏 **Variable Output**: Your resulting array can be shorter, the same size, or even completely empty!",
    ],
    commonTraps: [
      "⚠️ **Returning nested evaluation lists**: The output is still a *list*, even if only one item matches! Don't expect a single unwrapped object back.",
      '⚠️ **Truthy / Falsy confusion**: Numbers like `0` or empty strings `""` are falsy. Be extremely careful and write explicit equations like `val !== 0` inside tests.',
    ],
  },
  "reduce-callbacks": {
    analogy:
      "Think of `.reduce()` like a snowball rolling down a snowy hill. It starts out small (your initial value accumulator) and builds up step-by-step as it wraps up every snowflake (the current elements) in the list.",
    tldr: "Use `.reduce()` when you need to condense, aggregate, or bundle a list of values together to produce a single final result (like a count, average, object lookup dictionary, or flat structure).",
    keyTakeaways: [
      "📥 **Universal Aggregator**: Can compress lists into a simple integer, structured object maps, string phrases, or arrays.",
      "📦 **The Accumulator ('acc')**: Acts as a rolling memory bucket passed down through successive loop iterations.",
      "🏁 **Initial Value Anchor**: Always explicitly define the initial accumulator value as the second parameter (e.g. `0` or `{}`).",
    ],
    commonTraps: [
      "⚠️ **Forgetting to return the acc**: Your callback statement *must* return the accumulator `acc` in every loop, or else the next loop step starts with `undefined`!",
      "⚠️ **Leaving out the start value**: If you omit the initial value, JavaScript defaults the initial accumulator to the first element in the array which causes runtime bugs on objects or empty list calls.",
    ],
  },
  "object-dictionaries": {
    analogy:
      "Think of an Object dictionary like a real phonebook. If you know someone's name (the 'key'), you can flip instantly to their phone number (the 'value') without scanning the whole book from Page 1 line-by-line.",
    tldr: "Use JavaScript Objects as custom dictionary hash-lookups to find and record records instantly in O(1) constant time without tedious nesting loops.",
    keyTakeaways: [
      "⚡ **O(1) Instant Access**: Reading keys directly via `obj[key]` is super fast, avoiding `O(N)` loop searches.",
      "🔑 **Dynamic Key Notation**: Use square brackets `obj[variable]` to seek property keys saved dynamically inside variables.",
      "📦 **Key Uniqueness**: Object keys are unique. Setting an existing key replaces the old record cleanly.",
    ],
    commonTraps: [
      "⚠️ **Bracket vs. Dot notation error**: Writing `obj.variable` searches for the literal word 'variable' inside your object! Use brackets `obj[variable]` for dynamic keys.",
      "⚠️ **Checking key existence**: Do not do `if (obj[key])` if the value can be falsy (like `0` or `false`). Prefer `key in obj` or `obj[key] !== undefined`.",
    ],
  },
  "closures-scoping": {
    analogy:
      "Think of a closure like a customized backpack. When a function is created inside another function, it packs up all the variables from its surrounding environment inside that backpack and keeps them safe wherever it travels!",
    tldr: "Closures happen when an inner function remembers and reads variables defined outside of its scope, even after that parent function has finished running.",
    keyTakeaways: [
      "🎒 **Lexical Scope Pack**: Functions retain a direct live reference to outer scopes defined at creation time.",
      "🔒 **Private Variables**: Allows you to lock away state metrics inside a parent context, exposing them safely only through internal handlers.",
      "🏭 **Factory Patterns**: Allows creating multiple customized setups (like a calculator with a customized starting offset).",
    ],
    commonTraps: [
      "⚠️ **Memory retainers**: Because closures reference active variables, nesting massive collections in parent functions unnecessarily can retain extra memory.",
      "⚠️ **Stale live reference values**: Remember closures capture the actual variables, not just copies. Changing the variable changes the value inside closures too.",
    ],
  },
  "string-parsing": {
    analogy:
      "Think of String parsing like a sentence cutting board. You can chop paragraphs into tiny words, clean up side scraps, and join blocks of text together with clean glue.",
    tldr: "Split, strip, match, and re-join text payloads using built-in chainable string functions instead of manual loop sequences.",
    keyTakeaways: [
      "✂️ **Split & Join**: Use `.split(',')` to turn a string csv row into an array, and `.join('-')` to assemble arrays back into string segments.",
      "🧹 **Trim & Clean**: `.trim()` cleans out wasteful whitespaces from both ends of the input strings.",
      "🔍 **Replace All**: Use `.replace()` or Regex to sweep dirty characters away from raw payloads.",
    ],
    commonTraps: [
      "⚠️ **Immutability rule**: JavaScript strings are completely *immutable*! Methods like `.toUpperCase()` return a *new* string. Calling `str.trim()` does not change `str` itself; you must grab the return value.",
    ],
  },
  "array-search-verification": {
    analogy:
      "Imagine picking a movie to watch. `.find()` is looking until you get the very first match on your criteria. `.some()` is checking if any movie matches. `.every()` is certifying that no movie in the list is bad.",
    tldr: "Built-in search helpers optimize loops. Use `.find()` for a direct item, `.some()` for a lightweight true/false existence test, and `.every()` to verify total group compliance.",
    keyTakeaways: [
      "🎯 **.find() Outcomes**: Locates the *first* direct element value from rules, returning `undefined` if absent.",
      "⚡ **Short-circuits**: Both `.some()` and `.every()` instantly stop checking the moment they know the outcome, saving speeds.",
      "📏 **Strict Rules**: `.every()` is highly strict; just 1 failed element returns `false` globally.",
    ],
    commonTraps: [
      "⚠️ **Returning undefined vs null**: Use optional chaining or defaults when calling `.find()`, as it outputs `undefined` if nothing satisfies the search criteria.",
    ],
  },
  "optional-chaining-coalescing": {
    analogy:
      "Imagine walking down a series of doors. With standard code, if you reach for a doorknob and the room inside is missing, you crash! Optional chaining is like gently checking if the room exists before reaching for the knob.",
    tldr: "Safely navigate nested structures using the optional chaining operator `?.` and fallback to defaults with double question mark nullish coalescing `??`.",
    keyTakeaways: [
      "🛡️ **No Crash Navigation**: Writing `user?.profile?.address` stops searching and safely yields `undefined` instead of throwing a red crash error.",
      "🎯 **Nullish Coalescing (??)**: Returns the right-side default *only* if the left-side is strictly `null` or `undefined`.",
      '💡 **?? over ||**: Avoid using the logical OR `||` operator for defaults because it treats valid values like `0` or `""` as false, which standard coalescing handles properly!',
    ],
    commonTraps: [
      "⚠️ **Overusing ?. everywhere**: Don't use `?.` when you expect a property to be there; it can mask bugs where data is missing but doesn't throw errors.",
      "⚠️ **Precedence rules**: Always group your coalescing calculations if chaining other logical operators around them.",
    ],
  },
  "set-unique-collections": {
    analogy:
      "Think of a Set like a unique guest list at a private event. If Bob has already arrived and walks through the door again, the list remains unchanged because guest names are fully unique!",
    tldr: "Use JavaScript `Set` objects when you need to store items with a guarantee that duplicates are instantly and automatically filtered out.",
    keyTakeaways: [
      "💎 **Zero Duplicates**: Adding elements already in the `Set` does absolutely nothing.",
      "⚡ **O(1) fast contains check**: Asking `set.has(item)` is incredibly fast and efficient compared to standard `array.includes(item)`.",
      "📏 **Size count**: Use `set.size` to find the total unique record counts inside your set.",
    ],
    commonTraps: [
      "⚠️ **Sets lack item indices**: You can't retrieve elements with brackets like `set[0]`. You must convert them to an array first using spread syntax `[...set]` or use `.has()`.",
    ],
  },
  "two-pointer-sliding-window": {
    analogy:
      "Imagine baking cookies. A Promise is like placing your dough in the oven and setting a timer. You don't have to stare at it! You can go set the table, and the timer will buzz (resolve) once the batch is done.",
    tldr: "Promises represent values that might not be available yet but will finish in the future. Use `async/await` to write asynchronous paths that read like normal linear code.",
    keyTakeaways: [
      "⏳ **Async & Non-blocking**: Allows operations like network fetches or timeouts to run in the background without blocking browser actions.",
      "🤝 **The Promise Contract**: Promises start as *Pending*, and eventually transition into *Fulfilled* (success) or *Rejected* (error).",
      "🧹 **Async / Await syntactic sugar**: Makes asynchronous code clean and easy to read using try/catch wrappers.",
    ],
    commonTraps: [
      "⚠️ **Missing await keyword**: If you forget to place `await` before a Promise-based action, you get the raw `Promise` object back instead of the resolved data!",
      "⚠️ **Silent rejections**: Always use `try {} catch (e) {}` blocks around your `await` lines to avoid silent runtime failures.",
    ],
  },
  "spread-destructuring-unpack": {
    analogy:
      "Think of destructuring like picking out ingredients from a box. Instead of grabbing the box and finding items one by one, you reach in and extract the exact elements you need on separate plates immediately.",
    tldr: "Unpack properties from objects, partition lists via Rest parameters, and duplicate structures easily with spread syntax.",
    keyTakeaways: [
      "📦 **Clean Variables Extraction**: Destructure values easily: `const { name, age } = user;`.",
      "🧂 **Spread Operator (...)**: Spreads elements out, making copying arrays and objects dead simple: `[...arr]` or `{...obj}`.",
      "🎒 **Rest parameters**: Packs remaining standalone arguments into an organized list.",
    ],
    commonTraps: [
      "⚠️ **Shallow Copy Limitation**: Spread copies are *shallow*. Nested objects are still referenced back to the original source, so altering them affects both!",
    ],
  },
  "oop-classes-prototype": {
    analogy:
      "Think of a Class like a blueprints file for a house. The blueprint defines what a house has (properties) and what a house does (methods). Each physical house built from that blueprint is an 'instance'.",
    tldr: "Organize code into classes that group related data (properties) and behaviors (methods) together cleanly.",
    keyTakeaways: [
      "🏗️ **The Constructor**: A special function that runs once when you create a new instance with the `new` keyword.",
      "🧬 **Inheritance**: Subclasses can extend parents via the `extends` keyword, calling `super()` to inherit parent parameters.",
      "🔒 **Private Fields**: Use `#` prefix on your property variable names to make them completely private to instances.",
    ],
    commonTraps: [
      "⚠️ **Losing parent scope (this)**: Passing class methods as callbacks can lose the `this` context. Use arrow functions or `.bind(this)` to preserve execution context.",
    ],
  },
  "es6-maps-collections": {
    analogy:
      "Think of an ES6 Map like a structured dictionary where your keys don't have to be normal strings. You can use literally anything—even full HTML elements, vectors, or arrays—as keys!",
    tldr: "Use `Map` for advanced key-value pairing where keys can be objects/vectors. Use `WeakMap` to associate private metadata without causing memory leaks.",
    keyTakeaways: [
      "🔑 **Flexible Keys**: Supports objects, functions, and arrays as keys, unlike standard objects.",
      "📏 **Built-in tracking**: Use `map.size` to instantly read element counts, and `.set()`, `.get()`, and `.has()` to handle values.",
      "💨 **Iterability**: Maps retain original entry insertion order when looping them compared to key indices.",
    ],
    commonTraps: [
      "⚠️ **Direct Object Reference Key Trap**: Reading an object key requires the exact same reference: `map.set({}, 'data')` followed by `map.get({})` returns `undefined`!",
    ],
  },
  "recursion-call-stack": {
    analogy:
      "Think of recursion like peeling open a set of Russian nesting dolls. You peel one open to find a smaller one, continuing until you reach the core tiny doll (the base case). Once you reach the core, you close them back up one-by-one.",
    tldr: "Recursion is when a function solves a broad problem by calling itself with smaller, simpler inputs until it hits a fundamental stop rule (the Base Case).",
    keyTakeaways: [
      "🛑 **The Base Case**: The essential cutoff boundary that stops the function from calling itself forever.",
      "🪜 **Recursive Steps**: Progress towards making the input smaller, moving down towards the base case.",
      "📦 **The Call Stack**: Every recursive step adds a temporary frame on your engine's call stack, which resolves in a reverse ladder.",
    ],
    commonTraps: [
      "⚠️ **Stack Overflow**: Forgetting or getting your base case criteria wrong will trigger infinite loops, crashing with a 'Maximum call stack size exceeded' error.",
    ],
  },
  "linked-lists-trees": {
    analogy:
      "Think of Dates like timestamps on photos. You parse dates from text, compute offsets, construct human-centric calendar alerts, and localized timezone calendars.",
    tldr: "Work confidently with JS `Date` objects, calculating elapsed time offsets, parsing raw text stamps, and outputting clean calendar formatting.",
    keyTakeaways: [
      "🕰️ **Epoch Origin**: JavaScript tracks time internally as milliseconds elapsed since January 1, 1970.",
      "🗓️ **Intl formatting**: Use `Intl.DateTimeFormat` to format calendar details beautifully across global cultures.",
      "⚡ **Time Math**: Calculate duration offsets by subtracting timestamps in milliseconds before dividing down.",
    ],
    commonTraps: [
      "⚠️ **Month index gotcha**: Be careful! The month indices in JavaScript `Date` start with `0` (January is 0, December is 11)!",
    ],
  },
  "stack-queue-dsa": {
    analogy:
      "A Stack is a stack of buffet plates (the first plate placed is the last one picked up—LIFO). A Queue is a standard checkout line (the first customer to arrive is served first—FIFO).",
    tldr: "Enforce strict sequential pathways. Stacks control linear undo-redo or bracket checks, while Queues regulate chronological task workloads.",
    keyTakeaways: [
      "🥞 **Stack (Last In, First Out)**: Controlled cleanly using simple array `.push()` and `.pop()` statements.",
      "🚶‍♀️ **Queue (First In, First Out)**: Regulated with array `.push()` and `.shift()` statements.",
      "🗃️ **Deterministic flow**: Limits random indices access to enforce strict order profiles.",
    ],
    commonTraps: [
      "⚠️ **Array Shift Penalty**: In big production datasets, running `.shift()` on an array requires re-indexing all remaining items. Consider using optimized linked Nodes for dense queuing.",
    ],
  },
  "fcc-basic-algorithms": {
    analogy:
      "Think of Array operations like organizing a warehouse. Splice edits/removes blocks inside lists, clone actions create carbon copies of products, and keys iteration reviews labels.",
    tldr: "Confidently edit collections, perform mutations, write secure clones to avoid accidental side effects, and navigate nested metrics.",
    keyTakeaways: [
      "⚡ **Splicing and Mutation**: `.splice()` overwrites array indices directly, but `.slice()` creates clean superficial duplicates.",
      "🔑 **Deep Object values**: Nested properties nested deep in user preferences require robust recursive cloning.",
      "🛠️ **Keys loops**: Utilize Object helpers like `Object.keys()`, `Object.values()` or `Object.entries()` to inspect properties dynamically.",
    ],
    commonTraps: [
      "⚠️ **Reference manipulation mutations**: Mutating parameters inside nested array handlers can cause silent state errors on React components.",
    ],
  },
  "basic-algorithm-scripting": {
    analogy:
      "Imagine running a sentence clean-up filter. You format title cases, chunk arrays for paging, scan letter frequencies, and choose top trending keywords based on statistics.",
    tldr: "Solve basic algorithmic scripts, group array streams into organized subsegment chunks, and format case cases securely.",
    keyTakeaways: [
      "📊 **Counts tracking**: Build quick counters using standard loop pipelines or `.reduce()`.",
      "📦 **Chunking**: Fragment collections by running step-incrementing `.slice()` cuts.",
      "✂️ **Regex formatting**: Strip unwanted punctuation cleanly using replacement patterns before doing searches.",
    ],
    commonTraps: [
      "⚠️ **Lowercasing words**: Capitalization differences can break search indexes! Always standardize input strings using `.toLowerCase()` before mapping frequencies.",
    ],
  },
  "intermediate-algorithm-scripting": {
    analogy:
      "Think of coordination timelines like calendars. You check for overlaps, find empty windows, sync dynamic teams, and condense consecutive sequence ranges.",
    tldr: "Manage schedules, merge timeline ranges, and write algorithms that coordinate busy event datasets.",
    keyTakeaways: [
      "📅 **Interval Merging**: Sort timeline starts first to easily find touching ranges in linear paths.",
      "🏹 **Free Slot Coordinates**: Analyze overlapping schedules to locate free intervals.",
      "🔄 **Range packing**: Group adjacent numbers into structured compact boundaries.",
    ],
    commonTraps: [
      "⚠️ **Sorting sequences alphabetically**: JavaScript `.sort()` converts numbers to strings first! Always pass a custom compare function: `.sort((a, b) => a - b)`.",
    ],
  },
};
