const User = require('../Objects/User')
const bcrypt = require('bcryptjs')
const {use} = require("express/lib/router");
const jwt = require("jsonwebtoken");

const Task = require("../Objects/Task");
module.exports.addTask = async (req, res, next) => {
    try {
        const {user, text} = req.body
        const task = new Task({user, text, checked: false})
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
    try {
        const {id} = req.body
        const task = await Task.findOne({_id: id})
        if (!task){
            return res.status(400).json({message: 'Такой таски не существует!'})
        }
        await Task.updateOne({_id: id}, {$set: {checked: !task.checked}})
        return res.status(200)
    } catch (error) {
        console.log('ERROR')
        return next(error)
    }
}
module.exports.checkAllTasks = async (req, res, next) => {
    try {
        const {user} = req.body
        const task = await Task.findOne({user})
        if (!task){
            return res.status(400).json({message: 'Все такси отмецены или не существуют!'})
        }
        await Task.updateMany({user, checked: false}, {$set: {checked: true}})
        return res.status(200).json({message: 'Updated!'})
    } catch (error) {
        return next(error)
    }
}
module.exports.deleteTask = async (req, res, next) => {
    try {
        const {id} = req.body
        if (!await Task.findOne({_id: id})){
            return res.status(400).json({message: 'Такой таски не существует!'})
        }
        await Task.deleteOne({_id: id})
        return res.status(200).json({message: 'Updated!'})
    } catch (error) {
        return next(error.message)
    }
}
module.exports.deleteCheckedTasks = async (req, res, next) => {
    try {
        const {user} = req.body
        if (!await Task.findOne({user, checked: true})){
            return res.status(400).json({message: 'Нет отмеченных тасок!!'})
        }
        await Task.deleteMany({user, checked: true})
        return res.status(200).json({message: 'Deleted!'})
    } catch (error) {
        return next(error.message)
    }
}