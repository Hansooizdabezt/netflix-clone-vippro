import jwt from "jsonwebtoken";
import User from "../Models/UserModel.js";
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }{
  try {
    token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (error) {
    console.log(error);
    res.status(401);
    throw new Error("Not authorized, token failed");
  }

} if(!token){
   res.status(401);
   throw new Error("Not authorized, no token");}
}

export { generateToken,protect };
