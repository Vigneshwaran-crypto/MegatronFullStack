import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Application from '../screens/app/Application';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from './RootNav';
import HomeTab from './HomeTab';

const Router = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="homeTab">
        <Stack.Screen
          name="application"
          component={Application}
          options={{
            headerShown: false,
            animation: 'fade_from_bottom',
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
