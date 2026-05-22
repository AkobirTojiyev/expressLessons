const express = require('express')
const mongoose = require('mongoose')
const dns = require('dns')
const postSchem = require('./models/post.model')
const postModel = require('./models/post.model')
const postRouter = require('./routes/post.route')
dns.setServers(['8.8.8.8', '8.8.4.4'])
const app = express()
require('dotenv').config()

app.use(express.json())

app.use("/api/post", postRouter)
 
// app.post('/post', async(req,res)=>{
//     try {
//         const {title, old} = req.body
//         const postData = await postModel.create({title, old})
//         res.status(201).json(postData)
//          console.log(req.body)
//     } catch (error) {
//         res.status(502).json(error)
//     }
// })

// app.delete('/del/:id', (req,res)=>{
//     const {id} = req.params
//     res.send(`${id}-o'chirildi`)
// })

// app.put('/put/:id', (req,res)=>{//id bo'yicha topadi, shuni body'sini o'zgartiradi.
//     const {id} = req.params
//     const body = req.body
//     res.send({idsi:id, ozgarganbody: body})
// })
// { responsega ko'rinadi.
//     "idsi": "123",
//     "ozgarganbody": {
//         "firsName": "Sammi"
//     }
// }

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