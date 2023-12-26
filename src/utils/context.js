import {createContext} from 'react';

export const DeviceContext = createContext({
  isConnected: false,
  changeIsConnected: () => {},
});
