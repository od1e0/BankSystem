import TransactionModel from '../models/Transaction.js';

export const getRecentTransactions = async (req, res) => {
  try {
    const transactions = await TransactionModel.find({
      fromCard: req.params.id,
    })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json(transactions);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить транзакции',
    });
  }
};

export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await TransactionModel.find({
      fromCard: req.params.id,
    });

    res.json(transactions);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось получить транзакции',
    });
  }
};

export const sendMoney = async (req, res) => {
  try {
    const transaction = new TransactionModel({
      amount: req.body.amount,
      fromCard: req.params.id,
      toCard: req.body.toCard,
    });

    await transaction.save();

    res.json(transaction);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: 'Не удалось отправить деньги',
    });
  }
};
