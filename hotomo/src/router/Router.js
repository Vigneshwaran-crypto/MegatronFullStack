import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Application from '../screens/app/Application';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './RootNav';
import HomeTab from './HomeTab';
import Login from '../screens/auth/Login';
import CreateUser from '../screens/auth/CreateUser';
import {Screen} from 'react-native-screens';
import CreatePost from '../screens/homeBar/Home/PostFlow/CreatePost';
import PostGallery from '../screens/homeBar/Home/PostFlow/PostGallery';
import Settings from '../screens/homeBar/Profile/Settings';
import Notification from '../screens/homeBar/Home/NotificationFlow/Notification';
import Message from '../screens/homeBar/Chat/Message';

const Router = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="application">
        <Stack.Screen
          name="application"
          component={Application}
          options={{
            headerShown: false,
            animation: 'fade_from_bottom',
          }}
        />

        <Stack.Screen
          name="logIn"
          component={Login}
          options={{
            headerShown: false,
            animation: 'simple_push',
          }}
        />

        <Stack.Screen
          name="createUser"
          component={CreateUser}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />

        <Stack.Screen
          name="homeTab"
          component={HomeTab}
          options={{
            headerShown: false,
            animation: 'simple_push',
          }}
        />

        <Stack.Screen
          name="createPost"
          component={CreatePost}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />

        <Stack.Screen
          name="postGallery"
          component={PostGallery}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />

        <Stack.Screen
          name="settings"
          component={Settings}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />

        <Stack.Screen
          name="notification"
          component={Notification}
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
        />

        <Stack.Screen
          name="message"
          component={Message}
          options={{
            headerShown: false,
            animation: 'slide_from_bottom',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
