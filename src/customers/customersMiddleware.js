import { Customer } from './Customer.js';
import connection from '../databases/postgres.js';

function getCustomerQuery(req, res, next) {
  const { cpf } = req.query;
  let dbQuery = 'SELECT * FROM customers';
  if (cpf) {
    dbQuery += ` WHERE cpf LIKE '${cpf}%'`;
  }
  res.locals.dbQuery = dbQuery;
  next();
};

function validateCustomer(customer) {
  const { error } = Customer.validate(customer);
  if (error) {
    return res.sendStatus(400);
  }
}

async function createCustomerValidation(req, res, next) {
  const customer = req.body;
  validateCustomer(customer);
  const { rows: customerExists } = await connection.query('SELECT * FROM customers WHERE cpf = $1', [customer.cpf]);
  if (customerExists.length !== 0) {
    return res.sendStatus(409);
  }
  res.locals.customer = customer;
  next();
}

async function updateCustomerValidaton(req, res, next) {
  const { id } = req.params;
  const customer = req.body;
  validateCustomer(customer);
  const { rows: customerExists } = await connection.query('SELECT * FROM customers WHERE id != $1 AND cpf = $2', [id, customer.cpf]);
  if (customerExists.length !== 0) {
    return res.sendStatus(409);
  }
  res.locals.customer = customer;
  next();
}

export { createCustomerValidation, updateCustomerValidaton, getCustomerQuery };