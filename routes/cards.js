const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get(
  '/',
  celebrate({
    headers: Joi.object({
      cookie: Joi.string().required().regex(/jwt=[\w.]/),
    }).unknown(true),
  }),
  getCards,
);

router.post(
  '/',
  celebrate({
    headers: Joi.object({
      cookie: Joi.string().required().regex(/jwt=[\w.]/),
    }).unknown(true),
    body: Joi.object().keys({
      name: Joi.string().required(),
      link: Joi.string().required().regex(/^(http|https):\/\/[w{3}.]?[\w-._~:/?#[\]@!$&'()*+,;=]#?/),
    }).unknown(true),
  }),
  createCard,
);

router.delete(
  '/:cardId',
  celebrate({
    headers: Joi.object({
      cookie: Joi.string().required().regex(/jwt=[\w.]/),
    }).unknown(true),
    params: Joi.object({
      cardId: Joi.string().required().length(24),
    }).unknown(true),
  }),
  deleteCard,
);

router.put(
  '/:cardId/likes',
  celebrate({
    headers: Joi.object({
      cookie: Joi.string().required().regex(/jwt=[\w.]/),
    }).unknown(true),
    params: Joi.object({
      cardId: Joi.string().required().length(24),
    }).unknown(true),
  }),
  likeCard,
);

router.delete(
  '/:cardId/likes',
  celebrate({
    headers: Joi.object({
      cookie: Joi.string().required().regex(/jwt=[\w.]/),
    }).unknown(true),
    params: Joi.object({
      cardId: Joi.string().required().length(24),
    }).unknown(true),
  }),
  dislikeCard,
);

module.exports = router;
