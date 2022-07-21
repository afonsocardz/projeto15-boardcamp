import {Router} from 'express';
import { createRental, getRentals } from './rentalsController.js';
import { createRentalValidation } from './rentalsMiddleware.js';

const route = Router();

route.get("/", getRentals);
route.post("/", createRentalValidation, createRental);

export default route;