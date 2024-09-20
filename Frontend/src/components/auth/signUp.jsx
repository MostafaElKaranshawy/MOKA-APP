import React, { useState, useEffect } from "react";
import "./authMethod.css";
import { signUp } from "../../services/authRequests";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignUp(probs) {
    const [showPassword, setShowPassword] = useState(false);
    const [submitTried, setSubmitTried] = useState(false);
    const [formErrors, setFormErrors] = useState({
        name: "",
        email: "",
        userName: "",
        password: "",
    });
    const [form, setForm] = useState({
        name: "",
        email: "",
        userName: "",
        password: "",
    });

    useEffect(() => {
        if (!submitTried) return;
        let nameInput = document.getElementById("name");
        let emailInput = document.getElementById("email");
        let userNameInput = document.getElementById("username");
        let passwordInput = document.getElementById("password");
        nameInput.style.boxShadow = "0px 1px 7px 0px #7fa1c0";
        emailInput.style.boxShadow = "0px 1px 7px 0px #7fa1c0";
        userNameInput.style.boxShadow = "0px 1px 7px 0px #7fa1c0";
        passwordInput.style.boxShadow = "0px 1px 7px 0px #7fa1c0";
        let errors = {};
        if (form.name.length < 5 || form.name.length > 30) {
            errors.name = "Name must be between 5 and 30 characters";
            nameInput.style.boxShadow = "0px 1px 7px 0px #ffadad";
        }
        if (!form.email) {
            errors.email = "Email mustn't be empty";
            emailInput.style.boxShadow = "0px 1px 7px 0px #ffadad";
        }
        if (form.userName.length < 5 || form.userName.length > 30) {
            errors.userName = "Username must be between 5 and 30 characters";
            userNameInput.style.boxShadow = "0px 1px 7px 0px #ffadad";
        }
        if (form.password.length < 8 || form.password.length > 20) {
            errors.password = "Password must be between 8 and 20 characters long";
            passwordInput.style.boxShadow = "0px 1px 7px 0px #ffadad";
        }
        if(!form.email.includes("@") || !form.email.includes(".")) {
            errors.email = "Email must be valid";
            emailInput.style.boxShadow = "0px 1px 7px 0px #ffadad";
        }
        setFormErrors(errors);
    }, [form, submitTried]);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const confirmSettings = async (e) => {
        e.preventDefault();
        setSubmitTried(true);

        let errors = {};
        let nameInput = document.getElementById("name");
        let emailInput = document.getElementById("email");
        let userNameInput = document.getElementById("username");
        let passwordInput = document.getElementById("password");
        nameInput.style.boxShadow = "0px 1px 7px 0px #7fa1c0";
        emailInput.style.boxShadow = "0px 1px 7px 0px #7fa1c0";
        userNameInput.style.boxShadow = "0px 1px 7px 0px #7fa1c0";
        passwordInput.style.boxShadow = "0px 1px 7px 0px #7fa1c0";
        if (form.name.length < 5 || form.name.length > 30) {
            errors.name = "Name must be between 5 and 30 characters";
            nameInput.style.boxShadow = "0px 1px 7px 0px #ffadad";
        }
        if (!form.email) {
            errors.email = "Email mustn't be empty";
            emailInput.style.boxShadow = "0px 1px 7px 0px #ffadad";
        }
        if (form.userName.length < 5 || form.userName.length > 30) {
            errors.userName = "Username must be between 5 and 30 characters";
            userNameInput.style.boxShadow = "0px 1px 7px 0px #ffadad";
        }
        if (form.password.length < 8 || form.password.length > 20) {
            errors.password = "Password must be between 8 and 20 characters long";
            passwordInput.style.boxShadow = "0px 1px 7px 0px #ffadad";
        }
        if(!form.email.includes("@") || !form.email.includes(".")) {
            errors.email = "Email must be valid";
            emailInput.style.boxShadow = "0px 1px 7px 0px #ffadad";
        }
        setFormErrors(errors);

        if (Object.keys(errors).length > 0) return;

        await handleSignUp();
    };

    async function handleSignUp() {
        let nameInput = document.getElementById("name");
        let emailInput = document.getElementById("email");
        let userNameInput = document.getElementById("username");
        let passwordInput = document.getElementById("password");
        let errors = {};
        try {
            await signUp(form);
            toast.success("Account created successfully", {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                pauseOnHover: true,
            })
            probs.setSignIn();
        } catch (error) {
            if(error) {
                if(error.message === "Email already exists") {
                    errors.email = "Email already exists";
                    emailInput.style.boxShadow = "0px 1px 7px 0px #ffadad";
                }
                if(error.message === "Username already exists") {
                    errors.userName = "Username already exists";
                    userNameInput.style.boxShadow = "0px 1px 7px 0px #ffadad";
                }
            }
            setFormErrors(errors);
        }
    }

    return (
        <div className="auth-section">
            
            <form className="user-form signUp-form" onSubmit={confirmSettings}>
                <div className="user-name user-section">
                    {/* <label htmlFor="name">Full name</label> */}
                    <input
                        type="text"
                        id="name"
                        value={form.name}
                        placeholder="Full Name"
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                    {formErrors.name && <p className="input-error">{formErrors.name}</p>}
                </div>
                <div className="user-email user-section">
                    {/* <label htmlFor="email">Contact email</label> */}
                    <input
                        type="text"
                        id="email"
                        value={form.email}
                        placeholder="Email"
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    {formErrors.email && <p className="input-error">{formErrors.email}</p>}
                </div>
                <div className="user-username user-section">
                    {/* <label htmlFor="username">Username</label> */}
                    <input
                        type="text"
                        id="username"
                        value={form.userName}
                        placeholder="Username"
                        onChange={(e) => setForm({ ...form, userName: e.target.value })}
                    />
                    {formErrors.userName && <p className="input-error">{formErrors.userName}</p>}
                </div>
                <div className="user-password">
                    <div className="user-password user-section">
                        {/* <label htmlFor="password">Password</label> */}
                        <div className="input">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={form.password}
                                placeholder="Password"
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                            />
                            <i
                                className={`fa-regular ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
                                onClick={toggleShowPassword}
                            ></i>
                        </div>
                        {formErrors.password && <p className="input-error">{formErrors.password}</p>}
                    </div>
                </div>
                <button className="save-changes-button" type="submit">
                    Sign Up
                </button>
                <p className="switch-p" onClick={probs.setSignIn}>Already have an account?</p>
            </form>
        </div>
    );
}
