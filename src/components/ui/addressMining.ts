import { Wallet } from 'alchemy-sdk';
import { NotifyFun } from '../types';

type MiningState = {
  mining: boolean;
  endsWith: string;
  counter: number;
  wallet?: Wallet;
  message?: string;
  update?: NotifyFun;
  batchSize: number;
};
export const miningState: MiningState = {
  mining: false,
  endsWith: '',
  counter: 0,
  batchSize: 0,
  message: 'initial'
};

const timeoutMs = 20;

function notify() {
  miningState.update && miningState.update();
}

export function startMining() {
  miningState.wallet = undefined;
  miningState.mining = true;
  miningState.message = 'waiting to start...';
  notify();
  window.setTimeout(miningTask, timeoutMs);
}

function miningTask() {
  let counter = 0;
  miningState.message = 'Running...';
  notify();
  oneStep();

  function oneStep() {
    counter++;

    miningState.message = `Mining counter: ${counter}`;
    notify();

    const wallet: any = Wallet.createRandom();
    const address = wallet.address.toLowerCase();

    if (!!miningState.endsWith && address.endsWith(miningState.endsWith.toLowerCase())) {
      miningState.wallet = wallet;
      miningState.counter++;
      miningState.mining = false;
      miningState.message = `Mining done for ${wallet.mnemonic.phrase}`;
    }
    if (counter < miningState.batchSize && miningState.mining) {
      setTimeout(oneStep, timeoutMs);
    } else {
      if (miningState.mining) {
        miningState.message = `Nothing found!`;
      }
      miningState.mining = false;
      notify();
    }
  }
}

export function endMining() {
  miningState.mining = false;
}
