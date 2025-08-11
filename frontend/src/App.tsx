import { useEffect, useState } from "react"
import Terminal from "./components/terminal"
import { loadPyodide, type PyodideAPI } from "pyodide";
import CodeStdout from "./components/codeStdout";
export default function App() {
  const [pyodide, setPyodide] = useState<PyodideAPI | undefined>();
  const [editorCode, setEditorCode] = useState('');
  const [codeLogs, setCodeLogs] = useState<string[]>([]);
  useEffect(() => {
     loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.28.1/full'
      }).then(pyodide => {
        pyodide.setStdout({
          batched: (msg) => {
            setCodeLogs(logs => [...logs, msg]);
          }
        })
        setPyodide(pyodide)
      })
  }, []);
  const onRunCode = async () => {
    setCodeLogs([]);
    await pyodide?.runPythonAsync(editorCode);
  };
  return (
    <div>
      <Terminal setEditorCode={setEditorCode}/>
      <button onClick={onRunCode}>Run code</button>
      <CodeStdout logs={codeLogs}></CodeStdout>
    </div>
  )  
}
