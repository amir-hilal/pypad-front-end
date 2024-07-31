import axiosInstance from "./axiosInstance";

export const executeCode = async (sourceCode, userInput) => {
  const response = await axiosInstance.post("https://emkc.org/api/v2/piston/execute", {
    language: "python",
    version: "3.10.0",
    files: [
      {
        content: sourceCode,
      },
    ],
    stdin: userInput
  });
  return response.data;
};

export const storeCode = async (fileName, userCode) => {
  const { data } = await axiosInstance.post("/codes", {
    filename: fileName,
    code: userCode
  });
  return data;
};

export const getCodeSuggestion = async (userCode) => {
  const response = await axiosInstance.post('https://openai-service.vercel.app/api/openai/chat', {
    message: `Suggest a code completion only in python for the following code(write only code, no english at all):\n\n${userCode}`,
  });
  return response.data;
};

export const updateCode = async (fileName, userCode, id) => {
  const { data } = await axiosInstance.put(`/codes/${id}`, {
    filename: fileName,
    code: userCode
  });
  return data;
};

export const getCode = async (id) => {
  const { data } = await axiosInstance.get(`/codes/${id}`);
  return data;
};

export const getAllCode = async () => {
  const { data } = await axiosInstance.get(`/codes/`);
  return data;
};

export const deleteCode = async (id) => {
  const { data } = await axiosInstance.delete(`/codes/${id}`);
  return data;
};