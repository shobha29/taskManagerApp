import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {DeviceContext} from '../utils/context';
import DrawerNavigator from './drawerNavigator';
import NetInfo from '@react-native-community/netinfo';

const Route = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribeNetInfo = NetInfo.addEventListener(val => {
      setIsConnected(val.isConnected);
    });
    return () => {
      unsubscribeNetInfo();
    };
  }, []);

  return (
    <DeviceContext.Provider
      value={{
        isConnected,
        changeIsConnected: val => setIsConnected(val),
      }}>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </DeviceContext.Provider>
  );
};

export default Route;
