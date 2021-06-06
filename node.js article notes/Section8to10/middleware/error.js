const winston = require('winston');

// Error handling
function errorHandling(err, req, res, next){
    // Log the Exception
    winston.log('error', err.message, err) // Logging level - error, warning, info, verbose, debug, silly
    res.status(500).send('Something failed. Please try again')
}
module.exports = errorHandling