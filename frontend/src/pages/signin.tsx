import { useRef } from "react";
import axios from "axios";
import { Input } from "../components/input";
import { Button } from "../components/button";
import { useNavigate } from "react-router-dom";
import {URL} from "../assets/config"
import { useState } from "react";
import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export const Login = ()=>{

      const [error,setError] = useState<Record<string, string[]>>({})
    const [generalError, setGeneralError] = useState<string | null>(null);

   const userNameRef = useRef<HTMLInputElement>(null)
   const nameRef = useRef<HTMLInputElement>(null)
   const emailRef = useRef<HTMLInputElement>(null)
   const passwordRef = useRef<HTMLInputElement>(null)
   const roleRef = useRef<HTMLSelectElement>(null)
   
   const navigate = useNavigate()

   const handleLogin = async ()=>{
    const username = userNameRef.current?.value
    
    const password = passwordRef.current?.value
   

    // const navigate = useNavigate() you cant declare this hook inside handle function 
    
    try{
        setError({}); // clear old errors

         const response = await axios.post(`${URL}/api/v1/auth/login`,{username,password});

         console.log(`token from login=${response.data.token}`)
         
         localStorage.setItem("token",response.data.token)
         navigate('/myQuestions')
    }
    catch(err:any){
          if(err.response.data.errors){
            setError(err.response.data.errors)
          }
          else if (err.response?.data?.message) {
            // Duplicate username or other backend message
                   setGeneralError(err.response.data.message);
            }
          else{
            alert("Signup failed")
          }


    }
     

   }



    return <div>
          <div  className = "h-screen grid grid-cols-2">
              <div className = "flex items-center justify-center h-full w-full cols-span-1  bg-slate-900">

                    <div className ="w-150 h-150">
                                                  <DotLottieReact
                                                        src="/animations/Bunny.lottie"
                                                        loop
                                                        autoplay
                                           /></div> 
                          
              </div >
              <div className = "flex justify-center items-center cols-span-1  bg-slate-900 ">
                         

                                    
                                    <div className = "w-120 h-100 p-5 border-slate-400 shadow-lg bg-white rounded-lg transition-transform duration-300 ease-out hover:scale-[1.03]  ">
                                        <div className = "flex justify-center p-5">
                                              <h1 className="text-3xl">Campus Helpdesk Login</h1>
                                        </div>
                                        
                                     <Input defaultStyle={"w-full "} ref = {userNameRef} placeholder="Username"></Input>
                                     {error.username && <p className = "text-red-500 text-sm p-1">{error.username[0]}</p>}
                                           {/* no user found error*/}
                                                 {generalError === "user doesnt exist" && (
                                                 <p className="text-red-500 text-sm p-1">
                                                      {generalError}
                                                 </p>
                                                )}
                                     
                                   
                                    
                                    
                         
                                    <Input defaultStyle={"w-full "} ref = {passwordRef} placeholder="Set Password"></Input>
                                    {error.password && <p className = "text-red-500 text-sm p-1">{error.password[0]}</p>}
                                     {generalError === "Invalid Password" && (
                                                 <p className="text-red-500 text-sm p-1">
                                                      {generalError}
                                                 </p>
                                                )}
                         
                                   
                                     
                         
                                         <Button text={"Login"} variant={"primary"} size={"md"} className="w-full mt-8 m-2 bg-green" onClick = {()=>{handleLogin()}}></Button>
                                    </div>
                                    
                              
              </div>
          </div>
    </div>
}