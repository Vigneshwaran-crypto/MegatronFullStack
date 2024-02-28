import React, {useEffect} from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {apiCallAndStore} from '../../redux/middleware';
import {testAction} from '../../redux/authAction';
import Feather from 'react-native-vector-icons/Feather';
import Router from '../../router/Router';
import {colors} from '../../common/colors';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={colors.mediumBlue}
        barStyle={'light-content'}
      />
      <View style={styles.container}>
        <Router />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
});

export default App;
