// import { useState } from "react";
// import { ethers } from "ethers";
// import { escrowContract } from "../App";

// export default function DepositButton({ clientAddress, setAmount, setFunded, refreshBalance }) {
//   const [depositAmount, setDepositAmountLocal] = useState("");

//   const handleDeposit = async () => {
//     if (!escrowContract) return alert("Connect wallet first");

//     const signerAddress = await escrowContract.signer.getAddress();
//     if (signerAddress.toLowerCase() !== clientAddress.toLowerCase()) {
//       return alert("Only the client can deposit!");
//     }

//     if (!depositAmount || isNaN(depositAmount) || Number(depositAmount) <= 0) {
//       return alert("Enter a valid amount!");
//     }

//     try {
//       const tx = await escrowContract.deposit({ value: ethers.utils.parseEther(depositAmount) });
//       await tx.wait();
//       alert(`Deposited ${depositAmount} SHM successfully!`);

//       // Update contract state in App.js
//       const amt = await escrowContract.amount();
//       const isFunded = await escrowContract.isFunded();
//       setAmount(ethers.utils.formatEther(amt));
//       setFunded(isFunded);
//       refreshBalance();
//       setDepositAmountLocal("");
//     } catch (err) {
//       console.error(err);
//       alert("Deposit failed: " + err.message);
//     }
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Amount to deposit"
//         value={depositAmount}
//         onChange={(e) => setDepositAmountLocal(e.target.value)}
//       />
//       <button onClick={handleDeposit}>Deposit</button>
//     </div>
//   );
// }

import { useState } from "react";
import { ethers } from "ethers";
import { escrowContract } from "../App";

export default function DepositButton({ clientAddress, setAmount, setFunded, refreshBalance }) {
  const [depositAmount, setDepositAmountLocal] = useState("");

  const handleDeposit = async () => {
    if (!escrowContract) return alert("Connect wallet first");

    const signerAddress = await escrowContract.signer.getAddress();
    if (signerAddress.toLowerCase() !== clientAddress.toLowerCase()) {
      return alert("Only the client can deposit!");
    }

    if (!depositAmount || isNaN(depositAmount) || Number(depositAmount) <= 0) {
      return alert("Enter a valid amount!");
    }

    try {
      const tx = await escrowContract.deposit({ value: ethers.utils.parseEther(depositAmount) });
      await tx.wait();
      alert(`Deposited ${depositAmount} SHM successfully!`);

      const amt = await escrowContract.amount();
      const isFunded = await escrowContract.isFunded();
      setAmount(ethers.utils.formatEther(amt));
      setFunded(isFunded);
      refreshBalance();
      setDepositAmountLocal("");
    } catch (err) {
      console.error(err);
      alert("Deposit failed: " + err.message);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Amount to deposit"
        value={depositAmount}
        onChange={(e) => setDepositAmountLocal(e.target.value)}
      />
      <button onClick={handleDeposit}>Deposit</button>
    </div>
  );
}