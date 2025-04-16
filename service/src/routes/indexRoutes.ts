
import {Express, Router} from 'express';
import { userRoute } from './userRoutes';
import { messageRoutes } from './messageRoutes';

const mainRoute = Router();


export function createApi(app:Express){
    app.use('/api', mainRoute);
    mainRoute.use('/user', userRoute);
    mainRoute.use('/message', messageRoutes);
}