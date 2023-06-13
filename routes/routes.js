const express = require('express')
const router = express.Router()
const mainController = require('../controller/controller')

router.get('/longest-duration-movies',  mainController.getLongestMovie);
router.post('/new-movie', mainController.createNewMovie);
router.get('/top-rated-movies', mainController.getTopRatedMovies);
router.get('/genre-movies-with-subtotals', mainController.getMoviesGenrewise)
router.put('/update-runtime-minutes', mainController.updateMovieRuntime)
module.exports = router;