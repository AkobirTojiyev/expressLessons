 
const {Schema, model} = require('mongoose')

const TokenSchema = new Schema({
    user: {type: Schema.ObjectId, ref: 'User'},//ObjectId - har bir documentning noyob _id'si saqlaydi.
    refreshToken: {type: String, required: true}
})

module.exports = model('Token', TokenSchema) 