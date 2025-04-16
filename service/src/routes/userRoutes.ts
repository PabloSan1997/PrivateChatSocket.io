import { Router } from "express";
import { userController } from "../controllers/UserController";
import { jwtHandle } from "../middlewares/jwtHandle";


export const userRoute = Router();


userRoute.post('/register', userController.register);
userRoute.post('/login', userController.login);
userRoute.get('/getuserinfo', jwtHandle(['USER']), userController.getUserInfo);