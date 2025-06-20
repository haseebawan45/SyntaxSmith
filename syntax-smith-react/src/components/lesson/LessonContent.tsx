import React, { useState } from 'react';

interface CodeExercise {
  title: string;
  description: string;
  initialCode: string;
  solution: string;
}

interface LessonContentProps {
  content: string;
  codeExercise?: CodeExercise;
}

const LessonContent: React.FC<LessonContentProps> = ({ content, codeExercise }) => {
  const [code, setCode] = useState<string>(codeExercise?.initialCode || '');
  const [result, setResult] = useState<string>('');
  const [showSolution, setShowSolution] = useState<boolean>(false);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  const runCode = () => {
    // In a real app, this would run the code or validate it
    // For this demo, we'll just show a simple result
    setResult('Your code has been executed successfully!');
  };

  const resetCode = () => {
    setCode(codeExercise?.initialCode || '');
    setResult('');
  };

  const toggleSolution = () => {
    setShowSolution(!showSolution);
    if (!showSolution && codeExercise) {
      setCode(codeExercise.solution);
    } else if (codeExercise) {
      setCode(codeExercise.initialCode);
    }
  };

  return (
    <div className="lesson-content">
      {/* Render lesson content from HTML */}
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
      
      {/* Code Exercise */}
      {codeExercise && (
        <div className="interactive-exercise">
          <div className="exercise-header">
            <h3 className="exercise-title">{codeExercise.title}</h3>
          </div>
          
          <div className="exercise-content">
            <p>{codeExercise.description}</p>
          </div>
          
          <div className="code-editor-wrapper">
            <div className="editor-toolbar">
              <span>HTML Editor</span>
              <div className="editor-actions">
                <button className="btn btn-outline" onClick={runCode}>Run Code</button>
                <button className="btn btn-outline" onClick={resetCode}>Reset</button>
                <button className="btn btn-outline" onClick={toggleSolution}>
                  {showSolution ? 'Hide Solution' : 'Show Solution'}
                </button>
              </div>
            </div>
            <textarea 
              className="editor-textarea"
              value={code}
              onChange={handleCodeChange}
              spellCheck="false"
            ></textarea>
          </div>
          
          {result && (
            <div className="exercise-result">
              <div className="result-header">
                <span>Result</span>
              </div>
              <div className="result-content">
                {result}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LessonContent; 