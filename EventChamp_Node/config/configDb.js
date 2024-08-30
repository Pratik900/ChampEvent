import mongoose from "mongoose";
import config from "../asset/config.json" assert { type: "json" };


const connectDb = async()=>{
    try{
        await mongoose.connect(config.MONGO_URL,);
        console.log("connected to database...!");
    } catch(error){
        console.log("Error db not connected");
    }
}

// export const ConnectDB = connectDb; 
export {connectDb}