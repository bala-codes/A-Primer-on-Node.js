const express = require('express');
const app = express()
const Joi = require('joi');
const config = require('config');

require('./startup/logging');
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();

// Configuration
console.log('Applcation Name : ' + config.get('Project Name'))
console.log('Type of Environment : ' + config.get('Environment'))

// Listen PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));