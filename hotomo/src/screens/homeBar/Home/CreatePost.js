import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../../components/Header';

const CreatePost = () => {
  return (
    <View style={styles.container}>
      <Header />
      {/* <Text>CreatePost Screen</Text> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CreatePost;
