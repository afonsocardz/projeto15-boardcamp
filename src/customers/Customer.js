import joi from 'joi';
import JoiDate from "@joi/date";

const JoiExtended = joi.extend(JoiDate);

export const Customer = joi.object({
  name: joi.string()
    .required(),
  phone: joi.string()
    .regex(/[0-9]{10,11}/)
    .required(),
  cpf: joi.string()
    .regex(/[0-9]{11}/)
    .required(),
  birthday: JoiExtended.date().format('YYYY-MM-DD')
    .required(),
});