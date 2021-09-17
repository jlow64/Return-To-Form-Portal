const express =  require("express");
const router = express.Router();
const AuthCtrl = require("../controller/auth-ctrl");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

// registering and login

router.post("/register", validInfo, AuthCtrl.reqAuth);

router.post("/login", validInfo, AuthCtrl.reqLogin);

router.get("/is-verify", authorization, AuthCtrl.reqVerify);

router.get("/logout", AuthCtrl.reqLogout);

module.exports = router;