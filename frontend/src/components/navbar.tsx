'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React from 'react'
import { useAuth } from '@/hooks/useAuth';

const Navbar = () => {
    const router = useRouter();
    const { isAuthenticated, verificationLevel, nullifierHash, isLoading, refreshAuth } = useAuth(30000);

    if (isLoading) {
        return <div>Loading...</div>; // Or some loading spinner
    }

    return (
        <nav className="z-10 px-10 top-0 w-full h-[100px] flex justify-between items-center absolute bg-black bg-opacity-55">
            <div className='cursor-pointer' onClick={() => router.push('/welcome')}>
                <Image src="/privapoll.svg" alt='logo' width={200} height={50} />
            </div>
            <div className="absolute right-4 flex gap-2 items-center justify-center space-x-2 z-[1]">
                {isAuthenticated && verificationLevel && nullifierHash ? (
                    <div className='bg-black px-3 py-2 rounded-full flex items-center'>
                        <div className='rounded-full w-[60px] h-[60px] bg-[url("/profile-pic.jpeg")] bg-cover mr-3' />
                        <div className='flex flex-col'>
                            <span className="font-semibold text-lg text-white truncate w-[200px]">{nullifierHash}</span>
                            <span className='font-light text-base text-white'>Humanity level: {verificationLevel === 'orb' ? 'High' : 'Medium'}</span>
                        </div>
                    </div>
                ) : (
                    <button 
                        className='border-white border text-white px-5 py-2 rounded-3xl bg-black hover:bg-white hover:text-black transition-all'
                        onClick={() => router.push('/login')}
                    >
                        Verify with World ID
                    </button>
                )}
            </div>
        </nav>
    )
}

export default Navbar