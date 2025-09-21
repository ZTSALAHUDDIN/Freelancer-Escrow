const ethers = require("ethers");  // plain Ethers.js
require("dotenv").config();

const CONTRACT_ADDRESS = "0x1947C458763ee9a7A08BADdE846F7C1575D87064";

// Paste ABI from your compiled Escrow contract
const EscrowABI = [
  "function deposit() public payable",
  "function release() public",
  "function refund() public",
  "function client() public view returns (address)",
  "function freelancer() public view returns (address)",
  "function isFunded() public view returns (bool)",
  "function amount() public view returns (uint256)"
];

async function main() {
  // Connect directly to Shardeum Unstablenet RPC
  const provider = new ethers.providers.JsonRpcProvider("https://api-unstable.shardeum.org");
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  console.log("Client account:", wallet.address);

  // Connect to the contract
  const escrow = new ethers.Contract(CONTRACT_ADDRESS, EscrowABI, wallet);

  // Check if funded
  const funded = await escrow.isFunded();
  console.log("Contract funded status:", funded);

  // Deposit if not funded
  if (!funded) {
    console.log("Depositing 0.01 SHM...");
    const depositTx = await escrow.deposit({ value: ethers.utils.parseEther("0.01") });
    await depositTx.wait();
    console.log("Deposit successful!");
  } else {
    console.log("Deposit skipped, already funded.");
  }

  // Release funds
  try {
    console.log("Releasing funds...");
    const releaseTx = await escrow.release();
    await releaseTx.wait();
    console.log("Funds released successfully!");
  } catch (err) {
    console.error("Release failed:", err.message);
  }
}

main()
  .then(() => process.exit(0))
  .catch(err => {
    console.error(err);
    process.exit(1);
  });