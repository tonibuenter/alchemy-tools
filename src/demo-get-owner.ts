import { isError } from './utils-shared';
import 'dotenv/config';
import fs from 'fs';
import { getBalances, newAlchemy } from './utils';
import * as process from 'process';
import { ContractFactory, Utils, Wallet } from 'alchemy-sdk';

const address = process.env.X0003_ADDRESS;
const privateKey = process.env.MAIN_PRIVATE_KEY;

console.log(`Deploy Demo.sol contract...\nowner : ${address}`);

async function getDemoOwner() {
  try {
    const { abi, bytecode } = JSON.parse(fs.readFileSync('./contracts/Demo.json').toString('utf-8'));

    // Configuring the connection to an Ethereum node
    const provider = newAlchemy();

    const balancesBefore = await getBalances([address]);
    balancesBefore.forEach(({ address, wei }) => console.log(`balance ${address}: ${Utils.formatEther(wei)}`));

    // Creating a signing account from a private key
    const signer = new Wallet(privateKey, provider);

    const factory: ContractFactory = new ContractFactory(abi, bytecode, signer);

    console.log(`factory`, factory);
  } catch (e) {
    if (isError(e)) {
      console.error(e);
    }
  }
}

getDemoOwner();
