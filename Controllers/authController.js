const User = require('../Objects/User')
const express = require('express')
const Task = require('../Objects/Task')
const bcrypt = require('bcryptjs')
const {use} = require("express/lib/router");
const jwt = require("jsonwebtoken");

module.exports.registration = async (req, res, next) => {
    try {
        const {username, password, nickname} = req.body
        console.log('*************')
        console.log(req.body)
        const candidate = await User.findOne({username})
        if (candidate){
            console.log('Пользователь с таким именем уже существует!')
            return res.status(400).send('Пользователь с таким именем уже существует')
        }
        const hasPass = bcrypt.hashSync(password, 8)
        const  user = new User({nickname, username, password: hasPass})
        await user.save()
        console.log(user)
        console.log('Аккаунт создан!')
        return res.status(200).json({message: 'Аккаунт создан!'})
    } catch (error) {
        return error
    }
}
function getToken(id) {
    return jwt.sign({id},
        'jdsdsj',
        {expiresIn: "10h"})
}
module.exports.login = async (req, res, next) => {
    try {
        // return res.status(200).json ({msg: 'This is CORS-enabled for a Single Route'})
        const {username, password} = req.body
        console.log('user data: ', username, password)
        // return res.status(200).json({username, password})
        const user = await User.findOne({username})
        if (!user){
            return res.status(400).json({message: 'Пользователь не найден!'})
        }
        const validPassword = bcrypt.compareSync(password, user.password)
        if (!validPassword){
            return res.status(400).json({message: 'Пароль неправильный!'})
        }
        const token = 'hello'
        // const token = getToken(user._id)
        return res.status(200).json ({hello: 'hello'})
    } catch (error) {
        console.log(error.message)
        // return next(error)
        return res.status(200).json ({msg: 'This is CORS-enabled for a Single Route'})
    }
}
module.exports.addTask = async (req, res, next) => {
    try {
        const {user, text, checked} = req.body
        const task = new Task({user, text, checked})
        await task.save()
        return res.status(200).json({id: task._id, text: task.text, checked: task.checked})
    } catch (error){
        return next(error)
    }
}
module.exports.getTaskList = async (req, res, next) => {
    try {
        const {user} = req.body
        const task = await Task.find({user})
        console.log(task)
        return res.status(200).json({id: 'test', text: 'test', checked: false})
        // return res.status(200).json(task)
    } catch (error) {
        return next(error)
    }
}
module.exports.checkTask = async (req, res, next) => {
    try {
        const {id} = req.body
        await Task.updateOne()
    } catch (error) {
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
        return next(error)
    }
}