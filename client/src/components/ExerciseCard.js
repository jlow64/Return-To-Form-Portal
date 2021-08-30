import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { ThreeDotsVertical } from "react-bootstrap-icons" ;

const ExerciseCard = ({ exercise }) => {
    /* Make edit page and delete section from three vertical dots from a modal */
    return (
        <Fragment>
            <Card className="exercise-card-container" >   
                <Card.Body>
                    {exercise.exercise_name}
                    <ThreeDotsVertical 
                        style={{float: "right", alignItems: "center", marginTop: "2rem"}} 
                        size={16} 
                    />
                    <Card.Title className="exercise-card-content">    
                        { `Reps:${exercise.reps} ` + `Sets:${exercise.sets} ` + `Frequency:${exercise.frequency}` }
                    </Card.Title>
                </Card.Body> 
            </Card>                  
        </Fragment>
    );
};

export default ExerciseCard;