import { useEffect, useState } from "react"
import Terminal from "./components/terminal/terminal"
import { loadPyodide, type PyodideAPI } from "pyodide";
import CodeStdout from "./components/codeStdout/codeStdout";
import CodeOutput from "./components/codeOutput/codeOutput";
import './styles/app.scss';

const errorRetrievalScript = `
import sys
str(sys.last_value)
`

const overrideStdinInput = `
from js import prompt
def input(p):
    return prompt(p)
__builtins__.input = input
`
export default function App() {
  const [pyodide, setPyodide] = useState<PyodideAPI | undefined>();
  const [editorCode, setEditorCode] = useState('');
  const [codeLogs, setCodeLogs] = useState<string[]>([]);
  const [codeOutput, setCodeOutput] = useState();
  const [codeErrors, setCodeErrors] = useState<string[]>([]);
  useEffect(() => {
     loadPyodide({
        indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.28.1/full'
      }).then(pyodide => {
        pyodide.setStdout({
          batched: (msg) => {
            setCodeLogs(logs => [...logs, ">> "+msg]);
          }
        })
        pyodide.setStderr({
          batched: (error) => {
            setCodeErrors(errors => [...errors, error]);
          }
        })
        pyodide.runPython(overrideStdinInput);
        setPyodide(pyodide)
      })
  }, []);
  const onRunCode = async () => {
    setCodeLogs([]);
    setCodeErrors([]);
    try{
      const output = await pyodide?.runPythonAsync(editorCode);
      setCodeOutput(output);
    }catch(error: any){
      const errorMessage = await pyodide?.runPythonAsync(errorRetrievalScript)
      setCodeErrors(errors => [...errors, errorMessage]);
    }    
  };
  return (
    <div className="app-container">
      <Terminal setEditorCode={setEditorCode} onRunCode={onRunCode}/>
      <CodeStdout logs={codeLogs} errors={codeErrors}></CodeStdout>
      <CodeOutput output={codeOutput}/>
    </div>
  )  
}
