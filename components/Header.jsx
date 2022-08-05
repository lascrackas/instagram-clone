import React from 'react';
import logo from '../public/img/logoinstagram.png';
import Image from 'next/image';
import {HomeIcon} from '@heroicons/react/solid';
import {PaperAirplaneIcon, PlusCircleIcon,HeartIcon, GlobeIcon, SearchIcon} from '@heroicons/react/outline'
import { SiInstagram } from 'react-icons/si';
import { useRecoilState } from 'recoil';
import {modalState} from '../atoms/ModalAtom';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';


const Header = () => {

    const [open,setOpen] = useRecoilState(modalState);
    const {data:session} = useSession()
    const router = useRouter();


  return (
    <div className="flex  py-2 border-b bg-white border-b-slate-200  min-w-[380px]">

    <div className='flex w-full items-center justify-between max-w-5xl mx-auto px-5  sticky top-0'>
        <div className='cursor-pointer'>
            <SiInstagram  onClick={() => router.push('/')} className='sm:hidden w-10 h-10' />
            <span  className='hidden sm:inline'>

            <Image  onClick={() => router.push('/')} src={logo} width={160} height={50} objectFit="contain" />
            </span>
        </div>

        <div className='hidden sm:inline bg-gray-100 px-2 py-2 rounded-md'>
            <p className='flex items-center space-x-1 '>
                <SearchIcon className='text-slate-400 h-4 w-4' />
                <input className='outline-none bg-gray-100'  placeholder='Rechercher'/>
            </p>
        </div>

        <div className='flex items-center space-x-4'>
            <HomeIcon className='text-black  w-7 cursor-pointer' />
            <PaperAirplaneIcon  className='text-black  w-7 rotate-45 cursor-pointer'  />
            <PlusCircleIcon onClick={()=> setOpen(true)} className='text-black  w-7 cursor-pointer'  />
            <GlobeIcon className='text-black  w-7 cursor-pointer'  />
            <HeartIcon  className='text-black  w-7 cursor-pointer'/>
            <span onClick={()=> signOut({callbackUrl:"/auth/signin"})} className='cursor-pointer'>

            <Image className=' rounded-full object-cover' src={session?.user.image} width={32} height={32} />
            </span>
        </div>

    </div>
    </div>
  )
}

export default Header