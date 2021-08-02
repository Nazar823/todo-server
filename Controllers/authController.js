const User = require('../Objects/User')
// const bcrypt = require('bcryptjs')
const {use} = require("express/lib/router");
console.log("GETTED REQUEST")

module.exports.registration = async (req, res, next) => {
//     res.set('Access-Control-Allow-Origin', '*')
//     res.set('Access-Control-Allow-Methods', 'GET, OPTIONS')
//     res.set('Access-Control-Allow-Headers', 'Content-Type')
    console.log(req.body)
    try {
        const {username, password, nickname} = req.body
        const candidate = await User.findOne({username})
        if (candidate){
            return res.status(400).json({message: 'Пользователь с таким именем уже существует'})
        }
        // const hasPass = bcrypt.hashSync(password, 8)
        const  user = new User({nickname, username, password})
        await user.save()
        return res.json({message: 'Аккаунт создан!'})

    } catch (error) {
        // console.log(error)
        // res.status(400).json({message: 'Registration error'})
        return next(error)
    }
}
module.exports.login = async (req, res, next) => {

    try {
        const {username, password} = req.body
        const user = await User.findOne({username})
        const pass = await User.findOne({password})
        console.log(user)
        if (!pass || !user){
            return res.status(400).json({message: 'Пароль неправильный!'})
        }
        return res.status(200).json({message: 'Авторизация прошла!'})

    } catch (error) {
        // console.log(error)
        // res.status(400).json({message: 'Login error'})
        return next(error)
    }
}
module.exports.getUsers = async (req, res, next) => {
    try {
        res.send('get all!')

    } catch (error) {
        console.log()
    }
}