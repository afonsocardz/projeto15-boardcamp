import { Router } from 'express';
import offsetQuery from '../utils/offsetQueryMiddleware.js';
import { getGames, createGame } from './gamesController.js';
import { createGameValidation, getGamesQuery } from './gamesMiddleware.js';

const route = Router();

route.get("/", getGamesQuery, offsetQuery, getGames);
route.post("/", createGameValidation, createGame);

export default route;