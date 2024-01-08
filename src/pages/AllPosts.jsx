import React from 'react'
import dbStore from '../appwrite/config'
import { useState, useEffect } from 'react'
import { Container,PostCard } from '../components'


const AllPosts = () => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        dbStore.getPosts([]).then((post) => {
            if (post) {
                setPosts(post.documents)
            }
        })
    })

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post)=>
                        <div key={post.$id}>
                            <PostCard {...post}></PostCard>
                        </div>
                    )}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts