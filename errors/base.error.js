module.exports = class  BaseError extends Error{
    status
    errors

    constructor(status, message, errors){
        super(message)
        this.status = status
        this.errors = errors
    }

    static UnauthorizedError(){//ushbu xatolikda odatda qo'shimcha text qo'shmaymiz, shuni chaqirganimiz kifoya
        return new BaseError(401, 'user is not authorized')
    }

    static BadRequest(message, errors = []){//odatda bu boshqa xatoliklar uchun message orqali xatoliklarni uzatamiz.
        return new BaseError(400, message, errors)
    }
}