import express from 'express';
import authRouter from './routers/authRouter.js';

// Creates an express app
const app = express();
const PORT = process.env.PORT || 3000;

// Enables json requests
app.use(express.json());

// Routes
app.use('/auth', authRouter);

// Server start
app.listen(3000, () => {
    console.log(`Server started up ${PORT}`);
})