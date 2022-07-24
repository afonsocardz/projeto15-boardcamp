import connection from "../databases/postgres.js";
import { Game } from "./Game.js";

function getGamesQuery(req, res, next) {
  let dbQuery = 'SELECT games.id AS id, games.name, image, "stockTotal", "categoryId", "pricePerDay", categories.name AS "categoryName" FROM games  INNER JOIN categories ON games."categoryId" = categories.id';
  const { name } = req.query;
  if (name) {
    dbQuery = dbQuery + ` WHERE games.name ILIKE '%${name}%'`;
  }
  res.locals.dbQuery = dbQuery;
  next();
}

async function createGameValidation(req, res, next) {
  const game = req.body;
  const { error } = Game.validate(game);
  if (error) {
    return res.sendStatus(400);
  }
  const gameExists = await connection.query('SELECT * FROM games WHERE name = $1', [game.name]);
  if (gameExists.rows.length !== 0) {
    return res.sendStatus(409);
  }
  res.locals.game = game;
  next();
}

export { createGameValidation, getGamesQuery };