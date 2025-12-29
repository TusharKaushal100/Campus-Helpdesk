import { useRef } from "react";
import axios from "axios";
import { Input } from "../components/input";
import { Button } from "../components/button";
import { useNavigate } from "react-router-dom";

export const Signup = () => {

   const userNameRef = useRef<HTMLInputElement>(null)
   const nameRef = useRef<HTMLInputElement>(null)
   const emailRef = useRef<HTMLInputElement>(null)
   const passwordRef = useRef<HTMLInputElement>(null)
   const roleRef = useRef<HTMLInputElement>(null)

   const handleSignup = async ()=>{
    const username = userNameRef.current?.value
    const name = nameRef.current?.value
    const email = emailRef.current?.value
    const password = passwordRef.current?.value
    const role = roleRef.current?.value

    const navigate = useNavigate()
    
    try{
         await axios.post(`${URL}/api/v1/auth/signup`,{username,name,email,password,role})

         navigate('/login')
    }
    catch(err){
            console.log(`Error:${err}`)
    }
     

   }

  return (
    <div className="w-screen h-screen grid grid-cols-2">
      
      {/* LEFT – Animation */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">

  {/* Floating blobs */}
  <div className="absolute -top-20 -left-20 w-[28rem] h-[28rem] bg-purple-500 rounded-full blur-3xl opacity-30 animate-float1" />
  
  <div className="absolute top-1/3 -right-32 w-[24rem] h-[24rem] bg-pink-500 rounded-full blur-3xl opacity-30 animate-float2" />
  
  <div className="absolute bottom-[-6rem] left-1/4 w-[22rem] h-[22rem] bg-blue-500 rounded-full blur-3xl opacity-30 animate-float3" />

  {/* Text content */}
  <div className="relative z-10 h-full flex flex-col items-center justify-center text-white">
    <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
    <p className="text-slate-300 max-w-sm text-center">
      Sign in to continue helping your campus community.
    </p>
  </div>

</div>


      {/* RIGHT – Form */}
      <div className="flex justify-center items-center ">
           
           <div className = "w-150 h-150 p-5 border-slate-400 shadow-lg">
               <div className = "flex justify-center p-5">
                     <h1 className="text-3xl">Campus Helpdesk</h1>
               </div>
               
            <Input defaultStyle={"w-full "} ref = {userNameRef} placeholder="Username"></Input>
           <Input defaultStyle={"w-full "} ref = {nameRef} placeholder="Name"></Input>
           <Input defaultStyle={"w-full "} ref = {emailRef} placeholder="Email"></Input>
           <Input defaultStyle={"w-full "} ref = {passwordRef} placeholder="Set Password"></Input>
           <Input defaultStyle={"w-full "} ref = {roleRef} placeholder="Role"></Input>

                <Button text={"Signup"} variant={"primary"} size={"md"} className="w-full mt-6 m-2 bg-green" onClick = {()=>{handleSignup()}}></Button>
           </div>
           
      </div>

    </div>
  );
};
