import { faker } from '@faker-js/faker';
import React,{useEffect,useState} from 'react'
import Story from '../components/Story';
const Stories = () => {
    const [suggestions,setSuggestions] = useState([]);

    useEffect(()=> {
        const suggestions = Array(20).fill().map((_,i)=>({
            id:i,
            image:faker.image.people(undefined,undefined,true),
            username:faker.name.findName()
        }))
        console.log(suggestions)
        setSuggestions(suggestions);
    },[])

  return (
        <div className='max-w-[600px] mx-auto overflow-x-scroll flex py-4 bg-white scrollbar-thin border border-b-gray-300'>
            {
                suggestions.map((user)=> (
                   <Story key={user.id} image={user.image} username={user.username} />
                )
                )
            }
        </div>
  )
}

export default Stories