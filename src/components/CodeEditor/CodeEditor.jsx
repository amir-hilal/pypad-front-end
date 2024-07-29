import { useRef, useState } from "react";
import { Box, HStack } from "@chakra-ui/react";
import { Editor } from "@monaco-editor/react";
import "../../assets/css/code-editor.css";
import { executeCode } from "../../services/CodeService";

const CodeEditor = () => {
  const editorRef = useRef();
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("javascript");

  // State variable to set users source code
  const [userCode, setUserCode] = useState(``);

  // State variable to set editors default language
  const [userLang, setUserLang] = useState("python");

  // State variable to set editors default theme
  const [userTheme, setUserTheme] = useState("vs-dark");

  // State variable to set editors default font size
  const [fontSize, setFontSize] = useState(20);

  // State variable to set users input
  const [userInput, setUserInput] = useState("");

  // State variable to set users output
  const [userOutput, setUserOutput] = useState("");

  // Loading state variable to show spinner
  // while fetching data
  const [loading, setLoading] = useState(false);

  const options = {
    fontSize: fontSize,
  };

  async function compile() {
    const sourceCode = userCode;
    console.log(sourceCode);
    try {
      const { run: result } = await executeCode(sourceCode);
      setUserOutput(result.output);
    } catch (error) {
      console.log("error" + error);
    }
  }

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  // Function to clear the output screen
  function clearOutput() {
    setUserOutput("");
  }

  return (
    <div className="main">
      <div className="left-container">
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
        <button className="run-btn" onClick={() => compile()}>
          Run
        </button>
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
