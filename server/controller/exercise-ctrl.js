const pool = require("../db");

getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await pool.query("SELECT * FROM users WHERE patient_id = $1", [id]);

        res.json(user.rows);
    } catch (err) {
        console.error(err);
    }
};

createExercise = async(req, res) => {
    try {
        const { patient_id, description, exercise_name, sets, reps, frequency  } = req.body;
        const newItem = await pool.query(
            "INSERT INTO exercises (patient_id, description, exercise_name, sets, reps, frequency) VALUES($1, $2, $3, $4, $5, $6) RETURNING *", 
            [patient_id, description, exercise_name, sets, reps, frequency]
        );

        res.json(newItem.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
};

// get all exercise items

getExercises = async(req, res) => {
    try {
        const allItems = await pool.query("SELECT * FROM exercises");
        res.json(allItems.rows);
    } catch (err) {
        console.error(err.message);
    }
};

getUserExercises = async (req, res) => {
    try {
        const { id } = req.params;
        const userExercises = await pool.query("SELECT * FROM exercises WHERE patient_id = $1", [id]);

        res.json(userExercises.rows);
    } catch (err) {
        console.error(err.message);
    }
}

// get an exercise item

getExerciseItem = async(req, res) => {
    try {
        const { id } = req.params;
        const items = await pool.query("SELECT * FROM exercises WHERE exercise_id = $1", [id]);

        res.json(items.rows);
    } catch(err) {
        console.error(err.message);
    }
};

// update an exercise item

updateExercise = async(req, res) => {
    try {
        const { id } = req.params;
        const { description, exercise_name, sets, reps, frequency } = req.body;
        const updateItem = await pool.query(
            "UPDATE exercises SET description = $1, exercise_name = $2, sets = $3, reps = $4, frequency = $5 WHERE exercise_id = $6", 
            [description, exercise_name, sets, reps, frequency, id]
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
        const deleteItem = await pool.query("DELETE FROM exercises WHERE exercise_id = $1", [id]);

        res.json("Item was deleted!");
    } catch (err) {
        console.error(err.message);
    }
};

module.exports = {
    getUser,
    createExercise,
    getExercises,
    getExerciseItem,
    getUserExercises,
    updateExercise,
    deleteExercise
}
