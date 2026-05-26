export const CONCEPTS = [
  {
    id: "map-callbacks",
    title: ".map() Callback Transform",
    shortDescription:
      "Construct new arrays by transforming every element safely using map callbacks.",
    longExplanation:
      "The `.map()` array method is the cornerstone of immutable mutations in JavaScript. It creates a brand new array filled with the output values returned by your callback function, executed sequentially on each element in order.\n\n- **Immutable Paradigm**: Always returns a new array. Never modifies the original list arrays.\n- **Direct Mapping**: Standard mapping takes three callback parameters: `elements.map((element, index, originalArray) => { ... })`.",
    codeSnippet: `// Example: Standard immutable conversion
const numbers = [1, 2, 3, 4];
const squared = numbers.map(x => x ** 2);

console.log(squared); // [1, 4, 9, 16]
console.log(numbers); // [1, 2, 3, 4] (remains unmodified)`,
    exercises: [
      {
        id: "map-trim-upper",
        title: "Clean Word Sanitizer",
        difficulty: "Warm-up",
        conceptContext:
          "In JavaScript, strings have built-in methods like `.trim()` which removes whitespace from both ends, and `.toUpperCase()` which capitalizes all characters. They can be chained: `word.trim().toUpperCase()`.",
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
        id: "map-scale-parity",
        title: "Position-Based Scalar Selector",
        difficulty: "DSA Easy",
        conceptContext:
          "The callback passed to `.map()` receives three arguments: the current element, its index (zero-based position), and the original array: `.map((val, index, array) => ...)`.",
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
        id: "map-diff-bounds",
        title: "Peak Normalized Distance Matrix",
        difficulty: "DSA Easy",
        conceptContext:
          "To map arrays relative to their global structure, query global variables or helpers first. For instance, `Math.max(...nums)` uses spread parameters to discover the largest number in a dataset.",
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
        id: "map-user-profiles",
        title: "Structured Profiles Extractor",
        difficulty: "DSA Easy",
        conceptContext:
          "Mapping is extremely useful for transforming arrays of objects. Code inside the map callback returns a brand-new restructured object literal: `arr.map(user => ({ id: user.id, status: 'active' }))`.",
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
        id: "map-coordinates",
        title: "Grid Coordinates Flat-Mapper",
        difficulty: "DSA Medium",
        conceptContext:
          "In graphics processors and pathfinding engines, multidimensional coordinates are compressed into high-speed 1D flat lines with linear calculations: `index = row * total_width + col`.",
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
      "Sift through arrays, preserving only elements that pass absolute procedural criteria tests.",
    longExplanation:
      "The `.filter()` method checks arrays, constructing a brand new output list containing ONLY the elements that satisfy a truthy boolean assertion criteria checked in your callback function.\n\n- **Immutable Pruning**: Does not delete array items from the original array. Returns a clean subset array directly.\n- **Truth Assertion**: Callback must evaluate to a truthy boolean value (`true` or `false`) to keep or reject items.",
    codeSnippet: `// Example: Clean odd numbers out of lists
const series = [1, 2, 3, 4, 5];
const evens = series.filter(num => num % 2 === 0);

console.log(evens); // [2, 4]
console.log(series); // [1, 2, 3, 4, 5] (remains unmodified)`,
    exercises: [
      {
        id: "filter-positives",
        title: "Post-Zero Filter Sanitizer",
        difficulty: "Warm-up",
        conceptContext:
          "The `.filter()` method executes a callback predicate. If the callback returns `true`, the element is saved; if it returns `false`, it's ignored: `arr.filter(element => element >= 0)`.",
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
        id: "filter-averages",
        title: "Dynamic Average Outliers Filter",
        difficulty: "DSA Easy",
        conceptContext:
          "Callbacks can use variables declared outside the `.filter()` block. Calculating metrics (like sum/average) beforehand lets you filter relative to dynamic stats.",
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
        id: "filter-valleys",
        title: "Relational Neighbor Valley Filter",
        difficulty: "DSA Easy",
        conceptContext:
          "Just like `.map()`, `.filter()` passes the element's index position as the second argument, and the complete array as the third. This lets you index adjacent neighbors.",
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
        id: "filter-uniques",
        title: "Occurrence Deduplicator Filter",
        difficulty: "DSA Easy",
        conceptContext:
          "An element is unique in an array if its first occurrence index matches its last occurrence index, which can be queried using `.indexOf(elem)` and `.lastIndexOf(elem)`.",
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
        id: "filter-landmarks",
        title: "Stateful Monotonic Elevation Lands",
        difficulty: "DSA Medium",
        conceptContext:
          "A filter callback can update a running reference variable tracking values from left-to-right (like the maximum height seen so far) in the outer function scope.",
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
      "Aggregate, collapse, or reshape entire arrays into a single resulting data structure.",
    longExplanation:
      "The `.reduce()` method is JavaScript's most powerful array operator. It computes arrays downwards into a single result variable—which can be a single number, a string, a clean dictionary object, or a brand new array!\n\n- **Accumulator Context**: Keeps passing a running state: `.reduce((accumulator, currValue) => { ... }, initialValue)`.\n- **Unlocking Solutions**: Almost all array manipulation patterns can be rewritten using `.reduce()` directly.",
    codeSnippet: `// Example: Computing running totals
const costs = [10, 20, 30];
const totalSum = costs.reduce((sum, item) => sum + item, 0);

console.log(totalSum); // 60`,
    exercises: [
      {
        id: "reduce-multiplier",
        title: "Secure Value Product Reducer",
        difficulty: "Warm-up",
        conceptContext:
          "`.reduce((accumulator, current) => ..., initialValue)` loops values. The returned result of each callback iteration becomes the next iteration's accumulator value.",
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
        id: "reduce-parity-obj",
        title: "Parity Object Partition Aggregator",
        difficulty: "DSA Easy",
        conceptContext:
          "The initial value can be an object: `.reduce((acc, curr) => { ... }, { evens: [], odds: [] })`. Be sure to push to arrays and return the `acc` reference.",
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
        id: "reduce-freq-tally",
        title: "Word Frequency Dict Counter",
        difficulty: "DSA Easy",
        conceptContext:
          "To count element counts, initialize with `{}`. In the callback, if the key does not exist yet inside accumulator, fallback to 0: `acc[word] = (acc[word] || 0) + 1`.",
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
        id: "reduce-flatten",
        title: "Matrix Rows Grid Flattener",
        difficulty: "DSA Easy",
        conceptContext:
          "An empty array `[]` initialized as the accumulator can be concatenated sequentially with nested rows inside a map closure via `acc.concat(row)`.",
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
        id: "reduce-run-length",
        title: "Run-Length Sequence Encoder",
        difficulty: "DSA Medium",
        conceptContext:
          "Reductions can read historical records inside their active accumulator container (like `acc[acc.length - 1]`) to determine whether to combine or push data.",
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
      "Design high speed O(1) hash maps, dictionary catalogs, and lookup directory tables.",
    longExplanation:
      "JavaScript objects serve as instant Key-Value stores under the hood. While simple nested arrays run in sluggish square O(N²) quadratic calculations, Object indexing unlocks extreme linear O(N) lookup operations.\n\n- **Property Lookup**: Check properties in constant runtime: `if (key in myMap) { ... }` or `myMap[key] !== undefined`.",
    codeSnippet: `// Example: O(1) attribute indexing comparison
const accounts = {
  101: { name: 'Adam' },
  152: { name: 'Beth' }
};

if (152 in accounts) {
  console.log(accounts[152].name); // Beth
}`,
    exercises: [
      {
        id: "object-merge-conf",
        title: "Selective Default config Merger",
        difficulty: "Warm-up",
        conceptContext:
          "The ES6 Spread operator `...` compiles and clones dictionary properties into brand new objects: `{ ...defaults, ...overrides }` updates existing matching keys.",
        description:
          "Let's warm up with basic object key manipulation and fallback searches.\n\nWrite a function `mergeConfig(defaults, overrides)` that takes a defaults dictionary and overrides list of keys.\n\nIt should return a new object containing the default configuration values, except where overriding parameters are provided inside `overrides`.",
        codeTemplate: `function mergeConfig(defaults, overrides) {
  // Double merge, returning a clean updated parameter object
  
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
        conceptContext:
          "Instead of searching for matching pairs using nested loops (which is O(N²)), caching checked numbers in a lookup dictionary resolves targets in one linear timeline (O(N)).",
        description:
          "Let's build on basic dictionary lookups to solve a classic DSA algorithm in linear time!\n\nWrite a function `twoSumLookup(nums, target)` that seeks the index positions of two numbers in `nums` that add up to `target`.\n\nYou must achieve **O(N) linear runtime** by using an object as a coordinate lookup tracker. Nested loops are forbidden!",
        codeTemplate: `function twoSumLookup(nums, target) {
  // Create an object to cache numbers you have already evaluated
  
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
        conceptContext:
          "An anagram has identical character balance counts. Building occurrence tallies with objects (`{ a: 2, b: 1 }`) compares strings instantly.",
        description:
          "Now, let's compare two datasets using maps of character occurrences.\n\nWrite a function `isAnagramLookup(s, t)` which verifies if strings `s` and `t` are anagrams in strict **O(N)** time.\n\nAn anagram contains identical letters in exactly the same quantities (frequency counts).",
        codeTemplate: `function isAnagramLookup(s, t) {
  // If lengths differ, return false immediately.
  // Use a hash frequency map to check letter occurrences.
  
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
        conceptContext:
          "Looping through records allows building a dynamic index repository on a category field where each key points to an array: `if (!obj[key]) obj[key] = []`.",
        description:
          "Let's build on grouping logic by indexing list datasets into categorized object arrays.\n\nWrite a function `indexUsers(users)` which processes a user objects array: `[{ name: '...', dept: '...' }]`.\n\nIt should return an object where each key is a department name, and its value is an array of names belonging to that department.\n\nExample:\n`[{ name: 'Alice', dept: 'HR' }, { name: 'Bob', dept: 'IT' }, { name: 'Charlie', dept: 'HR' }]` ->\n`{ HR: ['Alice', 'Charlie'], IT: ['Bob'] }`.",
        codeTemplate: `function indexUsers(users) {
  // Group user strings by matching keys dynamically
  
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
        conceptContext:
          "To identify lists streaks in linear time, save elements into an object lookup index. Then, query only element starts with `if (!(val - 1 in index))` to bypass double checks.",
        description:
          "To complete the Object Dictionaries sequence, let's solve a high-speed streak validation test.\n\nWrite a function `longestStreak(nums)` that takes an array of unsorted integers and identifies the length of its longest consecutive sequence of numbers.\n\nExample: `[100, 4, 30, 1, 3, 2]` contains consecutive sequence `1, 2, 3, 4`, returning a length of `4`.\n\nAchieve O(N) complexity using helper hash maps.",
        codeTemplate: `function longestStreak(nums) {
  // Create an object to cache existence: seen = {}
  // Only start counting increments if (num - 1) does not exist!
  
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
      "Master lexical scoping, private encapsulation, and self-contained function state stores.",
    longExplanation:
      "Closures are formed whenever an inner function retains access to variables declared in its outer parent scope, even after that parent function finishes executing.\n\n- **Encapsulation**: Create truly private states that cannot be accessed or modified directly from the outside.\n- **State Retention**: Perfect for writing stateful widgets, modular custom hook caches, and data stream pipelines.",
    codeSnippet: `// Example: Private variable closure
function createGreeter(greeting) {
  return function(name) {
    return \`\${greeting}, \${name}!\`;
  };
}
const sayHello = createGreeter("Hello");
console.log(sayHello("Emma")); // "Hello, Emma!"`,
    exercises: [
      {
        id: "closure-counter",
        title: "Private Counter Factory",
        difficulty: "Warm-up",
        conceptContext:
          "Variables declared in the outer function persist inside returned callback objects because of lexical closures, shielding them from external edits.",
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
        conceptContext:
          "Outer configuration variables (like multipliers) get sealed inside custom functions returned as formulas: `return n => n * outerConfig`.",
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
        conceptContext:
          "A cache object `{}` can be stored inside a closure's lexical sphere. The returned compiler checks this record *before* executing slow computation routes.",
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
            input: ["mockSquare"],
            expected: [16, 16],
            description:
              "Computes once, while secondary lookups fetch from cached keys",
          },
        ],
      },
      {
        id: "closure-stream",
        title: "Moving Average Stream Tracker",
        difficulty: "DSA Medium",
        conceptContext:
          "Sliding window telemetry monitors continuous input feeds. Appending values to enclosed arrays, then slicing the tail, manages sliding metrics nicely.",
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
      "Sift, slice, segment, and reconstruct strings cleanly utilizing core JS string utilities.",
    longExplanation:
      "JavaScript strings are immutable sequences of UTF-16 character pieces. Processing templates, cleaning up user inputs, parsing CSV logs, or handling data transfers requires strong mastery of string manipulation tools.\n\n- **Direct Inspections**: Look up parts with `slice()`, `split()`, `join()`, and `replace()` operations.",
    codeSnippet: `// Example: String manipulation transformations
const file = "image.png";
const extension = file.slice(file.lastIndexOf("."));

console.log(extension); // ".png"`,
    exercises: [
      {
        id: "string-html-tag",
        title: "Sanitized HTML Tag Wrappers",
        difficulty: "Warm-up",
        conceptContext:
          "Constructing tags can use string template literals: `\`<\${tag}>\${text}</\${tag}>\``. Remember to clean whitespace using `.trim()` and casing with `.toLowerCase()`.",
        description:
          "Let's warm up with custom template constructors.\n\nWrite a function `wrapInHTML(text, tag)` that encloses a string within customized HTML tags.\n\nEnsure that:\n- Whitespaces are trimmed from the `text`.\n- The `tag` value is converted completely to lowercase before generation.\n\nExample: `wrapInHTML(' Hello ', 'DIV')` -> `'<div>Hello</div>'`.",
        codeTemplate: `function wrapInHTML(text, tag) {
  // Trim spaces and normalize HTML element names
  
}`,
        functionName: "wrapInHTML",
        hints: [
          "Call .trim() on the 'text' string values.",
          "Call .toLowerCase() on the 'tag' string arguments.",
          "Return wrapped elements: \`<\${cleanTag}>\${cleanText}</\${cleanTag}>\`.",
        ],
        explanation:
          "Generating standardized formatting structures represents standard script automation tasks.",
        testCases: [
          {
            id: 1,
            input: [[" Hello ", "DIV"]],
            expected: "<div>Hello</div>",
            description:
              "Trims contents and forces lowercase tags successfully",
          },
          {
            id: 2,
            input: [["Item", "li"]],
            expected: "<li>Item</li>",
            description: "Secures custom list structures",
          },
        ],
      },
      {
        id: "string-csv-reader",
        title: "Clean delimiter CSV Row Reader",
        difficulty: "DSA Easy",
        conceptContext:
          "Splitting strings into separate array chunks is achieved via `.split(delimiter)`. You can then map over the resulting array to clear trailing and leading spaces safely.",
        description:
          "Let's build on basic mapping by splitting tabular fields from raw data formats!\n\nWrite a function `parseCSVRow(row, delimiter)` that takes a line of spreadsheet values and a character separator (like a comma).\n\nIt should split the string on that separator into arrays, ensuring that every resulting field has leading and trailing spaces stripped cleanly.",
        codeTemplate: `function parseCSVRow(row, delimiter) {
  // Split sequences and map trimmed records
  
}`,
        functionName: "parseCSVRow",
        hints: [
          "Use row.split(delimiter) to partition elements.",
          "Chain .map(field => field.trim()) to prune extraneous whitespaces from the output array.",
        ],
        explanation:
          "Splitting line strings and trimming whitespaces is fundamental to parsing file formats.",
        testCases: [
          {
            id: 1,
            input: [["apple,   banana , orange", ","]],
            expected: ["apple", "banana", "orange"],
            description: "Prunes whitespace margins from CSV array parts",
          },
          {
            id: 2,
            input: [["admin; guest", ";"]],
            expected: ["admin", "guest"],
            description: "Supports alternative separators cleanly",
          },
        ],
      },
      {
        id: "string-camel-case",
        title: "CamelCase Variable Standardizer",
        difficulty: "DSA Easy",
        conceptContext:
          "Transforming strings with complex separators utilizes split-and-join strategies. Capitalizing subsequent array terms yields dynamic properties: `word[0].toUpperCase() + word.slice(1)`.",
        description:
          "Convert separated inputs into standard camelCase syntax!\n\nWrite a function `toCamelCase(str)` that accepts hyphens, underscores, or space-separated term strings and converts them to modular CamelCase form.\n\nExample:\n- `'first-name'` -> `'firstName'`\n- `'Capitalize space text'` -> `'capitalizeSpaceText'`.",
        codeTemplate: `function toCamelCase(str) {
  // Split sentences/slugs and reduce or map elements capitalized
  
}`,
        functionName: "toCamelCase",
        hints: [
          "Split variables across delimiters (regex /[\\s-_]+/ is highly useful).",
          "Map words: the first word is coerced to lowercase. Subsequent words get their first letter capitalized and remainders kept intact.",
          "Join the results back with a blank character delimiter: .join('').",
        ],
        explanation:
          "Translating dirty filenames and forms keys into normalized variables prevents namespace crash bugs.",
        testCases: [
          {
            id: 1,
            input: ["first-name"],
            expected: "firstName",
            description: "Resolves hyphenated variables to camelCase",
          },
          {
            id: 2,
            input: ["Capitalize space text"],
            expected: "capitalizeSpaceText",
            description: "Handles multi word spaces seamlessly",
          },
        ],
      },
      {
        id: "string-brackets",
        title: "Balanced Bracket sequence Auditor",
        difficulty: "DSA Easy",
        conceptContext:
          "A classic stack structure is constructed with arrays `push` and `pop`. Matching bracket characters can be verified using lookups: `const matches = { ')': '(', '}': '{', ']': '[' }`.",
        description:
          "Build an automated syntax verification engine!\n\nWrite a function `isBalancedBrackets(code)` that inspects a string of code, returning `true` if all parentheses `()`, curly braces `{}`, and square brackets `[]` are properly opened and closed in the correct chronological order.\n\nIf any brackets are closed out of sequence or remain unclosed, return `false`.",
        codeTemplate: `function isBalancedBrackets(code) {
  // Use a classic array stack to verify bracket closures
  
}`,
        functionName: "isBalancedBrackets",
        hints: [
          "Initialize an empty stack list: const stack = [].",
          "Identify characters: open characters '({[' get pushed immediately.",
          "When visiting close chars ')}]': pop the stack and check that it represents the appropriate matching open brace. If false, return false.",
          "After looping, returns true if stack size is empty (all closed).",
        ],
        explanation:
          "Compilers and linters leverage stack queues to validate brackets boundaries cleanly in linear time.",
        testCases: [
          {
            id: 1,
            input: ["function() { let x = [1, 2]; }"],
            expected: true,
            description: "Correctly closed structures return true",
          },
          {
            id: 2,
            input: ["( [ ) ]"],
            expected: false,
            description: "Catches mismatched bracket sequences",
          },
        ],
      },
      {
        id: "string-decompress-rle",
        title: "Run-Length Sequence Decompressor",
        difficulty: "DSA Medium",
        conceptContext:
          "Iterating through characters allows finding numeric runs. Standard string replication `str.repeat(num)` multiplies letters instantly.",
        description:
          "Create an inverse data decompression script!\n\nWrite a function `decompressRLE(str)` that takes a compacted run-length encoded string and expands it back to its original layout.\n\nInput strings are structured as repeating characters followed directly by their occurrences counts (which can be multi-digit numbers).\n\nExample:\n- `'a2b3a1'` -> `'aabbba'`\n- `'x10y1'` -> `'xxxxxxxxxxy'`.",
        codeTemplate: `function decompressRLE(str) {
  // Parse letters and trailing numeric count groups sequentially, multiplying characters
  
}`,
        functionName: "decompressRLE",
        hints: [
          "Iterate str. Identify letters (regex /[a-zA-Z]/) and number runs (regex /[0-9]/).",
          "Keep accumulating character digits if they continue sequentially, parsing with parseInt().",
          "Replicate letters: currentChar.repeat(count) and append to result string.",
        ],
        explanation:
          "Unpacking formatted networks packets reduces transit payload weights safely.",
        testCases: [
          {
            id: 1,
            input: ["a2b3a1"],
            expected: "aabbba",
            description: "Expands compressed streams to original sequences",
          },
          {
            id: 2,
            input: ["x10y1"],
            expected: "xxxxxxxxxxy",
            description: "Supports double-digit multiplier counts",
          },
        ],
      },
    ],
  },
  {
    id: "array-search-verification",
    title: "Array Search & Checks",
    shortDescription:
      "Inspect, locate, and assert conditions across array collections using high-reusability ES6 search operators.",
    longExplanation:
      "Looking up items inside arrays is a highly frequent operational requirement. Instead of running heavy manual indexing loops, modern JavaScript provides clean high-performance built-in search methods.\n\n- **`.find()`**: Returns the *first* element that passes a validation predicate.\n- **`.some()`**: Returns true if *at least one* element holds true.\n- **`.every()`**: Returns true only if *all* elements satisfy assertions.",
    codeSnippet: `// Example: Swift target lookup validation
const profiles = [{ id: 1, active: true }, { id: 2, active: false }];
const activeUser = profiles.find(p => p.active);

console.log(activeUser.id); // 1`,
    exercises: [
      {
        id: "search-find-positive",
        title: "First Positive Number Finder",
        difficulty: "Warm-up",
        conceptContext:
          "The `.find(predicate)` method returns the first matched element value, returning `undefined` if no items meet the criteria: `arr.find(x => x > 0)`.",
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
        conceptContext:
          "Checking if *any* element satisfies a condition is highly optimal using `.some(predicate)`. It halts execution (short-circuits) the moment a match resolves true: `arr.some(age => age < 18)`.",
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
        conceptContext:
          "Asserting that *every* item in a collection conforms to conditions is handled via `.every(predicate)`. It halts and returns `false` immediate upon finding single violations.",
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
        conceptContext:
          "We can query character positions inside strings. If `str.indexOf(char) !== index` for a character at position `index`, it indicates the character has appeared earlier.",
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
        conceptContext:
          "Sub-arrays can be checked iteratively using sliding sweeps or double pointers: `sum` of array slice offsets matches the goal.",
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
      "Query deeply nested attributes and protect setups fallback values utilizing ?. and ?? operators safely.",
    longExplanation:
      'Deeply nested objects can throw nasty errors if parent nodes are missing (`Cannot read properties of undefined`). JavaScript handles this using:\n\n- **Optional Chaining (`?.`)**: Instantly aborts lookups and yields `undefined` instead of throwing: `user?.profile?.avatar`.\n- **Nullish Coalescing (`??`)**: Yields right-hand fallback ONLY if left-hand value is strictly `null` or `undefined` (preserving empty strings `""` or `0`).',
    codeSnippet: `// Example: Guarding configuration variables
const theme = { darkMode: false, settings: null };
const isDark = theme.settings?.enhancedDark ?? true;

console.log(isDark); // true`,
    exercises: [
      {
        id: "safe-nested-attr",
        title: "Nested coordinates extractor",
        difficulty: "Warm-up",
        conceptContext:
          "Accessing nested attributes is secured by putting ?. between properties. Combining ?? provides a solid default: `obj?.sub?.item ?? 'default'`.",
        description:
          "Let's warm up with basic safe lookups.\n\nWrite a function `getNestedCoordinates(user)` that attempts to fetch a user's location coordinates. It should query: `user.profile.address.coordinates`.\n\nIf any step along this path is missing, return `'No coordinate profile found'`.",
        codeTemplate: `function getNestedCoordinates(user) {
  // Secure deep pathways using optional chaining ?. and fallback ??
  
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
        conceptContext:
          "Nullish coalescing `??` is superior to OR `||` because it keeps legitimate falsy entries like `0`, `false`, or empty strings, only falling back on `null` or `undefined`.",
        description:
          "Let's explore selection mechanics where falsy inputs must be preserved!\n\nWrite a function `getUserThemePreference(settings)` that queries active user selections:\n- Fetch property `settings.theme.darkMode`.\n- If that field is non-existent (`null` or `undefined`), fall back to a default value of `true`.\n- Ensure that if `darkMode` is explicitly defined as `false`, you return `false` (do not mistakenly overwrite it).",
        codeTemplate: `function getUserThemePreference(settings) {
  // Access and return the preference, preserving legitimate falsy properties like false with ??
  
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
        conceptContext:
          "Indexing matrix arrays is safe if outer nodes are checked first: `grid?.[row]?. [col]` handles missing grids safely.",
        description:
          "Shield matrix array indexes from throws!\n\nWrite a function `safeMatrixLookup(grid, row, col)` that returns an item inside a 2D matrix.\n\nUse optional chaining to fetch `grid[row][col]`. If that grid slot resides outside physical bounds, return `-1`.",
        codeTemplate: `function safeMatrixLookup(grid, row, col) {
  // Use bracket chaining ?. to secure lookup offsets
  
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
                [
                  [1, 2],
                  [3, 4],
                ],
                1,
                0,
              ],
            ],
            expected: 3,
            description: "Correctly maps valid row and coordinate indexes",
          },
          {
            id: 2,
            input: [
              [
                [
                  [1, 2],
                  [3, 4],
                ],
                5,
                0,
              ],
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
        conceptContext:
          "Chaining can be integrated with methods calls: `telemetry?.getLogs?.()` returns `undefined` if `getLogs` is missing, which can then fall back on another pipeline.",
        description:
          "Extract sensor streams from dynamic diagnostic payloads!\n\nWrite a function `getSensorStatus(device)` that attempts to return a device's sensor health rating:\n- If `device.fetchMetrics` method is present, execute it: `device.fetchMetrics()`. Then return its `status` parameter.\n- If that method is completely missing, attempt to query the static field `device.lastKnownTelemetry.status`.\n- If both options fail (i.e. resolve to `null`/`undefined`), return the string `'OFFLINE'`.",
        codeTemplate: `function getSensorStatus(device) {
  // Safely execute optional methods and fall back on static pathways
  
}`,
        functionName: "getSensorStatus",
        hints: [
          "Check method: let status = device?.fetchMetrics?.()?.status.",
          "Check static: if (status === undefined) status = device?.lastKnownTelemetry?.status.",
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
        ],
      },
      {
        id: "safe-path-crawler",
        title: "Dynamic directory config Crawler",
        difficulty: "DSA Medium",
        conceptContext:
          "Custom path navigation is protected by checking arrays and keys. Chaining bracket lookup keys `obj?.[pathArray[i]]` handles dynamic navigation tracks.",
        description:
          "Build a safe path resolver!\n\nWrite a function `crawlPath(obj, pathKeys)` that takes a nested object and an array of keys representing a coordinate pathway.\n\nit should traverse the target object along that sequence of keys, returning the final resolved value.\n\nIf at any layer the pathway breaks (the current key resolves to `null` or `undefined`), return `'PATH_BLOCKED'`.",
        codeTemplate: `function crawlPath(obj, pathKeys) {
  // Iterate the keys array, using optional chaining to traverse nesting levels safely
  
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
      "Formulate mathematics set groupings, filter distinct elements, and audit unique listings swiftly in O(1).",
    longExplanation:
      "A JavaScript `Set` is an ES6 native collection type containing only entirely distinct elements (duplicates are completely ignored automatically).\n\n- **O(1) Membership Testing**: Checking exists via `mySet.has(x)` runs in blazing constant O(1) time.\n- **Quick Deduplication**: Double filter list arrays down instantly: `[...new Set(myArray)]`.",
    codeSnippet: `// Example: Complete arrays deduplication
const duplicates = [1, 2, 2, 3, 1, 4];
const uniqueSet = new Set(duplicates);

console.log(uniqueSet.has(2)); // true
console.log([...uniqueSet]); // [1, 2, 3, 4]`,
    exercises: [
      {
        id: "set-deduplicate-list",
        title: "Array Cleaner Deduplicator",
        difficulty: "Warm-up",
        conceptContext:
          "A Set removes duplicate values from an array instantly. We can convert back to an array using the Spread operator: `[...new Set(arr)]`.",
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
        conceptContext:
          "Finding overlapping elements in two sets is known as intersection. Converting the smaller list to a Set allows constant O(1) searches: `arr1.filter(x => set2.has(x))`.",
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
              [
                [1, 2, 2, 3],
                [2, 3, 4],
              ],
            ],
            expected: [2, 3],
            description: "Finds common intersecting elements",
          },
          {
            id: 2,
            input: [
              [
                [5, 9],
                [1, 2],
              ],
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
        conceptContext:
          "Checking unique items can compare sizing. If a string has unique letters, loading its characters into a Set results in: `set.size === string.length`.",
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
        conceptContext:
          "Symmetric difference collects elements that are in *either* list, but **not** in both: `(A - B) ∪ (B - A)`. This is solved by checking sets membership of elements.",
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
              [
                [1, 2, 3],
                [3, 4, 5],
              ],
            ],
            expected: [1, 2, 4, 5],
            description: "Finds symmetric differences correctly",
          },
          {
            id: 2,
            input: [
              [
                [1, 1, 2],
                [2, 2],
              ],
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
        conceptContext:
          "Instead of mapping key-indexes inside dictionary objects, tracking checked items inside a `Set` allows O(1) membership checks to discover pairs that sum to target: `set.has(target - num)`.",
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
            input: [[[10, 15, 3, 7], 17]],
            expected: true,
            description: "Matches 10 and 7 summing to 17",
          },
          {
            id: 2,
            input: [[[1, 2, 3, 9], 8]],
            expected: false,
            description: "Correctly rejects non matching lists",
          },
        ],
      },
    ],
  },
  {
    id: "two-pointer-sliding-window",
    title: "Two Pointers & Sliding Window",
    shortDescription:
      "Master bidirectional sweeps, fast/slow window iterators, dynamic length window optimizations, and nested multi-pointer configurations.",
    longExplanation:
      "Many optimal array and string algorithms can reduce nested O(N^2) space/time solutions to O(N) linear operations by keeping state tracked via pointer indexes.\n\n- **Bidirectional pointers**: Move inward from both left and right edges depending on sum conditions (classic sorted Two Sum).\n- **Fast/slow pointers**: Fast scouts forward, and slow marks bounds for in-place modifications.\n- **Sliding Window**: Represents a contiguous range. Maintain a running sum or collection property, expanding the right wall until the rule breaks, then contracting the left wall to recover compliance.",
    codeSnippet: `// Example: Find if sorted array has pair summing to target
function hasPairSum(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum === target) return true;
    if (sum < target) left++;
    else right--;
  }
  return false;
}`,
    exercises: [
      {
        id: "two-sum-sorted",
        title: "Two Sum - Sorted Input",
        difficulty: "Warm-up",
        conceptContext:
          "Bidirectional approach takes advantage of a sorted input structure. If the current pointer sum at [left, right] is less than target, increment left; if greater, decrement right. This guarantees O(N) runtime and O(1) memory.",
        description:
          "Find two numbers in a sorted array that sum up to a target value.\n\nWrite a function `twoSumSorted(numbers, target)` that accepts a sorted array of integers `numbers` and a target integer `target`. It must return the 0-based indices of the two elements as a two-item array `[index1, index2]` in ascending order (where index1 < index2).\n\nAssume exactly one unique pair solution exists for all input cases.",
        codeTemplate: `function twoSumSorted(numbers, target) {
  // Use a left and right pointer to find the unique indices adding up to target
  
}`,
        functionName: "twoSumSorted",
        hints: [
          "Initialize a left pointer at 0 and a right pointer at numbers.length - 1.",
          "Run a while (left < right) loop, calculating the current sum: numbers[left] + numbers[right].",
          "If sum strictly matches target, return [left, right]. If sum < target, left++. Otherwise, right--.",
        ],
        explanation:
          "Bidirectional sweeping on sorted systems eliminates redundant inner loops.",
        testCases: [
          {
            id: 1,
            input: [[2, 7, 11, 15], 9],
            expected: [0, 1],
            description: "Identifies primary pair at boundaries",
          },
          {
            id: 2,
            input: [[1, 3, 4, 6, 8, 10], 11],
            expected: [1, 3],
            description: "Finds correct inner values summing to 11",
          },
        ],
      },
      {
        id: "remove-duplicates-ptr",
        title: "In-Place Unique Filter",
        difficulty: "DSA Easy",
        conceptContext:
          "Fast/slow pointers are useful for sorting or filtering. The fast pointer iterates to find brand-new unique elements, and the slow elements index marks where to queue them up sequentially. Using standard arrays, we can construct the result array sequentially using this logic.",
        description:
          "Remove duplicate numbers from a sorted list.\n\nWrite a function `removeDuplicates(nums)` that takes a sorted array of integers `nums` and returns a new array containing ONLY the unique elements in their original order.\n\nBuild the array by iterating with two pointer indices (slow track index and fast scouting index) to construct the unique array element by element.",
        codeTemplate: `function removeDuplicates(nums) {
  // Use slow and fast indicators to build and return a list of unique numbers from the sorted input
  
}`,
        functionName: "removeDuplicates",
        hints: [
          "If the input nums array is empty, return an empty array.",
          "Initialize a results array with the first element of nums.",
          "Run a loop with a fast index from 1 to nums.length - 1, checking if nums[fast] is different from the previous unique element.",
          "If they differ, push the new value to the results and return it at the end.",
        ],
        explanation:
          "Filtering duplicates becomes a linear operation when keeping track of unique transitions.",
        testCases: [
          {
            id: 1,
            input: [[1, 1, 2]],
            expected: [1, 2],
            description: "Deduplicates simple recurring integers",
          },
          {
            id: 2,
            input: [[0, 0, 1, 1, 1, 2, 2, 3, 4, 4]],
            expected: [0, 1, 2, 3, 4],
            description: "Collapses multiple duplicate groups elegantly",
          },
        ],
      },
      {
        id: "max-subarray-sum-bound",
        title: "Maximum Bounded Subarray",
        difficulty: "DSA Easy",
        conceptContext:
          "Sliding window tracking maintains a contiguous window [left, right] representing elements. As the right pointer expands, add numbers to a running sum. When the sum exceeds the limit, incrementally shrink the window from the left (shifting the left pointer) until the sum is again less than or equal to the limit.",
        description:
          "Identify the maximum continuous range within budget.\n\nWrite a function `maxSubarrayLen(nums, limit)` that takes an array of positive integers `nums` and a budget integer `limit`. It must return the length of the longest contiguous subarray whose sum of elements does not exceed the budget `limit`.",
        codeTemplate: `function maxSubarrayLen(nums, limit) {
  // Use a sliding window to track the longest contiguous slice of positive numbers summing <= limit
  
}`,
        functionName: "maxSubarrayLen",
        hints: [
          "Initialize running variables: left = 0, currentSum = 0, and maxLen = 0.",
          "Loop with right pointer from 0 to nums.length - 1, and add nums[right] to currentSum.",
          "While currentSum > limit, subtract nums[left] from currentSum and increment left.",
          "Update maxLen using Math.max(maxLen, right - left + 1) during each successful step.",
        ],
        explanation:
          "The sliding window technique avoids redundant checks, making operations O(N) instead of O(N^2).",
        testCases: [
          {
            id: 1,
            input: [[1, 2, 3, 4, 1], 6],
            expected: 3,
            description: "Selects length 3 for the sub-range [1, 2, 3]",
          },
          {
            id: 2,
            input: [[8, 2, 4, 1, 3, 5], 9],
            expected: 4,
            description: "Extracts length 4 for [2, 4, 1, 3]",
          },
        ],
      },
      {
        id: "min-subarray-len-target",
        title: "Minimal Target Sum Window",
        difficulty: "DSA Easy-Medium",
        conceptContext:
          "In this dynamic window variation, we expand right to find a valid window (sum >= target). Once valid, try to make it as small as possible by shifting the left pointer inwards while maintaining the valid condition (sum >= target). Maintain the minimum constraint size throughout the execution.",
        description:
          "Find the smallest possible contiguous range that matches or exceeds a value threshold.\n\nWrite a function `minSubArrayLen(target, nums)` that takes an array of positive integers `nums` and a target positive integer `target`. It must return the MINIMAL length of a contiguous subarray of which the sum is greater than or equal to `target`. If no such subarray exists under the constraints, return `0`.",
        codeTemplate: `function minSubArrayLen(target, nums) {
  // Shift left and right boundaries dynamically to pinpoint the smallest window summing >= target
  
}`,
        functionName: "minSubArrayLen",
        hints: [
          "Set left = 0, currentSum = 0, and minLen to infinity (or nums.length + 1).",
          "Expand the window with a right pointer, adding nums[right] to your currentSum.",
          "As long as currentSum >= target, calculate the window size (right - left + 1), update minLen with the minimum, subtract nums[left] from currentSum, and increment left.",
          "If minLen remains unchanged, return 0; otherwise, return minLen.",
        ],
        explanation:
          "Shrinking a valid window is a classical optimization pattern used in routing and budget-allocation calculations.",
        testCases: [
          {
            id: 1,
            input: [7, [2, 3, 1, 2, 4, 3]],
            expected: 2,
            description: "Finds minimum length 2 for sub-range [4, 3]",
          },
          {
            id: 2,
            input: [11, [1, 2, 3, 4, 5]],
            expected: 3,
            description:
              "Finds minimum length 3 for sub-range [3, 4, 5] (sum 12)",
          },
        ],
      },
      {
        id: "three-sum-sorted-target",
        title: "Symmetric Three-Sum Sweep",
        difficulty: "DSA Medium",
        conceptContext:
          "This exercise is the crown jewel of our multi-pointer system! Sort or iterate an array, freeze an element at index i, and then run the classical twoSumSorted bidirectional two-pointer logic on the sub-range [i + 1, nums.length - 1] looking for the remainder: target - nums[i]. This encapsulates the pattern of Exercise 1 within a progressive outer context.",
        description:
          "Find three numbers that sum exactly to a target value.\n\nWrite a function `threeSumSorted(nums, target)` that takes a sorted array of integers `nums` and a target integer `target`. It must locate three separate elements that add up exactly to `target`, and return them as a sorted 3-item array `[num1, num2, num3]`.\n\nAssume there is exactly one solution scenario for all tested outcomes, and that you must build directly upon the bidirectional outer-boundary sweep pattern you perfected in the first exercise.",
        codeTemplate: `function threeSumSorted(nums, target) {
  // Freeze the first element with an outer loop, then run bidirectional pointers on the remaining range
  
}`,
        functionName: "threeSumSorted",
        hints: [
          "Loop through nums using active pointer 'i' from 0 up to nums.length - 3.",
          "For each fixed nums[i], set targetSum = target - nums[i]. Then set left = i + 1, and right = nums.length - 1.",
          "Run a while (left < right) loop. If nums[left] + nums[right] matches targetSum, return [nums[i], nums[left], nums[right]].",
          "Adjust left and right pointers accordingly if the sum is less than or greater than targetSum.",
        ],
        explanation:
          "Nested pointer frameworks reduce complex three-nesting search solutions from O(N^3) to O(N^2) complexity with perfect memory economy.",
        testCases: [
          {
            id: 1,
            input: [[-4, -1, 1, 2, 8, 12], 9],
            expected: [-1, 2, 8],
            description:
              "Accurately extracts matching triplet [-1, 2, 8] (sum 9)",
          },
          {
            id: 2,
            input: [[-10, -5, 0, 5, 10, 15, 20], 30],
            expected: [0, 10, 20],
            description:
              "Deconstructs large range triplet successfully [0, 10, 20] (sum 30)",
          },
        ],
      },
    ],
  },
  {
    id: "spread-destructuring-unpack",
    title: "ES6 Rest, Spread & Unpacking",
    shortDescription:
      "Master variable extraction, parameters collection, default values fallback, and object combination keys.",
    longExplanation:
      "Modern JavaScript (ES6+) introduced the Spread operator (`...` to spread values out of arrays or objects) and Rest operator (`...` to assemble loose inputs into clean arrays), alongside structural Destructuring assignment to extract dictionary variables instantly.\n\n- **Destructure Obj**: `const { name, age = 18 } = user`\n- **Destructure Array**: `const [first, ...remainder] = numbers`\n- **Shallow Clone & Merge**: `const updated = { ...original, active: true }`",
    codeSnippet: `// Example: destructuring in function arguments
const details = { name: "Aria", score: 98, level: 4 };

function printScore({ name, score, rank = "Pro" }) {
  console.log(\`\${name} is \${rank} with \${score} pts\`);
}
printScore(details); // Aria is Pro with 98 pts`,
    exercises: [
      {
        id: "coords-extractor",
        title: "Fallback Coordinate Deconstructor",
        difficulty: "Warm-up",
        conceptContext:
          "Destructuring can unpack objects with fallback defaults if fields are missing: `const { x, y, z = 0 } = point`.",
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
        conceptContext:
          "Using object destructuring combined with the rest parameter `...rest` allows isolating single unwanted properties while compiling the rest into a clean dictionary: `const { password, ...safeUser } = user`.",
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
        conceptContext:
          "A function's formal arguments list can capture remaining loose parameters utilizing Rest notation: `function check(main, ...restOfArgs)` where `restOfArgs` automatically pools values as a standard array.",
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
        conceptContext:
          "Shallow spreads `{ ...a, ...b }` replaces complete sub-objects if keys clash. To preserve nested properties, spread nested child items individually: `{ ...a, sub: { ...a.sub, ...b.sub } }`.",
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
        conceptContext:
          "Nested array destructuring allows pulling values out inside a single assignment line: `const [[a, b], [c, d]] = grid`.",
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
    title: "OOP Classes & Prototypes",
    shortDescription:
      "Configure constructor classes, encapsulation getters, protective setter properties, inheritance subclasses, and local states stack engines.",
    longExplanation:
      "JavaScript uses prototype-based OOP underneath, but ES6 introduced the native `class` construct to formulate structured object blueprints. Using classes, constructors, methods, and encapsulation ensures state and behaviors are logically bundled.\n\n- **Create Class**: `class User { constructor(n) { this.name = n; } }`\n- **Inherit Parent**: `class Member extends User { constructor(n) { super(n); } }`",
    codeSnippet: `// Example: Standard Object Class structure
class CounterUnit {
  constructor(start = 0) {
    this.value = start;
  }
  tick() {
    this.value++;
    return this.value;
  }
}`,
    exercises: [
      {
        id: "oop-simple-book",
        title: "Class-Based Book Descriptor",
        difficulty: "Warm-up",
        conceptContext:
          "Classes are instantiated via constructors: `class Companion { constructor(title) { this.title = title; } }`. Calling `new Companion('A')` fires this routine.",
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
        conceptContext:
          "Getters and setters (`get balance()`, `set balance(val)`) catch property reads and edits dynamically, allowing you to intercept changes before writing fields.",
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
        conceptContext:
          "Immutability states that instead of modifying existing data structures, methods return shiny new class coordinates: `add(other) { return new Vector(this.x + other.x, ...) }`.",
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
        conceptContext:
          "Subclasses extend parent models via the `extends` keyword. Super constructors must be called first inside the child's constructor: `super(arg1, arg2)`.",
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
        conceptContext:
          "To find minimum stack elements in O(1) time without looping arrays, maintain a parallel auxiliary 'minimum tracking' stack alongside your standard values stack.",
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
    ],
  },
  {
    id: "es6-maps-collections",
    title: "ES6 Map Collections vs. Objects",
    shortDescription:
      "Master Key-Value pairing with native Map objects, preserving insertion order and enabling size lookups in O(1).",
    longExplanation:
      "Native ES6 `Map` collections solve limitations of standard objects when used as hash maps. In Objects, keys must be strings or symbols, and the prototype chain can lead to key collisions. An ES6 `Map` allows keys of any data type (including objects and functions), maintains insertion order of keys, and provides the size of the collection in an instant O(1) `.size` lookup.\n\n- **Map Methods**: `.set(key, val)`, `.get(key)`, `.has(key)`, `.delete(key)`, and `.clear()`.\n- **Performance Advantage**: More performant for frequent key-value additions and removals in DSA.",
    codeSnippet: `// Example: standard ES6 Map collection
const cache = new Map();
cache.set("userId_101", { name: "Aria" });
cache.set({ tempId: 1 }, "Active");

console.log(cache.size); // 2
console.log(cache.has("userId_101")); // true`,
    exercises: [
      {
        id: "map-frequency-counter",
        title: "Deduplicated Frequency Counter Map",
        difficulty: "DSA Easy",
        conceptContext:
          "Instead of standard objects, using `new Map()` allows storing count records safely. We check existence with `map.has(key)` and retrieve counts with `map.get(key)`.",
        description:
          "Let's build a clean item occurrences tally using Map collections! How it works In real-world data telemetry, counting high-speed sensor inputs or indexing client session requests requires highly optimized hash maps with minimal prototype pollution risk.\n\nWrite a function `frequencyMap(arr)` that loops through an array, computes the count of each item, and returns a native ES6 `Map` object mapping items to their frequencies.",
        codeTemplate: `function frequencyMap(arr) {
  // Use a native ES6 Map to build counts of elements
  
}`,
        functionName: "frequencyMap",
        hints: [
          "Initialize: const counts = new Map();",
          "For each element, check if map has it: const currentCount = counts.has(item) ? counts.get(item) : 0;",
          "Update the Map: counts.set(item, currentCount + 1);",
          "Return the Map instance.",
        ],
        explanation:
          "Native Maps bypass prototype key collisions, storing frequency profiles cleanly and safely in O(N).",
        testCases: [
          {
            id: 1,
            input: [["apple", "banana", "apple"]],
            expected: new Map([
              ["apple", 2],
              ["banana", 1],
            ]),
            description: "Tallies fruit strings frequency into a Map",
          },
        ],
      },
      {
        id: "map-isomorphic-strings",
        title: "Isomorphic String Pattern Matcher",
        difficulty: "DSA Easy",
        conceptContext:
          "Isomorphic strings s and t means each character in s maps uniquely to t and vice versa. Two separate Maps can maintain bidirectional character translations: `mapS.get(charS) === charT`.",
        description:
          "Verify design symmetry in patterns! How it works: In compiling dialects or validating URL pattern templates into server route mappings, bidirectional dictionary mappings assure consistency between distinct language tokens.\n\nWrite a function `isIsomorphic(s, t)` that checks if strings `s` and `t` are isomorphic by utilizing Map collections. Each unique character in `s` must map to exactly one character in `t` without collision, and vice versa.",
        codeTemplate: `function isIsomorphic(s, t) {
  // Use two Map collections to check bidirectional character mapping consistency
  
}`,
        functionName: "isIsomorphic",
        hints: [
          "If s.length !== t.length, return false immediately.",
          "Maintain two Maps: const mapST = new Map(); and const mapTS = new Map();.",
          "For char cS = s[i] and cT = t[i]: check if mapST has cS and mapST.get(cS) !== cT, or mapTS has cT and mapTS.get(cT) !== cS.",
          "If mismatched, return false. Otherwise path set them into their respective Maps, returning true on loop completion.",
        ],
        explanation:
          "Two-way map indexing prevents cross-mapping collisions, asserting isomorphic properties in O(N) runtime.",
        testCases: [
          {
            id: 1,
            input: ["egg", "add"],
            expected: true,
            description: "egg and add are isomorphic (e->a, g->d)",
          },
          {
            id: 2,
            input: ["foo", "bar"],
            expected: false,
            description: "foo and bar mismatch since o map to both a and r",
          },
        ],
      },
      {
        id: "map-longest-substring",
        title: "Longest Unique Substring",
        difficulty: "DSA Easy",
        conceptContext:
          "A sliding window algorithm can be optimized using a Map to store each character's most recent index. This allows the left pointer to jump directly without sliding one by one: `map.set(char, currentIndex)`.",
        description:
          "Write a function `longestUniqueSubstring(s)` that finds the length of the longest substring of characters without any repeating characters using a native Map.",
        codeTemplate: `function longestUniqueSubstring(s) {
  // Use sliding window with a Map to track character positions
  
}`,
        functionName: "longestUniqueSubstring",
        hints: [
          "Maintain maxLength = 0 and a start = 0 pointer.",
          "Keep a seenChars = new Map() which maps character -> its index.",
          "For each char at index i, if it's already in the Map and its index is >= start, update start = seenChars.get(char) + 1.",
          "Set seenChars.set(char, i) and calculate maxLength = Math.max(maxLength, i - start + 1).",
        ],
        explanation:
          "Saves characters with their exact indexes inside a Map to update the sliding glass boundaries instantly in O(N).",
        testCases: [
          {
            id: 1,
            input: ["abcabcbb"],
            expected: 3,
            description: 'Finds length 3 for the unique substring "abc"',
          },
          {
            id: 2,
            input: ["bbbbb"],
            expected: 1,
            description: "Finds length 1 for repeating single characters",
          },
          {
            id: 3,
            input: ["pwwkew"],
            expected: 3,
            description: "Handles sliding checks correctly",
          },
        ],
      },
      {
        id: "map-group-anagrams",
        title: "Categorized Group Anagrams",
        difficulty: "DSA Easy",
        conceptContext:
          "To group strings that have the same characters, sort the characters of each string to use as a signature key in a Map: `map.set(sortedKey, [group])`.",
        description:
          "Write a function `groupAnagrams(strs)` that groups an array of strings into sub-arrays of anagrams. An anagram is a word formed by rearranging the letters of another.",
        codeTemplate: `function groupAnagrams(strs) {
  // Map sorted letters signature key to groups listing
  
}`,
        functionName: "groupAnagrams",
        hints: [
          "Initialize an empty new Map().",
          "For each word, split its characters, sort them, and join them back to construct a key.",
          "Check if the map has the key; if not, set it to []. Then push the original word onto that group.",
          "Return Array.from(map.values()).",
        ],
        explanation:
          "Leverages a Map to bucket matching character sets in O(N * K log K) time.",
        testCases: [
          {
            id: 1,
            input: [["eat", "tea", "tan", "ate", "nat", "bat"]],
            expected: [["bat"], ["nat", "tan"], ["ate", "eat", "tea"]],
            description: "Matches grouped anagram combinations securely",
          },
        ],
      },
      {
        id: "map-subarray-sum",
        title: "Subarray Cumulative Target Sum",
        difficulty: "DSA Medium",
        conceptContext:
          "We can find continuous subarrays summing to k by tracking running prefix sums in a Map: `sumMap.set(currentPrefixSum, frequency)`.",
        description:
          "Write a function `subarraySumEqualsK(nums, k)` that counts the total number of continuous subarrays whose elements sum up exactly to a target value k using a prefix sum frequency Map.",
        codeTemplate: `function subarraySumEqualsK(nums, k) {
  // Track cumulative running sum counts with Map
  
}`,
        functionName: "subarraySumEqualsK",
        hints: [
          "Initialize count = 0 and runningSum = 0.",
          "Initialize new Map() and set 0 -> 1 to match sums that equal k directly.",
          "For each number, add it to runningSum. If map.has(runningSum - k), add its frequency to count.",
          "Update runningSum's frequency in the Map before continuing.",
        ],
        explanation:
          "Using cumulative prefix sums mapped to frequencies allows finding sub-sequences in O(N).",
        testCases: [
          {
            id: 1,
            input: [[1, 1, 1], 2],
            expected: 2,
            description: "Finds two subarrays summing to 2",
          },
          {
            id: 2,
            input: [[1, 2, 3], 3],
            expected: 2,
            description: "Finds two subarrays summing to 3",
          },
        ],
      },
    ],
  },
  {
    id: "recursion-call-stack",
    title: "Recursion & Call Stack Frames",
    shortDescription:
      "Master repetitive structures, recursion base cases, stack frame traces, and dynamic tree flattening.",
    longExplanation:
      "Recursion is a programming technique where a function calls itself to solve smaller sub-instances of a larger problem. Every recursive call creates a brand-new 'stack frame' inside Javascript's memory engine (the Call Stack) that stores local arguments. Without a reliable base case, recursion runs infinitely, leading to a Call Stack overflow (RangeError: Maximum call stack size exceeded).\n\n- **Core Ingredients**: A 'Base Case' (terminates the loop) and a 'Recursive Step' (moves progress closer to the base case).\n- **Real-World Uses**: Parsing filesystems directories, searching JSON trees, traversing HTML DOM subfolders (nodes).",
    codeSnippet: `// Example: standard recursive countdown
function countdown(n) {
  if (n <= 0) return; // Base Case
  console.log(n);
  countdown(n - 1); // Recursive Step
}`,
    exercises: [
      {
        id: "recursion-factorial",
        title: "Mathematical Factorial Calculator",
        difficulty: "Warm-up",
        conceptContext:
          "Factorial of n (denoted as n!) represents: `n * (n-1) * (n-2) * ... * 1`. The base case is when `n <= 1`, returning `1`.",
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
        conceptContext:
          "To flat arrays of unknown depth, loop across items. If an item is an array: recursively flat it, otherwise push it to output collection.",
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
        conceptContext:
          "The Fibonacci sequence starts with 0 and 1. Each succeeding number is the sum of the two preceding ones: `F(n) = F(n-1) + F(n-2)`.",
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
        id: "recursion-binary-search",
        title: "Recursive Binary Search Bounds",
        difficulty: "DSA Easy",
        conceptContext:
          "Binary search finds elements in sorted arrays by checking the midpoint. If target is smaller than mid, search left half; if larger, search right half.",
        description:
          "Write a recursive function `recursiveBinarySearch(arr, target, low = 0, high = arr.length - 1)` that returns the index of the target if found, or -1 if not found.",
        codeTemplate: `function recursiveBinarySearch(arr, target, low = 0, high = arr.length - 1) {
  // Base case: check out of bounds, select midpoint, recurse
  
}`,
        functionName: "recursiveBinarySearch",
        hints: [
          "Base case: if low > high return -1.",
          "Calculate mid-point: const mid = Math.floor((low + high) / 2).",
          "If arr[mid] === target return mid.",
          "If arr[mid] > target recurse on left boundary: return recursiveBinarySearch(arr, target, low, mid - 1).",
          "Otherwise, recurse on right boundary: return recursiveBinarySearch(arr, target, mid + 1, high).",
        ],
        explanation:
          "Asserts log(N) complex division checks using recursion bounds elegantly.",
        testCases: [
          {
            id: 1,
            input: [[1, 3, 5, 7, 9], 7],
            expected: 3,
            description: "Locates 7 at index 3",
          },
          {
            id: 2,
            input: [[1, 3, 5, 7, 9], 4],
            expected: -1,
            description: "Returns -1 when target is missing",
          },
        ],
      },
      {
        id: "recursion-generate-permutations",
        title: "Recursive Backtracking Permutations",
        difficulty: "DSA Medium",
        conceptContext:
          "Backtracking recursively builds choices from a state pool, then backtracks by undoing those choices to explore other branches.",
        description:
          "Write a recursive function `generatePermutations(str)` that receives a string with unique letters and returns an array of all possible character arrangements (permutations) in any order.",
        codeTemplate: `function generatePermutations(str) {
  // Recursively swap or pick characters to generate all permutations
  
}`,
        functionName: "generatePermutations",
        hints: [
          "Base case: if string length is 1 or less, return [str].",
          "Create an empty permutations = [] array.",
          "For each index i in the string, select character char = str[i].",
          "Get remaining string excluding char: const remaining = str.slice(0, i) + str.slice(i + 1).",
          "Recursively call generatePermutations(remaining) to get sub-permutations, and join char to each of them.",
        ],
        explanation:
          "Recursively branches and joins character permutations, illustrating full search backtracking.",
        testCases: [
          {
            id: 1,
            input: ["abc"],
            expected: ["abc", "acb", "bac", "bca", "cab", "cba"],
            description: "Finds all six permutations for abc",
          },
        ],
      },
    ],
  },
  {
    id: "linked-lists-trees",
    title: "Linked Lists & Binary Trees",
    shortDescription:
      "Construct, traverse, and inspect dynamic pointer-based structures like lists and node trees.",
    longExplanation:
      "Linked Lists and Binary Trees are fundamental dynamic pointer-type data structures. Instead of contiguous array memory slots, elements are represented as standalone Node objects composed of value properties and memory pointer variables linking to adjacent nodes. Traversal involves jumping along pointers, while search algorithms are solved using recursive pointer inspections.\n\n- **Singly Linked Node**: `{ val: value, next: Node | null }`.\n- **Binary Tree Node**: `{ val: value, left: Node | null, right: Node | null }`.",
    codeSnippet: `// Example: standard Singly Linked List Chain
const listHead = { val: 1, next: { val: 2, next: null } };

// Example: standard Binary Tree Node Grouping
const rootNode = { val: 10, left: { val: 5, left: null, right: null }, right: null };`,
    exercises: [
      {
        id: "list-reverse",
        title: "Reversing a Singly Linked List",
        difficulty: "DSA Easy",
        conceptContext:
          "To reverse a linked list, loop/traverse through nodes while re-orienting each node's next pointer to reference its previous sibling: `curr.next = prev`.",
        description:
          "Write a function `reverseList(head)` that takes the head of a singly linked list and reverses the next pointers, returning the new head of the reversed list.\n\nInput Node template:\n`{ val: any, next: Node | null }`",
        codeTemplate: `function reverseList(head) {
  // Re-link sibling node pointers backwards, returning the new list head pointer
  
}`,
        functionName: "reverseList",
        hints: [
          "Maintain three pointers: let prev = null, let curr = head, let next = null.",
          "Inside a while loop (while curr !== null), capture next: next = curr.next.",
          "Reverse pointer connection: curr.next = prev.",
          "Advance walkers: prev = curr; curr = next.",
          "Once completed, return prev as it now points to the new head node.",
        ],
        explanation:
          "Re-orients linked pointers iteratively in constant O(1) space complexity.",
        testCases: [
          {
            id: 1,
            input: [[1, 2, 3]],
            expected: [3, 2, 1],
            description: "Reverses a simple 3 node list accurately",
          },
          {
            id: 2,
            input: [[10]],
            expected: [10],
            description: "Handles single-node lists elegantly",
          },
        ],
      },
      {
        id: "list-has-cycle",
        title: "Floyd's Cycle Loop Detection",
        difficulty: "DSA Easy",
        conceptContext:
          "Floyd's Tortoise and Hare algorithm uses two pointers moving at different speeds (slow moves 1 node, fast moves 2 nodes). If a circular reference exists, the fast pointer will eventually meet the slow pointer.",
        description:
          "Given the head of a singly linked list, determine if the list contains a cyclic loop reference.\n\nWrite a function `hasCycle(head)` that returns `true` if a cycle exists, or `false` otherwise.",
        codeTemplate: `function hasCycle(head) {
  // Detect linked cycle loops using fast and slow paced pointers
  
}`,
        functionName: "hasCycle",
        hints: [
          "Check base conditions first: if (!head || !head.next) return false.",
          "Set: let slow = head; and let fast = head.next;.",
          "Loop: while (fast !== null && fast.next !== null).",
          "If slow === fast, return true.",
          "Advance walkers: slow = slow.next; fast = fast.next.next;",
          "If loop finishes, return false.",
        ],
        explanation:
          "Deploys dual fast-slow runners in O(N) time with O(1) auxiliary variables.",
        testCases: [
          {
            id: 1,
            input: [[1, 2, 3, 4], 2],
            expected: true,
            description: "Catches circular cycle loop pointing back to node 3",
          },
          {
            id: 2,
            input: [[1, 2], -1],
            expected: false,
            description: "Correctly accepts linear safe lists",
          },
        ],
      },
      {
        id: "tree-max-depth",
        title: "Maximum Depth of a Binary Tree",
        difficulty: "DSA Easy",
        conceptContext:
          "The maximum depth of a binary tree represents the number of nodes along the longest path from root to farthest leaf node. It equates to: `1 + Math.max(depth(left), depth(right))` recursively.",
        description:
          "Write a recursive function `maxDepth(root)` that takes the root of a binary tree and returns its maximum depth.\n\nInput Node template:\n`{ val: any, left: Node | null, right: Node | null }`",
        codeTemplate: `function maxDepth(root) {
  // Recursively calculate left and right depths, returning the tallest path offset
  
}`,
        functionName: "maxDepth",
        hints: [
          "Base Case: if root is null, return 0.",
          "Otherwise, recurse on child subtrees: let leftDepth = maxDepth(root.left);",
          "let rightDepth = maxDepth(root.right);",
          "Return 1 + Math.max(leftDepth, rightDepth);",
        ],
        explanation:
          "Calculates maximum height recursively utilizing standard stack frame branching.",
        testCases: [
          {
            id: 1,
            input: [
              {
                val: 3,
                left: { val: 9, left: null, right: null },
                right: {
                  val: 20,
                  left: { val: 15, left: null, right: null },
                  right: { val: 7, left: null, right: null },
                },
              },
            ],
            expected: 3,
            description: "Calculates depth 3 for balanced hierarchical tree",
          },
          {
            id: 2,
            input: [null],
            expected: 0,
            description: "Handles empty tree entries smoothly",
          },
        ],
      },
      {
        id: "tree-is-valid-bst",
        title: "Binary Search Tree Validator",
        difficulty: "DSA Easy",
        conceptContext:
          "A valid Binary Search Tree (BST) must satisfy: all left child node values must be strictly smaller than parent, and all right child values must be strictly larger than parent.",
        description:
          "Write a function `isValidBST(root, min = -Infinity, max = Infinity)` that recursively validates whether a binary tree fulfills BST sorting criteria.",
        codeTemplate: `function isValidBST(root, min = -Infinity, max = Infinity) {
  // Use recursion constraints checks to assert parent-child sorting ranges
  
}`,
        functionName: "isValidBST",
        hints: [
          "Base Case: if root is null, return true.",
          "Check sorting range boundaries: if root.val <= min || root.val >= max, return false.",
          "Recurse left: passing parent val as custom max range: isValidBST(root.left, min, root.val).",
          "Recurse right: passing parent val as custom min range: isValidBST(root.right, root.val, max).",
          "Return both: leftRecursive && rightRecursive.",
        ],
        explanation:
          "Ensures binary tree node values lie strictly within mathematical constraints in O(N).",
        testCases: [
          {
            id: 1,
            input: [
              {
                val: 5,
                left: { val: 1, left: null, right: null },
                right: { val: 8, left: null, right: null },
              },
            ],
            expected: true,
            description: "Validates consistent BST tree sorting sequences",
          },
          {
            id: 2,
            input: [
              {
                val: 5,
                left: { val: 1, left: null, right: null },
                right: { val: 3, left: null, right: null },
              },
            ],
            expected: false,
            description: "Detects invalid child sorting offsets",
          },
        ],
      },
      {
        id: "tree-lowest-common-ancestor",
        title: "Lowest Common Ancestor in BST",
        difficulty: "DSA Medium",
        conceptContext:
          "The Lowest Common Ancestor (LCA) in a BST is the lowest node that has both p and q as descendants. If both are smaller than root, LCA is in left branch; if both are larger, it is in right; otherwise, root is LCA.",
        description:
          "Write a function `lowestCommonAncestor(root, p, q)` that searches a BST to find and return the LCA node of two target nodes `p` and `q`.",
        codeTemplate: `function lowestCommonAncestor(root, p, q) {
  // Traverse the tree recursively to locate the intersection node
  
}`,
        functionName: "lowestCommonAncestor",
        hints: [
          "Verify base conditions: if (!root) return null.",
          "Compare target values with parent: if (p.val < root.val && q.val < root.val) return lowestCommonAncestor(root.left, p, q);",
          "If both values are larger: if (p.val > root.val && q.val > root.val) return lowestCommonAncestor(root.right, p, q);",
          "Otherwise, current root is the splitting intersection node: return root.",
        ],
        explanation:
          "Navigates BST search paths in O(H) time where H is tree height.",
        testCases: [
          {
            id: 1,
            input: [
              {
                val: 6,
                left: {
                  val: 2,
                  left: { val: 0, left: null, right: null },
                  right: { val: 4, left: null, right: null },
                },
                right: { val: 8, left: null, right: null },
              },
              2,
              8,
            ],
            expected: 6,
            description: "Identifies 6 as splitting ancestor",
          },
          {
            id: 2,
            input: [
              {
                val: 6,
                left: {
                  val: 2,
                  left: { val: 0, left: null, right: null },
                  right: { val: 4, left: null, right: null },
                },
                right: { val: 8, left: null, right: null },
              },
              2,
              4,
            ],
            expected: 2,
            description: "Identifies parent node 2 as ancestor for node 4",
          },
        ],
      },
    ],
  },
  {
    id: "stack-queue-dsa",
    title: "Stacks, Queues & Monotonic Flow",
    shortDescription:
      "Master Last-In-First-Out (LIFO) stacks, brace matching, directory paths simplification, monotonic trackers, and dynamic Reverse Polish calculators.",
    longExplanation:
      "Linear data structures with strict access constraints are powerful foundational utilities for memory management, nested evaluation scopes, and history tracking.\n\n- **Stack (LIFO)**: Elements enter and leave at the same end. Essential for recursion, brackets validation, and path travel.\n- **Queue (FIFO)**: Elements enter at the tail and leave at the head. Ideal for task throttling and broad graph sweeps.\n- **Monotonic Stack**: Maintain elements in sorted order to answer next-greater/smaller lookup queries in optimal O(N) time.",
    codeSnippet: `// Example: a simple array-backed LIFO stack
const stack = [];
stack.push("A"); // ["A"]
stack.push("B"); // ["A", "B"]
const value = stack.pop(); // returns "B", leaving ["A"]`,
    exercises: [
      {
        id: "stack-valid-parentheses",
        title: "Valid Parentheses Matcher",
        difficulty: "Warm-up",
        conceptContext:
          "Push opening symbols onto a stack. When encountering a closing symbol, pop from the stack and verify that the popped brace pattern matches perfectly. If there's a mismatch or the stack ends up empty prematurely, the string is invalid.",
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
        conceptContext:
          "Build raw string representations using a LIFO stack. Instead of complex coordinate slices, iterate over your characters: push standard items onto your stack, and pop items off the stack whenever encountering a backspace character '#' representing erasure.",
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
        conceptContext:
          "Split the path by '/' to inspect directory movements. Ignore empty or single-dot '.' entries as they represent the current directory. When encountering double-dots '..', pop the last directory off our stack (moving up one parent levels). For anything else, push it onto the stack as a nested folder.",
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
        conceptContext:
          "Maintain elements in a monotonic stack (sorted order). For each element, while the stack is not empty and the current element is greater than the element represented by the top of the stack, pop from the stack and map that popped element's next-greater value.",
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
        conceptContext:
          "In Reverse Polish Notation (RPN), operators follow their operands. Iterate tokens: if the token is an integer, push it to our stack. If the token is an operator (+, -, *, /), pop the second operand first (right), then the first operand (left). Apply math, and push results back to evaluate progressively.",
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
    title: "Basic Data Structure",
    shortDescription:
      "Master modern array methods, bracket notations, object destructuring, and ES6+ collection iterations in JavaScript.",
    longExplanation:
      "These exercises build elite collection management skills using modern JavaScript. You will master bracket lookups, in-place list operations (push, shift), non-destructive cloning with the spread operator (`...`), element presence checking using `.includes()` (the clean ES6 successor to `indexOf`), dynamic updates using computed property keys, object destructuring, and key-value scanning with `Object.entries()`.",
    codeSnippet: `// Example: ES6 Non-destructive update & Computed Properties
const updateField = (user, key, val) => ({
  ...user,
  preferences: { ...user.preferences, [key]: val }
});`,
    exercises: [
      {
        id: "ds-cart-queue",
        title: "Shopping Cart Queue Mutator",
        difficulty: "Warm-up",
        conceptContext:
          "In modern JavaScript, we write functions with robust defaults: `function manageCart(cart = [], ...)` (ES6 Default Parameters). To add or remove items, use in-place methods like `push()` (add to end), `unshift()` (add to start), `pop()` (remove from end), and `shift()` (remove from start).",
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
        conceptContext:
          "Sometimes we need to insert elements midpoint. Modify arrays in-place using `splice(index, deleteCount, ...newItems)`. To avoid side-effects elsewhere, copy the mutated output immediately into a brand new array utilizing the ES6 Spread Operator (`[...]`).",
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
        conceptContext:
          "Modern JavaScript champions elegant boolean checking over complex indexing equations. Instead of utilizing older patterns like `array.indexOf(item) !== -1`, we use the cleaner ES6 method `array.includes(item)` which returns a clean boolean.",
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
        conceptContext:
          "Object keys map properties. In ES6, we can update keys dynamically using Computed Property Names: `[targetKey]: newValue`. To check if property keys exist, use `.hasOwnProperty()` (or ES2022 `Object.hasOwn()`), and delete obsolete objects properties using the `delete` keyword.",
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
        conceptContext:
          "Instead of old-school `for...in` loops which run the risk of scanning prototype chain keys, modern JavaScript leverages `Object.entries(obj)` which returns an array of `[key, value]` pairs, allowing us to utilize array destructuring and functional iterators.",
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
    ],
  },
  {
    id: "basic-algorithm-scripting",
    title: "Basic Algorithm Scripting",
    shortDescription:
      "Solve standard frequency scans, word counters, and target checkers using declarative, functional ES6+ routines.",
    longExplanation:
      "This entry-level section explores modern procedural and declarative algorithm design in JavaScript. You will master string spreads, regex cleansing, frequency mapping with `.reduce()`, alphabetical and multi-variable descending sort recipes, and targeted array filtering. Practicing these patterns establishes the fluent intuition required for modern functional data pipelines.",
    codeSnippet: `// Example: Modern ES6 word frequency counts with reduce
const words = "apple banana apple".split(" ");
const freq = words.reduce((acc, word) => ({
  ...acc,
  [word]: (acc[word] || 0) + 1
}), {});`,
    exercises: [
      {
        id: "count-char-occurrence",
        title: "Character Speed Scanner",
        difficulty: "Warm-up",
        conceptContext:
          "In modern ES6+, we can avoid verbose for-loops by spreading a string into a character array `[...str]` and filtering it: `const matches = [...str].filter(char => ...)`.",
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
        conceptContext:
          "Instead of declaring an empty object variable and mutating it inside a manual loop, ES6+ advocates utilizing the `.reduce()` method to accumulate and build up our frequency map cleanly.",
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
        conceptContext:
          "Combine `Object.keys()` with the `.filter()` and `.sort()` array methods to easily chain object property filtering. Chaining these methods is an essential skill in contemporary JavaScript development.",
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
        conceptContext:
          "Declarative multi-criteria sorting is a primary pattern in modern web apps. We compare values descending (`freq[b] - freq[a]`) and gracefully default to an alphabetical compare (`a.localeCompare(b)`) inside a single arrow function comparator.",
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
        conceptContext:
          "Let's culminate this module by selecting from a list of predefined targets using ES6 array query methods. Use `.reduce()` to track the target with the highest occurrence count, defaulting to `null` if no targets are found in the string.",
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
    ],
  },
  {
    id: "intermediate-algorithm-scripting",
    title: "Intermediate Algorithm Scripting",
    shortDescription:
      "Progress through intermediate DSA problems covering interval scheduling, overlapping ranges, and timeline searches.",
    longExplanation:
      "This structural module coordinates multidimensional schedule structures through sorted range intervals `[start, end]`. Learn to group serial lists, merge temporal overlaps, insert calendar slots, and parse time boundaries dynamically.",
    codeSnippet: `// Example: standard interval sorting
const bounds = [[12, 16], [1, 5]];
bounds.sort((a, b) => a[0] - b[0]);
console.log(bounds); // [[1, 5], [[12, 16]]`,
    exercises: [
      {
        id: "find-continuous-ranges",
        title: "Continuous Integer Range Compactor",
        difficulty: "DSA Easy",
        conceptContext:
          "Coordinate adjacent indexes inside sorted systems. Compare adjacent cell variables: `nums[i] - nums[i-1] === 1`. Group continuous items into range brackets `[start, end]`.",
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
        conceptContext:
          "Building on the interval data structures. To merge coordinate spans, sort them by starting index: `intervals.sort((a, b) => a[0] - b[0])`. Loop intervals, checking if current start overlaps previous end: `currStart <= prevEnd`.",
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
        conceptContext:
          "Build upon your merging logic! To insert a single slot into pre-sorted intervals, either append it and run your full sorting/merging routine, or walk the array inserting it in O(N) linear time and merging overlapping ranges dynamically.",
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
        conceptContext:
          "Rather than merging ranges, let's find the intersecting areas between two datasets! Use a two-pointer approach, checking if `listA[i]` and `listB[j]` overlap (i.e. `start = Math.max(aStart, bStart)` and `end = Math.min(aEnd, bEnd)`). If `start <= end`, an intersection overlaps! Increment pointers based on who ends first.",
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
        conceptContext:
          "Outstanding progress! To find common free slots across several people, first flatten and merge everyone's busy intervals into a single timeline using `mergeOverlappingIntervals` logic. Then, scan the gaps in this merged checklist that occur within standard `workingHours`, retaining any slots that span at least `minDuration` units.",
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
    ],
  },
];
