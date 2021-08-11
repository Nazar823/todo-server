const Router = require('express')
const router = new Router
const controller = require('../Controllers/authController')
const authMiddleware = require('../middleware/authMiddleware');

const cors = require ('cors')


const {
    registration,
    login,
    getTaskList,
    addTask,
    deleteTask
} = require('../Controllers/authController')

// router.post('/api/login', function (req, res, next) {
//     res.json ({msg: 'This is CORS-enabled for a Single Route'})
// })
// router.get('/tasks',  function (req, res, next) {
//     res.json ({msg: 'This is CORS-enabled for a Single Route'})
// })

// router.post('/api/login', function (req, res, next) {
//     res.json ({msg: 'This is CORS-enabled for a Single Route'})
// })

router.post('/api/registration', registration)
router.post('/api/login', login)
 router.post('/api/addTask', addTask)
router.get('/api/tasks',  getTaskList)
router.post('/api/delete', deleteTask)

module.exports = router
