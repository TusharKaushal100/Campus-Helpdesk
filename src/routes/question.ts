import express from 'express';
import {Request,Response} from 'express';
import { auth } from '../middleware.js';
import { AuthRequest } from '../middleware.js';
import { AnswerModel, QuestionModel } from '../db.js';
import mongoose from 'mongoose';




export const questionRouter = express.Router();



const createQuestion = async (req:AuthRequest ,res:Response)=>{
    
    console.log("In create question handler");

    const {title,description,tags} = req.body;   // destructure as tags not as tag because in interface its tags

    if(!title || !description){
        return res.status(400).json({message:"Title and Description are required"});
    }   
  
    try{
          
        const newQuestion = await QuestionModel.create({
            title,
            description,
            tags,  // specifically use here tags because thats what the interface looks like
            userId: req.userid
        });
        
        return res.status(201).json({message:"Question created successfully",question:newQuestion});
    }
    catch(err){
        return res.status(500).json({message:"Error in creating question"});
    }
       
}

const listQuestions = async (req:Request,res:Response)=>{
           
    console.log("In list questions handler");
        try{

            const questions = await QuestionModel.find().populate('userId','username name');  // its neccesarry to use quotes because populate expects string paths

            return res.status(200).json({questions});
        }
        catch(err){
            return res.status(500).json({message:"Error in fetching questions"});
        }
}

const deleteQuestion = async (req:AuthRequest,res:Response)=>{
     
    console.log("In delete question handler");

    const questionId = req.params.questionId;
    const userId = req.userid

    if(!questionId){
        return res.status(400).json({message:"QuestionId is required"});
    }

    try{
          const question = await QuestionModel.findById(questionId);

          if(!question){
            return res.status(404).json({message:"Question not found"});
          }

            if(userId != question.userId.toString()){
                  return res.status(403).json({message:"Forbidden: You can only delete your own questions"});
            }

            await AnswerModel.deleteMany({questionId});  // manual cascade in mongodb
            await QuestionModel.findByIdAndDelete(questionId);

            return res.status(200).json({message:"Question and its answers deleted successfully"});
    }
    catch(err){
               return res.status(500).json({message:"Error in deleting question"});
    }

}

const editQuestion =async (req:AuthRequest,res:Response)=>{

      console.log("inside the edit question block")

      const questionId = req.params.questionId as string
      const userId = req.userid

      const question = await QuestionModel.findById(questionId);

      if(!question){
          return res.status(404).json({message:"NO question found"})
      }

      if(userId != question.userId.toString()){
            return res.status(403).json({message:"Forbidden: You can only edit your own questions"});
      }

      const {title,description,tags} = req.body;

      try{
           await QuestionModel.findByIdAndUpdate(questionId,{

                title : title || question.title,
                description : description || question.description,
                tags : tags || question.tags
           })


           return res.status(200).json({message:"Question updated successfully"});
      }
      catch(err){
            return res.status(500).json({message:"Error in updating question"});
      }
}

const listBoth = async (req:Request,res:Response)=>{
     
    console.log("inside the list both funstion")

    const questionId = req.params.questionId
     if (!questionId) return res.status(400).json({ message: "QuestionId is required" });


//      if (!mongoose.Types.ObjectId.isValid(questionId)) {
//          return res.status(400).json({ message: "Invalid questionId format" });
// }
   
    try{
    const question = await QuestionModel.findById(questionId).populate('userId','username name');
    
    


    
    

     // typecast the questionId to the ObjectId because the schema contains type objectid not string also .find also expects the object
    const answers = await AnswerModel.find({questionId:new mongoose.Types.ObjectId(questionId)}).populate('userId','username name').sort({createdAt : -1});

    return res.status(200).json({question,answers});
    }catch(err){
        return res.status(500).json({message:"Error in fetching question and answers"});
    }
}

//@ts-ignore
questionRouter.post('/ask',auth,createQuestion);
//@ts-ignore
questionRouter.get('/listQuestions',auth,listQuestions);
//@ts-ignore
questionRouter.delete('/:questionId',auth,deleteQuestion)
//@ts-ignore
questionRouter.put('/edit/:questionId',auth,editQuestion)
//@ts-ignore
questionRouter.get('/listAll/:questionId',listBoth)

