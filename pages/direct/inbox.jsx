import React from 'react'
import Header from '../../components/Header';
import { PaperAirplaneIcon, PencilAltIcon,ChevronDownIcon } from '@heroicons/react/outline';
import { useSession,getSession } from 'next-auth/react';
import Loader from '../../components/Loader';

const inbox = () => {

    const {data:session} = useSession();

  return (
    <div className='h-screen flex flex-col'>
        <Header />
        <div className='flex-1  bg-gray-100 pt-2'>
            <div className='w-[70%] mx-auto h-full p-3 rounded-md'>    
                <div className='grid grid-cols-3 h-full  bg-white'>
                    <div className='w-full border border-gray-200 border-r-0 rounded-l col-span-1'>
                        <div className=' flex items-center justify-between p-2 border-b border-b-gray-200'>
                            <div  className='flex items-center space-x-1'>
                                <span className='text-sm font-semibold'>
                                    {session?.user.name} 
                                </span>
                                <ChevronDownIcon className='w-6' />
                            </div>
                            <div>
                                <PencilAltIcon className='w-10' />
                            </div>
                        </div>
                        <div className='mt-4'>
                            <Loader key={1}/>
                            <Loader key={2}/>
                            <Loader key={3}/>
                        </div>
                    </div>
                    <div className='w-full  border border-gray-200 rounded-r  col-span-2'>
                        <div className='flex flex-col h-full justify-center items-center'>
                            <div className='p-4 border border-black inline-flex rounded-full'>
                            <PaperAirplaneIcon className='w-12 rotate-45' />
                            </div>
                            <h1 className='mt-4 text-lg'>Mes messages</h1>
                            <p className='text-sm'>Envoyez des photos et des messages privés à un(e) ami(e) ou à un groupe.</p>
                            <button className='text-white bg-blue-500 mt-4 p-1 rounded-md'>Envoyer un message</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export async function getServerSideProps(context) {
    const session = await getSession(context)
  
    if (!session) {
      return {
        redirect: {
          destination: '/auth/signin',
          permanent: false,
        },
      }
    }
  
    return {
      props: { session }
    }
  }

export default inbox