import JWT from "jsonwebtoken"
import bcrypt from "bcrypt"
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
    const isMatch=await bcrypt.compare("0",role)
    if (isMatch === false){
       return res.json({
        success:false,
        message:'access denied please login as Admin'
       })
    }
    next();
}

const isrefree =  async(req,res,next)=>{
    const {role} = req.cookies
    const isMatch=await bcrypt.compare("1",role)
    if (isMatch === false){
       return res.json({
        success:false,
        message:'access denied please login as Refree'
       })
    }
    next();
}

export {checkAccess,isAdmin}