import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authRemote } from "../../services/AuthService";
import { authLocal } from "../../services/AuthLocalService";

function Login() {
    const navigate = useNavigate();

    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    // const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const errorRef = useRef();

    const loginHandler = async() => {

        try {
            
            const response = await authRemote.login(usernameOrEmail,password)
            console.log(response);
            if(response.status === 200){
                navigate("/")
            }
            authLocal.saveToken(response.authorisation.token)
            authLocal.saveEmail(response.data.user.email)
            authLocal.saveUsername(response.data.user.username)
        } catch (error) {
            console.log(error.response.data.message);
            errorRef.current.innerHTML = error.response.data.message
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
      <div className="error" ref={errorRef}>
        {/* <h3>I accept all terms & condition</h3> */}
      </div>
      <div className="input-box button">
        <input value="Login" type="button"
        onClick={loginHandler}
        />
      </div>
      <div className="text">
        <h3>Not a member? <Link to="/signup">Signup now</Link></h3>
      </div>
    </form>
  </div>
  )
}
export default Login