import express, {json} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const PORT = process.env.PORT;
const app = express();
app.use(json());
app.use(cors());

app.listen(PORT, () => {
  console.log('server is running on port ' + PORT);
});
