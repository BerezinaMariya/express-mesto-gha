const User = require('../models/user');

const ok = 200;
const created = 201;
const badRequest = 400;
const notFound = 404;
const internalServerError = 500;

module.exports.getUsers = (req, res) => {
  User.find({})
    .orFail(() => res.status(notFound).send({ message: 'Запрашиваемые пользователи не найдены' }))
    .then((users) => res.status(ok).send({ data: users }))
    .catch((err) => res.status(internalServerError).send({ message: `Произошла ошибка ${err.name}: ${err.message}` }));
};

module.exports.getUserId = (req, res) => {
  User.findById(req.params.userId)
    .orFail(() => res.status(notFound).send({ message: 'Запрашиваемый пользователь не найден' }))
    .then((user) => {
      if (user) {
        res.status(ok).send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(badRequest).send({ message: 'Передан невалидный id пользователя' });
      } else {
        res.status(internalServerError).send({ message: `Произошла ошибка ${err.name}: ${err.message}` });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.status(created).send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(badRequest).send({ message: 'Переданы невалидные данные для создания пользователя' });
      } else {
        res.status(internalServerError).send({ message: `Произошла ошибка ${err.name}: ${err.message}` });
      }
    });
};

module.exports.updateUserInfo = (req, res) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .orFail(() => res.status(notFound).send({ message: 'Запрашиваемый пользователь не найден' }))
    .then((user) => {
      if (user) {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(badRequest).send({ message: 'Переданы невалидные данные для обновления данных пользователя' });
      } else if (err.name === 'CastError') {
        res.status(badRequest).send({ message: 'Передан невалидный id пользователя' });
      } else {
        res.status(internalServerError).send({ message: `Произошла ошибка ${err.name}: ${err.message}` });
      }
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: false,
    },
  )
    .orFail(() => res.status(notFound).send({ message: 'Запрашиваемый пользователь не найден' }))
    .then((user) => {
      if (user) {
        res.send({ data: user });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(badRequest).send({ message: 'Переданы невалидные данные для обновления аватара пользователя' });
      } else if (err.name === 'CastError') {
        res.status(badRequest).send({ message: 'Передан невалидный id пользователя' });
      } else {
        res.status(internalServerError).send({ message: `Произошла ошибка ${err.name}: ${err.message}` });
      }
    });
};
