import { RequestHandler } from 'express';
import { serverError, uploadMedia, deleteMedia } from '../../../utils';
import Nominee from '../../../models/Session/Nominee';
import Session from '../../../models/Session';
import Category from '../../../models/Session/Category';
import database from '../../../models';

export const createNominee: RequestHandler = async (req: any, res) => {
  // Start mongoose session
  const databaseConnection = await database.startSession();

  const { category } = req.body;
  try {
    databaseConnection.startTransaction();

    const createdNominee = await Nominee.create({
      ...req.body,
    });

    // Get Session Slug
    const findCategory: any = await Category.findOne({ _id: category });
    const findSession: any = await Session.findOne({
      _id: findCategory.session,
    });

    // upload images
    if (req.file) {
      const image = await uploadMedia(
        req.file,
        `${findSession.slug}/nominees`,
        createdNominee._id
      );
      createdNominee['picture'] = image.path;
      createdNominee['blurPicture'] = image.blurPath;
    }

    createdNominee.save();

    await databaseConnection.commitTransaction();

    return res.status(201).json({
      status: true,
      data: {
        createdNominee,
      },
    });
  } catch (err) {
    await databaseConnection.abortTransaction();
    serverError(res, err);
  }
};

export const createMultipleNominee: RequestHandler = async (req: any, res) => {
  // Start mongoose session
  const databaseConnection = await database.startSession();

  try {
    databaseConnection.startTransaction();

    const session: any = Session.findOne({ slug: req.body.session });

    const nominees = JSON.parse(req.body.nominees);
    const resultArray = await Promise.all(
      nominees.map(async (nominee: any) => {
        // Confirm that category does exist
        let findCategory = await Category.findOne({ _id: nominee.category });
        if (!findCategory) return;

        // Confirm that nominee does not exist
        let findNominee = await Nominee.findOne({
          regno: nominee.regno,
          category: nominee.category,
        });
        if (findNominee) return;

        // Create Nominee
        nominee.regno = Number(nominee.regno)
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
              `${session.slug}/nominees`,
              createdNominee._id
            );
            createdNominee['picture'] = image.path;
            createdNominee['blurPicture'] = image.blurPath;
            createdNominee.save();
          }
        }

        return createdNominee;
      })
    );

    await databaseConnection.commitTransaction();

    return res.status(201).json({
      status: true,
      data: {
        resultArray,
      },
    });
  } catch (err) {
    await databaseConnection.abortTransaction();
    serverError(res, err);
  }
};

export const updateNominee: RequestHandler = async (req: any, res) => {
  // Start mongoose session
  const databaseConnection = await database.startSession();

  const { id } = req.params;

  try {
    databaseConnection.startTransaction();

    await Nominee.findByIdAndUpdate({ _id: id }, req.body);
    const updatedNominee = await Nominee.findOne({ _id: id });

    // Get Session Slug
    const findCategory: any = await Category.findOne({ _id: updatedNominee.category });
    const findSession: any = await Session.findOne({
      _id: findCategory.session,
    });

    // upload images
    if (req.file) {
      const image = await uploadMedia(
        req.file,
        `${findSession.slug}/nominees`,
        updatedNominee._id
      );
      updatedNominee['picture'] = image.path;
      updatedNominee['blurPicture'] = image.blurPath;
    }

    updatedNominee.save();

    await databaseConnection.commitTransaction();

    return res.status(200).json({
      status: true,
      data: {
        updatedNominee,
      },
    });
  } catch (err) {
    await databaseConnection.abortTransaction();
    serverError(res, err);
  }
};

export const deleteNominee: RequestHandler = async (req: any, res) => {
  const { id } = req.params;
  try {
    // Find Nominee
    const nominee:any = await Nominee.findOne({ _id: id })
    // Delete main picture and blur picture
    if (nominee.picture) await deleteMedia(nominee.picture)
    if (nominee.blurPicture) await deleteMedia(nominee.blurPicture);

    await Nominee.deleteOne({ _id: id })
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
