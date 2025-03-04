import { MoviesData } from "../Data/MovieData.js";
import Movie from "../Models/MoviesModel.js";

const importMovies = async (req, res) => {
    const movies = await Movie.insertMany(MoviesData);
    res.status(201).json(movies);
};

const getMovies = async (req, res) => {
    try {
        const {category, time, language, rate, year, search} = req.query;
        let query = {
            ...(category && { category}),
            ...(time && { time }),
            ...(language && { language }),
            ...(rate && { rate }),
            ...(year && { year }),
            ...(search &&  {name : {$regex: search, $options: "i"}}),
        }

        //load more movies functionality
        const page = Number(req.query.pageNumber) || 1;
        const limit = 4;
        const skip = (page - 1) * limit;

        //find movies by query, skip, limit
        const movies = await Movie.find(query).sort({createdAt: -1}).skip(skip).limit(limit);

        //get total number of movies
        const count = await Movie.countDocuments(query);

        //send response with movies and total number of movies
        res.json({
            page,
            pages: Math.ceil(count / limit),
            totalMovies: count,
            movies,
        })
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}

export {importMovies, getMovies};