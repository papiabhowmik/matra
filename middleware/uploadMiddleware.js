import multer from "multer";
import path from 'path';

export const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './upload'); 
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    },
    
});
const upload = multer({ storage });

export const mulUpload = upload.fields([{ name: 'image', maxCount: 10}, { name: 'big_image', maxCount: 10 }])
 
 