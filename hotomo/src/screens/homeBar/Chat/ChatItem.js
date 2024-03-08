import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {sSize} from '../../../common/utils';
import {colors} from '../../../common/colors';
import {serverUrl} from '../../../common/constant';
import {textFontFace} from '../../../common/styles';
import {useNavigation} from '@react-navigation/native';

const ChatItem = ({item, index}) => {
  const nav = useNavigation();
  const profileImageUrl = `${serverUrl}Users/admin/Desktop/Vignesh/imageBank/${item.profileImage}`;

  const onItemPress = () => {
    nav.navigate('message', {item});
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.chatCont} onPress={onItemPress}>
        <View style={styles.profileImageHolder}>
          <Image style={styles.profileImage} source={{uri: profileImageUrl}} />
        </View>

        <Text style={styles.userNameText}>{item.userName}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 7,
  },
  chatCont: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,
  },

  profileImageHolder: {
    height: sSize.width * 0.12,
    width: sSize.width * 0.12,
    borderRadius: sSize.width * 0.1,
    justifyContent: 'center',
    elevation: 4,
    zIndex: 4,
    shadowColor: colors.black,
    backgroundColor: colors.white,
  },
  profileImage: {
    height: sSize.width * 0.12,
    width: sSize.width * 0.12,
    borderRadius: sSize.width * 0.1,
    resizeMode: 'cover',
  },

  userNameText: {
    fontFamily: textFontFace,
    color: colors.darkBlue,
    marginStart: 12,
  },
});

export default ChatItem;
