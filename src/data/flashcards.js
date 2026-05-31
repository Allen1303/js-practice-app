export const DEFAULT_FLASHCARDS = [
  {
    id: "fc_1",
    category: "Modern JS Basics",
    question:
      "What is the key difference between `let` and `const` in block scoping?",
    code: `let total = 0;
total = 10; // Allowed

const limit = 100;
limit = 200; // TypeError: Assignment to constant variable.`,
    answer:
      "Both `let` and `const` have block-level scope. However, `const` prevents re-assignment to the variable identifier itself. Note that properties of a constant object or elements of a constant array can still be mutated.",
    difficulty: "Easy",
  },
  {
    id: "fc_2",
    category: "Arrays & Iteration",
    question: "How does `.map()` differ from `.forEach()` in JavaScript?",
    code: `const numbers = [1, 2, 3];
const doubles = numbers.map(x => x * 2); // [2, 4, 6]
const each = numbers.forEach(x => console.log(x)); // undefined`,
    answer:
      "`.map()` is a pure function that returns a **new array** containing the results of calling the provided function on every element. `.forEach()` executes a function on each element but returns `undefined`, and is primarily used for side-effects.",
    difficulty: "Easy",
  },
  {
    id: "fc_3",
    category: "Arrays & Iteration",
    question: "What does the accumulator parameter do in `.reduce()`?",
    code: `const sum = [1, 2, 3].reduce((acc, curr) => {
  return acc + curr;
}, 0); // acc starts at 0, sum returns 6`,
    answer:
      "The accumulator gathers the return values from each callback iteration. It accumulates the single consolidated outcome. If no initial value is provided, the first array element is used as the initial accumulator value and iteration starts at index 1.",
    difficulty: "Core",
  },
  {
    id: "fc_4",
    category: "Modern JS Basics",
    question: "What is the temporal dead zone (TDZ) in ES6?",
    code: `console.log(myVar); // undefined (hoisted var)
console.log(myLet); // ReferenceError: Cannot access before initialization

let myLet = 10;`,
    answer:
      "The Temporal Dead Zone (TDZ) is the period between entering block scope and the actual variable declaration being evaluated. Inside the TDZ, accessing a variable declared with `let` or `const` triggers a `ReferenceError`.",
    difficulty: "Mastery",
  },
  {
    id: "fc_5",
    category: "Closures & Scope",
    question: "What is a Closure in JavaScript?",
    code: `function createCounter() {
  let count = 0;
  return () => ++count; // closures access 'count'
}
const count = createCounter();
count(); // 1
count(); // 2`,
    answer:
      "A closure is the combination of a function bundled together with references to its surrounding state (the lexical environment). Closures allow an inner function to access variables from an outer function scope even after the outer function has completed.",
    difficulty: "Mastery",
  },
  {
    id: "fc_6",
    category: "Functions & Execution",
    question:
      "What is the difference between Arrow Functions and standard functions regarding `this`?",
    code: `const user = {
  name: "Archer",
  greet: function() { console.log(this.name); }, // "Archer" 
  greetArrow: () => { console.log(this.name); }  // undefined (lexical scope)
};`,
    answer:
      "Arrow functions do **not** have their own `this` binding. Instead, they capture the `this` value of the enclosing lexical context. Standard functions define their own `this` dynamically depending on how the function is invoked.",
    difficulty: "Core",
  },
  {
    id: "fc_7",
    category: "Modern JS Basics",
    question:
      "What is Array and Object Destructuring, and what are default value assignments?",
    code: `const user = { name: "Archer" };
const { name, role = "User" } = user;
console.log(role); // "User" (fallback)

const coords = [10, 20];
const [x, y, z = 0] = coords; // z is 0`,
    answer:
      "Destructuring allows extraction of properties from objects or elements from arrays into distinct variables. Default values are assigned to variables if the corresponding destructured property is strictly `undefined`.",
    difficulty: "Easy",
  },
  {
    id: "fc_8",
    category: "Promises & Async",
    question: "What are the three core states of a JavaScript Promise?",
    code: `const p = new Promise((resolve, reject) => {
  // pending...
  if (success) resolve("done"); // resolved
  else reject("failed"); // rejected
});`,
    answer:
      "1. **Pending**: Initial state, neither fulfilled nor rejected.\\n2. **Fulfilled** (Resolved): The operation completed successfully.\\n3. **Rejected**: The operation failed with an error.",
    difficulty: "Easy",
  },
  {
    id: "fc_9",
    category: "Promises & Async",
    question:
      "What is the difference between `Promise.all` and `Promise.allSettled`?",
    code: `const promises = [Promise.resolve(1), Promise.reject("err")];

Promise.all(promises); // Rejects immediately with "err"
Promise.allSettled(promises); // Resolves when all promises settle`,
    answer:
      "`Promise.all()` rejects immediately if **any** passed promise rejects. `Promise.allSettled()` waits for all input promises to settle (either fulfill or reject) and returns an array of status descriptors.",
    difficulty: "Core",
  },
  {
    id: "fc_10",
    category: "Objects & Prototypes",
    question:
      "How does the optional chaining operator `?.` protect against runtime crashes?",
    code: `const db = { users: { active: null } };
// Crashes: db.users.active.name
// Safe: db.users.active?.name -> returns undefined`,
    answer:
      "The optional chaining operator `?.` short-circuits evaluation as soon as it encounters a `null` or `undefined` value, returning `undefined` immediately instead of throwing a TypeError.",
    difficulty: "Easy",
  },
  {
    id: "fc_11",
    category: "Modern JS Basics",
    question:
      "What does the Nullish Coalescing operator `??` do compared to logical OR `||`?",
    code: `const speed = 0;
const a = speed || 80;   // 80 (because 0 is falsy)
const b = speed ?? 80;  // 0 (because 0 is not nullish)`,
    answer:
      'The logical OR (`||`) operator falls back when the left operand is any falsy value (`0`, `""`, `false`, `null`, `undefined`). The nullish coalescing operator (`??`) falls back **only** if the left operand is strictly `null` or `undefined`.',
    difficulty: "Core",
  },
  {
    id: "fc_12",
    category: "Functions & Execution",
    question: "What is the difference between Null, Undefined, and Undeclared?",
    code: `let x; // undefined
let y = null; // null
console.log(z); // ReferenceError: z is not defined (undeclared)`,
    answer:
      "`undefined` means a variable has been declared but not assigned a value. `null` is an assignment value representing the intentional absence of an object. *Undeclared* variables are variables that have never been initialized in any accessible scope.",
    difficulty: "Core",
  },
];
