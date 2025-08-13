import { useEffect, useState } from "react"
import Terminal from "./components/terminal/terminal"
import { loadPyodide, type PyodideAPI } from "pyodide";
import CodeStdout from "./components/codeStdout/codeStdout";
import CodeOutput from "./components/codeOutput/codeOutput";
import './styles/app.scss';
export default function App() {
  const [pyodide, setPyodide] = useState<PyodideAPI | undefined>();
  const [editorCode, setEditorCode] = useState('');
  const [codeLogs, setCodeLogs] = useState<string[]>([]);
  const [codeOutput, setCodeOutput] = useState();
  useEffect(() => {
     loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.28.1/full'
      }).then(pyodide => {
        pyodide.setStdout({
          batched: (msg) => {
            setCodeLogs(logs => [...logs, ">> "+msg]);
          }
        })
        setPyodide(pyodide)
      })
  }, []);
  const onRunCode = async () => {
    setCodeLogs([]);
    const output = await pyodide?.runPythonAsync(editorCode);
    setCodeOutput(output);
  };
  return (
    <div className="app-container">
      <Terminal setEditorCode={setEditorCode} onRunCode={onRunCode}/>
      <CodeStdout logs={codeLogs}></CodeStdout>
      <CodeOutput output={codeOutput}/>
    </div>
  )  
}
