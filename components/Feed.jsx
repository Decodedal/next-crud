'use client'

import  {useEffect, useState} from 'react'
import PromptCard from './PromptCard';

const Feed = () => {

  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const handleSearchChange = (e) =>{

  }

  const PromptCardList = ({data, handleTagClick})=>{
    return(
      <div className='mt-16 prompt_layout'>
        {data.map(post =>{
          return(
            <PromptCard
              key={posts.id}
              post={post}
              handleTagClick={handleTagClick}
            />
          )
        })}
      </div>
    )
  }

  useEffect(()=>{
    const fetchPosts = async () =>{
      const response = await fetch('/api/post');
      const data = await response.json();
      setPosts(data)
      console.log(data)
    }
    fetchPosts()
  },[])

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
        type='text'
        placeholder='search for a tag or a username'
        value={searchText}
        onChange={handleSearchChange}
        required
        className='search_input peer'
        />
      </form>
      <PromptCardList
      data={posts}
      handleTagClick={()=>{}}
      />
    </section>
  )
}

export default Feed