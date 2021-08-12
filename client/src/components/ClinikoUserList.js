import React, { useState, useEffect, Fragment } from "react";
import SearchBar from "./SearchBar";

const ClinikoUserList = () => {
    const [users, setUsers] = useState([]);
    const parsedUserData = [];

    const getUsers = async () => {
        try {

            const response = await fetch("http://localhost:5000/dashboard/cliniko");
            const jsonData = await response.json();

            jsonData.users.forEach(element => {
               parsedUserData.push(element);
            });

            setUsers(jsonData.users);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <Fragment>
            <SearchBar placeholder="Search for Client..." data={parsedUserData} />
        </Fragment>
    );
};

export default ClinikoUserList;