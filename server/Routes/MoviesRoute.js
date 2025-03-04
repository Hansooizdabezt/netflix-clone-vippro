import express from "express";
import { getBotRateMovies, getMovieById, getMovies, getTopRateMovies, importMovies } from "../Controllers/MoviesController.js";

const router = express.Router();

// *****************PUBLIC ROUTES********************
router.post('/import', importMovies);
router.get('/', getMovies);
router.get('/:id', getMovieById);
router.get('/rated/top', getTopRateMovies);
router.get('/rated/bot', getBotRateMovies);

// *****************PRIVATE ROUTES********************


// *****************ADMIN ROUTES********************

export default router;
