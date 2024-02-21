import {Dimensions} from 'react-native';
const {width, height} = Dimensions.get('window');

export const textFontFace = 'Mona-Sans-Regular';
export const textFontFaceMedium = 'Mona-Sans-Medium';
export const textFontFaceSemiBold = 'Mona-Sans-SemiBold';
export const textFontFaceLight = 'Mona-Sans-Light';

export const fontsSize = {
  size18: 18,
};

export const screenMatrix = {
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  width,
  height,
};

export const dynamicFontsize = {
  font2: screenMatrix.screenWidth * (2 / 375),
  font4: screenMatrix.screenWidth * (4 / 375),
  font6: screenMatrix.screenWidth * (6 / 375),
  font8: screenMatrix.screenWidth * (8 / 375),
  font10: screenMatrix.screenWidth * (10 / 375),
  font12: screenMatrix.screenWidth * (12 / 375),
  font14: screenMatrix.screenWidth * (14 / 375),
  font16: screenMatrix.screenWidth * (16 / 375),
  font18: screenMatrix.screenWidth * (18 / 375),
  font20: screenMatrix.screenWidth * (20 / 375),
  font22: screenMatrix.screenWidth * (22 / 375),
  font24: screenMatrix.screenWidth * (24 / 375),
  font26: screenMatrix.screenWidth * (26 / 375),
  font28: screenMatrix.screenWidth * (28 / 375),
};
