import { Alchemy, Network } from 'alchemy-sdk';
import 'dotenv/config';
import * as process from 'process';

const network: Network = process.env.NETWORK as Network;
const apiKey = process.env.API_KEY;

// Optional config object, but defaults to the API key 'demo' and Network 'eth-mainnet'.
const settings = {
  apiKey,
  network
};

let _alchemy: Alchemy;

export function newAlchemy(): Alchemy {
  console.log(`new Alchemy for network: ${settings.network}`);
  return new Alchemy(settings);
}

export function getAlchemy(): Alchemy {
  if (!_alchemy) {
    _alchemy = newAlchemy();
  }
  return _alchemy;
}

export interface Balance {
  address: string;
  wei: bigint;
}

export async function getBalances(addresses: string[]): Promise<Balance[]> {
  const alchemy = getAlchemy();
  const balances: Balance[] = [];
  for (const address of addresses) {
    const wei = await alchemy.core.getBalance(address);
    balances.push({ address, wei: wei.toBigInt() });
  }
  return balances;
}

export async function tokenInfo(contractAddress: string) {}
