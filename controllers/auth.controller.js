const authService = require("../services/auth.service");

class AuthController{
    async register(req,res,next){
        try {
            const {email, password} = req.body
            const data = await authService.registerService(email, password)
            res.cookie('refreshToken', data.refreshToken, {httpOnly: true, maxAge: 30*24*60*60*1000})
            res.json(data)
        } catch (error) {
            console.log(error);
        }
    }

    async activation(req,res,next){
        try {
          const id = req.params.id
          await authService.activationService(id)
          return res.redirect('https://www.youtube.com/')
        } catch (error) {
           console.log(error); 
        }
    }

    async login(req,res,next){
        try {
            const {email, password} = req.body
            const data = await authService.loginService(email, password)
            res.cookie('refreshToken', data.refreshToken, {httpOnly: true, maxAge: 30*24*60*60*1000})
            res.json(data)
        } catch (error) {
            console.log(error);   
        }
    }

    async logout(req,res,next){//logoutdan maqsad tokens db'ga saqlangan objni o'chirishdan iborat. refreshTokenini o'chirib yuborish. cookie ham ketadi.
        try {
            const {refreshToken} = req.cookies
            await authService.logoutService(refreshToken)
            res.clearCookie('refreshToken')//requestdan ushlasak bo'ladi cookieni default xolatda kelar ekan.
            return res.send('ok logout you')
        } catch (error) {
            console.log(error);
        }
    }

    async refresh(req, res, next){//refresh token yordamida access va refresh tokenni yangilab qo'yamiz dbga.
        try {
            const {refreshToken} = req.cookies
            const data = await authService.refreshService(refreshToken) 
            res.cookie('refreshToken', data.refreshToken, {httpOnly: true, maxAge: 30*24*60*60*1000})
            res.json(data)
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new AuthController()