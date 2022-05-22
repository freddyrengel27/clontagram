

import { useEffect, useState } from "react";
import { useUsuario } from "../contex/user-context.jsx";
import { useForm } from "react-hook-form";
import { saveLocal, clearLocal } from "../tools/localStore.js";
import axios from "axios";

import Header from "./Header.jsx";
import Loader from "./Loader.jsx";
import ImagenVista from "./vista-publicaciones/ImagenVista.jsx";

import img from "../assets/img/usuario.png"

const Home = () =>{

    const {userInfo} = useUsuario();

    const [primero, setPrimero] = useState(false);

    const [pagina, setPagina] = useState(1);

    const [posts, setPosts] = useState([]);

   useEffect( async() =>{
    const res = await getPublicacion(1, false);
    setPosts(res)
    if(!userInfo.primero){
        setPrimero(true)
    }
    
   }, []);


   const getPublicacion = async (num, state) =>{
    try {
        const {data} = await axios.post(import.meta.env.VITE_APP_HOST_API + "getpublicaciones", {pagina: num, scrolGet: state})
        return data.publicaciones
    } catch (error) {
        console.log(error)
    }
   }; 

   const onFin = () =>{
       setPrimero(false);
   }

    return(
        <div className="contenedor">
            <Header />
            <div className="contenedor__publicaciones">
                {primero && <PrimeroAccion close={onFin}/>}
                <div className="con__pu">
                    <div className="prac">
                        {/* AQUI VAN LAS PUBLICACIONES */}

                        {
                            
                        posts.map((publi) =>{
                            return  <ImagenVista  archivo={publi} key={publi.id_publicacion}/>
                        })

                        }
                        
                    </div>
                    
                </div>
                
            </div>
        </div>
    )
};

const PrimeroAccion = (props) =>{

    const [load, setLoad] = useState(false)

    const {close} = props;
    const {handleSubmit, register} = useForm();

    const {userInfo, loginInfo} = useUsuario();

    const [urlImg, seturlImg] = useState();

    const [fileImg, setFileImg] = useState()


    const onFile = (e) =>{
        setFileImg(e.target.files[0]);
        const url = URL.createObjectURL(e.target.files[0]);
        seturlImg(url)
    };



    const onEnviar = async (form) =>{
        setLoad(true)
        try {
            await axios.post(import.meta.env.VITE_APP_HOST_API + "primeraconeccion", form);

            const f = new FormData();
            f.append("perfil", fileImg);
            await axios.post(import.meta.env.VITE_APP_HOST_API + "uploadperfil", f);
            clearLocal("token");
            const {data} = await axios.get(import.meta.env.VITE_APP_HOST_API + "retoken/" + userInfo.id);
            saveLocal("token", data.token);
            await loginInfo(data.token);
            close();
        } catch (error) {
            console.log(error)
            setLoad(false)
        }
    };

    return(
        <div className="contenedor__modal">
            <div className="contenedor__primeroAccion">
                <div className="primeroAccion__saludo">
                    <p>Hola¡ <span>{userInfo.nombre}</span> esta aun paso de compartir y ver publicaciones con tus amigos</p>
                </div>
                <form className="primeroAccion__form" onSubmit={handleSubmit(onEnviar)}>
                    <div className="img__primeroAccion">
                        <img src={urlImg ? urlImg : img}/>
                    </div>
                    <div className="divFile">
                        <input type="file" id="subirFoto" className="input__file" onChange={onFile}/>
                        <label htmlFor="subirFoto">Seleciona una foto</label>
                    </div>
                    <label htmlFor="textArea" className="label__text">Cuentanos sobre ti</label>
                    <textarea id="textArea" className="text__primero" rows="5" {...register("description", {required: true, minLength: 3})}></textarea>
                    <div className="primeroAccion__saludo primeroAccion__info">
                        <p>Se enviara un correo al email registrado para confirmar la cuenta.</p>
                    </div>

                    {
                        load ? 
                        <div className="register__loader"><Loader /></div> 
                        :
                        <input type="submit" value="Guardar" className="btn__campo"/>
                    }

                    
                </form>
            </div>
        </div>
    )
}

export default Home;

