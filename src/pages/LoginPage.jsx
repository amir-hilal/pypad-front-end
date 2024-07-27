import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authRemote } from "../data_source/remote/auth_remote";

function LoginPage() {
    const navigate = useNavigate();

    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    // const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const loginHandler = async() => {

        try {
            
            const response = await authRemote.login(usernameOrEmail,password)
            console.log(response);
            if(response.status === 200){
                navigate("/")
            }
            console.log(response.status);
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className="wrapper">
    <h2>Login Form</h2>
    <form action="#">
      <div className="input-box">
        <input type="text" placeholder="Enter your username or email" required
        onChange={(e)=>{
            setUsernameOrEmail(e.target.value)
        }}
        />
      </div>
      
      <div className="input-box">
        <input type="password" placeholder="Password" required
        onChange={(e)=>{
            setPassword(e.target.value)
        }}
        />
      </div>
      <div className="error">
        {/* <h3>I accept all terms & condition</h3> */}
      </div>
      <div className="input-box button">
        <input value="Login" type="button"
        onClick={loginHandler}
        />
      </div>
      <div className="text">
        <h3>Not a member? <Link to="/">Signup now</Link></h3>
      </div>
    </form>
  </div>
  )
}
export default LoginPage