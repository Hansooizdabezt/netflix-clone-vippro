import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Please provide full name"],
    minlength: [4, "Please enter more than or equal 4 characters"],
    maxlength: [35, "Please enter less than or equal 35 characters"],
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    unique: true,
    match: [/\S+@\S+\.\S+/, "Please enter a valid email address"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: [8, "Please enter more than or equal 8 characters"],
  },
  image: {
    type: String,
    default:
      "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.freepik.com%2Ffree-photos-vectors%2Fuser&psig=AOvVaw1wPDq1KvhLPU3Fgi2Wf2_w&ust=1740315581654000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKCeyfyq14sDFQAAAAAdAAAAABAE",
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  likeMovies:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
  }],
}, {timestamps: true});

const User =  mongoose.model("User", UserSchema);
export default User;
