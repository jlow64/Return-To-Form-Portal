const jwt = require("jsonwebtoken");
require('dotenv').config();

function jwtGenerator(user_id, rememberMe) {
    const tokenExpTime = rememberMe? "30d" : "1hr" ;
    const payload = {
        user: user_id
    }

    return jwt.sign(payload, process.env.jwtSecret, {expiresIn: tokenExpTime});
}

module.exports = jwtGenerator;