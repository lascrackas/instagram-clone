import React,{Fragment, useRef, useState} from 'react'
import {useRecoilState} from 'recoil';
import {modalState} from '../atoms/ModalAtom';
import { Dialog,Transition } from '@headlessui/react'
import { CameraIcon } from '@heroicons/react/outline';
import {addDoc, collection, serverTimestamp, updateDoc,doc} from 'firebase/firestore';
import {db,storage} from '../firebase';
import { useSession } from 'next-auth/react';
import { getDownloadURL, uploadString,ref } from 'firebase/storage';


const Modal = () => {
    
    const [open,setOpen] = useRecoilState(modalState);
    const [selectedFile, setSelectedFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const filePickerRef = useRef(null);
    const captionRef = useRef(null);
    const {data:session} = useSession();


    const addImageToPost = (e) => {
        console.log(e.target.files)
        const reader = new FileReader();
        if(e.target.files[0]){
            reader.readAsDataURL(e.target.files[0])
        }

        reader.onload = (readerEvent) => {
            setSelectedFile(readerEvent.target.result);
        }
    }

    const uploadPost = async () => {
        if(loading) return

        setLoading(true);

        setOpen(false);


        const docRef = await addDoc(collection(db,'posts'),{
            name:session.user.name,
            profilImg:session.user.image,
            caption:captionRef.current.value,
            timestamp:serverTimestamp()
        })

        const imageRef = ref(storage, `posts/${docRef.id}/image`);

        await uploadString(imageRef,selectedFile,"data_url").then(async(snapshot)=> {
            const downloadUrl = await getDownloadURL(imageRef);
            await updateDoc(doc(db,"posts",docRef.id),{
                image:downloadUrl
            });
        }).catch(e=>console.log(e))


        setLoading(false);
        setSelectedFile(null);

    } 

    return (
        <>
          <Transition appear show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={()=> setOpen(false)}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-60" />
              </Transition.Child>
    
              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      
                      {
                        selectedFile ? (
                            <img onClick={()=> setSelectedFile(null)} src={selectedFile} alt="/" />
                        ):(
                            <div onClick={()=> filePickerRef.current.click()}  className='flex justify-center'>
                                <CameraIcon  className='w-12 cursor-pointer'/>
                            </div>

                        )
                      }


                      
                      <Dialog.Title
                        as="h3"
                        className="text-lg text-center font-medium leading-6 mb-10 text-gray-900"
                      >
                       Choisir une photo


                      </Dialog.Title> 
                      <div className="mt-2">
                       <input ref={filePickerRef} type="file"  onChange={(e)=> addImageToPost(e)} hidden />
                      </div>

                      <div className="mt-2">
                       <input ref={captionRef} className='border-none focus:ring-0 w-full text-center outline-none' type="text"  placeholder='Ajouter une legende' />
                      </div>  
    
                      <div className="mt-4 text-center">
                        <button
                        disabled={!selectedFile}
                          type="button"
                          className="inline-flex justify-center rounded-md border border-transparent bg-blue-400 px-4 py-2 text-sm font-medium text-white hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                          onClick={()=> uploadPost()}
                        >
                            Creer la publication
                        </button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </>
      )
}

export default Modal