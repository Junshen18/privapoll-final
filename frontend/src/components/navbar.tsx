'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React from 'react'


const Navbar = () => {
    const humanityLevel = "Medium";
    const router = useRouter();
  return (
    <nav className="z-10 px-5 top-0 w-full h-[100px] flex justify-between items-center absolute bg-black bg-opacity-55">
        <div className='cursor-pointer' onClick={()=>{
          router.push('/welcome')
        }}>
          <Image src="/privapoll.svg" alt='logo' width='200' height='50'/>
        </div>  
      {/* User Icon and Username */}
      <div className="absolute right-4 top-4 flex gap-2 items-center space-x-2 bg-black z-[1] px-3 py-2 rounded-full">
        <div className='rounded-full w-[60px] h-[60px] bg-[url("/profile-pic.jpeg")] bg-cover' />
        <div className='w-[200px] flex flex-col'>
            <span className="font-semibold text-lg truncate w-[200px]">0x0339861e70a9bdb6b01a88c7534a3332db915d3d06511b79a5724221a6958fbe</span>
            <span className='font-light text-base'>Humanity level: {humanityLevel}</span>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
