'use strict'
import moment from "moment";
import jwt from "jwt-simple";

const jwtRecuperacion = ({id, nombre, username, email}) =>{

    const payload = {
        id,
        nombre,
        username,
        email,
        creado: moment().unix(),
        Exp: moment().add(5, "days").unix()
    };

    return jwt.encode(payload, process.env.JWT_SECRET);
};

export default jwtRecuperacion;