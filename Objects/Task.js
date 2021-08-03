const {Schema, model} = require('mongoose')

const Task = new Schema({
    user: {type: String, required: true},
    text: {type: String, required: true},
    checked: {type: Boolean, required: true}
})
module.exports = model('Task', Task)