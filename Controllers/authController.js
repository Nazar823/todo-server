const User = require('../Objects/User')
const bcrypt = require('bcryptjs')
const {use} = require("express/lib/router");
const jwt = require("jsonwebtoken");

module.exports.registration = async (req, res, next) => {
    try {
        const {username, password, nickname} = req.body
        // console.log(req.body)
        const candidate = await User.findOne({username})
        if (candidate){
            // console.log('Пользователь с таким именем уже существует!')
            return res.status(400).json({message: 'Пользователь с таким именем уже существует'})
        }
        const hasPass = bcrypt.hashSync(password, 8)
        const  user = new User({nickname, username, password: hasPass})
        await user.save()
        // console.log(user)
        // console.log('Аккаунт создан!')
        return res.status(200).json({message: 'Аккаунт создан!'})
    } catch (error) {
        console.log(error.message)
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
        return res.status(200).json ({token})
    } catch (error) {
        return next(error)
    }
}
