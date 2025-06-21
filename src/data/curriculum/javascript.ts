import { Course } from './index';

export const javascript: Course = {
  id: 'javascript',
  title: 'Modern JavaScript',
  description: 'Master JavaScript from basics to advanced concepts. Learn ES6+, async programming, and modern best practices.',
  language: 'javascript',
  level: 'Beginner',
  duration: '12 weeks',
  icon: '/icons/javascript.svg',
  prerequisites: [
    'Basic computer skills',
    'Understanding of web browsers',
    'Familiarity with HTML/CSS (recommended)',
  ],
  learningOutcomes: [
    'Write clean, efficient JavaScript code',
    'Understand core language concepts and features',
    'Build interactive web applications',
    'Work with modern JavaScript tools and frameworks',
  ],
  modules: [
    {
      id: 'js-fundamentals',
      title: 'JavaScript Fundamentals',
      description: 'Learn the core building blocks of JavaScript programming',
      lessons: [
        {
          id: 'variables-data-types',
          title: 'Variables and Data Types',
          duration: '30 minutes',
          content: `
# Variables and Data Types in JavaScript

JavaScript is a dynamically typed language that uses variables to store data. Variables are like containers that hold different types of information your program needs to work with.

## Variable Declaration

In modern JavaScript, we have three ways to declare variables:
- \`let\`: For values that can change
- \`const\`: For values that won't change
- \`var\`: Older way (not recommended in modern code)

## Core Data Types

JavaScript has several fundamental data types:
1. **Numbers**: Both integers and decimals
2. **Strings**: Text data
3. **Booleans**: true/false values
4. **null**: Intentional absence of value
5. **undefined**: Unassigned value
6. **Objects**: Collections of related data
7. **Arrays**: Ordered lists of values
8. **Symbols**: Unique identifiers

Understanding these types and how to work with them is crucial for JavaScript development.
          `,
          codeExamples: [
            {
              id: 'variables-example',
              title: 'Declaring Variables',
              code: `// Using let for values that can change
let age = 25;
age = 26; // This is allowed

// Using const for values that won't change
const PI = 3.14159;
// PI = 3.14; // This would cause an error

// Working with different data types
let name = "Alice";    // String
let isStudent = true;  // Boolean
let grades = [85, 92, 78];  // Array
let person = {         // Object
  name: "Bob",
  age: 30
};`,
              explanation: 'Examples of variable declaration and different data types in JavaScript.',
            },
            {
              id: 'type-checking',
              title: 'Type Checking and Conversion',
              code: `// Checking types
console.log(typeof 42);        // "number"
console.log(typeof "Hello");   // "string"
console.log(typeof true);      // "boolean"
console.log(typeof [1,2,3]);   // "object"
console.log(Array.isArray([1,2,3])); // true

// Type conversion
let num = "42";
console.log(typeof num);        // "string"
num = Number(num);
console.log(typeof num);        // "number"`,
              explanation: 'How to check and convert between different data types in JavaScript.',
            },
            {
              id: 'common-operations',
              title: 'Common Operations with Data Types',
              code: `// String operations
let firstName = "John";
let lastName = "Doe";
let fullName = firstName + " " + lastName;
console.log(fullName);  // "John Doe"

// Number operations
let x = 10;
let y = 5;
console.log(x + y);    // 15
console.log(x * y);    // 50
console.log(x / y);    // 2

// Array operations
let fruits = ["apple", "banana"];
fruits.push("orange");
console.log(fruits);   // ["apple", "banana", "orange"]

// Object operations
let user = {
  name: "Alice",
  age: 25
};
user.location = "New York";
console.log(user);     // { name: "Alice", age: 25, location: "New York" }`,
              explanation: 'Common operations you can perform with different data types.',
            },
          ],
        },
        // Additional lessons will be added here
      ],
      quizzes: [
        {
          id: 'variables-quiz-1',
          question: 'Which keyword should you use to declare a variable that won\'t be reassigned?',
          options: [
            'let',
            'var',
            'const',
            'final',
          ],
          correctAnswer: 2,
          explanation: 'const is used for constants - variables that won\'t be reassigned after declaration.',
        },
        {
          id: 'variables-quiz-2',
          question: 'What is the output of: typeof [1, 2, 3]?',
          options: [
            '"array"',
            '"object"',
            '"list"',
            'undefined',
          ],
          correctAnswer: 1,
          explanation: 'Arrays are a type of object in JavaScript, so typeof returns "object" for arrays.',
        },
      ],
      challenges: [
        {
          id: 'data-types-challenge',
          title: 'Data Type Master',
          description: 'Create a function that demonstrates your understanding of JavaScript data types and type conversion.',
          starterCode: `function analyzeValue(value) {
  // Add your code here
  // Return an object with the following properties:
  // - type: the type of the value
  // - isArray: whether the value is an array
  // - asString: the value converted to a string
  // - asNumber: the value converted to a number (or NaN if not possible)
}`,
          solution: `function analyzeValue(value) {
  return {
    type: typeof value,
    isArray: Array.isArray(value),
    asString: String(value),
    asNumber: Number(value)
  };
}`,
          hints: [
            'Use typeof to get the basic type',
            'Array.isArray() checks if a value is an array',
            'String() and Number() are used for type conversion',
          ],
          testCases: [
            {
              input: '42',
              expectedOutput: '{"type":"number","isArray":false,"asString":"42","asNumber":42}',
              explanation: 'Testing with a number value',
            },
            {
              input: '"Hello"',
              expectedOutput: '{"type":"string","isArray":false,"asString":"Hello","asNumber":NaN}',
              explanation: 'Testing with a string value',
            },
            {
              input: '[1,2,3]',
              expectedOutput: '{"type":"object","isArray":true,"asString":"1,2,3","asNumber":NaN}',
              explanation: 'Testing with an array value',
            },
          ],
        },
      ],
    },
    // Additional modules will be added here
  ],
}; 