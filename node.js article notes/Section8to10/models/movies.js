const Joi = require('joi');
const mongoose = require('mongoose') // npm install --save mongoose

// MongoDb Schema
const movieSchema = new mongoose.Schema({
    movieName : {
        type: String, 
        required: true,
        minlength: 2,
        maxlength: 255,
        // match: /pattern/ // Some Regex Pattern        
    },
    director: String,
    cast: {
        type: Array,
        validate: {
            validator: function(v){
              return v && v.length > 0; // Should not be a null and should have atleast two cast
        },message: 'The Cast must contain atleast one character names'
        }
    },
    releaseDate: Date,
    genre: {
        type: String,
        required: true,
        enum: ['horror', 'Action', 'science-fiction', 'supernatural-horror', 'comedy', 'romance', 'adventure'],
        lowercase: true,
        // uppercase: true,
        trim: true // Removes padding
    },
    sequel: Boolean,
    imdbRating: {
        type: Number,
        min: 0,
        max: 10,
        get: v => Math.round(v),
        set: v => Math.round(v),
        required: function() { return this.releaseDate; } // Conditionally make the property required
    }
  });
  
  const movieClass = mongoose.model('movieClass', movieSchema);
  
  function validateMovies(movie){
    // Validate
    // If invalid, return 400 - Bad request
    const schema = Joi.object({
      name: Joi.string().min(3).required()
    });
    return schema.validate(movie);
  };

  exports.movieClass = movieClass;
  exports.validateMovies = validateMovies;