import React, { Fragment } from "react";
import { Card, Image } from "react-bootstrap";

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

    return (
        <Fragment>
            <div className="patient-card">   
                <Card>  
                    <Card.Title className="patient-card-content">    
                        <div data-initials={iter_list[0][0] + iter_list[1][0]} />
                        <p className="patient-card-name">{first_name + " " + last_name}</p>
                    </Card.Title>
                </Card>                
            </div>
        </Fragment>
    );
};

export default PatientCard;