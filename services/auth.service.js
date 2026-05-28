const userModel = require("../models/user.model")
const bcrypt = require("bcrypt")
const UserDto = require('../dtos/user.dto')
const CreateTokens = require('./token.service')
const mailService = require("./mail.service")
const tokenService = require("./token.service")
const userDto = require("../dtos/user.dto")

class AuthService{
    async registerService(email, password){
        const checkUser = await userModel.findOne({email})
        if(checkUser){
            throw new Error('this user already sign in.')
        }
        const strongPassword = await bcrypt.hash(password, 10)
        const user = await userModel.create({email, password: strongPassword}) // yaraldi email, password, isActive bilan.

        const userDto = new UserDto(user)

        await mailService.sendMail(email, `${process.env.API_URL}/api/auth/activation/${userDto.id}`)

        const tokens = CreateTokens.generateToken({...userDto})// hozir userDto class obj uni tozalash uchun ... kerak va ustiga yana {} qo'yildi.
        
        await CreateTokens.saveToken(userDto.id, tokens.refreshToken)

        return {user: userDto, ...tokens}
    }

    async activationService(id){
        const userObj = await userModel.findById(id)
        if(!userObj){
            throw new Error('id qo"shib ber')
        }
        userObj.isActivated = true
        await userObj.save()
    }

    async loginService(email, password){
        const user = await userModel.findOne({email})
        if(!user){//login qilgan userni qaytaradi ushbu email bilan ro'yxatda bor yuqligini aniqlash uchun
            throw new Error('User is not defined')
        }

        const isPassword = await bcrypt.compare(password, user.password)//bu kiritlgan parol va databazadagi kod bilan bir xilligini tekshiradi, true to'g'ri bo'lsa
        if(!isPassword){
            throw new Error('Password is incorrect')   
        }

        const userDto = new UserDto(user)
        const tokens = tokenService.generateToken({...userDto})//token generatsiya qilindi.
        await tokenService.saveToken(userDto.id, tokens.refreshToken)//refresh tokenni saqladik
        return {user: userDto, ...tokens}//res uchun chiqarib yubaramiz.
    }

    async logoutService(refToken){//logoutdan maqsad tokens db'ga saqlangan objni o'chirishdan iborat. refreshTokenini o'chirib yuborish. cookie ham ketadi.
        return await tokenService.removeToken(refToken)
    }

    async refreshService(refToken){//tokenlar eskirganda uni yangilash.
        if(!refToken){
            throw new Error('Bad authorizition')
        }

        const userPayload = tokenService.validatRefreshToken(refToken)//userPayload'ga userDto qaytmoqda, foydalanuvchi datalari. barcha data qaytadigani. 

        const tokenRefDb = await tokenService.findToken(refToken)

        if(!userPayload || !tokenRefDb){
            throw new Error('Bad authorization')
        }

        const user = await userModel.findById(userPayload.id) //aynan shu refreshTokenni id yordamida user db'dagi obj ichidan topib olish uchun foydalanuvchini o'zini:
        const userDto = new UserDto(user)
        const tokens = tokenService.generateToken({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {user: userDto, ...tokens}
    }
}

module.exports = new AuthService()