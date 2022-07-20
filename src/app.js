import express, {json} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import categoriesRoute from './categories/categoriesRoute.js';

dotenv.config();
const PORT = process.env.PORT;
const app = express();
app.use(json());
app.use(cors());

app.use("/categories", categoriesRoute);

app.listen(PORT, () => {
  console.log('server is running on port ' + PORT);
});
