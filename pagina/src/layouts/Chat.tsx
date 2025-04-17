import React from "react";
import { useSearchParams } from "react-router-dom";
import { UseContextProvider } from "../ContextProvider";
import { readApi, urlconnection } from "../api/readApi";
import { MessageComponent } from "../components/MessageComponent";
import { FormMessage } from "../components/FormMessage";
import {io} from 'socket.io-client';

export function Chat() {
  const [search] = useSearchParams();
  const { token } = UseContextProvider();
  const [messages, setMessages] = React.useState<MessageDto[]>([]);
  const searchFriend = search.get('userfriend');
  const friend = searchFriend ?? '';

  const socket = React.useMemo(()=> io(urlconnection.websockectconnect, {auth:{jwt:token}}), [token]);

  const sendmessage=(savemessage:SaveMessageDto) => {
    const messageReq:WebsocketChatRequest = {userfriend:friend, message:savemessage};
    socket.emit('mandar', messageReq);
  }

  React.useEffect(()=>{
    if(token.trim()){
      socket.on('mandar', (mes:MessageDto)=>{
          setMessages(m => [...m, mes]);
      })
    }

    return ()=>{
      socket.off('mandar');
    }
  },[token]);

  React.useEffect(() => {
    if (token.trim())
      readApi.findMessages(token, friend).then(setMessages);
  }, [token]);



  return (
    <>
      <div className="chatcontainer">
        {messages.map(m => <MessageComponent key={m.id} {...m} />)}
      </div>
      <FormMessage onSend={sendmessage}/>
    </>
  );
}
