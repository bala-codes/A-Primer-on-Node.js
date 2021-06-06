const movieClass = require('./movieSchema')
console.clear()

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
    result = await movieObject.save() 
    return result
}

// Function Call
let output_1 = insertMovie('Inception', 'Christopher Nolan', 7, ['Leonardo DiCaprio', 'Cillian Murphy'], new Date('2010-07-16'),
                         'science-fiction', false)
output_1.then(function(response) {
    console.log(response, 'output response')
})

// Function Call
let output_2 = insertMovie('Tenet', 'Christopher Nolan', 7, ['George David Washington', 'Robert Pattinson'], new Date('2020-12-04'),
                         'science-fiction', false)
output_2.then(function(response) {
    console.log(response, 'output response')
})

// Function Call
let output_3 = insertMovie('The Conjuring', 'James Wan', 6, ['Vera Farmiga', 'Patrick Wilson'], new Date('2013-07-15'),
                         'supernatural-horror', true)
output_3.then(function(response) {
    console.log(response, 'output response')
})

// // READ 
// Function Declaration - Variant 1
async function fetchMovies(){
    const movieObjects = await movieClass
        .find({sequel: false}) // Find movies with no sequel
        .limit(10) // Display upto 10 fields
        .sort({imdbRating: 1}) // Sort based on imdb rating
        .select({movieName:1, director:1} // Select only the fields specified here,  remove select to list all fields in the document
        ); 
    return movieObjects
}

// Function Call
let read_output_ = fetchMovies();
read_output_1.then(function(response) {
    console.log(response, 'output response')
})

// Function Declaration - Variant 3
async function fetchMovies_Comparision(){
    // eq (equal)
    // ne (not equal)
    // gt (greater than)
    // gte (greater than or equal to)
    // lt (less than)
    // lte (less than or equal to)
    // in
    // nin (not in)
    
    // Query here
    const movieObjects = await movieClass
        .find({sequel: { $eq: true }}) // Fetches the movies with sequel equal to true
        // .find({imdbRating : { $gte: 5, $lte: 9 }, sequel : { $eq: true}}) // Fetches the movies with imdb rating > 5 & imdb rating < 9, and sequel to be true
        // .find({imdbRating : { $in:[7,8,9] }}) // Fetches the movies with imdb rating with 7,8,9

        .limit(10) 
        .sort({imdbRating: 1})
        .select({movieName:1, director:1});
        return movieObjects
}

// Function Call
let read_output_2 = fetchMovies_Comparision();
read_output_2.then(function(response) {
    console.log(response, 'output response')
})

// Function Declaration - Variant 3
async function fetchMovies_Logical(){
    // or
    // and
    
    // Query here
    const movieObjects = await movieClass
        .find()
        // .find({ sequel: /^true/ }) // Regex - Self explanatory

        // .or([ {sequel: false}, {imdbRating: 8} ]) // Fetches the movie with sequel false or imdb rating = 8
        .and([ {sequel: false}, {imdbRating: 8} ]) // Fetches the movie with sequel false and imdb rating = 8

        .limit(10) 
        .sort({imdbRating: 1})

        return movieObjects
}

// Function Call
let read_output_3 = fetchMovies_Logical();
read_output_3.then(function(response) {
    console.log(response, 'output response')
})

// Function Declaration - Variant 4
async function fetchMovies_Regex(){    
    // Query here
    const movieObjects = await movieClass
        
        .find({ director: /^Quentin/ })         // Starts with Quentin 
        // .find({ director: /tarantino$/i })   // Ends with tarantino
        // .find({ director: /.*Nolan.*/i })    // Contains Nolan
        
        .limit(10) 
        .sort({conversationId: 1})
        .select({}); // Select all
        return movieObjects
}

// Function Call
let read_output_4 = fetchMovies_Regex();
read_output_4.then(function(response) {
    console.log(response, 'output response')
})

// Function Declaration - Variant 5
async function fetchMovies_Count(){
    const movieObjects = await movieClass
        // .find({sequel: false, imdbRating : 8})
        .find({sequel: false,})
        .limit(10)
        .sort({imdbRating: 1})
        .countDocuments();
    
        return movieObjects
}

// Function Call
let read_output_5 = fetchMovies_Count();
read_output_5.then(function(response) {
    console.log(response, 'output response')
})

// // UPDATE
async function update_MovieCast(movieName, newCast){

    const movieObjects = await movieClass.collection.findOneAndUpdate(
        {movieName: movieName}, 
        { 
            $push: {
                cast: `${newCast}`},
        }
        );
    return movieObjects
}

// Function Call
let update_output_1 = update_MovieCast('Inception', 'Michael Caine')
update_output_1.then(function(response) {
    console.log(response, 'output response')
})


// Update Boolean and Number
async function update_SequelAndImdbRating(movieName, sequel_new, rating){

    const movieObjects = await movieClass.collection.findOneAndUpdate(
        {movieName: movieName}, 
        { 
            $set: {
                sequel: sequel_new,
                imdbRating: rating
            }
        }
        );
    return movieObjects
}

// Function Call
let update_output_2 = update_SequelAndImdbRating('The Nun', true, 8.5);
update_output_2.then(function(response) {
    console.log(response, 'output response')
})

// // DELETE
async function deleteMovie(name){
    const movieObjects = await movieClass.deleteOne( {movieName: name});
    return movieObjects
}

// Function Call
let delete_output = deleteMovie('The Nun');
delete_output.then(function(response) {
    console.log(response, 'output response')
})
