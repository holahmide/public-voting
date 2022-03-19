import slugify from 'slugify';
import { RequestHandler } from 'express';
import { serverError } from '../../utils';
import Session from '../../models/Session';

export const createSession: RequestHandler = async (req, res) => {
  try {
    const createdSession = await Session.create({
      ...req.body,
    });

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
        createdSession.slug = slug;
      }
      count += 1;
    }

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
