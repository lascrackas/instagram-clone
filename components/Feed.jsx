import React from 'react'
import Stories from '../components/Stories';
import Posts from '../components/Posts';
import MiniProfile from '../components/MiniProfile';

const Feed = () => {
  return (
    <div className='grid mt-6 grid-cols-1 lg:grid-cols-3 max-w-[1024px] mx-auto min-w-[380px]'>
      <div className='col-span-2'>
          <Stories  />
          <Posts />
      </div>

      <div className='hidden lg:inline-grid lg:col-span-1'>
        <div>

        <MiniProfile />
        </div>
      </div>
    </div>
  )
}

export default Feed