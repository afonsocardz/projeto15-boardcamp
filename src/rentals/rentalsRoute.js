import { Router } from 'express';
import offsetQuery from '../utils/offsetQueryMiddleware.js';
import { createRental, deleteRental, finishRental, getRentals } from './rentalsController.js';
import { createRentalValidation, finishRentalValidate, getRentalQueryHandler } from './rentalsMiddleware.js';

const route = Router();

route.get("/", getRentalQueryHandler, offsetQuery, getRentals);
route.post("/", createRentalValidation, createRental);
route.post("/:id/return", finishRentalValidate, finishRental);
route.delete("/:id", finishRentalValidate, deleteRental);

export default route;