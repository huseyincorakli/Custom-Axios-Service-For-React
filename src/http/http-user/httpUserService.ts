import { HttpClientService } from "../httpClientService";


interface Response<T> {
    data:Data<T>;
    status:number;
  }
  interface Data<T> {
    products:T[]
  }

  
export const HttpUserService={
    async read(  setState:React.Dispatch<React.SetStateAction<any>>,callBack?:()=>void){
        await HttpClientService.get<Response<any>>({
             controller:'todos'
         }).then(response=>{
            //check in case of response (status code , status text)
            
            setState(response.data);
             
         }).catch(err=>{
            // check in case of error
            alert(err.message);
           
         })
         if(callBack!=undefined){
             callBack();
         }
     },
}