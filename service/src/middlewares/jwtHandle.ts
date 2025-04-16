import { Request, Response, NextFunction } from 'express';
import boom from '@hapi/boom';
import { jwtService } from '../service/JwtService';

export function jwtHandle(rolesname: string[]) {
    return async (req: Request, _res: Response, next: NextFunction) => {
        const header = req.headers.authorization;
        if (!header || !header.startsWith('Bearer '))
            next(boom.forbidden());
        else {
            const token = header.replace('Bearer ', '');
            const data = await jwtService.validationToken(token);
            req.params.mainuser = data.username;
            if (viewRoles(data.roles, rolesname))
                next()
            else
                next(boom.forbidden());
        }
    }
}


function viewRoles(rolesuser: { name: string }[], rolesRequire: string[]): boolean {
    const roles = rolesuser.map(r => r.name);
    if (roles.length == 0)
        return false;
    for (const name of roles) {
        if (rolesRequire.includes(name))
            return true;
    }
    return false;
}