import styles from './codeOutput.module.scss';
export default function CodeOutput(props: CodeOutputProps){
  return <div className={styles.output}> 
  <code className={styles.title}>Output</code><br/>
  {props.output && <code>
      {props.output}
    </code>
  }
  </div>
}

interface CodeOutputProps{
  output: string | undefined
}
