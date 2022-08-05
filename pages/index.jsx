import Head from 'next/head'
import Image from 'next/image';
import Header from '../components/Header';
import Feed from '../components/Feed';
import Modal from '../components/Modal';
import { useSession } from 'next-auth/react';
import { getSession } from 'next-auth/react';

const Home= () => {

const {data:session} = useSession();


  return (
    <div>
    <div className='bg-gray-100'>
      <Head>
        <title>Instagram clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Modal />
        <Header />
        <Feed />
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

export default Home
