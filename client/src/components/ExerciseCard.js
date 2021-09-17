import React, { Fragment, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Card, Modal, Button } from "react-bootstrap";
import { ThreeDotsVertical, TrashFill, PenFill } from "react-bootstrap-icons" ;
import "../styles/ExerciseCard.css";

const ExerciseCard = ({ refreshExercises, exercise, showOptions }) => {

    const [show, setShow] = useState({
        editModal: null,
        deleteModal: null
    });

    const deleteExercise = async () => {
         try {
            const response = await fetch(`http://192.168.1.79:5000/exercise/item/${exercise.exercise_id}`, {
                method: "DELETE"
            });
            await response.json();
            refreshExercises();
            toast.success("Exercise deleted!");
         } catch (err) {
            console.error(err);
         }
    };

    const deleteVideo = async () => {
        try {
            const body = { 'public_id': exercise.video_id}
            const response = await fetch("http://192.168.1.79:5000/exercise/video", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            await response.json();

        } catch (err) {
            console.error(err);
        }
    };

    /* Make edit page and delete section from three vertical dots from a modal */
    return (
        <Fragment>
            <Card className="exercise-card-container" >   
                <Card.Body style={{display: 'flex'}}>
                    <img 
                        src={`https://res.cloudinary.com/return-to-form-cloud/video/upload/so_4.0/bo_1px_solid_black,r_max/${exercise.video_id}.jpg`} 
                        alt={"Video thumbnail"} 
                        style={{height: 50, width: 50, alignItems: 'center', marginRight: '1rem', marginTop: 2}} 
                    />
                
                    <div style={{ alignContent:'center', margin: 2, height: '50px'}}>
                        <p>{exercise.exercise_name}</p>
                        <div className="exercise-card-content" >    
                            { `Reps:${exercise.reps} Sets:${exercise.sets} Frequency:${exercise.frequency}` }
                        </div>
                    </div>
                    
                    {showOptions? (<ThreeDotsVertical 
                        style={{float: "right", alignItems: "center", marginTop: "2rem", marginLeft: "3rem"}} 
                        size={16} 
                        onClick={() => {
                            setShow({...show, editModal:true, deleteModal:false})
                        }}
                    />):
                        ""
                    }

                </Card.Body> 
            </Card>
            <Modal
                show={show.editModal}
                onHide={() => {
                        setShow({...show, editModal:false})
                    }
                }
                backdrop="static"
                keyboard={false}
                centered
                style={{border: "none", minHeight: "32rem"}}
            >
                <Modal.Body className="edit-modal-text">
                    <Link 
                        style={{textDecoration: "none", color: "#353A3E"}}
                        to={{
                        pathname: "/dashboard/patient/edit-exercise",
                        state: { exercise: exercise }
                    }}>
                        <div className="modal-text-row">
                            <PenFill style={{marginRight: "2rem"}} /> Edit Exercise
                        </div>
                    </Link>
                    <div className="modal-text-row" style={{margin: "1rem"}}
                        onClick={() => {
                            setShow({...show, deleteModal:true, editModal:false});
                        }}
                    >
                        <TrashFill style={{marginRight: "2rem"}} />    Delete
                    </div>                                 
                </Modal.Body>

                <Modal.Footer>
                    <Button 
                        className="btn-exercise"
                        variant="secondary" 
                        onClick={() => {
                            setShow({...show, editModal:false});
                        }
                    } 
                    >
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>  

            <Modal
                show={show.deleteModal}
                onHide={() => {
                        setShow({...show, deleteModal:false});
                    }
                }
                backdrop="static"
                keyboard={false}
                centered
                style={{border: "none", minHeight: "32rem"}}
            >
                <Modal.Header>
                    <Modal.Title className="modal-title" >Confirm you want to delete?</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <ExerciseCard exercise={exercise} />
                </Modal.Body>

                <Modal.Footer>
                    <Button 
                        className="btn-exercise"
                        variant="primary" 
                        type="submit" 
                        onClick={() => {
                            deleteExercise();
                            deleteVideo();
                            setShow({...show, deleteModal:false});
                        }} 
                    >
                        Yes, delete
                    </Button>
                    <Button 
                        className="btn-exercise-exit"
                        variant="secondary" 
                        onClick={() => {
                            setShow({...show, deleteModal:false});
                        }} 
                    >
                        No, return to exercises
                    </Button>
                </Modal.Footer>
            </Modal>           
        </Fragment>
    );
};

export default ExerciseCard;