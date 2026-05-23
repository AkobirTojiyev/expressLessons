
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

            file.mv(filePath)//file-bu rasm uni RAMdan filePath'ga qo'yiladi. path bor = 'src/static/328rhiuf.png'ga qo'yiladi.
            return fileName//fileNam qaytadi shuni DB mongo'ga qo'yiladi.
        }catch(error){
            throw new Error(`Error saving file: ${error}`)
        }
    }
}

module.exports = new FileService