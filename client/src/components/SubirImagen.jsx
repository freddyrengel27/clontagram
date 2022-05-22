import { useState } from "react";
import {useForm} from "react-hook-form";
import axios from "axios";

import defaultImage from "../assets/img/defaultImage.png"

import Loader from "./Loader.jsx";

const SubirImagen = (props) =>{

    const {register, handleSubmit, reset, formState: {errors}} = useForm();
    const {close} = props;

    const [loader, setLoader] = useState(false);

    const [file, setFile] = useState(null)
    const [urlFile, setUrlFile] = useState(null);

    const setCambio = (e) =>{
        const url = URL.createObjectURL(e.target.files[0]);
        setUrlFile(url);
        setFile(e.target.files[0]);
    }

    const publicar = async (publicacion) =>{
        try {
            setLoader(true);
            const {data} = await axios.post(import.meta.env.VITE_APP_HOST_API + "addpublicacion", publicacion);
            console.log(data.idPublicacion);

            const fileSend = new FormData();
            fileSend.append("idPublicacion", data.idPublicacion);
            fileSend.append("filePublicacion", file);
            await axios.post(import.meta.env.VITE_APP_HOST_API + "fotopublicacion", fileSend);
        } catch (error) {
            setLoader(false);
            console.log(error);
        }
    }

    return(
        <div className="contenedor__modal">
            <button className="addImage__close" onClick={close}>x</button>
            <form className="form__addImage" onSubmit={handleSubmit(publicar)}>
                <div className="input__addImage">
                    <div className="visor__addImage">
                        <img src={file ? urlFile : defaultImage}/>
                    </div>
                    <div className="divFile">
                        <input type="file" id="subirFoto" className="input__file" onChange={setCambio}/>
                        <label htmlFor="subirFoto">Seleciona</label>
                    </div>
                </div>
                <div className="text__addImage">
                    <textarea rows="5" {...register("descripcion", {required: true, minLength: 5})}></textarea>
                </div>
                {loader ? 
                <div className="register__loader"><Loader /></div> 
                :
                <input type="submit" value="Crear Publicacion" className="btn__campo"/>
            }
                
            </form>
        </div>
    )
};

export default SubirImagen;
