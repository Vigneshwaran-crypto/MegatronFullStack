import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../../../../components/Header';
import {colors} from '../../../../common/colors';
import {textFontFace, textFontFaceLight} from '../../../../common/styles';
import {LOG, sSize} from '../../../../common/utils';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

import LinearGradient from 'react-native-linear-gradient';
import {useDispatch} from 'react-redux';
import {apiCallAndStore} from '../../../../redux/middleware';
import {createPost} from '../../../../redux/authAction';
import {createThumbnail} from 'react-native-create-thumbnail';

const CreatePost = props => {
  const dispatch = useDispatch();
  const post = props.route.params.post;

  const postType = post.type.split('/')[0];

  const [bio, setBio] = useState('');

  useEffect(() => {
    LOG('post data in create Post :', post);
  }, []);

  const sharePost = () => {
    const form = new FormData();

    const customReq = {...post, caption: bio};

    LOG('custom req :', customReq);

    form.append('postData', post);
    form.append('bio', bio);

    dispatch(apiCallAndStore(createPost(form)));
  };

  return (
    <View style={styles.container}>
      <Header title={'Create Post'} />
      <View style={styles.createPostContainer}>
        <View style={styles.postBioAndImageView}>
          <TouchableOpacity style={styles.postImageVew}>
            <Image
              style={styles.chosenImageForPost}
              source={{uri: post.uri}}
              resizeMode="contain"
            />
          </TouchableOpacity>

          <TextInput
            style={styles.bioInput}
            textAlignVertical="top"
            multiline={true}
            numberOfLines={7}
            cursorColor={colors.mediumBlue}
            placeholder="Write caption"
            scrollEnabled={true}
            value={bio}
            onChangeText={setBio}
          />
        </View>

        <View style={styles.postTagsView}>
          <TouchableOpacity style={styles.listButtonItem}>
            <Ionicons
              size={23}
              color={colors.mediumBlue}
              name={'location-outline'}
              style={{paddingHorizontal: 5}}
            />
            <Text style={styles.itemButtontext}>Add location</Text>

            <Entypo
              size={30}
              color={colors.black}
              name={'chevron-small-right'}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.listButtonItem}>
            <AntDesign
              size={23}
              color={colors.mediumBlue}
              name={'paperclip'}
              style={{paddingHorizontal: 5}}
            />
            <Text style={styles.itemButtontext}>Tag people</Text>

            <Entypo
              size={30}
              color={colors.black}
              name={'chevron-small-right'}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.listButtonItem}>
            <Ionicons
              size={23}
              color={colors.mediumBlue}
              name={'people-outline'}
              style={{paddingHorizontal: 5}}
            />
            <Text style={styles.itemButtontext}>Audience</Text>

            <Entypo
              size={30}
              color={colors.black}
              name={'chevron-small-right'}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.postButton} onPress={sharePost}>
            <LinearGradient
              colors={[colors.royalBlue, colors.darkBlue]}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={styles.postButtonGrad}>
              <Text style={styles.postText}>Share a Post</Text>
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
  },
  createPostContainer: {
    flex: 1,
    // borderWidth: 1,
    margin: 15,
  },
  postBioAndImageView: {
    flex: 1.4,
    // borderWidth: 1,
  },
  postImageVew: {
    flex: 1,
    // borderWidth: 1,
    margin: 10,
  },
  bioInput: {
    padding: 10,
    borderWidth: 0.5,
    borderColor: colors.matteWine,
    borderStyle: 'dashed',
    margin: 10,
    marginTop: -2,
    fontFamily: textFontFace,
    color: colors.darkBlue,
    fontSize: sSize.width * 0.035,
    letterSpacing: 0.5,
    borderRadius: 5,
    paddingVertical: 20,
  },
  chosenImageForPost: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    borderRadius: 5,
  },

  postTagsView: {
    flex: 1,
    paddingHorizontal: 10,
    padding: 20,
    justifyContent: 'space-between',
  },
  listButtonItem: {
    flexDirection: 'row',
    // borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    padding: 5,
  },
  itemButtontext: {
    fontFamily: textFontFace,
    color: colors.darkBlue,
    fontSize: sSize.width * 0.04,
    flex: 2,
  },
  postButton: {
    width: sSize.width * 0.5,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    // flex: 1,
    marginVertical: 15,
  },
  postButtonGrad: {
    borderRadius: 10,
  },
  postText: {
    fontFamily: textFontFace,
    fontSize: sSize.width * 0.04,
    color: colors.white,
    alignSelf: 'center',
    padding: 10,
  },
});

export default CreatePost;
