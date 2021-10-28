//bonne pratique chnadhf route mte3i
const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//signup
exports.signup = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        const foundUser = await User.findOne({ email });
        if (foundUser) {
            return res
                .status(400)
                .send({ errors: [{ msg: "email should be unique" }] });
        }
        //bcrypt:to hash the password
        const saltRounds = 10;
        const hashedpassword = await bcrypt.hash(password, saltRounds); //degree de hashage
        const newUser = new User({ ...req.body });
        newUser.password = hashedpassword;
        await newUser.save();
        //creation token
        const token = jwt.sign(
            {
                id: newUser._id,
            },
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
        );
        res.status(200).send({ msg: "signup successfullu", user: newUser, token });
    } catch (error) {
        res.status(400).send({ msg: "cannot regiter this user" });
    }
};
//signin
exports.signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const foundUser = await User.findOne({ email });
        if (!foundUser) {
            res.status(400).send({ errors: [{ msg: "bad credentiel" }] });
        }
        const checkPassword = await bcrypt.compare(
            password,
            foundUser.password
        );
        if (!checkPassword) {
            res.status(400).send({ errors: [{ msg: "bad credentiel" }] });
        }
        const token = jwt.sign(
            {
                id: foundUser._id,
            },
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
        );
        res.status(200).send({ msg: "login successfully", user: foundUser,token });
    } catch (error) {
        res.status(400).send({ msg: "cannot login" });
    }
};
