

import multer from 'multer';
import { Request } from 'express';
import { error } from 'node:console';

const storage = multer.diskStorage({
    destination: function (req: Request, file: Express.Multer.File, cb: any) {
        const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedFileTypes.includes(file.mimetype)) {
            cb(new Error("Invalid file type"))
            return
        }
        cb(null, "./src/uploads");
    },
    filename: function(req: Request, file: Express.Multer.File, cb: any){
        cb(null, Date.now()+"_"+file.originalname)
    }
})

export {
    multer,
    storage
}