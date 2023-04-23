import { isError } from './utils-shared';
import 'dotenv/config';
import fs from 'fs';
import { getBalances, newAlchemy } from './utils';
import { ContractFactory, Utils, Wallet } from 'alchemy-sdk';

const network = process.env.ETHEREUM_NETWORK;

const address = process.env.MAIN_ADDRESS;
const privateKey = process.env.MAIN_PRIVATE_KEY;

console.log(`Deploy Polysafe.sol contract...\nowner : ${address}`);

async function deployPolysafeContract() {
  try {
    const { abi, bytecode } = JSON.parse(fs.readFileSync('./contracts/Polysafe.json').toString('utf-8'));

    // Configuring the connection to an Ethereum node
    const provider = newAlchemy();

    const balancesBefore = await getBalances([address]);
    balancesBefore.forEach(({ address, wei }) => console.log(`balance ${address}: ${Utils.formatEther(wei)}`));

    // Creating a signing account from a private key
    const signer = new Wallet(privateKey, provider);

    const factory = new ContractFactory(abi, bytecode, signer);
    const contract = await factory.deploy();
    console.log('Mining transaction...');
    console.log(`https://${network}.etherscan.io/tx/${contract.deployTransaction.hash}`);
    // Waiting for the transaction to be mined
    // The contract is now deployed on chain!
    const contractAddress = await contract.address;
    console.log(`Contract deployed at ${contractAddress}`);

    // The transaction is now on chain!

    const balancesAfter = await getBalances([address]);

    const fee = balancesBefore[0].wei - balancesAfter[0].wei;
    // console.log(`gas price WEI : ${receipt.deploymentTransaction().gasPrice}`);
    // console.log(`hash          : ${receipt.deploymentTransaction().hash}`);
    // console.log(`provider      : ${receipt.deploymentTransaction().provider}`);
    console.log(`fee difference by account WEI: ${fee}`);
    console.log(`fee difference by account ETH: ${Utils.formatEther(fee)}`);
  } catch (e) {
    if (isError(e)) {
      console.error(e);
    }
  }
}

deployPolysafeContract();
