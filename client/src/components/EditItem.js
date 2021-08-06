import React, { Fragment, useState } from "react";

const EditItem = ({ item }) => {
    const [description, setDescription] = useState(item.description);
    const [exercise_name, setName] = useState(item.exercise_name);
    const [sets, changeSet] = useState(item.sets);
    const [reps, setreps] = useState(item.reps);
    const [frequency, setFrequency] = useState(item.frequency);

    // edit description function
    
    const editExercise = async e => {
        e.preventDefault();
        try {
            const body = { exercise_name, description, sets, reps, frequency };
            const response = await fetch(`http://localhost:5000/exercise/item/${item.item_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            window.location = "/dashboard";
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <Fragment>
            <button 
                type="button" 
                className="btn btn-warning" 
                data-toggle="modal" 
                data-target={`#id${item.item_id}`}
            >
                Edit
            </button>

            <div 
                className="modal" 
                id={`id${item.item_id}`}
                onClick={() => {setDescription(item.description);setName(item.exercise_name);changeSet(item.sets);setreps(item.reps);setFrequency(item.frequency)}} 
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Edit Item</h4>
                            <button 
                                type="button" 
                                className="close" 
                                data-dismiss="modal" 
                                onClick={() => {setDescription(item.description);setName(item.exercise_name);changeSet(item.sets);setreps(item.reps);setFrequency(item.frequency)}} 
                            >
                                &times;
                            </button>
                        </div>

                        <div className="modal-body">
                            <input 
                                type="text" 
                                className="form-control" 
                                value={exercise_name} 
                                onChange={e => setName(e.target.value)} 
                            />
                        </div>

                        <div className="modal-footer">
                            <button 
                                type="button" 
                                className="btn btn-warning" 
                                data-dismiss="modal"
                                onClick={e => editExercise(e)}
                            >
                                Edit
                            </button>
                            <button 
                                type="button" 
                                className="btn btn-danger" 
                                data-dismiss="modal"
                                onClick={() => {setDescription(item.description);setName(item.exercise_name);changeSet(item.sets);setreps(item.reps);setFrequency(item.frequency)}} 
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default EditItem;