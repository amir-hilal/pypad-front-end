import React, { useState } from 'react';
import { authLocal } from '../../services/AuthLocalService';
import { authRemote } from '../../services/AuthService';

function VerifyEmail() {

    const [code, setCode] = useState('');
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setCode(e.target.value);
    };

    console.log(authLocal.getEmail());
    const email = authLocal.getEmail();
    console.log(authLocal.getUsername());

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (code.trim() === '') {
            setError('Code cannot be empty');
        } else {
            try {
                const response = await authRemote.emailVerification(email,code)
                console.log(response);
                authLocal.saveToken(response.data.token)

            } catch (error) {
                console.log(error);
            }

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
                        <button>Verify</button>
                    </div>
                </form>
            </div>
        </div>
  )
}
export default VerifyEmail