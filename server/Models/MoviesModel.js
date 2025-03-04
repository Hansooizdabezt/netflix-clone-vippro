import mongoose from "mongoose";

const reviewSchema= new mongoose.Schema({
    userName:{type:String , required:true},
    userImage:{type:String , required:true},
    rating:{type:String , required:true},
    comment:{type:String , required:true},
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, {timestamps:true});

const moviesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  titleImage: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  time:{
    type: Number,
    required: true,
  },
  video: {
    type: String,
    // required: true
  },
  rate: {
    type: Number,
    required: true,
    default: 0,
  },
  numberOfRates: {
    type: Number,
    required: true,
    default: 0,
  },
  reviews: [],
  casts: [
    {
      name: { type: String, required: true },
      iamge: { type: String, required: true },
    },
  ],
},{
    timestamps: true,
});

const Movie =  mongoose.model("Movie", moviesSchema);
export default Movie;
