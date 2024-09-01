import {playerModel} from '../models/playerModel.js'

const playerController = async(req,res)=>{
    try{
        const{gameType,firstPlayerName,secondPlayerName,age,aadhar,contact,instaId} =req.body
        console.log(gameType)
        console.log(firstPlayerName)
        console.log(secondPlayerName)
        console.log(age)
        console.log(aadhar)
        console.log(contact)
        console.log(instaId)
        if(!gameType||!firstPlayerName||!age||!aadhar||!contact)
        {
            return res.status(500).send({
                success:false,
                message:'Please provide all fields'
            })
        }
        const existing=await playerModel.findOne({aadhar:aadhar})
        if(existing){
            return res.status(500).send({
                success:false,
                message:'aadhar no is already exist.'
            })
        }
        if(!secondPlayerName)
        {
            const player=await playerModel.create({gameType,firstPlayerName,age,aadhar,contact,instaId})
            res.status(200).send({
                success:true,
                message:'Successfully registered.'
            })
        }
        else
        {
            const player=await playerModel.create({gameType,firstPlayerName,secondPlayerName,age,aadhar,contact,instaId})
            res.status(200).send({
                success:true,
                message:'Successfully registered.'
            })
        }
    }
    catch(error){
        console.log(error)
        res.status(500).send(
            {
                success:false,
                message:'Error in Player API',
                error:error
            }
        )
    }
}

export {playerController}