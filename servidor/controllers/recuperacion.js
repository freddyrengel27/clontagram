import validator from "validator";
import bcrypt from "bcrypt";
import moment from "moment";
import fs from "fs/promises";

import conn from "../db/db.js";
import transporter from "../mail/mailConfig.js";
import jwtRecuperacion from "../jwt/jwtRecuperacion.js";

const controllersRecuperacion = {

    solicitar: async (req, res) =>{

        const {email} = req.body;
        try {
            let sql = "SELECT id, username, CONCAT(nombre, ' ', apellido) AS nombre, email FROM usuarios WHERE email = ?";

            const [rows] = await conn.execute(sql, [email]);

            if(rows.length == 0){

                return res.status(400).send({
                    message: "Email no encontrado"
                })
            };

            const user = rows[0];
            const token = jwtRecuperacion(user);

            const info = {
                from: "Clontagram <soldado2727@gmail.com>",
                to: "freddy27rengel@gmail.com",
                subject: "Recuperacion de contraseña",
                Text: "hola como estas?"
            }
            
            await transporter.sendMail(info);

            return res.status(200).send({
                message: "solicitar email"
            })
            
        } catch (error) {
            console.log(error);

            return res.status(400).send({
                message: "Oopos error de sistema"
            })
            
        }
    },

    cambioPassword: async (req, res) =>{

        return res.status(200).send({
            message: "cambio de password"
        })
    }
};

export default controllersRecuperacion;