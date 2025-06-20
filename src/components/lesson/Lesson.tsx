import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import LessonSidebar from './LessonSidebar';
import LessonContent from './LessonContent';
import LessonNavigation from './LessonNavigation';

interface Module {
  id: number;
  title: string;
  lessons: LessonItem[];
}

interface LessonItem {
  id: number;
  title: string;
  isCompleted: boolean;
}

interface LessonData {
  id: number;
  title: string;
  courseTitle: string;
  duration: string;
  content: string;
  codeExercise?: {
    title: string;
    description: string;
    initialCode: string;
    solution: string;
  };
}

const Lesson: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [currentLesson, setCurrentLesson] = useState<LessonData | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [progress, setProgress] = useState<number>(0);

  // Mock data
  useEffect(() => {
    // Mock modules and lessons
    const mockModules: Module[] = [
      {
        id: 1,
        title: 'Getting Started',
        lessons: [
          { id: 1, title: 'Introduction to Web Development', isCompleted: true },
          { id: 2, title: 'Setting Up Your Environment', isCompleted: true },
          { id: 3, title: 'HTML Basics', isCompleted: false },
          { id: 4, title: 'Your First Web Page', isCompleted: false }
        ]
      },
      {
        id: 2,
        title: 'HTML Fundamentals',
        lessons: [
          { id: 5, title: 'HTML Document Structure', isCompleted: false },
          { id: 6, title: 'Text Elements and Typography', isCompleted: false },
          { id: 7, title: 'Links and Navigation', isCompleted: false },
          { id: 8, title: 'Images and Media', isCompleted: false }
        ]
      },
      {
        id: 3,
        title: 'CSS Basics',
        lessons: [
          { id: 9, title: 'Introduction to CSS', isCompleted: false },
          { id: 10, title: 'Selectors and Properties', isCompleted: false },
          { id: 11, title: 'The Box Model', isCompleted: false },
          { id: 12, title: 'Colors and Typography', isCompleted: false }
        ]
      }
    ];

    // Mock lesson content
    const mockLesson: LessonData = {
      id: parseInt(id || '1'),
      title: 'HTML Basics',
      courseTitle: 'Web Development Fundamentals',
      duration: '15 minutes',
      content: `
        <h2>Introduction to HTML</h2>
        <p>HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of a web page and consists of a series of elements that tell the browser how to display the content.</p>
        
        <h3>HTML Elements</h3>
        <p>HTML elements are represented by tags. Tags are enclosed in angle brackets like <code>&lt;tagname&gt;</code>. Most tags come in pairs like <code>&lt;p&gt;</code> and <code>&lt;/p&gt;</code>, where the first tag is the start tag and the second tag is the end tag.</p>
        
        <h3>Basic Structure</h3>
        <p>A simple HTML document looks like this:</p>
        
        <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
&lt;head&gt;
  &lt;title&gt;Page Title&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
  &lt;h1&gt;My First Heading&lt;/h1&gt;
  &lt;p&gt;My first paragraph.&lt;/p&gt;
&lt;/body&gt;
&lt;/html&gt;</code></pre>
        
        <p>Let's break down the structure:</p>
        <ul>
          <li><code>&lt;!DOCTYPE html&gt;</code>: Declaration that defines the document type</li>
          <li><code>&lt;html&gt;</code>: The root element of an HTML page</li>
          <li><code>&lt;head&gt;</code>: Contains meta-information about the document</li>
          <li><code>&lt;title&gt;</code>: Specifies a title for the document</li>
          <li><code>&lt;body&gt;</code>: Contains the visible page content</li>
          <li><code>&lt;h1&gt;</code>: Defines a large heading</li>
          <li><code>&lt;p&gt;</code>: Defines a paragraph</li>
        </ul>
      `,
      codeExercise: {
        title: 'Create Your First HTML Page',
        description: 'Create a simple HTML page with a heading and a paragraph.',
        initialCode: `<!DOCTYPE html>
<html>
<head>
  <title>My First Page</title>
</head>
<body>
  <!-- Add an h1 heading here -->
  
  <!-- Add a paragraph here -->
  
</body>
</html>`,
        solution: `<!DOCTYPE html>
<html>
<head>
  <title>My First Page</title>
</head>
<body>
  <h1>Welcome to My First Page</h1>
  <p>This is my first HTML paragraph.</p>
</body>
</html>`
      }
    };

    setModules(mockModules);
    setCurrentLesson(mockLesson);

    // Calculate progress
    const totalLessons = mockModules.reduce((acc, module) => acc + module.lessons.length, 0);
    const completedLessons = mockModules.reduce((acc, module) => {
      return acc + module.lessons.filter(lesson => lesson.isCompleted).length;
    }, 0);
    
    setProgress(Math.round((completedLessons / totalLessons) * 100));
  }, [id]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (!currentLesson) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="lesson-container">
      <LessonSidebar 
        modules={modules}
        currentLessonId={parseInt(id || '1')}
        progress={progress}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      <main className="lesson-main">
        <div className="lesson-header">
          <h1 className="lesson-title">{currentLesson.title}</h1>
          <div className="lesson-meta">
            <span>Course: {currentLesson.courseTitle}</span>
            <span>Duration: {currentLesson.duration}</span>
          </div>
        </div>
        
        <LessonContent 
          content={currentLesson.content}
          codeExercise={currentLesson.codeExercise}
        />
        
        <LessonNavigation 
          currentLessonId={parseInt(id || '1')}
          modules={modules}
        />
      </main>
      
      <button className="sidebar-toggle" onClick={toggleSidebar} aria-label="Toggle lesson sidebar">
        <svg viewBox="0 0 24 24">
          <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      </button>
    </div>
  );
};

export default Lesson; 