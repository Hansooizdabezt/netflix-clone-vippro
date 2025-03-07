import express from "express";
import { createMovie, createMovieReview, deleteAllMovies, deleteMovie, getBotRateMovies, getMovieById, getMovies, getRandomMovies, getTopRateMovies, importMovies, updateMovie } from "../Controllers/MoviesController.js";
import { admin, protect } from "../middlewares/Auth.js";

const router = express.Router();

// *****************PUBLIC ROUTES********************
router.post('/import', importMovies);
router.get('/', getMovies);
router.get('/:id', getMovieById);
router.get('/rated/top', getTopRateMovies);
router.get('/rated/bot', getBotRateMovies);
router.get('/random/all', getRandomMovies);

// *****************PRIVATE ROUTES********************
router.post("/:id/reviews", protect, createMovieReview);

// *****************ADMIN ROUTES********************
router.put("/:id", protect, admin, updateMovie);
router.delete("/:id", protect, admin, deleteMovie);
router.delete("/", protect, admin, deleteAllMovies);
router.post("/", protect, admin, createMovie);


export default router;
