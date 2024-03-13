import {
  Alert,
  BackHandler,
  Dimensions,
  Platform,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RootNav from '../router/RootNav.js';
import appJson from '../../app.json';
import messaging from '@react-native-firebase/messaging';
import notifee, {
  AndroidColor,
  AndroidImportance,
  AndroidLaunchActivityFlag,
  AndroidNotificationSetting,
  AndroidVisibility,
  AndroidStyle,
} from '@notifee/react-native';

const {height, width} = Dimensions.get('window');

export const LOG = (str, val) => {
  if (val) {
    console.log(str, val);
  } else {
    console.log(str);
  }
};

export const Toast = value => {
  if (Platform.OS == 'android') {
    ToastAndroid.showWithGravity(
      value,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  } else {
    Alert.alert('Hotomo', value, [
      {
        text: 'Ok',
        onPress: () => {},
      },
    ]);
  }
};

// Async storage Getitem ;
export const getItem = async key => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    // error reading value
    LOG('ERROR ' + JSON.stringify(e));
    return null;
  }
};

// asynstorage set item
export const storeItem = async (key, value) => {
  try {
    // LOG("STORING Key : " + key + " Value : " + value);
    return await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
    LOG('ERROR ' + JSON.stringify(e));
    return null;
  }
};

// asynstorage Remove item
export const removeItem = async key => {
  try {
    LOG('Removing Key : ' + key);
    return await AsyncStorage.removeItem(key);
  } catch (e) {
    // saving error
    LOG('ERROR ' + JSON.stringify(e));
    return null;
  }
};

export const sSize = {
  width,
  height,
};

export const globalStyle = {
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: sSize.height * 0.07,
  },
};

export const onBackPressGlobal = () => {
  RootNav.navigationRef.goBack();
};

export const globalExitAlert = () => {
  Alert.alert(appJson.displayName, 'Are you sure want to exit ?', [
    {
      text: 'Cancel',
    },
    {
      text: 'OK',
      onPress: () => BackHandler.exitApp(),
    },
  ]);
};

export const globalLogOutAlert = () => {
  Alert.alert(appJson.displayName, 'Are you sure want to logout ?', [
    {
      text: 'Cancel',
    },
    {
      text: 'OK',
      onPress: async () => {
        await messaging().deleteToken(); //deleting token for creating new token for the new logging user
        removeItem('token');
        RootNav.navigationRef.reset({index: 0, routes: [{name: 'logIn'}]});
      },
    },
  ]);
};

export const getFcmToken = async () => {
  const token = await messaging().getToken();
  LOG('FCM token client ====> :', token);
  return token;
};

export const displayNotification = async data => {
  LOG('displayNotification received notify data :', data);

  await notifee.requestPermission();

  const channel = await notifee.createChannel({
    id: 'default',
    name: 'Vigneshwaran',
    importance: AndroidImportance.HIGH,
    lightColor: AndroidColor.WHITE,
    bypassDnd: true,
    visibility: AndroidVisibility.PUBLIC,
  });

  const notifyTitle = data.notification.title;
  const notifyBody = data.notification.body;

  await notifee.displayNotification({
    title: notifyTitle,
    body: notifyBody,
    // subtitle: appJson.displayName, //showing text with notification //show type of notification
    android: {
      channelId: channel,
      smallIcon: 'ic_launcher_foreground',
      smallIconLevel: 1000,
      colorized: true,
      color: AndroidColor.WHITE,
      circularLargeIcon: true,
      largeIcon: data.data.profileUrl, //working
      importance: AndroidImportance.HIGH,
      lightUpScreen: true,
      visibility: AndroidVisibility.PUBLIC,
      style: {
        type: AndroidStyle.BIGPICTURE,
        picture: data.data.postUrl,
        title: notifyTitle,
        summary: notifyBody,
      },

      pressAction: {
        id: 'default',
        launchActivity: 'default',
        launchActivityFlags: [AndroidLaunchActivityFlag.SINGLE_TOP],
      },
      // chronometerDirection: 'up',
      // showChronometer: true, //shows timer in notification
      // progress: {max: 100, current: 10, indeterminate: true},
    },
  });
};
