const pool = require("../db");
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");

reqAuth = async (req, res) => {
    try {
        
        const {patient_id, first_name, last_name, email, password, role } = req.body;

        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

        if (user.rows.length !== 0) {
            return res.status(401).send("User already exists");
        }

        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query(
            "INSERT INTO users (patient_id, first_name, last_name, email, password, role) values ($1, $2, $3, $4, $5, $6) RETURNING *", 
            [patient_id, first_name, last_name, email, bcryptPassword, role]
        );

        const token = jwtGenerator(newUser.rows[0].user_id);

        res.json({token});

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
};

reqLogin = async (req, res) => {
    const { email, password, rememberMe } = req.body;

    try {

        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        
        if (user.rows.length === 0) {
            return res.status(401).send("Password or Email is incorrect");
        }

        if (user.rows[0].role !== "admin") {
            return res.status(401).json("Unauthorised User");
        }

        const validPassword = await bcrypt.compare(password, user.rows[0].password);

        console.log(validPassword);

        if (!validPassword) {
            return res.status(401).json("Password or Email is incorrect");
        }

        const token = jwtGenerator(user.rows[0].user_id, rememberMe);

        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}

reqVerify = async (req, res) => {
    try {
        res.json(true);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
}

module.exports = {
    reqAuth,
    reqLogin,
    reqVerify
}