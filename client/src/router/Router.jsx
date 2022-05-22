import {useContext, useEffect, useState} from "react";
import {Route, Routes, Navigate ,useNavigate} from "react-router-dom";

import {useUsuario} from "../contex/user-context.jsx"


import Login from "../components/Login.jsx";
import Registro from "../components/Registro.jsx";
import Home from "../components/Home.jsx";
import RecuperaContraseña from "../components/RecuperaContraseña.jsx";
import Perfil from "../components/Pefil.jsx";
import Publicacion from "../components/Publicacion.jsx";
import Mensajes from "../components/Mensajes.jsx";

const RouterNav = () =>{

    const {stateSesion, userInfo} = useUsuario();
    const navigate = useNavigate();

    return(
        <Routes>
            <Route path="/" element={stateSesion ? <Navigate to="/home" /> : <Navigate to="/login" />}/>
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/recupera-password" element={<RecuperaContraseña />} />

            <Route path="/home" element={stateSesion ? <Home /> : <Navigate to="/login"/>} />
            <Route path="/perfil/:id" element={stateSesion ? <Perfil/> : <Navigate to="/login"/>} />
            <Route path="/publicacion/:id" element={stateSesion ? <Publicacion/> : <Navigate to="/login"/>} />
            <Route path="/mensajes" element={stateSesion ? <Mensajes/> : <Navigate to="/login"/>} />
        </Routes>
    )
};

export default RouterNav;