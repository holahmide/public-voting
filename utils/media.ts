/* eslint-disable no-unused-vars */
import cloudinary from 'cloudinary';
import fs from 'fs';
import path from 'path';

// type UploadMedia = (
//   file: any,
//   folder: string,
//   name: string,
//   location: string,
// ) => Promise<cloudinary.UploadApiResponse>;
// type DeleteMedia = (public_id: string) => Promise<cloudinary.DeleteApiResponse>;

type UploadMedia = (
  file: any,
  folder: string,
  name: string,
) => Promise<{ path: String}>;
type DeleteMedia = (public_id: string) => Promise<cloudinary.DeleteApiResponse>;

// const uploadMedia: UploadMedia = (file: any, folder: string, name: string) =>
//   new Promise((resolve, reject) => {
//     cloudinary.v2.uploader.upload(
//       file.path,
//       {
//         resource_type: 'auto',
//         folder: `${process.env.NODE_ENV}/${folder}`,
//         public_id: `${name}`,
//         overwrite: true,
//       },
//       (error, result) => {
//         if (error) reject(error);
//         // @ts-ignore
//         resolve(result);
//       }
//     );
//   });

const uploadMedia: UploadMedia = (file: any, folder: string, name: string) =>
  new Promise((resolve, reject) => {
    const targetPath = path.join(__dirname, "./public/images");
    fs.rename(file.path, `${targetPath}/${folder}/${name}`, err => {
      if (err) return reject(err);

      resolve({path: targetPath})
    });
  });

const deleteMedia: DeleteMedia = (public_id) =>
  new Promise((resolve, reject) => {
    cloudinary.v2.uploader.destroy(
      `${process.env.NODE_ENV}/${public_id}`,
      (error, result) => {
        if (error) reject(error);
        // @ts-ignore
        resolve(result);
      }
    );
  });

export default {
  uploadMedia,
  deleteMedia,
};
