import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
}

app.use(cors(corsOptions));

import userRoute from './route/user.route.js';
import companyRoute from './route/company.route.js';
import jobRoute from './route/job.route.js';
import applicationRoute from './route/application.route.js'

app.use('/api/v1/user',userRoute);
app.use('/api/v1/company',companyRoute);
app.use('/api/v1/job',jobRoute);
app.use('/api/v1/application',applicationRoute);

export {app};