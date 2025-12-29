
interface inputProps{
       ref:any,
       placeholder:string,
       defaultStyle?:string
}

export const Input = (props:inputProps)=>{
         
    return <div>
                 <input ref = {props.ref} placeholder = {props.placeholder} className = {`rounded-md p-2 m-2 bg-white text-black border border-black hover:bg-gray-300 ${props.defaultStyle}`}>
                 </input>
    </div>
}