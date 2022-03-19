const serverError = (res: any, error: any) =>
  res.status(500).json({
    status: false,
    message: 'Internal Server Error',
    error_message: error.toString(),
  });

export default serverError;
