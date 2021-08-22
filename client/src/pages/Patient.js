import React, { useState, Fragment } from "react";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import { BoxArrowRight, ChevronLeft } from "react-bootstrap-icons";
import { useLocation, useHistory } from "react-router-dom";

import InputItem from "../components/InputItem";
import ListItems from "../components/ListItems";
import logo from "../logos/rtf-logo-grey.png";

import "../styles/Patient.css";

const Patient = ({ setAuth }) => {
    const location = useLocation();
    const history = useHistory();
    const patient_id = location.state?.patient_id;
    const patient_name = location.state?.patient_name;

    const logout = async (e) => {
        e.preventDefault();
        try {
            localStorage.removeItem("token");
            setAuth(false);
            toast.success("Logged out Successfully!");
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <div className="patient-container">
                <img src={logo} alt="" className="dashboard-logo" width="100%"/>
                <Button 
                    className="logout"
                    variant="secondary"
                    onClick={e => logout(e)}  
                >
                    <BoxArrowRight size={24} />
                </Button>
                <div style={{ display: "flex", alignContent: "center" }} >
                    <ChevronLeft 
                        size={24} 
                        onClick={() => history.goBack()}
                        style={{ margin: "2px" }}
                    />
                    <h2 className="exercise-label">{patient_name}</h2>
                </div>
                <h3>{patient_id}</h3>
                <InputItem />
                <ListItems /> 
            </div>
        </Fragment>
    );
};

export default Patient;