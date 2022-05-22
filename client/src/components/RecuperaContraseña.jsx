import {Link} from "react-router-dom";

import lock from "../assets/img/padlock.png"


const RecuperaContraseña = () =>{



    return(
        <div className="contenedor">
            <div className="contenedor__recupera">
                <div className="recupera__cabezera">
                    <div className="recupera__img">
                        <img src={lock}/>
                    </div>
                    <h4>¿Tienes problemas para entrar?</h4>
                    <span>Introduce tu correo electrónico te enviaremos un enlace para que vuelvas a entrar en tu cuenta.</span>
                </div>
                <form className="form__recupera">
                    <input type="email" className="campo"  placeholder="Ingresa tu email"/>
                    <input type="submit" className="btn__campo" value="Enviar enlace de acceso"/>
                </form>
                <div className="recupera__redirec">
                    <Link to="/registro" className="recupera__crea">Crear cuenta nueva</Link>
                    <Link to="/login" className="recupera__re">Volver al inicio de sesion</Link>
                </div>
            </div>
        </div>
    )
};

export default RecuperaContraseña;