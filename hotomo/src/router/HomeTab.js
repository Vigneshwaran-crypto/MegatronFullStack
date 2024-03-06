import {BackHandler, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Octicons from 'react-native-vector-icons/Octicons';

// Tab Screens
import Home from '../screens/homeBar/Home/Home';
import Chat from '../screens/homeBar/Chat/Chat';
import Profile from '../screens/homeBar/Profile/Profile';
import {colors} from '../common/colors';
import {sSize} from '../common/utils';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const HomeTab = () => {
  const dispatch = useDispatch();
  const nav = useNavigation();
  const Tab = createBottomTabNavigator();

  const tabIconSize = sSize.width * 0.06;

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.royalBlue,
        tabBarInactiveTintColor: colors.darkGrey,
        tabBarHideOnKeyboard: true,
        tabBarStyle: styles.tabBarContainer,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => (
            <View style={styles.tabBarIconContainer(focused)}>
              <Feather
                name="home"
                color={focused ? colors.white : colors.grey}
                size={tabIconSize - 1}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="chat"
        component={Chat}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => (
            <View style={styles.tabBarIconContainer(focused)}>
              <Fontisto
                name="hipchat"
                color={focused ? colors.white : colors.grey}
                size={tabIconSize - 3}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: ({focused, color, size}) => (
            <View style={styles.tabBarIconContainer(focused)}>
              <Octicons
                name="person"
                color={focused ? colors.white : colors.grey}
                size={tabIconSize - 2}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    elevation: 10,
    zIndex: 10,
    height: sSize.width * 0.14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.mediumBlue,
    backgroundColor: colors.white,
  },
  tabBarIconContainer: focused => ({
    alignItems: 'center',
    justifyContent: 'center',
    height: sSize.width * 0.1,
    width: sSize.width * 0.1,
    borderRadius: sSize.width * 0.05,
    backgroundColor: focused ? colors.royalBlue : colors.white,
  }),
});

export default HomeTab;
