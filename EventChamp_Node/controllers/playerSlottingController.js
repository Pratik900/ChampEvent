import { playerModel } from "../models/playerModel.js";

const playerSlottingController = async (req, res) => {
  try {
    console.log(req.params);
    const { gameType, to, from } = req.params;
    const toDate = new Date(to);
    const fromDate = new Date(from);
    console.log(fromDate);
    console.log(toDate);
    const player = await playerModel.find({
      gameType: gameType,
      entryDate: { $gte: fromDate, $lte: toDate },
    });
    if (player.length===0) {
      return res.status(204).send({
        success: false,
        message: "No player found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Player found",
      player,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Player Slotting API",
      error: error,
    });
  }
};

export { playerSlottingController };
