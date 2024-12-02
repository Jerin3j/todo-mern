const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require('mongoose')
require("dotenv").config()
const route = require('../server/routes/route')

app.use(cors())
app.use(express.json())
app.use(route)

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("MongoDB is connected");
    
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, ()=>{  console.log(`App is running on ${PORT}`)}) 