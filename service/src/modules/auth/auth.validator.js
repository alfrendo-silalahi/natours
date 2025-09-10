import Joi from 'joi';

const signInSchema = Joi.object({
  email: Joi.string().email().min(1).required().messages({
    'string.base': 'Email must be a string',
    'string.email': 'Invalid email format',
    'string.empty': 'Email cannot be empty',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(1).required().messages({
    'string.base': 'Password must be a string',
    'string.empty': 'Password cannot be empty',
    'any.required': 'Password is required',
  }),
});

export const signInValidator = (req, res, next) => {
  const { error } = signInSchema.validate(req.body, { abortEarly: false });
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
