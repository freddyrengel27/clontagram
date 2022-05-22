'use strict'
import conn from "../db/db.js";
import getJwt from "../jwt/jwt.js";

const reToken ={

    reToken : async (req, res) =>{

        const {id} = req.params;

        try {
            let sql = "SELECT * FROM usuarios WHERE id = ?";
            const [rows] = await conn.execute(sql, [id]);
            let user = rows[0]
            return res.status(200).send({
                token: getJwt(user)
            })

        } catch (error) {
            console.log(error);
            return res.status(400).send({
                message: "Oopos error del sistema"
            })
        }
    }
};

export default reToken;