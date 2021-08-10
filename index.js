 const express = require('express')
const bodyParser = require('body-parser')  // анализ входящих запросов
const PORT = 5000
const mongoose = require('mongoose')
const app = express()
app.use(express.json())
const apiRoutes = require('./Routes/Routes')
const cors = require("cors");
app.use('/', apiRoutes)

const uri = mongoose.connect(
    "mongodb+srv://admin:user@cluster0.snmxp.mongodb.net/todo?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
)
app.use(cors())
app.listen(PORT,() => {
        try {
            console.log(`Server started on port ${PORT}`)
        } catch (e) {
            console.log(e)
        }
    }
)
