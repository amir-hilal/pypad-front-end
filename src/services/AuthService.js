import axiosInstance from './axiosInstance';

export const authRemote = {
    register: async (fname, lname, username, email, password, passwordConf) => {
        const { data } = await axiosInstance.post("/register", {
            username,
            first_name: fname,
            last_name: lname,
            email,
            password,
            password_confirmation: passwordConf
        });
        return data;
    },
    emailVerification: async (email, verification_code) => {
        const { data } = await axiosInstance.post("/verify-email", {
            email,
            verification_code,
        });
        return data;
    },
    login: async (usernameOrEmail, password) => {
        const endpoint = "/login";
        const payload = usernameOrEmail.includes("@")
            ? { email: usernameOrEmail, password }
            : { username: usernameOrEmail, password };

        const { data } = await axiosInstance.post(endpoint, payload);
        return data;
    }
};
