import mongoose from "mongoose";


const {model,Schema} = mongoose;
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new Schema({
    username:{type:String,required:true,unique:true},
    name :{type:String,required:true},
    password:{type:String,required:true},
    email:{type:String,required:true,unique:true,lowercase:true},
    role:{type:String,enum:['student','faculty','ta'],default:'student'}

    },
    {timestamps:true}
)

export const UserModel = model('users',userSchema)