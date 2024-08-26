import React from "react";
import "./auth.css";
import  SignUp  from "../auth/signUp";
import  SignIn  from "../auth/signIn";
import logo from "../assets/logo.png";
export default function Auth(){
    const [isSignUp, setIsSignUp] = React.useState(true);
    function setSignUp() {
        setIsSignUp(true);
    }
    
    function setSignIn() {
        setIsSignUp(false);        
    }
    const activeSignUp = {
        backgroundColor: isSignUp ? "white" : "rgb(31 165 255)",
        color: isSignUp ? "#333" : "#f1f1f1"
    }
    const activeSignIn = {
        backgroundColor: isSignUp ? "rgb(31 165 255)" : "white",
        color: isSignUp ? "#f1f1f1" : "#333"
    }
    return (
        <div className="auth">
            <div className="auth-method">
                <div className="switch">
                    <div className="switch-button sign-up-button" style={activeSignUp} onClick={setSignUp}>Sign Up</div>
                    <div className="switch-button sign-in-button" style={activeSignIn} onClick={setSignIn}>Sign In</div>
                </div>
                { isSignUp && <SignUp setSignIn={setSignIn}/>}
                { !isSignUp && <SignIn setSignUp={setSignUp}/> }
            </div>
        </div>
    );
}