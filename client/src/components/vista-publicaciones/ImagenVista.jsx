
import {useState, useEffect, useRef } from "react";
import useSocial from "../../hook/useSocial.jsx";

import VistaImgVideo from "./VistaImgVideo.jsx";

import corazon from "../../assets/img/heart.png";
import redCorazon from "../../assets/img/heartRed.png";

import LazyLoad from "../lazy-load/LazyLoad.jsx";

const ImagenVista = (props) =>{

    const {archivo} = props;

    const [like, setLike] = useState(false);

    const {controlLike, pushPublicacion, pushPerfil} = useSocial();

      useEffect(() =>{
        if(archivo.id_like){
          setLike(true);
        }
      }, [])
    

      const darLike = async () =>{
          try {
            await controlLike(like, archivo.id_publicacion, archivo.id_like);
            setLike(!like)
          } catch (error) {
            console.log(error)
          }
      };

      const redirec = () =>{
        pushPublicacion(archivo.id_publicacion);
      };

      const redirecPerfil = () =>{
        pushPerfil(archivo.id);
      };

    return(
        <div className="contenedor__vista">
        <div className="vista__infoUser">
            <div className="vista__img">
                <img src={archivo.urlImage}/>
            </div>
            <div className="vista__inf">
                <span className="vista__username" onClick={redirecPerfil}>{archivo.username}</span>
                <span className="vista__nombre">{archivo.nombre}</span>
            </div>
            <button>...</button>
        </div>
        <div className="vista__publicacion">

            <LazyLoad>
              <VistaImgVideo archivo={archivo}/>
            </LazyLoad>
            
        </div>
        <div className="vista__bot">
            <div className="vista__info">
               <span>Hace 21 horas</span>
            </div>
            <div className="vista__accion">
                <div className="btn__like" onClick={darLike}>
                    <img src={like ? redCorazon : corazon}/>
                </div>
            
                <button className="btn__redirect" onClick={redirec}>ver más</button>
            </div>
        </div>
    </div>
    )
};

export default ImagenVista;