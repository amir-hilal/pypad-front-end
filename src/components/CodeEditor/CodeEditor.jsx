import { useRef, useState,useEffect,useCallback } from "react";
import { Editor } from "@monaco-editor/react";
import "../../assets/css/code-editor.css";
import { executeCode, storeCode, getCodeSuggestion } from "../../services/CodeService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const CodeEditor = () => {
  const editorRef = useRef();
  const errorRef = useRef();

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
  const [suggestion, setSuggestion] = useState("");

  const options = {
    fontSize: fontSize,
  };

  async function compile() {
    const sourceCode = userCode;
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
    try {
      const request = await storeCode(fileName, userCode);
      toast.success("Code saved successfully!");
    } catch (error) {
      console.log(error.response.data);
      errorRef.current.innerHTML = error.response.data.errors.filename[0]
      toast.error("Failed to save code.");
    }
  };

  const fetchSuggestion = useCallback(
    async (code) => {
      try {
        const response = await getCodeSuggestion(code);
        setSuggestion(response.choices[0].message.content);
      } catch (error) {
        console.error('Error fetching suggestion:', error);
        toast.error("Failed to fetch code suggestion.");
      }
    },
    []
  );
  //clear the output
  function clearOutput() {
    setUserOutput("");
  }

  // Debounce function
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  // Debounced version of fetchSuggestion
  const debouncedFetchSuggestion = useCallback(debounce(fetchSuggestion, 1500), [fetchSuggestion]);

  useEffect(() => {
    if (userCode.trim()) {
      debouncedFetchSuggestion(userCode);
    }
  }, [userCode, debouncedFetchSuggestion]);


  return (
    <div className="main flex min-h-75">
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
          options={options}
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
        {suggestion && (
          <div className="suggestion-box text-light">
            <h4 className="ts-larger">Suggestion:</h4>
            <pre className="ts-larger">{suggestion}</pre>
          </div>
        )}
      </div>
      <div className="right-container">
        <h4>Input:</h4>
        <div className="input-box-code ts-larger">
          <textarea
            id="code-inp"
            onChange={(e) => setUserInput(e.target.value)}
          ></textarea>
        </div>
        <h4>Output:</h4>
        {loading ? (
          <div className="spinner-box"></div>
        ) : (
          <div className="output-box-code ts-larger">
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
      <ToastContainer />
    </div>
  );
};
export default CodeEditor;
