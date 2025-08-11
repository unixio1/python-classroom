
export default function Terminal(props: TerminalProps){
  return <div>
    <h2>Terminal</h2>
    <textarea 
      onChange={(e) => props.setEditorCode(e.target.value)}
    >
    </textarea>
    <button onClick={props.onRunCode}>Run code</button>
  </div>
}

interface TerminalProps{
  setEditorCode: CallableFunction
  onRunCode: CallableFunction
}
