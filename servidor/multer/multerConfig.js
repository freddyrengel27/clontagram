import {diskStorage} from "multer";
import moment from "moment";

const storage = diskStorage({
    destination: "./uploadFiles",
    filename: (req, file, cb) =>{
        let unique = moment().unix();
        cb(null, file.fieldname + "-" + unique)
    }
    
});

export default storage;