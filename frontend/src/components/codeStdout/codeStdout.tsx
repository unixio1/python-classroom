import styles from './codeStdout.module.scss';
export default function CodeStdout(props: CodeStdoutProps){
  return <div className={styles.output}>
  <span>Logs</span><br/>
  {props.logs && (
    props.logs.map((log: string, _index: number) => (
      <><code>
        {log}
      </code><br/></>
    ))
  )}
  </div>
}

interface CodeStdoutProps{
  logs: string[]
}
