import React, { useEffect, useRef, useState } from "react";

import axios from "axios";

import { useUsuario } from "../contex/user-context.jsx";

import moment from "moment";

import socket from "../socket/socket.js";

import Header from "./Header.jsx";
import TargetaUser from "./mini-components/TargetaUser.jsx";

const Mensajes = () =>{

    const {userInfo} = useUsuario()

    const [newChat, setNewChat] = useState(false);

    const [chats, setChats] = useState();

    const [canal, setCanal] = useState();
    const [mensajes, setMensajes] = useState([]);

    const sendText = useRef();

    useEffect(() =>{
        const getChat = async () =>{
            const {data} = await axios.get(import.meta.env.VITE_APP_HOST_API + "getchats");
            setChats(data.chats);
        }
        getChat();    
    }, []);

    useEffect(() =>{
        socket.on("send:servidor", (msg) =>{
               setMensajes([...mensajes, msg]);
        });

        return () => socket.off()

    }, [mensajes])

    const getMensajes = async (el) =>{
        if(!canal || el.id_chat != canal.id_chat){
        const {data} = await axios.get(import.meta.env.VITE_APP_HOST_API + "getmessages/" + el.id_chat);
        setMensajes(data.mensajes);
        setCanal(el);
        socket.emit("set:canal", el.id_chat);
        };  
    };


    const sendMsg = () =>{

        if(canal && sendText.current.value.length >=3){
            const msg = {
                chat_id: canal.id_chat,
                user_envia: userInfo.id,
                user_recibe: canal.id,
                mensaje: sendText.current.value,
                fecha: moment().format("YYYY-MM-DD HH:mm:ss")
            };
    
            socket.emit("send:client", msg);
            sendText.current.value = "";
        }
    };

    

    return(
        <div className="contenedor">
            <Header />
            <div className="contenedor__publicaciones">
            <div className="contenedor__mensajes">
                <div className="mensajes__bandeja">
                    <div className="mensajes__bandejaUser">
                        <span>{userInfo.username}</span>
                        <span className="btn__mas" onClick={() => setNewChat(true)}>+</span>
                    </div>
                    <div className="bandeja__mensajes">
                        <div className="bandeja">
                        {chats &&
                            chats.map((el) =>{
                                return <div className="targeta__bandeja" key={el.id_chat} onClick={() => getMensajes(el)}>
                                            <div className="targeta__bandejaImg">
                                                <img src={el.urlImage}/>
                                            </div>
                                            <div className="targeta__bandejaInfo">
                                                <span>{el.username}</span>
                                            </div>
                                        </div>
                            })
                            }
                            

                        </div>
                    </div>
                        
                </div>
                <div className="mensajes__vistas">
                    <div className="ventana__mensajes">

                        <div className="contenedor__globo">

                            
                            {
                                mensajes.map((el, i) => <p key={i} className={el.user_envia == userInfo.id ? "globo_mensaje mensaje__enviado" : "globo_mensaje mensaje__recibido"}>{el.mensaje}</p>)
                            }

                            
                
               
                
                            


                        </div>
                                                       
                    </div>
                    <div className="send__mensajes">
                        <textarea rows="2" ref={sendText}></textarea>
                        <input type="submit" value="Enviar" className="mensaje__enviar" onClick={sendMsg}/>
                    </div>
                </div>

            </div>
            </div>

            {newChat && <SelectChat setClose={() => setNewChat(false)}/>}
        </div>
    )
};



const SelectChat = (props) =>{

    const {setClose} = props

    const [usuarios, setUsuarios] = useState([]);

    const cambio = (text) =>{

        if(text.trim().length >= 1){
            socket.emit("buscador", text);
        }
        
    };
    
    socket.on("buscador:res", (data) =>{
        setUsuarios(data);
    })


    const registerNewChat = async (id) =>{
        try {
             await axios.post(import.meta.env.VITE_APP_HOST_API + "createchat", {idUser: id});
             setClose();   

        } catch (error) {
            console.log(error)
        }
    }


    return(
        <div className="contenedor__modal modal__offOscure">
            <div className="contendor__selectChat">
                <button className="close__newchat" onClick={() => setClose()}>X</button>
                <div className="selectChat__buscador">
                    <input type="text" className="campo" placeholder="Buscar..." onChange={(e) => cambio(e.target.value)}/>
                </div>
                <div className="selectChat__options">
                    
                    {usuarios.length >= 1 && 
                    
                    usuarios.map((el) =>{


                        return <div key={el.id} onClick={() => registerNewChat(el.id)}><TargetaUser info={el}/></div>
                    })

                    } 
                    
                    
              

                </div>
            </div>
        </div>
    )
};

export default Mensajes;