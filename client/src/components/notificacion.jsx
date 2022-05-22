

const Notificacion = (props) =>{
    
    return(
        <div className={props.tipoNoti == "error" ? "contenedor__notificacion contenedor__notificacion_danger" : "contenedor__notificacion contenedor__notificacion_nice"}>
            <span className="Notificacion">{props.info}</span>
        </div>
    )
};

export default Notificacion;