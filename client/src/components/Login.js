import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import logo from '../logos/rtf-logo-white-Solid.png';

import { Person, LockFill, EyeSlashFill } from "react-bootstrap-icons";
import "./Login.css";

const Login = ({ setAuth }) => {

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
        rememberMe: false
    });

    const { email, password, rememberMe } = inputs;

    const onChange = (e) => {
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    };

    const onSubmitForm = async e  => {
        e.preventDefault();
        try {
            const body = { email, password, rememberMe };
            const response = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();

            if (parseRes.token) {
                localStorage.setItem("token", parseRes.token);
                setAuth(true);
                toast.success("Login Successfully!");
            } else {
                toast.error(parseRes);
            }

        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <div className="login-container">
                <img src={logo} className="login-logo" width="100%"/>
                <h2 className="text-left mt-5">Welcome back</h2>
                <form className="form-group" onSubmit={onSubmitForm} >
                    <div className="input-group mb-1">
                        <span className="input-group-prepend login-icon">
                            <div className="input-group-text bg-transparent">
                                <Person size={18} />
                            </div>
                        </span>
                        <input 
                            type="text" 
                            name="email" 
                            placeholder="Email Address" 
                            className="form-control login-input" 
                            value={email} 
                            onChange={e => onChange(e)} 
                        />
                    </div>
                    <div className="input-group mb-1">
                        <span className="input-group-prepend login-icon">
                            <div className="input-group-text bg-transparent">
                                <LockFill size={18} />
                            </div>
                        </span>
                        <input 
                            type="password" 
                            name="password" 
                            placeholder="Password" 
                            className="form-control login-input passbar" 
                            value={password} 
                            onChange={e => onChange(e)} 
                        />
                        <span className="input-group-append login-icon-right">
                            <div className="input-group-text bg-transparent">
                                <EyeSlashFill size={18} />
                            </div>
                        </span>
                    </div>
                    <button className="btn btn-success btn-block btn-login">Admin Login</button>
                    <Link to="/forgot-password" style={{ textDecoration: 'none' }} ><p className="forgot-text text-right">Forgot Password?</p></Link>
                </form>
            </div>
        </Fragment>
    );
};

export default Login;