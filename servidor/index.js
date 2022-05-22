'use strict'

import server from "./app.js";
import dotenv from "dotenv";

dotenv.config({path: "./.env"});

server.listen(process.env.Server_Port, () =>{
    console.log("El servidor esta activo " + process.env.Server_Port);
});
