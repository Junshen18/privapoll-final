'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';
import { IDKitWidget, VerificationLevel, ISuccessResult } from '@worldcoin/idkit'
import RetroGrid from '@/components/ui/retro-grid';

export default function Login() {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
    
  const [userId, setUserId] = useState<string | null>(null);
  const [verification, setVerification] = useState<"device" | "orb">("device");

  

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, isLoading, router]);

  const onSuccess = (result: ISuccessResult) => {
    console.log("Success:", result);
    setUserId(result.nullifier_hash); //set user id
    console.log("user id:",userId);
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
    router.push('/');
};

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-black">
      <RetroGrid  className='stroke-white'/>
      <IDKitWidget
          app_id="app_4f852b1b848a534e9e09afae67983910" // obtained from the Developer Portal
          action="anonymous-vote" // obtained from the Developer Portal
          onSuccess={onSuccess} // callback when the modal is closed
          handleVerify={handleVerify} // callback when the proof is received
          verification_level={VerificationLevel.Device}
      >
          {({ open }) => 
              // This is the button that will open the IDKit modal
              <div onClick={open} className='group transition-all flex flex-col justify-center items-center gap-2 p-10 hover:bg-white rounded-full cursor-pointer hover:shadow-lg hover:shadow-white hover:sha'>
                <Image src='/worldcoin-logo.svg' alt='worldcoin' height='100' width='100' className='group-hover:filter group-hover:invert'/>
                <span className='group-hover:text-black'>
                  Verify with World ID
                </span>
              </div>
          }
      </IDKitWidget>
          
    </div>
      
      
  );
}
