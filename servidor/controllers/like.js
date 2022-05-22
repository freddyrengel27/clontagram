
import conn from "../db/db.js";


const likeControllers = {

    darLike: async (req, res) =>{

        const {id} = req.userInfo;
        const {idPublicacion} = req.body;

        try {
            let sql = "INSERT INTO likes(user, publicacion) VALUES(?, ?)";
            await conn.execute(sql, [id, idPublicacion]);

            return res.status(200).send({
                message: "like"
            })
        } catch (error) {
            
            return res.status(400).send({
                message: "Oopoos Error de sitema"
            })
        }
    },

    removeLike: async (req, res) =>{
        const {id} = req.params;
        try {
            let sql = "DELETE FROM likes WHERE id_like = ?";
            await conn.execute(sql, [id]);

            return res.status(200).send({
                message: "delete like"
            })

        } catch (error) {

            return res.status(400).send({
                message: "Oopoos Error de sitema"
            })
            
        }
    }
};

export default likeControllers;