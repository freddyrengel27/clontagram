
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSocial from "../hook/useSocial";
import axios from "axios";

import imgDefault from "../assets/img/defaultImage.png"
import Header from "./Header.jsx"

import VistaImgVideo from "./vista-publicaciones/VistaImgVideo";

const Perfil = () =>{

    const {pushPerfil} = useSocial();
    const navigate = useNavigate();
    const params = useParams();

    const [perfil, setPerfil] = useState();
    const [publicacion, setPublicacion] = useState();



    useEffect( async() =>{

        const {data} = await axios.get(import.meta.env.VITE_APP_HOST_API + "onegetuser/" + params.id);
        console.log(data)
        if(!data.perfil.id){
            navigate("/home");
            return
        }
        setPerfil(data.perfil);
        const res = await axios.get(import.meta.env.VITE_APP_HOST_API + "getpublicperfil/" + params.id);
        console.log(res.data.publicaciones)
        setPublicacion(res.data.publicaciones);
    }, []);

    return(
    <div className="contenedor">
         <Header />

        <div className="contenedor__publicaciones">
            <div className="contenedor__elPerfil">
                <div className="elPerfil__hear">
                    <div className="elPerfil__img">
                        <img src={perfil ? perfil.urlImage : imgDefault} />
                    </div>
                    <div className="elPerfil__informacion">
                        <div className="elPerfil__informacionUser">
                            <h4>{perfil ? perfil.username : "Loading..."}</h4>
                            <button>Editar Perfil</button>
                        </div>
                        <div className="elPerfil__informacionSegidores">
                            <span>{perfil ? perfil.conteo : "0"} Publicaciones</span>
                            <span>0 Seguidores</span>
                            <span>0 Seguidos</span>
                        </div>
                        <span className="elPerfil__name">{perfil ? perfil.nombre : "Loading..."}</span>
                        <div className="Elperfil__descripcion">
                            <p>{perfil ? perfil.descripcion : "Loading..."}</p>
                        </div>
                    </div>
                </div>
                <div className="elPerfil__publicaciones">
                    
                    {publicacion >= 1 &&
                            
                            publicacion.map((ele) =>{
                                return <div className="Elperfil__publicacion" key={ele.id_publicacion}>
                                            <div className="Elperfil__contenedorPu">
                                                <VistaImgVideo archivo={ele}   />
                                            </div>
                                            <div className="Elperfil__vermas">
                                                <button className="btn__redirect" onClick={() => pushPerfil(perfil.id)}>ver más</button>
                                            </div>
                                        </div>
                            })
                            
                        }
                        
                    </div>
            </div>
        </div>        
</div>

    )
};

export default Perfil;