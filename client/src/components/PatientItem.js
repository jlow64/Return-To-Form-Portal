import React, { Fragment, useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { Clock } from "react-bootstrap-icons";

const Appointment = ({ url, first_name, last_name }) => {
    const [time, setTime] = useState({
        start_time: undefined,
        meridian: ""
    });

    const CapFirstName = first_name.charAt(0).toUpperCase() + first_name.slice(1);
    const CapLastName = last_name.charAt(0).toUpperCase() + last_name.slice(1);
    
    const { start_time, meridian } = time;

    const onSetTime = (s) => {
        try {
            const ToD = parseInt(s.indexOf(11)) < 12? "am" : "pm";
            setTime({ ...time, start_time:s.slice(11, 16), meridian:ToD});
        } catch (err) {
            console.error(err);
        }
    };

    const getAppointment = async (url) => {
        try {
            const body = { "url": url };
            const response = await fetch("http://localhost:5000/dashboard/appointment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();
            console.log(parseRes.starts_at);
            if (parseRes.starts_at === undefined) {
                console.log("no appointment");
            } else {
                onSetTime(parseRes.starts_at);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getAppointment(url);
    }, []);

    console.log(time);
    return (
        <Fragment>
            {start_time==undefined? (
                ""
            ) : (
            <div className="patient-card">   
                <Card>
                    <Card.Header>
                        <Clock />
                        {start_time + meridian}
                    </Card.Header>
                    <Card.Body>
                        <Card.Title className="pname-title">
                            {CapFirstName + " " + CapLastName}
                        </Card.Title>
                    </Card.Body>
                </Card>                
            </div>
            )
            }
        </Fragment>
    );
};

export default Appointment;