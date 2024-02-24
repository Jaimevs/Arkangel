import express from 'express';
import morgan from 'morgan';
import cors from 'cors'

import uploadRoutes from './routes/upload.routes.js';

const app = express();


app.use(cors({
  origin: 'http://localhost:5173', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
}));


app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api', uploadRoutes); 

app.get('/', (req, res) => {
  res.json({ message: 'Welcome' });
});

app.use((err, req, res, next) => {
  res.status(500).json({
    status: 'error',
    message: err.message,
  });
});

export default app;
