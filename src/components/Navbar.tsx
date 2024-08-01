import Image from 'next/image'
import React from 'react'
import  netflixImage from "../../public/netflixWhite-removebg-preview (1).png"
import { useRouter } from 'next/navigation';
interface NavbarProps {
    signUp: boolean;
  }



const Navbar: React.FC<NavbarProps> = ({ signUp }) => {
  const router = useRouter()
  const changeToSignIn = () => {
    router.push('/sign-in')
} 
const changeToSignUp = () => {
  router.push('/sign-up')
} 
  return (
    <div className='mt-5 '>
        <div className=' flex justify-around'>
            <div>
                <Image 
                    src={netflixImage} 
                    alt='netflix' 
                    className='w-[90px] md:h-[45px] sm:h-[35px]   sm:w-[100px] md:w-[150px]' 
                />
            </div>
            <div>
            {signUp?
                <button onClick={changeToSignIn} className='md:px-3 md:py-[5px] px-1 py-[1.5px] sm-px-2 sm-py-[3.5px] rounded-[4px] bg-red-800 text-white'>Sign In</button>
                :
                <button onClick={changeToSignUp} className='lg:px-3 lg:py-[5px] rounded-[4px] bg-red-800 text-white'>Sign Up</button>
            }
            </div>
        </div>
    </div>
  )
}

export default Navbar