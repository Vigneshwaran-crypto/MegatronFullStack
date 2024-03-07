import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../../common/colors';
import Header from '../../../components/Header';

const Settings = () => {
  return (
    <View style={styles.container}>
      <Header title={'Settings'} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

export default Settings;
