import boom from '@hapi/boom';
import { AppDataSource } from '../persistence/AppDataSource';
import { Users } from '../persistence/models/Users';
import { MessageEntity } from '../persistence/models/Message';
import { Not } from 'typeorm';

const converUser = ({ username, nickname, urlImage }: Users): UserInfoHeader => ({ username, nickname, urlImage });

const userrepository = AppDataSource.getRepository(Users);
const messageRepository = AppDataSource.getRepository(MessageEntity);

export const messageService: MessageService = {
    async findUser(username: string): Promise<UserInfoHeader[]> {
        return (await userrepository.find({
            where: {
                username: Not(username)
            }
        })).map(u => ({ urlImage: u.urlImage, username: u.username, nickname: u.nickname }));
    },
    async saveMessage(username: string, userfirend: string, newmessage: SaveMessageDto): Promise<MessageDto> {
        const mainUser = await findUserByUsename(username);
        const frienuser = await findUserByUsename(userfirend);
        const createmessage = messageRepository.create(newmessage);
        createmessage.usersend = mainUser;
        createmessage.userrecive = frienuser;
        await messageRepository.save(createmessage);
        return {
            ...createmessage,
            usersend: converUser(createmessage.usersend),
            userrecive: converUser(createmessage.userrecive)
        }
    },
    async findMessage(username: string, userfrien: string): Promise<MessageDto[]> {
        const message = await messageRepository.find({
            where: [{
                usersend: { username },
                userrecive: { username: userfrien }
            }, {
                usersend: { username: userfrien },
                userrecive: { username }
            }],
            relations: {
                userrecive: true,
                usersend: true
            },
            order: {
                createdAt: 'ASC'
            }
        });
        return message.map(p => ({ ...p, usersend: converUser(p.usersend), userrecive: converUser(p.userrecive) }));
    },
    async deleteMessage(username: string, userfriend: string, idmessage: number): Promise<void> {
        const mes = await messageRepository.findOne({
            where: {
                usersend: { username },
                userrecive: { username: userfriend },
                id: idmessage
            },
            relations: {
                usersend: true,
                userrecive: true
            }
        });
        if (!!mes)
            messageRepository.delete({ id: mes.id });
    }
}

async function findUserByUsename(username: string): Promise<Users> {
    const user = await userrepository.findOne({ where: { username } });
    if (!user) throw boom.badRequest('Usuario no encontrado');
    return user;
}


