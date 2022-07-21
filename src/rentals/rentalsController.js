import connection from "../databases/postgres.js";

const mapRental = async rental => {
  const { rows: [customer] } = await connection.query('SELECT id, name FROM customers WHERE id = $1', [rental.customerId]);
  const { rows: [game] } = await connection.query('SELECT games.id, games.name, "categoryId", categories.name AS "categoryName" FROM games INNER JOIN categories ON games."categoryId" = categories.id WHERE games.id = $1', [rental.gameId]);
  console.log(customer);
  console.log(game);
  return {
    ...rental,
    customer,
    game,
  }
}

async function getRentals(req, res) {
  const dbQuery = res.locals.dbQuery;
  const value = res.locals.value;
  const { rows: rentals } = await connection.query(dbQuery, value.length !== 0 && value);
  const newRentals = await Promise.all(rentals.map(mapRental));
  console.log(newRentals);
  res.status(200).send(newRentals);
}

async function createRental(req, res) {
  const { customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee } = res.locals.rental;
  await connection.query('INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7)',
    [customerId, gameId, rentDate, daysRented, returnDate, originalPrice, delayFee]);
  res.sendStatus(201);
}

export { createRental, getRentals };