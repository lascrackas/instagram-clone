import { BookmarkIcon, DotsHorizontalIcon, EmojiHappyIcon } from '@heroicons/react/outline'
import React, { useEffect, useState,useRef } from 'react'
import { ChatIcon,HeartIcon,PaperAirplaneIcon } from '@heroicons/react/outline'
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useSession } from 'next-auth/react';
import Comment from '../components/Comment';
import Image from 'next/image';

const Post = ({id, username, userImg, image, caption}) => {

  const [comments,setComments] = useState([]);
  const {data:session} = useSession();
  const [comment,setComment] = useState("");
  const commentRef = useRef(null);

  useEffect(()=> {
    return onSnapshot(query(collection(db,'posts',id,'comment')),orderBy('timestamp','desc'),(snapshot)=> {
      setComments(snapshot.docs);
    })
  },[db,id]);


  const postComment = async (e) => {
    e.preventDefault();
    if(comment.length===0)return;
    const docRef = await addDoc(collection(db, "posts",id,'comment'), {
      username: session.user.name,
      comment:comment,
      timestamp:serverTimestamp()
    });
    setComment("");

  }

  return (
    <div key={id} className='bg-white my-5 border border-gray-300'>

    <div  className='flex items-center bg-white p-3' >
      <img className='w-8 h-8 mr-2 rounded-full object-cover' src={userImg} alt={username} />
      <p className='text-sm flex-1 font-bold'>{username}</p>
      <DotsHorizontalIcon className='w-4' />
    </div>

    <div> 
      <Image  src={image} objectFit="cover" width={600} height={600} />
    </div>

    <div className='flex justify-between px-2'>
      <div className='flex space-x-1 mt-2 '>
        <HeartIcon className='w-8 cursor-pointer' />
        <ChatIcon  className='w-8 cursor-pointer' />
        <PaperAirplaneIcon className='rotate-45 cursor-pointer w-8' />
      </div>

      <BookmarkIcon  className='w-8 cursor-pointer'/>
    </div>

    <div className='flex items-start space-x-1 my-4 px-2'>
      <p className='font-bold mr-1'>{username}</p>
      <p>{caption}</p>
    </div>

    <div>
      {
        comments.map((comment)=> 
          (<Comment key={comment.id} username={comment.data().username} comment={comment.data().comment} />)
        )
      }

      
    </div>

    <form className='flex items-center p-2 border-t-[1px]'>
      <EmojiHappyIcon className='h-7 mr-1' />
      <input value={comment} onChange={(e)=> setComment(e.target.value)} className='border-none flex-1 outline-none' placeholder='Ajouter un commentaire'></input>
      <button onClick={(e)=>postComment(e)} className='text-sm text-blue-400'>Publier</button>
    </form>

    </div>
  )
}

export default Post