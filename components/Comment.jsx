import React from 'react'
import { HeartIcon } from '@heroicons/react/outline'


const Comment = ({username,comment}) => {
  return (
    <div className='flex items-center justify-between px-2 py-1'>
    <p className='text-md '><span className='font-bold'>{username}</span> {comment}</p>
    < HeartIcon className='w-4' />
    </div>

  )
}

export default Comment