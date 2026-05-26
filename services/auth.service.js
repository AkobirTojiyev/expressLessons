const userModel = require("../models/user.model")
const bcrypt = require("bcrypt")
const UserDto = require('../dtos/user.dto')
const CreateTokens = require('./token.service')
const mailService = require("./mail.service")

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
}

module.exports = new AuthService()