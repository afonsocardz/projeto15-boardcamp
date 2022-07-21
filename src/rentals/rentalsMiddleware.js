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

export { createRentalValidation };