import express from 'express';
import { changePassword, deleteUserProfile, loginUser, registerUser, updateUserProfle} from "../Controllers/UserController.js"
import { protect } from '../middlewares/Auth.js';

const router = express.Router();

router.post('/', registerUser);

router.post('/login', loginUser);

router.put("/", protect, updateUserProfle)

router.delete("/", protect, deleteUserProfile)

router.put("/password", protect, changePassword)



export default router;