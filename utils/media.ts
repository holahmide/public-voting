/* eslint-disable no-unused-vars */
import cloudinary from 'cloudinary';
import fs from 'fs';
import path from 'path';

type UploadMedia = (
  file: any,
  folder: string,
  name: string
) => Promise<{ path: String }>;
type DeleteMedia = (public_id: string) => Promise<{ message: String }>;

const uploadMedia: UploadMedia = (file: any, folder: string, name: string) =>
  new Promise((resolve, reject) => {
    // Name + Extension
    name = `${name}${path.extname(file.originalname)}`;

    const targetPath = path.join(__dirname, `../public/images/${folder}`);
    if (!fs.existsSync(targetPath)) {
      fs.mkdirSync(targetPath, { recursive: true });
    }

    fs.rename(
      path.join(__dirname, `../${file.path}`),
      `${targetPath}/${name}`,
      (err) => {
        if (err) return reject(err);
        resolve({ path: `images/${folder}/${name}` });
      }
    );
  });

const deleteMedia: DeleteMedia = (pathName) =>
  new Promise((resolve, reject) => {
    if (!pathName) return reject({ message: 'path not specified' });  
    fs.unlinkSync(path.join(__dirname, `../public/${pathName}`));
    return resolve({ message: 'deleted file.' });
  });

export default {
  uploadMedia,
  deleteMedia,
};
