'use strict'

import { Router } from "express";
import multer from "multer";


import userControllers from "../controllers/user.js";
import middleware from "../middlewares/middlewar.js";
import storage from "../multer/multerConfig.js";

import text from "../controllers/text.js"
import filesControllers from "../controllers/files.js";
import publicacionControllers from "../controllers/publicacion.js";
import likeControllers from "../controllers/like.js";
import comentariosControllers from "../controllers/comentarios.js";
import reToken from "../controllers/reToken.js";
import controllersChat from "../controllers/chat.js";
import controllersRecuperacion from "../controllers/recuperacion.js";

const upload = multer({storage});

const routes = Router();


routes.post("/registro", userControllers.registro);
routes.post("/login", userControllers.login);
routes.post("/decode", userControllers.decode);

routes.post("/primeraconeccion", middleware, userControllers.primeraConeccion);
routes.post("/uploadperfil", middleware, upload.single("perfil"), filesControllers.uploadFotoPerfil);
routes.get("/retoken/:id", reToken.reToken);

routes.get("/onegetuser/:id", middleware, userControllers.oneGet);

// RECUPERACION

routes.post("/recuperacion", controllersRecuperacion.solicitar);


// PUBLICACIONES
routes.get("/getonepublicacion/:idP", middleware, publicacionControllers.getOne)
routes.post("/getpublicaciones", middleware, publicacionControllers.get)
routes.post("/addpublicacion", middleware, publicacionControllers.publicacion);
routes.post("/fotopublicacion", middleware, upload.single("filePublicacion"), filesControllers.uploadPublicacion);
routes.get("/getpublicperfil/:id", middleware, publicacionControllers.getpublicPerfil);

// COMENTARIO

routes.get("/getcomentarios/:id", middleware, comentariosControllers.get);
routes.post("/addcomentarios", middleware, comentariosControllers.add);

// LIKES

routes.post("/darlike", middleware, likeControllers.darLike);
routes.delete("/removelike:id", middleware, likeControllers.removeLike);

// CHAT

routes.post("/createchat", middleware, controllersChat.create);
routes.get("/getchats", middleware, controllersChat.getchats);
routes.get("/getmessages/:id", middleware, controllersChat.selectChat);


export default routes;