import { isError } from './utils-shared';
import 'dotenv/config';
import { getBalances, newAlchemy } from './utils';
import { Utils, Wallet } from 'alchemy-sdk';

const network = process.env.ETHEREUM_NETWORK;

const address = process.env.MAIN_ADDRESS;
const privateKey = process.env.MAIN_PRIVATE_KEY;
const x0000Address = process.env.X0000_ADDRESS;
const ethValue = '0.1';
const ethValueWei = Utils.parseEther(ethValue);

console.log(`Sending ${ethValue} ETH \nfrom : ${address} \nto   : ${x0000Address} \non network: ${network}`);

async function sendMatic() {
  try {
    // Configuring the connection to an Ethereum node
    const provider = newAlchemy();

    const balancesBefore = await getBalances([address, x0000Address]);
    balancesBefore.forEach(({ address, wei }) => console.log(`balance ${address}: ${Utils.formatEther(wei)}`));

    // Creating a signing account from a private key
    const signer = new Wallet(privateKey, provider);

    // Creating and sending the transaction object
    const tx = await signer.sendTransaction({
      to: x0000Address,
      value: ethValueWei
    });
    console.log('Mining transaction...');
    console.log(`https://${network}.etherscan.io/tx/${tx.hash}`);
    // Waiting for the transaction to be mined
    const receipt = await tx.wait();
    // The transaction is now on chain!
    console.log(`Mined in block ${receipt.blockNumber}`);

    const balancesAfter = await getBalances([address, x0000Address]);
    balancesAfter.forEach(({ address, wei }) => console.log(`balance ${address}: ${Utils.formatEther(wei)}`));

    const fee = balancesBefore[0].wei - Utils.parseEther(ethValue).toBigInt() - balancesAfter[0].wei;
    console.log(`gas used          WEI: ${receipt.gasUsed}`);
    console.log(`cumulativeGasUsed WEI: ${receipt.cumulativeGasUsed}`);
    console.log(`fee difference WEI: ${fee}`);
    console.log(`fee difference ETH: ${Utils.formatEther(fee)}`);
  } catch (e) {
    if (isError(e)) {
      console.error(e);
    }
  }
}

sendMatic();
