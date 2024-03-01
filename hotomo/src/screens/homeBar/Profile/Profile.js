import {
  Image,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {colors} from '../../../common/colors';
import {LOG, sSize} from '../../../common/utils';
import {
  textFontFace,
  textFontFaceLight,
  textFontFaceMedium,
} from '../../../common/styles';
import {useDispatch, useSelector} from 'react-redux';
import {apiCallAndStore} from '../../../redux/middleware';
import {editUserNameOrBio, userImagesUpload} from '../../../redux/authAction';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {serverUrl} from '../../../common/constant';

const Profile = () => {
  const dispatch = useDispatch();
  const userDetails = useSelector(({main}) => main.userDetails);

  const [bio, setBio] = useState('');
  const [name, setName] = useState('');

  const [isKeyboard, setIsKeyboard] = useState(false);

  const imageEditRB = useRef();

  const isProfOrCover = useRef(0);

  const profileImageUrl = `${serverUrl}Users/admin/Desktop/Vignesh/imageBank/${userDetails.profileImage}`;
  const coverImageUrl = `${serverUrl}Users/admin/Desktop/Vignesh/imageBank/${userDetails.coverImage}`;

  const staticS =
    'http://172.16.16.31:5000/api/Users/admin/Desktop/Vignesh/imageBank/1709209056472-480040326.jpg';

  useEffect(() => {
    LOG('image uri sample :', profileImageUrl);

    LOG('userDeTails in profile :', userDetails);
    if (Object.keys(userDetails).length !== 0) {
      setBio(userDetails.bio);
      setName(userDetails.userName);
    }

    launchImageLibrary;
  }, [userDetails]);

  useEffect(() => {
    const openedKeyboard = Keyboard.addListener('keyboardDidShow', () =>
      setIsKeyboard(true),
    );
    const hideKeyboard = Keyboard.addListener('keyboardDidHide', () =>
      setIsKeyboard(false),
    );

    return () => {
      openedKeyboard.remove();
      hideKeyboard.remove();
    };
  }, []);

  const onBioUserNameSubmit = () => {
    const req = {
      userName: name,
      bio,
    };
    dispatch(apiCallAndStore(editUserNameOrBio(req)));
  };

  const onEditImagePress = to => {
    imageEditRB.current.open();

    isProfOrCover.current = to;

    console.log('clikced for', +to);
  };

  const onImagePress = async is => {
    let imageProp = {};
    // cameraPress
    if (is === 0) {
      const capturedImage = await launchCamera({
        saveToPhotos: true,
        quality: 1,
        mediaType: 'photo',
        presentationStyle: 'currentContext',
      });

      imageProp = capturedImage.assets[0];
    } else {
      const chosenImage = await launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
        presentationStyle: 'currentContext',
        assetRepresentationMode: 'compatible',
        selectionLimit: 1,
      });

      imageProp = chosenImage.assets[0];
    }

    const imgJson = {
      uri: imageProp.uri,
      type: imageProp.type,
      name: imageProp.fileName,
    };

    LOG('imageJson :', imgJson);

    const uploadForm = new FormData();

    if (isProfOrCover.current === 1) {
      uploadForm.append('fileData', imgJson);
    } else {
      uploadForm.append('coverData', imgJson);
    }

    dispatch(apiCallAndStore(userImagesUpload(uploadForm)));

    imageEditRB.current.close();
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileCont}>
        <View style={styles.coverImageCont}>
          <TouchableOpacity onPress={onEditImagePress.bind(this, 0)}>
            <Image
              // source={require('../../../assets/Images/catCover.jpg')}
              source={{uri: coverImageUrl}}
              resizeMode="cover"
              style={styles.coverImage}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onEditImagePress.bind(this, 1)}
            style={[
              styles.profileImageView,
              {display: isKeyboard ? 'none' : 'flex'},
            ]}>
            <Image
              // source={require('../../../assets/appIcons/profileImg.jpg')}
              source={{uri: profileImageUrl}}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.profileContView}>
          {/* separator */}
          <View style={styles.followersView} />

          <View
            style={[
              styles.followersView,
              {display: isKeyboard ? 'none' : 'flex'},
            ]}>
            <Text style={styles.countText}>56k</Text>
            <Text style={styles.followerText}>Followers</Text>
          </View>

          <View
            style={[
              styles.followersView,
              {display: isKeyboard ? 'none' : 'flex'},
            ]}>
            <Text style={styles.countText}>10</Text>
            <Text style={styles.followerText}>Following</Text>
          </View>

          <View style={styles.userCont}>
            <TextInput
              style={styles.userNameText}
              maxLength={25}
              onChangeText={setName}
              value={name}
              onSubmitEditing={onBioUserNameSubmit}
              numberOfLines={1}
              multiline={false}
            />
            <TextInput
              style={styles.bioText}
              placeholder="Write bio"
              maxLength={35}
              onChangeText={setBio}
              value={bio}
              onSubmitEditing={onBioUserNameSubmit}
              numberOfLines={1}
              multiline={false}
            />
          </View>
        </View>
      </View>
      <View style={styles.postCont}></View>

      <RBSheet
        ref={imageEditRB}
        height={sSize.height / 7}
        animationType="fade"
        customStyles={{
          container: styles.rbContainer,
          wrapper: styles.rnWrapper,
        }}>
        <TouchableOpacity
          style={styles.imageButtonCombo}
          onPress={onImagePress.bind(this, 0)}>
          <Feather
            name={'camera'}
            size={sSize.width * 0.07}
            color={colors.royalBlue}
          />
          <Text style={styles.camText}>Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.imageButtonCombo}
          onPress={onImagePress.bind(this, 1)}>
          <Feather
            name={'folder'}
            size={sSize.width * 0.07}
            color={colors.royalBlue}
          />
          <Text style={styles.camText}>Upload</Text>
        </TouchableOpacity>
      </RBSheet>
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
    height: sSize.width * 0.3,
    width: sSize.width * 0.3,
    borderRadius: sSize.width * 0.15,
    alignSelf: 'flex-start',
    bottom: -sSize.width * 0.15,
    start: sSize.width * 0.04,
    elevation: 3,
    zIndex: 3,
    shadowColor: colors.black,
    backgroundColor: colors.white,
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
    alignSelf: 'flex-end',
    position: 'absolute',
    shadowColor: colors.transparent,
    bottom: sSize.width * 0.02,
  },
  userNameText: {
    fontFamily: textFontFace,
    color: colors.darkBlue,
    fontSize: sSize.width * 0.039,
    paddingStart: 15,
    paddingVertical: 5,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  bioText: {
    fontFamily: textFontFaceLight,
    color: colors.darkBlue,
    fontSize: sSize.width * 0.035,
    textAlign: 'left',
    paddingStart: 15,
    paddingVertical: 5,
  },
  postCont: {
    flex: 1,
    borderWidth: 1,
  },

  rbContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rnWrapper: {},
  imageButtonCombo: {
    alignItems: 'center',
    marginHorizontal: 30,
  },
  camText: {
    fontFamily: textFontFace,
    color: colors.darkBlue,
    fontSize: sSize.width * 0.037,
  },
});

export default Profile;