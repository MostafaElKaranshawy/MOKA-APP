import React from "react";
import axios from "axios";
import "./authMethod.css"

export default function SignUp(probs) {
    const [user, setUser] = React.useState({
        name: "",
        userName: "",
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
        if (user.name === "" || user.username === "" || user.email === "" || user.password === "") {
            alert("Please fill all fields");
            return;
        }
        await signUp();
    }

    async function signUp() {
        console.log(user);
        try {
            const response = await axios.post("http://localhost:4000/auth/signUp", user,{
                headers: {
                    "Content-Type": "application/json"
                },
            });
    
            const data = response.data;
            console.log(data);
            alert(data.message + " Please Sign In.");
            probs.setSignIn();
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="auth-section">
            <form className="auth-form signup-form"  onSubmit={checkForm}>
                <input type="text" placeholder="Name" required name="name" className="form-field" onChange={handleChange}/>
                <input type="text" placeholder="Username" required name="userName" className="form-field" onChange={handleChange}/>
                <input type="email" placeholder="Email" required name="email" className="form-field" onChange={handleChange}/>
                <input type="password" placeholder="Password" required name="password" className="form-field" onChange={handleChange}/>
                <p onClick={probs.setSignIn}>Already have an Account?</p>
                <input type="submit" value="Sign Up" className="submit-button"/>
            </form>
        </div>
    );
}