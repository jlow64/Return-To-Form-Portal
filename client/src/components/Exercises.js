import React, { Fragment, useEffect } from "react";
import ExerciseCard from "./ExerciseCard";
import * as Constant from "../Data/Constants";

const Exercises = ({ patient_id, first_name, last_name, exercises, resetExercises }) => {
    const password = "password123";
    const email = first_name + "_" + last_name + "@returntoform.com";
    const role = "patient";

    const createUser = async () => {
        try {
            const body = { patient_id, first_name, last_name, password, email, role }
            const response = await fetch(`${Constant.API_ENDPOINT}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            await response.json();
            console.log("created user");
        } catch (err) {
            console.error(err.message);
        }
    };

    const getUser = async () => {
        try {
            const userResponse = await fetch(`${Constant.API_ENDPOINT}/exercise/user/${patient_id}`);
            const parseRes = await userResponse.json();

            if (parseRes.length === 0) {
                console.log("User not registered")
                createUser();
            } else {
                getExercises();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const getExercises = async () => {
        try {
            const exerciseRes = await fetch(`${Constant.API_ENDPOINT}/exercise/user-items/${patient_id}`);
            const exerciseParse = await exerciseRes.json();
            
            resetExercises(exerciseParse);
        } catch (err) {
            console.error(err.message);
        }
    };

    const refreshExercises = () => {
        getExercises();
    };

    useEffect(() => {
        getUser();
        getExercises();
    }, [])

    return (
        <Fragment>
            <div className="exercise-container" >
               <h1>{exercises.length===0? "No assigned exercises" : "Assigned exercises"}</h1> 
               <div style={{marginTop: "3rem"}}>
                    {exercises.map((value, key) => {
                        return (
                            <div key={key}>
                                <ExerciseCard 
                                    exercise_list={exercises} 
                                    refreshExercises={refreshExercises} 
                                    exercise={value} 
                                    showOptions={true} 
                                />
                            </div>
                        );
                    })}
               </div>
               
            </div>
        </Fragment>
    );
};

export default Exercises;