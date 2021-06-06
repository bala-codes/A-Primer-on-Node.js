console.clear()

// Get the Movie and Director - With Promise

// getMovies(1)
//     .then(movie => getDirector(movie.Name) )
//     .then(director => console.log(`Director - ${director}`) )
//     .catch(err => console.log('Error ', err.message));

// Get the Movie and Director - With Async & Await
async function executeAll(id){
    try{
        const movie = await getMovies(id)
        const director = await getDirector(movie.Name)
        console.log(movie.Name, director)
    }catch(err){
        console.log('Error :', err.message)
    }
}

executeAll(1);

function getMovies(id){
    return new Promise( (resolve, reject) => {
        setTimeout(() => {
            console.log('Simulating a movie fetching operation', id)
            resolve({id:id, Name:'Tenet'});
        }, 2000);
    })
}

function getDirector(moviename){
    return new Promise( (resolve, reject) => {
        setTimeout(() => {
            console.log('Simulating a movie director fetching operation for ', moviename)
            resolve(["Christopher Nolan"]);
            // reject(new Error('Some error here at Director fetching'))
        }, 2000);
    })
}
