import {StyleSheet} from 'react-native';
import colors from '../../utils/colors';
import {
  deviceHeight,
  horizontalScale,
  moderateScale,
  normalizeFont,
  verticalScale,
} from '../../utils/dimensions';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
  },
  taskContainer: {
    flexGrow: 1,
    paddingVertical: verticalScale(16),
    backgroundColor: colors.blackFive,
  },
  taskCard: {
    borderColor: colors.grey,
    borderWidth: moderateScale(1),
    marginHorizontal: horizontalScale(16),
    borderRadius: moderateScale(8),
    paddingVertical: verticalScale(8),
    paddingHorizontal: horizontalScale(12),
    elevation: 0.5,
    backgroundColor: colors.white,
  },
  taskTitle: {
    fontSize: normalizeFont(20),
    fontWeight: '700',
    color: colors.black,
    flex: 1,
  },
  taskDescription: {
    fontSize: normalizeFont(14),
    marginVertical: verticalScale(8),
    color: colors.greyFifty,
    textAlign: 'justify',
  },
  taskStatus: {
    fontSize: normalizeFont(12),
    color: colors.green,
    marginLeft: horizontalScale(20),
  },
  separator: {
    marginVertical: verticalScale(8),
  },
  pendingStatus: {
    color: colors.yellow,
  },
  topContent: {
    flexDirection: 'row',
  },
  iconStyle: {
    width: moderateScale(20),
    height: moderateScale(20),
    marginRight: horizontalScale(8),
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    borderColor: colors.blue,
    backgroundColor: colors.blueLightBg,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(4),
    marginRight: horizontalScale(16),
    marginTop: verticalScale(8),
    paddingHorizontal: horizontalScale(8),
    paddingVertical: verticalScale(4),
    alignItems: 'center',
  },
  deleteBtn: {
    borderColor: colors.red,
    backgroundColor: colors.redLightBg,
  },
  btnText: {
    fontSize: normalizeFont(12),
    color: colors.blue,
    fontWeight: '600',
  },
  redText: {
    color: colors.red,
  },
  plusIcon: {
    width: moderateScale(54),
    height: moderateScale(54),
  },
  addBtn: {
    position: 'absolute',
    borderRadius: moderateScale(27),
    alignSelf: 'flex-end',
    bottom: verticalScale(16),
    right: verticalScale(16),
    backgroundColor: colors.white,
    elevation: 10,
  },
  formWrapper: {
    flex: 1,
    backgroundColor: colors.modalBg,
    justifyContent: 'flex-end',
  },
  formContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: moderateScale(16),
    borderTopRightRadius: moderateScale(16),
    paddingHorizontal: horizontalScale(16),
    paddingVertical: horizontalScale(24),
    height: deviceHeight * 0.54,
  },
  formHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(24),
  },
  formTitle: {
    fontSize: normalizeFont(24),
    fontWeight: '700',
    color: colors.black,
  },
  closeIcon: {
    width: moderateScale(24),
    height: moderateScale(24),
    marginRight: horizontalScale(8),
  },
  formField: {
    borderColor: colors.brightGrey,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(8),
    paddingHorizontal: horizontalScale(8),
    marginBottom: verticalScale(18),
    maxHeight: verticalScale(80),
  },
  label: {
    position: 'absolute',
    top: -verticalScale(12),
    left: horizontalScale(14),
    paddingHorizontal: horizontalScale(6),
    backgroundColor: colors.white,
  },
  labelText: {
    textAlign: 'center',
    color: colors.neutral60,
  },
  addTaskBtn: {
    alignItems: 'flex-end',
    marginTop: verticalScale(10),
  },
  disableBtn: {
    backgroundColor: colors.neutral60,
  },
  addBtnText: {
    backgroundColor: colors.blue,
    color: colors.white,
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(4),
    borderRadius: moderateScale(4),
    fontSize: normalizeFont(16),
    fontWeight: '700',
  },
  titleField: {
    marginTop: verticalScale(10),
  },
  dropDownContainer: {
    borderColor: colors.brightGrey,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(8),
    top: -verticalScale(15),
  },
  inputText: {
    color: colors.black,
  },
  dropDownItem: {
    paddingHorizontal: horizontalScale(16),
    paddingVertical: verticalScale(8),
  },
  selectedStatus: {
    backgroundColor: colors.blueLightBg,
  },
  topBorderRadius: {
    borderTopLeftRadius: moderateScale(8),
    borderTopRightRadius: moderateScale(8),
  },
  bottomBorderRadius: {
    borderBottomLeftRadius: moderateScale(8),
    borderBottomRightRadius: moderateScale(8),
  },
  selectedText: {
    fontSize: normalizeFont(13),
    color: colors.black,
  },
  selectedStatusText: {
    color: colors.blue,
    fontWeight: '700',
  },
});

export default styles;
