import React,{ useEffect, useState } from "react";
import axios from "axios";

export default function SignUp(){
    const handleSubmit = async (e) => {
        const form = document.querySelector('form');
        const name = data.firstName + ' ' + data.lastName;
        setData((pre) => ({...pre, name:name}))
        if (form.checkValidity() === false) {
            e.preventDefault();
            console.log("empty form")
            form.classList.add('was-validated');
        } else {
            e.preventDefault();
            console.log(data)
            try {
                await axios.post("http://localhost:4000/signUp", 
                    {
                        name: data.firstName + ' ' + data.lastName,
                        email : data.email,
                        userName : data.userName,
                        password : data.password
                    }
                )
                .then((response) => {
                    console.log(response.data)
                })
                }catch (err){
                    console.log(err.response.data)
                }
        }
    };
    useEffect(() => {
    }, []);

    const [data, setData] = useState({
        firstName : "",
        lastName : "",
        name: "",
        userName : "",
        email : "",
        password : ""
    })
    const [showPassword, setShowPassword] = useState(false)
    const handleChange = (e) => {
        setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        // console.log(data)
    };
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    }
    return (
        <div className="container">
            <form noValidate>
                <div className="form-control">
                    <h1 className="">Sign Up</h1>
                    <div className="row gp-1 m-1">
                        <input type="text" className="form-control col" id="firstName" placeholder="First Name" name="firstName" onChange={handleChange} required/>
                        <input type="text" className="form-control col" id="lastName" placeholder="Last Name" name="lastName" onChange={handleChange} required/>
                    </div>
                    <div className="row m-1">
                        <input
                            type="text"
                            placeholder="@username"
                            className="form-control"
                            id="user-name"
                            name = "userName"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="row form-floating m-1 ">
                        <input 
                            type="email"
                            id="email"
                            className="form-control"
                            placeholder="Email@xmail.com"
                            name = "email"
                            onChange={handleChange}
                            required
                        />
                        <label htmlFor="email">Email</label>                        
                    </div>
                    <div className="input-group">
                        <div className="row form-floating m-1">
                            <input 
                                type={(showPassword? "text" : "password")}
                                id="password"
                                className="form-control"
                                placeholder="********"
                                onChange={handleChange}
                                name ="password"
                                required
                            />
                            <label htmlFor="password">Password</label>
                        </div>
                        <button type="button" className="btn btn-toggle" onClick={handleShowPassword}>
                        {showPassword? "Hide" : "Show"}
                        </button>
                    </div>
                    <button type="submit" onClick={handleSubmit} className="btn btn-primary m-2">Sign Up</button>
                </div>
            </form>
        </div>
    );
}