import express from 'express';
import {Request,Response} from 'express';
import { auth } from '../middleware.js';
import { AuthRequest } from '../middleware.js';
import { QuestionModel } from '../db.js';




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

//@ts-ignore
questionRouter.post('/ask',auth,createQuestion);
//@ts-ignore
questionRouter.get('/listQuestions',auth,listQuestions);