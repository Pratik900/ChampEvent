import { playerModel } from "../models/playerModel.js";
import { singlesPlayerModel } from "../models/singlesModel.js";

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
    if (player.length === 0) {
      return res.status(204).send({
        success: false,
        message: "No player found",
      });
    }
    // conditionally call the slotting controller defined below this method
    createSinglesSlottings(player)
    res.status(200).send({
      success: true,
      message: "Player found",
      player
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

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap
  }
  // return array;
}


function pairPlayers(playerList) {
  // If odd number of players, add a "BYE"
  const pairs = [];
  if (playerList.length % 2 !== 0) {
    // playerList.push("BYE");
    pairs.push([playerList[playerList.length-1]])
    for (let i = 0; i < playerList.length-1; i += 2) {
      pairs.push({'playerone':[playerList[i],1], 'playertwo':[playerList[i + 1],1]});
    }
  }
  else{
    for (let i = 0; i < playerList.length; i += 2) {
      pairs.push([playerList[i], playerList[i + 1]]);
    }
  }
  return pairs;
}

function getMatchNumbers(players){
  let player = JSON.parse(JSON.stringify(players));
  var matchNumber = 1;
  // for odd players
  if(player.length%2!==0){
  for (let i = 0; i < player.length-1; i+=2) {
    player[i].matchNumber = matchNumber
    player[i+1].matchNumber = matchNumber
    matchNumber += 1
  }
  // player[player.length-1].matchNumber=0
}
// for even players
else{
    for (let i = 0; i < player.length; i+=2) {
      player[i].matchNumber = matchNumber
      player[i+1].matchNumber = matchNumber
      matchNumber += 1
    }

  }
  console.log(player)
  return player
}

const createSinglesSlottings = async (player) => {
  try {
    // logic to create singles slottings
    // console.log("Creating singles slottings for player:", player);
    shuffleArray(player)
    // const pairs=pairPlayers(player)
    // console.log("Pairs:", pairs);
    await singlesPlayerModel.deleteMany({})
    const players=getMatchNumbers(player)
    // console.log(players)
    await singlesPlayerModel.insertMany(players)
    // console.log(pairs)
  } catch (error) {
    console.log(error);
  }
};

const getSinglesSlottingsController = async (req,res) => {
  try{
    const data=await singlesPlayerModel.find({})
    return res.status(200).send({result:data})
  }
  catch(error){
    console.log(error)
    return res.status(500).send({error:error})
  }
}

export { playerSlottingController,getSinglesSlottingsController };
