const { CLIENT_RENEG_LIMIT } = require('tls');
const movieClass = require('./movieSchema')
console.clear()

// ** CONTAINS UPGRADED CODE WITH DATA VALIDATION ** //

// // CREATE
async function insertMovie(name_, director_, rating_, cast_, date_, genre_, sequel_){
    const movieObject = new movieClass({
        movieName : name_,
        director: director_,
        imdbRating: rating_,
        cast: cast_,
        releaseDate: date_,
        genre: genre_,
        sequel: sequel_
    });

    try{
        result = await movieObject.save()
        return result
    }
    catch (ex){
        console.log('movieName Error', ex.errors.movieName)

        for (field in ex.errors){
            console.log(`${field} - Errors ${ex.errors[field]}`)
        }
    }    
    
}

// Function Call
let output_1 = insertMovie('Inception', 'Christopher Nolan', 7.6, ['Leonardo DiCaprio', 'Emma Thomas', 'Tom Hardy'], new Date('2010-07-16'),
                         'science-fiction', false)
output_1.then(function(response) {
    console.log(response, 'output response')
})