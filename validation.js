const Joy = require("joi");

const resgisterValidation = (data) => {
  const schema = Joy.object({
    name: Joy.string().min(6).required(),
    email: Joy.string().min(6).required().email(),
    password: Joy.string().min(6).required(),
  });

  return schema.validate(data);
};

const loginValidation = (data) => {
  const schema = Joy.object({
    email: Joy.string().min(6).required().email(),
    password: Joy.string().min(6).required(),
  });

  return schema.validate(data);
};

module.exports = {
  resgisterValidation,
  loginValidation
};
