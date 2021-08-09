const router = require("express").Router();
const fetch = require("node-fetch");
const pool = require("../db");
const authorization = require("../middleware/authorization");
require('dotenv').config();

router.get("/", authorization, async (req, res) => {
    try {
        
        // res.json(req.user);

        const user = await pool.query(
            "SELECT first_name FROM users WHERE user_id = $1", 
            [req.user]
        );
        
        res.json(user.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

router.get("/cliniko", async (req, res) => {
    try {
        const API_KEY = Buffer.from(process.env.CLINIKO_API + ':').toString('base64');
        const users = await fetch('https://api.au1.cliniko.com/v1/users', {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${API_KEY}`,
                'Accept': 'application/json',
                'User-Agent': 'Return-To-Form (justinl@missionreadyhq.com)'
            }
        });

        const parseRes = await users.json();

        res.json(parseRes);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

module.exports = router;