const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/auth')

const { createTask, getTasks, getTask, deleteTask, updateTask } = require('../controllers/taskController')

router.post('/task', authMiddleware, createTask)
router.get('/task', authMiddleware, getTasks)
router.get('/task/:id', authMiddleware, getTask)
router.delete('/task/:id', authMiddleware, deleteTask)
router.put('/task/:id', authMiddleware, updateTask)


module.exports = router
