const reqtime = function(req,res,next){
    req.reqTime = Date.now()
    next()
}//reqTime - funksiya nomi. console logda chaqirish kerak.

module.exports = reqtime