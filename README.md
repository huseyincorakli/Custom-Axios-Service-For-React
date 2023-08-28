
## HttpClientService.ts
```jsx
     import axios, { AxiosHeaders } from 'axios'
   export class RequestParameters {
       controller?: string;
       action?: string;
       queryString?: string;
       headers?: AxiosHeaders;
       baseUrl?: string;
       fullEndPoint?: string
   }
   
   
   export const HttpClientService = {
       
       url(requestParameters: Partial<RequestParameters>): string {
           const mainUrl :string='https://jsonplaceholder.typicode.com';
           return `${requestParameters.baseUrl ? requestParameters.baseUrl : mainUrl}/${requestParameters.controller}${requestParameters.action ? `/${requestParameters.action}` : ""}`;
       },
   
       async get<T>(requestParameters: Partial<RequestParameters>, id?: string) {
           let url: string = '';
           if (requestParameters.fullEndPoint) {
               url = requestParameters.fullEndPoint
           }
           else {
               url = `${this.url(requestParameters)}${id ? `?id=${id}` : ''}${requestParameters.queryString ? `/${requestParameters.queryString}` : ''}`;
               return  (await axios.get<T>(url, { headers: requestParameters.headers }))
           }
       }
       //post()
       //put()
       //delete()
      
   } 
```
## HttpUserService.ts
```jsx
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
```
## App.tsx
```jsx
   import { useEffect, useState } from "react"
   import { HttpUserService } from "./http/http-user/httpUserService"
   
   
   function App() {
   const [user,setUser]=useState<any>([]);
     useEffect(()=>{
       HttpUserService.read(setUser,()=>{
         //Let's say we have added users, we can call a method that will load users again from here
         //or assuming we use a spinner, here the spinner can be deactivated
       })
     },[])
     return (
       <>
         {user? user[0]?.id:'null'}
       </>
     )
   }
   
   export default App
```
