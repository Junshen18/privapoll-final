// SPDX-License-Identifier: MIT

pragma solidity ^0.8.24;

contract Voting {

    struct Event {
        string name;
        string[] candidates;
        mapping(string => uint256) votes;
        bool active;
        mapping(address => bool) hasVoted;
        mapping(address => string) voterChoice;
        uint endTime;
    }

    mapping(uint => Event) public events;
    uint public eventCount;

    // Create a new voting event
    function createEvent(string memory _name, string[] memory _candidates, uint _durationInMinutes) public {
        eventCount++;
        Event storage newEvent = events[eventCount];
        newEvent.name = _name;
        newEvent.candidates = _candidates;
        newEvent.active = true;
        newEvent.endTime = block.timestamp + (_durationInMinutes * 1 minutes);
    }

    // Vote for a candidate
    function vote(uint _eventId, string memory _candidate) public {
        Event storage votingEvent = events[_eventId];
        require(block.timestamp <= votingEvent.endTime, "Voting event has ended.");
        require(votingEvent.active, "Voting event is not active.");
        require(!votingEvent.hasVoted[msg.sender], "You have already voted.");

        bool validCandidate = false;
        for (uint i = 0; i < votingEvent.candidates.length; i++) {
            if (keccak256(abi.encodePacked(votingEvent.candidates[i])) == keccak256(abi.encodePacked(_candidate))) {
                validCandidate = true;
                break;
            }
        }
        require(validCandidate, "Invalid candidate.");

        votingEvent.votes[_candidate]++;
        votingEvent.hasVoted[msg.sender] = true;
        votingEvent.voterChoice[msg.sender] = _candidate; // Track the voter's choice

    }

    // End a voting event and reveal results
    function endEvent(uint _eventId) public {
        Event storage votingEvent = events[_eventId];
        require(block.timestamp > votingEvent.endTime, "Event is still ongoing.");
        require(votingEvent.active, "Event is already ended.");

        votingEvent.active = false;
    }

    // Get vote count for a candidate in an event
    function getVotes(uint _eventId, string memory _candidate) public view returns (uint256) {
        return events[_eventId].votes[_candidate];
    }

  function getVoterChoice(uint _eventId, address _voter) public view returns (string memory) {
        Event storage votingEvent = events[_eventId];
        require(votingEvent.hasVoted[_voter], "Voter has not voted.");
        return votingEvent.voterChoice[_voter];
    }

    // Check if event is active
    function isEventActive(uint _eventId) public view returns (bool) {
        return events[_eventId].active;
    }
    
}