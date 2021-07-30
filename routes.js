const Router = require('express')
const router = new Router
const controller = require('./authController')


const {
    registration,
    login,
    getUsers
} = require('./authController')

router.post('/registration', registration)
router.post('/login', login)
router.get('/users', getUsers)

module.exports = router
