import { MoviesData } from "../Data/MovieData.js";
import Movie from "../Models/MoviesModel.js";

const importMovies = async (req, res) => {
  const movies = await Movie.insertMany(MoviesData);
  res.status(201).json(movies);
};

const getMovies = async (req, res) => {
  try {
    const { category, time, language, rate, year, search } = req.query;
    let query = {
      ...(category && { category }),
      ...(time && { time }),
      ...(language && { language }),
      ...(rate && { rate }),
      ...(year && { year }),
      ...(search && { name: { $regex: search, $options: "i" } }),
    };

    //load more movies functionality
    const page = Number(req.query.pageNumber) || 1;
    const limit = 4;
    const skip = (page - 1) * limit;

    //find movies by query, skip, limit
    const movies = await Movie.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    //get total number of movies
    const count = await Movie.countDocuments(query);

    //send response with movies and total number of movies
    res.json({
      page,
      pages: Math.ceil(count / limit),
      totalMovies: count,
      movies,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ message: "Movie not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getTopRateMovies = async (req, res) => {
  try {
    const movie = await Movie.find({}).sort({ rate: -1 });
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ message: "There is not movie!!" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getBotRateMovies = async (req, res) => {
  try {
    const movie = await Movie.find({}).sort({ rate: +1 });
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ message: "There is not movie!!" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getRandomMovies = async (req, res) => {
  try {
    const movie = await Movie.aggregate([{ $sample: { size: 8 } }]);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ message: "There is not movie!!" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createMovieReview = async (req, res) => {
  const { rating, comment } = req.body;
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      const alreadyReviewed = await movie.reviews.find(
        (r) => r.userId.toString() === req.user._id.toString()
      );
      if (alreadyReviewed) {
        return res
          .status(400)
          .json({ message: "You have already reviewed this movie!" });
      }
      const review = {
        userName: req.user.fullName,
        userId: req.user._id,
        userImage: req.body.image,
        rating: Number(rating),
        comment,
      };
      movie.reviews.push(review);
      movie.numberOfRates = movie.reviews.length;

      //calculate the new rate
      movie.rate =
        movie.reviews.reduce((acc, item) => item.rating + acc, 0) /
        movie.reviews.length;

      await movie.save();
      res.status(201).json({ message: "Review added successfully" });
    } else {
      res.status(404);
      throw new Error("Movie not found!");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    const {
      name,
      desc,
      image,
      titleImage,
      rate,
      numberOfReviews,
      category,
      time,
      language,
      year,
      video,
      casts,
    } = req.body;
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      movie.name = name || movie.name;
      movie.desc = desc || movie.desc;
      movie.image = image || movie.image;
      movie.titleImage = titleImage || movie.titleImage;
      movie.rate = rate || movie.rate;
      movie.numberOfRates = numberOfReviews || movie.numberOfRates;
      movie.category = category || movie.category;
      movie.time = time || movie.time;
      movie.language = language || movie.language;
      movie.year = year || movie.year;
      movie.video = video || movie.video;
      movie.casts = casts || movie.casts;

      const updatedMovie = await movie.save();
      res.status(201).json(updatedMovie);
    } else {
      res.status(404);
      throw new Error("Movie not found!");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteAllMovies = async (req, res) => {
  try {
    const movies = await Movie.deleteMany({});
    if (movies.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "There's have no movie to delete" });
    }
    res.status(200).json({ message: "All movies deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export {
  importMovies,
  getMovies,
  getMovieById,
  getTopRateMovies,
  getBotRateMovies,
  getRandomMovies,
  createMovieReview,
  updateMovie,
  deleteMovie,
  deleteAllMovies,
};
