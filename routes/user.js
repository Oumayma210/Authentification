//require express
const express = require("express");
const { signup, signin } = require("../controllers/user");
const isAuth = require("../middleware/user");
const {
    registerValidation,
    validation,
    loginValidation,
} = require("../middleware/validator");
//create instance
const router = express.Router();
//Authentification
//sign up
router.post("/signup", registerValidation(), validation, signup);
//sign in
router.post("/signin", loginValidation(), validation, signin);
//current user
router.get("/current", isAuth, (req, res) => {
    res.send(req.user);
});

module.exports = router;
