import bcrypt from 'bcrypt';
import { AppDataSource } from '../persistence/AppDataSource';
import { Users } from '../persistence/models/Users';
import { Roles } from '../persistence/models/Roles';
import boom from '@hapi/boom';
import { jwtService } from './JwtService';

const userrepository = AppDataSource.getRepository(Users);
const rolerepository = AppDataSource.getRepository(Roles);

export const userService = {
    async login(loginDto: LoginDto): Promise<TokenDto> {
        const user = await userrepository.findOne({
            where: { username: loginDto.username },
            relations: { roles: true }
        });
        if (!user)
            throw boom.badRequest('Username o passwords incorrectos');
        const viewpassowrd = bcrypt.compare(loginDto.password, user.password);
        if (!(await viewpassowrd) || !user.enabled)
            throw boom.badRequest('Username o passwords incorrectos');

        const roles = user.roles.map(r => ({ name: r.name }));
        const usertoken: UserTokenDto = { username: user.username, nickname: user.nickname, roles };
        const token = jwtService.generateToken(usertoken);
        const hash = await bcrypt.hash(loginDto.password, 10);

        await userrepository.update({username:user.username}, {password: hash});
        return { username: user.username, jwt: await token }
    },
    async register(registerDto: SignUpDto): Promise<TokenDto> {
        const viewuser = await userrepository.findOne({
            where: { username: registerDto.username }
        });
        if (!!viewuser)
            throw boom.badRequest('Username ocupado');

        const passwordhash = bcrypt.hash(registerDto.password, 10);
        const roles = await rolerepository.findOne({ where: { name: 'USER' } });
        if (!roles) throw boom.badImplementation('No existen roles');

        const usercreate = userrepository.create({
            username: registerDto.username,
            nickname: registerDto.nickname,
            password: await passwordhash,
            urlImage: registerDto.urlImage
        });
        usercreate.roles = [roles];
        await userrepository.save(usercreate);
        return this.login({ username: usercreate.username, password: registerDto.password });
    },
    async getUserInfo(username: string): Promise<UserInfoHeader> {
        const user = await userrepository.findOne({ where: { username } });
        if (!user) throw boom.unauthorized('No existe usuario authenticado');
        return { username: user.username, nickname: user.nickname, urlImage: user.urlImage }
    }
}