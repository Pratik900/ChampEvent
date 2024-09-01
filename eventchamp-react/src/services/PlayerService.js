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
