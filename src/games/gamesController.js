import connection from "../databases/postgres.js";

async function getGames(req, res) {
  let dbQuery = 'SELECT games.id AS id, games.name, image, "stockTotal", "categoryId", "pricePerDay", categories.name AS "categoryName" FROM games  INNER JOIN categories ON games."categoryId" = categories.id';
  const {name} = req.query;
  if(name){
    dbQuery =  dbQuery + ` WHERE games.name LIKE '%${name}%'`;
  }
  const {rows: game} = await connection.query(dbQuery);
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