import express from 'express';
import {Request, Response} from 'express';
import {check, z} from 'zod';
import bcrypt from 'bcryptjs';
import {UserModel} from '../db.js';
import jwt from 'jsonwebtoken';
import {Secret} from '../config.js';

export const userRouter = express.Router();

const handleSignup =async  (req:Request,res:Response)=>{
    
    const {username,name,email,password,role} = req.body;

    if(!username || !name || !email || !password){
        return res.status(400).json({message:"All fields are required"});
    }

    const requiredFormat = z.object({
        username:z.string().min(3).max(15),
        name:z.string().max(20),
        email:z.string().email(),
        password:z.string().min(6).max(15),
        role:z.enum(['student','faculty','ta']).optional()
        
    })

    const parseResult = requiredFormat.safeParse({username,name,email,password,role});

    if(!parseResult.success){
        return res.status(400).json({message:"Invalid input"});
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const checkUser = await UserModel.findOne({username:username});

    if(checkUser){
        return res.status(400).json({message:"Username already exists"});
    }

    try{
      

       const newUser = await UserModel.create({username,
                                       name, 
                                      email,
                                      password:hashedPassword,
                                      role})

       return res.json({message:"user created succesfully"});


       }catch(err){
            return res.status(500).json({"message":"Error in registring the user"});
       }



}

const handleLogin = async (req:Request,res:Response)=>{
    
    const {username,password} = req.body;

    if(!username || !password){
        return res.status(400).json({message:"All fields are required"});
    }
    
    const findUser = await UserModel.findOne({username:username});

    if(!findUser){
        return res.status(400).json({message:"user doesnt exist"});
    }

    const isPasswordValid = await bcrypt.compare(password,findUser.password);

    if(!isPasswordValid){
        return res.status(400).json({message:"Invalid credentials"});
    }

    const token = jwt.sign({id:findUser._id},Secret);

    return res.json({token:token,MessageChat:"Login successful"});
}


userRouter.get('/signup',handleSignup);
userRouter.get("/login",handleLogin);

