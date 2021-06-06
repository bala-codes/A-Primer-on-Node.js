const express = require('express');
const _ = require('lodash');
const bcrypt = require('bcrypt')
const auth  = require('../middleware/auth')

const router = express.Router();

const {userClass, validateUser} = require('../models/users')

router.get('/me', auth, async(req, res) => {
  const user = await userClass.findById(req.user._id).select('-password')
  res.send(user);
});

router.post('/', async (req, res) => {

    const { error } = validateUser(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    let user = await userClass.findOne({email: req.body.email})
    if (user) return res.status(400).send('User Already Registered.');

    user = new userClass(_.pick(req.body, ['name', 'email', 'password']));
    
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    try{
        await user.save()

        const token = user.generateAuthToken();        
        res.header('x-auth-jwtoken', token).send(_.pick(user, ['_id', 'name', 'email']))

      }catch (ex){
        console.log('Error in Promises', ex.message)
        res.status(400).send( ex.message)
    }
})

module.exports = router;