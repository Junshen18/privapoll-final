"use client";
import React, { useEffect, useState } from 'react';
import { ArrowLeft, Plus, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import FlickeringGrid from '@/components/ui/flickering-grid';
import { ethers } from "ethers";
import VotingABI from '../contracts/ABI.json'
import { useAuth } from '@/hooks/useAuth';

const contractAddress = '0xd2B784D565a4a59f8456251621484F656c2Ef0ef';

export default function CreateVotingTopic() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState(['']);
  const [deadline, setDeadline] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [votingTarget, setVotingTarget] = useState(true);
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();
  const [yesVotesCount, setYesVotesCount] = useState(0);
  const [noVotesCount, setNoVotesCount] = useState(0);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null;
  }


  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  const handleAddOption = () => {
    setOptions([...options, '']);
  };

  const handleRemoveOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
  };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const filteredOptions = options.filter(opt => opt.trim() !== '');
    const newTopic = {
      id: Date.now(), // Generate a new ID
      title,
      description,
      options: filteredOptions,
      deadline,
      isPublic,
      votingTarget,
    };

    // Get existing topics and votes from localStorage
    const existingTopics = JSON.parse(localStorage.getItem('votingTopics') || '[]');
    const existingVotes = JSON.parse(localStorage.getItem('votingVotes') || '{}');

    // Initialize votes for the new topic
    const newVotes = {
      ...existingVotes,
      [newTopic.id]: filteredOptions.reduce((acc, option) => {
        acc[option] = 0;
        return acc;
      }, {} as { [key: string]: number })
    };

    // Update localStorage
    localStorage.setItem('votingTopics', JSON.stringify([...existingTopics, newTopic]));
    localStorage.setItem('votingVotes', JSON.stringify(newVotes));

    if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum)

          await provider.send("eth_requestAccounts", []);
          const signer = await provider.getSigner();

            const votingContract = new ethers.Contract(contractAddress, VotingABI, signer);

            const tx = await votingContract.createEvent(title, filteredOptions, 30); 
            await tx.wait();

            alert('Vote created successfully on the blockchain!');
            
            setTitle('');
            setDescription('');
            setOptions(['']);
        } catch (error) {
            console.error('Error creating vote:', error);
            alert('Failed to create vote.');
        }
    } else {
        alert('Please install MetaMask.');
    }
  router.push('/votinglists')
};



  return (
    <div className="min-h-screen bg-background text-white p-6 justify-center items-center flex flex-col w-full">
      <FlickeringGrid
        className="z-0 absolute inset-0 size-full"
        squareSize={4}
        gridGap={6}
        color="#6B7280"
        maxOpacity={0.5}
        flickerChance={0.1}
      />
      <div className='bg-black z-10 p-10 rounded-xl bg-opacity-70 border border-zinc-700'>
        <button className="mb-6 flex items-center text-gray-400 hover:text-gray-300"
          onClick={() => {
            router.back();
          }}>
          <ArrowLeft className="mr-2" />
          Back
        </button>

        <h1 className="text-3xl font-bold mb-6">Create a New Voting Topic</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="title" className="block mb-2">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 bg-gray-800 rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="description" className="block mb-2">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 bg-gray-800 rounded"
              rows={3}
            />
          </div>

          <div>
            <label htmlFor="deadline" className="block mb-2">Voting Deadline</label>
            <input
              id="deadline"
              type="datetime-local"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full p-2 bg-gray-800 rounded"
              required
            />
          </div>

          <div>
            <label className="block mb-2">Visibility</label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="public"
                  checked={isPublic}
                  onChange={() => setIsPublic(true)}
                  className="mr-2"
                />
                Public
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="private"
                  checked={!isPublic}
                  onChange={() => setIsPublic(false)}
                  className="mr-2"
                />
                Private
              </label>
            </div>
          </div>

          <div>
            <label className="block mb-2">Exclusive for high humanity user?</label>
            <div className='flex space-x-4 gap-3'>
                <label className="flex items-center">
                    <input
                        type='radio'
                        value="Yes"
                        onChange={() => setVotingTarget(true)}
                        checked={votingTarget}
                        className="mr-2"
                    />
                    Yes
                </label>
                <label className="flex items-center">
                    <input
                        type='radio'
                        value="No"
                        onChange={() => setVotingTarget(false)}
                        checked={!votingTarget}
                        className="mr-2"
                    />
                    No
                </label>
            </div>
            
            
          </div>

          <div>
            <label className="block mb-2">Vote Options</label>
            {options.map((option, index) => (
              <div key={index} className="flex mb-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="flex-grow p-2 bg-gray-800 rounded-l"
                  placeholder={`Option ${index + 1}`}
                  required
                />
                <button
                  type="button"
                  onClick={() => handleRemoveOption(index)}
                  className="bg-red-600 p-2 rounded-r"
                >
                  <X size={20} />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddOption}
              className="mt-2 flex items-center text-green-400 hover:text-green-300"
            >
              <Plus size={20} className="mr-2" />
              Add Option
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-500 p-2 rounded font-bold"
          >
            Create Topic
          </button>
        </form>
      </div>
    </div>
  );
}