import dotenv from 'dotenv';
import app from './app.js';
import { connectDb } from './db/mongodb.js';

dotenv.config();

const port = process.env.PORT || 8000;

connectDb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running at port: ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error starting server:', error);
  });