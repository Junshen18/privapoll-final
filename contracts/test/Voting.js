const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");

describe("Voting", function () {
  async function deployVotingFixture() {
    const [owner, voter1, voter2] = await ethers.getSigners();

    const Voting = await ethers.getContractFactory("Voting");
    const voting = await Voting.deploy();

    return { voting, owner, voter1, voter2 };
  }

  describe("Deployment", function () {
    it("Should deploy with zero event count", async function () {
      const { voting } = await loadFixture(deployVotingFixture);
      expect(await voting.eventCount()).to.equal(0);
    });
  });

  describe("Create Event", function () {
    it("Should create a new voting event", async function () {
      const { voting } = await loadFixture(deployVotingFixture);
      await voting.createEvent("Election 2024", ["Candidate A", "Candidate B"], 60);
      expect(await voting.eventCount()).to.equal(1);
    });

    it("Should set the correct event details", async function () {
      const { voting } = await loadFixture(deployVotingFixture);
      await voting.createEvent("Election 2024", ["Candidate A", "Candidate B"], 60);
      const event = await voting.events(1);
      expect(event.name).to.equal("Election 2024");
      expect(event.active).to.be.true;
    });
  });

  describe("Voting", function () {
    it("Should allow a user to vote", async function () {
      const { voting, voter1 } = await loadFixture(deployVotingFixture);
      await voting.createEvent("Election 2024", ["Candidate A", "Candidate B"], 60);
      await voting.connect(voter1).vote(1, "Candidate A");
      expect(await voting.getVotes(1, "Candidate A")).to.equal(1);
    });

    it("Should not allow voting twice", async function () {
      const { voting, voter1 } = await loadFixture(deployVotingFixture);
      await voting.createEvent("Election 2024", ["Candidate A", "Candidate B"], 60);
      await voting.connect(voter1).vote(1, "Candidate A");
      await expect(voting.connect(voter1).vote(1, "Candidate B")).to.be.revertedWith("You have already voted.");
    });

    it("Should not allow voting for an invalid candidate", async function () {
      const { voting, voter1 } = await loadFixture(deployVotingFixture);
      await voting.createEvent("Election 2024", ["Candidate A", "Candidate B"], 60);
      await expect(voting.connect(voter1).vote(1, "Candidate C")).to.be.revertedWith("Invalid candidate.");
    });

    it("Should not allow voting after event has ended", async function () {
      const { voting, voter1 } = await loadFixture(deployVotingFixture);
      await voting.createEvent("Election 2024", ["Candidate A", "Candidate B"], 1);
      await time.increase(time.duration.minutes(2));
      await expect(voting.connect(voter1).vote(1, "Candidate A")).to.be.revertedWith("Voting event has ended.");
    });
  });

  describe("End Event", function () {
    it("Should end the event after the duration", async function () {
      const { voting } = await loadFixture(deployVotingFixture);
      await voting.createEvent("Election 2024", ["Candidate A", "Candidate B"], 1);
      await time.increase(time.duration.minutes(2));
      await voting.endEvent(1);
      expect(await voting.isEventActive(1)).to.be.false;
    });

    it("Should not end the event before the duration", async function () {
      const { voting } = await loadFixture(deployVotingFixture);
      await voting.createEvent("Election 2024", ["Candidate A", "Candidate B"], 60);
      await expect(voting.endEvent(1)).to.be.revertedWith("Event is still ongoing.");
    });
  });

  describe("Get Voter Choice", function () {
    it("Should return the correct voter choice", async function () {
      const { voting, voter1 } = await loadFixture(deployVotingFixture);
      await voting.createEvent("Election 2024", ["Candidate A", "Candidate B"], 60);
      await voting.connect(voter1).vote(1, "Candidate A");
      expect(await voting.getVoterChoice(1, voter1.address)).to.equal("Candidate A");
    });

    it("Should revert if the voter has not voted", async function () {
      const { voting, voter1 } = await loadFixture(deployVotingFixture);
      await voting.createEvent("Election 2024", ["Candidate A", "Candidate B"], 60);
      await expect(voting.getVoterChoice(1, voter1.address)).to.be.revertedWith("Voter has not voted.");
    });
  });
});