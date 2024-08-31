import mongoose from 'mongoose'
// design the schema

const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:[true,'username is required']
    },
    email:{
        type:String,
        required:[true,'email is required'],
        unique:true
    },
    password:{type:String,
    required:[true,'password is required'],
    },
    phone:{
        type:String,
        required:[true,'phone number is required'],
    },
    userType:{
        type:String,
        required:[false,'user type is required'],
        default: '2',
        enum:[  '0'/*admin*/,
                '1' /*referee*/,
                '2'/*user*/ 
        ]
    },
    profile:
    {
        type:String,
        default:'https://cdn-icons-png.flaticon.com/512/149/149071.png'
    },

},{timestamps:true})

// export {mongoose.model('User',userSchema) as userModel}
export const userModel = mongoose.model('User',userSchema)