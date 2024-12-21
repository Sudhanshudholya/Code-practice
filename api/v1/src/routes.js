const registerRoute = require("./register/route.register")
const router = require("express").Router()

router.use("/register", registerRoute)

module.exports = router