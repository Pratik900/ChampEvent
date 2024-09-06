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

export const PlayerSlottingService = async (formData,from,to) => {
  try{
      const response = await axios.get(
        `http://localhost:4900/playerslotting/${formData.gameType}/${from}/${to}`
      )
      if (response.status === 204)
        return response;
      else
        return response.data
  }
    catch(err)  {
      // console.log(err)
      throw err
    };
};

        // axios.get(`http://localhost:4900/playerslotting/${formData.gameType}/${finalFromDate}/${finalToDate}`).then(async response=>{
        //     // console.log(response.data)
        //     await sleep(2000)
        //     setFormData({...formData,'players':response.data.player})
        // }).catch(err=>{
        //     // console.log(err.response.status)
        //     if (err.response.status===404) 
        //         alert(err.response.data.message)})
