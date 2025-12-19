import express from 'express';
import {AuthRequest} from '../middleware.js';
import {Request,Response} from 'express';
import {auth} from '../middleware.js';
import { AnswerModel } from '../db.js'; 


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

       const answers = await AnswerModel.find({questionId}).populate('userId','username name');
       
       if(!answers || answers.length === 0){
            return res.status(404).json({message:"No answers found for this question"});
       }
       return res.status(200).json({answers});
    }
    catch(err){
        return res.status(500).json({message:"Error in fetching answers"}); 
    }
    
}

//@ts-ignore
answerRouter.post('/',auth,createAnswer);
//@ts-ignore
answerRouter.get('/listAnswers',auth,listAnswers);