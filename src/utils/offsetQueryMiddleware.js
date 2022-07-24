export default function offsetQuery(req, res, next) {
  let dbQuery = res.locals.dbQuery;
  let values = res.locals.values;
  if (!values) values = [];
  const { offset, limit, order, desc } = req.query;
  
  if (offset) {
    dbQuery += ' OFFSET $' + (values.length + 1);
    values.push(offset);
  }
  if (limit) {
    dbQuery += ' LIMIT $' + (values.length + 1);
    values.push(limit);
  }
  if (order) {
    dbQuery += ` ORDER BY "${order}"`;
    if (desc) {
      dbQuery += ' DESC';
    }
  }
  res.locals.dbQuery = dbQuery;
  res.locals.values = values;
  next();
};