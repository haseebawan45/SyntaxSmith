import { Course } from './index';

export const python: Course = {
  id: 'python',
  title: 'Python Programming',
  description: 'Learn Python programming from scratch. Master data structures, algorithms, and popular libraries.',
  language: 'python',
  level: 'Beginner',
  duration: '12 weeks',
  icon: '/icons/python.svg',
  prerequisites: [
    'Basic computer skills',
    'Understanding of basic programming concepts (recommended)',
  ],
  learningOutcomes: [
    'Write clean, efficient Python code',
    'Understand core language concepts and features',
    'Work with Python libraries and frameworks',
    'Build practical applications',
  ],
  modules: [
    {
      id: 'python-fundamentals',
      title: 'Python Fundamentals',
      description: 'Learn the core building blocks of Python programming',
      lessons: [
        {
          id: 'variables-data-types',
          title: 'Variables and Data Types',
          duration: '30 minutes',
          content: `
# Variables and Data Types in Python

Python is a dynamically typed language that uses variables to store data. Variables in Python are created through assignment statements.

## Variable Declaration

In Python, you don't need to declare variable types explicitly. The type is inferred from the assigned value:
- Just use the assignment operator \`=\`
- Names are case-sensitive
- Must start with a letter or underscore

## Core Data Types

Python has several fundamental data types:
1. **Numbers**: 
   - int (integers)
   - float (decimal numbers)
   - complex (complex numbers)
2. **Strings**: Text data (str)
3. **Boolean**: True/False values
4. **None**: Represents absence of value
5. **Lists**: Ordered, mutable sequences
6. **Tuples**: Ordered, immutable sequences
7. **Sets**: Unordered collections of unique items
8. **Dictionaries**: Key-value pairs

Understanding these types is fundamental to Python programming.
          `,
          codeExamples: [
            {
              id: 'variables-example',
              title: 'Working with Variables',
              code: `# Basic variable assignment
age = 25
name = "Alice"
is_student = True
height = 1.75

# Multiple assignment
x, y, z = 1, 2, 3

# Type checking
print(type(age))       # <class 'int'>
print(type(name))      # <class 'str'>
print(type(is_student))# <class 'bool'>
print(type(height))    # <class 'float'>`,
              explanation: 'Examples of variable assignment and type checking in Python.',
            },
            {
              id: 'data-structures',
              title: 'Basic Data Structures',
              code: `# Lists (mutable)
fruits = ["apple", "banana", "orange"]
fruits.append("grape")
print(fruits)  # ['apple', 'banana', 'orange', 'grape']

# Tuples (immutable)
coordinates = (10, 20)
# coordinates[0] = 30  # This would raise an error

# Sets (unique items)
numbers = {1, 2, 2, 3, 3, 4}
print(numbers)  # {1, 2, 3, 4}

# Dictionaries (key-value pairs)
person = {
    "name": "Bob",
    "age": 30,
    "city": "New York"
}
print(person["name"])  # Bob`,
              explanation: 'Working with Python\'s built-in data structures.',
            },
            {
              id: 'type-conversion',
              title: 'Type Conversion',
              code: `# String to number
number_str = "42"
number_int = int(number_str)
number_float = float(number_str)

# Number to string
age = 25
age_str = str(age)

# List conversions
numbers = [1, 2, 3, 4, 3, 2, 1]
# Convert to set to remove duplicates
unique_numbers = list(set(numbers))
print(unique_numbers)  # [1, 2, 3, 4]

# String to list
text = "Hello,World"
chars = list(text)
words = text.split(",")`,
              explanation: 'Converting between different data types in Python.',
            },
          ],
        },
      ],
      quizzes: [
        {
          id: 'python-vars-quiz-1',
          question: 'Which of the following is NOT a valid variable name in Python?',
          options: [
            '_variable',
            'Variable123',
            '123variable',
            'my_variable',
          ],
          correctAnswer: 2,
          explanation: 'Variable names in Python cannot start with a number.',
        },
        {
          id: 'python-vars-quiz-2',
          question: 'What is the output of: type([1, 2, 3]).__name__?',
          options: [
            'array',
            'list',
            'tuple',
            'sequence',
          ],
          correctAnswer: 1,
          explanation: 'In Python, the [1, 2, 3] syntax creates a list object.',
        },
      ],
      challenges: [
        {
          id: 'type-conversion-challenge',
          title: 'Type Conversion Master',
          description: 'Create a function that demonstrates your understanding of Python data types and type conversion.',
          starterCode: `def analyze_value(value):
    """
    Analyze the given value and return a dictionary containing:
    - type_name: the type of the value as a string
    - is_numeric: whether the value can be converted to a number
    - as_string: the value converted to a string
    - as_list: the value converted to a list (if possible)
    """
    # Your code here
    pass`,
          solution: `def analyze_value(value):
    result = {
        "type_name": type(value).__name__,
        "is_numeric": False,
        "as_string": str(value),
        "as_list": None
    }
    
    try:
        float(value)
        result["is_numeric"] = True
    except (ValueError, TypeError):
        pass
        
    try:
        result["as_list"] = list(value)
    except (TypeError):
        pass
        
    return result`,
          hints: [
            'Use type() to get the type object',
            'Handle exceptions for type conversions',
            'Some values cannot be converted to lists',
          ],
          testCases: [
            {
              input: '42',
              expectedOutput: '{"type_name": "str", "is_numeric": true, "as_string": "42", "as_list": ["4", "2"]}',
              explanation: 'Testing with a numeric string',
            },
            {
              input: '[1, 2, 3]',
              expectedOutput: '{"type_name": "list", "is_numeric": false, "as_string": "[1, 2, 3]", "as_list": [1, 2, 3]}',
              explanation: 'Testing with a list',
            },
            {
              input: 'True',
              expectedOutput: '{"type_name": "bool", "is_numeric": true, "as_string": "True", "as_list": null}',
              explanation: 'Testing with a boolean value',
            },
          ],
        },
      ],
    },
  ],
}; 