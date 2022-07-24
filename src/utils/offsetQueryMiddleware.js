export default function offsetQuery(req,res, next){
  let dbQuery = res.locals.dbQuery;
  let values = res.locals.values;
  if (!values) values = [];
  const {offset, limit}  = req.query;
  if(offset){
    dbQuery += ' OFFSET $' + (values.length + 1);
    values.push(offset);
    console.log(dbQuery);
  }
  if(limit){
    dbQuery += ' LIMIT $' + (values.length + 1);
    values.push(limit);
  }
  res.locals.dbQuery = dbQuery;
  res.locals.values = values;
  next();
};