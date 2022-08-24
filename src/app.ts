import express from 'express';
import mongoose from 'mongoose';

import { config } from './configs';
import { apiRouter } from './routes';

const mongoDB = config.DATABASE_URL;
const { PORT } = config;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(apiRouter);

const start = async () => {
    const connected = await mongoose.connect(mongoDB);
    if (connected) console.log('Connected to databased');

    app.listen(PORT, () => {
        console.log(`The Server had been started on PORT:${PORT}`);
    });
};
start();
