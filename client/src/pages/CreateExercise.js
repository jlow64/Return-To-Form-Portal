import React, { Fragment, useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { toast } from "react-toastify";
import { useHistory, useLocation } from "react-router-dom";

import { Form, Button, Row, InputGroup, Modal, Spinner } from "react-bootstrap";
import { BoxArrowRight, ChevronLeft, DashCircleFill, PlusCircleFill, Film } from "react-bootstrap-icons";

import * as Constant from "../Data/Constants";
import logo from "../logos/rtf-logo-grey.png";
import "../styles/CreateExercise.css";
import ExerciseCard from "../components/ExerciseCard";


const CreateExercise = ({ logout }) => {
    const [takingVideo, setTakingvideo] = useState(true);
    const [video, setVideo] = useState();
    const [loading, setLoading] = useState(false);
    const [fileBase64String, setFileBase64String] = useState("");
    const video_url = useRef("");
    const video_id = useRef("");
    const location = useLocation();
    const history = useHistory();

    const patient_id = location.state?.patient_id;

    const [data, setData] = useState({
        exercise_name: "",
        description: "",
        reps: 0,
        sets: 0,
        frequency: 0
    });

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
            await onSubmitVideo();
            var body = { patient_id, exercise_name, description, reps, sets, frequency, video_url: video_url.current, video_id: video_id.current };
            const response =  await fetch(`${Constant.API_ENDPOINT}/exercise/item`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
      
            await response.json();
            setLoading(false);
            // console.log(parseRes);
            toast.success("Successfully Created Exercise!");
            history.goBack();
        } catch (err) {
            console.error(err);
        }
    };

    const onSubmitVideo = async () => {
        try {
            const body = { 'file': fileBase64String };
            const response =  await fetch(`${Constant.API_ENDPOINT}/exercise/video`, {
                method: "POST",
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
                            style={{height: 40, width:"100%"}}
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

                    <Form.Group as={Row} controlId="formReps" role="form" style={{border: "1px solid #C9C9C9", borderRadius: "1rem", height: "50px"}} >  
                        <InputGroup className="mb-3 mt-3" >
                            <Form.Label style={{marginTop: '0.5rem', marginLeft: '2rem'}}>
                                Reps
                            </Form.Label>
                            <div className="num-input-group">
                                <DashCircleFill 
                                    size={28} 
                                    style={{color: data.reps===0?"#EFEFF0":"#FCB333", marginRight: '2rem'}} 
                                    onClick={() => {setData({ ...data, reps: parseInt(data.reps) <= 0? 0 : parseInt(data.reps) -1 })}}
                                />
                                <Form.Control
                                    className="form-input"
                                    style={{marginRight: '2rem'}}
                                    size="lg"
                                    type="number"
                                    min="0"
                                    name="reps"
                                    value={data.reps}
                                    onChange={dataInputChange}
                                />
                                <PlusCircleFill 
                                    size={28} 
                                    style={{color: "#FCB333"}} 
                                    onClick={() => {setData({ ...data, reps: parseInt(data.reps) + 1})}}
                                />
                            </div>                            
                        </InputGroup>                      
                    </Form.Group>

                    <Form.Group as={Row} controlId="formSets" role="form" style={{border: "1px solid #C9C9C9", borderRadius: "1rem", height: "50px"}} >   
                        <InputGroup className="mb-3 mt-3" >
                            <Form.Label style={{marginTop: '0.5rem', marginLeft: '2rem'}}>
                                Sets
                            </Form.Label>
                            <div className="num-input-group">
                                <DashCircleFill 
                                    size={28} 
                                    style={{color: data.sets===0?"#EFEFF0":"#FCB333", marginRight: '2rem'}} 
                                    onClick={() => {setData({ ...data, sets: parseInt(data.sets) <= 0? 0 : parseInt(data.sets) - 1})}}
                                />
                                <Form.Control
                                    className="form-input"
                                    style={{marginRight: '2rem'}}
                                    size="lg"
                                    type="number"
                                    min="0"
                                    name="sets"
                                    value={data.sets}
                                    onChange={dataInputChange}
                                />
                                <PlusCircleFill 
                                    size={28} 
                                    style={{color: "#FCB333"}} 
                                    onClick={() => {setData({ ...data, sets: parseInt(data.sets) + 1})}}
                                />
                            </div>                            
                        </InputGroup>                       
                    </Form.Group>

                    <Form.Group as={Row} controlId="formFrequency" role="form" style={{border: "1px solid #C9C9C9", borderRadius: "1rem", height: '50px'}} >  
                        <InputGroup className="mb-3 mt-3" >
                            <Form.Label style={{marginTop: '0.5rem', marginLeft: '2rem'}}>
                                Frequency
                            </Form.Label>
                            <div className="num-input-group">
                                <DashCircleFill 
                                    size={28} 
                                    style={{color: data.frequency===0?"#EFEFF0":"#FCB333", marginRight: '2rem'}} 
                                    onClick={() => {setData({ ...data, frequency: parseInt(data.frequency) <= 0? 0 : parseInt(data.frequency) -1 })}}
                                />
                                <Form.Control
                                    className="form-input"
                                    style={{marginRight: '2rem'}}
                                    size="lg"
                                    type="number"
                                    min="0"
                                    name="frequency"
                                    value={data.frequency}
                                    onChange={dataInputChange}
                                />
                                <PlusCircleFill 
                                    size={28} 
                                    style={{color: "#FCB333"}} 
                                    onClick={() => {setData({ ...data, frequency: parseInt(data.frequency) + 1})}}
                                />
                            </div>                     
                        </InputGroup>                      
                    </Form.Group>

                    <Form.Group as={Row} controlId="formButton" role="form">
                        <InputGroup className="mb-2">
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

                        <Modal.Body style={{display: "flex-row", justifyContent: "center", alignItems: "center"}}>
                            <ExerciseCard exercise={data} />
                        </Modal.Body>

                        <Modal.Footer>
                            <Button 
                                className="btn-exercise"
                                form="createExercise"
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

export default CreateExercise;