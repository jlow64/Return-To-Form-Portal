import React, { Fragment, useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { Card, Modal, Button } from "react-bootstrap";
import { ThreeDotsVertical, TrashFill, PenFill } from "react-bootstrap-icons" ;
import "../styles/ExerciseCard.css";

const ExerciseCard = ({ exercise_list, refreshExercises, exercise, showOptions }) => {

    const [show, setShow] = useState({
        editModal: null,
        deleteModal: null
    });

    const deleteExercise = async () => {
         try {
            const response = await fetch(`http://localhost:5000/exercise/item/${exercise.exercise_id}`, {
                method: "DELETE"
            });

            refreshExercises(exercise_list, exercise.exercise_id);
            toast.success("Exercise deleted!");
         } catch (err) {
             console.error(err);
         }
    };

    /* Make edit page and delete section from three vertical dots from a modal */
    return (
        <Fragment>
            <Card className="exercise-card-container" >   
                <Card.Body>
                    {exercise.exercise_name}
                    {showOptions? (<ThreeDotsVertical 
                        style={{float: "right", alignItems: "center", marginTop: "2rem"}} 
                        size={16} 
                        onClick={() => {
                            setShow({...show, editModal:true, deleteModal:false})
                        }}
                    />):
                        ""
                    }
                    <Card.Title className="exercise-card-content">    
                        { `Reps:${exercise.reps} ` + `Sets:${exercise.sets} ` + `Frequency:${exercise.frequency}` }
                    </Card.Title>
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
                        state: { exercise_id: exercise.exercise_id }
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