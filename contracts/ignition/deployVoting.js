const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("DeployVoting", (m) => {
  const votingModule = m.useModule("VotingModule");
  return { voting: votingModule.voting };
});