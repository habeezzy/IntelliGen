import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import intelligenRoutes from './routes/intelligenRoutes.js';

//pull environmental variable from .env file
dotenv.config();

//express app
const app = express();
app.use(cors());
app.use(express.json({limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/intelligen', intelligenRoutes);

app.get('/', async (req, res) => {
  res.status(200).json({
    message: 'Hello from IntelliGen!',
  });
});

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(8080, () => console.log('Server has started on port http://localhost:8080'))
  } catch (error) {
    console.log(error);
  }
};


startServer();