import { useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import "../../assets/css/code-editor.css";
import { executeCode } from "../../services/CodeService";

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("python");

  const [userCode, setUserCode] = useState(``);

  const [userLang, setUserLang] = useState("python");

  const [userTheme, setUserTheme] = useState("vs-dark");

  const [fontSize, setFontSize] = useState(20);

  const [userInput, setUserInput] = useState("");

  const [userOutput, setUserOutput] = useState("");

  const [loading, setLoading] = useState(false);

  const [fileName, setFileName] = useState("Untitled.py");

  const [showFileNameInput, setShowFileNameInput] = useState(false);

  const options = {
    fontSize: fontSize,
  };

  async function compile() {
    const sourceCode = userCode;
    console.log(userInput);
    try {
      const { run: result } = await executeCode(sourceCode, userInput);
      setUserOutput(result.output);
    } catch (error) {
      console.log("error" + error);
    }
  }

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };
  const saveCode = ()=>{

  }

  //clear the output
  function clearOutput() {
    setUserOutput("");
  }

  return (
    <div className="main">
      <div className="left-container">
      <div className="file-name-input">
          <label htmlFor="file-name"
          onClick={() => showFileNameInput?setShowFileNameInput(false):setShowFileNameInput(true) }
          >{showFileNameInput ? "File Name:" : fileName}</label>
          {showFileNameInput && (
            <input
              type="text"
              id="file-name"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
          )}
        </div>
        <Editor
          options={options}
          height="calc(100vh - 50px)"
          width="100%"
          theme={userTheme}
          language={userLang}
          defaultLanguage="python"
          defaultValue={``}
          onChange={(value) => {
            setUserCode(value);
          }}
          onMount={onMount}
        />
        <div className="flex">
        <button className="save-btn" onClick={() => compile()}>
          Run
        </button>
        <button className="run-btn" onClick={() => saveCode()}>
          Save
        </button>
        </div>
      </div>
      <div className="right-container">
        <h4>Input:</h4>
        <div className="input-box">
          <textarea
            id="code-inp"
            onChange={(e) => setUserInput(e.target.value)}
          ></textarea>
        </div>
        <h4>Output:</h4>
        {loading ? (
          <div className="spinner-box"></div>
        ) : (
          <div className="output-box">
            <pre>{userOutput}</pre>

            <button
              onClick={() => {
                clearOutput();
              }}
              className="clear-btn"
            >
              Clear
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default CodeEditor;
