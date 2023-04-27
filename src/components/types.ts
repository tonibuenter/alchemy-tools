import Web3 from 'web3';

export function isError(e: any): e is Error {
  return e && e.message;
}

export interface AlchemyToolsReduxState {
  web3?: Web3;
  statusMessage?: StatusMessage;
  publicAddress?: string;
  networkId?: number;
  publicKey?: string;
  loading?: string;
}

export declare type StatusMessageStatus = 'success' | 'info' | 'warning' | 'error';

export declare type StatusMessage = {
  status: StatusMessageStatus;
  userMessage?: string;
  systemMessage?: string;
  additionalSystemMessages?: string[];
};
export const errorMessage = (userMessage: string, error: Error | string | unknown = ''): StatusMessage => {
  const status = 'error';
  let systemMessage = '';
  if (!error) {
    systemMessage = '';
  } else if (isError(error)) {
    systemMessage = error.message;
  } else if (typeof error === 'string') {
    systemMessage = error;
  } else {
    systemMessage = error.toString();
  }
  return {
    status,
    userMessage,
    systemMessage
  };
};

export const warningMessage = (userMessage: string): StatusMessage => ({
  status: 'warning',
  userMessage: userMessage
});
export const infoMessage = (userMessage: string): StatusMessage => ({
  status: 'info',
  userMessage: userMessage
});

export const isStatusMessage = (arg: any): arg is StatusMessage =>
  arg && typeof arg === 'object' && arg.status && arg.userMessage;

export type NotifyFun = () => void;
export type Item = { index: number; name: string; secret: string; inserted: string };
export const EmptyItem: Item = { index: -1, name: '', secret: '', inserted: '' };
