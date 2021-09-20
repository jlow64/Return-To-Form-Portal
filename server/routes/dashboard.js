const router = require("express").Router();
const fetch = require("node-fetch");
const pool = require("../db");
const authorization = require("../middleware/authorization");
require('dotenv').config();

router.get("/patients/:term",  authorization, async (req, res) => {
    try {
        const { term } = req.params;
        const API_KEY = Buffer.from(process.env.CLINIKO_API + ':').toString('base64');
        const first_name = await fetch(`https://api.au1.cliniko.com/v1/patients?q=first_name:~${term}`, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${API_KEY}`,
                'Accept': 'application/json',
                'User-Agent': 'Return-To-Form (justinl@missionreadyhq.com)'
            }
        });

        const last_name = await fetch(`https://api.au1.cliniko.com/v1/patients?q=last_name:~${term}`, {
            method: 'GET',
            headers: {
                'Authorization': `Basic ${API_KEY}`,
                'Accept': 'application/json',
                'User-Agent': 'Return-To-Form (justinl@missionreadyhq.com)'
            }
        });

        const parseFname = await first_name.json();
        const parseLname = await last_name.json();
        const result_array = Object.assign(parseFname.patients, parseLname.patients);
        console.log(result_array);
        res.json(parseFname);
    } catch (err) {
        console.error(err.message);
        res.status(500).json("Server Error");
    }
});

router.get("/appointments", authorization, async (req, res) => {
    try {
        const API_KEY = Buffer.from(process.env.CLINIKO_API + ':').toString('base64');
        const date = new Date().toISOString();
        const appointments = await fetch(`https://api.au1.cliniko.com/v1/individual_appointments?q=starts_at:>${date}`, {
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