import React, { Fragment, useEffect, useState } from "react";

const EditItem = ({ item }) => {
    const [description, setDescription] = useState(item.description);

    // edit description function
    
    const editDescription = async e => {
        e.preventDefault();
        try {
            const body = { description };
            const response = await fetch(`http://localhost:5000/item/${item.item_id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            window.location = "/";
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
                onClick={() => {setDescription(item.description)}} 
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Edit Item</h4>
                            <button 
                                type="button" 
                                className="close" 
                                data-dismiss="modal" 
                                onClick={() => {setDescription(item.description)}} 
                            >
                                &times;
                            </button>
                        </div>

                        <div className="modal-body">
                            <input 
                                type="text" 
                                className="form-control" 
                                value={description} 
                                onChange={e => setDescription(e.target.value)} 
                            />
                        </div>

                        <div className="modal-footer">
                            <button 
                                type="button" 
                                className="btn btn-warning" 
                                data-dismiss="modal"
                                onClick={e => editDescription(e)}
                            >
                                Edit
                            </button>
                            <button 
                                type="button" 
                                className="btn btn-danger" 
                                data-dismiss="modal"
                                onClick={() => {setDescription(item.description)}} 
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