require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const dns = require('dns')
const postRouter = require('./routes/post.route')
const authRouter = require('./routes/auth.route')
dns.setServers(['8.8.8.8', '8.8.4.4'])
const app = express()
const fileupload = require('express-fileupload')
const reqtime = require('./middleware/req-time')
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middleware/error.middleware')

app.use(express.json())
app.use(express.static('static'))//bu rasmlarni saqlanganlarni get qilib beradi
// 8090/9e5904e7-96ff-4fbd-9c92-c12d8428627f.png - ishlaydi.
app.use(fileupload())//routerdan oldin bo'lish kk ekan. file bilan ishlash uchun. 
app.use(cookieParser({}))//vazifasi istalgan tashqi joydan murojaat qila oladi. 'req.cookie'deb istalgan joyda ishlatsak bo'ladi.
app.use(reqtime)//ishlatish uchun "req.reqtime" qilinsa shu funksiyani javobi keladi.

//routes
app.use("/api/post", postRouter)
app.use('/api/auth', authRouter)

app.use(errorMiddleware)

const PORT = process.env.PORT

const bootstrap = async () => {
    try{
        await mongoose.connect(process.env.DB_URL).then(() => console.log('Connect DB'))
        app.listen(PORT, ()=>console.log('Listening on - 8090 port'))
    }catch(error){
        console.log(`Error connection with db ${error}`);
    }
}
bootstrap()