'use strict'
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jwt-simple";

import conn from "../db/db.js";
import getJwt from "../jwt/jwt.js";





const userControllers = {

    registro: async (req, res) =>{

        const {nombre, apellido, username, email, password} = req.body;

        let vNombre = !validator.isEmpty(nombre);
        let vApellido = !validator.isEmpty(apellido);
        let vUsername = !validator.isEmpty(username);
        let vEmail = !validator.isEmpty(email) && validator.isEmail(email);
        let vPassword = !validator.isEmpty(password);

        if(!vNombre || !vApellido || !vUsername || !vEmail || !vPassword){

            return res.status(400).send({
                message: "error datos enviados invalidos"
            });
        }

        let sqlNombre = "SELECT username FROM usuarios WHERE username = ?";
        const validacionUsername = await conn.execute(sqlNombre, [username]);
       
        
        if(validacionUsername[0].length >= 1){

            return res.status(400).send({
                message: "El nombre de usuario ya esta en uso",
                typeError: "username"
            })
        }

        let sqlEmail = "SELECT email FROM usuarios WHERE email = ?";
        const validacionEmail = await conn.execute(sqlEmail, [email]);

        if(validacionEmail[0].length >= 1){
            
            return res.status(400).send({
                message: "El email ya esta en uso",
                typeError: "email"
            })
        }

        const saltRounds = 9;
        const hash = await bcrypt.hash(password, saltRounds);
        

        try {
            let sqlInsert = "INSERT INTO usuarios(nombre, apellido, username, email, password, urlImage) VALUE(?, ?, ?, ?, ?, ?)";
            await conn.execute(sqlInsert, [nombre, apellido, username, email, hash, null]);

            return res.status(200).send({
                type: "nice",
                message: "Registro completado"
            })

        } catch (error) {
            console.log(error)
            return res.status(400).send({
                message: "Error en el sistema",
                typeError: "system"
            })
        }
    },


    login: async (req, res) =>{

        const {username, password} = req.body;

        let vUsername = !validator.isEmpty(username);
        let vPassword = !validator.isEmpty(password);

        if(!vUsername || !vPassword){

            return res.status(400).send({
                message: "Campos invalidos"
            })
        }

        let sqlUser = "SELECT * FROM usuarios WHERE username = ?";
        const [rows] = await conn.execute(sqlUser, [username]);

        if(rows.length == 0){

            return res.status(400).send({
                message: "El usuario no existe"
            })
        }

        let user = rows[0];

        const compare = await bcrypt.compare(password, user.password);

        if(!compare){

            return res.status(400).send({
                message: "La clave de seguridad no coincide"
            })
        }

        return res.status(200).send({
            message: "Login exitoso",
            token: getJwt(user)
        })
    },

    decode: async (req, res) =>{

        const {token} = req.body;

        const payload = jwt.decode(token, process.env.JWT_SECRET);

        let sql = "SELECT * FROM usuario_config WHERE usuario = ?";
        const [rows] = await conn.execute(sql, [payload.id]);

        if(rows.length >= 1){

            return res.status(200).send({
                payload,
                primero: true,
                confirmacion: rows[0].confirmacion
            })
        }

        return res.status(200).send({
            payload,
            primero: false,
        })
    },

    primeraConeccion: async (req, res) =>{

        const {id} = req.userInfo;

        const {description} = req.body;

        let v_description = !validator.isEmpty(description);
        
        if(!v_description){

            return res.status(400).send({
                message: "El campo esta vacio"
            });
        }
        try {
            let query = "INSERT INTO usuario_config(usuario, descripcion, confirmacion) VALUES(?, ?, ?)";
            await conn.execute(query, [id, description, 0]);

            return res.status(200).send({
                message: "ok"
            })

        } catch (error) {
            console.log(error)

            return res.status(400).send({
                message: " Oops error del sistema"
            })
        }
        
    },

    oneGet: async (req, res) =>{
        const {id} = req.params
        try {

            let sql = "SELECT usuarios.id, usuarios.username, CONCAT(usuarios.nombre, ' ', usuarios.apellido) AS nombre, usuarios.urlImage, usuario_config.descripcion, COUNT(publicaciones.id_publicacion) AS conteo FROM usuarios INNER JOIN usuario_config ON usuario_config.usuario = usuarios.id INNER JOIN publicaciones ON publicaciones.id_usuario = usuarios.id WHERE usuarios.id = ?";
            const [rows] = await conn.execute(sql, [id]);

            return res.status(200).send({
                perfil: rows[0]
            })
            
        } catch (error) {
            console.log(error)
            return res.status(200).send({
                message: "Oops error de sistema"
            })
        }
    },

};

export default userControllers;