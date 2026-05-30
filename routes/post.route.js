const express = require('express')  
const postController = require('../controllers/post.controller')
const authMiddleware = require('../middleware/auth.middleware')
const authorMiddleware = require('../middleware/author.middleware')
const router = express.Router()

router.get('/get', postController.getAll)
router.post('/create', authMiddleware, postController.create)
router.delete('/delete/:id', postController.delete)
router.put('/put/:id', authMiddleware, authorMiddleware, postController.put)
router.get('/getones/:id', postController.getone)

module.exports = router
