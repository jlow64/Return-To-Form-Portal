const ExerciseCtrl = require("../controller/exercise-ctrl");
const express = require('express');
const router = express.Router();

// create exercise item

router.post("/item", ExerciseCtrl.createExercise);

// get all exercise items

router.get("/items", ExerciseCtrl.getExercises);

// get an exercise item

router.get("/item/:id", ExerciseCtrl.getExerciseItem);

// update an exercise item

router.put("/item/:id", ExerciseCtrl.updateExercise);

// delete an exercise item

router.delete("/item/:id", ExerciseCtrl.deleteExercise);

module.exports = router;
