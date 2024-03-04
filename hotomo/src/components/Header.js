import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {onBackPressGlobal, sSize} from '../common/utils';
import {textFontFace, textFontFaceMedium} from '../common/styles';
import IoniCons from 'react-native-vector-icons/Ionicons';
import {colors} from '../common/colors';
import {useSelector} from 'react-redux';
import {serverUrl} from '../common/constant';

const Header = ({title, profile}) => {
  const userDetails = useSelector(({main}) => main.userDetails);
  const profileImageUrl = `${serverUrl}Users/admin/Desktop/Vignesh/imageBank/${userDetails.profileImage}`;

  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <TouchableOpacity onPress={onBackPressGlobal}>
          <IoniCons
            name="return-up-back"
            color={colors.mediumBlue}
            size={sSize.width * 0.09}
          />
        </TouchableOpacity>

        <Text style={styles.titleText}>{title}</Text>
      </View>

      <Image
        source={{uri: profileImageUrl}}
        style={[styles.profImage, {display: profile ? 'flex' : 'none'}]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: sSize.height * 0.1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 18,
  },
  titleView: {},
  titleText: {
    fontFamily: textFontFace,
    fontSize: sSize.width * 0.048,
    color: colors.darkBlue,
  },
  profImage: {
    height: sSize.width * 0.1,
    width: sSize.width * 0.1,
    borderRadius: sSize.width * 0.05,
    resizeMode: 'cover',
    alignSelf: 'flex-end',
  },
});

export default Header;
