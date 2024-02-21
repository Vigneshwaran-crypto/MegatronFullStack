import {Alert, Platform, ToastAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
