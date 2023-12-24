import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const scale = width / 375;
// Use this for fontSize
function normalizeFont(size) {
  return Math.round(scale * size);
}

// Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 667;

// Use this for left, right or horizontal values
const horizontalScale = size => (width / guidelineBaseWidth) * size;

// use this for top, bottom or vertical values
const verticalScale = size => (height / guidelineBaseHeight) * size;

// use this when both vertical and horizontal values
const moderateScale = (size, factor = 0.5) =>
  size + (horizontalScale(size) - size) * factor;

export {
  normalizeFont,
  horizontalScale,
  moderateScale,
  verticalScale,
  width as deviceWidth,
  height as deviceHeight,
};
