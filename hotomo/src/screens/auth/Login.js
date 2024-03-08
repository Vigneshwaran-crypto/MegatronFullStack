import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch, useSelector} from 'react-redux';
import {colors} from '../../common/colors';
import {
  textFontFace,
  textFontFaceMedium,
  textFontFaceSemiBold,
} from '../../common/styles';
import {
  LOG,
  Toast,
  globalExitAlert,
  globalStyle,
  sSize,
} from '../../common/utils';
import {logIn} from '../../redux/authAction';
import {apiCallAndStore} from '../../redux/middleware';

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const user = useSelector(({main}) => main.userDetails);

  const isLoading = useSelector(({main}) => main.loading);

  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');

  useFocusEffect(
    useCallback(() => {
      const backPressed = () => {
        globalExitAlert();
        return true;
      };

      const backAction = BackHandler.addEventListener(
        'hardwareBackPress',
        backPressed,
      );

      return () => backAction.remove();
    }, []),
  );

  useEffect(() => {
    LOG('userDetails in LOGIN :', user);
  }, [user]);

  useEffect(() => {
    setMail('sela@gmail.com');
    setPass('12345');

    const mails = 'viki@gmail.com';

    console.log(mails.split('@')[0]);
  }, []);

  const onLogPress = () => {
    if (!mail) {
      Toast('Please enter email or phone');
    } else if (!pass) {
      Toast('Please enter password');
    } else {
      const req = {
        email: mail.toLocaleLowerCase(),
        password: pass,
      };

      dispatch(apiCallAndStore(logIn(req)));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.vectorContent}>
        <Image
          source={require('../../../assets/Images/media.jpg')}
          style={styles.mentorImage}
        />

        <Text style={styles.desText}>Welcome to the 3D world</Text>
      </View>

      <View style={styles.AuthContent}>
        <View style={styles.inputContents}>
          <Text style={styles.labelText}>Email Or Phone</Text>
          <TextInput
            style={styles.inputField}
            onChangeText={setMail}
            value={mail}
          />

          <Text style={[styles.labelText, {marginTop: 10}]}>Password</Text>
          <TextInput
            style={styles.inputField}
            // secureTextEntry
            onChangeText={setPass}
            value={pass}
          />

          <TouchableOpacity onPress={() => navigation.navigate('enterOtp')}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.logInButton} onPress={onLogPress}>
            <LinearGradient
              colors={[colors.royalBlue, colors.darkBlue]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.gradBG}>
              <Text style={styles.logInText}>Login</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('createUser')}>
            <Text style={styles.newUserText}> New User</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ActivityIndicator
        animating={isLoading}
        color={colors.royalBlue}
        size={'large'}
        style={globalStyle.loader}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  vectorContent: {
    flex: 1,
    alignItems: 'center',
  },
  mentorImage: {
    width: '100%',
    height: '90%',
    resizeMode: 'contain',
  },
  desText: {
    fontFamily: textFontFace,
    color: colors.royalBlue,
    fontSize: 17,
  },
  AuthContent: {
    flex: 1.3,
    alignItems: 'center',
  },

  inputContents: {
    flex: 2,
    width: '70%',
    justifyContent: 'center',
  },

  labelText: {
    fontFamily: textFontFaceMedium,
    color: colors.darkBlue,
  },
  inputField: {
    marginVertical: 12,
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontFamily: textFontFace,
    backgroundColor: '#F3F3F3',
  },
  forgotText: {
    fontFamily: textFontFaceSemiBold,
    color: colors.mediumBlue,
    alignSelf: 'flex-end',
  },
  actionButtons: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  gradBG: {
    width: sSize.width * 0.3,
    paddingVertical: 10,
    borderRadius: 8,
  },

  logInText: {
    color: colors.white,
    paddingBottom: 2,
    fontFamily: textFontFace,
    letterSpacing: 0.15,
    alignSelf: 'center',
  },
  newUserText: {
    fontFamily: textFontFace,
    color: colors.royalBlue,
    textDecorationColor: colors.red,
    textDecorationLine: 'underline',
    textDecorationStyle: 'double',
  },
});

export default Login;
