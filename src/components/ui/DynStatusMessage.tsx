import { dispatchStatusMessage, useStatusMessage } from '../redux-support';
import { StatusMessageElement } from './StatusMessageElement';

export function DynStatusMessage() {
  const statusMessage = useStatusMessage();
  if (statusMessage) {
    return <StatusMessageElement statusMessage={statusMessage} onClose={() => dispatchStatusMessage()} />;
  }
  return <></>;
}
