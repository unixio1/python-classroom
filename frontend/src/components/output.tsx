
export default function Output(props: OutputProps){
  return <>
    <code>
      {props.codeOutput}
    </code>
  </>
}

interface OutputProps{
  codeOutput: string
}
