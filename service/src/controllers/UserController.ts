import { Request, Response, NextFunction } from 'express';
import { userService } from '../service/UserService';

export const userController = {
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const data = userService.register(req.body);
            res.status(201).json(await data);
        } catch (error) {
            next(error);
        }
    },
    async login(req: Request, res: Response, next: NextFunction){
        try {
            const data = userService.login(req.body);
            res.json(await data);
        } catch (error) {
            next(error);
        }
    },
    async getUserInfo(req: Request, res: Response, next: NextFunction){
        try {
            const data = userService.getUserInfo(req.query.username as string);
            res.json(await data);
        } catch (error) {
            next(error);
        }
    }
}