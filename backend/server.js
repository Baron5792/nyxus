import cookieParser from "cookie-parser";
import cors from 'cors';
import express from 'express';
import dotenv from 'dotenv';
import connection from "./config/database.js";
dotenv.config();

/**
 * import routes here
 */
import authRoutes from './routes/authRoutes.js'
import authContext from './controllers/api/authContext.js';
import CheckAuth from './controllers/api/auth-check.js';
import BalanceStatus from './controllers/api/user/BalanceDisplay.js'
import profileRoute from './routes/profileRoute.js';
import AvatarUpdate from './controllers/api/profile/avatar-update.js'
import UpdateRoute from './routes/updateRoute.js';
import fetchRoute from './routes/fetchRoutes.js';

const app = express();
app.use(express.json());
app.use(cookieParser());

/**
 * Link dependencies
 */
// link cors options
const corOptions = {
    method: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
    credentials: true,
    origin: process.env.VITE_APP_API_URL || 'http://localhost:5173',
    allowedHeaders: [
        'Content-Type', 'Authorization'
    ]
};
app.use(cors(corOptions));
connection();

/**
 * Define routes here
 */
app.use('/v1/uploads', express.static('uploads')); // for images and other static files
app.use('/v1/auth', authRoutes);
app.use('/v1/context', authContext);
app.use('/v1/auth', CheckAuth);
app.use('/v1/user', BalanceStatus);
app.use('/v1/user', profileRoute);
app.use('/v1/api', AvatarUpdate);
app.use('/v1/client/update', UpdateRoute);
app.use('/v1/client/fetch', fetchRoute);



/**
 * Define port here
 */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})