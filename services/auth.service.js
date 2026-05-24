const UserDto = require('../dtos/user.dto')
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')

class authService {
    async registerService(email, password){
        const checkEmail = await userModel.findOne({email})

        if(checkEmail){
            throw new Error('foydalanuvchi shu email bilan royxatdan otgan')
        }

        const bcPassword = await bcrypt.hash(password, 10)
        const user = await userModel.create({email, password: bcPassword})

        const userDto = new UserDto(user)
        
        return userDto
    }
}

module.exports = new authService()