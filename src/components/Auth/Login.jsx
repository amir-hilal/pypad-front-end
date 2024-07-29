import React, { useEffect,useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from 'react-spinners';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authRemote } from "../../services/AuthService";
import { login } from "../../slices/authSlices";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [usernameOrEmail, setUsernameOrEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);


    const errorRef = useRef();

    useEffect(() => {
      const storedEmail = localStorage.getItem("email");
      if (storedEmail) {
        setUsernameOrEmail(storedEmail);
      }
    }, []);

  const loginHandler = async () => {
    setLoading(true);

    try {

      const response = await authRemote.login(usernameOrEmail, password)
      if (response.status === 200) {
        dispatch(login({ token: response.authorisation.token, user: response.data.user }));
        localStorage.setItem("token",response.authorisation.token)
        navigate("/")
        toast.success("Logged in successfully!");
      }
    } catch (error) {
      console.log(error.response.data.message);
      // errorRef.current.innerHTML = error.response.data.message;
      toast.error("Login failed. Please check your credentials.");

    } finally {
      setLoading(false);
    };
  };

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
        <button type="button" onClick={loginHandler} disabled={loading} className="wide-button">
            {loading ? <ClipLoader size={17} color="#000000" /> : "Login"}
        </button>
      </div>
      <div className="text">
        <h3>Not a member? <Link to="/signup">Signup now</Link></h3>
      </div>
      </form>
      <ToastContainer />

  </div>
  )
}
export default Login
