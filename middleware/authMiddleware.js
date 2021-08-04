const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    if(req.method === "OPTIONS"){
        next()
    }
    try {
        const token = req.body.authorization
            // .split(' ')[1]
        if(!token){
            return res.status(403).json({message: `Пользователь не авторизован токен ${token}`})
        }
        const decode = jwt.verify(token, 'jdsdsj')
        req.user = decode
        next()
    } catch (e){
        // return res.json(e.message)
        return res.status(403).json({message: "Пользователь не авторизован ошибка"})
    }
}