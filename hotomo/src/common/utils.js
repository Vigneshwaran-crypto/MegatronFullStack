import {Alert, Platform, ToastAndroid} from 'react-native';

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
    Alert.alert('Jarvis', value, [
      {
        text: 'Ok',
        onPress: () => {},
      },
    ]);
  }
};
