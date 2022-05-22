import conn from "../db/db.js";


const controllersChat = {

    create: async (req, res) =>{

        const {id} = req.userInfo;
        const {idUser} = req.body;

        try {
            
            let sql = "INSERT INTO chat(user_uno, user_dos) VALUES(?, ?)";

            await conn.execute(sql, [id, idUser]);

            return res.status(200).send({
                menssage: "chat creado"
            })


        } catch (error) {
            console.log(error);

            return res.status(400).send({
                menssage: "Oopos error en el sistema"
            })
        }

    },

    getchats: async (req, res) =>{

        const {id} = req.userInfo;
        try {
            
            let sql = `SELECT chat.id_chat, usuarios.id, usuarios.username, usuarios.urlImage FROM chat INNER JOIN usuarios ON usuarios.id = IF(chat.user_uno = ${id}, chat.user_dos, chat.user_uno) WHERE chat.user_uno = ${id} OR chat.user_dos = ${id}`

            const [rows] = await conn.execute(sql);

            return res.status(200).send({
                chats: rows
            })

        } catch (error) {
            console.log(error);

            return res.status(400).send({
                menssage: "Oopos error en el sistema"
            })
        }
    }, 

    selectChat: async (req, res) =>{
        try {
            const {id} = req.params;

            let sql = "SELECT * FROM mensajes WHERE chat_id = ?";

            const [rows] = await conn.execute(sql, [id]);

            return res.status(200).send({
                mensajes: rows
            })

        } catch (error) {
            console.log(error);

            return res.status(400).send({
                menssage: "Oopos error en el sistema"
            })
        }
    }

};

export default controllersChat;
