import React, { Fragment, useState } from "react";
import { toast } from "react-toastify";
import { useHistory, useLocation } from "react-router-dom";
import { Form, Button, Row, InputGroup } from "react-bootstrap";
import { BoxArrowRight, ChevronLeft, DashCircleFill, PlusCircleFill } from "react-bootstrap-icons";
import logo from "../logos/rtf-logo-grey.png";
import "../styles/CreateExercise.css";

const CreateExercise = ({ setAuth }) => {
    const location = useLocation();
    const history = useHistory();

    const patient_id = location.state?.patient_id;

    const [data, setData] = useState({
        exercise_name: "",
        description: "",
        reps: 0,
        sets: 0,
        frequency: 0,
    });

    const { exercise_name, description, reps, sets, frequency } = data;

    const logout = async (e) => {
        e.preventDefault();
        try {
            localStorage.removeItem("token");
            setAuth(false);
            toast.success("Logged out Successfully!");
        } catch (err) {
            console.error(err.message);
        }
    };

    const dataInputChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const submitExercise = async (e) => {
        e.preventDefault();
        try {
            const body = { patient_id, exercise_name, description, reps, sets, frequency };
            const response =  await fetch("http://localhost:5000/exercise/item", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();

            console.log(parseRes);
            
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Fragment>
            <div className="patient-container">
                <img src={logo} alt="" className="dashboard-logo" width="100%"/>
                <Button 
                    className="logout"
                    variant="secondary"
                    onClick={e => logout(e)}  
                >
                    <BoxArrowRight size={24} />
                </Button>
                <div style={{ display: "flex", alignContent: "center" }} >
                    <ChevronLeft 
                        size={24} 
                        onClick={() => history.goBack()}
                        style={{ margin: "2px" }}
                    />
                    <h2 className="exercise-label">Create a new exercise</h2>
                </div>
                <Form onSubmit={submitExercise}>
                    <Form.Group as={Row} controlId="formExerciseName">
                        <Form.Label>Exercise name</Form.Label>
                        <Form.Control
                            type="text"
                            name="exercise_name"
                            value={data.exercise_name}
                            placeholder="Enter text"
                            onChange={dataInputChange}
                        />
                    </Form.Group>
                    <Form.Group as={Row} controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            style={{ height: '160px', resize: "none"}}
                            as="textarea"
                            type="text"
                            name="description"
                            value={data.description}
                            placeholder="Enter text"
                            onChange={dataInputChange}
                            
                        />
                    </Form.Group>

                    <Form.Group as={Row} controlId="formReps" >  
                        <InputGroup className="mb-1" >
                            <Form.Label>
                                Reps
                            </Form.Label>
                            <DashCircleFill 
                                size={24} 
                                style={{color: "#FCB333"}} 
                                onClick={() => {setData({ ...data, reps: parseInt(data.reps) -1 })}}
                            />
                            <Form.Control
                                type="number"
                                min="0"
                                name="reps"
                                value={data.reps}
                                defaultValue={0}
                                onChange={dataInputChange}
                            />
                            <PlusCircleFill 
                                size={24} 
                                style={{color: "#FCB333"}} 
                                onClick={() => {setData({ ...data, reps: parseInt(data.reps) + 1})}}
                            />
                        </InputGroup>                      
                    </Form.Group>

                    <Form.Group as={Row} controlId="formSets" >   
                        <InputGroup className="mb-1" >
                            <Form.Label>
                                Sets
                            </Form.Label>
                            <DashCircleFill 
                                size={24} 
                                style={{color: "#FCB333"}} 
                                onClick={() => {setData({ ...data, sets: parseInt(data.sets) - 1})}}
                            />
                            <Form.Control
                                type="number"
                                min="0"
                                name="sets"
                                value={data.sets}
                                defaultValue={0}
                                onChange={dataInputChange}
                            />
                            <PlusCircleFill 
                                size={24} 
                                style={{color: "#FCB333"}} 
                                onClick={() => {setData({ ...data, sets: parseInt(data.sets) + 1})}}
                            />
                        </InputGroup>                       
                    </Form.Group>

                    <Form.Group as={Row} controlId="formFrequency" >  
                        <InputGroup className="mb-1" >
                            <Form.Label>Frequency</Form.Label>
                            <DashCircleFill 
                                size={24} 
                                style={{color: "#FCB333"}} 
                                onClick={() => {setData({ ...data, frequency: parseInt(data.frequency) -1 })}}
                            />
                            <Form.Control
                                type="number"
                                min="0"
                                name="frequency"
                                value={data.frequency}
                                defaultValue={0}
                                onChange={dataInputChange}
                            />
                            <PlusCircleFill 
                                size={24} 
                                style={{color: "#FCB333"}} 
                                onClick={() => {setData({ ...data, frequency: parseInt(data.frequency) + 1})}}
                            />
                        </InputGroup>                      
                    </Form.Group>

                    <Form.Group as={Row} controlId="formButton" role="form">
                        <InputGroup className="mb-1">
                           <Button 
                                type="submit" 
                                variant="" 
                                className="btn-exercise"
                                value="submit"
                                size="large"
                                onClick={() => history.goBack()}
                            >
                                Assign to client
                            </Button> 
                        </InputGroup>
                    </Form.Group>

                </Form>
            </div>
        </Fragment>
    );
};

export default CreateExercise;