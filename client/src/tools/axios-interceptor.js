import axios from "axios";
import {getLocal} from "./localStore.js"

const axiosInterceptor = () =>{
    axios.interceptors.request.use((config) =>{
        const token = getLocal("token");
        if(token){
            config.headers.authorization = token;
        }
        return config;
    })
};

export default axiosInterceptor;