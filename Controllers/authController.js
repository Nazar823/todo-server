const User = require('../Objects/User')
const Task = require('../Objects/Task')
const bcrypt = require('bcryptjs')
const {use} = require("express/lib/router");
const jwt = require("jsonwebtoken");

module.exports.registration = async (req, res, next) => {
    try {
        const {username, password, nickname} = req.body
        const candidate = await User.findOne({username})
        if (candidate){
            return res.status(400).json({message: 'Пользователь с таким именем уже существует'})
        }
        const hasPass = bcrypt.hashSync(password, 8)
        const  user = new User({nickname, username, password: hasPass})
        await user.save()
        return res.json({message: 'Аккаунт создан!'})

    } catch (error) {
        return next(error)
    }
}
function getToken(id) {
    return jwt.sign({id},
        'jdsdsj',
        {expiresIn: "10h"})
}
module.exports.login = async (req, res, next) => {
    try {
        const {username, password} = req.body
        const user = await User.findOne({username})
        if (!user){
            return res.status(400).json({message: 'Пользователь не найден!'})
        }
        const validPassword = bcrypt.compareSync(password, user.password)
        if (!validPassword){
            return res.status(400).json({message: 'Пароль неправильный!'})
        }
        const token = getToken(user._id)
         return res.status(200).json({token, user: {id: user.id, username: user.username, nickname: user.nickname}})
    } catch (error) {
        return next(error)
    }
}
module.exports.addTask = async (req, res, next) => {
    try {
        const {user, text, checked} = req.body
        const task = new Task ({user, text, checked})
        await task.save()
        return res.status(200).json({message: task})
    } catch (error){
        return next(error)
    }
}
module.exports.getTaskList = async (req, res, next) => {
    try {
        const {user} = req.body
        const task = await Task.find({user})
        return res.status(200).json({task})
    } catch (error) {
        return next(error)
    }
}
module.exports.deleteTask = async (req, res, next) => {
    try {
        const {id, user} = req.body
        const del = await Task.deleteOne({id})
        const task = await Task.find({user})
        return res.status(200).json({task})
    } catch (error) {
        return next(error)
    }
}