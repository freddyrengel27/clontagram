import { useNavigate } from "react-router-dom";
import axios from "axios";

const useSocial = () =>{

    const navigate = useNavigate();

    const controlLike = async (state, idPublicacion, id_like) =>{
        try {
            if(state){
                return await axios.delete(import.meta.env.VITE_APP_HOST_API + "removelike" + id_like)
            }
            return await axios.post(import.meta.env.VITE_APP_HOST_API + "darlike", {idPublicacion})
        } catch (error) {
            console.log(error)
        }
    };

    const pushPerfil = (id) =>{
        navigate(`/perfil/${id}`);
    };

    const pushPublicacion = (id) =>{
        navigate(`/publicacion/${id}`);
    };

    return{
        controlLike,
        pushPerfil,
        pushPublicacion
    }
};

export default useSocial;