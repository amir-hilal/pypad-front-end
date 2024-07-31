import { useEffect, useRef, useState } from "react";
import { Editor } from "@monaco-editor/react";
import "../../assets/css/code-editor.css";
import { executeCode, getCode, storeCode, updateCode } from "../../services/CodeService";

const CodeEditor = ({ id }) => {
  console.log(id === undefined);

  const editorRef = useRef();
  const errorRef = useRef();

  const [value, setValue] = useState("");

  const [userCode, setUserCode] = useState(``);

  const [userLang, setUserLang] = useState("python");

  const [userTheme, setUserTheme] = useState("vs-dark");

  const [fontSize, setFontSize] = useState(20);

  const [userInput, setUserInput] = useState("");

  const [userOutput, setUserOutput] = useState("");

  const [loading, setLoading] = useState(false);

  const [fileName, setFileName] = useState("Untitled.py");

  const [showFileNameInput, setShowFileNameInput] = useState(false);

  useEffect(() => {
    if (id !== undefined) {
      const code = async () => {
        try {
          const data = await getCode(id);
          console.log(data);
          setUserCode(data.code);
          setFileName(data.filename);
          console.log(fileName);
          return data;
        } catch (error) {
          console.log(error.response.data.message);
          errorRef.current.innerHTML = error.response.data.message;
        }
      };
      code();
    }
  }, []);

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
  const saveCode = async () => {
    if (id !== undefined){
      try {
        const request = await updateCode(fileName,userCode,id)
        console.log(request);
      } catch (error) {
        console.log(error.response.data);
        errorRef.current.innerHTML = error.response.data.message;
      }
    }else{
      try {
        const request = await storeCode(fileName, userCode);
        console.log(request);
        errorRef.current.innerHTML = "";
      } catch (error) {
        console.log(error.response.data);
        errorRef.current.innerHTML = error.response.data.message;
      }
    }
  };

  //clear the output
  function clearOutput() {
    setUserOutput("");
  }

  return (
    <div className="main">
      <div className="left-container">
        <div className="file-name-input">
          <label
            htmlFor="file-name"
            onClick={() =>
              showFileNameInput
                ? setShowFileNameInput(false)
                : setShowFileNameInput(true)
            }
          >
            {showFileNameInput ? "File Name:" : fileName}
          </label>
          {showFileNameInput && (
            <input
              type="text"
              id="file-name"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
          )}
          <div className="error" ref={errorRef}></div>
        </div>

        <Editor
          height="calc(100vh - 50px)"
          width="100%"
          theme={userTheme}
          language={userLang}
          defaultLanguage="python"
          defaultValue={""}
          value={userCode}
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
