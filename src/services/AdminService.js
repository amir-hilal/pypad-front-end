import axios from "axios";
const token = localStorage.getItem("token");

export const getAllUsers = async () => {
  const { data } = await axios.get("http://127.0.0.1:8000/api/admin/users", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const createUser = async (username, email, password,first_name,last_name) => {
    const { data } = await axios.post("http://127.0.0.1:8000/api/admin/user", 
    {
        first_name,
        last_name,
        username,
        email,
        password
    },
    {
        headers: { Authorization: `Bearer ${token}` },
    }
);
    return data;
  };
  