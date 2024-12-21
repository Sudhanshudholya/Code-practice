const authenticateToken = require("../../middleware/authHelper")
const registerController = require("./controller.register")
const router = require("express").Router()

router.post("/create", registerController.add)
router.post("/login", registerController.login)
router.get("/userById/:id", authenticateToken , registerController.singleUser)
router.get("/getAllUsers" , authenticateToken , registerController.allUsers)
router.patch("/updateUserById/:id" , authenticateToken, registerController.updateUser)
router.delete("/deleteById/:id" , authenticateToken, registerController.deleteUser)

module.exports = router