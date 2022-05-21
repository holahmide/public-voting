import { RequestHandler } from 'express';

const authenticate: RequestHandler = async (req, res, next) => {
  const allowedOrigins: any = process.env.CORS_ORIGINS?.split(',');
  const host: any = req.get('host');
  if (host in allowedOrigins) {
    next();
  } else {
    return res.status(404).json({
      status: false,
      message: 'Couldn\'t proceed with the request. Invalid source!',
    });
  }
  console.log(host);
};

export default authenticate;
