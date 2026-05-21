
const {Schema, model} = require('mongoose')

const postModel = new Schema({
    title: {type: String, required: true},
    old: {type: Number, required: true}
})

module.exports = model('post', postModel)


