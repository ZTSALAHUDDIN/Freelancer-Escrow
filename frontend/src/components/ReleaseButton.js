// import { escrowContract } from "../App";

// export default function ReleaseButton({ clientAddress, setAmount, setFunded, refreshBalance }) {
//   const handleRelease = async () => {
//     if (!escrowContract) return alert("Connect wallet first");

//     const signerAddress = await escrowContract.signer.getAddress();
//     if (signerAddress.toLowerCase() !== clientAddress.toLowerCase()) {
//       return alert("Only the client can release funds!");
//     }

//     try {
//       const tx = await escrowContract.release();
//       await tx.wait();
//       alert("Funds released to freelancer!");

//       // Update contract state in App.js
//       setAmount("0");
//       setFunded(false);
//       refreshBalance();
//     } catch (err) {
//       console.error(err);
//       alert("Release failed: " + err.message);
//     }
//   };

//   return <button onClick={handleRelease}>Release Funds</button>;
// }

import { escrowContract } from "../App";

export default function ReleaseButton({ clientAddress, setAmount, setFunded, refreshBalance }) {
  const handleRelease = async () => {
    if (!escrowContract) return alert("Connect wallet first");

    const signerAddress = await escrowContract.signer.getAddress();
    if (signerAddress.toLowerCase() !== clientAddress.toLowerCase()) {
      return alert("Only the client can release funds!");
    }

    try {
      const tx = await escrowContract.release();
      await tx.wait();
      alert("Funds released to freelancer!");

      setAmount("0");
      setFunded(false);
      refreshBalance();
    } catch (err) {
      console.error(err);
      alert("Release failed: " + err.message);
    }
  };

  return <button onClick={handleRelease}>Release Funds</button>;
}