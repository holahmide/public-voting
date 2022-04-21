import { RequestHandler } from 'express';
import Nominee from '../../../models/Session/Nominee';
import Vote from '../../../models/Session/Vote';
import { serverError } from '../../../utils';

export const verifyCreateVote: RequestHandler = async (
  req: any,
  res,
  next
) => {
  try {
    let { nominee } = req.body;
    let { user } = req;
    const findVote = await Vote.exists({ nominee, user });
    if (findVote) {
      return res.status(404).json({
        status: false,
        message: `you have already voted for this nominee`,
      });
    }
    const findNominee:any = await Nominee.findOne({ _id: nominee }).populate('category');
    req.body.category = findNominee.category._id;
    const checkIfUserHasVotedForCategory = await Vote.exists({ category:findNominee.category._id, user });
    if (checkIfUserHasVotedForCategory) {
      return res.status(404).json({
        status: false,
        message: `you have already voted for this category`,
      });
    }
    next();
  } catch (err) {
    serverError(res, err);
  }
};

export const findVote: RequestHandler = async (req: any, res, next) => {
  try {
    let { id } = req.params;
    const vote = await Vote.exists({ _id: id });
    if (!vote) {
      return res.status(404).json({
        status: false,
        message: 'vote does not exist',
      });
    }
    next();
  } catch (err) {
    serverError(res, err);
  }
};
