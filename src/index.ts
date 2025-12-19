import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken'
import { UserModel } from './db.js';
import { userRouter } from './routes/user.js'; 
import { questionRouter } from './routes/question.js'; 
import {answerRouter} from './routes/answer.js';


const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

const PORT = process.env.Port || 5000;

app.get('/',(req,res)=>{
     res.send("Hello from Backend!")
})

app.use('/api/v1/auth',userRouter);
app.use('/api/v1/question',questionRouter);
app.use('/api/v1/answer',answerRouter);

const main = async()=>{ 
  
   try{ 
    const conn = await mongoose.connect(process.env.MONGO_URL as string);
    console.log('Connected to MongoDB');
   }
   catch(err){
      console.log("unable to connect to MongoDB ");
   }

   try{

        app.listen(PORT,()=>{
             console.log('Server is listining on port' + PORT);
        })
   }
    catch(err){
        console.log('unable to start the server');
    }

}

main()

// mongodb+srv://kartikkaushal666:<db_password>@cluster0.cob9fsn.mongodb.net/

// cXNcVLYp20v0mPw7
