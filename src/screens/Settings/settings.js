import React from 'react';
import {Text, View} from 'react-native';
import {Header} from '../../components';
import {screenNameString} from '../../utils/constants';
import {icons} from '../../asserts';
import styles from './settings.styles';
import {useNavigation} from '@react-navigation/native';

const Settings = () => {
  const navigation = useNavigation();

  const onPressMenu = () => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.mainContainer}>
      <Header
        title={screenNameString.SETTINGS}
        leftIcon={icons.hamburger}
        onPressLeftIcon={onPressMenu}
      />
      <View style={styles.contentContainer}>
        <Text>Settings</Text>
      </View>
    </View>
  );
};

export default Settings;
