import {Button} from "./components/button"
import {Plus} from "./icons/plus"

function APP(){


     return <>
       <div className="h-screen flex items-center justify-center"> 
          <Button startIcon = {<Plus size = {"md"}/>} variant="primary" size="md" text="Click me"></Button>
         </div>
           </>
}


export default APP;