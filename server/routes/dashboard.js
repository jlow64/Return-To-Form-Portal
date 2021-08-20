const router = require("express").Router();
const fetch = require("node-fetch");
const pool = require("../db");
const authorization = require("../middleware/authorization");
require('dotenv').config();

router.get("/", authorization, async (req, res) => {
    try {
        
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

router.get("/patients", async (req, res) => {
    try {
        const API_KEY = Buffer.from(process.env.CLINIKO_API + ':').toString('base64');
        const patients = await fetch('https://api.au1.cliniko.com/v1/patients', {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${API_KEY}`,
                'Accept': 'application/json',
                'User-Agent': 'Return-To-Form (justinl@missionreadyhq.com)'
            }
        });

        const parseRes = await patients.json();

        res.json(parseRes);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

// router.post("/appointment", async (req, res) => {
//     try {
//         const { url } = req.body;
//         const API_KEY = Buffer.from(process.env.CLINIKO_API + ':').toString('base64');
//         const appointments = await fetch(url, {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Basic ${API_KEY}`,
//                 'Accept': 'application/json',
//                 'User-Agent': 'Return-To-Form (justinl@missionreadyhq.com)'
//             }
//         });

//         const parseRes = await appointments.json();

//         if (parseRes.appointments.length === 0) {
//             res.json({"message":"no appointments"});
//         } else {
//             const appointmentsList = parseRes.appointments;
//             const times = await fetch(`https://api.au1.cliniko.com/v1/individual_appointments/${appointmentsList[0].id}`, {
//                 method: 'GET',
//                 headers: {
//                     'Authorization': `Basic ${API_KEY}`,
//                     'Accept': 'application/json',
//                     'User-Agent': 'Return-To-Form (justinl@missionreadyhq.com)'
//                 }
//             });

//             const parseTime = await times.json();

//             res.json(parseTime);
//         }

        
//     } catch (err) {
//         console.error(err.message);
//         res.status(500).json("Server Error or no current appointments");
//     }
// });

router.get("/appointments", async (req, res) => {
    try {
        const API_KEY = Buffer.from(process.env.CLINIKO_API + ':').toString('base64');
        const appointments = await fetch("https://api.au1.cliniko.com/v1/individual_appointments", {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${API_KEY}`,
                'Accept': 'application/json',
                'User-Agent': 'Return-To-Form (justinl@missionreadyhq.com)'
            }
        });

        const parseRes = await appointments.json();
        res.json(parseRes);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error or no current appointments");
    }
});

module.exports = router;