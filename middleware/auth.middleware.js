const BaseError = require('../errors/base.error')
const tokenService = require('../services/token.service')

module.exports = function(req,res,next){
    try {
        const authorization = req.headers.authorization
        if(!authorization){
            return next(BaseError.UnauthorizedError())
        }
        
        const accessToken = authorization.split(' ')[1]
        if(!accessToken){
            return next(BaseError.UnauthorizedError())
        }

        const userData = tokenService.validatAccessToken(accessToken)//payload qaytaradi.bo'lmasa 401
        if(!userData){
            return next(BaseError.UnauthorizedError())
        }

        req.user = userData//bu datani req.user'ga berilmoqda endi bundan foydalaniladi.
        next()
    } catch (error) {
        return next(BaseError.UnauthorizedError())
    }
}