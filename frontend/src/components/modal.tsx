
interface ModalData{
     onClick?:()=>void,
     title:string,
     description:string,
     tags?:string[],
     pressed:boolean,
     setPressed:any
}

export const Modal = (props:ModalData)=>{

              return props.pressed ? <div className=" fixed flex items-center justify-center h-screen w-screen inset-0"> {/*so yeah if we dont used fixed then the profile div would come below this modal div so fixed is use to fix or glue it to the screen like a shield that stays in place so it appears on top of profile*/}
                       <div className=" fixed h-screen w-screen bg-white opacity-50" onClick = {props.onClick}>
                      {/* inset-0 shorthand for left-0 r-0 t-0 b-0*/}
                       </div>
                        <div className="w-72 h-72  bg-white border-slate-300 z-50 shadow-lg rounded-md"> 
                                 
                        </div>
                     
                  </div>:null
}