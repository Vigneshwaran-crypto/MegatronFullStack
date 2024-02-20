import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {apiCallAndStore} from '../../redux/middleware';
import {testAction} from '../../redux/authAction';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('Hello Vingesh Waran');
    dispatch(apiCallAndStore(testAction()));
  }, []);

  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
