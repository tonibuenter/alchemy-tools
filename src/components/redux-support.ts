import { ACTIONS, getStore } from './redux';
import { useSelector } from 'react-redux';
import Web3 from 'web3';
import { AlchemyToolsReduxState, StatusMessage } from './types';

export const useLoading = () => useSelector((state: AlchemyToolsReduxState) => state.loading || '');

export const dispatchLoading = (loading: string) =>
  getStore().dispatch({
    type: ACTIONS.UPDATE,
    payload: { loading }
  });

export const useWeb3 = (): Web3 | undefined => useSelector((state: AlchemyToolsReduxState) => state.web3);

export const dispatchWeb3 = (web3?: Web3) =>
  getStore().dispatch({
    type: ACTIONS.UPDATE,
    payload: { web3 }
  });

export const useStatusMessage = (): StatusMessage | undefined =>
  useSelector((state: AlchemyToolsReduxState) => state.statusMessage);

export const dispatchStatusMessage = (statusMessage?: StatusMessage) =>
  getStore().dispatch({
    type: ACTIONS.UPDATE,
    payload: { statusMessage }
  });

export const usePublicAddress = () => useSelector((state: AlchemyToolsReduxState) => state.publicAddress);

export const dispatchPublicAddress = (publicAddress: string) =>
  getStore().dispatch({
    type: ACTIONS.UPDATE,
    payload: { publicAddress }
  });

export const usePublicKey = () => useSelector((state: AlchemyToolsReduxState) => state.publicKey);

export const dispatchPublicKey = (publicKey: string) =>
  getStore().dispatch({
    type: ACTIONS.UPDATE,
    payload: { publicKey }
  });

export const useNetworkId = (): number => useSelector((state: AlchemyToolsReduxState) => state.networkId || 0);
export const getNetworkId = (): number => getStore().getState().networkId || 0;

export const dispatchNetworkId = (networkId: number) => {
  console.debug('networkId', networkId);
  return getStore().dispatch({
    type: ACTIONS.UPDATE,
    payload: { networkId }
  });
};
