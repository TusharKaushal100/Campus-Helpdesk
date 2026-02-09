import express from 'express';
import {Request, Response} from 'express';
import {check, z} from 'zod';
import bcrypt from 'bcryptjs';
import {UserModel} from '../db.js';
import jwt from 'jsonwebtoken';
import {Secret} from '../config.js';

export const userRouter = express.Router();

const handleSignup =async  (req:Request,res:Response)=>{

    console.log("inside the Signup backend")
    
    const {username,name,email,password,role} = req.body;

    console.log("BODY:", req.body);

    if(!username || !name || !email || !password){
        console.log("didnt got the input")
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
        console.log("zod error occured")

        const fieldErrors = parseResult.error.flatten().fieldErrors
        return res.status(400).json({message:"Invalid input",
               errors:fieldErrors
        });
    }
     console.log("zod success")
    const hashedPassword = await bcrypt.hash(password,10);

    const checkUser = await UserModel.findOne({username:username});
     const checkEmail = await UserModel.findOne({email:email});

    if(checkUser){
        console.log("checking duplicate")
        return res.status(400).json({message:"Username already exists"});
    }
     if(checkEmail){
        console.log("checking duplicate email")
        return res.status(400).json({message:"Email already exists"});
    }

    try{
      
      console.log("creating user")
       const newUser = await UserModel.create({username,
                                       name, 
                                      email,
                                      password:hashedPassword,
                                      role})

       return res.json({message:"user created succesfully"});


       }catch(err:any){
        console.log("error in creating the user")
         console.error("Mongo create error:", err);
            return res.status(500).json({"message":"Error in registring the user"});
       }



}

const handleLogin = async (req:Request,res:Response)=>{
    
    console.log("inside the Login backend")
    const {username,password} = req.body;

    if(!username || !password){
        console.log("refs not working properly use forward ref for ref passing to custom components")
        return res.status(400).json({message:"All fields are required"});
    }
    
    const findUser = await UserModel.findOne({username:username});

    if(!findUser){
        console.log("didnt found the user")
        return res.status(400).json({message:"user doesnt exist"});
    }

    const isPasswordValid = await bcrypt.compare(password,findUser.password);

    if(!isPasswordValid){
        return res.status(400).json({message:"Invalid Password"});
    }

    const token = jwt.sign({id:findUser._id},Secret);

    return res.json({token:token,MessageChat:"Login successful"});
}


userRouter.post('/signup',handleSignup);
userRouter.post("/login",handleLogin);

