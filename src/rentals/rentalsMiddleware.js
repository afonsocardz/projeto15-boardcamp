import dayjs from "dayjs";
import connection from "../databases/postgres.js"
import Rental from "./Rental.js";

async function createRentalValidation(req, res, next) {
  const rental = req.body;

  const { error } = Rental.validate(rental);
  const { rows: [{ id: customerId }] } = await connection.query('SELECT id FROM customers WHERE id = $1', [rental.customerId]);
  const { rows: [{ id: gameId, stockTotal, pricePerDay }] } = await connection.query('SELECT * FROM games WHERE id = $1', [rental.gameId]);
  const invalidRental = !customerId || !gameId || error || stockTotal === 0;

  if (invalidRental) return res.sendStatus(400);

  res.locals.rental = {
    ...rental,
    gameId: rental.gameId,
    customerId: rental.customerId,
    rentDate: dayjs().format('YYYY-MM-DD'),
    originalPrice: pricePerDay * rental.daysRented,
    delayFee: null,
    returnDate: null
  }
  next();
}

function getRentalQueryHandler(req, res, next) {
  const { customerId, gameId } = req.query;
  let dbQuery = 'SELECT RENTALS.*, CUSTOMERS.NAME AS "customerName", GAMES.NAME AS "gameName", GAMES."categoryId", CATEGORIES.NAME AS "categoryName"FROM RENTALS INNER JOIN CUSTOMERS ON CUSTOMERS.ID = RENTALS."customerId" INNER JOIN GAMES ON GAMES.ID = RENTALS."gameId" INNER JOIN CATEGORIES ON GAMES."categoryId" = CATEGORIES.ID';
  let values = [];
  if (customerId && gameId) {
    values.push(customerId);
    values.push(gameId);
    dbQuery += ' WHERE "customerId" = $1 AND "gameId" = $2';
  } else {
    if (customerId) {
      values.push(customerId);
      dbQuery += ' WHERE "customerId" = $1'
    };
    if (gameId) {
      values.push(gameId);
      dbQuery += ' WHERE "gameId" = $1'
    };
  }
  res.locals.dbQuery = dbQuery;
  res.locals.values = values;
  next();
}

async function finishRentalValidate(req, res, next) {
  const { id } = req.params;
  const { rows: [rental] } = await connection.query('SELECT * FROM rentals WHERE id = $1', [id]);
  console.log(rental);
  if (!rental) {
    return res.sendStatus(404);
  }
  if (rental.returnDate) {
    return res.sendStatus(400);
  }
  res.locals.rental = rental;
  next();
}

export { createRentalValidation, getRentalQueryHandler, finishRentalValidate };