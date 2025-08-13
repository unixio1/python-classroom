import styles from './codeStdout.module.scss';
export default function CodeStdout(props: CodeStdoutProps){
  return <div className={styles.output}>
  <code className={styles.title}>Logs</code><br/>
  {props.logs && (
    props.logs.map((log: string, _index: number) => (
      <><code>
        {log}
      </code><br/></>
    ))
  )}
  {props.errors && (
    props.errors.map((error: string, _index: number) => (
      <><code className={styles.error}>
        {error}
      </code><br/></>
    ))
  )}
  </div>
}

interface CodeStdoutProps{
  logs: string[]
  errors: string[]
}
