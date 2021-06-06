const express = require('express');
const router = express.Router();
const Joi = require('joi');

Temporary Dataset
const movies = [
    { id:1, name: 'Tenet'},
    { id:2, name: 'Quantum of Solace'},
    { id:3, name: 'Inception'},
  ]

  
router.get('/', (req, res) => {
    res.send(movies)
})

router.get('/:id', (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).send('No movie found for the given id') // 404
  res.send(movie)
});

// POST METHOD
router.post('/', (req, res) => {

  const { error } = validateMovies(req.body); // Equivalent to result.error 
  if (error) return res.status(400).send(result.error.details[0].message)

  const movie = {
    id: movies.length + 1,
    name: req.body.name
  };

  movies.push(movie);
  res.send(movie)
});

// PUT METHOD
router.put('/:id', (req, res) => {
  // Look up the movie
  // If not existing, return 404
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).send('No movie found for the given id') // 404

  const { error } = validateMovies(req.body); // Equivalent to reslt.error 
  if (error) return res.status(400).send(error.details[0].message) // Don't execute the rest of the program

  // Update movie
  // Return the updated movie
  movie.name  = req.body.name
  res.send(movie)
})

// DELETE METHOD
router.delete('/:id', (req, res) => {
  // Look up the course
  // Not Existing, return 404
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).send('No movie found for the given id') // 404

  // Delete
  const index = movies.indexOf(movie);
  movies.splice(index, 1)

  // Return the same movie
  res.send(movie)
})

function validateMovies(movie){
  // Validate
  // If invalid, return 400 - Bad request
  const schema = Joi.object({
    name: Joi.string().min(3).required()
  });
  return schema.validate(movie);
};

module.exports = router;