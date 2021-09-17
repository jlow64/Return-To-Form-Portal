import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const PatientCard = ({ patient_id, first_name, last_name }) => {
    const name_list = [first_name, last_name];
    var iter_list = [];
    name_list.forEach((element) => {
        element[0] === element[0].toUpperCase? (
            iter_list.push(element)
                ) : (
            iter_list.push(element[0].toUpperCase() + element.slice(1))
        )
    });
    const patient_name = iter_list[0] + " " + iter_list[1];
    
    return (
        <Fragment>
            <Link 
                style={{ textDecoration: "none", color: "#353A3E", width: "100%"}}
                to={{
                    pathname: "/dashboard/patient",
                    state: { patient_id: patient_id, patient_name: patient_name, first_name: iter_list[0], last_name: iter_list[1] }
                }}
            >
                <Card>    
                    <Card.Title className="patient-card-content">    
                        <div data-initials={iter_list[0][0] + iter_list[1][0]} />
                        <p className="patient-card-name">{patient_name}</p>
                    </Card.Title>
                </Card>   
            </Link>                   
        </Fragment>
    );
};

export default PatientCard;