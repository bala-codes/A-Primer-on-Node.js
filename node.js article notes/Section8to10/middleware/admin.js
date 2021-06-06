const jwt = require('jsonwebtoken')

// CUSTOM FUNCTIONS - For Auth
function admin(req, res, next){
    console.log('Admin Authorizaton Starts...');
    if (!req.user.isAdmin) return res.status(403).send('Access Forbidden')
    next()
}

module.exports = admin