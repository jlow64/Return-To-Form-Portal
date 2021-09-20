import React, { Fragment, useState, useEffect } from "react";
import * as Constant from "../Data/Constants";

import { Button } from "react-bootstrap";
import { BoxArrowRight, ChevronLeft, PlusCircleFill } from "react-bootstrap-icons";
import { useLocation, useHistory, Link } from "react-router-dom";

import Exercises from "../components/Exercises";
import logo from "../logos/rtf-logo-grey.png";

import "../styles/Patient.css";


const Patient = ({ logout }) => {
    const location = useLocation();
    const history = useHistory();
    const patient_id = location.state?.patient_id;
    const patient_fullname = location.state?.patient_name;
    const first_name = location.state?.first_name;
    const last_name = location.state?.last_name;

    const [exercises, setExercises] = useState([]);

    const resetExercises = (val) => {
        setExercises(val);
    };

    useEffect(() => {
        const getExercises = async () => {
            try {
                const exerciseRes = await fetch(`${Constant.API_ENDPOINT}/exercise/user-items/${patient_id}`);
                const exerciseParse = await exerciseRes.json();
                
                resetExercises(exerciseParse);
            } catch (err) {
                console.error(err.message);
            }
        };
        getExercises();
    },[]);

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
                <Exercises 
                    patient_id={patient_id} 
                    first_name={first_name} 
                    last_name={last_name} 
                    exercises={exercises}  
                    resetExercises={resetExercises}
                />
            </div>
        </Fragment>
    );
};

export default Patient;