'use strict'

import validator from "validator";
import conn from "../db/db.js";

const comentariosControllers = {

    add: async (req, res) =>{

        const {comentario, idPublicacion} = req.body;
        const {id} = req.userInfo;

        let vComentario = !validator.isEmpty(comentario);

        if(!vComentario){

            return res.status(400).send({
                message: "Error campo vacio"
            })
        }

        try {
            let sql = "INSERT INTO comentarios(id_usuario, id_publicacion, comentario) VALUES(?, ?, ?)";

            const [rows] = await conn.execute(sql, [id, idPublicacion, comentario]);

            return res.status(200).send({
                id: rows.insertId,
                message: "Nuevo comentario agregado"
            })

        } catch (error) {
            console.log(error)

            return res.status(400).send({
                message: "Oopos error en el sistema"
            })
        }

    },

    get: async (req, res) =>{

        const {id} = req.params;

        try {
            let sql = "SELECT comentarios.*, usuarios.username FROM comentarios INNER JOIN usuarios ON comentarios.id_usuario = usuarios.id WHERE comentarios.id_publicacion = ?";    

            const [rows] = await conn.execute(sql, [id]);

            return res.status(200).send({
                comentarios: rows
            })

        } catch (error) {
            console.log(error);

            return res.status(200).send({
                message: "Oopos error en el sistema"
            })
        }

    },

};

export default comentariosControllers