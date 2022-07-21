import connection from "../databases/postgres.js";

async function getCategories(req, res) {
  const {rows} = await connection.query('SELECT * FROM categories');
  res.status(200).send(rows);
};

async function createCategory(req, res) {
  const categoryName = res.locals.categoryName;
  await connection.query('INSERT INTO categories (name) VALUES ($1)', [categoryName]);
  res.sendStatus(201);
};

export { createCategory, getCategories };