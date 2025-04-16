import { DataSource } from "typeorm";
import { envVariables } from "../envVariables";
import { MessageEntity } from "./models/Message";
import { Users } from "./models/Users";
import { Roles } from "./models/Roles";



export const AppDataSource = new DataSource({
    url: envVariables.urldb,
    type: 'postgres',
    synchronize: true,
    logging: envVariables.devmode,
    entities: [MessageEntity, Users, Roles]
});


export async function appDataSourceInitialize() {
    try {
        await AppDataSource.initialize();
        const roles_name = envVariables.ROLES_NAME;
        if (!roles_name)
            throw { isError: true, message: 'No Existen roles' };
        const rolesnames = roles_name.split(',');
        const rep = AppDataSource.getRepository(Roles);
        const rolesarray: Roles[] = [];
        for (const name of rolesnames) {
            const role = await rep.findOne({ where: { name } });
            if (!role)
                rolesarray.push(rep.create({ name }));
        }
        if (rolesarray.length > 0)
            await rep.save(rolesarray);
    } catch (error) {
        const err = error as { isError: boolean, message: string } | Error;
        throw err.message;

    }
}