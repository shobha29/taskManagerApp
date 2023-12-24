import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import DrawerNavigator from './drawerNavigator';

const Route = () => {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
};

export default Route;
