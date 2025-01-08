const Joi = require("joi");

const validateSchema = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: 400,
        data: null,
        message: `Bad Request, Reason: ${error.details[0].message}`,
        error: null,
      });
    }
    next();
  };
};

// Validation schemas
const schemas = {
  signup: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),

  updatePassword: Joi.object({
    old_password: Joi.string().required(),
    new_password: Joi.string().min(6).required(),
  }),

  artist: Joi.object({
    name: Joi.string().required(),
    grammy: Joi.boolean().required(),
    hidden: Joi.boolean().required(),
  }),

  album: Joi.object({
    artist_id: Joi.string().required(),
    name: Joi.string().required(),
    year: Joi.number().integer().min(1900).max(new Date().getFullYear()),
    hidden: Joi.boolean().required(),
  }),

  track: Joi.object({
    artist_id: Joi.string().required(),
    album_id: Joi.string().required(),
    name: Joi.string().required(),
    duration: Joi.number().integer().min(1),
    hidden: Joi.boolean().required(),
  }),

  favorite: Joi.object({
    category: Joi.string().valid("artist", "album", "track").required(),
    item_id: Joi.string().required(),
  }),
};

module.exports = { validateSchema, schemas };
