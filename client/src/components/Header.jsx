import { useState } from "react";

import {Link} from "react-router-dom";
import { useUsuario } from "../contex/user-context.jsx";
import useSocial from "../hook/useSocial.jsx";


import casa from "../assets/img/casa.png"
import send from "../assets/img/send.png"
import add from "../assets/img/add.png"
import compass from "../assets/img/compass.png"
import heart from "../assets/img/heart.png"
import SubirImagen from "./SubirImagen";
import imgDefault from "../assets/img/defaultImage.png";


const Header = () =>{

    const {userInfo} = useUsuario();
    

    const [showMenu, setShowMenu] = useState(false);

    const [showAddImage, setShowAddImage] = useState(false)

    const menuShow = () =>{
        setShowMenu(!showMenu);
    };

    const setAccionShow = () =>{
        setShowAddImage(!showAddImage);
    };

    return(
        <div>
        <header className="header">
            <div className="logo">
                <h1>Clontagram</h1>
            </div>
            <div className="buscador">
                <form className="form__buscador">
                    <input type="text" placeholder="Busca" className="input__buscador"/>
                </form>
            </div>
            <div className="nav__user">
                
                <Link className="nav__userIten" to="/home"><img src={casa}/></Link>
                <Link className="nav__userIten" to="/mensajes"><img src={send}/></Link>
                <a className="nav__userIten" onClick={setAccionShow}><img src={add}/></a>
                <Link className="nav__userIten" to="#"><img src={compass}/></Link>
                <Link className="nav__userIten" to="#"><img src={heart}/></Link>

                <div className="menu__user">
                <div className="menu__img" onClick={menuShow}>
                    <img src={!userInfo.urlImage ? imgDefault : userInfo.urlImage} />
                </div>
                {showMenu && <Menu />}
            </div>
                
            </div>
            
           

        </header>
            {showAddImage && <SubirImagen close={setAccionShow}/>}
        </div>
    )
};

const Menu = () =>{
    const {userInfo} = useUsuario();
    const {pushPerfil} = useSocial();
    const {logout} = useUsuario();

   

    return(
        <nav className="menu">
            <a className="menu__userIten" onClick={() => pushPerfil(userInfo.id)} >Perfil</a>
            <Link className="menu__userIten" to="#">Guardados</Link>
            <a className="menu__userIten menu__exit" onClick={logout}>Cerrar sesion</a>
        </nav>
    )
};

export default Header;