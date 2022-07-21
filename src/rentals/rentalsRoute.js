import {Router} from 'express';
import { createRental, getRentals } from './rentalsController.js';
import { createRentalValidation, getRentalQueryHandler } from './rentalsMiddleware.js';

const route = Router();

route.get("/",getRentalQueryHandler, getRentals);
route.post("/", createRentalValidation, createRental);

export default route;