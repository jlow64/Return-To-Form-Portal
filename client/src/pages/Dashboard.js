import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import SearchBar from "../components/SearchBar";
import logo from "../logos/rtf-logo-grey.png";
import "../styles/Dashboard.css";


const Dashboard = ({ setAuth }) => {
    const parsedUserData = [];
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");

    const getClinikoUsers = async () => {
        try {

            const response = await fetch("http://localhost:5000/dashboard/cliniko");
            const jsonData = await response.json();

            jsonData.users.forEach(element => {
               parsedUserData.push(element);
            });

            setUsers(jsonData.users);
            console.log(users);
        } catch (err) {
            console.error(err.message);
        }
    };

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
            toast.success("Logged out Successfully!");
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getProfile();
        getClinikoUsers();
    }, []);

    return (
        <Fragment>
            <div className="dashboard-container">
                <img src={logo} className="dashboard-logo" width="100%"/>
                <h2 className="exercise-label">Exercise History</h2>
                <h3 className="select-client-label">Select Client: {name}</h3>
                <SearchBar placeholder="Search for Client..." data={parsedUserData} />
                <button onClick={e => logout(e)}  className="btn btn-primary logout">
                    Log Out
                </button>
            </div>
        </Fragment>
    );
};

export default Dashboard;