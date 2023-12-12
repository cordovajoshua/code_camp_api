import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import userRoutes from './routes/userRoutes.js';
import courseRoutes from './routes/courseRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/users', userRoutes);
app.use('/courses', courseRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Database connected successfully');
    app.listen(PORT, () => {
      console.log(`Serving running at port ${PORT}`);
    });
  })
  .catch((error) => console.log(`Error: ${error.message}`));
