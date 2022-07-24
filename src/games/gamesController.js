import connection from "../databases/postgres.js";

async function getGames(req, res) {
  const dbQuery = res.locals.dbQuery;
  const values = res.locals.values;
  const { rows: game } = await connection.query(dbQuery, values);
  res.status(200).send(game);
}

async function createGame(req, res) {
  const { name, image, stockTotal, categoryId, pricePerDay } = res.locals.game;
  try {
    await connection
      .query(`INSERT INTO games ("name", "image", "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5)`,
        [name, image, stockTotal, categoryId, pricePerDay]);
    res.sendStatus(201);
  } catch (err) {
    res.sendStatus(500);
  }

}


export { getGames, createGame };