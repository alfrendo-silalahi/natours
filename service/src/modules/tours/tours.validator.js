import Joi from 'joi';

const getAllToursSchema = Joi.object({
  sort: Joi.string().optional(),
}).unknown(true);

export const getAllToursValidator = (req, res, next) => {
  const { error } = getAllToursSchema.validate(req.query, {
    abortEarly: false,
  });
  if (error) {
    res.status(400).json({
      status: 400,
      message: 'Bad request',
      errors: error.details.map((detail) => detail.message),
    });
    return;
  }
  next();
};
