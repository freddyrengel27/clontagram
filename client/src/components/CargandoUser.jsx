
import { useUsuario } from "../contex/user-context";

import persona from "../assets/img/hombre.png";
import Loader from "./Loader";

const CargandoUser = ({children}) =>{

    const {cargando} = useUsuario();

    if(cargando){
        return(
            <div className="contenedor">
                <div className="cargandoUser">
                <img src={persona}/>
                    <div className="cargandoUser__info">
                        <h4>CLONTAGRAM</h4>
                        <p>Clontagram diseñada por <span>Freddy Rengel</span></p>
                        <div className="conter__loaderCargando">
                            <Loader/>
                        </div>
                    </div>
                </div>                
            </div>
        )
    }

    return(children)

};


export default CargandoUser;