const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt')
const Joi = require('joi');
const jwt = require('jsonwebtoken')
const router = express.Router();
const config = require('config')
const {userClass} = require('../models/users')
  
router.post('/', async (req, res) => {

    const { error } = validateUser(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    let user = await userClass.findOne({email: req.body.email})
    if (!user) return res.status(400).send('Invalid Email.');

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send('Invalid Password.');

    try{
        const token = user.generateAuthToken(); //jwt.sign({ _id: user._id, email: user.email }, 'MySecurePrivateKey') // config.get('jwtPrivateKey')) // Payload + Private Key    
        res.send(token)
      }catch (ex){
        console.log('Error in Promises', ex.message)
        res.status(400).send( ex.message)
    }
})

function validateUser(req){
    const schema = Joi.object({
        email: Joi.string().min(3).max(255).required().email(),
        password: Joi.string().min(3).max(255).required()
    });
    return schema.validate(req);
}

module.exports = router;