import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {filePath, serverUrl} from '../../../common/constant';
import {colors} from '../../../common/colors';

const MyPostItem = ({item, index}) => {
  const postImageUri = filePath + item.image;
  return (
    <TouchableOpacity style={styles.container} key={index}>
      <Image source={{uri: postImageUri}} style={styles.postImage} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1 / 2,
  },
  postImage: {
    height: undefined,
    width: undefined,
    aspectRatio: 1,
    resizeMode: 'cover',
  },
});

export default MyPostItem;
