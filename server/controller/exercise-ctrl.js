const pool = require("../db");
const cloudinary = require("cloudinary").v2;
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API, 
    api_secret: process.env.CLOUDINARY_SECRET 
});
require('dotenv').config();

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
        const { patient_id, exercise_name, description, sets, reps, frequency, video_url, video_id  } = req.body;
        const newItem = await pool.query(
            "INSERT INTO exercises (patient_id, exercise_name, description, sets, reps, frequency, video_url, video_id) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", 
            [patient_id, exercise_name, description, sets, reps, frequency, video_url, video_id]
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
        const { exercise_name, description, sets, reps, frequency, video_url, video_id } = req.body;
        const updateItem = await pool.query(
            "UPDATE exercises SET exercise_name = $1, description = $2, sets = $3, reps = $4, frequency = $5, video_url = $6, video_id = $7 WHERE exercise_id = $8", 
            [exercise_name, description, sets, reps, frequency, video_url, video_id, id]
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

// upload exercise video

uploadVideo = async(req, res) => {
    try {
        const { file } = req.body;
        cloudinary.uploader.unsigned_upload(file, 'test_preset',
            {
                resource_type: "video"
            },
        function(error, result) {
            console.log(result, error);
            res.json(result);
        });

    } catch (err) {
        console.error(err.message);
    }
}

updateVideo = async(req, res) => {
    try {
        const { file, public_id } = req.body;
        cloudinary.uploader.destroy(public_id, 
            {
                resource_type: 'video'
            }, 
        function(error,result) {
            console.log(result, error); 
        });

        cloudinary.uploader.unsigned_upload(file, 'test_preset',
            {
                resource_type: "video"
            },
        function(error, result) {
            console.log(result, error);
            res.json(result);
        });

    } catch (err) {
        console.error(err.message);
    }
}

module.exports = {
    getUser,
    createExercise,
    getExercises,
    getExerciseItem,
    getUserExercises,
    updateExercise,
    deleteExercise,
    uploadVideo,
    updateVideo
}
