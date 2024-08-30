// const JWT=require('jsonwebtoken')
import JWT from "jsonwebtoken"
import config from "../asset/config.json" assert { type: "json" };


const checkAccess=async(req,res,next)=>{
    try{
        // get token from req body
        const {token}=req.cookies
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

const isAdmin =  async(req,res,next)=>{
    const {role} = req.cookies
    if (role != 0){
       return res.json({
        success:false,
        message:'access denied please login as admin'
       })
    }
    next();
}

export {checkAccess,isAdmin}