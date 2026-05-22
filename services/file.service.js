
const {v4: uuidv4} = require('uuid')
const fs = require('fs')
const path = require('path')

class FileService {
    save(file){
        try{
            const fileName = uuidv4() + '.png' //create random id + jpg
            const currentDir = __dirname //service pagegacha bo'lgan yo'l.
            const staticDir = path.join(currentDir, '..', 'static') // 'static' file'ga path diractore create qildik. hozirgi path'dan orqaga chiqamiz va nom beramiz.
            const filePath = path.join(staticDir, fileName)//static papkani ichiga rasim qo'yvommiz

            if(!fs.existsSync(staticDir)){//file qidiradi agar yo'q bo'lsa
                fs.mkdirSync(staticDir, {recursive:true})//bu file yaratadi o'zini.
            }

            file.mv(filePath)//file keladi uni shu berilgan filePath'ga qo'yiladi.
            return fileName
        }catch(error){
            throw new Error(`Error saving file: ${error}`)
        }
    }
}

module.exports = new FileService