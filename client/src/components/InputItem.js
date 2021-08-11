import React, { Fragment, useState } from "react";

const InputItem = () => {

    const [exercise_name, setName] = useState("");

    const onSubmitForm = async(e) => {
        e.preventDefault();
        try {
            const body = { exercise_name };
            const response =  await fetch("http://localhost:5000/exercise/item", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            console.log(response);
            window.location = "/dashboard";
        } catch (err) {
            console.error(err.message);
        }
    }

    return (
        <Fragment>
            <form className="d-flex mt-5" onSubmit={onSubmitForm} >
                <input 
                    type="text" 
                    className="form-control patient-input" 
                    value={exercise_name} 
                    onChange={e => setName(e.target.value)} 
                />
                <button className="btn btn-success">Add</button>
            </form>
        </Fragment>
    );
};

export default InputItem;