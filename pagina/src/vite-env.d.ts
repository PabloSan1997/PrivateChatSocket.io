/// <reference types="vite/client" />


interface ErrorDto{
    statusCode:number;
    error:string;
    message:string;
}
interface LoginDto {
    username: string;
    password: string;
}

interface SignUpDto {
    username: string;
    nickname: string;
    password: string;
    urlImage: string;
}


interface TokenDto{
    username:string;
    jwt:string;
}

interface UserInfoHeader{
    username:string;
    nickname:string;
    urlImage:string;
}

interface SaveMessageDto{
    message:string;
}

interface WebsocketChatRequest{
    message:SaveMessageDto;
    userfriend:string;
}

interface MessageDto{
    id:number;
    message:string;
    usersend:UserInfoHeader;
    userrecive:UserInfoHeader;
    createdAt:Date;
}

interface ContextProviderInterface{
    token:string;
    userinfo:UserInfoHeader;
    login(logindto:LoginDto):void;
    register(register:SignUpDto):void;
    logout():void;
}

interface ReadApi{
    login(data:LoginDto):Promise<TokenDto>;
    regisger(data:SignUpDto):Promise<TokenDto>;
    findUsers(token:string):Promise<UserInfoHeader[]>;
    findMessages(token:string, userfriend:sring):Promise<MessageDto>;
    deleteMessage(token:string, userfriend:string, id:number):Promise<void>;
    findUserInfo(token:string):Promise<UserInfoHeader>;
}


interface Children {
    children:JSX.Element|JSX.Element[]
}