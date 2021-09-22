const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async ( req, res, next) => {
    try {
        // const token = req.header("jwt_token");
        const token = req.cookies.access_token;
        if (!token) {
            return res.status(403).json({ msg: "Authorization Denied"});
        }
        const payload = jwt.verify(token, process.env.jwtSecret);
        req.user = payload.user;
        next();
    } catch (err) {
        console.error(err.message);
        return res.status(403).json({ msg: "Invalid Token!"});
    }
}