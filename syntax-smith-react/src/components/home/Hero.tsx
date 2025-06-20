import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Hero: React.FC = () => {
  // Code syntax highlighting and animation
  useEffect(() => {
    const highlightCode = () => {
      document.querySelectorAll('code').forEach(codeBlock => {
        // Simple syntax highlighting
        if (codeBlock.classList.contains('language-javascript')) {
          const text = codeBlock.textContent || '';
          
          // Replace with highlighted HTML
          codeBlock.innerHTML = text
            .replace(/(\/\/.*)/g, '<span class="comment">$1</span>')
            .replace(/\b(const|let|var|function|return|if|else|for|while|class)\b/g, '<span class="keyword">$1</span>')
            .replace(/\b([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\(/g, '<span class="function">$1</span>(')
            .replace(/(".*?"|'.*?'|`.*?`)/g, '<span class="string">$1</span>');
            
          // Add typing animation to the first code block
          const editorContent = document.querySelector('.editor-content');
          if (editorContent && editorContent.contains(codeBlock)) {
            setTimeout(() => {
              const lines = codeBlock.innerHTML.split('\n');
              if (lines.length > 2) {
                // Highlight a specific line for emphasis
                const randomLineIndex = Math.floor(Math.random() * (lines.length - 2)) + 1;
                const parts = codeBlock.innerHTML.split('\n');
                parts[randomLineIndex] = `<span class="highlight-animation">${parts[randomLineIndex]}</span>`;
                codeBlock.innerHTML = parts.join('\n');
              }
            }, 2000);
          }
        }
      });
    };

    highlightCode();
  }, []);

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">
            Learn to <span className="accent">code</span> with interactive lessons
          </h1>
          <p className="hero-subtitle">
            Master programming languages from HTML to Python with bite-sized, hands-on tutorials and challenges.
          </p>
          <div className="hero-cta">
            <Link to="/courses" className="btn btn-primary btn-lg">Start Learning</Link>
            <Link to="/playground" className="btn btn-outline btn-lg">Try Playground</Link>
          </div>
          
          <div className="language-tags">
            <span className="tag">HTML</span>
            <span className="tag">CSS</span>
            <span className="tag">JavaScript</span>
            <span className="tag">Python</span>
            <span className="tag">Java</span>
            <span className="tag">C++</span>
            <span className="tag">And more...</span>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="code-editor">
            <div className="editor-header">
              <div className="editor-dots">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <span className="filename">hello-world.js</span>
            </div>
            <div className="editor-content">
              <pre><code className="language-javascript">// Welcome to SyntaxSmith!
function learnToCode() {
  const languages = [
    "HTML", "CSS", "JavaScript",
    "Python", "Java", "C++"
  ];
  
  return languages.map(lang => 
    `Learn ${lang} today!`
  );
}

// Start your coding journey
learnToCode();</code></pre>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 