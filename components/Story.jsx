import React from 'react'

const Story = ({username,image}) => {
  return (
    <div  className='text-black mx-2 '>
    <span> 
        <img className='hover:scale-110 transition  duration-200 rounded-full border-2 p-[1.5px] border-red-400 w-16 h-16 object-cover  cursor-pointer' src={image}/>
    </span>
    <p className='text-xs w-16 truncate text-center'>{username}</p>
</div>
  )
}

export default Story