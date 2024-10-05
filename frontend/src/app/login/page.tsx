'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { IDKitWidget, VerificationLevel, ISuccessResult } from '@worldcoin/idkit'

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [verification, setVerification] = useState<"device" | "orb">("device");
  const onSuccess = (result: ISuccessResult) => {
    console.log("Success:", result);
  };
  const handleVerify = async (proof: ISuccessResult) => {
    const res = await fetch("/api/verify", { // route to your backend will depend on implementation
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(proof),
    })
    if (!res.ok) {
        throw new Error("Verification failed."); // IDKit will display the error message to the user in the modal
    }
    const data = await res.json();
    setVerification(data.verified ? "device" : "orb");
};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black">
      <div className="flex flex-col lg:flex-row justify-between w-full max-w-7xl px-8">
        {/* Left side: Logo */}
        <div className="flex-1 flex items-center justify-center">
          <Image 
            src="/assets/twitter-clone-logo.avif" 
            alt="Twitter Clone Logo" 
            width={700} 
            height={700} 
            className="max-w-full"
          />
        </div>

        {/* Right side: Login form */}
        <div className="flex-1 flex flex-col items-center justify-center text-white">
          <h1 className="text-center text-7xl font-extrabold mb-8" style={{ fontFamily: "neue-machina-bold" }}>
            Happening now
          </h1>
          <p className="text-4xl font-bold mb-12" style={{ fontFamily: "neue-machina-light" }}>
            Join today.
          </p>
          
          {error && <p className="text-red-500 mb-4">{error}</p>}

          {/* <button
            onClick={handleLogin}
            className="relative bg-white font-bold py-2 px-4 rounded-full w-72 overflow-hidden group"
          >
            <span className="relative z-10 bg-gradient-to-r from-indigo-500 via-pink-300 to-orange-300 text-transparent bg-clip-text group-hover:text-white transition-colors duration-500">
              Sign Up with WorldID
            </span>
            
            <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-pink-300 to-orange-300 transition-transform duration-500 transform translate-x-full group-hover:translate-x-0 z-0"></span>
          </button> */}

        <IDKitWidget
            app_id="app_4f852b1b848a534e9e09afae67983910" // obtained from the Developer Portal
            action="anonymous-vote" // obtained from the Developer Portal
            onSuccess={onSuccess} // callback when the modal is closed
            handleVerify={handleVerify} // callback when the proof is received
            verification_level={VerificationLevel.Device}
        >
            {({ open }) => 
                // This is the button that will open the IDKit modal
                <button onClick={open}>Verify with World ID</button>
            }
        </IDKitWidget>
          

        </div>
      </div>
      <footer className="text-center text-white py-8">
        <div className="font-neue-machina font-light">
          <p>PrivaPoll for <a href="https://www.2024.ethkl.org/" target="_blank" className="text-blue-300 hover:underline">ETHKL2024</a></p>
          <p>© PrivaPoll </p>
        </div>
      </footer>
    </div>
  );
}
