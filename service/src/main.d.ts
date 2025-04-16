

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

interface UserTokenDto{
    username:string;
    nickname:string;
    roles:{name:string}[];
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

interface MessageService{
    findUser(username:string):Promise<UserInfoHeader[]>;
    saveMessage(username:string, userfirend:string, newmessage:SaveMessageDto):Promise<MessageDto>;
    findMessage(username:string, userfrien:string):Promise<MessageDto[]>;
    deleteMessage(username:string, userfriend:string, idmessage:number):Promise<void>;
}