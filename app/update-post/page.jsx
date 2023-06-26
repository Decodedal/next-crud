'use client'

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@/components/Form";

function EditPost() {

    const { data: session} = useSession();
    const searchParams = useSearchParams();
    const promptId = searchParams.get('id');

    const router = useRouter()

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt:'',
        tag:''
    });

    useEffect(()=>{
        const getPrompt = async() =>{
            const response = await fetch(`/api/post/${promptId}`)
            const data = await response.json()
            console.log(data)
            setPost({
                prompt:data.prompt,
                tag:data.tags
            })
        }
        if(promptId) getPrompt()
    },[promptId])

const updatePrompt= async(e) =>{
   e.preventDefault();
   setSubmitting(true);
   if(!promptId)return alert('Prompt Id not found')

   try{
    const response = await fetch(`/api/post/${promptId}`,{
        method:"PATCH",
        body:JSON.stringify({
            prompt:post.prompt,
            userId:session.user.id,
            tag:post.tag
        })
    })
    if(response.ok){
        //console.log(response)
       // console.log(session)
       router.push('/');
    }
   }catch(err){
    console.log(err);
   }finally{
    setSubmitting(false);
   }
}


  return (
    <Form
        type="Update"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit ={updatePrompt}
    />
  )
}

export default EditPost