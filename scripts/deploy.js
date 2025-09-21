// async function main() {
//   const Escrow = await ethers.getContractFactory("Escrow");
//   const escrow = await Escrow.deploy(process.env.FREELANCER_WALLET);
//   console.log("Escrow deployed to:", escrow.address);
// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

// scripts/deploy.js
require("dotenv").config();
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contract with account:", deployer.address);

  const freelancerAddress = process.env.FREELANCER_WALLET;
  const Escrow = await hre.ethers.getContractFactory("Escrow");
  const escrow = await Escrow.deploy(freelancerAddress);

  await escrow.deployed();
  console.log("Escrow deployed to:", escrow.address);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});