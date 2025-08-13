import styles from './terminal.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

export default function Terminal(props: TerminalProps){
  return <div className={styles.terminalWrapper}>
    <div className={styles.utilities}>
      <h2>Terminal</h2>
      <div className={styles.buttons}>
        <button onClick={(_e) => props.onRunCode()} className={styles.run}>
          <FontAwesomeIcon icon={faPlay} />
        </button>
        </div>
      </div>
    <textarea
      className={styles.terminalText}
      onChange={(e) => props.setEditorCode(e.target.value)}
    >
    </textarea>
  </div>
}

interface TerminalProps{
  setEditorCode: CallableFunction
  onRunCode: CallableFunction
}
