import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import logo from '../logos/rtf-logo-white-Solid.png';

import  { Form, InputGroup, Button } from "react-bootstrap";
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

    const onCheck = (e) => {
        setInputs({...inputs, rememberMe: e.target.checked });
    }

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
                <Form onSubmit={onSubmitForm} >
                    <Form.Group controlId="formEmail">
                        <InputGroup className="mb-1">
                            <InputGroup.Text>
                                <Person size={18} />
                            </InputGroup.Text>
                            <Form.Control
                                type="email"
                                placeholder="Emaill Address"
                                value={email}
                                onChange={e => onChange(e)}
                            />
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <InputGroup className="mb-1">
                            <InputGroup.Text>
                                <LockFill size={18} />
                            </InputGroup.Text>
                            <Form.Control 
                                type="password"
                                placeholder="Password"
                                className="login-input passbar"
                                value={password}
                                onChange={e => onChange(e)}
                            />
                            <InputGroup.Text>
                                <EyeSlashFill size={18} />
                            </InputGroup.Text>
                        </InputGroup>
                    </Form.Group>
                    <Button variant="primary">Admin Login</Button>
                    <button className="btn btn-success btn-block btn-login">Admin Login</button>
                    <div>
                        <div className="form-check">
                            <input 
                                className="form-check-input checkbox" 
                                type="checkbox" 
                                value={rememberMe} 
                                onChange={e => onCheck(e)}
                                id="rememberMe" />
                            <label className="form-check-label remember-text" >
                                Remember me
                            </label>
                        </div>
                        <Link to="/forgot-password" style={{ textDecoration: 'none' }} ><p className="forgot-text text-right">Forgot Password?</p></Link>
                    </div>
                    
                </Form>
            </div>
        </Fragment>
    );
};

export default Login;