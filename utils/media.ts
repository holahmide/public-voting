/* eslint-disable no-unused-vars */
import cloudinary from 'cloudinary';

type UploadMedia = (
  file: any,
  folder: string,
  name: string
) => Promise<cloudinary.UploadApiResponse>;
type DeleteMedia = (public_id: string) => Promise<cloudinary.DeleteApiResponse>;

const uploadMedia: UploadMedia = (file: any, folder: string, name: string) =>
  new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(
      file.path,
      {
        resource_type: 'auto',
        folder: `coe-vote/${folder}`,
        public_id: `${name}`,
        overwrite: true,
      },
      (error, result) => {
        if (error) reject(error);
        // @ts-ignore
        resolve({path: result.secure_url, blurPath: ''});
      }
    );
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
