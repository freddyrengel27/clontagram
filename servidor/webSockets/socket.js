import conn from "../db/db.js";



const webSocket = (io) =>{

    io.on("connection", (socket) =>{

        socket.on("buscador", async (text) =>{

            let sql = "SELECT id, username, CONCAT(nombre, apellido) AS nombre, urlImage FROM usuarios WHERE username LIKE ?";
            const [rows] = await conn.execute(sql, [`%${text}%`]);
            await socket.emit("buscador:res", rows)
        })

        socket.on("set:canal", canal =>{
            socket.join(canal)
        });

        socket.on("send:client", async (msg) =>{
            let sql = "INSERT INTO mensajes(chat_id, user_envia, user_recibe, mensaje, fecha) VALUES(?, ?, ?, ?, ?)";
            const [rows] = await conn.execute(sql, [msg.chat_id, msg.user_envia, msg.user_recibe, msg.mensaje, msg.fecha])
           await io.to(msg.chat_id).emit("send:servidor", {...msg, id_mensaje: rows.insertId});
        })
        
    
        
    });

};

export default webSocket;