import React, { Fragment, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory, useLocation } from "react-router-dom";

import { Form, Button, Row, InputGroup, Modal } from "react-bootstrap";
import { BoxArrowRight, ChevronLeft, DashCircleFill, PlusCircleFill, Film } from "react-bootstrap-icons";

import ReactPlayer from "react-player";
import logo from "../logos/rtf-logo-grey.png";
import "../styles/CreateExercise.css";
import ExerciseCard from "../components/ExerciseCard";


const CreateExercise = ({ setAuth }) => {
    const [takingVideo, setTakingvideo] = useState(true);
    const [video, setVideo] = useState();
    const [fileBase64String, setFileBase64String] = useState("");
    const [video_url, setVideo_url] = useState("");
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

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const logout = async (e) => {
        e.preventDefault();
        try {
            sessionStorage.removeItem("token");
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
            onSubmitVideo(function() {
                console.log("finished");
            });
            const body = { patient_id, exercise_name, description, reps, sets, frequency, video_url  };
            const response =  await fetch("http://192.168.1.79:5000/exercise/item", {
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

    const onSubmitVideo = async (_callback) => {
        try {
            const body = { 'file': fileBase64String };
            const response =  await fetch("http://192.168.1.79:5000/exercise/video", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            const parseRes = await response.json();

            console.log(parseRes.secure_url);

            setVideo_url(parseRes.secure_url);

            return parseRes.secure_url;

            _callback();
            
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

    useEffect(() => {
        document.getElementById('capture').click();
    }, []);

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
                
                <Form onSubmit={submitExercise} className="exercise-form" id="createExercise" >
                    <Form.Group as={Row} controlId="formExerciseName" role="form" >
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
                    <Form.Group as={Row} controlId="formDescription" role="form" >
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

                    <Form.Group as={Row} controlId="formReps" role="form" style={{border: "1px solid #C9C9C9", borderRadius: "1rem", display: "flex"}} >  
                        <InputGroup className="mb-3 mt-3" >
                            <Form.Label className="ml-5 ml-8" >
                                Reps
                            </Form.Label>
                            <div className="num-input-group">
                                <DashCircleFill 
                                    size={32} 
                                    style={{color: data.reps===0?"#EFEFF0":"#FCB333", marginLeft: "1rem"}} 
                                    onClick={() => {setData({ ...data, reps: parseInt(data.reps) <= 0? 0 : parseInt(data.reps) -1 })}}
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

                    <Form.Group as={Row} controlId="formSets" role="form" style={{border: "1px solid #C9C9C9", borderRadius: "1rem", display: "flex"}} >   
                        <InputGroup className="mb-3 mt-3" >
                            <Form.Label>
                                Sets
                            </Form.Label>
                            <div className="num-input-group">
                                <DashCircleFill 
                                    size={32} 
                                    style={{color: data.sets===0?"#EFEFF0":"#FCB333"}} 
                                    onClick={() => {setData({ ...data, sets: parseInt(data.sets) <= 0? 0 : parseInt(data.sets) - 1})}}
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

                    <Form.Group as={Row} controlId="formFrequency" role="form" style={{border: "1px solid #C9C9C9", borderRadius: "1rem", display: "flex"}} >  
                        <InputGroup className="mb-3 mt-3" >
                            <Form.Label>Frequency</Form.Label>
                            <div className="num-input-group">
                                <DashCircleFill 
                                    size={32} 
                                    style={{color: data.frequency===0?"#EFEFF0":"#FCB333"}} 
                                    onClick={() => {setData({ ...data, frequency: parseInt(data.frequency) <= 0? 0 : parseInt(data.frequency) -1 })}}
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
                            <Modal.Title className="modal-title" >Confirm you want to assign?</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <ExerciseCard exercise={data} />
                        </Modal.Body>

                        <Modal.Footer>
                            <Button 
                                className="btn-exercise"
                                form="createExercise"
                                variant="primary"
                                type="submit" 
                                onClick={() => history.goBack()} 
                            >
                                Yes
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

export default CreateExercise;