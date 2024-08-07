import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../../assets/css/styles.css";
import { authRemote } from "../../services/AuthService";
import { ClipLoader } from 'react-spinners';

function Register() {

    const errorRef = useRef();

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);

    const [f_nameFlag, setF_nameFlag] = useState(false);
    const [l_nameFlag, setL_nameFlag] = useState(false);
    const [usernameFlag, setUsernameFlag] = useState(false);
    const [emailFlag, setEmailFlag] = useState(false);
    const [passwordFlag, setPasswordFlag] = useState(false);
    const [passwordConfFlag, setPasswordConfFlag] = useState(false);


    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConf, setPasswordConf] = useState("");


    const validateEmail= () =>{
        if(email.trim() !== "" && email.includes("@"))
            setEmailFlag(true)
        else
            setEmailFlag(false)
    }

    const validatePassword = () => {
        if (password.trim() !== "" && password.length >= 6)
            setPasswordFlag(true)
        else
            setPasswordFlag(false)
    }

    const validatePasswordConf = () => {
        if (passwordConf.trim() !== "" && passwordConf === password)
            setPasswordConfFlag(true)
        else
            setPasswordConfFlag(false)
    }

    const validateFirstName = () => {
        if (fname.trim() !== "")
            setF_nameFlag(true)
        else
            setF_nameFlag(false)
    }

    const validateLastName = () => {
        if (lname.trim() !== "")
            setL_nameFlag(true)
        else
            setL_nameFlag(false)
    }

    const validateUsername = () => {
        if (username.trim() !== "")
            setUsernameFlag(true)
        else
            setUsernameFlag(false)
    }

    useEffect(()=>{
        validateFirstName()
    },[fname])

    useEffect(()=>{
        validateLastName()
    },[lname])

    useEffect(()=>{
        validatePassword()
    },[password])

    useEffect(()=>{
        validatePasswordConf()
    },[passwordConf])

    useEffect(()=>{
        validateUsername()
    },[username])

    useEffect(()=>{
        validateEmail()
    },[email])


    const loginHandler = async () => {
        setLoading(true);

        try {
            console.log(fname,lname,username,email,password,passwordConf)
            if (passwordConfFlag && passwordFlag && usernameFlag && l_nameFlag && f_nameFlag && emailFlag) {
                const data = await authRemote.regester(fname, lname, username, email, password, passwordConf)
                console.log(data);
                if (data.status = 201) {
                    localStorage.setItem("email",email)
                    navigate("/verify")
                }
            } else {
                toast.error("All Fields are required")
            }
        } catch (error) {
            toast.error(error.response.data.email ? error.response.data.email[0] : error.response.data.username[0]);
            errorRef.current.innerHTML = error.response.data.email ? error.response.data.email[0] : error.response.data.username[0];
        }finally {
            setLoading(false);
          };

    }



  return (
    <div className="wrapper">
    <h2>Registration</h2>
    <form action="#">
      <div className="input-box">
        <input type="text" placeholder="Enter your first name" required
        onChange={(e)=>{
            setFname(e.target.value)
        }}/>
      </div>
      <div className="input-box">
        <input type="text" placeholder="Enter your last name" required
        onChange={(e)=>{
            setLname(e.target.value)
        }}
        />
      </div>
      <div className="input-box">
        <input type="text" placeholder="Enter your username" required
        onChange={(e)=>{
            setUsername(e.target.value)
        }}
        />
      </div>
      <div className="input-box">
        <input type="email" placeholder="Enter your email" required
        onChange={(e)=>{
            setEmail(e.target.value);
        }}/>
      </div>
      <div className="input-box">
        <input type="password" placeholder="Create password" required
        onChange={(e)=>{
            setPassword(e.target.value)
        }}
        />
      </div>
      <div className="input-box">
      <input type="password" placeholder="Confirm password" required
        onChange={(e)=>{
            setPasswordConf(e.target.value)
        }}
        />
      </div>
      <div className="error" ref={errorRef}>
        {/* <h3>I accept all terms & condition</h3> */}
      </div>
      <div className="input-box button">
      <button type="button" onClick={loginHandler} disabled={loading} className="wide-button">
            {loading ? <ClipLoader size={17} color="#000000" /> : "Sign Up"}
        </button>
      </div>
      <div className="text">
        <h3>Already have an account? <Link to="/login">Login now</Link></h3>
      </div>
          </form>
      <ToastContainer />

  </div>
  )
}
export default Register
