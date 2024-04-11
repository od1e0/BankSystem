import mongoose from 'mongoose';

const CardSchema = new mongoose.Schema(
  {
    cardHolder: {
      type: String,
      required: true,
    },
    cardNumber: {
      type: String,
      required: true,
      unique: true,
    },
    validity: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
      default: 0,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Card', CardSchema);
