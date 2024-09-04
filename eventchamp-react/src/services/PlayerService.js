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
  axios
    .get(
      `http://localhost:4900/playerslotting/${formData.gameType}/${formData.from}/${formData.to}`
    )
    .then((response) => {
      console.log(response.data);
    })
    .catch((err) => {
      alert(err.response.data.message);
    });
};
