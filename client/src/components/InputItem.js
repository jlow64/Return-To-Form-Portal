import React, { Fragment, useState } from "react";

const InputItem = () => {

    const [description, setDescription] = useState("");

    const onSubmitForm = async(e) => {
        e.preventDefault();
        try {
            const body = { description };
            const response = fetch("http://localhost:5000/exercise/item", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            window.location = "/dashboard";
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <form className="d-flex mt-4" onSubmit={onSubmitForm} >
                <input 
                    type="text" 
                    className="form-control" 
                    value={description} 
                    onChange={e => setDescription(e.target.value)} 
                />
                <button className="btn btn-success" style={{marginLeft: 15}} >Add</button>
            </form>
        </Fragment>
    );
};

export default InputItem;