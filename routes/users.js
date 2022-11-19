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
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }).unknown(true),
  }),
  updateUserInfo,
);

router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().regex(/^(http|https):\/\/[w{3}.]?[\w-._~:/?#[\]@!$&'()*+,;=]#?/),
    }).unknown(true),
  }),
  updateUserAvatar,
);

module.exports = router;
