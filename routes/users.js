const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  getСurrentUser,
  getUserId,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

router.get(
  '/',
  celebrate({
    headers: Joi.object({
      cookie: Joi.string().required().regex(/jwt=[\w.]/),
    }).unknown(true),
  }),
  getUsers,
);

router.get(
  '/me',
  celebrate({
    headers: Joi.object({
      cookie: Joi.string().required().regex(/jwt=[\w.]/),
    }).unknown(true),
  }),
  getСurrentUser,
);

router.get(
  '/:userId',
  celebrate({
    headers: Joi.object({
      cookie: Joi.string().required().regex(/jwt=[\w.]/),
    }).unknown(true),
    params: Joi.object({
      userId: Joi.string().required().length(24),
    }).unknown(true),
  }),
  getUserId,
);

router.patch(
  '/me',
  celebrate({
    headers: Joi.object({
      cookie: Joi.string().required().regex(/jwt=[\w.]/),
    }).unknown(true),
    body: Joi.object().keys({
      name: Joi.string().required(),
      about: Joi.string().required(),
    }).unknown(true),
  }),
  updateUserInfo,
);

router.patch(
  '/me/avatar',
  celebrate({
    headers: Joi.object({
      cookie: Joi.string().required().regex(/jwt=[\w.]/),
    }).unknown(true),
    body: Joi.object().keys({
      avatar: Joi.string().required().regex(/^(http|https):\/\/[w{3}.]?[\w-._~:/?#[\]@!$&'()*+,;=]#?/),
    }).unknown(true),
  }),
  updateUserAvatar,
);

module.exports = router;
