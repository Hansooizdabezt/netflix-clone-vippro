import express from "express";
import { admin, protect } from "../middlewares/Auth.js";
import { createCategory, deleteCategory, getCategories, updatedCategory } from "../Controllers/CategoriesController.js";

const router = express.Router();

// *****************PUBLIC ROUTES********************

router.get('/', getCategories);

// *****************PRIVATE ROUTES********************

router.post('/', protect, admin, createCategory);
router.put('/:id', protect, admin, updatedCategory);
router.delete('/:id',protect, admin, deleteCategory);

// *****************ADMIN ROUTES********************






export default router;
