import axiosInstance from "./axiosInstance";

export const getAllUsers = async () => {
  const { data } = await axiosInstance.get("/admin/users");
  return data;
};

export const createUser = async (
  username,
  email,
  password,
  first_name,
  last_name
) => {
  const { data } = await axiosInstance.post("/admin/user", {
    first_name,
    last_name,
    username,
    email,
    password,
  });
  return data;
};
