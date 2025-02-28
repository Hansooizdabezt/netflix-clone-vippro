import User from "../Models/UserModel.js";
import hashPassword from "../utils/hashPassword.js";
import { generateToken } from "../middlewares/Auth.js";
import bcrypt from "bcryptjs";

const registerUser = async (req, res) => {
  const { fullName, email, password, image } = req.body;
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      image,
    });

    if (newUser) {
      return res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        image: newUser.image,
        isAdmin: newUser.isAdmin,
        token: generateToken(newUser._id),
        password: hashedPassword,
      });
    } else {
      res.status(500).json({ message: "Invalid user data" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Register user failed", error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    console.log(user);
    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        image: user.image,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid password or email");
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateUserProfle = async (req, res) => {
  const { fullName, email, image } = req.body;

  try {
    const user = await User.findById(req.user._id);
    console.log(user);
    if (user) {
      user.fullName = fullName || user.fullName;
      user.email = email || user.email;
      user.image = image || user.image;

      const updatedUser = await user.save();

      return res.status(201).json({
        _id: updatedUser._id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        image: updatedUser.image,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
      });
    } 
    else {
      res.status(500).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export { registerUser, loginUser, updateUserProfle };
