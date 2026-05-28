const express = require('express')
const authController = require('../controllers/auth.controller')
const router = express.Router()
const {body} = require("express-validator");
const authMiddleware = require('../middleware/auth.middleware');

router.post('/register', body('email').isEmail(), body('password').isLength({min: 3, max: 30}), authController.register)//Email to'liq bo'lishini tekshiradi. xatolilar qanday bo'lishini tekshiradi.  
router.get('/activation/:id', authController.activation)
router.post('/login', authController.login)
router.post('/logout', authController.logout)
router.get("/refresh", authController.refresh)// get so'rov yuborib refresh va access tokenlarni qaytadan yaratib qo'yamiz 
router.get("/get-users", authMiddleware, authController.getUser)//bu middleware faqat ro'yxatdan o'tgan odamlarnigina ko'rishi mumkin bo'lishi kerak. 

module.exports = router