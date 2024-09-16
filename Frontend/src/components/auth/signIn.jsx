import React, { useEffect, useState } from "react";
import "./authMethod.css";
import { signIn } from "../../services/authRequests";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function SignIn(probs) {
    const [showPassword, setShowPassword] = useState(false);
    const [submitTried, setSubmitTried] = useState(false);
    const [formErrors, setFormErrors] = useState({
        email: "",
        password: "",
    });
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    useEffect(() => {
        if (!submitTried) return;
        let emailInput = document.getElementById("email");
        let passwordInput = document.getElementById("password");
        emailInput.style.boxShadow = "0px 1px 7px 0px #7fa1c0";
        passwordInput.style.boxShadow = "0px 1px 7px 0px #7fa1c0";
        let errors = {};
        if (!form.email) {
            errors.email = "Email mustn't be empty";
            emailInput.style.boxShadow = "0px 1px 7px 0px #ffadad";
        }
        if (form.password.length < 8 || form.password.length > 20) {
            errors.password = "Password must be between 8 and 20 characters long";
            passwordInput.style.boxShadow = "0px 1px 7px 0px #ffadad";
        }
        if (!form.email.includes("@") || !form.email.includes(".")) {
            errors.email = "Email must be valid";
            emailInput.style.boxShadow = "0px 1px 7px 0px #ffadad";
        }
        setFormErrors(errors);
    },[form])
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const confirmSettings = async (e) => {
        e.preventDefault();
        setSubmitTried(true);

        let errors = {};
        let emailInput = document.getElementById("email");
        let passwordInput = document.getElementById("password");
        emailInput.style.boxShadow = "0px 1px 7px 0px #7fa1c0";
        passwordInput.style.boxShadow = "0px 1px 7px 0px #7fa1c0";

        if (!form.email) {
            errors.email = "Email mustn't be empty";
            emailInput.style.boxShadow = "0px 1px 7px 0px #ffadad";
        }
        if (form.password.length < 8 || form.password.length > 20) {
            errors.password = "Password must be between 8 and 20 characters long";
            passwordInput.style.boxShadow = "0px 1px 7px 0px #ffadad";
        }
        if (!form.email.includes("@") || !form.email.includes(".")) {
            errors.email = "Email must be valid";
            emailInput.style.boxShadow = "0px 1px 7px 0px #ffadad";
        }

        setFormErrors(errors);

        if (Object.keys(errors).length > 0) return;

        await handleSignIn();
    };

    async function handleSignIn() {
        let emailInput = document.getElementById("email");
        let passwordInput = document.getElementById("password");
        let errors = {};
        setSubmitTried(true);
        try {
            const data = await signIn(form);
            if(!data)return;

            toast.success('Signed in successfully!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                pauseOnHover: true,
            })
            const token = data.accessToken;
            document.cookie = `authToken=${token}; path=/; secure; samesite=strict;`;
            localStorage.setItem("user", JSON.stringify(data.user));
            window.location.href = "/home";
        } catch (error) {
            console.log(error.message);
            if (error && error.message === "Email not found" || error.message === "Password is Incorrect") {
                errors.email = "Invalid email or password";
                errors.password = "Invalid email or password";
                emailInput.style.boxShadow = "0px 1px 7px 0px #ffadad";
                passwordInput.style.boxShadow = "0px 1px 7px 0px #ffadad";
            }
            setFormErrors(errors);
        }
    }

    return (
        <div className="auth-section">
            <form className="user-form signIn-form" onSubmit={confirmSettings}>
                <div className="user-email user-section">
                    <input
                        type="text"
                        id="email"
                        value={form.email}
                        placeholder="Email"
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                    />
                    {formErrors.email && <p className="input-error">{formErrors.email}</p>}
                </div>
                <div className="user-password user-section">
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
                <button className="save-changes-button" type="submit">
                    Sign In
                </button>
                <p onClick={probs.setSignUp}>Don't have an account?</p>
            </form>
        </div>
    );
}
