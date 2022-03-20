import { RequestHandler } from 'express';
import { serverError } from '../../../utils';
import Vote from '../../../models/Session/Vote';
import Nominee from '../../../models/Session/Nominee';

export const createVote: RequestHandler = async (req: any, res) => {
  const { nominee } = req.body;
  const { user } = req;
  try {
    const createdVote = await Vote.create({
      ...req.body,
      user,
    });

    await Nominee.findByIdAndUpdate({ _id: nominee }, { $inc: { votes: 1 } });
    return res.status(201).json({
      status: true,
      data: {
        createdVote,
      },
    });
  } catch (err) {
    serverError(res, err);
  }
};

export const deleteVote: RequestHandler = async (req: any, res) => {
  const { id } = req.params;
  try {
    const findVote: any = await Vote.findOne({ _id: id }).populate('nominee');
    console.log(findVote);
    await Nominee.findByIdAndUpdate(
      { _id: findVote.nominee._id },
      { $inc: { votes: -1 } }
    );
    await Vote.deleteOne({ _id: id });
    return res.status(204).json({
      status: true,
      data: {
        message: 'Vote deleted',
      },
    });
  } catch (err) {
    serverError(res, err);
  }
};
