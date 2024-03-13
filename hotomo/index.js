/**
 * @format
 * Author - Vigneshwaran
 */

import {AppRegistry} from 'react-native';
import App from './src/screens/app/App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {useEffect} from 'react';
import {LOG, displayNotification} from './src/common/utils';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

messaging()
  .registerDeviceForRemoteMessages()
  .then(res => {
    LOG('app registered for pushNotification :', res);
  })
  .catch(err => {
    LOG('app registered for pushNotification failed:', err);
  });

messaging().setBackgroundMessageHandler(async notify => {
  LOG('push notification inBackGround :', notify);
  displayNotification();
});

notifee.onBackgroundEvent(async ({type, detail}) => {
  LOG('backGround event :', type);
});

const PackedApp = () => {
  useEffect(() => {
    LOG('===========================');
    LOG('Megatron FullStack FrontEnd');
    LOG('===========================');
  }, []);

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => PackedApp);
