import type { ReactElement } from "react"

interface Question{
      title:string,
      description:string,
      tags?:string[],
      image?:string,
      icon?:ReactElement

}

export const QuestionCard = (props:Question)=>{

       return <div className ="bg-white    border-slate-300 shadow-lg outline-none w-72  p-2">
             
             <div className = "pl-2 flex items-center justify-between">
                  <div className="flex gap-2">
                      <div >
                         {props.icon}
                      </div>
                  
                      <div className= "font-bold">
                          {props.title}
                      </div>
                  </div>
                 
                  <div className="p-3">
                       <img src = {props.image} className = "w-9 h-9 rounded-full"></img>
                 </div>
             </div>
             <div className="ml-3">
                  {props.description}
                  
             </div>
            
               
       </div>
}