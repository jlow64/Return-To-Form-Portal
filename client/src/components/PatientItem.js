import React, { Fragment, useState, useEffect } from "react";

const Appointment = ({ url, first_name, last_name }) => {
    const [time, setTime] = useState({
        start_time: "",
        end_time: ""
    });
    
    const {start_time, end_time} = time;

    const onSetTime = (s, e) => {
        setTime({ ...time, start_time:s, end_time: e});
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
            onSetTime(parseRes.starts_at, parseRes.ends_at);
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
            {start_time===undefined? (
                ""
            ) : (
            <div>                   
                <h1>{start_time + " " + end_time}</h1>
                <div>
                    {first_name + " " + last_name}
                </div>
            </div>
            )
            }
        </Fragment>
    );
};

export default Appointment;