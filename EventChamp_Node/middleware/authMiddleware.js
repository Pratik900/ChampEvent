// const JWT=require('jsonwebtoken')
import {JWT} from "jsonwebtoken"
import config from "../config.json" assert { type: "json" };


const checkAccess=async(req,res,next)=>{
    try{
        // get token from req body
        const token=req.headers['authorization'].split(" ")[1]
        await JWT.verify(token,config.JWT_SECRET,(err,decode)=>{
            if(err)
            {
                return res.status(401).send({
                    success:false,
                    message:'unauthorized user'
                })
            }
            else{
                req.body.id=decode.id;
                next()
            }
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Please provide valid JWT',
            error
        })
    }
}