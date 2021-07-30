const express = require('express')
const PORT = process.env.PORT || 5000
const mongoose = require('mongoose')
const app = express()

app.use(express.json())

const start = async () => {
    try{
        await mongoose.connect("mongodb+srv://admin:user@cluster0.snmxp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e){
        console.log(e)
    }
}

start()