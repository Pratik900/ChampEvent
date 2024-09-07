import axios from "axios";

export const PlayerService = async (formData) => {
  axios
    .post("http://localhost:4900/entryform", formData)
    .then((response) => {
      console.log(response.data);
      alert(response.data.message);
    })
    .catch((err) => {
      alert(err.response.data.message);
    });
};


export const PlayerSlottingService = async (formData) => {
  const finalFromDate = new Date(formData.from);
  finalFromDate.setHours(0, 0, 0);
  const finalToDate = new Date(formData.to);
  finalToDate.setHours(23, 59, 59);
  try{
    const response=await axios
      .get(
        `http://localhost:4900/playerslotting/${formData.gameType}/${finalFromDate}/${finalToDate}`
      )
      return response
  }
  catch(err){
    throw err;
  }
};
