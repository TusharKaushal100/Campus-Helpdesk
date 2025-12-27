import { useState } from "react"
import type { ReactElement } from "react"
import { Button } from "../components/button"


interface Host{
     question:ReactElement,
     answer:ReactElement[]
}

export const HostBox = (props:Host)=>{
       
    const [open,setOpen] = useState(false)
    const answers = props.answer

   return <div className= "bg-white rounded-lg border-slate-800 shadow-lg w-full p-4 mt-2">
         <div className = "flex gap-4 items-start ">
               
               <div className = "w-full ">
                     {props.question}
                     <div className = "max-h-72 overflow-y-auto overflow-x-hidden">
                     {open && <div className = "ml-6 mr-2 ">  {/*wrap this map inside the curly braces  */}
                   {answers.map((answer,index) => {
                                    return <div key = {index} >{answer}</div>
                                 })
                                }             
                           </div>}
                     </div>      
               </div>

              <Button text = {!open?"Answers":"Close"} variant = {"primary"} size = {"lg"} onClick = {()=>{setOpen(!open)}} ></Button>

         </div>
         
         
   </div>
}