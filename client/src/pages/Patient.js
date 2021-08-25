import React, { Fragment } from "react";
import { toast } from "react-toastify";
import { Button } from "react-bootstrap";
import { BoxArrowRight, ChevronLeft, PlusCircleFill } from "react-bootstrap-icons";
import { useLocation, useHistory, Link } from "react-router-dom";

// import InputItem from "../components/InputItem";
// import ListItems from "../components/ListItems";
import Exercises from "../components/Exercises";
import logo from "../logos/rtf-logo-grey.png";

import "../styles/Patient.css";


const Patient = ({ setAuth }) => {
    const location = useLocation();
    const history = useHistory();
    const patient_id = location.state?.patient_id;
    const patient_fullname = location.state?.patient_name;
    const first_name = location.state?.first_name;
    const last_name = location.state?.last_name;

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
                    <h2 className="exercise-label">{patient_fullname}</h2>
                </div>
                <div className="create-exercise">
                    <Link 
                        style={{textDecoration: "none", color: "#7BC17F"}}
                        to={{
                        pathname: "/dashboard/patient/create-exercise",
                        state: { patient_id: patient_id }
                    }}>
                        <PlusCircleFill size={"5rem"} style={{ margin: "0 3rem"}} />
                        Create a new exercise
                    </Link>
                </div>
                <Exercises patient_id={patient_id} first_name={first_name} last_name={last_name} />
            </div>
        </Fragment>
    );
};

export default Patient;