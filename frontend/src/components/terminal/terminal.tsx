import styles from './terminal.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';

export default function Terminal(props: TerminalProps){
  const terminalRef = useRef<HTMLDivElement>(null);
  const [editorHtml, setEditorHtml] = useState('');
  const onRunCodeWrapper = () => {
    const code = document.getElementById('python-terminal')?.innerText;
    if (code){
      props.onRunCode(code);
    }
  }
  const onTerminalInput = () => {
    const editor = terminalRef.current;
    if (!editor){
      return;
    }
    const text = editor.innerText;
    const highlighted = highlightPythonCode(text);
    if (highlighted != editorHtml){
      setEditorHtml(highlighted);
    }
  }
  useEffect(() => {
    const editor = terminalRef.current;
    if (editor && editorHtml) {
      editor.innerHTML = editorHtml;
    }
  }, [editorHtml]);
  return <div className={styles.terminalWrapper}>
    <div className={styles.utilities}>
      <h2>Terminal</h2>
      <div className={styles.buttons}>
        <button onClick={(_e) => onRunCodeWrapper()} className={styles.run}>
          <FontAwesomeIcon icon={faPlay} />
        </button>
        </div>
      </div>
    <div
      ref={terminalRef}
      id="python-terminal"
      onInput={onTerminalInput}
      contentEditable={true}
      className={styles.terminalText}
    >
    </div>
  </div>
}

interface TerminalProps{
  onRunCode: CallableFunction
}

function highlightPythonCode(code: string) {
  const keywordRegex = new RegExp(
    `\\b(${Object.keys(pythonKeywordColors).join("|")})\\b`,
    "g"
  );

  return code.replace(keywordRegex, (match: string) => {
    const color = pythonKeywordColors[match];
    return `<span style="color:${color}">${match}</span>`;
  });
}

const pythonKeywordColors: { [key: string]: string } = {
  // Control flow
  "if": "#ff79c6",
  "else": "#ff79c6",
  "elif": "#ff79c6",
  "for": "#ff79c6",
  "while": "#ff79c6",
  "break": "#f1fa8c",
  "continue": "#f1fa8c",
  "pass": "#f1fa8c",

  // Functions and classes
  "def": "#8be9fd",
  "return": "#50fa7b",
  "lambda": "#8be9fd",
  "class": "#8be9fd",

  // Exception handling
  "try": "#ffb86c",
  "except": "#ffb86c",
  "finally": "#ffb86c",
  "raise": "#ffb86c",
  "assert": "#ffb86c",

  // Imports
  "import": "#bd93f9",
  "from": "#bd93f9",
  "as": "#bd93f9",

  // Context management
  "with": "#ff79c6",
  "yield": "#ff79c6",

  // Boolean and logic
  "True": "#bd93f9",
  "False": "#bd93f9",
  "None": "#bd93f9",
  "not": "#ff79c6",
  "and": "#ff79c6",
  "or": "#ff79c6",
  "in": "#ff79c6",
  "is": "#ff79c6",

  // Scope and namespace
  "global": "#f8f8f2",
  "nonlocal": "#f8f8f2",
  "del": "#f8f8f2",

  // Special
  "await": "#ff79c6",
  "async": "#ff79c6",
};
