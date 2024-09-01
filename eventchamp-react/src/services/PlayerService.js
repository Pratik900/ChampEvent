import axios from "axios";


export const PlayerService =async (formData) => {
    try{
        const response=await axios.post("http://localhost:4900/entryform",formData)
        return response.data
    }catch(error){
        console.log(error)
    }
};
