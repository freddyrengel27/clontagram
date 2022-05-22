import { useEffect, useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import axios from "axios";
import {CSSTransition} from "react-transition-group";
import {saveLocal} from "../tools/localStore.js";

import { useUsuario } from "../contex/user-context.jsx";

import Loader from "./Loader.jsx";
import Notificacion from "./notificacion.jsx";


const Login = () =>{

    const {register, handleSubmit, reset, formState: {errors}} = useForm();
    const { loginInfo} = useUsuario();
    const [loader, setLoader] = useState(false);

    const [noti, setNoti] = useState(false);
    const [typeNoti, setTypeNoti] = useState("");
    const [message, setmessage] = useState("");

    let navigate = useNavigate();

    const finNoti = () =>{
        setTimeout(() =>{
            setNoti(false)
            setTimeout(() =>{
                setTypeNoti("")
                setmessage("")
            }, 3000)
        }, 3000)
    };

    const showNoti = (type, message) =>{
        setTypeNoti(type);
        setmessage(message)
        setNoti(true)
        finNoti()
    }

    const onSubmit = async (data) =>{
        setLoader(!loader)
        try {
            
            const res = await axios.post(import.meta.env.VITE_APP_HOST_API + "login", data);
            let token = res.data.token;
            saveLocal("token", token);
            await loginInfo(token);
            setLoader(false);
            (navigate("/home"))
        } catch (err) {
            setLoader(false);
            showNoti("error", err.response.data.message);
            reset({password: ""});
            console.log(err.response)
            
        }
    };


    return(
        <div className="contenedor">

            <CSSTransition in={noti} timeout={2500}  classNames="noti-ani" unmountOnExit>
                <Notificacion tipoNoti={typeNoti} info={message} />
            </CSSTransition>

            <div className="contenedor__login">
                <div className="login__logo">
                    <h1>Clontagram</h1>
                </div>
                <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" placeholder="username" className="campo" {...register("username", {required: true, minLength: 4})}/>
                    <input type="password" placeholder="password" className="campo" {...register("password", {required: true, minLength: 6})}/>

                    {
                        loader ? 
                        <div className="register__loader"><Loader /></div> 
                        :
                        <input type="submit" value="Iniciar sesion" className="btn__campo"/>
                    }

                    

                </form>

                <Link to="/recupera-password" className="btn_recupera_clave">¿Has olvidado la contraseña?</Link>
                

            </div>

            <div className="login__register">
                <span>¿No tienes una cuenta? <Link to="/registro">Registrate</Link></span>
                
            </div>

        </div>
    )
};

export default Login;