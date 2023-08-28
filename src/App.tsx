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
