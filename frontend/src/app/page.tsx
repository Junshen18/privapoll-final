"use client"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRectangleList, faSquarePollVertical } from '@fortawesome/free-solid-svg-icons'
import FlickeringGrid from "@/components/ui/flickering-grid";
import { useRouter } from "next/navigation";
import Navbar from '@/components/navbar';
import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';

export default function Home() {

  
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        // User is logged in, stay on the page
      } else {
        router.push('/welcome');
      }
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <div className="w-full h-screen relative  bg-background overflow-hidden">

      <FlickeringGrid
        className="z-0 absolute inset-0 size-full"
        squareSize={4}
        gridGap={6}
        color="#6B7280"
        maxOpacity={0.5}
        flickerChance={0.1}
        height={1200}
        width={2000}
      />
      
      <div className="flex flex-row justify-center items-center h-full w-full">
        <div className="z-[1] group cursor-pointer my-3 mx-5 w-72 h-96 text-2xl border border-white bg-black bg-opacity-55 rounded-xl flex flex-col gap-5 justify-center items-center shadow-lg shadow-neutral-500 transition-all hover:shadow-neutral-300 hover:-translate-y-1"
          onClick={()=>{
            router.push('/createvote');
          }}
        >
          <div className="font-bold">
            Create Vote
          </div>
          <FontAwesomeIcon icon={faSquarePollVertical} className="text-5xl group-hover:animate-bounce" />
        </div>
        {/* <div className="z-[1] group cursor-pointer my-3 mx-5 w-72 h-96 text-2xl border border-white bg-black bg-opacity-55 rounded-xl flex flex-col gap-5 justify-center items-center shadow-lg shadow-neutral-500 transition-all hover:shadow-neutral-300 hover:-translate-y-1">
          <div className="font-bold">
            Vote Others
          </div>
          <FontAwesomeIcon icon={faUser} className="text-5xl group-hover:animate-bounce" />
        </div> */}
        <div className="z-[1] group cursor-pointer my-3 mx-5 w-72 h-96 text-2xl border border-white bg-black bg-opacity-55 rounded-xl flex flex-col gap-5 justify-center items-center shadow-lg shadow-neutral-500 transition-all hover:shadow-neutral-300 hover:-translate-y-1"
        onClick={()=>{
          router.push('/votinglists');
        }}
        >
          <div className="font-bold">
            Voting Lists
          </div>
          <FontAwesomeIcon icon={faRectangleList} className="text-5xl group-hover:animate-bounce" />
        </div>
      </div>
    </div>
    </>
  );
}
