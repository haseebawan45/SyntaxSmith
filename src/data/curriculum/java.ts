import { Course } from './index';

export const java: Course = {
  id: 'java',
  title: 'Java Programming',
  description: 'Learn Java programming from fundamentals to advanced concepts. Master object-oriented programming, data structures, and enterprise development.',
  language: 'java',
  level: 'Beginner',
  duration: '12 weeks',
  icon: '/icons/java.svg',
  prerequisites: [
    'Basic computer skills',
    'Understanding of basic programming concepts (recommended)',
  ],
  learningOutcomes: [
    'Write clean, efficient Java code',
    'Understand object-oriented programming principles',
    'Work with Java libraries and frameworks',
    'Build enterprise-grade applications',
  ],
  modules: [
    {
      id: 'java-fundamentals',
      title: 'Java Fundamentals',
      description: 'Learn the core building blocks of Java programming',
      lessons: [
        {
          id: 'variables-data-types',
          title: 'Variables and Data Types',
          duration: '30 minutes',
          content: `
# Variables and Data Types in Java

Java is a statically typed language, which means you must declare the type of each variable before using it. This helps catch errors at compile time rather than runtime.

## Variable Declaration

In Java, variables are declared with their type:
\`\`\`java
type variableName = value;
\`\`\`

Variables can be:
- Instance variables (non-static fields)
- Class variables (static fields)
- Local variables
- Parameters

## Core Data Types

Java has two categories of data types:

1. **Primitive Types**:
   - byte (8-bit integer)
   - short (16-bit integer)
   - int (32-bit integer)
   - long (64-bit integer)
   - float (32-bit floating-point)
   - double (64-bit floating-point)
   - boolean (true/false)
   - char (16-bit Unicode character)

2. **Reference Types**:
   - Objects
   - Arrays
   - Strings (special class type)
   - Classes
   - Interfaces

Understanding these types is crucial for Java development.
          `,
          codeExamples: [
            {
              id: 'primitive-types',
              title: 'Working with Primitive Types',
              code: `// Declaring primitive variables
int age = 25;
double height = 1.75;
boolean isStudent = true;
char grade = 'A';

// Arithmetic operations
int x = 10;
int y = 5;
int sum = x + y;      // 15
int product = x * y;  // 50
double division = (double)x / y;  // 2.0

// Type casting
int intValue = 42;
double doubleValue = intValue;    // Widening conversion
int narrowed = (int)doubleValue;  // Narrowing conversion`,
              explanation: 'Examples of working with primitive data types in Java.',
            },
            {
              id: 'reference-types',
              title: 'Working with Reference Types',
              code: `// String (special reference type)
String name = "Alice";
String greeting = "Hello, " + name;

// Arrays
int[] numbers = new int[5];
numbers[0] = 1;
numbers[1] = 2;

String[] fruits = {"apple", "banana", "orange"};

// Objects
class Person {
    String name;
    int age;
    
    Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
}

Person person = new Person("Bob", 30);`,
              explanation: 'Working with reference types like Strings, arrays, and objects.',
            },
            {
              id: 'type-conversion',
              title: 'Type Conversion and Wrapper Classes',
              code: `// Wrapper classes
Integer wrappedInt = Integer.valueOf(42);
Double wrappedDouble = Double.valueOf(3.14);

// String conversion
String numberStr = "123";
int parsedInt = Integer.parseInt(numberStr);
double parsedDouble = Double.parseDouble("3.14");

// Boxing and unboxing
Integer boxed = 42;    // Autoboxing
int unboxed = boxed;   // Auto-unboxing

// Type checking
System.out.println(boxed instanceof Integer);  // true
System.out.println(numberStr instanceof String);  // true`,
              explanation: 'Converting between different types and using wrapper classes.',
            },
          ],
        },
      ],
      quizzes: [
        {
          id: 'java-vars-quiz-1',
          question: 'Which of the following is NOT a primitive type in Java?',
          options: [
            'int',
            'String',
            'boolean',
            'char',
          ],
          correctAnswer: 1,
          explanation: 'String is a class in Java, not a primitive type.',
        },
        {
          id: 'java-vars-quiz-2',
          question: 'What happens when you assign an int to a double variable?',
          options: [
            'Compilation error',
            'Runtime error',
            'Automatic widening conversion',
            'Data loss',
          ],
          correctAnswer: 2,
          explanation: 'Java automatically performs widening conversion from int to double without data loss.',
        },
      ],
      challenges: [
        {
          id: 'type-conversion-challenge',
          title: 'Type Conversion Master',
          description: 'Create a class that demonstrates your understanding of Java data types and type conversion.',
          starterCode: `public class TypeConverter {
    /**
     * Analyze the given value and return information about it.
     * @param value The object to analyze
     * @return String containing type information and conversions
     */
    public static String analyzeValue(Object value) {
        // Add your code here
        // Return a string containing:
        // - The actual type of the value
        // - Whether it can be converted to a number
        // - String representation
        // - Primitive type (if applicable)
    }
}`,
          solution: `public class TypeConverter {
    public static String analyzeValue(Object value) {
        StringBuilder result = new StringBuilder();
        
        result.append("Type: ").append(value.getClass().getSimpleName()).append("\\n");
        
        boolean isNumeric = false;
        try {
            if (value instanceof String) {
                Double.parseDouble((String)value);
                isNumeric = true;
            } else if (value instanceof Number) {
                isNumeric = true;
            }
        } catch (NumberFormatException e) {
            // Not numeric
        }
        
        result.append("Is numeric: ").append(isNumeric).append("\\n");
        result.append("String value: ").append(String.valueOf(value)).append("\\n");
        
        if (value instanceof Number) {
            result.append("Primitive type: ").append(getPrimitiveType((Number)value));
        }
        
        return result.toString();
    }
    
    private static String getPrimitiveType(Number value) {
        if (value instanceof Integer) return "int";
        if (value instanceof Double) return "double";
        if (value instanceof Long) return "long";
        if (value instanceof Float) return "float";
        return "unknown";
    }
}`,
          hints: [
            'Use instanceof to check types',
            'Handle exceptions for numeric conversion',
            'Remember to check for null values',
          ],
          testCases: [
            {
              input: '42',
              expectedOutput: 'Type: String\nIs numeric: true\nString value: 42',
              explanation: 'Testing with a numeric string',
            },
            {
              input: 'new Integer(42)',
              expectedOutput: 'Type: Integer\nIs numeric: true\nString value: 42\nPrimitive type: int',
              explanation: 'Testing with an Integer object',
            },
            {
              input: '"Hello"',
              expectedOutput: 'Type: String\nIs numeric: false\nString value: Hello',
              explanation: 'Testing with a non-numeric string',
            },
          ],
        },
      ],
    },
  ],
}; 