const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateRegister = (data = {}) => {
  const errors = [];

  if (!data.email || typeof data.email !== 'string' || !emailRegex.test(data.email.trim())) {
    errors.push('A valid email address is required');
  }

  if (!data.password || typeof data.password !== 'string' || data.password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }

  return errors;
};

const validateLogin = (data = {}) => {
  const errors = [];

  if (!data.email || typeof data.email !== 'string' || !emailRegex.test(data.email.trim())) {
    errors.push('A valid email address is required');
  }

  if (!data.password || typeof data.password !== 'string' || data.password.trim() === '') {
    errors.push('Password is required');
  }

  return errors;
};

module.exports = {
  validateRegister,
  validateLogin
};
