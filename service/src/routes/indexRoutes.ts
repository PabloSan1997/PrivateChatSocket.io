
import {Express, Router} from 'express';
import { userRoute } from './userRoutes';

const mainRoute = Router();


export function createApi(app:Express){
    app.use('/api', mainRoute);
    mainRoute.use('/user', userRoute);
}