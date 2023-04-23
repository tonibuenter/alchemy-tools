import { isError } from './utils-shared';
import 'dotenv/config';
import fs from 'fs';
import { getBalances, newAlchemy } from './utils';
import * as process from 'process';
import { Contract, Utils, Wallet } from 'alchemy-sdk';
import moment from 'moment';

const network = process.env.NETWORK;

const address = process.env.MAIN_ADDRESS;
const privateKey = process.env.MAIN_PRIVATE_KEY;
const polysafeContractAddress = process.env.POLYSAFE_CONTRACT_ADDRESS_POLYGON_MUMBAI;

console.log(`Deploy Polysafe.sol contract...\nowner : ${address}`);

async function callPolysafeContract() {
  try {
    const { abi } = JSON.parse(fs.readFileSync('./contracts/Polysafe.json').toString('utf-8'));

    // Configuring the connection to an Ethereum node
    const provider = newAlchemy();

    const balancesBefore = await getBalances([address]);
    balancesBefore.forEach(({ address, wei }) => console.log(`balance ${address}: ${Utils.formatEther(wei)}`));

    // Creating a signing account from a private key
    const signer = new Wallet(privateKey, provider);

    const contract = new Contract(polysafeContractAddress, abi, signer);
    // Issuing a transaction that calls the `add` method
    const tx = await contract.add('This is a test', 'nosecret', moment().format('YYYY-MM-DD hh:mm'));
    console.log('Mining transaction...');
    console.log(`https://${network}.etherscan.io/tx/${tx.hash}`);
    // Waiting for the transaction to be mined
    let receipt: any;
    if (typeof tx.wait === 'function') {
      receipt = await tx.wait();
      console.log(`Mined in block ${receipt.blockNumber}`);
    }
    // The transaction is now on chain!

    const balancesAfter = await getBalances([address]);

    const fee = balancesBefore[0].wei - balancesAfter[0].wei;
    if (receipt) {
      console.log(`gas price         WEI: ${receipt.gasPrice}`);
      console.log(`gas used          WEI: ${receipt.gasUsed}`);
      console.log(`cumulativeGasUsed WEI: ${receipt.cumulativeGasUsed}`);
    } else {
      console.log('tx', JSON.stringify(tx));
    }
    console.log(`fee difference by account WEI: ${fee}`);
    console.log(`fee difference by account ETH: ${Utils.formatEther(fee)}`);
  } catch (e) {
    if (isError(e)) {
      console.error(e);
    }
  }
}

callPolysafeContract();
