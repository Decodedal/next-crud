'use client'

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@/components/Form";

function CreatePost() {

    const { data: session} = useSession();

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt:'',
        tag:''
    });

const CreatePrompt = async(e) =>{
   e.preventDefault();
   setSubmitting(true);

   try{
    const response = await fetch('/api/post/new',{
        method:"POST",
        body:JSON.stringify({
            prompt:post.prompt,
            userId:session.user.id,
            tag:post.tag
        })
    })
    if(response.ok){
        //console.log(response)
       // console.log(session)
       Router.push('/');
    }
   }catch(err){
    console.log(err);
   }finally{
    setSubmitting(false);
   }
}


  return (
    <Form
        type="Create"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit ={CreatePrompt}
    />
  )
}

export default CreatePost