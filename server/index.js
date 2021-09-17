const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

// middleware
app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use(cookieParser());

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