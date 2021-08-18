import React, { useState, Fragment } from "react";
import InputItem from "./InputItem";
import ListItems from "./ListItems";

const Patient = () => {
    return (
        <Fragment>
            <div className="patient-container">
               <h1>Patient {name}</h1>
                <InputItem />
                <ListItems /> 
            </div>
        </Fragment>
    );
};

export default Patient;