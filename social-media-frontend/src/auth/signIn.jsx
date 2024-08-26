import React from "react";
import "./authMethod.css"
export default function SignIn(probs) {
    return (
        <div className="auth-section">
            <form className="auth-form signup-form">
                <input type="email" placeholder="Email" required/>
                <input type="password" placeholder="Password" required/>
                <button>Sign in</button>
                <p onClick={probs.setSignUp}>Don't have an Account?</p>
            </form>
        </div>
    );
}