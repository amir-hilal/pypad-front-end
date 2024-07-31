import axios from "axios";


export const executeCode = async (sourceCode,userInput) => {
  const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
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
const token = localStorage.getItem('token');
export const storeCode = async(fileName,userCode) => {
  const {data} = await axios.post("http://127.0.0.1:8000/api/codes",
    {
      "filename":fileName,
      "code":userCode
    },
    {
    headers: {Authorization : `Bearer ${token}`},
  })
  return data;
}

export const getCodeSuggestion = async (userCode) => {
  const response = await axios.post('http://localhost:4000/api/openai/chat', {
    message: `Suggest a code completion only in python for the following code(write only code, no english at all):\n\n${userCode}`,
  });
  return response.data;
};
