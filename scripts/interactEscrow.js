// const ethers = require("ethers");
// require("dotenv").config();
// const readline = require("readline-sync");

// const CONTRACT_ADDRESS = "0x1947C458763ee9a7A08BADdE846F7C1575D87064"; // replace with your deployed contract

// // ABI for Escrow contract
// const EscrowABI = [
//   "function deposit() public payable",
//   "function release() public",
//   "function refund() public",
//   "function client() public view returns (address)",
//   "function freelancer() public view returns (address)",
//   "function isFunded() public view returns (bool)",
//   "function amount() public view returns (uint256)"
// ];

// async function main() {
//   // Connect to Shardeum Unstablenet
//   const provider = new ethers.providers.JsonRpcProvider("https://api-unstable.shardeum.org");
//   const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

//   console.log("Your account:", wallet.address);

//   // Display wallet balance
//   const balance = await wallet.getBalance();
//   console.log("Your wallet balance:", ethers.utils.formatEther(balance), "SHM");

//   // Connect to contract
//   const escrow = new ethers.Contract(CONTRACT_ADDRESS, EscrowABI, wallet);

//   // Display roles
//   const client = await escrow.client();
//   const freelancer = await escrow.freelancer();
//   console.log("Client:", client);
//   console.log("Freelancer:", freelancer);

//   // Display funded status and amount
//   const funded = await escrow.isFunded();
//   const amount = await escrow.amount();
//   console.log("Contract funded:", funded);
//   console.log("Amount in escrow:", ethers.utils.formatEther(amount), "SHM");

//   // Interactive menu
//   console.log("\nSelect an action:");
//   console.log("1. Deposit funds (client only)");
//   console.log("2. Release funds (client only)");
//   console.log("3. Refund funds (freelancer only)");
//   const choice = readline.question("Enter 1, 2, or 3: ");

//   if (choice === "1") {
//     if (wallet.address.toLowerCase() !== client.toLowerCase()) {
//       console.log("Only the client can deposit!");
//       return;
//     }
//     if (funded) {
//       console.log("Contract is already funded.");
//       return;
//     }

//     const depositAmount = readline.question("Enter amount to deposit (in SHM): ");
//     if (isNaN(depositAmount) || Number(depositAmount) <= 0) {
//       console.log("Invalid deposit amount!");
//       return;
//     }

//     try {
//       console.log(`Depositing ${depositAmount} SHM...`);
//       const depositTx = await escrow.deposit({ value: ethers.utils.parseEther(depositAmount) });
//       await depositTx.wait();
//       console.log(`Deposited ${depositAmount} SHM successfully!`);
//     } catch (err) {
//       console.error("Deposit failed:", err.message);
//     }

//   } else if (choice === "2") {
//     if (wallet.address.toLowerCase() !== client.toLowerCase()) {
//       console.log("Only the client can release funds!");
//       return;
//     }
//     if (!funded) {
//       console.log("No funds to release!");
//       return;
//     }

//     try {
//       console.log("Releasing funds...");
//       const releaseTx = await escrow.release();
//       await releaseTx.wait();
//       console.log("Funds released to freelancer successfully!");
//     } catch (err) {
//       console.error("Release failed:", err.message);
//     }

//   } else if (choice === "3") {
//     if (wallet.address.toLowerCase() !== freelancer.toLowerCase()) {
//       console.log("Only the freelancer can refund funds!");
//       return;
//     }
//     if (!funded) {
//       console.log("No funds to refund!");
//       return;
//     }

//     try {
//       console.log("Refunding funds...");
//       const refundTx = await escrow.refund();
//       await refundTx.wait();
//       console.log("Funds refunded to client successfully!");
//     } catch (err) {
//       console.error("Refund failed:", err.message);
//     }

//   } else {
//     console.log("Invalid choice.");
//   }

//   // Display updated wallet balance after transaction
//   const newBalance = await wallet.getBalance();
//   console.log("Updated wallet balance:", ethers.utils.formatEther(newBalance), "SHM");
// }

// main()
//   .then(() => process.exit(0))
//   .catch(err => {
//     console.error(err);
//     process.exit(1);
//   });

// scripts/interactEscrow.js
// require("dotenv").config();
// const ethers = require("ethers");
// const readline = require("readline-sync");
// const EscrowABI = require("../artifacts/contracts/Escrow.sol/Escrow.json").abi;

// const CONTRACT_ADDRESS = process.env.REACT_APP_ESCROW_CONTRACT;

// async function main() {
//   const provider = new ethers.providers.JsonRpcProvider(process.env.REACT_APP_SHARDEUM_RPC);
//   const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

//   console.log("Your account:", wallet.address);
//   const escrow = new ethers.Contract(CONTRACT_ADDRESS, EscrowABI, wallet);

//   const client = await escrow.client();
//   const freelancer = await escrow.freelancer();
//   const funded = await escrow.isFunded();
//   const amount = await escrow.amount();

//   console.log("Client:", client);
//   console.log("Freelancer:", freelancer);
//   console.log("Contract funded:", funded);
//   console.log("Amount in escrow:", ethers.utils.formatEther(amount), "SHM");

//   console.log("\nSelect an action:");
//   console.log("1. Deposit funds (client only)");
//   console.log("2. Release funds (client only)");
//   console.log("3. Refund funds (freelancer only)");
//   const choice = readline.question("Enter 1, 2, or 3: ");

//   if (choice === "1") {
//     if (wallet.address.toLowerCase() !== client.toLowerCase()) return console.log("Only client can deposit!");
//     if (funded) return console.log("Contract is already funded.");

//     const depositAmount = readline.question("Enter amount to deposit (in SHM): ");
//     const tx = await escrow.deposit({ value: ethers.utils.parseEther(depositAmount) });
//     await tx.wait();
//     console.log(`Deposited ${depositAmount} SHM successfully!`);
//   } 
//   else if (choice === "2") {
//     if (wallet.address.toLowerCase() !== client.toLowerCase()) return console.log("Only client can release funds!");
//     if (!funded) return console.log("No funds to release!");

//     const tx = await escrow.release();
//     await tx.wait();
//     console.log("Funds released to freelancer successfully!");
//   } 
//   else if (choice === "3") {
//     if (wallet.address.toLowerCase() !== freelancer.toLowerCase()) return console.log("Only freelancer can refund funds!");
//     if (!funded) return console.log("No funds to refund!");

//     const tx = await escrow.refund();
//     await tx.wait();
//     console.log("Funds refunded to client successfully!");
//   } 
//   else {
//     console.log("Invalid choice.");
//   }
// }

// main().catch(err => console.error(err));

// scripts/interactEscrow.js
const ethers = require("ethers");
require("dotenv").config();
const readline = require("readline-sync");

// Load environment variables
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const FREELANCER_WALLET = process.env.FREELANCER_WALLET;
const RPC_URL = process.env.REACT_APP_SHARDEUM_RPC;
const CONTRACT_ADDRESS = process.env.REACT_APP_ESCROW_CONTRACT;

// Import ABI
const EscrowABI = require("../artifacts/contracts/Escrow.sol/Escrow.json").abi;

async function main() {
  // Connect to Shardeum RPC
  const provider = new ethers.providers.JsonRpcProvider(RPC_URL);
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

  console.log("Your account:", wallet.address);

  // Connect to Escrow contract
  const escrow = new ethers.Contract(CONTRACT_ADDRESS, EscrowABI, wallet);

  // Fetch contract state
  const client = await escrow.client();
  const freelancer = await escrow.freelancer();
  const funded = await escrow.isFunded();
  const amount = await escrow.amount();

  console.log("Wallet balance:", ethers.utils.formatEther(await wallet.getBalance()), "SHM");
  console.log("Client:", client);
  console.log("Freelancer:", freelancer);
  console.log("Contract funded:", funded);
  console.log("Amount in escrow:", ethers.utils.formatEther(amount), "SHM");

  // User menu
  console.log("\nSelect an action:");
  console.log("1. Deposit funds (client only)");
  console.log("2. Release funds (client only)");
  console.log("3. Refund funds (freelancer only)");

  const choice = readline.question("Enter 1, 2, or 3: ");

  if (choice === "1") {
    if (wallet.address.toLowerCase() !== client.toLowerCase()) {
      console.log("Only the client can deposit!");
      return;
    }
    if (funded) {
      console.log("Contract is already funded.");
      return;
    }
    const depositAmount = readline.question("Enter amount to deposit (in SHM): ");
    const tx = await escrow.deposit({ value: ethers.utils.parseEther(depositAmount) });
    await tx.wait();
    console.log(`Deposited ${depositAmount} SHM successfully!`);
    console.log("Updated wallet balance:", ethers.utils.formatEther(await wallet.getBalance()), "SHM");

  } else if (choice === "2") {
    if (wallet.address.toLowerCase() !== client.toLowerCase()) {
      console.log("Only the client can release funds!");
      return;
    }
    if (!funded) {
      console.log("No funds to release!");
      return;
    }
    const tx = await escrow.release();
    await tx.wait();
    console.log("Funds released to freelancer successfully!");
    console.log("Updated wallet balance:", ethers.utils.formatEther(await wallet.getBalance()), "SHM");

  } else if (choice === "3") {
    if (wallet.address.toLowerCase() !== freelancer.toLowerCase()) {
      console.log("Only the freelancer can refund funds!");
      return;
    }
    if (!funded) {
      console.log("No funds to refund!");
      return;
    }
    const tx = await escrow.refund();
    await tx.wait();
    console.log("Funds refunded to client successfully!");
    console.log("Updated wallet balance:", ethers.utils.formatEther(await wallet.getBalance()), "SHM");

  } else {
    console.log("Invalid choice.");
  }
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error("Error:", err);
    process.exit(1);
  });