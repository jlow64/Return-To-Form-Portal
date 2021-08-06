import React, { Fragment, useEffect, useState } from "react";
import EditItem from "./EditItem";

const ListItems = () => {
    const [items, setItems] = useState([]);

    // delete item function

    const deleteItem = async (id) => {
        try {
            const deleteItem = await fetch(`http://localhost:5000/exercise/item/${id}`, {
                method: "DELETE"
            });

            setItems(items.filter(item => item.item_id !== id));
        } catch (err) {
            console.error(err.message);
        }
    };

    const getItems = async () => {
        try {

            const response = await fetch("http://localhost:5000/exercise/items");
            const jsonData = await response.json();
            
            setItems(jsonData);
        } catch (err) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        getItems();
    }, []);

    return(
        <Fragment>
            {" "}
            <table className="table mt-5 text-center table-hover">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Sets</th>
                        <th>Reps</th>
                        <th>Frequency</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item.item_id}>
                            <td>{item.exercise_name}</td>
                            <td>{item.sets}</td>
                            <td>{item.reps}</td>
                            <td>{item.frequency}</td>
                            <td>
                                <EditItem item={item} />
                            </td>
                            <td>
                                <button 
                                    className="btn btn-danger" 
                                    onClick={() => deleteItem(item.item_id)} 
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Fragment>
    );
}

export default ListItems;