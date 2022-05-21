import { RequestHandler } from 'express';

const validateRequestDomain: RequestHandler = async (req, res, next) => {
  const allowedOrigins: any = process.env.CORS_ORIGINS?.split(',');
  const host: any = req.get('origin');

  // Check if host is allowed and app is not in development mode.
  if (allowedOrigins.includes(host) || process.env.NODE_ENV === 'development') {
    next();
  } else {
    return res.status(404).json({
      status: false,
      message: 'Couldn\'t proceed with the request. Invalid source!',
    });
  }
};

export default validateRequestDomain;
