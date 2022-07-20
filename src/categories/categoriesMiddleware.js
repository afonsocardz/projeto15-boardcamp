import connection from "../databases/postgres.js";

async function createCategoryValidation(req, res, next) {
  const {name} = req.body;
  if(!name){
    return res.sendStatus(400);
  }
  const categoryExists = await connection.query('SELECT name FROM categories WHERE name = $1', [name])
  if (categoryExists.rows.length !== 0 ){
    return res.sendStatus(409);
  }
  res.locals.categoryName = name;
  next();
}

export {createCategoryValidation};