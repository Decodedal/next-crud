'use client '

import { useState } from "react"
import Image from "next/image"
import { useSession } from "next-auth/react"
import { usePathname, useRouter} from 'next/navigation'

const PromptCard = ({post, handleTagCLick, handleEdit, handleDelete}) => {

  const [copied , setCopy] = useState('')

  const router = useRouter()
  const pathName = usePathname();

  const handleCopy = () =>{
    setCopy(post.prompt)
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopy(''), 3000)
  }

  const { data : session} = useSession()
  console.log(session.user.id === post.userId)


  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
          <Image
            src={post.user.image}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-500">
              {post.user.name}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.user.email}
            </p>
          </div>
        <div className="copy_btn" onClick={()=>{handleCopy()}}>
          <Image
            src={copied === post.prompt
            ? '/assets/icons/tick.svg'
            : '/assets/icons/copy.svg'
            }
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p onClick={() => handleCLick && handleTagCLick(post.tag)} className="font-inter text-sm blue_gradient cursor-pointer">{post.tags}</p>

      {session && session.user.id === post.userId && pathName === '/profile'?
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p className="font-inter text-sm green_gradient cursor-pointer"
          onClick={handleEdit}
          >
            edit
          </p>
          <p className="font-inter text-sm orange_gradient cursor-pointer"
          onClick={handleDelete}
          >
            Delete
          </p>
        </div> :
        null
      } 
    </div>
  )
}

export default PromptCard