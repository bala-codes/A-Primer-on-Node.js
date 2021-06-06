const express = require('express');
const router = express.Router();

const {movieClass} = require('../models/movies')
const {validateMovies} = require('../models/movies')
const auth  = require('../middleware/auth')
const admin  = require('../middleware/admin')
const asyncMiddleware = require('../middleware/async')

// Route, mware, function
router.get('/', auth, asyncMiddleware(async (req, res) => {
      const allMovies  = await movieClass.find().sort('movieName')
      res.send(allMovies)
}));

router.get('/:id', async (req, res) => {
  const movie = await movieClass.findById(req.params.id)
  if (!movie) return res.status(404).send('No movie found for the given id') // 404
  res.send(movie)
});

// POST METHOD
router.post('/', async (req, res) => {

  // const { error } = validateMovies(req.body); // Equivalent to result.error 
  // if (error) return res.status(400).send(error.details[0].message+'>>>')

  let newMovie = new movieClass({
    movieName: req.body.movieName,
    director: req.body.director,
    imdbRating: req.body.imdbRating,
    cast: req.body.cast,
    releaseDate: new Date(req.body.releaseDate),
    genre: req.body.genre,
    sequel: req.body.sequel
  });

  newMovie = await newMovie.save()
  res.send(newMovie)   
});

// PUT METHOD
router.put('/:id', async (req, res) => {
  const { error } = validateMovies(req.body); // Equivalent to reslt.error 
  if (error) return res.status(400).send(error.details[0].message) // Don't execute the rest of the program

  const movie = await movieClass.findByIdAndUpdate(req.params.id, {movieName: req.body.name}, {
    new: true
  })
  // Look up the movie
  // If not existing, return 404
  if (!movie) return res.status(404).send('No movie found for the given id') // 404

  res.send(movie)
})

// DELETE METHOD
router.delete('/:id', [auth, admin], async (req, res) => {

  const movie = await movieClass.findByIdAndDelete(req.params.id)
  // Look up the course
  // Not Existing, return 404
  if (!movie) return res.status(404).send('No movie found for the given id') // 404

  // Return the same movie
  res.send(movie)
})

module.exports = router;