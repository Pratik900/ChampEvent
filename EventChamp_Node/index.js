import express, { response } from 'express'; 
import { connectDb } from './config/configDb.js';
import { authRoutes } from './routes/authRoutes.js';
import { playerRoutes } from './routes/playerRoutes.js';
import cookieParser from 'cookie-parser';

const app=express()
app.use(express.json())
app.use(cookieParser())
app.use("/",authRoutes)
app.use("/",playerRoutes)

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