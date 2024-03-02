export const checkParamId = (req, res, next, val) => {
  if (parseInt(val) < 0) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
    return;
  }
  next();
};

export const checkReqBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
    return;
  }
  next();
};
