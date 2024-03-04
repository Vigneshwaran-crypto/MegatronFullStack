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
import {useNavigation} from '@react-navigation/native';

const ActionBar = () => {
  const nav = useNavigation();

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
        <TouchableOpacity onPress={onOptionsPress.bind(this, 0)}>
          <Image
            source={require('../../assets/appIcons/appIcon.png')}
            style={styles.profImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.optionButtonView}>
        <TouchableOpacity onPress={onOptionsPress.bind(this, 1)}>
          <AntDesign
            name="pluscircleo"
            color={colors.darkBlue}
            size={sSize.width * 0.062}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={onOptionsPress.bind(this, 2)}>
          <AntDesign
            name="hearto"
            color={colors.darkBlue}
            size={sSize.width * 0.06}
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
  },
  profileImageView: {
    flex: 2,
    justifyContent: 'center',
    paddingHorizontal: 15,
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
