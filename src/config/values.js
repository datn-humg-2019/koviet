import { Platform, Dimensions, PixelRatio } from "react-native";
import DeviceInfo from 'react-native-device-info';
const isTablet = DeviceInfo.isTablet(); // true

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
const platform = Platform.OS;
const platformStyle = undefined;
const isIphoneX =
    platform === "ios" && deviceHeight === 812 && deviceWidth === 375;
//iphone XS max== ip XR
const isIphoneXR =
    platform === "ios" && deviceHeight === 896 && deviceWidth === 414;
const isIphoneBasic = platform == 'ios' && !isIphoneX && !isIphoneXR
const isAPILest21 =
    platform === 'android' && Platform.Version < 21;
const aspectRatio = deviceHeight / deviceWidth;
const deviceIsIphone = aspectRatio > 1.6 ? true : false;

//for map

// const ASPECT_RATIO = width / height;
let LATITUDE = 21.028667;
let LONGITUDE = 105.852148;
let LATITUDE_DELTA = 10;
let LONGITUDE_DELTA = LATITUDE_DELTA * aspectRatio;
let POSITION_DEFAULT = {
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
};
let MARKER_ME_DEFAULT = {
    latitude: LATITUDE,
    longitude: LONGITUDE
}
const values = {
    status: { account: '0', changePassword: '1' },
    isTablet,
    platform, isIphoneX, isIphoneXR, isIphoneBasic, deviceIsIphone, isAPILest21,
    deviceHeight, deviceWidth, aspectRatio,
    LATITUDE, LONGITUDE, LATITUDE_DELTA, LONGITUDE_DELTA, POSITION_DEFAULT, MARKER_ME_DEFAULT,
    status_bar_height_android: 24,
    contentToolbarHeight: platform === "ios" ? 44 : 44,
    marginTopScreen: platform === "ios" ? (isIphoneXR ? 41 : isIphoneX ? 35 : 20) : 24,
    tabbarHeight: platform === "ios" ? (isIphoneXR ? 65 : isIphoneX ? 65 : 55) : 55,//56
    bottomIphoneX: platform === "ios" ? (isIphoneXR ? 15 : isIphoneX ? 10 : 0) : 0,//56
    tabbarContent: 55,
    heightButton: platform === "ios" ? (isIphoneX ? 56 : 44) : 44,//56

    borderRadiusButtonLogin: 3.5,
    activeOpacity: 0.7,
    marginHeader: 13,
    minZoomLevel: 8,
    maxZoomLevel: 20,
    widthButton: 45,

    fontSizeNormal: 13,
    fontSizeSmall: 11,
    fontSizeSmaller: 9,
    fontSizeTitle: 16,
    navBarTextFontSize: 20,
    widthCar: 45,
    nav: {
        fontSize: 20,

    }
};
export default values