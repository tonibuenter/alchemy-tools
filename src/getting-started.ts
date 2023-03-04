import { AlchemyEventType } from 'alchemy-sdk';
import 'dotenv/config';
import * as process from 'process';
import { newAlchemy } from './utils';

// const network: Network = process.env.NETWORK as Network;
// const apiKey = process.env.API_KEY;
const address = process.env.MAIN_ADDRESS;

async function gettingStarted() {
  const alchemy = newAlchemy();
  const latestBlock = await alchemy.core.getBlockNumber();
  console.log('latest block', latestBlock);

  const tb = await alchemy.core.getTokenBalances(address);
  //console.log('token balance', tokenBalance);
  for (const { contractAddress, tokenBalance } of tb.tokenBalances) {
    console.log('contract address', contractAddress);
    console.log('token balance', parseInt('' + tokenBalance, 16));
  }
  // tokenBalance.tokenBalances.forEach(({ contractAddress, tokenBalance }) => {
  //
  // });

  // Get all the NFTs owned by an address
  const nfts = await alchemy.nft.getNftsForOwner(address);
  console.log(nfts);
  // Listen to all new pending transactions

  const eventType: AlchemyEventType = {
    method: 'alchemy_pendingTransactions',
    fromAddress: address
  } as AlchemyEventType;

  alchemy.ws.on(eventType, (res) => console.log(res));
}

gettingStarted();
