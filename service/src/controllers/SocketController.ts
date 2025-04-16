
import {Server as SocketIoServcer} from 'socket.io';

export function socketController(io:SocketIoServcer){
    
    io.on('connection', socket => {
        console.log(socket.id);
        socket.on('mandar', (hola:{message:string})=>{
            io.emit('mandar', {message:hola.message});
        });
       
    })
}