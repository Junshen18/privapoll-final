const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("VotingModule", (m) => {
  // Parameters for creating an initial voting event
  const eventName = m.getParameter("eventName", "Initial Election");
  const candidates = m.getParameter("candidates", ["Candidate A", "Candidate B"]);
  const durationInMinutes = m.getParameter("durationInMinutes", 60); // 1 hour by default

  // Deploy the Voting contract
  const voting = m.contract("Voting");

  // Create an initial voting event after deployment
  m.call(voting, "createEvent", [eventName, candidates, durationInMinutes]);

  return { voting };
});