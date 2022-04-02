import { RequestHandler } from 'express';
import { serverError, uploadMedia } from '../../../utils';
import Nominee from '../../../models/Session/Nominee';
import Category from '../../../models/Session/Category';
import fs from 'fs';

export const createNominee: RequestHandler = async (req, res) => {
  try {
    const createdNominee = await Nominee.create({
      ...req.body,
    });

    // upload images
    if (req.file) {
      const image = await uploadMedia(
        req.file,
        `voting/sessions/${createdNominee._id}`,
        createdNominee._id
      );
      createdNominee['picture'] = image.secure_url;
      // Delete image from local folder
      fs.unlinkSync(req.file.path);
    }

    createdNominee.save();

    return res.status(201).json({
      status: true,
      data: {
        createdNominee,
      },
    });
  } catch (err) {
    serverError(res, err);
  }
};

export const createMultipleNominee: RequestHandler = async (req: any, res) => {
  try {
    const nominees = JSON.parse(req.body.nominees);
    const resultArray = await Promise.all(
      nominees.map(async (nominee: any) => {
        let findCategory = await Category.findOne({ _id: nominee.category });
        if (!findCategory) return;
        let findNominee = await Nominee.findOne({
          name: nominee.name,
          category: nominee.category,
        });
        if (findNominee) return;
        const createdNominee = await Nominee.create({
          ...nominee,
        });
        if (req.files) {
          const imageIndex = req.files.findIndex(
            (el: any) => el.fieldname == `image-${nominee.s_n}`
          );
          if (imageIndex > -1) {
            const image = await uploadMedia(
              req.files[imageIndex],
              `voting/sessions/${createdNominee._id}`,
              createdNominee._id
            );
            createdNominee['picture'] = image.secure_url;
            createdNominee.save();
            // Delete image from local folder
            fs.unlinkSync(req.files[imageIndex].path);
          }
        }

        return createdNominee;
      })
    );

    return res.status(201).json({
      status: true,
      data: {
        resultArray,
      },
    });
  } catch (err) {
    serverError(res, err);
  }
};

export const updateNominee: RequestHandler = async (req: any, res) => {
  const { id } = req.params;

  try {
    await Nominee.findByIdAndUpdate({ _id: id }, req.body);
    const updatedNominee = await Nominee.findOne({ _id: id });

    // upload images
    if (req.file) {
      const image = await uploadMedia(
        req.file,
        `voting/nominees/${updatedNominee._id}`,
        updatedNominee._id
      );
      updatedNominee['picture'] = image.secure_url;
    }

    updatedNominee.save();

    return res.status(200).json({
      status: true,
      data: {
        updatedNominee,
      },
    });
  } catch (err) {
    serverError(res, err);
  }
};

export const deleteNominee: RequestHandler = async (req: any, res) => {
  const { id } = req.params;
  try {
    await Nominee.deleteOne({ _id: id });
    return res.status(204).json({
      status: true,
      data: {
        message: 'Nominee deleted',
      },
    });
  } catch (err) {
    serverError(res, err);
  }
};
