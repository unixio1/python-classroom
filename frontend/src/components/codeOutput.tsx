
export default function CodeOutput(props: CodeOutputProps){
  return <> 
  {props.output && <code>
      {props.output}
    </code>
  }
  </>
}

interface CodeOutputProps{
  output: string | undefined
}
