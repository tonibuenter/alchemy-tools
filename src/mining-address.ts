import 'dotenv/config';
import * as process from 'process';
import path from 'path';
import fs from 'fs';
import { Wallet } from 'alchemy-sdk';

const outDir = process.env.OUT_DIR;

const addressFilter = (process.env.ADDRESS_FILTER || 'ffffff').split(/\W+/);

console.log('Address filter:', addressFilter.join(','));

let counter = 0;

while (counter < 1000000000000) {
  counter++;

  const wallet = Wallet.createRandom();
  const add = wallet.address.toLowerCase();

  for (let ew of addressFilter) {
    let filename = '';
    if (add.endsWith(ew) && add.startsWith('0x' + ew)) {
      filename = 'both_' + ew + '.txt';
    } else if (add.endsWith(ew)) {
      filename = 'end_' + ew + '.txt';
    } else if (add.startsWith('0x' + ew)) {
      filename = 'start_' + ew + '.txt';
    }
    if (filename) {
      const privateKey = wallet.privateKey.toString().toLowerCase();
      const mnemonic = wallet.mnemonic;

      const wallet2 = Wallet.fromMnemonic(mnemonic.phrase);

      if (privateKey === wallet2.privateKey.toString().toLowerCase()) {
        fs.writeFileSync(
          path.join(outDir, filename),
          `[address]\n${add}\n[privateKey]\n${privateKey}\n[mnemonic]\n${mnemonic.phrase}`
        );
        console.log(`Save file: ${filename}`);
      } else {
        console.error('Serious error: mnemonic does not work!');
      }
    }
  }

  if (counter % 10000 === 0) {
    console.debug('Addresses checked:', counter);
  }
}
