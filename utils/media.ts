/* eslint-disable no-unused-vars */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

type UploadMedia = (
  file: any,
  folder: string,
  name: string
) => Promise<{ path: String; blurPath: String }>;
type DeleteMedia = (public_id: string) => Promise<{ message: String }>;

const uploadMedia: UploadMedia = (file: any, folder: string, name: string) =>
  new Promise((resolve, reject) => {
    // Establish the target Folder public/images/sessionSlug/filename/filename.extension
    const targetPath = path.join(
      __dirname,
      `../public/images/${folder}/${name}`
    );
    // Name + Extension
    let fullName = `${name}${path.extname(file.originalname)}`;
    if (!fs.existsSync(targetPath)) {
      fs.mkdirSync(`${targetPath}`, { recursive: true });
    }

    // Move from temporary folder to target folder
    fs.rename(
      path.join(__dirname, `../../${file.path}`),
      `${targetPath}/${fullName}`,
      (err) => {
        if (err) return reject(err);

        // Add Low Quality image blur.jpg
        sharp(`${targetPath}/${fullName}`)
          // .jpeg({ mozjpeg: true, quality: 70 })
          .jpeg({ mozjpeg: true, quality: 20 })
          .toFile(
            `${targetPath}/blur${path.extname(file.originalname)}`,
            function (err) {
              if (err) return reject(err);
              resolve({
                path: `images/${folder}/${name}/${fullName}`,
                blurPath: `images/${folder}/${name}/blur${path.extname(
                  file.originalname
                )}`,
              });
            }
          );
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
