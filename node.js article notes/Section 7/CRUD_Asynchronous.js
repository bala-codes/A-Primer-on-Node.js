const movieClass = require('./movieSchema')

// // CREATE
var theDarkKnight = new movieClass({movieName : "The dark knight",
                            director: "Christopher Nolan",
                            imdbRating: 8,
                            cast: ["Christian Bale", "Heath Ledger"],
                            releaseDate: new Date('2008-01-14'),
                            genre: "superhero",
                            sequel: true})

console.log('DB Updated');
theDarkKnight.save()

var djangoUnchained = new movieClass({movieName : "Django Unchained",
                            director: "Quentin Tarantino",
                            imdbRating: 8,
                            cast: ["Christoph Waltz", "Jamie Foxx"],
                            releaseDate: new Date('2012-12-12'),
                            genre: "revisionist Western",
                            sequel: false})

console.log('DB Updated');
djangoUnchained.save()


var theNun = new movieClass({movieName : "The Nun",
                            director: "Corin Hardy",
                            imdbRating: 6,
                            cast: ["Taissa Farmiga", "Demián Bichir"],
                            releaseDate: new Date('2018-09-04'),
                            genre: "supernatural horror",
                            sequel: false})

console.log('DB Updated');
theNun.save()

// // READ
// READ OPERATION IS STRICTLY SYNCHRONOUS

// // UPDATE
// Update Array
function update_MovieCast(movieName, newCast){

    movieClass.collection.findOneAndUpdate(
        {movieName: movieName}, 
        { 
            $push: {
                cast: `${newCast}`},
        }
        );
    console.log('DB Updated');
}

// Function Call
update_MovieCast('Tenet', 'Michael Caine') // Update new cast in the movie tenet

// Update Boolean and Number
function update_SequelAndImdbRating(movieName, sequel_new, rating){

    movieClass.collection.findOneAndUpdate(
        {movieName: movieName}, 
        { 
            $set: {
                sequel: sequel_new,
                imdbRating: rating
            }
        }
        );
    console.log('DB Updated');
}

// Function Call
update_SequelAndImdbRating('The Nun', true, 8.5)


// // DELETE
async function deleteMovie(name){
    const movieObjects = await movieClass.deleteOne( {movieName: name});
    console.log('Document Deleted', name)
}

// Function Call
deleteMovie('Tenet');