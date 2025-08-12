import styles from './codeStdout.module.scss';
export default function CodeStdout(props: CodeStdoutProps){
  return <div className={styles.output}>
  <span>Logs</span><br/>
  {props.logs && (
    <code>{props.logs.join('\n')}</code>
  )}
  </div>
}

interface CodeStdoutProps{
  logs: string[]
}
