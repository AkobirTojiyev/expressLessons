const express = require('express')
const mongoose = require('mongoose')
const dns = require('dns')
const postSchem = require('./models/post.model')
const postModel = require('./models/post.model')
const postRouter = require('./routes/post.route')
const authRouter = require('./routes/auth.route')
dns.setServers(['8.8.8.8', '8.8.4.4'])
const app = express()
require('dotenv').config()
const fileupload = require('express-fileupload')
const reqtime = require('./middleware/req-time')

app.use(express.json())
app.use(express.static('static'))//bu rasmlarni saqlanganlarni get qilib beradi
// 8090/9e5904e7-96ff-4fbd-9c92-c12d8428627f.png - ishlaydi.
app.use(fileupload())//routerdan oldin bo'lish kk ekan. 
app.use(reqtime)//ishlatish uchun "req.reqtime" qilinsa shu funksiyani javobi keladi.

app.use("/api/post", postRouter)
app.use('/api/auth', authRouter)

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