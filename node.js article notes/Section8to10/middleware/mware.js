// CUSTOM FUNCTIONS - Middleware
function authentication(req, res, next){
    console.log('Authentication Starts...');
    next();
  }

  module.exports = authentication