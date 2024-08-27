import React from "react";
import axios from "axios";
import "./authMethod.css"

export default function SignIn(probs) {
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });
    function handleChange(e) {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    }
    async function checkForm(e) {
        e.preventDefault();
        if (user.email === "" || user.password === "") {
            alert("Please fill all fields");
            return;
        }
        await signIn();
    }

    async function signIn() {
        console.log(user);
        try {
            const response = await axios.post("http://localhost:4000/auth/signIn", user,{
                headers: {
                    "Content-Type": "application/json"
                },
            });
    
            const data = response.data;
            console.log(data);
            alert(data.message);
            const token = data.accessToken;
            document.cookie = `authToken=${token}; path=/; secure; samesite=strict;`;
            localStorage.setItem("user", JSON.stringify(data.user));
            window.location.href = "/home";
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="auth-section">
            <form className="auth-form signin-form"  onSubmit={checkForm}>
                <input type="email" placeholder="Email" required name="email" className="form-field" onChange={handleChange}/>
                <input type="password" placeholder="Password" required name="password" className="form-field" onChange={handleChange}/>
                <input type="submit" value="Sign In" className="submit-button"/>
                <p onClick={probs.setSignUp}>Don't have an account?</p>
            </form>
        </div>
    );
}