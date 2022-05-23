import multer from 'multer';
import { v4 } from 'uuid';
import path from 'path'

const storage = multer.diskStorage({
  destination: (_, __, cb: any) => {
    let pathName = `./temporary_uploads/`;
    cb(null, pathName);
  },
  filename: (_: any, file: any, cb: any) => {
    cb(null, `${new Date().toISOString().replace(/:/g, '-')}-${v4()}${file.originalname}`);
  },
});

const upload: any = multer({
  storage,
});

export default upload;
