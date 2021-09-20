import React, { Fragment, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { toast } from "react-toastify";
import { useHistory, useLocation } from "react-router-dom";

import { Form, Button, Row, InputGroup, Modal, Spinner } from "react-bootstrap";
import { BoxArrowRight, ChevronLeft, DashCircleFill, PlusCircleFill, Film } from "react-bootstrap-icons";
import logo from "../logos/rtf-logo-grey.png";

import "../styles/CreateExercise.css";
import * as Constant from "../Data/Constants";
import ExerciseCard from "../components/ExerciseCard";

const EditExercise = ({ logout }) => {
    const location = useLocation();
    const history = useHistory();
    const exercise = location.state?.exercise;

    const [takingVideo, setTakingvideo] = useState(true);
    const [loading, setLoading] = useState(false);
    const [video, setVideo] = useState(exercise.video_url);
    const [fileBase64String, setFileBase64String] = useState("");

    const [data, setData] = useState({
        exercise_name: exercise.exercise_name,
        description: exercise.description,
        reps: exercise.reps,
        sets: exercise.sets,
        frequency: exercise.frequency
    });

    const video_url = useRef(exercise.video_url);
    const video_id = useRef(exercise.video_id);

    const { exercise_name, description, reps, sets, frequency } = data;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dataInputChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const submitExercise = async (e) => {
        e.preventDefault();
        try {
            await onSubmitUpdatedVideo();
            const body = { exercise_name, description, reps, sets, frequency, video_url: video_url.current, video_id: video_id.current };
            const response =  await fetch(`${Constant.API_ENDPOINT}/exercise/item/${exercise.exercise_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();
            console.log(parseRes);
            setLoading(false);
            toast.success("Successfully Updated Exercise!");
            history.goBack();
            
        } catch (err) {
            console.error(err);
        }
    };

    const onSubmitUpdatedVideo = async () => {
        try {
            console.log(video_id);
            const body = { 'file': fileBase64String, 'public_id': video_id.current };
            const response =  await fetch(`${Constant.API_ENDPOINT}/exercise/video`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();
            video_url.current = parseRes.secure_url;
            video_id.current = parseRes.public_id;
        } catch (err) {
            console.error(err);
        }
    };

    const handleVideo = (e) => {

        function getBase64(file) {
            return new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => resolve(reader.result);
              reader.onerror = error => reject(error);
            });
        }

        getBase64(e.target.files[0]).then(
            data => {setFileBase64String(data);}
        );

        setVideo(URL.createObjectURL(e.target.files[0]));
    }

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
                    <h2 className="exercise-label">Edit exercise</h2>
                </div>

                {takingVideo? (
                <div className="select-video-container">
                    <ReactPlayer
                        url={video} 
                        width="100%"
                        height="200px"
                        controls
                    />
                    <input 
                        id="capture"
                        type="file"
                        capture="environment"
                        accept="video/*"
                        onChange={handleVideo}
                    />
                    <input
                        id="file-upload"
                        type="file" 
                        name="video"
                        accept="video/*" 
                        onChange={handleVideo}
                    />
                    <Button
                        className="btn-exercise-white"
                        size="large"
                        onClick={() => document.getElementById('file-upload').click()}
                    >
                        <Film  size={20} style={{margin: "1rem"}} />
                        Video options                    
                    </Button>
                    <Button
                        className="btn-exercise"
                        size="large"
                        onClick={() => setTakingvideo(false)}
                    >
                        Continue with selected
                    </Button>
                </div>

                    ):(
                <Form onSubmit={submitExercise} className="exercise-form" id="editExercise" >
                    <Form.Group as={Row} controlId="formExerciseName">
                        <Form.Label>Exercise name</Form.Label>
                        <Form.Control
                            type="text"
                            name="exercise_name"
                            size="lg"
                            value={data.exercise_name}
                            placeholder="Enter text"
                            onChange={dataInputChange}
                            style={{height: "5rem", width:"100%"}}
                        />
                    </Form.Group>
                    <Form.Group as={Row} controlId="formDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            style={{ height: '160px', resize: "none"}}
                            as="textarea"
                            type="text"
                            name="description"
                            size="lg"
                            value={data.description}
                            placeholder="Enter text"
                            onChange={dataInputChange}
                            
                        />
                    </Form.Group>

                    <Form.Group as={Row} controlId="formReps" >  
                        <InputGroup className="mb-3 mt-3" >
                            <Form.Label className="ml-10">
                                Reps
                            </Form.Label>
                            <div className="num-input-group">
                                <DashCircleFill 
                                    size={32} 
                                    style={{color: data.reps<=0?"#EFEFF0":"#FCB333"}} 
                                    onClick={() => {setData({ ...data, reps: parseInt(data.reps) -1 })}}
                                />
                                <Form.Control
                                    className="form-input"
                                    size="lg"
                                    type="number"
                                    min="0"
                                    name="reps"
                                    value={data.reps}
                                    onChange={dataInputChange}
                                />
                                <PlusCircleFill 
                                    size={32} 
                                    style={{color: "#FCB333"}} 
                                    onClick={() => {setData({ ...data, reps: parseInt(data.reps) + 1})}}
                                />
                            </div>                            
                        </InputGroup>                      
                    </Form.Group>

                    <Form.Group as={Row} controlId="formSets" >   
                        <InputGroup className="mb-3 mt-3" >
                            <Form.Label>
                                Sets
                            </Form.Label>
                            <div className="num-input-group">
                                <DashCircleFill 
                                    size={32} 
                                    style={{color: data.sets===0?"#EFEFF0":"#FCB333"}} 
                                    onClick={() => {setData({ ...data, sets: parseInt(data.sets) - 1})}}
                                />
                                <Form.Control
                                    className="form-input"
                                    size="lg"
                                    type="number"
                                    min="0"
                                    name="sets"
                                    value={data.sets}
                                    onChange={dataInputChange}
                                />
                                <PlusCircleFill 
                                    size={32} 
                                    style={{color: "#FCB333"}} 
                                    onClick={() => {setData({ ...data, sets: parseInt(data.sets) + 1})}}
                                />
                            </div>                            
                        </InputGroup>                       
                    </Form.Group>

                    <Form.Group as={Row} controlId="formFrequency" >  
                        <InputGroup className="mb-3 mt-3" >
                            <Form.Label>Frequency</Form.Label>
                            <div className="num-input-group">
                                <DashCircleFill 
                                    size={32} 
                                    style={{color: data.frequency===0?"#EFEFF0":"#FCB333"}} 
                                    onClick={() => {setData({ ...data, frequency: parseInt(data.frequency) -1 })}}
                                />
                                <Form.Control
                                    className="form-input"
                                    size="lg"
                                    type="number"
                                    min="0"
                                    name="frequency"
                                    value={data.frequency}
                                    onChange={dataInputChange}
                                />
                                <PlusCircleFill 
                                    size={32} 
                                    style={{color: "#FCB333"}} 
                                    onClick={() => {setData({ ...data, frequency: parseInt(data.frequency) + 1})}}
                                />
                            </div>                     
                        </InputGroup>                      
                    </Form.Group>

                    <Form.Group as={Row} controlId="formButton" role="form">
                        <InputGroup className="mb-1">
                           <Button 
                                className="btn-exercise"
                                size="large"
                                onClick={handleShow}
                            >
                                Assign to client
                            </Button> 
                        </InputGroup>
                    </Form.Group>
                    <Modal
                        show={show}
                        onHide={handleClose}
                        backdrop="static"
                        keyboard={false}
                        centered
                    >
                        <Modal.Header>
                            <Modal.Title className="modal-title" >Confirm you want to edit?</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <ExerciseCard exercise={data} />
                        </Modal.Body>

                        <Modal.Footer>
                            <Button 
                                className="btn-exercise"
                                form="editExercise"
                                variant="primary" 
                                type="submit" 
                                onClick={() => setLoading(true)} 
                            >
                                {loading? (
                                    <>
                                        <Spinner animation="border" />
                                    </>
                                    ) : (                                     
                                    "Yes"
                                )}
                            </Button>
                            <Button 
                                className="btn-exercise"
                                variant="secondary" 
                                onClick={handleClose} 
                            >
                                No, return to edit
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Form>
                )}
            </div>
        </Fragment>
    );
};

export default EditExercise;