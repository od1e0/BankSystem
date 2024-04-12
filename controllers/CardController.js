import CardModel from '../models/Card.js';

export const createCard = async (req, res) => {
  try {
    const genCardNumber = Math.floor(Math.random(0, 10) * 10000000000000000);

    const validity = new Date();
    validity.setFullYear(validity.getFullYear() + 3);

    const doc = new CardModel({
      cardHolder: req.body.fullName,
      cardNumber: genCardNumber,
      validity: validity,
      balance: 0,
      user: req.userId,
    });

    const card = await doc.save();

    res.json(card);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось создать карту',
    });
  }
};

export const getCardByUserId = async (req, res) => {
  try {
    const card = await CardModel.findOne({ user: req.params.id });

    if (!card) {
      return res.status(404).json({
        message: 'Карта не найдена',
      });
    }

    res.json(card);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить информацию о карте',
    });
  }
};

export const updateCardByUserId = async (req, res) => {
  try {
    const genCardNumber = Math.floor(Math.random(0, 10) * 10000000000000000);

    const validity = new Date();
    validity.setFullYear(validity.getFullYear() + 3);

    const card = await CardModel.findOneAndUpdate(
      { user: req.params.id },
      {
        ...req.body,
        cardNumber: genCardNumber,
        validity: validity,
      },
      {
        new: true,
      }
    );

    if (!card) {
      return res.status(404).json({
        message: 'Карта не найдена',
      });
    }

    res.json(card);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось обновить информацию о карте',
    });
  }
};

export const deleteCardByUserId = async (req, res) => {
  try {
    const card = await CardModel.findOneAndDelete({ user: req.params.id });

    if (!card) {
      return res.status(404).json({
        message: 'Карта не найдена',
      });
    }

    res.json({ message: 'Карта успешно удалена' });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось удалить карту',
    });
  }
};
