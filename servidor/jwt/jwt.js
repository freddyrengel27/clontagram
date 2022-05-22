'use strict'
import jwt from "jwt-simple";

const getJwt = ({id, username, nombre, apellido, email, urlImage}) =>{

    const payload = {
        id,
        username,
        nombre: `${nombre} ${apellido}`,
        email,
        urlImage
    };

    return jwt.encode(payload, process.env.JWT_SECRET);
};

export default getJwt;


