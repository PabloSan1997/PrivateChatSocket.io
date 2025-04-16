import "reflect-metadata";
import express from 'express';
import cors from 'cors';
import { envVariables } from "./envVariables";
import { appDataSourceInitialize } from "./persistence/AppDataSource";
import { createApi } from "./routes/indexRoutes";
import { boomHandle } from "./middlewares/boomHandle";
import sockets from 'socket.io';
import http from 'node:http';
import { socketController } from "./controllers/SocketController";
import { createServer } from "./createserver";


createServer.app.use(cors());
createServer.app.use(express.json());

socketController(createServer.io);

createApi(createServer.app);

createServer.app.use(boomHandle.viewError);
createServer.app.use(boomHandle.finalError);

appDataSourceInitialize()
    .then(() => {
        createServer.server.listen(envVariables.port, () => {
            const message = envVariables.devmode ? `http://localhost:${envVariables.port}` : `Port: ${envVariables.port}`;
            console.log(message);
        });
    }).catch(console.error);


