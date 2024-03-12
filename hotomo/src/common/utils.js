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
      onPress: () => {
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
  await notifee.requestPermission();

  const channel = await notifee.createChannel({
    id: 'default',
    name: 'Vigneshwaran',
    importance: AndroidImportance.HIGH,
    lightColor: AndroidColor.WHITE,
    bypassDnd: true,
    visibility: AndroidVisibility.PUBLIC,
  });

  await notifee.displayNotification({
    title: 'Test Notification',
    body: 'Hello Hustler vigneshwaran',
    subtitle: appJson.displayName, //showing text with notification //show type of notification
    android: {
      channelId: channel,
      smallIcon: 'ic_launcher_foreground',
      smallIconLevel: 1000,
      // chronometerDirection: 'up',
      // showChronometer: true, //shows timer in notification
      colorized: true,
      color: AndroidColor.WHITE,
      circularLargeIcon: true,
      largeIcon: require('../../assets/Images/catCover.jpg'), //working
      importance: AndroidImportance.HIGH,
      lightUpScreen: true,
      ticker: 'ticker text',
      visibility: AndroidVisibility.PUBLIC,

      style: {
        type: AndroidStyle.BIGPICTURE,
        picture:
          'https://images.pexels.com/photos/34299/herbs-flavoring-seasoning-cooking.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        largeIcon: require('../../assets/Images/catCover.jpg'),
        title: 'Image title',
        summary: 'Please use this all',
      },
      // progress: {max: 100, current: 10, indeterminate: true},
      pressAction: {
        id: 'default',
        launchActivity: 'default',
        launchActivityFlags: [AndroidLaunchActivityFlag.SINGLE_TOP],
      },
    },
  });
};
