'use strict'
import validator from "validator";
import conn from "../db/db.js";
import moment from "moment";


const publicacionControllers = {

    publicacion: async (req, res) =>{

        const {id} = req.userInfo;

        const {descripcion} = req.body;

        let v_descripcion = !validator.isEmpty(descripcion);

        if(!v_descripcion){
            return res.status(400).send({
                message: "Error campo vacio"
            })
        }

        let fecha = moment().format("YYYY-MM-DD HH:mm:ss");
        console.log(fecha)

        try {
            let query = "INSERT INTO publicaciones(id_usuario, descripcion, type_publicacion, url_publicacion, fecha_publicacion) VALUES(?, ?, ?, ?, ?)";
            const [rows] = await conn.execute(query, [id, descripcion, null, null, fecha]);

            return res.status(200).send({
                idPublicacion: rows.insertId,
                message: "publicado"
            })

        } catch (error) {
            console.log(error)
            return res.status(400).send({
                message: "Oopos error de sistema"
            })
        }
    },

    get: async (req, res) =>{

        const {pagina, scrolGet} = req.body;
        const {id} = req.userInfo;
    


        let fin = pagina * 5;
        let inicio = fin - 5;
        try {
            let sql = "SELECT publicaciones.*, usuarios.id, usuarios.urlImage, CONCAT(usuarios.nombre, ' ', usuarios.apellido) AS nombre, usuarios.username, likes.id_like FROM publicaciones INNER JOIN usuarios ON publicaciones.id_usuario = usuarios.id LEFT JOIN likes ON likes.publicacion = publicaciones.id_publicacion AND likes.user = ? ORDER BY publicaciones.fecha_publicacion DESC";
            const [rows] = await conn.execute(sql, [id]);

            if(scrolGet){
                const publicaciones = rows.slice(inicio + 1, fin);

                return res.status(200).send({
                    publicaciones
                })
            }
            const publicaciones = rows.slice(inicio, fin);

            return res.status(200).send({
                publicaciones
            })

        } catch (error) {

            return res.status(400).send({
                message: "Oopos error de sistema"
            })
        }
    },

    getOne: async (req, res) =>{

        const {idP} = req.params;
        const {id} = req.userInfo;

        try {
            let sql = "SELECT publicaciones.*, usuarios.id, usuarios.urlImage, CONCAT(usuarios.nombre, ' ', usuarios.apellido) AS nombre, usuarios.username, likes.id_like FROM publicaciones INNER JOIN usuarios ON publicaciones.id_usuario = usuarios.id LEFT JOIN likes ON likes.publicacion = publicaciones.id_publicacion AND likes.user = ? WHERE publicaciones.id_publicacion = ?";
            const [rows] = await conn.execute(sql, [id, idP]);

            return res.status(200).send({
                publicacion: rows[0]
            });

        } catch (error) {
            console.log(error);
            return res.status(400).send({
                message: "Oopos error en el sistema"
            })
        }
    },

    getpublicPerfil: async (req, res) =>{
        const {id} = req.params;
        try {
            
            let sql = "SELECT * FROM publicaciones WHERE id_usuario = ?";
            const [rows] = await conn.execute(sql, [id]);

            return res.status(200).send({
                publicaciones: rows
            })

        } catch (error) {
            console.log(error);

            return res.status(400).send({
                message: "Oopos error en el sistema"
            })
        }
    }

};

export default publicacionControllers;