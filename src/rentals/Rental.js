import joi from 'joi';
import JoiDate from "@joi/date";

const ExtendedJoi = joi.extend(JoiDate);

const Rental = joi.object({
  customerId: joi.number()
    .required(),
  gameId: joi.number()
    .required(),
  rentDate: ExtendedJoi.date()
    .format('YYYY-MM-DD'),
  daysRented: joi.number()
    .min(1)
    .required(),
  returnDate: ExtendedJoi.date()
    .format('YYYY-MM-DD'),
  originalPrice: joi.number(),
  delayFee: joi.number()
});

export default Rental;