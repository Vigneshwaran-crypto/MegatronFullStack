import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {Alert, BackHandler, StyleSheet, View} from 'react-native';
import {useDispatch} from 'react-redux';
import ActionBar from '../../../components/ActionBar';
import {globalExitAlert} from '../../../common/utils';

const Home = () => {
  const dispatch = useDispatch();
  const nav = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        globalExitAlert();
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }, []),
  );

  return (
    <View style={styles.container}>
      <ActionBar />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
