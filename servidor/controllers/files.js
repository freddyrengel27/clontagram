import uploadCloud from "../cloud/cloudinary.js";
import deleteFile from "../tools/deleteFile.js";
import conn from "../db/db.js";


const filesControllers = {

    uploadFotoPerfil: async (req, res) =>{

        const {id} = req.userInfo;
        const {path, mimetype} = req.file;

        let tipo = mimetype.split("/");

        if(tipo[0] != "image"){

            return res.status(400).send({
                message: "Error archivo no valido"
            })
        }
        try {
            const {url} = await uploadCloud(path);

            let query = "UPDATE usuarios SET urlImage = ? WHERE id = ?";
            await conn.query(query, [url, id]);
            deleteFile(path)

            return res.status(200).send({
                message: "foto subida"
            })

        } catch (error) {
            console.log(error);

            return res.status(400).send({
                message: "Oopos error de sistema"
            })
        }
    },

    uploadPublicacion: async (req, res) =>{

        const {path, mimetype} = req.file;
        const {idPublicacion} = req.body;

        let type = mimetype.split("/");
        try {
            
            const {url} = await uploadCloud(path);

            console.log(url)
            let query = "UPDATE publicaciones SET type_publicacion = ?, url_publicacion = ? WHERE id_publicacion = ?";
            await conn.query(query, [type[0], url, idPublicacion]);

            deleteFile(path);

            return res.status(200).send({
                message: "Publicacion terminada"
            })

        } catch (error) {
            console.log(error)
            return res.status(400).send({
                message: "Oopos error del sistema"
            })
        }

    },

};

export default filesControllers;