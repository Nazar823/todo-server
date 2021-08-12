const Router = require('express')
const router = new Router
const controller = require('../Controllers/authController')
const authMiddleware = require('../middleware/authMiddleware');
const cors = require ('cors')
const {
    registration,
    login
} = require('../Controllers/authController')
const {
    getTaskList,
    addTask,
    deleteTask,
    checkTask
} = require('../Controllers/taskController')


router.post('/api/registration', registration)
router.post('/api/login', login)
 router.post('/api/addTask', addTask)
router.post('/api/tasks',  getTaskList)
router.post('/api/delete', deleteTask)
router.post('api/check', checkTask)

module.exports = router
