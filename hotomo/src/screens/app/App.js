import React, {useEffect} from 'react';
import {Platform, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {apiCallAndStore} from '../../redux/middleware';
import {testAction} from '../../redux/authAction';
import Feather from 'react-native-vector-icons/Feather';
import Router from '../../router/Router';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Hello Vingesh Waran');

    dispatch(apiCallAndStore(testAction()));

    if (Platform.OS === 'android') {
      console.log('Hello This Is ANDROID DEVICE yes changed');
    } else {
      console.log('Hello This Is IOS DEVICE absolutely');
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
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
