import { Request, Response, NextFunction } from 'express';
import { messageService } from '../service/MessageService';

export const messageController = {
    async findUsers(req: Request, res: Response, next: NextFunction) {
        try {
            const datos = messageService.findUser(req.params.mainuser as string);
            res.json(await datos);
        } catch (error) {
            next(error);
        }
    },
    async findMessages(req: Request, res: Response, next: NextFunction) {
        try {
            const { userfriend } = req.params as { userfriend: string };
            const datos = messageService.findMessage(req.params.mainuser as string, userfriend);
            res.json(await datos);
        } catch (error) {
            next(error);
        }
    },
    async deleteMessage(req: Request, res: Response, next: NextFunction) {
        try {
            const { id} = req.params as { id:string };
            if(!isNaN(Number(id))){
                await messageService.deleteMessage(req.params.mainuser as string, req.query.userfriend as string, Number(id));
            }
            res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    }
}