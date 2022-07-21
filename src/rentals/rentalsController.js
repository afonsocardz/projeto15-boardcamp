import dayjs from "dayjs";
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

async function finishRental(req, res) {
  const rental = res.locals.rental;
  try { 
    const { rows: [game] } = await connection.query('SELECT "pricePerDay" FROM games WHERE id = $1', [rental.gameId]);

    const today = dayjs();
    const rentDate = dayjs(rental.rentDate);
    const delayedDays = today.diff(rentDate, "day") - rental.daysRented;
    const delayFee = delayedDays * game.pricePerDay;

    await connection.query('UPDATE rentals SET "delayFee" = $1, "returnDate" = $2 WHERE id = $3', [delayFee, today, rental.id]);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

}

export { createRental, getRentals, finishRental };