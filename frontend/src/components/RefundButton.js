// import { escrowContract } from "../App";

// export default function RefundButton({ freelancerAddress, setAmount, setFunded, refreshBalance }) {
//   const handleRefund = async () => {
//     if (!escrowContract) return alert("Connect wallet first");

//     const signerAddress = await escrowContract.signer.getAddress();
//     if (signerAddress.toLowerCase() !== freelancerAddress.toLowerCase()) {
//       return alert("Only the freelancer can refund funds!");
//     }

//     try {
//       const tx = await escrowContract.refund();
//       await tx.wait();
//       alert("Funds refunded to client!");

//       // Update contract state in App.js
//       setAmount("0");
//       setFunded(false);
//       refreshBalance();
//     } catch (err) {
//       console.error(err);
//       alert("Refund failed: " + err.message);
//     }
//   };

//   return <button onClick={handleRefund}>Refund Funds</button>;
// }

import { escrowContract } from "../App";

export default function RefundButton({ freelancerAddress, setAmount, setFunded, refreshBalance }) {
  const handleRefund = async () => {
    if (!escrowContract) return alert("Connect wallet first");

    const signerAddress = await escrowContract.signer.getAddress();
    if (signerAddress.toLowerCase() !== freelancerAddress.toLowerCase()) {
      return alert("Only the freelancer can refund funds!");
    }

    try {
      const tx = await escrowContract.refund();
      await tx.wait();
      alert("Funds refunded to client!");

      setAmount("0");
      setFunded(false);
      refreshBalance();
    } catch (err) {
      console.error(err);
      alert("Refund failed: " + err.message);
    }
  };

  return <button onClick={handleRefund}>Refund Funds</button>;
}