'use strict'
import express from "express";
import morgan from "morgan";
import {createServer} from "http";
import cors from "cors";
import routes from "./routes/routes.js";
import {Server} from "socket.io"
import webSocket from "./webSockets/socket.js";


const app = express();

const server = createServer(app);

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());


app.use("/insta", routes);

const io = new Server(server);

webSocket(io);

export default server;


