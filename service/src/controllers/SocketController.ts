
import {Server as SocketIoServcer} from 'socket.io';
import { jwtService } from '../service/JwtService';
import { messageService } from '../service/MessageService';

export function socketController(io:SocketIoServcer){
    
    io.use(async (socket, next)=>{
        const header = socket.handshake.auth.jwt;
        if(!header){
            return next(new Error('Authorization error'));
        }

        try {
            const data = await jwtService.validationToken(header);
            if(!data.roles.map(p=>p.name).includes('USER'))
                return next(new Error('Authorization error'));

            socket.data.username = data.username;
            next();

        } catch (error) {
            return next(new Error('Authorization error'));
        }
    })

    io.on('connection', socket => {
        const username = socket.data.username;
        socket.join(username);
        socket.on('mandar', async (req:WebsocketChatRequest)=>{
           try {
            const mensaje = await messageService.saveMessage(username, req.userfriend, req.message);
            io.to(username).emit('mandar', mensaje);
            io.to(req.userfriend).emit('mandar', mensaje);
           } catch (error) {
                io.to(username).emit('error', {message:'error'})
           }
        });
    })
}