// require jwt
const jwt = require("jsonwebtoken");
//require schema
const User = require("../model/User");
//is auth or not
const isAuth = async (req, res, next) => {
    try {
        const token = req.headers["Authorization"];
        if (!token) {
            res.status(401).send({ errors: [{ msg: "not authorized" }] });
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const foundUser = await User.findOne({ _id: decoded.id });
        if (!foundUser) {
            res.status(401).send({
                errors: [{ msg: "you are not authorized" }],
            });
        }
        req.user = foundUser;
        
        next();
    } catch (error) {
        res.status(401).send({ errors: [{ msg: "nnnot authorized" }] });
    }
};
module.exports = isAuth;
