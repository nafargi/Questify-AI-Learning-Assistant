export const DEEP_CONTENT = {
    title: "JavaScript Closures: The Complete Masterclass",
    metadata: {
        author: "Questify AI",
        difficulty: "Intermediate",
        estimatedTime: "45 mins",
        tags: ["JavaScript", "Memory", "Scopes"]
    },
    chapters: [
        {
            id: "chap-1",
            title: "1. The Lexical Scope Hypothesis",
            content: `
# 1. The Lexical Scope Hypothesis

Before we can understand closures, we must first understand **Scoping**. In JavaScript, scope is the set of rules that determines where and how a variable (identifier) can be looked up.

### The Two Types of Scope

1.  **Dynamic Scope**: Used in languages like Bash. The scope depends on *where the function was called*.
2.  **Lexical Scope**: Used in JavaScript. The scope depends on *where the function was author-time written*.

> **Key Concept:** "Lexical" comes from the same root as "lexicon". It means that the scope is defined by the physical location of the code in the source file.

### The Building Metaphor

Imagine your code is a building.
*   **Global Scope:** The ground floor lobby. Everyone can access it.
*   **Function Scope:** A private office on the 3rd floor.
    *   People inside the office can see out the window to the lobby (they can access global variables).
    *   People in the lobby *cannot* see into the private office (variables are private).

\`\`\`javascript
function outer() {
  const secret = "I am inside";
  function inner() {
    // Inner can "see" out to Outer
    console.log(secret); 
  }
}
\`\`\`
            `
        },
        {
            id: "chap-2",
            title: "2. The Closure Mechanism",
            content: `
# 2. The Closure Mechanism

A closure is not a special object you create. It is a **naturally occurring phenomenon** in JavaScript that happens when a function "remembers" its lexical scope even when the function is executed outside that lexical scope.

### The "Backpack" Analogy

When a function is defined, it gets a hidden property like a "backpack".
*   This backpack contains links to all the variables that were available to it at the moment of its birth.
*   Crucially, this backpack is **live**. It doesn't contain a *copy* of the variable value; it contains a *link* to the variable itself.

### A Classical Example

\`\`\`javascript
function createGreeter(name) {
  return function() {
    console.log("Hello, " + name);
  };
}

const greetJohn = createGreeter("John");
const greetJane = createGreeter("Jane");

greetJohn(); // "Hello, John"
greetJane(); // "Hello, Jane"
\`\`\`

**What happened here?**
1.  \`createGreeter("John")\` ran and finished. The \`name\` variable *should* be garbage collected.
2.  BUT, the returned function (assigned to \`greetJohn\`) has a closure over \`name\`.
3.  The Garbage Collector sees this link and decides: *"I cannot delete 'name' yet, greetJohn might need it."*

### Why "Closure"?
Because the function "closes over" the variables from its environment, bundling them into a coherent unit that can be passed around.
            `
        },
        {
            id: "chap-3",
            title: "3. Memory Management & Performance",
            content: `
# 3. Memory Lifecycle

Closures are powerful, but with great power comes great memory responsibility.

### The Heap Visualization

Variables are stored in the **Heap** (unstructured memory).
*   Normally, when a function stack frame pops off, its local variables in variables in the Heap become "unreachable".
*   The Garbage Collector (Mark-and-Sweep algorithm) constantly sweeps the Heap looking for unreachable data to free up RAM.

**The Leak:**
If you create a closure that accidentally holds onto a HUGE object (like a DOM element or a massive array), and you never use it, that memory is locked.

\`\`\`javascript
function heavyLift() {
  const hugeData = new Array(1000000).fill("X"); // 8MB of data
  
  return function smallJob() {
    console.log("I am small");
    // Even though I don't use hugeData, if I am inside the scope, 
    // some older engines might keep hugeData alive.
    // Modern V8 is smarter (Scope Analysis), but be careful!
  }
}
\`\`\`

> **Best Practice:** If a closure is long-lived (e.g., set as a global event listener), manually nullify large variables it closes over when done.
            `
        },
        {
            id: "chap-4",
            title: "4. The Module Pattern",
            content: `
# 4. Data Privacy & The Module Pattern

Before ES6 Classes introduced \`#private\` fields, Closures were the **only** way to achieve true data privacy in JavaScript.

### The Revealing Module Pattern

We can use an IIFE (Immediately Invoked Function Expression) that returns an object.

\`\`\`javascript
const BankAccount = (function() {
  let balance = 0; // PRIVATE. No one can touch this directly.

  function changeBalance(amt) {
    balance += amt;
  }

  return {
    deposit: function(amt) {
      changeBalance(amt);
      console.log("Deposited", amt);
    },
    withdraw: function(amt) {
      if (amt <= balance) {
        changeBalance(-amt);
        console.log("Withdrew", amt);
      } else {
        console.log("Insufficient funds");
      }
    },
    checkBalance: function() {
      return balance;
    }
  };
})();

BankAccount.deposit(100);
console.log(BankAccount.balance); // undefined! Protected!
\`\`\`

This pattern is the foundation of modern bundlers like Webpack (which wraps modules in functions) and libraries like jQuery.
            `
        },
        {
            id: "chap-5",
            title: "5. Asynchronous Closures (The Loop Dilemma)",
            content: `
# 5. Asynchronous Gotchas

The most famous JavaScript interview question involves loops and closures.

### The Problem

\`\`\`javascript
for (var i = 1; i <= 5; i++) {
  setTimeout(function() {
    console.log(i);
  }, i * 1000);
}
\`\`\`

**Expected:** 1, 2, 3, 4, 5
**Actual:** 6, 6, 6, 6, 6

### Why?
1.  \`var\` is function-scoped (or global here), not block-scoped.
2.  The loop runs 5 times instantly. \`i\` becomes 6.
3.  The \`setTimeout\` callbacks run 1 second later.
4.  They all look at the SAME variable \`i\`, which is now 6.

### The Fixes

**Fix 1: The IIFE (Classic)**
We create a new scope for every iteration.

\`\`\`javascript
for (var i = 1; i <= 5; i++) {
  (function(j) { // New scope, 'j' captures current 'i'
    setTimeout(() => console.log(j), j * 1000);
  })(i);
}
\`\`\`

**Fix 2: Let (Modern)**
\`let\` creates a new binding (new variable in memory) for every iteration of the loop block.

\`\`\`javascript
for (let i = 1; i <= 5; i++) {
  setTimeout(() => console.log(i), i * 1000); // Works perfectly
}
\`\`\`
            `
        },
        {
            id: "chap-6",
            title: "6. Functional Programming: Currying",
            content: `
# 6. Currying and Partial Application

Closures enable **Currying**: Transforming a function that takes multiple arguments into a sequence of functions that each take a single argument.

\`\`\`javascript
// Normal
function add(a, b) { return a + b; }

// Curried with Closure
function curriedAdd(a) {
  return function(b) {
    return a + b;
  }
}

const addFive = curriedAdd(5); // '5' is remembered in closure
console.log(addFive(10)); // 15
\`\`\`

### Practical Use Case: Event Handlers

\`\`\`javascript
const handleChange = (field) => (event) => {
  this.setState({ [field]: event.target.value });
}

<input onChange={handleChange('email')} />
<input onChange={handleChange('password')} />
\`\`\`

Here, \`handleChange('email')\` returns a function that acts as the actual event handler, but it "remembers" that it is supposed to update the 'email' field.
            `
        },
        {
            id: "chap-7",
            title: "7. Stale Closures in React",
            content: `
# 7. React Hooks & Stale Closures

In modern React, closures are everywhere. A "Stale Closure" happens when a `useEffect` or `useCallback` captures variables from an *old render* and never updates.

\`\`\`javascript
function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      console.log(count); // Always 0!
      // Why? The arrow function was created in the FIRST render 
      // where count was 0. It closes over that '0'.
    }, 1000);
    return () => clearInterval(timer);
  }, []); // Empty deps meant we never recreated the closure
}
\`\`\`

**The Fix:**
You must include \`count\` in the dependency array, OR use the functional update form \`setCount(c => c + 1)\`, which doesn't rely on the closure variable.
            `
        },
    {
        id: "chap-8",
        title: "8. Emulating Object-Oriented Programming",
        content: `
# 8. Closures vs Classes

Under the hood, before ES6 classes, JavaScript used prototype chains and closures to emulate OOP.

You can create "Class-like" factories completely without \`this\` using closures.

\`\`\`javascript
function createPerson(name) {
  let _name = name; // Private property
  
  return {
    getName() { return _name; },
    setName(newName) { 
        if(newName.length > 0) _name = newName; 
    }
  };
}
\`\`\`

**Pros of Closure Objects:**
*   True privacy.
*   No \`this\` confusion.
*   Safe to pass methods as callbacks.

**Cons:**
*   Memory usage: Each object has its own copy of the methods (unless optimizing), whereas Classes share methods on the prototype.
            `
        },
{
    id: "chap-9",
        title: "9. Summary & Mental Models",
            content: `
# 9. Summary for Mastery

If you remember nothing else, remember this:

1.  **Lexical Scope:** Scope is defined by author-time placement.
2.  **The Backpack:** Functions carry the scope they were born in.
3.  **Live Link:** They hold references, not values.
4.  **Preservation:** As long as the closure exists, the data is safe from Garbage Collection.

### Final Challenge
Can you explain why creating a function inside a loop is often flagged as a "Bad Practice" by linters? (Hint: Think about memory allocation and object creation).
            `
}
    ]
};
