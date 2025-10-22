import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {sSize} from '../common/utils';
import {
  textFontFaceLight,
  textFontFaceMedium,
  textFontFaceStyle,
} from '../common/styles';
import {colors} from '../common/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {filePath} from '../common/constant';

const ActionBar = () => {
  const nav = useNavigation();
  const userDetails = useSelector(({main}) => main.userDetails);

  const profileImageUrl = filePath + userDetails.profileImage;

  const onOptionsPress = to => {
    //profile Press
    if (to === 0) {
    } else if (to === 1) {
      //createPost Press
      // nav.navigate('postGallery');

      nav.reset({
        index: 1,
        routes: [{name: 'homeTab'}, {name: 'postGallery'}],
      });

      //       navigation.reset({
      //         index: 0,
      //         routes: [{name: 'signIn'}],
      //       });
    } else {
      //notify Press
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileImageView}>
        <TouchableOpacity
          style={styles.profileCont}
          onPress={onOptionsPress.bind(this, 0)}>
          <Image
            // source={require('../../assets/appIcons/appIcon.png')}
            source={{uri: profileImageUrl}}
            style={styles.profImage}
          />

          <Text style={styles.uNametxt}>{userDetails.userName}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.optionButtonView}>
        <TouchableOpacity onPress={onOptionsPress.bind(this, 1)}>
          <AntDesign
            name="pluscircleo"
            color={colors.mediumBlue}
            size={sSize.width * 0.062}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={onOptionsPress.bind(this, 2)}>
          <Feather
            name="bell"
            color={colors.mediumBlue}
            size={sSize.width * 0.063}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: sSize.height * 0.07,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: colors.white,
  },
  profileImageView: {
    flex: 2,
    justifyContent: 'center',
    paddingHorizontal: 15,
  },

  profileCont: {
    flexDirection: 'row',
    gap: 10,
    display: 'flex',
    alignItems: 'center',
  },

  uNametxt: {
    fontSize: 17,
  },

  profImage: {
    height: sSize.width * 0.09,
    width: sSize.width * 0.09,
    borderRadius: sSize.width * 0.05,
  },
  optionButtonView: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default ActionBar;
