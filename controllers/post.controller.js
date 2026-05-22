const postService = require("../services/post.service");

class PostController {
    async getAll(req,res){
        try {
            const allPostdata = await postService.getService()
            res.status(200).json(allPostdata)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    async create(req,res){
        try {
            const postData = await postService.createService(req.body)
            res.status(201).json(postData)
        } catch (error) {
            res.status(502).json(error)
        }
    }

    async delete(req,res){
        try {
            const {id} = req.params
            const idsi = await postService.deleteService(id)
            res.status(202).json(idsi)
        } catch (error) {
            res.status(502).json(error)
        }
    }

    async put(req,res){
        try {
            const {id} = req.params
            const put = await postService.edit(id, req.body)
            res.status(201).json(put)
        } catch (error) {
            res.status(502).json(error)
        }
    }

    async getone(req,res){
        try {
            const {id} = req.params
            const getOne = await postService.getones(id)
            res.status(200).json(getOne)
        } catch (error) {
            res.status(502).json(error)
        }
    }
}

module.exports = new PostController()