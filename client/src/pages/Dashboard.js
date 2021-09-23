import React, { Fragment, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { BoxArrowRight } from "react-bootstrap-icons";

import SearchBar from "../components/SearchBar";
import AppointmentCard from "../components/AppointmentCard";
import logo from "../logos/rtf-logo-grey.png";
import "../styles/Dashboard.css";

import * as Constant from "../Data/Constants";

const Dashboard = ({ logout }) => {
    const [isSearch, setIsSearch] = useState(false);
    const [appointments, setAppointments] = useState([]);

    const displayAppointments = (bool) => {
        setIsSearch(bool);
    };

    useEffect(() => {
        const getAppointment = async () => {
            try {
                const response = await fetch(`${Constant.API_ENDPOINT}/dashboard/appointments`, {
                method: "GET",
                credentials: "include"
            });
                const parseRes = await response.json();
                console.log(parseRes);
                setAppointments(parseRes.individual_appointments);
            } catch (err) {
                console.error(err);
            }
        };
        getAppointment();
    }, []);

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
                    displayAppointments={displayAppointments}
                />       
                {isSearch? (
                    <>
                    </>
                    ) : (
                    <div className="appointment-display-container">
                        {appointments.slice(0,50).map((value, key) => {
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
                )}       
            </div>
        </Fragment>
    );
};

export default Dashboard;