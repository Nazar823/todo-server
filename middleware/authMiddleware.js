const jwt = require("jsonwebtoken");
const {body} = require("express-validator");

module.exports = function (req, res, next) {
    if(req.method === "OPTIONS"){
        next()
    }
    try {
        const token = req.headers.authorization
            // .split(' ')[1]
        if(!token){
            return res.status(403).json({message: `Пользователь не авторизован токен ${token}`})
        }
        const decode = jwt.verify(token, 'jdsdsj')
        req.body = {...req.body, user: decode.id}
        next()
    } catch (e){
        console.log(e.message)
        return res.json(e.message)
    }
}