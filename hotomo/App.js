import React, {useEffect} from 'react';
import {Platform, SafeAreaView, StyleSheet, Text, View} from 'react-native';

const App = () => {
  useEffect(() => {
    console.log('Hello Vingesh Waran');

    console.log('Hello developer Im new Architecture');

    console.log('Changed all');

    if (Platform.OS === 'android') {
      console.log('Hello This Is ANDROID DEVICE yes changed');
    } else {
      console.log('Hello This Is IOS DEVICE absolutely');
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text>Welcome To The New Architecture</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
});

export default App;
