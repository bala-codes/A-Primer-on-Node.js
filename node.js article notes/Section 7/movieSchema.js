const mongoose = require('mongoose') // npm install --save mongoose
console.clear()

// Creating a Database
mongoose.connect('mongodb://localhost/MOVIELIBRARY', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));

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
            isAsync: true,
            validator: function(v, callback){
                // Do some async work or simulate something
                setTimeout(()=>{
                    const result = v && v.length > 2;  // Should not be a null and should have atleast two cast
                    callback(result) 
                }, 1000);
            },
            message: 'The Cast must contain atleast two character names'
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
module.exports = movieClass
