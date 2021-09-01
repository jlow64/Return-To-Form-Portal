import React, { Fragment } from "react";
import { Card } from "react-bootstrap";
import { Clock } from "react-bootstrap-icons";

const AppointmentCard = ({ patient_name, time }) => {
    const name_list = patient_name.split(" ");
    var iter_list = [];
    name_list.forEach((element) => {
        element[0] === element[0].toUpperCase? (
            iter_list.push(element)
                ) : (
            iter_list.push(element[0].toUpperCase() + element.slice(1))
        )
    });

    const parseTime = time.slice(11, 16)
    const meridian = parseInt(time.slice(11, 13)) < 12? "am" : "pm";
    return (
        <Fragment>
            <div className="appointment-card">   
                <Card>
                    <Card.Header>
                        <h5 className="time-header"><Clock style={{marginRight: 4}} />{parseTime + meridian}</h5>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title className="appointment-card-title">
                            <div data-initials={iter_list[0][0] + iter_list[1][0]} />
                            <p className="appointment-card-name">{iter_list[0] + " " + iter_list[1]}</p>                            
                        </Card.Title>
                    </Card.Body>
                </Card>                
            </div>
        </Fragment>
    );
};

export default AppointmentCard;