
export default function CodeStdout(props: CodeStdoutProps){
  return <>
  {props.logs && (
    <code>{props.logs.join('\n')}</code>
  )}
  </>
}

interface CodeStdoutProps{
  logs: string[]
}
