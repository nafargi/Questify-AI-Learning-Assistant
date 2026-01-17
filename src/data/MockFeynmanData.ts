export interface FeynmanConcept {
    id: string;
    title: string;
    content: string; // Markdown supported
    analogyPrompt?: string;
    codeChallenge?: {
        initialCode: string;
        solutionPattern: string;
        hint: string;
    };
}

export const FEYNMAN_DATA = {
    topic: "JavaScript Closures",
    audienceLevels: [
        { level: 1, label: "12-year-old Student", persona: "curious and easily confused" },
        { level: 2, label: "Junior Developer", persona: "knows basic syntax but misses the 'why'" }
    ],
    concepts: [
        {
            id: "fundamentals",
            title: "1. The Fundamental Definition",
            content: `
### What is a Closure?
A closure is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment).

**The "Mental Model": The Backpack**
Imagine a function is like a hiker. When a function is created, it packs a "backpack".
*   **The Hiker:** The code inside the function.
*   **The Backpack:** All the variables that existed in the scope *where the function was born*.
*   **The Rule:** Wherever the hiker goes (even if passed to another file, or run 10 seconds later), they *always* carry that same backpack.
            `,
            analogyPrompt: "Explain this using a **Recipe**, a **Security Badge**, or a **Time Capsule**."
        },
        {
            id: "memory",
            title: "2. Memory & Garbage Collection",
            content: `
### Why doesn't the variable die?
In languages like C, local variables are destroyed when the function returns (popped off the stack). JavaScript is different.

**The Exception:**
If a returned function holds a reference to a variable, the Garbage Collector *cannot* eat it. It observes a "Closure" protecting that variable.
            `,
            codeChallenge: {
                initialCode: `function createCounter() {
  let count = 0;
  return function() {
    count++;
    console.log(count);
  }
}
const counter = createCounter();
// How do I prove 'count' is still alive?`,
                solutionPattern: "counter()",
                hint: "Call the function multiple times and observe the output."
            }
        },
        {
            id: "pitfalls",
            title: "3. Common Pitfalls (Loops)",
            content: `
### The Loop Problem
Before \`let\`, loops using \`var\` shared the same variable instance across all iterations.

\`\`\`javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Output: 3, 3, 3
\`\`\`
            `,
            codeChallenge: {
                initialCode: `for (var i = 0; i < 3; i++) {
  setTimeout(function() {
    console.log(i); // Fix this to print 0, 1, 2
  }, 100);
}`,
                solutionPattern: "IIFE",
                hint: "Wrap the inner body in an IIFE (Immediately Invoked Function Expression) to capture 'i'."
            }
        }
    ]
};
