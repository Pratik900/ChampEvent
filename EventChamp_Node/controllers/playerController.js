import { playerModel } from "../models/playerModel.js";

const playerController = async (req, res) => {
  try {
    const {
      gameType,
      firstPlayerName,
      secondPlayerName,
      age,
      aadhar,
      contact,
      instaId,
    } = req.body;
    const final_aadhar = aadhar.replace(/\s+/g, "");
    if (!gameType || !firstPlayerName || !age || !final_aadhar || !contact) {
      return res.status(500).send({
        success: false,
        message: "Please provide all fields",
      });
    }
    const existing = await playerModel.findOne({ aadhar: final_aadhar });
    console.log(existing);
    if (existing) {
      return res.status(500).send({
        success: false,
        message: "Aadhar No. already exists.",
      });
    }
    if (secondPlayerName && gameType === "Singles") {
      const player = await playerModel.create({
        gameType,
        firstPlayerName,
        age,
        aadhar: final_aadhar,
        contact,
        instaId,
      });
      res.status(200).send({
        success: true,
        message: "Successfully registered.",
      });
    } else {
      const player = await playerModel.create({
        gameType,
        firstPlayerName,
        secondPlayerName,
        age,
        aadhar: final_aadhar,
        contact,
        instaId,
      });
      res.status(200).send({
        success: true,
        message: "Successfully registered.",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Player API",
      error: error,
    });
  }
};

export { playerController };
