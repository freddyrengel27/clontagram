'use strict'
import cloudinary from "cloudinary";

const uploadCloud = async (path) =>{
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_KEY,
        api_secret: process.env.CLOUD_SECRET,
    })
    
    const upload = await cloudinary.v2.uploader.upload(path, {resource_type: "auto"});
    return upload;
};

export default uploadCloud;