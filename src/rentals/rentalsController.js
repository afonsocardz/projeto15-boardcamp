import dayjs from "dayjs";
import connection from "../databases/postgres.js";

const mapRental = rental => {
  const obj = {
    ...rental,
    customer: {
      id: rental.customerId,
      name: rental.customerName,
    },
    game: {
      id: rental.gameId,
      name: rental.gameName,
      categoryId: rental.categoryId,
      categoryName: rental.categoryName
    },
  };
  delete obj.customerName;
  delete obj.gameName;
  delete obj.categoryId;
  delete obj.categoryName;
  return obj;
}

async function getRentals(req, res) {
  const dbQuery = res.locals.dbQuery;
  const values = res.locals.values;
  const { rows: rentals } = await connection.query(dbQuery, values);
  const newRentals = rentals.map(mapRental);
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
    const delayFee = delayedDays > 0 ? delayedDays * game.pricePerDay : 0;
    await connection.query('UPDATE rentals SET "delayFee" = $1, "returnDate" = $2 WHERE id = $3', [delayFee, today, rental.id]);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }

}

async function deleteRental(req, res) {
  const rental = res.locals.rental;
  try {
    await connection.query('DELETE FROM rentals WHERE id = $1', [rental.id]);
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
}

export { createRental, getRentals, finishRental, deleteRental };