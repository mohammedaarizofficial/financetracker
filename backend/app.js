import connectdb from '../backend/config/db.js';
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/users.routes.js';
import incomeRoutes from './routes/income.routes.js';


dotenv.config();

const PORT = process.env.PORT;
const app = express();
app.use(cors());

connectdb();


app.use(express.json());

app.get('/', (req, res)=>{
  res.send('Hello world');
})

app.use('/users', userRoutes);
app.use('/income', incomeRoutes);

app.listen(PORT, ()=>{
  console.log(`Server is running at ${PORT}`);
})




