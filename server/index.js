const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors({credentials: true}));
// origin: ['http://localhost:3000', 'http://192.168.1.79:3000', '']
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

if (process.env.NODE_ENV === 'production') {
    app.use(express.static( 'client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(port, () => {
    console.log("Server has started on port 5000");
});