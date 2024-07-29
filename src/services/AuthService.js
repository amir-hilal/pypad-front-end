import axios from "axios"

export const authRemote = {
    regester: async (fname,lname,username,email,password,passwordConf) => {
        const {data} = await axios.post("http://127.0.0.1:8000/api/register",{
            username,
            first_name: fname,
            last_name: lname,
            email,
            password,
            password_confirmation: passwordConf
        });
        return data;
    },
    emailVerification: async (email,verification_code) => {
        const {data} = await axios.post("http://127.0.0.1:8000/api/verify-email",{
            email,
            verification_code,
        });
        return data;
    },
    login: async (usernameOrEmail,password) => {

        if (usernameOrEmail.includes("@")){
            const {data} = await axios.post("http://127.0.0.1:8000/api/login",{
                email:usernameOrEmail,
                password
            });
            console.log(data)
            return data;
        }else{
            console.log("username");
            const {data} = await axios.post("http://127.0.0.1:8000/api/login",{
                username:usernameOrEmail,
                password
            });
            console.log(data)
            return data;
        }
    }
}
