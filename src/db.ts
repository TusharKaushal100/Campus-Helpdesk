import mongoose from "mongoose";
import { describe } from "zod/v4/core";


const {model,Schema} = mongoose;
const ObjectId = mongoose.Types.ObjectId;


export interface Question{
      title:string,
      description:string,
      tags?:[string],
      userId: mongoose.Types.ObjectId | string

}


const userSchema = new Schema({
    username:{type:String,required:true,unique:true},
    name :{type:String,required:true},
    password:{type:String,required:true},
    email:{type:String,required:true,unique:true,lowercase:true},
    role:{type:String,enum:['student','faculty','ta'],default:'student'}

    },
    {timestamps:true}
)

const questionSchema = new Schema<Question>({
     title:{type:String,required:true},
     description:{type:String,required:true},
     tags:[{type:String}],
     userId:{type:ObjectId,ref:'users',required:true}
     },
    { timestamps:true }
    );

export const UserModel = model('users',userSchema)
export const QuestionModel = model<Question>('questions',questionSchema)