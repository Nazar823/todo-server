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
    checkTask,
    deleteCheckedTasks,
    checkAllTasks
} = require('../Controllers/taskController')

router.post('/api/registration', registration)
router.post('/api/login', login)
router.post('/api/addTask', authMiddleware, addTask)
router.post('/api/tasks', authMiddleware,  getTaskList)
router.post('/api/delete', authMiddleware, deleteTask)
router.post('/api/deleteChecked', authMiddleware, deleteCheckedTasks)
router.post('/api/check', authMiddleware, checkTask)
router.post('/api/checkAll', authMiddleware, checkAllTasks)

module.exports = router
