import React, { useState ,useEffect} from 'react';
import logo from '../public/img/logoinstagram.png';
import Image from 'next/image';
import {HomeIcon} from '@heroicons/react/solid';
import {PaperAirplaneIcon, PlusCircleIcon,HeartIcon, GlobeIcon, SearchIcon} from '@heroicons/react/outline'
import { SiInstagram } from 'react-icons/si';
import { useRecoilState } from 'recoil';
import {modalState} from '../atoms/ModalAtom';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Transition } from '@headlessui/react';
import ClickAwayListener from '@mui/material/ClickAwayListener';

const Header = () => {

    const [open,setOpen] = useRecoilState(modalState);
    const [openMenu,setOpenMenu] = useState(false);
    const {data:session} = useSession()
    const router = useRouter();

    useEffect(()=> {
        document.addEventListener('scroll',()=> setOpenMenu(false));
    },[]);



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
            <PaperAirplaneIcon  onClick={() => router.push('/direct/inbox')}   className='text-black  w-7 rotate-45 cursor-pointer'  />
            <PlusCircleIcon onClick={()=> setOpen(true)} className='text-black  w-7 cursor-pointer'  />
            <GlobeIcon className='text-black  w-7 cursor-pointer'  />
            <HeartIcon  className='text-black  w-7 cursor-pointer'/>
            <div>
        <div>

    <div onClick={(()=> setOpenMenu((current)=>!current))} className="outline-none mt-2 " id="menu-button" aria-expanded="true" aria-haspopup="true">
            
    <span  className='cursor-pointer'>
            <Image className=' rounded-full object-cover' src={session?.user.image} width={30} height={30} />
            </span>
    </div>
  </div>
    <ClickAwayListener onClickAway={()=> setOpenMenu(false)}>
        <Transition
        show={openMenu}
        enter="transition-opacity duration-200"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-200"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
    
            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                <div className="py-1" role="none">
                <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">Profil</a>
                <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">Enregistré</a>
                <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-1">Parametres</a>
                <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-2">Changer de compte</a>
                <form method="POST" action="#" role="none">
                    <button  onClick={()=> signOut({callbackUrl:"/auth/signin"})}   type="submit" className="text-gray-700 block w-full text-left px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-3">Deconnexion</button>
                </form>
                </div>
            </div>
      </Transition>
    </ClickAwayListener>
        </div>
    </div>
    </div>
    </div>

  )
}

export default Header