import { Router } from "express";
import { messageController } from "../controllers/MessageController";
import { jwtHandle } from "../middlewares/jwtHandle";


export const messageRoutes = Router();


messageRoutes.get('/users', jwtHandle(['USER']), messageController.findUsers);
messageRoutes.get('/:userfriend', jwtHandle(['USER']), messageController.findMessages);
messageRoutes.delete('/:id', jwtHandle(['USER']), messageController.deleteMessage);