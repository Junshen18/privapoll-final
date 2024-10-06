"use client"
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Filter } from 'lucide-react';
import FlickeringGrid from '@/components/ui/flickering-grid';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { ethers } from "ethers";
import { useAuth } from '@/hooks/useAuth';
import VotingABI from '../contracts/ABI.json'

const contractAddress = '0xd2B784D565a4a59f8456251621484F656c2Ef0ef';

interface VotingTopic {
  id: number;
  title: string;
  description: string;
  options: string[];
  votingTarget: boolean;
  isPublic: boolean;
}

interface VoteState {
  [topicId: number]: {
    [option: string]: number;
  };
}

const fakeTopics = [
  {
    id: 1,
    title: "Should we allow pets in the office?",
    description: "A discussion on whether pets should be allowed in the workplace.",
    options: ["Yes", "No"],
    votingTarget: false,
    isPublic: true,
  },
  {
    id: 2,
    title: "Which team-building activity do you prefer?",
    description: "Vote for your preferred team-building activity.",
    options: ["Yes", "No"],
    votingTarget: false,
    isPublic: true,
  },
  {
    id: 3,
    title: "What should be the theme for our next party?",
    description: "Choose the theme for our upcoming company party.",
    options: ["Yes", "No"],
    votingTarget: true,
    isPublic: true,
  },
];

const fakeVotes = {
  1: { Yes: 3, No: 2 },
  2: { Yes: 5, No: 0 },
  3: { Yes: 1, No: 4 },
};

export default function DisplayVotingTopics(): JSX.Element {
  const [topics, setTopics] = useState<VotingTopic[]>([]);
  const [votes, setVotes] = useState<VoteState>({});
  const [selectedTopic, setSelectedTopic] = useState<VotingTopic | null>(null);
  const [filterOption, setFilterOption] = useState('showAll');
  const [filteredTopics, setFilteredTopics] = useState(topics);
  const { verificationLevel } = useAuth(30000);
  const authority = verificationLevel == "orb" ? 1: 0; //1 for orb, 0 for device 

  useEffect(() => {
    // Initialize with fake data if localStorage is empty
    const storedTopics = localStorage.getItem('votingTopics');
    const storedVotes = localStorage.getItem('votingVotes');

    let initialTopics;
    let initialVotes;
    
    if (!storedTopics) {
      initialTopics = fakeTopics;
      localStorage.setItem('votingTopics', JSON.stringify(fakeTopics));
    } else {
      initialTopics = JSON.parse(storedTopics);
    }
    
    if (!storedVotes) {
      initialVotes = fakeVotes;
      localStorage.setItem('votingVotes', JSON.stringify(fakeVotes));
    } else {
      initialVotes = JSON.parse(storedVotes);
    }

    setTopics(initialTopics);
    setVotes(initialVotes);
    setFilteredTopics(initialTopics);
  }, []);


  const [hasVoted, setHasVoted] = useState<{ [topicId: number]: boolean }>({}); // Track voting status

  const fetchVotes = async (storedTopics: VotingTopic[]) => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, VotingABI, signer);

        // Loop through each topic and get votes for each option
        for (const topic of storedTopics) {
          const topicVotes: { [option: string]: number } = {};
          for (const option of topic.options) {
            const voteCount = await contract.getVotes(topic.id, option);
            topicVotes[option] = voteCount.toNumber(); // Convert BigNumber to number
          }
          setVotes(prevVotes => ({
            ...prevVotes,
            [topic.id]: topicVotes // Update votes state
          }));
        }
      } catch (error) {
        console.error("Error fetching votes:", error);
      }
    } else {
      alert('Please install MetaMask.');
    }
  };

  const handleVote = async (topicId: number, option: string) => {
    if (hasVoted[topicId]) {
      alert("You have already voted for this topic.");
      return; // Prevent further action if the user has already voted
    }
    if (window.ethereum) {
      try {
        // Connect to MetaMask
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = await provider.getSigner();

        // Connect to the smart contract
        const contract = new ethers.Contract(contractAddress, VotingABI, signer);
        console.log("Contract instance:", contract); // Log contract instance for debugging

        // Call the smart contract's vote function
        // const tx = await contract.vote(topicId, option);
        // console.log(tx)
        // await tx.wait(); 

        // Update local vote state after successful transaction
        setVotes(prevVotes => ({
          ...prevVotes,
          [topicId]: {
            ...prevVotes[topicId],
            [option]: prevVotes[topicId][option] + 1
          }
        }));

        setHasVoted(prevState => ({
          ...prevState,
          [topicId]: true,
        }));

        alert("Vote successfully submitted!");
      } catch (error) {
        console.error("Error submitting vote:", error);
        alert("Failed to submit vote.");
      }
    } else {
      alert('Please install MetaMask.');
    }
  };

  const calculateRatio = (topicId: number) => {
    const topicVotes = votes[topicId] || {};
    const totalVotes = Object.values(topicVotes).reduce((sum, count) => sum + (count || 0), 0);
    
    if (totalVotes === 0) return { yes: 0, no: 0 };
  
    const yesVotes = topicVotes['Yes'] || 0;
    const noVotes = topicVotes['No'] || 0;
  
    return {
      yes: Math.round((yesVotes / totalVotes) * 100),
      no: Math.round((noVotes / totalVotes) * 100)
    };
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterOption(event.target.value);
  };

  const applyFilter = () => {
    if (filterOption === 'showAll') {
      setFilteredTopics(topics); // Reset to show all topics if 'showAll' is selected
    } else if (filterOption === 'accessible') {
      const newFilteredTopics = topics.filter(topic => topic.votingTarget === false);
      setFilteredTopics(newFilteredTopics); // Show only votable topics
    }         
  };

  useEffect(() => {
    applyFilter();
  }, [filterOption, topics]);

  return (
    <div className="min-h-screen bg-background text-white p-6 justify-center items-center flex flex-col w-screen">
      <FlickeringGrid
        className="z-0 absolute inset-0 size-full"
        squareSize={4}
        gridGap={6}
        color="#6B7280"
        maxOpacity={0.5}
        flickerChance={0.1}
        height={1200}
      />
      <div className='bg-black z-10 p-10 w-[50%] rounded-xl bg-opacity-70 border border-zinc-700'>
        <div className="flex justify-between items-center mb-6">
          <a href="/" className="flex items-center text-blue-400 hover:text-blue-300">
            <ArrowLeft className="mr-2" />
            Back to Home
          </a>
          <a href="/createvote" className="flex items-center text-green-400 hover:text-green-300">
            <Plus className="mr-2" />
            Create New Topic
          </a>
        </div>
        <div className='flex justify-between items-center mb-4'>
          <h1 className="text-3xl font-bold ">Voting Topics</h1>
          <Dialog>
            <DialogTrigger asChild>
              <button 
                className="px-4 py-2 text-white rounded-lg hover:bg-gray-500"
                onClick={applyFilter}
              >
                <Filter />
              </button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Filter Options</DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                <form>
                  <div className="mb-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="filter"
                        value="showAll"
                        checked={filterOption === 'showAll'}
                        onChange={handleRadioChange}
                        className="mr-2"
                      />
                      Show All
                    </label>
                  </div>
                  <div className="mb-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="filter"
                        value="accessible"
                        checked={filterOption === 'accessible'}
                        onChange={handleRadioChange}
                        className="mr-2"
                      />
                      Show Votable by Medium Humanity
                    </label>
                  </div>
                </form>
              </div>
              <DialogClose asChild>
                <button className="px-4 py-2 rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600">
                  Filter
                </button>
              </DialogClose>
            </DialogContent>
          </Dialog>
        </div>

        {topics.length === 0 ? (
          <p className="text-gray-400">No voting topics available. Create a new one to get started!</p>
        ) : (
          <div className="space-y-6">
            {filteredTopics.map((topic) => {
                const ratio = calculateRatio(topic.id);
                const totalParticipants = Object.values(votes[topic.id]).reduce((sum, count) => sum + count, 0);
                return (
                  <Dialog key={topic.id}>
                    <DialogTrigger asChild>
                      <div
                        className="bg-gray-800 p-4 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
                        onClick={() => setSelectedTopic(topic)}
                      >
                        <h2 className="text-xl font-semibold mb-2">{topic.title}</h2>
                        <p className="text-gray-400 mb-4">{topic.description}</p>

                        {!topic.isPublic && (
                          <div className="mb-4 text-yellow-400 font-semibold">
                            Private Voting Topic
                          </div>
                        )}
                        <Progress
                          value={(((votes[topic.id]['Yes'] || 0) ?? 0) / (totalParticipants ?? 1)) * 100}
                          className={totalParticipants > 0 ? '' : 'bg-gray-300'}
                        />
                        <div className="flex justify-between mt-4">
                          <span className="text-green-400">Yes: {ratio.yes}%</span>
                          <span className="text-red-400">No: {ratio.no}%</span>
                        </div>
                      </div>
                    </DialogTrigger>
                    <DialogContent>
                      {authority >= (topic.votingTarget ? 1 : 0) ?
                        (
                          <div>
                            <DialogHeader>
                              <DialogTitle>{topic.title}</DialogTitle>
                            </DialogHeader>
                            <div className="mt-4">
                              <p className="text-gray-400 mb-4">{topic.description}</p>
                              <div className="flex flex-wrap gap-2">
                                {topic.options.map((option, index) => (
                                  <DialogClose>
                                    <button
                                      key={index}
                                      onClick={() => handleVote(topic.id, option)}
                                      className="px-4 py-2 rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600"
                                    >
                                      {option}
                                    </button>
                                  </DialogClose>
                                ))}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <DialogHeader>
                              <DialogTitle>No Access</DialogTitle>
                            </DialogHeader>
                            <div className="mt-4">
                              <p className="text-gray-400 mb-4">
                                You have no access to this voting, please verify your identity at the World Orb
                              </p>
                              <DialogClose>
                                <button 
                                  className="px-4 py-2 rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600"
                                >
                                  OK
                                </button>
                              </DialogClose>
                              <div className="flex flex-wrap gap-2">
                              </div>
                            </div>
                          </div>
                        )
                      }
                    </DialogContent>
                  </Dialog>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}