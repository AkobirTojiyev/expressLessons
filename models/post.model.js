
const {Schema, model} = require('mongoose')

const postModel = new Schema({
    author: {type: Schema.ObjectId, ref: 'User'},//bunda foydalanuvchi ro'yxatdan o'tgan bo'lsa access-token bo'lsa faqat shundan olib author va value sifatida id berish:
    title: {type: String, required: true},
    body: {type: String, required: true},
    picture: {type:String}
}, {timestamps: true}) //bu har bir qo'shilgan data'ga creat_at va update_at hususiyatini qo'shib beradi.

module.exports = model('post', postModel)


