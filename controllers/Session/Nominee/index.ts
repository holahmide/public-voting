import { RequestHandler } from 'express';
import { serverError, uploadMedia } from '../../../utils';
import Nominee from '../../../models/Session/Nominee';
import fs from 'fs';
import Session from '../../../models/Session';
import Category from '../../../models/Session/Category';

export const createNominee: RequestHandler = async (req: any, res) => {
  const { category } = req.body;
  try {
    const createdNominee = await Nominee.create({
      ...req.body,
    });

    // Get Session Slug
    const findCategory: any = Category.findOne({ _id: category });
    const findSession: any = Session.findOne({ _id: findCategory.session });

    // upload images
    if (req.file) {
      const image = await uploadMedia(
        req.file,
        `${findSession.slug}/nominees/${createdNominee._id}`,
        createdNominee._id
      );
      createdNominee['picture'] = image.path;
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
    const session: any = Session.findOne({ _id: req.body.session });

    const nominees = JSON.parse(req.body.nominees);
    const resultArray = await Promise.all(
      nominees.map(async (nominee: any) => {
        // Confirm that category does exist
        let findCategory = await Category.findOne({ _id: nominee.category });
        if (!findCategory) return;

        // Confirm that nominee does not exist
        let findNominee = await Nominee.findOne({
          name: nominee.name,
          category: nominee.category,
        });
        if (findNominee) return;

        // Create Nominee
        const createdNominee = await Nominee.create({
          ...nominee,
        });

        // Upload Images
        if (req.files) {
          const imageIndex = req.files.findIndex(
            (el: any) => el.fieldname == `image-${nominee.s_n}`
          );
          if (imageIndex > -1) {
            const image = await uploadMedia(
              req.files[imageIndex],
              `${session.slug}/nominees/${createdNominee._id}`,
              createdNominee._id
            );
            createdNominee['picture'] = image.path;
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
  const { category } = req.body;

  try {
    // Get Session Slug
    const findCategory: any = Category.findOne({ _id: category });
    const findSession: any = Session.findOne({ _id: findCategory.session });

    await Nominee.findByIdAndUpdate({ _id: id }, req.body);
    const updatedNominee = await Nominee.findOne({ _id: id });

    // upload images
    if (req.file) {
      const image = await uploadMedia(
        req.file,
        `${findSession.slug}/nominees/${updatedNominee._id}`,
        updatedNominee._id
      );
      updatedNominee['picture'] = image.path;
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
