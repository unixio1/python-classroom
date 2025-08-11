
export default function Terminal(props: TerminalProps){
  return <div>
    <h2>Terminal</h2>
    <textarea 
      onChange={(e) => props.setEditorCode(e.target.value)}
    >
    </textarea>
  </div>
}

interface TerminalProps{
  setEditorCode: CallableFunction
}
