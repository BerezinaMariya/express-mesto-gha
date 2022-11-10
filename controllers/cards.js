const Card = require("../models/card");

module.exports.getCards = (req, res) => {
  Card.find({})
    .populate("owner")
    .then((cards) => res.status(201).send({ data: cards }))
    .catch((err) => res.status(500).send({ message: `Произошла ошибка ${err.name}: ${err.message}` }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  console.log(req.user._id);

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: "Переданы невалидные данные для создания карточки" });
      } else {
        res.status(500).send({ message: `Произошла ошибка ${err.name}: ${err.message}` });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => {
      if (card) {
        res.status(200).send({ message: "Пост удален" })
      } else {
        res.status(404).send({ message: "Карточка с таким id не найдена" });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: "Передан невалидный id карточки" });
      } else {
        res.status(500).send({ message: `Произошла ошибка ${err.name}: ${err.message}` });
      }
    });
};

module.exports.likeCard = (req, res) => {
  console.log(req.user._id);

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true }
  )
    .then((card) => {
      if (card) {
        res.status(200).send({ data: card });
      } else {
        res.status(404).send({ message: "Карточка с таким id не найдена" });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: "Переданы невалидные данные карточки" });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: "Передан невалидный id карточки" });
      } else {
        res.status(500).send({ message: `Произошла ошибка ${err.name}: ${err.message}` });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  console.log(req.user._id);

  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true }
  )
    .then((card) => {
      if (card) {
        res.status(200).send({ data: card });
      } else {
        res.status(404).send({ message: "Карточка с таким id не найдена" });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: "Переданы невалидные данные карточки" });
      } else if (err.name === 'CastError') {
        res.status(400).send({ message: "Передан невалидный id карточки" });
      } else {
        res.status(500).send({ message: `Произошла ошибка ${err.name}: ${err.message}` });
      }
    });
};
