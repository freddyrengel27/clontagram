import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";
import {useState} from "react";
import axios from "axios";
import {CSSTransition} from "react-transition-group";

import Loader from "./Loader.jsx";
import Notificacion from "./notificacion.jsx";


const Registro = () =>{

    const {register, handleSubmit, reset, formState: {errors}} = useForm();

    const [loader, setLoader] = useState(false);

    const [noti, setNoti] = useState(false);
    const [typeNoti, setTypeNoti] = useState("");
    const [message, setmessage] = useState("");


    const finNoti = () =>{
        setTimeout(() =>{
            setNoti(false)
            setTimeout(() =>{
                setTypeNoti("")
                setmessage("")
            }, 3000)
        }, 5000)
    };

    const showNoti = (type, message) =>{
        setTypeNoti(type);
        setmessage(message)
        setNoti(true)
        finNoti()
    }


    const onSubmit = async (data) =>{

        setLoader(true);
        try {
            
            const res = await axios.post(import.meta.env.VITE_APP_HOST_API + "registro", data);

            if(res.data.type == "nice"){

                setLoader(false);
                reset();
                return showNoti("nice", "Cuenta creada exitosamente");
            }

        } catch (err) {

            if(err.response.data.typeError){
               
                if(err.response.data.typeError == "email"){
                    reset({email: "", password: ""});
                    setLoader(false);
                    return showNoti("error", err.response.data.message);
                }

                if(err.response.data.typeError == "username"){
                    reset({username: "", password: ""});
                    setLoader(false);
                    return showNoti("error", err.response.data.message);
                }

            }

                
                return showNoti("error", "Oops error en el sistema");
            
        }
        
        setLoader(false);
    };



    return(
        <div className="contenedor">

            <CSSTransition in={noti} timeout={2500}  classNames="noti-ani" unmountOnExit>
                <Notificacion tipoNoti={typeNoti} info={message} />
            </CSSTransition>

            



            <div className="contenedor__registro">
                <div className="login__logo">
                    <h1>Clontagram</h1>
                    <span>Registrate para ver fotos y videos de tus amigos</span>
                </div>
                <form className="registro__form" onSubmit={handleSubmit(onSubmit)}>
                <input type="email" placeholder="Email" className={errors.email ? "campo campoError" : "campo"} {...register("email", {required: true, pattern: /^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/})}/>
                <input type="text" placeholder="Nombre" className={errors.nombre ? "campo campoError" : "campo"} {...register("nombre", {required: true, minLength: 3})}/>
                <input type="text" placeholder="Apellido" className={errors.apellido ? "campo campoError" : "campo"} {...register("apellido", {required: true, minLength: 3})}/>
                <input type="text" placeholder="username" className={errors.username ? "campo campoError" : "campo"} {...register("username", {required: true, minLength: 4})}/>
                <input type="password" placeholder="Password" className={errors.password ? "campo campoError" : "campo"} {...register("password", {required: true, minLength: 6})}/>

                {loader ?
                    <div className="register__loader"><Loader /></div> 
                    :
                    <input type="submit" value="Registrate" className="btn__campo"/>
                }

                </form>
                <span>Al registrarte, aceptas nuestras Condiciones, la Política de datos y la Política de cookies.</span>
            </div>

            <div className="login__register">
                <span>¿tienes una cuenta? <Link to="/login">Entrar</Link></span>
            </div>
        </div>
    )
};

export default Registro