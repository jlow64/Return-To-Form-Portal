import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import { BoxArrowRight } from "react-bootstrap-icons";

import SearchBar from "../components/SearchBar";
import AppointmentCard from "../components/AppointmentCard";
import logo from "../logos/rtf-logo-grey.png";
import "../styles/Dashboard.css";

import PatientData from "../Data/Patient.json";
import AppointmentData from "../Data/Appointment.json";

const Dashboard = ({ setAuth }) => {
    // const [users, setUsers] = useState([]);
    // const [appointments, setAppointments] = useState([]);

    const logout = async (e) => {
        e.preventDefault();
        try {
            sessionStorage.removeItem("token");
            setAuth(false);
            toast.success("Logged out Successfully!");
        } catch (err) {
            console.error(err.message);
        }
    };

    // useEffect(() => {
        // const getAppointment = async (url) => {
        //     try {
        //         const response = await fetch("http://localhost:5000/dashboard/appointment", {
        //         method: "GET",
        //         headers: { jwt_token: sessionStorage.token }
        //     });
        //         const parseRes = await response.json();
        //         setAppointments(parseRes.individual_appointments);
        //     } catch (err) {
        //         console.error(err);
        //     }
        // };
        // const getPatients = async (url) => {
        //     try {
        //         const response = await fetch("http://localhost:5000/dashboard/patients", {
        //         method: "GET",
        //         headers: { jwt_token: sessionStorage.token }
        //     });
        //         const parseRes = await response.json();
        //         setAppointments(parseRes.individual_appointments);
        //     } catch (err) {
        //         console.error(err);
        //     }
        // };
        // getPatients();
        // getAppointment();
    // }, []);

    return (
        <Fragment>
            <div className="dashboard-container">
                <img src={logo} alt="" className="dashboard-logo" width="100%"/>
                <Button 
                    className="logout"
                    variant="secondary"
                    onClick={e => logout(e)}  
                >
                    <BoxArrowRight size={24} />
                </Button>
                <h2 className="exercise-label">Exercise History</h2>
                <h3 className="select-client-label">Search Client</h3>
                <SearchBar 
                    placeholder="Search..." 
                    patient_data={PatientData.patients} 
                />       
                <div className="appointment-display-container">
                    {AppointmentData.individual_appointments.slice(0,50).map((value, key) => {
                        return (
                            <div key={key}>
                                <AppointmentCard
                                    patient_name={value.patient_name} 
                                    time={value.starts_at} 
                                />
                            </div>
                        );
                    })}
                </div>         
            </div>
        </Fragment>
    );
};

export default Dashboard;