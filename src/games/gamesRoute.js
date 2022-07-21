import { Router } from 'express';
import { getGames, createGame } from './gamesController.js';
import { createGameValidation } from './gamesMiddleware.js';

const route = Router();

route.get("/", getGames);
route.post("/", createGameValidation, createGame);

export default route;