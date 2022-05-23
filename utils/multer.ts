import multer from 'multer';
import { v4 } from 'uuid';

const storage = multer.diskStorage({
  destination: (_, __, cb: any) => {
    let path = `./temporary_uploads/`;
    cb(null, path);
  },
  filename: (_: any, file: any, cb: any) => {
    cb(null, `${new Date().toISOString().replace(/:/g, '-')}-${v4()}${file.originalname}`);
  },
});

const upload: any = multer({
  storage,
});

export default upload;
