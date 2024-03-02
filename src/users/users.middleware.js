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
