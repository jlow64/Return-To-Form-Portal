const ExerciseCtrl = require("../controller/exercise-ctrl");
const express = require('express');
const router = express.Router();

// get users

router.get("/user/:id", ExerciseCtrl.getUser);

// create exercise item

router.post("/item", ExerciseCtrl.createExercise);

// get all exercise items

router.get("/items", ExerciseCtrl.getExercises);

// get an exercise item

router.get("/item/:id", ExerciseCtrl.getExerciseItem);

// get an exercise item

router.get("/user-items/:id", ExerciseCtrl.getUserExercises);

// update an exercise item

router.put("/item/:id", ExerciseCtrl.updateExercise);

// delete an exercise item

router.delete("/item/:id", ExerciseCtrl.deleteExercise);

module.exports = router;
