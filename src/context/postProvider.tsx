'use client'
import { createContext,useContext,useState } from "react";

interface post{
  id?:string
  title:string,
  content:string,
}

interface postContextInterface{
   post:post,
   setPost:React.Dispatch<React.SetStateAction<post>>,
  }
  
  const defaultPost :post = {
    id:"",
    title:"",
    content:"",
  }
  const postContext = createContext<postContextInterface | undefined>(undefined)


  
 export const PostProvider = ({children}:{children:React.ReactNode}) => {
    const [post, setPost] = useState(defaultPost)
    return (
      <postContext.Provider value={{post,setPost}}>
        {children}
      </postContext.Provider>
    )
  }
  


  export function usePostContext(){
    const context =  useContext(postContext)
    if(!context){
      throw new Error('usePostContext must be used within a PostProvider');
    }
    return context;
  }