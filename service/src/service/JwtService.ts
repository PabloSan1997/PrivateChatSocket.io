import { envVariables } from "../envVariables";
import { Users } from "../persistence/models/Users";
import jose from 'jose';

const secret = new TextEncoder().encode(envVariables.jwt);

interface FullUserToken extends jose.JWTPayload{
    username:string;
    nickname:string;
    roles:{name:string}[];
}

export const jwtService = {
    async generateToken({ username, nickname, roles }: UserTokenDto): Promise<string> {
        try {
            return new jose.SignJWT({ username, nickname, roles })
                .setProtectedHeader({ alg: 'HS256' })
                .setIssuedAt()
                .setExpirationTime('1day')
                .setSubject(username)
                .sign(secret);
        } catch (error) {
            throw new Error('Error con el token');
        }
    },
    async validationToken(token: string): Promise<UserTokenDto> {
        try {
            const {payload} = await jose.jwtVerify(token, secret);
            return payload as FullUserToken;

        } catch (error) {
            throw new Error('validation error');
        }
    }
}