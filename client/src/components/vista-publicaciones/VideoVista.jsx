import { useEffect, useRef } from "react";
import videoJs from "video.js";
import 'video.js/dist/video-js.css';

const VideoVista = (props) =>{

    const videoRef = useRef(null);
    const playerRef = useRef(null);

    const {options, onReady} = props;

    useEffect(() =>{
        if(!playerRef.current){
            const videoElement = videoRef.current;
            if(!videoElement) return

            const player = playerRef.current = videoJs(videoElement, options, () =>{
                player.log("player is ready");
                onReady && onReady(player);
            });
        }
    }, [options, videoRef]);

    useEffect(() =>{
        const player = playerRef.current;
        return () =>{
            if(player){
                player.dispose();
                playerRef.current = null;
            }
        }
    }, [playerRef]);



    return(
        <div className="contendVIdeo">
            <video ref={videoRef} className="visorP video-js vjs-big-play-centered"></video>
        </div>
       
    )
};

export default VideoVista;