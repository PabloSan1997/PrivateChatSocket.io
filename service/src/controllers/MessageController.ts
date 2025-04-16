import { Request, Response, NextFunction } from 'express';
import { messageService } from '../service/MessageService';

export const messageController = {
    async findUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const datos = messageService.findUser(req.query.username as string);
            res.json(await datos);
        } catch (error) {
            next(error);
        }
    },
    async findMessages(req: Request, res: Response, next: NextFunction) {
        try {
            const {userfriend} = req.params as {userfriend:string};
            const datos = messageService.findMessage(req.query.username as string, userfriend);
            res.json(await datos);
        } catch (error) {
            next(error);
        }
    }
}