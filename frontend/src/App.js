// import { useState } from "react";
// import { ethers } from "ethers";
// import EscrowABI from "./Escrow.json";
// import DepositButton from "./components/DepositButton";
// import ReleaseButton from "./components/ReleaseButton";
// import RefundButton from "./components/RefundButton";

// // ✅ Use checksummed contract address directly
// const contractAddress = "0x1947C458763ee9a7A08BADdE846F7C1575D87064";

// // Export contract for components
// export let escrowContract = null;

// function App() {
//   const [account, setAccount] = useState("");
//   const [balance, setBalance] = useState("0");
//   const [client, setClient] = useState("");
//   const [freelancer, setFreelancer] = useState("");
//   const [funded, setFunded] = useState(false);
//   const [amount, setAmount] = useState("0");
//   const [contract, setContract] = useState(null);

//   // Connect wallet and contract
//   async function connectWallet() {
//     if (!window.ethereum) return alert("MetaMask not detected");

//     try {
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       await provider.send("eth_requestAccounts", []);
//       const signer = provider.getSigner();
//       const address = await signer.getAddress();
//       setAccount(address);

//       // Wallet balance
//       const bal = await provider.getBalance(address);
//       setBalance(ethers.utils.formatEther(bal));

//       // Contract instance
//       const escrowContractInstance = new ethers.Contract(contractAddress, EscrowABI.abi, signer);
//       setContract(escrowContractInstance);
//       escrowContract = escrowContractInstance; // make global for components

//       // Contract state
//       const clientAddr = await escrowContractInstance.client();
//       const freelancerAddr = await escrowContractInstance.freelancer();
//       const isFunded = await escrowContractInstance.isFunded();
//       const amt = await escrowContractInstance.amount();

//       setClient(clientAddr);
//       setFreelancer(freelancerAddr);
//       setFunded(isFunded);
//       setAmount(ethers.utils.formatEther(amt));
//     } catch (err) {
//       console.error(err);
//       alert("Failed to connect wallet: " + err.message);
//     }
//   }

//   // Refresh wallet balance
//   async function refreshBalance() {
//     if (!account) return;
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     const bal = await provider.getBalance(account);
//     setBalance(ethers.utils.formatEther(bal));
//   }

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial" }}>
//       <h1>Freelancer Escrow DApp</h1>

//       <button onClick={connectWallet}>Connect Wallet</button>
//       <p>Connected account: {account || "Not connected"}</p>
//       <p>Wallet balance: {balance} SHM</p>
//       <p>Client: {client || "-"}</p>
//       <p>Freelancer: {freelancer || "-"}</p>
//       <p>Contract funded: {funded ? "Yes" : "No"}</p>
//       <p>Amount in escrow: {amount} SHM</p>

//       <div style={{ marginTop: "20px" }}>
//         <DepositButton
//           clientAddress={client}
//           setAmount={setAmount}
//           setFunded={setFunded}
//           refreshBalance={refreshBalance}
//         />
//       </div>

//       <div style={{ marginTop: "10px" }}>
//         <ReleaseButton
//           clientAddress={client}
//           setAmount={setAmount}
//           setFunded={setFunded}
//           refreshBalance={refreshBalance}
//         />
//       </div>

//       <div style={{ marginTop: "10px" }}>
//         <RefundButton
//           freelancerAddress={freelancer}
//           setAmount={setAmount}
//           setFunded={setFunded}
//           refreshBalance={refreshBalance}
//         />
//       </div>
//     </div>
//   );
// }

// export default App;

// // src/App.js
// import { useState } from "react";
// import { ethers } from "ethers";
// import EscrowABI from "./Escrow.json";
// import DepositButton from "./components/DepositButton";
// import ReleaseButton from "./components/ReleaseButton";
// import RefundButton from "./components/RefundButton";

// const contractAddress = process.env.REACT_APP_ESCROW_CONTRACT;

// export let escrowContract = null;

// function App() {
//   const [account, setAccount] = useState("");
//   const [balance, setBalance] = useState("0");
//   const [client, setClient] = useState("");
//   const [freelancer, setFreelancer] = useState("");
//   const [funded, setFunded] = useState(false);
//   const [amount, setAmount] = useState("0");

//   async function connectWallet() {
//     if (!window.ethereum) return alert("MetaMask not detected");

//     try {
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
//       await provider.send("eth_requestAccounts", []);
//       const signer = provider.getSigner();
//       const address = await signer.getAddress();
//       setAccount(address);

//       const bal = await provider.getBalance(address);
//       setBalance(ethers.utils.formatEther(bal));

//       const escrowInstance = new ethers.Contract(contractAddress, EscrowABI.abi, signer);
//       escrowContract = escrowInstance;

//       const clientAddr = await escrowInstance.client();
//       const freelancerAddr = await escrowInstance.freelancer();
//       const isFunded = await escrowInstance.isFunded();
//       const amt = await escrowInstance.amount();

//       setClient(clientAddr);
//       setFreelancer(freelancerAddr);
//       setFunded(isFunded);
//       setAmount(ethers.utils.formatEther(amt));
//     } catch (err) {
//       console.error(err);
//       alert("Failed to connect wallet: " + err.message);
//     }
//   }

//   async function refreshBalance() {
//     if (!account) return;
//     const provider = new ethers.providers.Web3Provider(window.ethereum);
//     const bal = await provider.getBalance(account);
//     setBalance(ethers.utils.formatEther(bal));
//   }

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial" }}>
//       <h1>Freelancer Escrow DApp</h1>
//       <button onClick={connectWallet}>Connect Wallet</button>
//       <p>Connected account: {account || "Not connected"}</p>
//       <p>Wallet balance: {balance} SHM</p>
//       <p>Client: {client || "-"}</p>
//       <p>Freelancer: {freelancer || "-"}</p>
//       <p>Contract funded: {funded ? "Yes" : "No"}</p>
//       <p>Amount in escrow: {amount} SHM</p>

//       <div style={{ marginTop: "20px" }}>
//         <DepositButton
//           clientAddress={client}
//           setAmount={setAmount}
//           setFunded={setFunded}
//           refreshBalance={refreshBalance}
//         />
//       </div>

//       <div style={{ marginTop: "10px" }}>
//         <ReleaseButton
//           clientAddress={client}
//           setAmount={setAmount}
//           setFunded={setFunded}
//           refreshBalance={refreshBalance}
//         />
//       </div>

//       <div style={{ marginTop: "10px" }}>
//         <RefundButton
//           freelancerAddress={freelancer}
//           setAmount={setAmount}
//           setFunded={setFunded}
//           refreshBalance={refreshBalance}
//         />
//       </div>
//     </div>
//   );
// }

// export default App;

// src/App.js
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import EscrowABI from "./Escrow.json";
import DepositButton from "./components/DepositButton";
import ReleaseButton from "./components/ReleaseButton";
import RefundButton from "./components/RefundButton";

// Read contract address from .env
const contractAddress = process.env.REACT_APP_ESCROW_CONTRACT;

// Global contract instance
export let escrowContract = null;

function App() {
  const [account, setAccount] = useState("");
  const [balance, setBalance] = useState("0");
  const [client, setClient] = useState("");
  const [freelancer, setFreelancer] = useState("");
  const [funded, setFunded] = useState(false);
  const [amount, setAmount] = useState("0");

  // Connect wallet and contract
  async function connectWallet() {
    if (!window.ethereum) return alert("MetaMask not detected");

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);

      // Wallet balance
      const bal = await provider.getBalance(address);
      setBalance(ethers.utils.formatEther(bal));

      // Contract instance
      const escrowInstance = new ethers.Contract(contractAddress, EscrowABI.abi, signer);
      escrowContract = escrowInstance;

      // Contract state
      const clientAddr = await escrowInstance.client();
      const freelancerAddr = await escrowInstance.freelancer();
      const isFunded = await escrowInstance.isFunded();
      const amt = await escrowInstance.amount();

      setClient(clientAddr);
      setFreelancer(freelancerAddr);
      setFunded(isFunded);
      setAmount(ethers.utils.formatEther(amt));
    } catch (err) {
      console.error(err);
      alert("Failed to connect wallet: " + err.message);
    }
  }

  // Refresh wallet balance
  async function refreshBalance() {
    if (!account) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const bal = await provider.getBalance(account);
    setBalance(ethers.utils.formatEther(bal));
  }

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Freelancer Escrow DApp</h1>
      <button onClick={connectWallet}>Connect Wallet</button>

      <p>Connected account: {account || "Not connected"}</p>
      <p>Wallet balance: {balance} SHM</p>
      <p>Client: {client || "-"}</p>
      <p>Freelancer: {freelancer || "-"}</p>
      <p>Contract funded: {funded ? "Yes" : "No"}</p>
      <p>Amount in escrow: {amount} SHM</p>

      <div style={{ marginTop: "20px" }}>
        <DepositButton
          clientAddress={client}
          setAmount={setAmount}
          setFunded={setFunded}
          refreshBalance={refreshBalance}
        />
      </div>

      <div style={{ marginTop: "10px" }}>
        <ReleaseButton
          clientAddress={client}
          setAmount={setAmount}
          setFunded={setFunded}
          refreshBalance={refreshBalance}
        />
      </div>

      <div style={{ marginTop: "10px" }}>
        <RefundButton
          freelancerAddress={freelancer}
          setAmount={setAmount}
          setFunded={setFunded}
          refreshBalance={refreshBalance}
        />
      </div>
    </div>
  );
}

export default App;