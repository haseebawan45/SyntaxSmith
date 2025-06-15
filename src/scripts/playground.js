// Monaco Editor Configuration
require.config({
    paths: {
        'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.36.1/min/vs'
    }
});

let editor;
const outputPanel = document.getElementById('output-panel');
const languageSelect = document.getElementById('language-select');
const runButton = document.getElementById('run-code');
const clearButton = document.getElementById('clear-output');
const saveButton = document.getElementById('save-code');
const shareButton = document.getElementById('share-code');

// Initialize Monaco Editor
require(['vs/editor/editor.main'], function() {
    editor = monaco.editor.create(document.getElementById('code-editor'), {
        value: '// Welcome to SyntaxSmith Playground!\n// Start coding here...\n\n',
        language: 'javascript',
        theme: document.body.getAttribute('data-theme') === 'dark' ? 'vs-dark' : 'vs',
        automaticLayout: true,
        minimap: {
            enabled: false
        },
        fontSize: 14,
        fontFamily: 'JetBrains Mono',
        lineNumbers: 'on',
        roundedSelection: false,
        scrollBeyondLastLine: false,
        readOnly: false,
        cursorStyle: 'line',
        tabSize: 2,
        wordWrap: 'on'
    });

    // Handle language changes
    languageSelect.addEventListener('change', (e) => {
        monaco.editor.setModelLanguage(editor.getModel(), e.target.value);
        updateEditorPlaceholder(e.target.value);
    });

    // Handle theme changes
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.attributeName === 'data-theme') {
                const theme = document.body.getAttribute('data-theme') === 'dark' ? 'vs-dark' : 'vs';
                monaco.editor.setTheme(theme);
            }
        });
    });

    observer.observe(document.body, {
        attributes: true,
        attributeFilter: ['data-theme']
    });
});

// Language-specific placeholder code
function updateEditorPlaceholder(language) {
    const placeholders = {
        javascript: `// Welcome to SyntaxSmith Playground!
console.log("Hello, World!");

function greet(name) {
  return \`Hello, \${name}!\`;
}`,
        python: `# Welcome to SyntaxSmith Playground!
print("Hello, World!")

def greet(name):
    return f"Hello, {name}!"`,
        html: `<!-- Welcome to SyntaxSmith Playground! -->
<!DOCTYPE html>
<html>
<head>
    <title>My Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
</body>
</html>`,
        css: `/* Welcome to SyntaxSmith Playground! */
body {
    font-family: sans-serif;
    margin: 0;
    padding: 20px;
}

h1 {
    color: #4361ee;
}`,
        java: `// Welcome to SyntaxSmith Playground!
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
        cpp: `// Welcome to SyntaxSmith Playground!
#include <iostream>

int main() {
    std::cout << "Hello, World!" << std::endl;
    return 0;
}`
    };

    if (placeholders[language]) {
        editor.setValue(placeholders[language]);
    }
}

// Run code
runButton.addEventListener('click', () => {
    const code = editor.getValue();
    const language = languageSelect.value;
    
    // Clear previous output
    clearOutput();
    
    try {
        if (language === 'javascript') {
            // Create a new Function to run the code in a sandbox
            const sandboxedCode = new Function('console', `
                const log = (...args) => {
                    console.log(...args);
                };
                const error = (...args) => {
                    console.error(...args);
                };
                const warn = (...args) => {
                    console.warn(...args);
                };
                ${code}
            `);
            
            // Custom console implementation
            const customConsole = {
                log: (...args) => appendOutput(args.join(' '), 'info'),
                error: (...args) => appendOutput(args.join(' '), 'error'),
                warn: (...args) => appendOutput(args.join(' '), 'warning')
            };
            
            sandboxedCode(customConsole);
        } else {
            appendOutput(`Running ${language} code is not supported in this demo.`, 'info');
            appendOutput('Full language support coming soon!', 'info');
        }
    } catch (error) {
        appendOutput(error.toString(), 'error');
    }
});

// Output handling
function appendOutput(message, type = 'info') {
    const output = document.createElement('div');
    output.className = `output-${type}`;
    output.textContent = message;
    outputPanel.appendChild(output);
    outputPanel.scrollTop = outputPanel.scrollHeight;
}

function clearOutput() {
    outputPanel.innerHTML = '';
}

// Clear output button
clearButton.addEventListener('click', clearOutput);

// Save code
saveButton.addEventListener('click', () => {
    const code = editor.getValue();
    const language = languageSelect.value;
    const filename = `code.${getFileExtension(language)}`;
    
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    
    URL.revokeObjectURL(url);
});

// Share code
shareButton.addEventListener('click', async () => {
    const code = editor.getValue();
    
    try {
        await navigator.clipboard.writeText(code);
        appendOutput('Code copied to clipboard!', 'success');
    } catch (error) {
        appendOutput('Failed to copy code to clipboard.', 'error');
    }
});

// Helper functions
function getFileExtension(language) {
    const extensions = {
        javascript: 'js',
        python: 'py',
        html: 'html',
        css: 'css',
        java: 'java',
        cpp: 'cpp'
    };
    return extensions[language] || 'txt';
}

// Handle window resize
window.addEventListener('resize', () => {
    if (editor) {
        editor.layout();
    }
}); 