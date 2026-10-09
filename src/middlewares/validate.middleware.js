const ApiError = require('../utils/apiError');

const validate = (validatorFn) => {
  return (req, res, next) => {
    const errors = validatorFn(req.body);
    if (errors && errors.length > 0) {
      return next(new ApiError(400, errors.join(', ')));
    }
    next();
  };
};

module.exports = validate;
