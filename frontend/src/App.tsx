import { useState } from "react"
import {Button} from "./components/button"
import {Plus} from "./icons/plus"
import {Profile} from  "./pages/profile"
import { Modal } from "./components/modal"

function APP(){
    
     const [pressed,setPressed] = useState(true)

     return <>
     <div>
           <div className="m-5 flex justify-end"> 

          <Button onClick={()=>{setPressed(true)}} startIcon = {<Plus size = {"md"}/>} variant="primary" size="md" text="Post Q"></Button>
          
         </div >
            <div>
               {<Modal  title={"Enter title"} description={"Enter description"} pressed = {pressed} setPressed={setPressed} onClick={()=>setPressed(!pressed)}></Modal>}
                 {<Profile></Profile>}
            </div>
             
     </div>
       
           </>
}


export default APP;