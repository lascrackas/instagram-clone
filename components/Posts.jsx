import { collection, onSnapshot, orderBy } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import Post from '../components/Post';
import { db } from '../firebase';
import { query } from 'firebase/firestore';

const Posts = () => {


  const [posts,setPosts] = useState([]);

  useEffect(()=> {
    return onSnapshot(query(collection(db,"posts",),orderBy("timestamp","desc")),snapshot => {
      setPosts(snapshot.docs);
    })
  },[db])


  return (
    <div className='mt-10 max-w-[600px]  mx-auto '>
      {
        posts.map((post)=> {
          return <Post key={post.id} id={post.id} username={post.data().name} userImg={post.data().profilImg} image={post.data().image} caption={post.data().caption} />
        })
      }
    </div>
  )
}

export default Posts