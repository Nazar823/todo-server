const Router = require('express')
const router = new Router
const controller = require('../Controllers/authController')


const {
    registration,
    login,
    getTaskList,
    addTask,
    deleteTask
} = require('../Controllers/authController')

router.post('/registration', registration)
router.post('/login', login)
router.post('/addTask', addTask)
router.post('/tasks', getTaskList)
router.post('/delete', deleteTask)

module.exports = router
