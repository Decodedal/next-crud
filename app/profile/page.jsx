"use client"

import { useState, useEffect} from'react'
import {useSession} from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Profile from "../../components/Profile"

const MyProfile = () => {

  const [Posts, setPosts] = useState([])

  const { data :session} = useSession()

  const router = useRouter();

    useEffect(()=>{
        const fetchPosts = async () =>{
          const response = await fetch(`/api/post/user/${session.user.id}`);
          const data = await response.json();
          setPosts(data)
          console.log(data)
        }
        fetchPosts()
      },[])

    const handleEdit = (post) =>{
      router.push(`update-post?id=${post.id}`)
    }

    const handleDelete = async(post)=>{
      const hasConfirmed = confirm("Are you sure you want to delete this prompt?")
      if(hasConfirmed){
        try{
          const response = await fetch(`/api/post/${post.id}`,{
            method:"DELETE"
          })
          console.log(response.ok)
          if(response.ok){
           router.push('/');
          }
        }catch(err){
          console.log(err)
        }
      }
    }

  return (
    <Profile
        name='My'
        desc = "Welcome to your personalized profile page"
        data={Posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default MyProfile