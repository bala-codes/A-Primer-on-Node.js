const config = require('config')
const debug = require('debug')('app:startup') // export DEBUG=app:debug
const express = require('express');
const helmet = require('helmet')
const morgan = require('morgan')
const app = express() // Contains the HTTP Verbs
const Joi = require('joi');
const authentication  = require('./middleware/mware')
const movies = require('./routes/movies')
const home = require('./routes/home')

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(helmet());

app.use('/api/movies', movies) // Any route which starts with /api/movies, then use the router movies defined above.
app.use('/', home) // Any route which starts with /, then use the router home defined above.

// PUG Engines
app.set('views', './views');
app.set('view engine', 'pug');

// Configuration
console.log('Applcation Name : ' + config.get('Project Name'))
console.log('Type of Environment : ' + config.get('Environment'))

console.log(`Node Environment : ${process.env.NODE_ENV}`)
if (app.get('env') == 'development'){
  app.use(morgan('tiny'));
  // console.log('Morgan Enabled')
  debug('Morgan Enabled')
};

// Custom Middleware Integration
app.use(function(req, res, next){
  console.log('Logging request...');
  next(); // Pass control to the next middleware; otherwise stuck
})

app.use(authentication);

// Listen PORT
// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));