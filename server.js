const express = require("express")
require("dotenv").config()
require("./config/db")
const routes = require("./api/v1/src/routes")
const app = express()
const cors = require("cors")
const PORT = process.env.PORT || 8900
const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(cors())
app.use("/v1", routes)
app.listen(PORT, () => {
    console.log(
        `Hamara code ${PORT} par chalu he`
    )
})