import { MoviesData } from "../Data/MovieData.js";
import Movie from "../Models/MoviesModel.js";

const importMovies = async (req, res) => {
    const movies = await Movie.insertMany(MoviesData);
    res.status(201).json(movies);
};

export {importMovies};