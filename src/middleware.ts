import express from 'express';
import {Request, Response,NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import {Secret} from './config.js';


export interface AuthRequest extends Request{
     userid?:string
}

interface jwtPayload{
     id:string
}

const auth = (req:AuthRequest,res:Response,next:NextFunction)=>{
   
    const token = req.headers.authorisation;

    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }

    const decoded = jwt.verify(token as string,Secret) as jwtPayload;

    if(!decoded){
          return res.status(401).json({message:"Unauthorized"});
    }

    try{
              req.userid = decoded.id;
              next();
    }
    catch(err){
            return res.status(401).json({message:"Unauthorized"});
    }

}