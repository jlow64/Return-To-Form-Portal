import React, { Fragment, useState, useEffect } from "react";
import ExerciseCard from "./ExerciseCard";

const Exercises = ({ patient_id, first_name, last_name }) => {
    const [exercises, setExercises] = useState([]);
    const password = "password123";
    const email = first_name + "_" + last_name + "@returntoform.com";
    const role = "patient";

    const createUser = async () => {
        try {
            const body = { patient_id, first_name, last_name, password, email, role }
            const response = await fetch("http://localhost:5000/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            const parseRes = await response.json();
            console.log("created user");
            console.log(parseRes);
        } catch (err) {
            console.error(err.message);
        }
    };

    const getUser = async () => {
        try {
            const userResponse = await fetch(`http://localhost:5000/exercise/user/${patient_id}`);
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
            const exerciseRes = await fetch(`http://localhost:5000/exercise/user-items/${patient_id}`);
            const exerciseParse = await exerciseRes.json();
            
            setExercises(exerciseParse);
            if (exerciseParse.length === 0) {
                console.log("currently no exercise items");
            } else {
                console.log("iterate through current exercise items");
            }
        } catch (err) {
            console.error(err.message);
        }
    };

    const refreshExercises = (exercise_list, id) => {
        setExercises(exercise_list.filter(exercise => exercise.exercise_id !== id));
    };

    useEffect(() => {
        getUser();
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