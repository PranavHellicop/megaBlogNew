import React, {useState,useEffect} from 'react'
import {Container, PostForm, PostCard} from '../components'
import dbStore from '../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'
 
const EditPost = () => {
  
  const [post,setPost] = useState()
  const {slug} = useParams() 
  const navigate = useNavigate()
  
  useEffect(()=>{
    if (slug){
        dbStore.getPost(slug).then((post)=>{
            if (post){
                setPost(post)
            }
        })
    }else{
        navigate("/")
    }
  },[slug,navigate])

  return post ? (
    <div className='py-8'>
        <Container>
            <PostCard {...post}/>
        </Container>
    </div>
  ): null
}

export default EditPost