const authService = require('../services/auth.service')

class AuthController {
    async register(req,res,next){
        try {
            const { email, password } = req.body
            const data = await authService.registerService(email, password)
            res.json(data)
        } catch (error) {
            console.log(error);
        }
    }

    async activation(req,res,next){

    }
}

module.exports = new AuthController()