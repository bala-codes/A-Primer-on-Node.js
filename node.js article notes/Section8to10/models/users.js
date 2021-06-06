const Joi = require('joi');
const mongoose = require('mongoose') // npm install --save mongoose
const jwt = require('jsonwebtoken')
 
// User Schema
const userSchema = new mongoose.Schema({
    name : {
        type: String, required: true,
        minlength: 2, maxlength: 50,
    },
    email: {
        type: String, 
        required: true, unique: true,
        minlength: 2, maxlength: 255,
    },
    password: {
        type: String, required: true,
        minlength: 2, maxlength: 1024,
    },

    isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, 'MyPrivateKeyJWT')
    return token
}

const userClass = mongoose.model('userClass', userSchema);


function validateUser(user){
    const schema = Joi.object({
        name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(3).max(255).required().email(),
        password: Joi.string().min(3).max(255).required()
    });
    return schema.validate(user);
}

exports.userClass = userClass;
exports.validateUser = validateUser;



