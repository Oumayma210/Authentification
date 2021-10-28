//this file use to use express validator

const { validationResult, check } = require("express-validator");

//creation of 2 tables for signup&sign in
exports.registerValidation = () => [
    check("name","name is required!").not().isEmpty(),
    check("email","enter a valid email!!").isEmail(),
    check("password","enter a valid password!!").isLength({min:6})
]
exports.loginValidation = () => [
    check("email","enter a valid email!!").isEmail(),
    check("password","enter a valid password!!").isLength({min:6})
];
// creation fct validation
// validatresult:fct predefini
exports.validation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
