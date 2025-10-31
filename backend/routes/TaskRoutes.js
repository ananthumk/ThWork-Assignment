const express = require('express')
const { addTask, getTask, updateTask, getSummary, getTaskById } = require('../controllers/TaskController')
const { register, login } = require('../controllers/AuthController')
const auth = require('../middleware.js/auth')
const router = express.Router()

router.post('/register', register)
router.post('/login', login)

router.post('/tasks', auth, addTask)
router.get('/tasks', auth, getTask)
router.get('/task/:id', auth, getTaskById)
router.patch('/tasks/:id', auth, updateTask)
router.get('/insight', auth, getSummary)

module.exports = router


