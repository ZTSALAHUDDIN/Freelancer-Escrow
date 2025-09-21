# Freelancer Escrow DApp

**Freelancer Escrow DApp** is a decentralized escrow platform built on **Shardeum Unstablenet** that enables secure, transparent, and fair freelance project management. Clients can create projects with milestone-based payments and reputation rewards, while freelancers receive funds only after completing milestones. Each milestone release generates an NFT receipt, providing verifiable proof of work.

---

## Features

- **Connect Wallet**: Connect via MetaMask and display account address and network.
- **Create Project**: Input freelancer address, project name, and dynamic milestones (amount, reputation reward, description). Sends `msg.value` equal to total milestone amounts + reputation rewards.
- **Project Dashboard**: View project details by Project ID. Release or refund milestones (client only). Display NFT receipts (tokenId + tokenURI).
- **Reputation & Balances**: Track freelancer reputation points and account balances.
- **Transaction Feedback**: Shows Pending, Confirmed, or Failed status for transactions.
- **Event Parsing**: Parses `MilestoneReleased` events to show NFT tokenId and tokenURI.

---

## Tech Stack

- **Frontend**: React (functional components + hooks), JavaScript
- **Blockchain Integration**: ethers.js v5
- **Styling**: Tailwind CSS (optional, clean simple design)
- **Network**: Shardeum Unstablenet

---

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/ZTSALAHUDDIN/Freelancer-Escrow.git
cd Freelancer-Escrow
