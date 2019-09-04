import { Platform, Dimensions, PixelRatio } from 'react-native';

const platform = Platform.select({ 'ios': 'ios', 'android': 'android' });
const isAndroid = platform === 'android';
const isIOS = platform === 'ios';
const { width, height } = Dimensions.get('window');
const iPhoneX_Min_Width = 375;
const iPhoneX_Min_Height = 812;
const isIPhoneXSeries = isIOS && width >= iPhoneX_Min_Width && height >= iPhoneX_Min_Height;
const dangerBottomHeight = isIPhoneXSeries ? 34 : 0;
const minLineHeight = 1 / PixelRatio.get()

const DeviceConst = {
  platform,
  isAndroid,
  isIOS,
  width,
  height,
  isIPhoneXSeries,
  dangerBottomHeight,
  minLineHeight,
}

export default DeviceConst;
