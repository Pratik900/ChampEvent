import mongoose from "mongoose";

const singlesSchema = new mongoose.Schema({
  gameType: {
    type: String,
    required: [true, "please select required"],
  },
  firstPlayerName: {
    type: String,
    required: [true, "first name is required"],
  },
  age: {
    type: Number,
    required: [true, "age is required"],
  },
  contact: {
    type: String,
    required: [true, "phone number is required"],
  },
  aadhar: {
    type: String,
    required: [false, "aadhar is required"],
    unique: true,
  },
  instaId: {
    type: String,
  },
  entryDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: 1,
    enum: [0, 1],
  },
  matchNumber: {
    type: Number,
    required: [true, "matchNumber is required"],
    default:0
  },
  // name,contact,age,insta_id
});

export const singlesPlayerModel = mongoose.model(
  "SinglesPlayer",
  singlesSchema
);
