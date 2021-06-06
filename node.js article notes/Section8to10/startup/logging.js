const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function() {
    winston.handleExceptions(
        new winston.transports.Console({colorize:true, prettyPrint:true}),
        new winston.transports.File({filename: 'uncaughtExceptions.log'}))
      
    process.on('unhandledRejection', (ex) => {
        throw ex;
      })
       
    winston.add(new winston.transports.File({ filename: 'combined.log' }))
    winston.add(new winston.transports.MongoDB({
         db: 'mongodb://localhost/movies',
         level: 'error' }))
}
