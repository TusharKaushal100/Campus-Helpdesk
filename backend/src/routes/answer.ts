import express from 'express';
import {AuthRequest} from '../middleware.js';
import {Request,Response} from 'express';
import {auth} from '../middleware.js';
import { AnswerModel } from '../db.js'; 
import mongoose from 'mongoose';


export const answerRouter = express.Router();

interface questionIdQuery{
    questionId:string
}


const createAnswer = async (req:AuthRequest,res:Response)=>{

    console.log("In create answer handler");

    const {content,questionId} = req.body;

    const userId = req.userid;
    if(!content || !questionId){
        return res.status(400).json({message:"Content and QuestionId are required"});
    }
    try{
            const answer = await AnswerModel.create({
                content,
                questionId,
                userId
            })

            return res.status(201).json({message:"Answer created successfully",answer});
    }
    catch(err){
            return res.status(500).json({message:"Error in creating answer"});
    }

}

const listAnswers = async (req:AuthRequest,res:Response)=>{

    console.log("In list answers handler");
    // dont send anything in the body in get requests use query or params
    //requests like => http://localhost:5000/api/v1/answer/listAnswers?questionId=69445255c5dfed895883f85a
    const questionId = req.query.questionId as string;  //destructure questionId from query parameters {} isnt required because its not a object

    if(!questionId){
        return res.status(400).json({message:"QuestionId is required"});
    }

    try{

       const answers = await AnswerModel.find({questionId}).sort({createdAt:-1}).populate('userId','username name'); // -1 newer first +1 older first
       
       if(!answers || answers.length === 0){
            return res.status(404).json({message:"No answers found for this question"});
       }
       return res.status(200).json({answers});
    }
    catch(err){
        return res.status(500).json({message:"Error in fetching answers"}); 
    }
    
}

const deleteAnswer = async (req:AuthRequest,res:Response)=>{

    console.log("In delete answer handler");

    const answerId = req.params.answerId;
    //   or
    //  const {answerId} = req.params;

    if(!answerId){
        return res.status(400).json({message:"AnswerId is required"});
    }

    const answer = await AnswerModel.findById(answerId);  // not find one so no object style notation {}

    if(!answer){
        return res.status(404).json({message:"Answer not found"});
    }


    const userId = req.userid;

    if(answer.userId.toString() !== userId){

        return res.status(403).json({message:"Forbidden: You can only delete your own answers"});
    }

    try{
        await AnswerModel.findByIdAndDelete(answerId);
        return res.status(200).json({message:"Answer deleted successfully"});
    }
    catch(err){
        return res.status(500).json({message:"Error in deleting answer"});
    }
    
}

const editAnswer = async (req:AuthRequest,res:Response)=>{
   
    console.log("inside edit answer");

    const answerId = req.params.answerId;   
    const userId = req.userid;

   
    
    if(!answerId){
          return res.status(403).json({message:"please provide the answerId to be deleted"})
    }
    try{
              const answer = await AnswerModel.findById(answerId)
               const {content} = req.body; 

                if(!answer){    
                    return res.status(404).json({message:"No answer found"});
                }

                if(userId != answer.userId.toString()){
                        return res.status(403).json({message:"Forbidden: You can only edit your own answers"});
                }

                await AnswerModel.findByIdAndUpdate(answerId,{
                        content : content || answer.content
                })

                return res.status(200).json({message:"Answer updated successfully"});
    }
    catch(err){

        return res.status(500).json({message:"Error in editing answer"});

    }

}

const upvoteAnswer = async (req:AuthRequest,res:Response)=>{
    
    console.log("inside the upvote answers")

    const userId = req.userid
    const answerId = req.params.answerId 
try{
    const answer = await AnswerModel.findById(answerId)
    
    if(!answer){
           return res.status(403).json({message:"the answer doesnt exist"});
    }
    if(userId != answer.userId.toString()){
             return res.status(403).json({message:"Forbidden: You can only vote on others' answers"});
    }
    

    const upvoted = answer.upvote.some((id)=>id.toString() === userId)

    if(upvoted){

        answer.upvote = answer.upvote.filter((id)=>id.toString() != userId) // because id saved in upvotes array is of types objectId soo convert i to string 
        
    }
    else{
        answer.upvote.push(new mongoose.Types.ObjectId(userId))

    }

    await answer.save(); // this line make actual changes to the database

    return res.status(200).json({message:upvoted?"upvote removed":"upvote added",
        upvoteCount:answer.upvote.length
    });
}
catch(err){
      return res.status(403).json({message:"error in upvoting"})
}

}

//@ts-ignore
answerRouter.post('/',auth,createAnswer);
//@ts-ignore
answerRouter.get('/listAnswers',auth,listAnswers);
//@ts-ignore
answerRouter.delete('/:answerId',auth,deleteAnswer);
//@ts-ignore 
answerRouter.put('/edit/:answerId',auth,editAnswer)
//@ts-ignore
answerRouter.post('/:answerId/vote',auth,upvoteAnswer)
