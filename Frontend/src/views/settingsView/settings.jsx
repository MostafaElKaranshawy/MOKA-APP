import React, {useEffect, useState} from "react";
import './settings.css';
import { editUserSettings } from "../../services/userRequests";
export default function Settings(){
    if(!document.cookie.split("authToken=")[1]){
        console.log("No token found");
        window.location.href = "/";
    }
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const userToken = document.cookie.split("authToken=")[1];
    // console.log(userToken);
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [formErrors, setFormErrors] = useState({
        name: "",
        email: "",
        userName: "",
        password: "",
        newPassword: "",
    })
    const [form, setForm] = useState({
        name: user.name,
        email: user.email,
        userName: user.userName,
        password: "",
        newPassword: "",
    })
    useEffect(() => {
        if(userToken && user) {
            
        }
    },[user])
    useEffect(() => {
        setFormErrors({
            name: "",
            email: "",
            userName: "",
            password: "",
            newPassword: "",
        })
        let nameInput = document.getElementById("name");
        let emailInput = document.getElementById("email");
        let userNameInput = document.getElementById("username");
        let passwordInput = document.getElementById("password");
        let newPasswordInput = document.getElementById("new-password");
        nameInput.style.boxShadow = "0px 1px 7px 0px #bde0ff"
        emailInput.style.boxShadow = "0px 1px 7px 0px #bde0ff"
        userNameInput.style.boxShadow = "0px 1px 7px 0px #bde0ff"
        passwordInput.style.boxShadow = "0px 1px 7px 0px #bde0ff"
        newPasswordInput.style.boxShadow = "0px 1px 7px 0px #bde0ff"

        if(form.name.length < 5 || form.name.length > 30){
            setFormErrors({...formErrors, name: "Name must be between 5 and 30 characters"});
            nameInput.style.boxShadow = "0px 1px 7px 0px red"
        }
        if(form.email == ''){
            setFormErrors({...formErrors, email: "Email musn't be empty"});
            emailInput.style.boxShadow = "0px 1px 7px 0px red"
        }
        if(form.email.length > 0 && !form.email.includes("@")){
            setFormErrors({...formErrors, email: "Email must be valid"});
            emailInput.style.boxShadow = "0px 1px 7px 0px red"
        }
        if(form.userName.length < 5 || form.userName.length > 30){
            setFormErrors({...formErrors, userName: "Username must be between 5 and 30 characters"});
            userNameInput.style.boxShadow = "0px 1px 7px 0px red"
        }
        if(form.password.length > 0 && form.password.length < 8 || form.password.length > 20){
            setFormErrors({...formErrors, password: "Password must be at least 8 characters long and at most 20 characters long"});
            passwordInput.style.boxShadow = "0px 1px 7px 0px red"
        }
        if(form.password.length > 0 && form.password == form.newPassword){
            setFormErrors({...formErrors, newPassword: "New password must be different from the old one"});
            newPasswordInput.style.boxShadow = "0px 1px 7px 0px red"
        }
        if(form.newPassword && !form.password){
            setFormErrors({...formErrors, password: "Password must be filled"});
            passwordInput.style.boxShadow = "0px 1px 7px 0px red"
        }
        if(form.newPassword.length > 0 && form.newPassword.length < 8){
            setFormErrors({...formErrors, newPassword: "New password must be at least 8 characters long"});
            newPasswordInput.style.boxShadow = "0px 1px 7px 0px red"
        }
    },[form])
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
        if(showPassword){
            document.getElementById("password").type = "password";
        } else {
            let passwordInput = document.getElementById("password")
            passwordInput.type = "text";
        }
    }
    const toggleShowNewPassword = () => {
        setShowNewPassword(!showNewPassword);
        if(showNewPassword){
            document.getElementById("new-password").type = "password";
        } else {
            let newPasswordInput = document.getElementById("new-password")
            newPasswordInput.type = "text";
        }
    }
    const confirmSettings = async (e) => {
        e.preventDefault();
        if(formErrors.name || formErrors.email || formErrors.userName || formErrors.password || formErrors.newPassword)return;
        if(form.name == user.name && form.email == user.email && form.userName == user.userName && form.password == '' && form.newPassword == '')return
        
        const formData = {
            name: form.name == user.name ? '' : form.name,
            email: form.email == user.email ? '' : form.email,
            userName:  form.userName == user.userName ? '' : form.userName,
            password: form.password && form.password? form.password : '',
            newPassword: form.newPassword && form.newPassword? form.newPassword : '',
        }
        await handleEditUserSettings(formData);
    }
    async function handleEditUserSettings(formData) {
        let submitButton = document.getElementsByClassName('save-changes-button');
        submitButton.disabled = true;
        try {
            const newUserData = await editUserSettings(formData, userToken)
            alert("Profile Updated Successfully!")
            console.log(newUserData);
            localStorage.setItem("user", JSON.stringify(newUserData));
            setUser(newUserData)
        }
        catch(err){
            console.log(err)
            const error = err.response.data;
            if(error == "Error: Email already exists"){
                setFormErrors({...formErrors, email: "Email already exists"});
                document.getElementById("email").style.boxShadow = "0px 1px 7px 0px red"
            }
            else if(error == "Error: Username already exists"){
                setFormErrors({...formErrors, userName: "Username already exists"});
                document.getElementById("username").style.boxShadow = "0px 1px 7px 0px red"
            }
            else if(error == "Error: Password is Incorrect"){
                setFormErrors({...formErrors, password: "Password is Incorrect"});
                document.getElementById("password").style.boxShadow = "0px 1px 7px 0px red"
            }
            else {
                console.log(error);
            }
            submitButton.disabled = false;
        } 
    }
    return (
        <div className="settings view">
            <div className="settings-body">
                <p className="settings-header">Account Settings</p>
                <div className="user-info">
                    <form className="user-form" onSubmit={confirmSettings}>
                        <img src={`${import.meta.env.VITE_PHOTO_URL}/${user.profilePhotoUrl}`} alt="profile-photo"/>
                        <div className="user-name user-section">
                            <label htmlFor="name">Full name</label>
                            <input type="text" id="name" value={form.name} onChange={
                                (e) => {
                                    setForm({...form, name: e.target.value})
                                }
                            }/>
                            {formErrors.name && <p className="input-error">{formErrors.name}</p>}
                        </div>
                        <div className="user-email user-section">
                            <label htmlFor="email">Contact email</label>
                            <input type="text" id="email" value={form.email} onChange={
                                (e) => {
                                    setForm({...form, email: e.target.value})
                                }
                            }/>
                            {formErrors.email && <p className="input-error">{formErrors.email}</p>}
                        </div>
                        <div className="user-username user-section">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" value={form.userName} onChange={
                                (e) => {
                                    setForm({...form, userName: e.target.value})
                                }
                            }/>
                            {formErrors.userName && <p className="input-error">{formErrors.userName}</p>}
                        </div>
                        <div className="user-password">
                            <div className="user-password user-section">
                                <label htmlFor="password">Password</label>
                                <div className="input">
                                    <input type="password" id="password" value={form.password} onChange={
                                        (e) => {
                                            setForm({...form, password: e.target.value})
                                        }
                                    }/>
                                    {!showPassword? <i className="fa-regular fa-eye" onClick={toggleShowPassword}></i>:
                                    <i className="fa-regular fa-eye-slash" onClick={toggleShowPassword}></i>}
                                </div>
                                {formErrors.password && <p className="input-error">{formErrors.password}</p>}
                            </div>
                            <div className="user-new-password user-section">
                                <label htmlFor="new-password">New Password</label>
                                <div className="input">
                                    <input type="password" id="new-password" value={form.newPassword} onChange={
                                        (e) => {
                                            setForm({...form, newPassword: e.target.value})
                                        }
                                    }/>
                                    {!showNewPassword? <i className="fa-regular fa-eye" onClick={toggleShowNewPassword}></i>:
                                    <i className="fa-regular fa-eye-slash" onClick={toggleShowNewPassword}></i>}
                                </div>
                                {formErrors.newPassword && <p className="input-error">{formErrors.newPassword}</p>}
                            </div>
                        </div>
                        <button className="save-changes-button" type="submit">
                            Save changes
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}