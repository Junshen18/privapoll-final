"use client"
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from 'next/navigation';

const LandingPage = () => {

  const router = useRouter();

  //loginRoute function will route to /login
  const loginRoute = () => {
    router.push('/login');
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-black text-white">
      
      <main className="container mx-auto">
        <section className="pt-16 pb-24 flex flex-col mb-12 border-b-2 border-white h-[80vh]">
          <h2 className="text-8xl mb-4 font-main font-lighttracking-wide leading-tight">The <br /> <span className='italic bg-gradient-to-r from-blue-800 to-blue-400 px-8 py-4'>Decentralised</span> <br />Voting Platform</h2>
          
          <div className="flex items-center justify-end mb-24">
          <p className="text-3xl font-main tracking-tighter w-1/2">
            Utilising World ID Solution and MACI Framework to ensure fairness and integrity in online voting.
          </p>
            <button className='px-16 py-8 font-bold font-main bg-gradient-to-r from-blue-900 to-blue-700 text-white border-white border-2 hover:brightness-110 transition' onClick={() => loginRoute()}>TRY NOW</button>
          </div>
        </section>

        <section className="py-24 mt-12">
  <div className="container mx-auto px-4">
    <h3 className="text-5xl font-semibold font-main mb-20 text-center">
      <span className='bg-gradient-to-r from-blue-900 to-blue-400 underline px-4 py-2 rounded-lg'>Problems</span> We Solve
    </h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <Card className="bg-blue-800 border-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-bold font-main -tracking-tight">Polling Privacy</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">Protecting user data and voting choices from unauthorized access. <span className='p-2 italic underline'>Only you know your vote</span>. Powered by Minimal Anti Collusion Infrastructure.</p>
        </CardContent>
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl font-bold font-main -tracking-tight">Manipulated Votes</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">Preventing fake votes and ensuring fair, unbiased polling results. Sybils are detected through worldcoin filtering, evaluating of onchain scores</p>
        </CardContent>
      </Card>
    </div>
  </div>
</section>

<section className="py-24">
  <div className="container mx-auto px-4">
    <h3 className="text-5xl font-semibold font-main mb-20 text-center">
      Our <span className='bg-gradient-to-r from-blue-900 to-blue-400 underline px-4 py-2 rounded-lg'>Solution</span>
    </h3>
    <div className="max-w-3xl mx-auto">
      <Card className="bg-blue-800 border-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl">Decentralised Voting Platform</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 text-lg">
            <li>World ID Solution for secure user verification</li>
            <li>MACI Framework to ensure vote integrity</li>
            <li>Transparent and auditable voting process</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  </div>
</section>

<section className="py-24">
  <div className="container mx-auto px-4">
    <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden">
      <video 
        className="w-full h-full object-cover"
        controls
      >
        <source src="/path-to-your-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  </div>
</section>
      </main>
      
      <footer className="container mx-auto py-8 text-center">
        <p>&copy; 2024 PrivaPoll. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;