import deleteFile from "../tools/deleteFile.js";

const text = (req, res) =>{

    console.log(req.file);

    setTimeout(() => deleteFile(req.file.path), 5000)

    return res.status(200).send({
        message: "ok"
    })
}

export default text;