import React, { useEffect } from "react";
import "./auth.css";
import  SignUp  from "../../components/auth/signUp";
import  SignIn  from "../../components/auth/signIn";
export default function Auth(){
    if(document.cookie.split("authToken=")[1] && localStorage.getItem("user")) {
        window.location.href = "/home";
    }
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
    useEffect(() => {
        document.getElementById('auth-logo').addEventListener('click', function() {
            const logo = document.getElementById('auth-logo');
            
            // Remove the animate class to reset the animation
            logo.classList.remove('animate');
            
            // Force a reflow to reset the animation
            void logo.offsetWidth;
            
            // Re-add the animate class to start the animation
            logo.classList.add('animate');
        });
    },[])
    return (
        <div className="auth">
            <div className="auth-logo animate" id="auth-logo">
                <i className="fa-solid fa-m"></i>
                <i className="fa-solid fa-o"></i>
                <i className="fa-solid fa-k"></i>
                <i className="fa-solid fa-a"></i>
            </div>
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