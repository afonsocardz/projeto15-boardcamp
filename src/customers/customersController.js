import connection from "../databases/postgres.js"

async function getCustomers(req, res) {
  const dbQuery = res.locals.dbQuery;
  const values = res.locals.values;
  const { rows: customers } = await connection.query(dbQuery,values);
  res.status(200).send(customers);
};

async function getCustomersById(req, res) {
  const { id } = req.params;
  const { rows: [customer] } = await connection.query('SELECT * FROM customers WHERE id = $1', [id]);
  if(customer.length === 0){
    return res.sendStatus(404);
  }
  
  res.status(200).send(customer);
}

async function createCustomer(req, res) {
  const { name, phone, cpf, birthday } = res.locals.customer;
  await connection.query('INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)',
    [name, phone, cpf, birthday]);
  res.sendStatus(201);
};

async function updateCustomer(req,res){
  const {id} = req.params;
  const { name, phone, cpf, birthday } = res.locals.customer;
  await connection.query('UPDATE customers SET name = $1, phone = $2, cpf = $3, birthday = $4 WHERE id = $5', 
  [name, phone, cpf, birthday, id]);
  res.sendStatus(200);
}

export { createCustomer, getCustomers, getCustomersById, updateCustomer };