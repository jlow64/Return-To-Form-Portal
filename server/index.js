const express = require("express");
const cors = require("cors");
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// Routes

// register and login routes

app.use("/auth", require("./routes/jwtAuth"));

// dashboard routes

app.use("/dashboard", require("./routes/dashboard"));

// exercise item route

app.use("/exercise", require("./routes/exercise-route"));

app.listen(5000, () => {
    console.log("Server has started on port 5000");
});