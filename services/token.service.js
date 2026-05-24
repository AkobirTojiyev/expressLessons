const jwt = require('jsonwebtoken')
const tokenModel = require('../models/token.model')

class TokenService {
    generateToken(payload){//bu payload data foydalanuvchi haqida.
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, {expiresIn: "15m"})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, {expiresIn: "30d"})

        return {accessToken, refreshToken}
    }

    async saveToken(userId, refreshToken){
        const trueToken = await tokenModel.findOne({user: userId})//obj qaytaradi. malumot bazasida borligi.
        if(trueToken){
            trueToken.refreshToken = refreshToken//yangilandi refresh
            return trueToken.save()//db saqlash.
        }
        const token = await tokenModel.create({user: userId, refreshToken})//token bo'lmasa token yaratadi. 
        return token
    }
}

module.exports = new TokenService()