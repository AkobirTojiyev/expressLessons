const { model } = require("mongoose");

class userDto {
    constructor(modelUser){
        this.email = modelUser.email,
        this.id = modelUser._id
        this.isActivated = modelUser.isActivated
    }
}

module.exports = userDto