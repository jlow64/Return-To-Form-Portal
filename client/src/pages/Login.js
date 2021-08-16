import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import logo from '../logos/rtf-logo-white-Solid.png';

import  { Form, InputGroup, Button, Row, Col } from "react-bootstrap";
import { Person, LockFill, EyeSlashFill } from "react-bootstrap-icons";
import "../styles/Login.css";

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
            console.log(body);
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
                <img src={logo} alt="logo" className="login-logo" width="100%"/>
                <h2 className="text-left mt-5">Welcome back</h2>
                <Form onSubmit={onSubmitForm} >
                    <Form.Group as={Row} controlId="formEmail">
                        <InputGroup className="mb-1">
                            <InputGroup.Text className="login-icon">
                                <Person size={18} fill="#FFFFFF"/>
                            </InputGroup.Text>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                className="form-control login-input"
                                defaultValue={email}
                                onChange={e => onChange(e)}
                            />
                        </InputGroup>
                    </Form.Group>
                    
                    <Form.Group as={Row} controlId="formPassword">
                        <InputGroup className="mb-1">
                            <InputGroup.Text className="login-icon">
                                <LockFill size={18} />
                            </InputGroup.Text>
                            <Form.Control 
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="login-input passbar"
                                defaultValue={password}
                                onChange={e => onChange(e)}
                            />
                            <InputGroup.Text className="login-icon-right">
                                <EyeSlashFill size={18} />
                            </InputGroup.Text>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group as={Row} role="form">
                        <Button 
                            type="submit" 
                            variant="success" 
                            className="btn btn-login"
                            value="submit"
                        >
                            Admin Login
                        </Button>
                    </Form.Group>

                    <Row className="mb-1 bot-row">
                        <Form.Group as={Col} controlId="formCheck" className="remember-text">
                            <InputGroup className="mb-1">
                                <Form.Check 
                                    label="Remember me"
                                    value={rememberMe} 
                                    onChange={e => onCheck(e)}
                                    className=""
                                    id="rememberMe"
                                />
                            </InputGroup>
                        </Form.Group>
                        <Form.Group as={Col} controlId="formForgotPassword">
                            <Link to="/forgot-password" style={{ textDecoration: 'none' }} >
                                <p className="forgot-text">Forgot Password?</p>
                            </Link>
                        </Form.Group>
                    </Row>
                </Form>
            </div>
        </Fragment>
    );
};

export default Login;