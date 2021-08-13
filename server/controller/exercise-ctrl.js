const pool = require("../db");

createExercise = async(req, res) => {
    try {
        const { exercise_name } = req.body;
        const newItem = await pool.query(
            "INSERT INTO physio_item (exercise_name) VALUES($1) RETURNING *", 
            [exercise_name]
        );

        res.json(newItem.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
};

// get all exercise items

getExercises = async(req, res) => {
    try {
        const allItems = await pool.query("SELECT * FROM physio_item");
        res.json(allItems.rows);
    } catch (err) {
        console.error(err.message);
    }
};

// get an exercise item

getExerciseItem = async(req, res) => {
    try {
        const { id } = req.params;
        const items = await pool.query("SELECT * FROM physio_item WHERE item_id = $1", [id]);

        res.json(items.rows);
    } catch(err) {
        console.error(err.message);
    }
};

// update an exercise item

updateExercise = async(req, res) => {
    try {
        const { id } = req.params;
        const { exercise_name } = req.body;
        const updateItem = await pool.query(
            "UPDATE physio_item SET exercise_name = $1 WHERE item_id = $2", 
            [exercise_name, id]
        );

        res.json("Item was updated!");
    } catch (err) {
        console.error(err.message);
    }
};

// delete an exercise item

deleteExercise = async(req, res) => {
    try {
        const { id } = req.params;
        const deleteItem = await pool.query("DELETE FROM physio_item WHERE item_id = $1", [id]);

        res.json("Item was deleted!");
    } catch (err) {
        console.error(err.message);
    }
};

module.exports = {
    createExercise,
    getExercises,
    getExerciseItem,
    updateExercise,
    deleteExercise
}
