import { RequestHandler } from 'express';
import Session from '../../../models/Session';
import Nominee from '../../../models/Session/Nominee';
import Vote from '../../../models/Session/Vote';
import { serverError } from '../../../utils';

export const verifyCreateVote: RequestHandler = async (req: any, res, next) => {
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
    const findNominee: any = await Nominee.findOne({ _id: nominee }).populate(
      'category'
    );
    req.body.category = findNominee.category._id;
    const checkIfUserHasVotedForCategory = await Vote.exists({
      category: findNominee.category._id,
      user,
    });
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

export const verifyVoteTiming: RequestHandler = async (req: any, res, next) => {
  try {
    let { nominee } = req.body;
    const findNominee: any = await Nominee.findOne({ _id: nominee }).populate(
      'category'
    );

    const findSession = await Session.findOne({
      _id: findNominee.category.session,
    });

    const date = new Date();

    const start = new Date(findSession.startDate);
    const end = new Date(findSession.endDate);

    if (!findSession.isActive) {
      return res.status(404).json({
        status: false,
        message: `⛔️ Voting is not active`,
      });
    }

    if (date > start && date < end) {
      next();
    } else {
      return res.status(404).json({
        status: false,
        message: `⛔️ Time is out of bound`,
      });
    }
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
