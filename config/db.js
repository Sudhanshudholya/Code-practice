const mongoose = require("mongoose")
require("dotenv").config()
const db = process.env.MONGO_URI
const PORT = process.env.PORT

mongoose.connect(db)
.then(()=>{
    console.log(`Hamara database ${PORT} par connect ho chuka he`)
})
.catch(
    err => console.log(err)
)