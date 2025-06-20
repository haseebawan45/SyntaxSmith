import React, { useState } from 'react';

const Playground: React.FC = () => {
  const [code, setCode] = useState<string>(`// Write your code here
function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet("Coder"));`);
  const [output, setOutput] = useState<string>('');
  const [language, setLanguage] = useState<string>('javascript');

  const runCode = () => {
    try {
      // For JavaScript code, we can use Function constructor to evaluate it
      // In a real app, this would be handled more securely on a server
      if (language === 'javascript') {
        const originalConsoleLog = console.log;
        let outputValue = '';
        
        // Override console.log to capture output
        console.log = (...args) => {
          outputValue += args.join(' ') + '\n';
          originalConsoleLog(...args);
        };
        
        // Execute the code
        const executeCode = new Function(code);
        executeCode();
        
        // Restore console.log
        console.log = originalConsoleLog;
        
        setOutput(outputValue || 'Code executed successfully with no output');
      } else {
        setOutput(`Running ${language} code is not supported in this demo.`);
      }
    } catch (error) {
      if (error instanceof Error) {
        setOutput(`Error: ${error.message}`);
      } else {
        setOutput('An unknown error occurred');
      }
    }
  };

  return (
    <div className="playground-container">
      <div className="page-header">
        <div className="container">
          <h1>Code Playground</h1>
          <p>Test your code in real-time with our interactive playground.</p>
        </div>
      </div>
      
      <div className="container" style={{ padding: '2rem 0' }}>
        <div className="playground-controls" style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="language-selector">
            <label htmlFor="language-select">Language: </label>
            <select 
              id="language-select" 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
              style={{ padding: '0.5rem', borderRadius: 'var(--radius-md)', marginLeft: '0.5rem' }}
            >
              <option value="javascript">JavaScript</option>
              <option value="html" disabled>HTML (Coming Soon)</option>
              <option value="css" disabled>CSS (Coming Soon)</option>
              <option value="python" disabled>Python (Coming Soon)</option>
            </select>
          </div>
          
          <button 
            className="btn btn-primary" 
            onClick={runCode}
            style={{ marginLeft: 'auto' }}
          >
            Run Code
          </button>
        </div>
        
        <div className="playground-editor" style={{ display: 'grid', gridTemplateColumns: '1fr', gridGap: '1rem' }}>
          <div className="code-editor-wrapper">
            <div className="editor-toolbar">
              <span>Code Editor</span>
            </div>
            <textarea 
              className="editor-textarea"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              style={{ 
                width: '100%', 
                minHeight: '300px',
                padding: '1rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
                lineHeight: '1.5',
                backgroundColor: 'var(--color-code-background)',
                color: 'var(--color-code-text)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                resize: 'vertical'
              }}
            ></textarea>
          </div>
          
          <div className="output-panel">
            <div className="editor-toolbar">
              <span>Output</span>
            </div>
            <div 
              className="output-content"
              style={{ 
                minHeight: '150px',
                padding: '1rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
                lineHeight: '1.5',
                backgroundColor: 'var(--color-code-background)',
                color: 'var(--color-code-text)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                whiteSpace: 'pre-wrap'
              }}
            >
              {output || 'Run your code to see the output here'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playground; 