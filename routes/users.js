const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  getСurrentUser,
  getUserId,
  updateUserInfo,
  updateUserAvatar,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getСurrentUser);

router.get(
  '/:userId',
  celebrate({
    params: Joi.object({
      userId: Joi.string().required().length(24),
    }).unknown(true),
  }),
  getUserId,
);

router.patch(
  '/me',
  celebrate({
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
    body: Joi.object().keys({
      avatar: Joi.string().required().regex(/^(http|https):\/\/[w{3}.]?[\w-._~:/?#[\]@!$&'()*+,;=]#?/),
    }).unknown(true),
  }),
  updateUserAvatar,
);

module.exports = router;
