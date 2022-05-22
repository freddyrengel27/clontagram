import { useRef } from "react";
import VideoVista from "./VideoVista.jsx";

const VistaImgVideo = (props) =>{

    const {archivo} = props

    const playerRef = useRef(null);

    const videoJsOptions = {
        autoplay: true,
        controls: true,
        responsive: true,
        fluid: true,
        sources: [{
          src: archivo.url_publicacion,
          type: 'video/mp4'
        }]
      };

      const handlePlayerReady = (player) => {
        playerRef.current = player;
  
        player.on('waiting', () => {
          player.log('player is waiting');
        });
    
        player.on('dispose', () => {
          player.log('player will dispose');
        });
      };

      if(archivo.type_publicacion == "image"){

        return(
            <img className="visorP" src={archivo.url_publicacion}/>
        )
      }

    return(
        <VideoVista options={videoJsOptions} onReady={handlePlayerReady}/>
    )
                    
};

export default VistaImgVideo;