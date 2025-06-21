import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { curriculum } from '../../data/curriculum';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeEditorProps {
  code: string;
  language: string;
  onCodeChange?: (code: string) => void;
  readOnly?: boolean;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ code, language, onCodeChange, readOnly = false }) => {
  return (
    <div className="code-editor">
      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          borderRadius: 'var(--radius-md)',
          padding: 'var(--space-md)',
        }}
      >
        {code}
      </SyntaxHighlighter>
      {!readOnly && (
        <button className="btn btn-primary run-btn">
          Run Code
        </button>
      )}
    </div>
  );
};

const Lesson: React.FC = () => {
  const { courseId, lessonId } = useParams<{ courseId: string; lessonId: string }>();
  const [activeTab, setActiveTab] = useState<'lesson' | 'challenge'>('lesson');
  const [userCode, setUserCode] = useState<string>('');

  // Find the course and lesson
  const course = Object.values(curriculum).find(c => c.id === courseId);
  const module = course?.modules.find(m => m.lessons.some(l => l.id === lessonId));
  const lesson = module?.lessons.find(l => l.id === lessonId);
  const challenge = module?.challenges[0]; // For now, just show the first challenge

  if (!course || !module || !lesson) {
    return (
      <div className="container">
        <div className="error-message">
          <h2>Lesson not found</h2>
          <p>The requested lesson could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="lesson-page">
      <div className="lesson-header">
        <div className="container">
          <h1>{lesson.title}</h1>
          <div className="lesson-meta">
            <span className="duration">
              <i className="far fa-clock"></i> {lesson.duration}
            </span>
            <span className="module">
              <i className="far fa-folder"></i> {module.title}
            </span>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="lesson-tabs">
          <button
            className={`tab-btn ${activeTab === 'lesson' ? 'active' : ''}`}
            onClick={() => setActiveTab('lesson')}
          >
            Lesson Content
          </button>
          <button
            className={`tab-btn ${activeTab === 'challenge' ? 'active' : ''}`}
            onClick={() => setActiveTab('challenge')}
          >
            Challenge
          </button>
        </div>

        <div className="lesson-content">
          {activeTab === 'lesson' ? (
            <>
              <div className="lesson-theory">
                <ReactMarkdown>{lesson.content}</ReactMarkdown>
              </div>

              <div className="code-examples">
                <h2>Code Examples</h2>
                {lesson.codeExamples.map((example) => (
                  <div key={example.id} className="code-example">
                    <h3>{example.title}</h3>
                    <CodeEditor
                      code={example.code}
                      language={course.language}
                      readOnly
                    />
                    <p className="example-explanation">{example.explanation}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="challenge-section">
              <h2>{challenge.title}</h2>
              <p className="challenge-description">{challenge.description}</p>

              <div className="challenge-workspace">
                <CodeEditor
                  code={userCode || challenge.starterCode}
                  language={course.language}
                  onCodeChange={setUserCode}
                />
              </div>

              <div className="challenge-hints">
                <h3>Hints</h3>
                <ul>
                  {challenge.hints.map((hint, index) => (
                    <li key={index}>{hint}</li>
                  ))}
                </ul>
              </div>

              <div className="test-cases">
                <h3>Test Cases</h3>
                {challenge.testCases.map((testCase, index) => (
                  <div key={index} className="test-case">
                    <div className="test-case-header">
                      <span className="test-number">Test {index + 1}</span>
                      <span className="test-status pending">Pending</span>
                    </div>
                    <div className="test-details">
                      <p><strong>Input:</strong> {testCase.input}</p>
                      <p><strong>Expected Output:</strong> {testCase.expectedOutput}</p>
                      <p className="test-explanation">{testCase.explanation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lesson; 