

import express from 'express';
import http from 'node:http';
import { Server } from 'socket.io';

const app = express();

const server = http.createServer(app);

const io = new Server(server, {cors:{origin:'*'}});

export const createServer = {io, server, app};