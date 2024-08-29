// const userModel = require("../models/userModel")
import bcrypt from "bcrypt"
import JWT from "jsonwebtoken"
import config from "../assert/config.json" assert { type: "json" };
import { userModel } from "../models/userModel.js"

// REGISTER

const registerController=async(req,res)=>{
    try{
        const {userName,email,password,phone}=req.body
        // validation
        if(!userName||!email||!password||!phone){
            return res.status(500).send({
                success:false,
                message:'Please provide all fields'
            })
        }

        // check existing user
        const existing=await userModel.findOne({email:email})
        if(existing){
            return res.status(500).send({
                success:false,
                message:'Email already registered. Please login.'
            })
        }

        // hashing password
        var salt=bcrypt.genSaltSync(config.HASH_SALT)
        const hashedPassword=await bcrypt.hash(password,salt)
        // create new user
        const user=await userModel.create({userName,email,password:hashedPassword,phone})
        res.status(200).send({
            success:true,
            message:'Successfully registered.'
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send(
            {
                success:false,
                message:'Error in REGISTER API',
                error:error
            }
        )
    }
}

// LOGIN
const loginController=async(req,res)=>{
    try{
        const {email,password}=req.body

        // validation
        if(!email||!password){
            return res.status(500).send({
                success:false,
                message:'Please provide email/password'
            })
        }

        // check user
        const user=await userModel.findOne({email:email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'User not found.'
            })
        }

        // check password
        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(500).send({
                success:false,
                message:'Invalid credentials'
            })
        }

        // hide the password
        user.password="hidden for security reasons"

        // generate jwt
        const token=JWT.sign({id:user._id},config.JWT_SECRET,{expiresIn:"7d"})

        // Login user
        res.status(200).send({
            success:true,
            message:'Login successful',
            token,
            user,
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in LOGIN API',
            error:error
        })
    }
}

export {registerController,loginController}