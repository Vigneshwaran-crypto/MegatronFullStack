import React, {useEffect} from 'react';
import {Dimensions, Platform, StyleSheet, Text, View} from 'react-native';

import {textFontFaceMedium} from '../../common/styles';
import {useNavigation} from '@react-navigation/native';
import {PermissionsAndroid} from 'react-native';
import {colors} from '../../common/colors';
import AnimatedLottieView from 'lottie-react-native';
import {LOG} from '../../common/utils';

const win = Dimensions.get('window');

const Application = () => {
  const navigation = useNavigation();

  useEffect(() => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.requestMultiple([
        'android.permission.READ_EXTERNAL_STORAGE',
        'android.permission.WRITE_EXTERNAL_STORAGE',
      ])
        .then(res => {
          LOG('getting userPermission in application : ', res);
        })
        .catch(err => {
          LOG('err in getting user permission in application :', err);
        });
    }

    moveToLog();
  }, []);

  const moveToLog = () => {
    navigation.navigate('logIn');
  };

  return (
    <View style={styles.container}>
      <AnimatedLottieView
        source={require('../../../assets/animeJson/globe.json')}
        speed={3}
        autoPlay
        loop
        style={styles.loaderAnime}
      />

      <View style={styles.iconImgView}>
        <Text style={styles.titleText}>Hotomo</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'space-around',
  },
  iconImgView: {
    alignItems: 'center',
  },
  iconImg: {
    resizeMode: 'contain',
    height: win.width * 0.36,
    width: win.width * 0.4,
  },
  titleText: {
    color: colors.iconGreen,
    fontFamily: textFontFaceMedium,
    fontSize: 28,
  },
  scanAnimeParent: {
    flex: 1,
    justifyContent: 'space-around',
  },
  loaderAnime: {
    height: '60%',
    width: '100%',
  },
});

export default Application;
