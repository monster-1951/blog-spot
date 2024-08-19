'use client'
import { usePostContext } from '@/context/postProvider';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.bubble.css'; // Import the Bubble theme CSS

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const WritePost = () => {
  const posst = usePostContext()
  // console.log(posst,"🥲posst")
  const [Title, setTitle] = useState('');
  const [Content, setContent] = useState('');
  // useEffect(() => {
  //   posst.setPost(post)
  //   console.log(posst.post)
  // }
  // )
  return (
    <div className='flex flex-col space-y-10 md:w-[50%] mx-auto'>
     <ReactQuill 
      value={Title} 
      onChange={(e) => {
        setTitle(e)
        posst.setPost({title:e,content:Content})
        console.log(posst.post)
      }
      } 
      theme="bubble" // Use the Bubble theme
      placeholder="Title"
     
    />
     <ReactQuill 
      value={Content} 
      onChange={(e) => {
        setContent(e)
        posst.setPost({title:Title,content:e})
        console.log(posst.post)
      }
      } 
      theme="bubble" // Use the Bubble theme
      placeholder="Tell your story"
    />
    </div>
  )
}

export default WritePost