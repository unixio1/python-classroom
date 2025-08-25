import styles from './terminal.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import CodeMirror, {ReactCodeMirror} from '@uiw/react-codemirror'
import { python } from '@codemirror/lang-python';

export default function Terminal(props: TerminalProps){
  const terminalRef = useRef<ReactCodeMirror>(null);
  const [code, setCode] = useState('');
  const onRunCodeWrapper = () => {
    if (code){
      props.onRunCode(code);
    }
  }
  const handleCodeChanged = () => {
    const editorCode = terminalRef.current.view.state.doc.toString();
    setCode(editorCode);
  }

  return <div className={styles.terminalWrapper}>
    <div className={styles.utilities}>
      <h2>Terminal</h2>
      <div className={styles.buttons}>
        <button onClick={(_e) => onRunCodeWrapper()} className={styles.run}>
          <FontAwesomeIcon icon={faPlay} />
        </button>
        </div>
      </div>
      <CodeMirror
        ref={terminalRef}
        value={code}
        theme="dark"
        extensions={[python()]}
        className={styles.terminalText}
        onChange={handleCodeChanged}
      />
      {/*<div
      ref={terminalRef}
      id="python-terminal"
      onInput={onTerminalInput}
      contentEditable={true}
      className={styles.terminalText}
    >
    </div>*/}
  </div>
}

interface TerminalProps{
  onRunCode: CallableFunction
}

