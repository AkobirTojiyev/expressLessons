const authService = require('../services/auth.service')

class AuthController {
    async register(req,res,next){
        try {
            const { email, password } = req.body
            const data = await authService.registerService(email, password)
            res.cookie('refreshToken', data.refreshToken, {httpOnly: true, maxAge: 30 * 24 * 60 * 1000 })
            res.json(data)
        } catch (error) {
            console.log(error);
        }
    }

    async activation(req,res,next){
        try {
            const id = req.params.id
            await authService.activationService(id)
            return res.json({message: 'user activated'})
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new AuthController()