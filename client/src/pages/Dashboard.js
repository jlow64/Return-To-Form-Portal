import React, { Fragment, useState, useEffect } from "react";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import { BoxArrowRight } from "react-bootstrap-icons";
import SearchBar from "../components/SearchBar";
import logo from "../logos/rtf-logo-grey.png";
import "../styles/Dashboard.css";
import Data from "../components/Data.json";


const Dashboard = ({ setAuth }) => {
    const parsedUserData = [];
    const [users, setUsers] = useState([]);
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
            toast.success("Logged out Successfully!");
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getProfile();
        const getClinikoUsers = async () => {
            try {
    
                const response = await fetch("http://localhost:5000/dashboard/cliniko");
                const jsonData = await response.json();
    
                jsonData.patients.forEach(element => {
                   parsedUserData.push(element);
                });
    
                setUsers(jsonData.patients);
            } catch (err) {
                console.error(err.message);
            }
        };
        getClinikoUsers();
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
                <SearchBar placeholder="Search..." data={Data.patients} />
                
            </div>
        </Fragment>
    );
};

export default Dashboard;