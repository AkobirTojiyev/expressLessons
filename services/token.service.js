const jwt = require('jsonwebtoken')
const tokenModel = require('../models/token.model')

class CreateTokens{
    generateToken(payload){
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, {expiresIn: "15m"})
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, {expiresIn: "30d"})
        return {accessToken, refreshToken}
    }

    async saveToken(id, refToken){
        const token = await tokenModel.findOne({user: id})
        if(token){
            token.refreshToken = refToken
            return token.save()
        }
        const tokenDB = await tokenModel.create({user: id, refreshToken: refToken})
        return tokenDB
    }

    async removeToken(refToken){
        return await tokenModel.findOneAndDelete({refreshToken: refToken})
    }

    validatRefreshToken(token){
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_KEY)//payload qaytaradi, dto berib yuborayotgan edikku.
        } catch (error) {
            return null
        }
    }

    validatAccessToken(token){
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_KEY)//tekshiradi agar to'g'ri bo'lsa - payload qaytaradi, dto berib yuborayotgan edikku.payloadga.
        } catch (error) {
            return null
        }
    }

    async findToken(refToken){
        return await tokenModel.findOne({refreshToken: refToken})
    }
}

module.exports = new CreateTokens() 