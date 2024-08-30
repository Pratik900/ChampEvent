import mongoose from "mongoose";

const playerSchema=new mongoose.Schema({
    gameType:{
        type:String,
        required:[true,'please select required']
    },
    firstPlayerName:{
        type:String,
        required:[true,'first name is required']
    },
    secondPlayerName:{
        type:String,
        // required:[true,'second name is required']
    },
    age:{
        type:Number,
        required:[true,'age is required']
    },
    aadhar:{
        type:Number,
        required:[false,'aadhar is required'],
        default:98287289171
    },
    instaId:{
        type:String,
    },
    entryDate:{
        type:Date,
        default:Date.now
    }
// name,contact,age,insta_id
})

export const playerModel = mongoose.model('Player',playerSchema)