import React, {useState, useMemo, useEffect} from "react";
import {clearLocal, getLocal} from "../tools/localStore.js";
import axios from "axios";
import {useNavigate} from "react-router-dom";

import RouterNav from "../router/Router.jsx";


const UsuarioContext = React.createContext();

export const UsuarioProvider = (props) =>{

    const navigate = useNavigate();
    const [userInfo, setUserInfo] = useState(null);
    const [stateSesion, setStateSesion] = useState(false);
    const [cargando, setCargando] = useState(true)
   
    
    useEffect(() =>{
        if(getLocal("token")){
            loginInfo(getLocal("token"))
            return
        }
        setCargando(false)
    }, []);


    const loginInfo = async (token) =>{
        try{
            setCargando(true)
            const {data} = await axios.post(import.meta.env.VITE_APP_HOST_API + "decode", {token});
            const info = {...data.payload, primero: data.primero};
            setUserInfo(info)
            setStateSesion(true);
            setCargando(false)
        }catch(err){
            console.log("error decode");
            setCargando(false)
        }
    };

    

    const logout = () =>{
        clearLocal("token");
        setStateSesion(false)
        setUserInfo(null)
        navigate("/login")
    };


    const stateUser = useMemo(() =>{
        return({
            userInfo,
            stateSesion,
            loginInfo,
            logout,
            cargando
        })
    }, [stateSesion, userInfo, cargando])



    return(<UsuarioContext.Provider value={stateUser} {...props} />) 

};


export const useUsuario = () =>{
    const userOpitions = React.useContext(UsuarioContext);
    if(!userOpitions) throw new Error("NO hay contexto");
    return userOpitions
};
