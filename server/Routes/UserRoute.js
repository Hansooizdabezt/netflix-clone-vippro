import express from "express";
import {
  addLikeMovie,
  changePassword,
  deleteLikedMovies,
  deleteUser,
  deleteUserProfile,
  getAllUsers,
  getLikeMovies,
  loginUser,
  registerUser,
  updateUserProfle,
} from "../Controllers/UserController.js";
import { admin, protect } from "../middlewares/Auth.js";

const router = express.Router();

// *****************PUBLIC ROUTES********************

router.post("/", registerUser);

router.post("/login", loginUser);

// *****************PRIVATE ROUTES********************

router.put("/", protect, updateUserProfle);

router.delete("/", protect, deleteUserProfile);

router.put("/password", protect, changePassword);

router.get("/favorites", protect, getLikeMovies);

router.post("/favorites", protect, addLikeMovie);

router.delete("/favorites", protect, deleteLikedMovies);

// *****************ADMIN ROUTES********************

router.get("/", protect, admin, getAllUsers);

router.delete("/:id", protect, admin, deleteUser);

export default router;
