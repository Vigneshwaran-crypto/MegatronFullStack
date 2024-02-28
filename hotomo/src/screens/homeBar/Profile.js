import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../common/colors';
import {LOG, sSize} from '../../common/utils';
import {
  textFontFace,
  textFontFaceLight,
  textFontFaceMedium,
} from '../../common/styles';
import {useDispatch, useSelector} from 'react-redux';
import {apiCallAndStore} from '../../redux/middleware';
import {editUserNameOrBio} from '../../redux/authAction';

const Profile = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector(({main}) => main.userDetails);

  const [bio, setBio] = useState('');
  const [name, setName] = useState(userDetails.userName);

  useEffect(() => {
    LOG('userDeTails in profile :', userDetails);
  }, [userDetails]);

  const onUserNameSubmit = () => {
    LOG('userName edited submitted');
  };

  const onBioSubmit = () => {
    LOG('userName Bio submitted');

    const req = {
      userName: name,
      bio,
    };

    dispatch(apiCallAndStore(editUserNameOrBio(req)));
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileCont}>
        <View style={styles.coverImageCont}>
          <Image
            source={require('../../../assets/Images/catCover.jpg')}
            resizeMode="cover"
            style={styles.coverImage}
          />

          <View style={styles.profileImageView}>
            <Image
              source={require('../../../assets/appIcons/profileImg.jpg')}
              style={styles.profileImage}
            />
          </View>
        </View>

        <View style={styles.profileContView}>
          <View style={styles.followersView}>
            <Text style={styles.countText}>56k</Text>
            <Text style={styles.followerText}>Followers</Text>
          </View>

          {/* separator */}
          <View style={styles.followersView} />

          <View style={styles.followersView}>
            <Text style={styles.countText}>56k</Text>
            <Text style={styles.followerText}>Following</Text>
          </View>

          <View style={styles.userCont}>
            <TextInput
              style={styles.userNameText}
              placeholder="Write bio"
              maxLength={30}
              onChangeText={setName}
              value={name}
              onSubmitEditing={onUserNameSubmit}
            />
            <TextInput
              style={styles.bioText}
              placeholder="Write bio"
              maxLength={45}
              onChangeText={setBio}
              value={bio}
              onSubmitEditing={onBioSubmit}
            />
          </View>
        </View>
      </View>
      <View style={styles.postCont}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  profileCont: {
    flex: 1,
  },
  coverImageCont: {
    flex: 1.7,
  },
  coverImage: {height: '100%', width: '100%'},
  profileImageView: {
    position: 'absolute',
    zIndex: 2,
    height: sSize.width * 0.3,
    width: sSize.width * 0.3,
    borderRadius: sSize.width * 0.15,
    backgroundColor: colors.red,
    alignSelf: 'center',
    bottom: -sSize.width * 0.15,
    elevation: 3,
    zIndex: 3,
    shadowColor: colors.black,
  },
  profileImage: {
    height: sSize.width * 0.3,
    width: sSize.width * 0.3,
    borderRadius: sSize.width * 0.15,
    resizeMode: 'cover',
  },
  profileContView: {
    flex: 1,
    flexDirection: 'row',
  },
  followersView: {
    flex: 1,
    alignSelf: 'flex-start',
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countText: {
    fontFamily: textFontFaceMedium,
    color: colors.royalBlue,
    fontSize: sSize.width * 0.04,
  },
  followerText: {
    fontFamily: textFontFace,
    color: colors.darkBlue,
    fontSize: sSize.width * 0.035,
    marginVertical: 3,
  },
  userCont: {
    flex: 1,
    borderColor: colors.red,
    alignSelf: 'flex-end',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: '100%',
    height: '40%',
    position: 'absolute',
    elevation: 15,
    zIndex: 15,
    shadowColor: colors.transparent,
  },
  userNameText: {
    fontFamily: textFontFace,
    color: colors.darkBlue,
    fontSize: sSize.width * 0.039,
    padding: 10,
  },
  bioText: {
    fontFamily: textFontFaceLight,
    color: colors.darkBlue,
    fontSize: sSize.width * 0.035,
    width: '80%',
    textAlign: 'center',
  },
  postCont: {
    flex: 1,
    borderWidth: 1,
  },
});

export default Profile;
