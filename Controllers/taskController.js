const User = require('../Objects/User')
const bcrypt = require('bcryptjs')
const {use} = require("express/lib/router");
const jwt = require("jsonwebtoken");

const Task = require("../Objects/Task");
module.exports.addTask = async (req, res, next) => {
    try {
        const {user, text, checked} = req.body
        const task = new Task({user, text, checked})
        await task.save()
        return res.status(200).json({id: task._id})
    } catch (error){
        return next(error)
    }
}
module.exports.getTaskList = async (req, res, next) => {
    try {
        const {user} = req.body
        let task = await Task.find({user})
        let taskE
        taskE = task.map((item) => {
            return {id: item._id, text: item.text, checked: item.checked}
        })
        return res.status(200).json(taskE)
    } catch (error) {
        return next(error)
    }
}
module.exports.checkTask = async (req, res, next) => {
    console.log('getted request')
    try {
        const {id} = req.body
        console.log(req.body)
        await Task.updateOne({_id: id}, {$set: {checked: false}})
        return Task._id
    } catch (error) {
        console.log('ERROR')
        return next(error)
    }
}
module.exports.deleteTask = async (req, res, next) => {
    try {
        const {id, user} = req.body
        await Task.deleteOne({id})
        const task = await Task.find({user})
        return res.status(200).json(task)
    } catch (error) {
        return next(error.message)
    }
}
