import 'dotenv/config';


export const envVariables = {
    port: process.env.PORT,
    urldb: process.env.URL_DB,
    jwt: process.env.JWT_KEY,
    devmode: process.env.MODE_DEV == 'dev',
    ROLES_NAME:process.env.ROLES_NAME
}