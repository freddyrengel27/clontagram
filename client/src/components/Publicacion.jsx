
import {useNavigate, useParams} from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useUsuario } from "../contex/user-context.jsx";
import axios from "axios";

import useSocial from "../hook/useSocial.jsx";

import Header from "./Header.jsx";
import VistaImgVideo from "./vista-publicaciones/VistaImgVideo.jsx";

import corazon from "../assets/img/heart.png";
import redCorazon from "../assets/img/heartRed.png";
import imgDefault from "../assets/img/defaultImage.png"



const Publicacion = () =>{

    const navigate = useNavigate();
    const params = useParams();
    const {handleSubmit, register, reset} = useForm();
    const {userInfo} = useUsuario();
    const {controlLike, pushPerfil} = useSocial();

    const [muro, setMuro] = useState(null);
    const [comentarios, setComentarios] = useState([]);

    const [like, setLike] = useState(false);

   
    
    useEffect(async() =>{

        try {
            const {data} = await axios.get(import.meta.env.VITE_APP_HOST_API + "getonepublicacion/" + params.id);
            
            if(!data.publicacion){
                navigate("/home")
                return;
            }
            setMuro(data.publicacion);
            if(data.publicacion.id_like){
                setLike(true)
            }
            const res = await axios.get(import.meta.env.VITE_APP_HOST_API + "/getcomentarios/" + params.id);
            setComentarios(res.data.comentarios);
           
        } catch (error) {
            console.log(error)
        }

    }, []);

    const darLike = async () =>{
        try {
          await controlLike(like, muro.id_publicacion, muro.id_like);
          setLike(!like)
        } catch (error) {
          console.log(error)
        }
    };

    const redirecPerfil = () =>{
        pushPerfil(muro.id);
      };

    const enviar = async (data) =>{

        const send ={
            idPublicacion: muro.id_publicacion,
            comentario: data.comentario
        };
        try {
            const res = await axios.post(import.meta.env.VITE_APP_HOST_API + "addcomentarios", send);
            comentarios.push({...send, username: userInfo.username, id_comentario: res.data.id})
            reset();
        } catch (error) {
            console.log(error)
        }
    };


    return(
        <div className="contenedor">
            <Header />
            <div className="contenedor__publicaciones">
                <div className="unoPublicacion">
                    <div className="unoPublicacion__multimedia">
                        <div className="multimedia">
                            {muro ?
                                <VistaImgVideo archivo={muro} />
                                :
                                <img src={imgDefault} />    
                            }
                        </div>
                        <div className="unoPublicacion__descripcion">
                            <p>{muro ? muro.descripcion : "Loading..."}</p>
                        </div>
                    </div>
                    <div className="unoPublicacion__accion">
                        <div className="unoPublicacion__head">
                            <div className="unoPublicacion__userImg">
                                <img src={muro ? muro.urlImage : imgDefault} />
                            </div>
                            <div className="unoPublicacion__user">
                                <span className="unoPublicacion__username" onClick={redirecPerfil}>{muro ? muro.username : "Loading..."}</span>
                                <span className="unoPublicacion__name">{muro ? muro.nombre : "Loading..."}</span>
                            </div>
                        </div>  
                        <div className="unoPublicaccion__coment">
                            <div className="comment__scroll">
                                {
                                    comentarios.map(ele =>{
                                        return <div className="comment" key={ele.id_comentario}>
                                                    <p><span onClick={() => pushPerfil(ele.id_usuario)}>{ele.username}</span> {ele.comentario}</p>
                                                </div>
                                    })
                                }
                                
                            </div>
                        </div>
                        <div className="unoPublicacion__accions">
                            <div className="unoPublicacion__like" onClick={darLike}>
                                <img src={like ? redCorazon : corazon} />
                            </div>
                            <form className="unoPublicacion__form" onSubmit={handleSubmit(enviar)}>
                                <textarea rows="3" {...register("comentario", {required: true, minLength: 2})}></textarea>
                                <input type="submit" value="Enviar" className="unoPublicacion__btn"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Publicacion;