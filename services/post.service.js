const postModel = require("../models/post.model");

class PostService{
    async getService(){
        return await postModel.find()
    }

    async createService(userData){
        return await postModel.create(userData)
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