const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticateToken = (req, res, next) => {
    try {
        const token = req.headers["authorization"]

        if(!token){
            return res.status(401).send({
                status: false,
                message: "No token provided",
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req._id = decoded._id
        next()
    } catch (error) {
        return res.send({
            status: false,
            message: "Unauthorized Access",
        })
    }
}

module.exports = authenticateToken