'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useAuth } from '@/hooks/useAuth';
import { ChevronDown, LogOut } from 'lucide-react';

const Navbar = () => {
    const router = useRouter();
    const { isAuthenticated, verificationLevel, nullifierHash, isLoading, logout } = useAuth(30000);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <nav className="z-10 px-10 top-0 w-full h-[100px] flex justify-between items-center absolute bg-black bg-opacity-55">
            <div className='cursor-pointer' onClick={() => router.push('/welcome')}>
                <Image src="/privapoll.svg" alt='logo' width={200} height={50} />
            </div>
            <div className="absolute right-4 flex gap-2 items-center justify-center space-x-2 z-[1]">
                {isAuthenticated && verificationLevel && nullifierHash ? (
                    <div className='relative'>
                        <button 
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            className='bg-black px-3 py-2 rounded-full flex items-center'
                        >
                            <div className='rounded-full w-[60px] h-[60px] bg-[url("/profile-pic.png")] bg-cover mr-3' />
                            <div className='flex flex-col mr-2'>
                                <span className="font-semibold text-lg text-white truncate w-[150px]">{nullifierHash}</span>
                                <span className='font-light text-base text-white'>Humanity level: {verificationLevel}</span>
                            </div>
                            <ChevronDown className="text-white" />
                        </button>
                        {dropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                    <button
                                        onClick={()=>{
                                          logout()
                                          router.push('/login')                                          
                                        }}
                                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                                        role="menuitem"
                                    >
                                        <LogOut className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
                                        Logout
                                    </button>
                                </div>
                            </div>
                        )}
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