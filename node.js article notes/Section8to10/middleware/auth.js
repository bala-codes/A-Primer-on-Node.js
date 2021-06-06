const jwt = require('jsonwebtoken')

// CUSTOM FUNCTIONS - For Auth
function auth(req, res, next){
    console.log('Authentication Starts...');
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access Denied. No Token Provided')

    try{
        const decoded = jwt.verify(token, 'MyPrivateKeyJWT');
        req.user = decoded;
        next();
    }catch(ex){
        res.status(400).send('Invalid Token')
    }
}

module.exports = auth