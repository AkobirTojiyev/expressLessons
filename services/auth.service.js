const UserDto = require('../dtos/user.dto')
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const tokenService = require('./token.service')

class authService {
    async registerService(email, password){
        const checkEmail = await userModel.findOne({email})

        if(checkEmail){
            throw new Error('foydalanuvchi shu email bilan royxatdan otgan')
        }

        const bcPassword = await bcrypt.hash(password, 10)
        const user = await userModel.create({email, password: bcPassword})

        const userDto = new UserDto(user)
        const tokens = tokenService.generateToken({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {user: userDto, ...tokens}
    }

    async activationService(id){
        const userObj = await userModel.findById(id)
        if(!userObj){
            throw new Error('User topilmadi')
        }
        userObj.isActivated = true
        await userObj.save()//true qildik va uni saqlab qo'ydik db'da.
    }
}

module.exports = new authService()