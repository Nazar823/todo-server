const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')  // анализ входящих запросов
const PORT = 5000
const mongoose = require('mongoose')
const apiRoutes = require('./Routes/Routes')
const app = express()
app.use(cors())
app.options('*', cors())
app.use(bodyParser.json())
app.use('/', apiRoutes);


const uri = mongoose.connect(
    "mongodb+srv://admin:user@cluster0.snmxp.mongodb.net/todo?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    },
)
// app.options('*', cors())
app.listen(PORT, () => {
        try {
            console.log(`Server started on port ${PORT}`)
        } catch (e) {
            console.log(e)
        }
    }
)
