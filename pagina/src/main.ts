
import io from 'socket.io-client';

const socket = io('ws://localhost:3000');


socket.on('mandar', (data:{message:string})=>{
  document.querySelector('p')!.textContent += data.message;
});

document.querySelector('button')!.onclick = () => {
  socket.emit('mandar', {message:'hola a los amigos de la grasa'});
}