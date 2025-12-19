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

export interface Answer{
      content:string,
      questionId:mongoose.Types.ObjectId,
      userId:mongoose.Types.ObjectId   // because it is compile time so it only accepts types so you have to write fully 

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
     userId:{type:ObjectId,ref:'users',required:true} // it is a runtime so no need to write fully
     },
    { timestamps:true }
    );

const answerSchema = new Schema<Answer>({
      content:{type:String,required:true},
      questionId:{type:ObjectId,ref:'questions',required:true},
      userId:{type:ObjectId,ref:'users',required:true}
},
{timestamps:true})    

export const UserModel = model('users',userSchema)
export const QuestionModel = model<Question>('questions',questionSchema)
export const AnswerModel = model<Answer>('answers',answerSchema)