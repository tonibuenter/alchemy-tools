import { StatusMessage } from '../types';
import React, { FC } from 'react';
import { Alert, AlertTitle, Box } from '@mui/material';

export type StatusMessageProps = {
  statusMessage?: StatusMessage;
  onClose?: () => void;
};
export const StatusMessageElement: FC<StatusMessageProps> = ({
  statusMessage,
  onClose
}: StatusMessageProps): JSX.Element => {
  if (!statusMessage) {
    return <></>;
  }

  const list: React.ReactElement[] = [];
  if (statusMessage.userMessage) {
    list.push(<AlertTitle key={'user--message'}>{statusMessage.userMessage}</AlertTitle>);
  }
  if (statusMessage.systemMessage) {
    list.push(
      <Box key={'system-message'} sx={{ wordBreak: 'break-word' }}>
        {statusMessage.systemMessage}
      </Box>
    );
  }
  if (statusMessage.additionalSystemMessages) {
    statusMessage.additionalSystemMessages.forEach((additionalSystemMessage, index) =>
      list.push(
        <Box key={index} sx={{ wordBreak: 'break-word' }}>
          {additionalSystemMessage}
        </Box>
      )
    );
  }

  return (
    <Alert severity={statusMessage.status} onClose={onClose}>
      {list}
    </Alert>
  );
};
