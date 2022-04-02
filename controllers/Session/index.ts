import slugify from 'slugify';
import { RequestHandler } from 'express';
import { serverError, uploadMedia } from '../../utils';
import Session from '../../models/Session';
import Category from '../../models/Session/Category';
import fs from 'fs';

export const createSession: RequestHandler = async (req: any, res) => {
  const { user } = req;
  let { categories } = req.body;
  try {
    // Creating session unique slug
    let unique = false;
    let count = 0;
    while (!unique) {
      const postfix = count ? `-${count}` : '';
      const slug = `${slugify(req.body.title, { lower: true })}${postfix}`;
      // eslint-disable-next-line no-await-in-loop
      const findSlug = await Session.findOne({ slug });
      if (!findSlug) {
        unique = true;
        req.body.slug = slug;
      }
      count += 1;
    }

    const createdSession = await Session.create({
      ...req.body,
      user,
    });

    // upload images
    if (req.file) {
      const image = await uploadMedia(
        req.file,
        `voting/sessions/${createdSession._id}`,
        createdSession._id
      );
      createdSession['logo'] = image.secure_url;

      // Delete image from local folder
      fs.unlinkSync(req.file.path);
    }

    // Create categories if passed
    categories = JSON.parse(categories);
    if (categories && categories.length > 0) {
      categories.map((category: any) => {
        Category.create({ name: category.name, session: createdSession._id });
      });
    }

    createdSession.save();

    return res.status(201).json({
      status: true,
      data: {
        createdSession,
      },
    });
  } catch (err) {
    serverError(res, err);
  }
};

export const updateSession: RequestHandler = async (req: any, res) => {
  const { id } = req.params;

  try {
    await Session.findByIdAndUpdate({ _id: id }, req.body);
    const updatedSession = await Session.findOne({ _id: id });

    // Creating session unique slug
    let unique = false;
    let count = 0;
    while (!unique) {
      const postfix = count ? `-${count}` : '';
      const slug = `${slugify(req.body.title, { lower: true })}${postfix}`;
      // eslint-disable-next-line no-await-in-loop
      const findSlug = await Session.findOne({ slug });
      if (!findSlug) {
        unique = true;
        updatedSession.slug = slug;
      }
      count += 1;
    }

    // upload images
    if (req.file) {
      const image = await uploadMedia(
        req.file,
        `voting/sessions/${updatedSession._id}`,
        updatedSession._id
      );
      updatedSession['logo'] = image.secure_url;
    }

    updatedSession.save();

    return res.status(200).json({
      status: true,
      data: {
        updatedSession,
      },
    });
  } catch (err) {
    serverError(res, err);
  }
};

export const deleteSession: RequestHandler = async (req: any, res) => {
  const { id } = req.params;
  try {
    await Session.deleteOne({ _id: id });
    return res.status(204).json({
      status: true,
      data: {
        message: 'session deleted',
      },
    });
  } catch (err) {
    serverError(res, err);
  }
};
