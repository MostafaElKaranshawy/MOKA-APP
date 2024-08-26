import React from "react";
import "./authMethod.css"
export default function SignUp(probs) {
    const [user, setUser] = React.useState({
        name: "",
        username: "",
        email: "",
        password: "",
    });
    let {
        name,
        username,
        email,
        password,
        confirmPassword
        } = ''
    function checkForm(e) {
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        if (name === "" || username === "" || email === "" || password === "") {
            alert("Please fill all fields");
            return;
        }
        console.log(name, username, email, password);
        e.preventDefault();
    }
    return (
        <div className="auth-section">
            <form className="auth-form signup-form" action="/home" onSubmit={checkForm}>
                <input type="text" placeholder="Name" required value={name}/>
                <input type="text" placeholder="Username" required value={username}/>
                <input type="email" placeholder="Email" required value={email}/>
                <input type="password" placeholder="Password" required value={password}/>
                <input type="password" placeholder="Confirm Password" required value={confirmPassword}/>
                <p onClick={probs.setSignIn}>Already have an Account?</p>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}