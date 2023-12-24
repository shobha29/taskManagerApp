import React from 'react';
import {Text, View} from 'react-native';
import {Header} from '../../components';
import {screenNameString} from '../../utils/constants';
import {icons} from '../../asserts';
import {useNavigation} from '@react-navigation/native';
import styles from './profile.styles';

const Profile = () => {
  const navigation = useNavigation();

  const onPressMenu = () => {
    navigation.openDrawer();
  };

  return (
    <View style={styles.mainContainer}>
      <Header
        title={screenNameString.PROFILE}
        leftIcon={icons.hamburger}
        onPressLeftIcon={onPressMenu}
      />
      <View style={styles.contentContainer}>
        <Text>Profile</Text>
      </View>
    </View>
  );
};

export default Profile;
