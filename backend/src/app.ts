import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router } from './routes';
import { errorMiddleware } from './middlewares/errorMiddleware';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', router);

// app.use(errorMiddleware);

export { app }; 