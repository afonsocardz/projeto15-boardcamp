import { Router } from 'express';
import offsetQuery from '../utils/offsetQueryMiddleware.js';
import { getCategories, createCategory } from './categoriesController.js';
import { createCategoryValidation, getCategoriesQuery } from './categoriesMIddleware.js';

const route = Router();

route.get("/", getCategoriesQuery, offsetQuery, getCategories);
route.post("/", createCategoryValidation, createCategory);

export default route;