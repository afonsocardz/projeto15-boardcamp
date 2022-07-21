import { Router } from 'express';
import { getCategories, createCategory } from './categoriesController.js';
import { createCategoryValidation } from './categoriesMIddleware.js';

const route = Router();

route.get("/", getCategories);
route.post("/", createCategoryValidation, createCategory);

export default route;