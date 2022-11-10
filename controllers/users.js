const User = require("../models/user");

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send({ data: users }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err.name}: ${err.message}` }));
};

module.exports.getUserId = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.status(200).send({ data: user })
      } else {
        res.status(404).send({ message: "Пользователь с таким id не найден" });
        return;
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: "Передан невалидный id пользователя" });
        return;
      } else {
        res.status(500).send({ message: `Произошла ошибка ${err.name}: ${err.message}` });
        return;
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: "Переданы невалидные данные для создания пользователя" });
        return;
      } else {
        res.status(500).send({ message: `Произошла ошибка ${err.name}: ${err.message}` });
        return;
      }
    });
};

module.exports.updateUserInfo = (req, res) => {
  console.log(req.user._id);
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
    .then((user) => {
      if (user) {
        res.send({ data: user })
      } else {
        res.status(404).send({ message: "Пользователь с таким id не найден" });
        return;
      }
    })
    .catch((err) => {
      console.log(err);
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: "Переданы невалидные данные для обновления данных пользователя" });
        return;
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: "Передан невалидный id пользователя" });
        return;
      } else {
        res.status(500).send({ message: `Произошла ошибка ${err.name}: ${err.message}` });
        return;
      }
    });
};

module.exports.updateUserAvatar = (req, res) => {
  console.log(req.user._id);
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
    .then((user) => {
      if (user) {
        res.send({ data: user })
      } else {
        res.status(404).send({ message: "Пользователь с таким id не найден" });
        return;
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: "Переданы невалидные данные для обновления аватара пользователя" });
        return;
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: "Передан невалидный id пользователя" });
        return;
      } else {
        res.status(500).send({ message: `Произошла ошибка ${err.name}: ${err.message}` });
        return;
      }
    });
};
