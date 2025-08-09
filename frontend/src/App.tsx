import { useEffect, useState } from "react"
import Terminal from "./components/terminal"
import { loadPyodide, type PyodideAPI } from "pyodide";
export default function App() {
  const [pyodide, setPyodide] = useState<PyodideAPI | undefined>();
  const [editorCode, setEditorCode] = useState('');
  useEffect(() => {
     loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.28.1/full'
      }).then(pyodide => setPyodide(pyodide))
  }, []);
  const onRunCode = () => {
    pyodide?.runPython(editorCode)
  };
  return (
    <div>
      <Terminal setEditorCode={setEditorCode}/>
      <button onClick={onRunCode}>Run code</button>
    </div>
  )  
}
