import React, { Fragment, useState, useEffect } from "react";
import InputItem from "./InputItem";
import ListItems from "./ListItems";
import ClinikoUserList from "./ClinikoUserList";
import logo from "../logos/rtf-logo-grey.png";
import "./Dashboard.css";


const Dashboard = ({ setAuth }) => {
    const [name, setName] = useState("");

    const getProfile = async () => {
        try {
            const res = await fetch("http://localhost:5000/dashboard/", {
                method: "GET",
                headers: { jwt_token: localStorage.token }
            });

            const parseRes = await res.json();
            setName(parseRes.first_name);
        } catch (err) {
            console.error(err.message);
        }
    };

    const logout = async (e) => {
        e.preventDefault();
        try {
            localStorage.removeItem("token");
            setAuth(false);
            
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getProfile();
    }, []);

    return (
        <Fragment>
            <div className="dashboard-container">
                <img src={logo} className="dashboard-logo" width="100%"/>
                <h2 className="exercise-label">Exercise History</h2>
                <h3 className="select-client-label">Select Client: {name}</h3>
                <ClinikoUserList />
                <button onClick={e => logout(e)}  className="btn btn-primary logout">
                    Log Out
                </button>
            </div>
        </Fragment>
    );
};

export default Dashboard;