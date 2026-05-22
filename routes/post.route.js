const express = require('express')  
const postController = require('../controllers/post.controller')
const router = express.Router()

router.get('/get', postController.getAll)
router.post('/create', postController.create)
router.delete('/delete/:id', postController.delete)
router.put('/put/:id', postController.put)
router.get('/getones/:id', postController.getone)

module.exports = router
