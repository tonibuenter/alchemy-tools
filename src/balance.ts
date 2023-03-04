import 'dotenv/config';
import * as process from 'process';
import { getAlchemy } from './utils';
import { Utils } from 'alchemy-sdk';

const network = process.env.ETHEREUM_NETWORK;
const projectId = process.env.INFURA_PROJECT_ID;
const apiKeySecret = process.env.INFURA_API_KEY_SECRET;

let address = process.env.MAIN_ADDRESS;

console.debug({ network, projectId, apiKeySecret, address });

async function getBalanceUsingJsonRpcProvider() {
  let index = -1;
  do {
    try {
      // Configure the ITX provider using your Infura credentials
      const alchemy = getAlchemy();
      const balance = await alchemy.core.getBalance(address);
      console.log(`Current balance ${address}: ` + Utils.formatEther(balance));
      index++;
    } catch (e) {
      console.error(e);
    }
  } while ((address = process.env[`X000${index}_ADDRESS`]));
}

Promise.all([getBalanceUsingJsonRpcProvider()]);
