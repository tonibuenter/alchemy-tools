import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { Box, Button, Stack, TextField } from '@mui/material';
import { Head2 } from './WithStyles';
import { dispatchStatusMessage } from '../redux-support';
import { errorMessage } from '../types';
import { endMining, miningState, startMining } from './addressMining';
import { StatusMessageElement } from './StatusMessageElement';

export function MiningAddress() {
  const [endsWith, setEndsWith] = useState('');
  const [batchSize, setBatchSize] = useState('10');
  const [_updateCounter, update] = useState(0);

  const connect = useCallback(() => {
    miningState.update = () => update((i) => 1 + i);
    console.debug('Register update to miningState');
    setEndsWith(miningState.endsWith || '');
    setBatchSize(miningState.batchSize.toString());
  }, []);

  const disconnect = useCallback(() => {
    miningState.update = undefined;
    console.debug('Un-register update from miningState');
  }, []);

  useEffect(() => {
    connect();
    return disconnect;
  }, []);

  return (
    <Box>
      <Stack spacing={2}>
        <Head2>Address Mining</Head2>

        <TextField
          size={'small'}
          label={'Address ends with'}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setEndsWith(e.target.value);
          }}
          value={endsWith}
        />
        <Stack spacing={2} direction={'row'}>
          <TextField
            size={'small'}
            label={'Mining batch size'}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              if (!isNaN(+e.target.value)) setBatchSize(e.target.value);
            }}
            value={batchSize}
          />
          <Button
            disabled={!miningState.mining}
            onClick={() => {
              if (miningState.update) {
                disconnect();
              } else {
                connect();
              }
              update((i) => i + 1);
            }}
          >
            {miningState.update ? 'Run in background' : 'Run in foreground'}
          </Button>
        </Stack>
        <Button
          disabled={miningState.mining || !endsWith}
          onClick={() => {
            try {
              miningState.endsWith = endsWith;
              miningState.batchSize = +batchSize || 10;
              startMining();
            } catch (e) {
              dispatchStatusMessage(errorMessage('Unknown error', e));
            }
          }}
        >
          Start Mining
        </Button>
        <Button
          disabled={!miningState.mining}
          onClick={() => {
            connect();
            endMining();
            update((i) => i++);
          }}
        >
          End Mining
        </Button>
        <TextField size={'small'} label={'Mnemonic Phrase'} value={miningState.wallet?.mnemonic?.phrase || ''} />
        <TextField size={'small'} label={'Public Address'} value={miningState.wallet?.address || ''} />
        <TextField size={'small'} label={'Private Key'} value={miningState.wallet?.privateKey || ''} />
        <Box>
          <StatusMessageElement statusMessage={{ status: 'info', userMessage: `Mining: ${miningState.message}` }} />
        </Box>
      </Stack>
    </Box>
  );
}
