import axios from "axios";
const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

export const executeCode = async (sourceCode,userInput) => {
  const response = await API.post("/execute", {
    language: "python",
    version: "3.10.0",
    files: [
      {
        content: sourceCode,
      },
    ],
    stdin: userInput
  },
  
);
  return response.data;
};
