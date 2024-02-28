import React, {useState} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Checkbox} from 'react-native-paper';
import {colors} from '../../common/colors';
import {
  textFontFace,
  textFontFaceMedium,
  textFontFaceSemiBold,
} from '../../common/styles';

import {useDispatch} from 'react-redux';
import {Toast, sSize} from '../../common/utils';
import {apiCallAndStore} from '../../redux/middleware';
import {createUser} from '../../redux/authAction';

const {width} = Dimensions.get('window');

const CreateUser = () => {
  const dispatch = useDispatch();
  const [isChecked, setIsChecked] = useState(false);

  const [email, setMail] = useState('');
  const [password, setPass] = useState('');

  const onJoinPress = () => {
    if (!email) {
      Toast('Please enter email or phone');
    } else if (!password) {
      Toast('Please enter password');
    } else {
      const req = {
        email: email.toLocaleLowerCase(),
        password,
      };

      dispatch(apiCallAndStore(createUser(req)));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.vectorContent}>
        <Image
          source={require('../../../assets/Images/create.jpg')}
          style={styles.mentorImage}
          resizeMode="contain"
        />
      </View>

      <View style={styles.AuthContent}>
        <Text style={styles.sTitle}> Create User </Text>

        <View style={styles.inputContents}>
          <Text style={styles.labelText}>Email</Text>
          <TextInput
            style={styles.inputField}
            onChangeText={setMail}
            value={email}
          />

          <Text style={[styles.labelText, {marginTop: 10}]}>
            Set a Password
          </Text>
          <TextInput
            style={styles.inputField}
            secureTextEntry
            onChangeText={setPass}
            value={password}
          />

          <View style={styles.agreeView}>
            <Checkbox
              status={isChecked ? 'checked' : 'unchecked'}
              color={colors.mediumBlue}
              onPress={() => setIsChecked(!isChecked)}
            />

            <Text style={styles.agreeText}>
              Agree to the{' '}
              <Text style={styles.termText}>Terms & Conditions</Text>
            </Text>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.logInButton} onPress={onJoinPress}>
            <LinearGradient
              colors={[colors.royalBlue, colors.mediumBlue]}
              start={{x: 1, y: 0}}
              end={{x: 0, y: 0}}
              style={styles.gradBG}>
              <Text style={styles.logInText}>Join Now</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
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
    height: '100%',
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

  sTitle: {
    fontFamily: textFontFaceSemiBold,
    color: colors.darkBlue,
    fontSize: sSize.width * 0.05,
  },

  labelText: {
    fontFamily: textFontFaceMedium,
    color: colors.darkBlue,
  },
  inputField: {
    borderWidth: 1,
    marginVertical: 12,
    borderRadius: 6,
    paddingVertical: 7,
    paddingHorizontal: 10,
    fontFamily: textFontFace,
  },

  agreeView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginStart: -10,
  },
  agreeText: {
    fontFamily: textFontFace,
    color: colors.mediumBlue,
  },
  termText: {
    textDecorationLine: 'underline',
  },
  actionButtons: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  gradBG: {
    width: width * 0.4,
    paddingVertical: 10,
    borderRadius: 8,
  },

  logInText: {
    color: colors.white,
    paddingBottom: 2,
    fontFamily: textFontFaceMedium,
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

export default CreateUser;
