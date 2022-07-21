import joi from "joi";

export const Game = joi.object({
  name: joi.string()
    .required(),
  image: joi.string()
    .regex(/http(s|):\/\/\S+\.(jpg|png|jpge|gif)$/),
  stockTotal: joi.number().min(1).required(), 
  categoryId: joi.number().required(), 
  pricePerDay: joi.number().min(1).required(),

})