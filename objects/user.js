const {$chema, model} = require('mongoose')

const User = new $chema({
    username: {type: String, unique: true, required: true},
    password: {type: String, required: true}
})