import { javascript } from './javascript';
import { python } from './python';
import { java } from './java';

export const curriculum = {
  javascript,
  python,
  java,
};

export type Language = keyof typeof curriculum;

export interface Course {
  id: string;
  title: string;
  description: string;
  language: Language;
  modules: Module[];
  prerequisites: string[];
  learningOutcomes: string[];
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  icon: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  quizzes: Quiz[];
  challenges: Challenge[];
}

export interface Lesson {
  id: string;
  title: string;
  content: string;
  codeExamples: CodeExample[];
  duration: string;
}

export interface CodeExample {
  id: string;
  title: string;
  code: string;
  explanation: string;
  output?: string;
}

export interface Quiz {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  starterCode: string;
  solution: string;
  hints: string[];
  testCases: TestCase[];
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  explanation: string;
} 