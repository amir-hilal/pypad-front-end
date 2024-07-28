import React, { useState } from 'react';
import { authLocal } from '../../services/AuthLocalService';
import { authRemote } from '../../services/AuthService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {  useNavigate } from "react-router-dom";
import { ClipLoader } from 'react-spinners';

function VerifyEmail() {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);

    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setCode(e.target.value);
    };

    const email = authLocal.getEmail();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (code.trim() === '') {
            setError('Code cannot be empty');
            toast.error('Enter the code you received')
        } else {
            console.log('verifying')
            setLoading(true);

            try {
                const response = await authRemote.emailVerification(email,code)
                authLocal.saveToken(response.data.token)
                navigate("/")
            } catch (error) {
                console.log(error);
            }finally {
                setLoading(false);
            };

            console.log('Verification code submitted:', code);
            setError('');
        }
    };

  return (
    <div className="verification-container">
            <div className="verification-box">
                <h2>Email Verification</h2>
                <p>Please enter the verification code sent to your email address.</p>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="verification-code">Verification Code</label>
                        <input
                            type="text"
                            id="verification-code"
                            value={code}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {error && <p className="error">{error}</p>}
                    <div className="input-group">
                    <button disabled={loading} className="wide-button">
                          {loading ? <ClipLoader size={17} color="#000000" /> : "Sign Up"}
                    </button>
                    </div>
                </form>
          </div>
      <ToastContainer />

        </div>
  )
}
export default VerifyEmail
