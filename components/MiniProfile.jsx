import React, {useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';


const MiniProfile = () => {

    const [suggestions,setSuggestions] = useState([]);
    const {data:session} = useSession();

    useEffect(()=>{


      const suggestions = [
            {
                id:1,
                username:faker.name.findName(),
                image:faker.image.people(undefined,undefined,true)
            },
            {
                id:2,
                username:faker.name.findName(),
                image:faker.image.people(undefined,undefined,true)
    
            },
            {
                id:3,
                username:faker.name.findName(),
                image:faker.image.people(undefined,undefined,true)
    
            },
            {
                id:4,
                username:faker.name.findName(),
                image:faker.image.people(undefined,undefined,true)
    
            },
            {
                id:5,
                username:faker.name.findName(),
                image:faker.image.people(undefined,undefined,true)
    
            },
        ]

        setSuggestions(suggestions);


    },[])

 

  return (
    <div>

        <div className='flex items-center justify-between'>
            <img className='rounded-full w-10 h-10 object-cover mr-3' src={session?.user.image} alt="profile"  />
            <p className='text-sm font-semibold flex-1 capitalize'>{session?.user.name}</p>
            <button onClick={()=> signOut({callbackUrl:'/auth/signin'})} className='text-blue-400 cursor-pointer'>Deconnexion</button>
        </div>

        <div className='flex items-center justify-between mt-4'>
            <p className='text-gray-600 text-sm font-bold'>Suggestion pour vous</p>
            <p className='text-sm font-bold cursor-pointer'>Voir tout</p>
        </div>

        <div className='mt-4'>

                    {suggestions.map((suggestion) => {
                    return ( 
                        <div key={suggestion.id} className='flex items-center justify-between'>
                            <div className='flex items-center space-x-1 my-1'>
                                <img className='rounded-full w-7 h-7 object-cover mr-3' src={suggestion.image} alt='/' />
                                <p className='text-sm font-bold flex-1 capitalize'>{suggestion.username}</p>
                            </div>

                            <div>
                                <p className='text-blue-400 text-sm cursor-pointer'>S'abonner</p>
                            </div>
                        </div>
                        )
                    })}
                  
        </div>
    </div>
  )
}

export default MiniProfile