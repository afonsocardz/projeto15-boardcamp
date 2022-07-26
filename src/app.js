import express, {json} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import categoriesRoute from './categories/categoriesRoute.js';
import gamesRoute from './games/gamesRoute.js';
import customersRoute from './customers/customersRoute.js';
import rentalsRoute from './rentals/rentalsRoute.js';

dotenv.config();
const PORT = process.env.PORT;
const app = express();
app.use(json());
app.use(cors());

app.use("/categories", categoriesRoute);
app.use("/games", gamesRoute);
app.use("/customers", customersRoute);
app.use("/rentals", rentalsRoute)

app.listen(PORT, () => {
  console.log('server is running on port ' + PORT);
});
