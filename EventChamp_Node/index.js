import express, { response } from 'express'; 
import mongoose from 'mongoose';

const app=express();
app.use(express.json());

const connectDb = async()=>{
    try{
        await mongoose.connect('mongodb://127.0.0.1/EventChamp',); 
        console.log("connected to database...!");
    } catch(error){
        console.log("Error db not connected");
    }
}

app.get("/",async(request,response)=>{
    try{
        response.send({message :"Hello..!"});
    }
    catch(error){
      response.send({message: "Oops! Something went wrong..."});
    }
});

app.listen(4900,()=>{
    console.log('Server is running on port 4900');
    connectDb();
});