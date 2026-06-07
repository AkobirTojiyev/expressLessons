const BaseError = require("../errors/base.error")
const postModel = require("../models/post.model")

module.exports = async function (req,res,next) {
    try {
        const post = await postModel.findById(req.params.id)
        const authorId = req.user.id//bu auth.middle ware req ichiga qo'shib bergan user hususiyat bunda foydalanuvchi ro'yxatdan o'tganini tekshiradi va 'req.user'-validatsiyadin o'tkazilgan foydalanuvchini payloadini joylashtiradi.
        if(post.author.toString() !== authorId){
            return next(BaseError.BadRequest('Only author can edit this post'))
        }
        next()
    } catch (error) {
        return next(BaseError.BadRequest('Only author can edit this post'))
    }
}