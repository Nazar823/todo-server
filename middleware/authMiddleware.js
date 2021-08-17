const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    if(req.method === "OPTIONS"){
        next()
    }
    try {
        const {token} = req.body
            // .split(' ')[1]
        console.log('TOKEN: ', token)
        if(!token){
            return res.status(403).json({message: `Пользователь не авторизован токен ${token}`})
        }
        const decode = jwt.verify(token, 'jdsdsj')
        console.log('decode', decode)
        req.user = decode
        next()
    } catch (e){
        return res.json(e.message)
    }
}