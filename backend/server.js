import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { sequelize } from './models/index.js'; 
import { fileURLToPath } from 'url';
import path from 'path';
import cookieParser from 'cookie-parser';



dotenv.config();
const app = express();
const PORT = process.env.PORT;


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors({
        origin: process.env.CORS_ORIGIN, 

    credentials: true   
}));
app.use(cookieParser());
app.use(express.json());

app.use(express.static(path.join(__dirname, '../public')));




app.get('/', (req, res) => {
  res.send('Running...');
});

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('db success');
    

      await sequelize.sync({ alter: true });
      console.log('sync success');

    app.listen(PORT, () => {
      console.log(`bluetooth connected on ${PORT}`);
    });
  } catch (error) {
    console.error( error);
  }
};

startServer();