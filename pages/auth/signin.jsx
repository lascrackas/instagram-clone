import React from 'react';
import {getProviders, signIn,signOut} from 'next-auth/react';
import {AiOutlineGoogle} from 'react-icons/ai'

const signin = ({providers}) => {

 

  return (
    <div className='bg-gray-100 w-full h-screen flex items-center justify-center border-2 border-gray-400'>
      <div className='bg-white w-10/12 sm:w-4/6 md:w-2/4 lg:w-3/12 mx-auto text-center '>
        <img className='w-40 pt-2 object-cover mx-auto' src='/img/logoinstagram.png' />
        <p className='text-xl p-8 font-semibold text-gray-400'>
          Inscrivez-vous pour voir les photos et vidéos de vos amis.
        </p>

        {
        Object.values(providers).map((provider)=>(

          <div onClick={()=> signIn("google", { callbackUrl: '/' })} key={provider.name}>
            <p className='bg-blue-400 text-white flex items-center w-4/5 rounded-md mx-auto justify-center'>
            <AiOutlineGoogle /> 
              <button className='p-2 bg-blue-400 text-white rounded-md'>
                Se connecter avec {provider.name}
                </button>
              </p>
          </div>

        )
        )
      }

      <div>
        <p className='my-3 p-4 text-xs'>
        Les personnes qui utilisent notre service ont pu importer vos coordonnées sur Instagram. En savoir plus
        </p>
        <p className='text-xs p-4'>En vous inscrivant, vous acceptez nos Conditions générales. 
        Découvrez comment nous recueillons, utilisons et partageons vos
         données en lisant notre Politique de confidentialité et comment
          nous utilisons les cookies et autres technologies similaires
           en consultant notre Politique d’utilisation des cookies.</p>
      </div>

      </div>
     

    </div>
  )
}



export const  getServerSideProps = async () =>{

  const providers  = await getProviders();

  return {
    props:{
      providers,
    },
  }

}

export default signin