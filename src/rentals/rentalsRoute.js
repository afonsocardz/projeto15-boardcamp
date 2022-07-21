import { Router } from 'express';
import { createRental, deleteRental, finishRental, getRentals } from './rentalsController.js';
import { createRentalValidation, finishRentalValidate, getRentalQueryHandler } from './rentalsMiddleware.js';

const route = Router();

route.get("/", getRentalQueryHandler, getRentals);
route.post("/", createRentalValidation, createRental);
route.post("/:id/return", finishRentalValidate, finishRental);
route.delete("/:id", finishRentalValidate, deleteRental);

export default route;