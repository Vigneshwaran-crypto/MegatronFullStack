import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Octicons from 'react-native-vector-icons/Octicons';

// Tab Screens
import Home from '../screens/homeBar/Home';
import Chat from '../screens/homeBar/Chat';
import Profile from '../screens/homeBar/Profile';

const HomeTab = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'pink',
        tabBarInactiveTintColor: 'grey',
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
            <View style={styles.tabBarIconContainer}>
              <Feather name="home" color={color} size={28} />
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
            <View style={styles.tabBarIconContainer}>
              <Fontisto name="hipchat" color={color} size={25} />
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
            <View style={styles.tabBarIconContainer}>
              <Octicons name="person" color={color} size={25} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    // borderWidth: 1,
    marginTop: 10,
    elevation: 0,
    zIndex: 0,
    backgroundColor: 'black',
  },
  tabBarIconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeTab;
