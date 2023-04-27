import { ChangeEvent, useState } from 'react';
import { Button, Stack, TextField } from '@mui/material';
import { Wallet } from 'alchemy-sdk';
import { Head2 } from './Head2';
import { dispatchStatusMessage } from '../redux-support';
import { errorMessage } from '../types';

export function Mnemonic2Keys() {
  const [mnemonicPhrase, setMnemonicPhrase] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [publicAddress, setPublicAddress] = useState('');

  return (
    <Stack spacing={2}>
      <Head2>Convert Mnemonic to Keys</Head2>
      <TextField
        size={'small'}
        label={'Mnemonic Phrase'}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setMnemonicPhrase(e.target.value)}
        value={mnemonicPhrase}
      />
      <Button
        onClick={() => {
          try {
            const wallet = Wallet.fromMnemonic(mnemonicPhrase);
            setPrivateKey(wallet.privateKey);
            setPublicAddress(wallet.address);
            dispatchStatusMessage();
          } catch (e) {
            dispatchStatusMessage(errorMessage('Did you provide 12 words from the Mnemonics?', e));
            setPrivateKey('');
            setPublicAddress('');
          }
        }}
      >
        Convert To Private Key
      </Button>
      <TextField size={'small'} label={'Public Address'} value={publicAddress} />
      <TextField size={'small'} label={'Private Key'} value={privateKey} />
    </Stack>
  );
}
