import connection from "../databases/postgres.js";

async function getCategories(req, res) {
  const dbQuery = res.locals.dbQuery;
  const values = res.locals.values;
  const {rows} = await connection.query(dbQuery,values);
  res.status(200).send(rows);
};

async function createCategory(req, res) {
  const categoryName = res.locals.categoryName;
  await connection.query('INSERT INTO categories (name) VALUES ($1)', [categoryName]);
  res.sendStatus(201);
};

export { createCategory, getCategories };