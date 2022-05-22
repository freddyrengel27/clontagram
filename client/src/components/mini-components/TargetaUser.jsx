


const TargetaUser = (props) =>{

    const {username, nombre, urlImage} = props.info;

    return(
        <div className="targeta__usuario">
            <div className="targetaUser__img">
                    <img src={urlImage} />
            </div>
            <div className="targetaUser__info">
                <span className="targetaUser__username">{username}</span>
                <span className="targetaUser__nombre">{nombre}</span>
            </div>
        </div>
    )
};

export default TargetaUser;