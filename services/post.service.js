const postModel = require("../models/post.model");
const fileService = require('./file.service')

class PostService{
    async getService(){
        return await postModel.find()
    }

    async createService(userData, picture, author){
        const fileName = fileService.save(picture)//ichkarida fileni local saqlash bo'layapti, ammo nameni tashqariga chiqaravorayapman holos shunda dbda name saqlanadi
        return await postModel.create({...userData, picture: fileName, author})
    }

    async deleteService(id){
        return await postModel.findByIdAndDelete(id)
    }

    async edit(id, body){
        if(!id){
            throw new Error('id not found')
        }
        return await postModel.findByIdAndUpdate(id, body, {new:true})
    }

    async getones(id){
        return await postModel.findById(id)
    }
}

module.exports = new PostService()