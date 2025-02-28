import express from 'express';
import { loginUser, registerUser, updateUserProfle} from "../Controllers/UserController.js"
import { protect } from '../middlewares/Auth.js';

const router = express.Router();

router.post('/', registerUser);

router.post('/login', loginUser);

router.put("/", protect, updateUserProfle)

export default router;