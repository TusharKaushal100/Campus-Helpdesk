import {Button} from "./components/button"
import {Plus} from "./icons/plus"
import {Profile} from  "./pages/profile"

function APP(){


     return <>
     <div>
           <div className="m-5 flex justify-end"> 

          <Button startIcon = {<Plus size = {"md"}/>} variant="primary" size="md" text="Click me"></Button>
          
         </div>

         <Profile></Profile>
     </div>
       
           </>
}


export default APP;