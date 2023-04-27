import { Provider } from 'react-redux';
import { createReduxStore } from '../redux';
import { createContext, useMemo, useState } from 'react';
import { Container, createTheme, Stack, ThemeProvider } from '@mui/material';
import { blue, orange } from '@mui/material/colors';

import { createHashRouter, Outlet, RouterProvider } from 'react-router-dom';
import { Mnemonic2Keys } from './Mnemonic2Keys';
import Loader from './Loader';
import { DynStatusMessage } from './DynStatusMessage';
import { ToolbarTop } from './ToolbarTop';
import { MiningAddress } from './MiningAddress';

export const ColorModeContext = createContext({
  toggleColorMode: () => {}
});
const router = createHashRouter([
  {
    path: '/',
    element: <Navigation />,
    children: [
      {
        path: 'mnemonic2keys',
        element: <Mnemonic2Keys />
      },
      {
        path: 'miningAddress',
        element: <MiningAddress />
      },
      { path: '', element: <Mnemonic2Keys /> }
    ]
  }
]);

export function RouterApp() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      }
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: blue,
          secondary: orange
        },
        components: {
          // Name of the component
          MuiTooltip: {
            defaultProps: {
              arrow: true
            }
          }
        }
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <Provider store={createReduxStore()}>
          <RouterProvider router={router} />
        </Provider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

function Navigation() {
  return (
    <Stack direction={'column'} spacing={2}>
      <ToolbarTop
        routerInfo={[
          { path: 'mnemonic2keys', label: 'Mnemonic to Keys' },
          {
            path: 'miningAddress',
            label: 'Mining Address'
          }
        ]}
      />
      <DynStatusMessage />
      <Container>
        <Outlet />
      </Container>
      <Loader />
    </Stack>
  );
}
