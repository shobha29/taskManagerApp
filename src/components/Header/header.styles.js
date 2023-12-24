import {StyleSheet} from 'react-native';
import {
  horizontalScale,
  moderateScale,
  normalizeFont,
} from '../../utils/dimensions';
import colors from '../../utils/colors';

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.lightBlue,
    padding: moderateScale(16),
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftIcon: {
    width: moderateScale(22),
    height: moderateScale(22),
    marginRight: horizontalScale(26),
    tintColor: colors.white,
  },
  titleStyle: {
    fontSize: normalizeFont(20),
    color: colors.white,
    fontWeight: '700',
  },
});

export default styles;
