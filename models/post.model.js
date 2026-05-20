
const {Schema, model} = require('mongoose')

const postSchem = new Schema({
    title: {type: String, required: true},
    body: {type: String, required: true}
})

module.exports = model('Post', postSchem)



