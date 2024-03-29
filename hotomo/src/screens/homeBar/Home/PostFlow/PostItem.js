import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {filePath, serverUrl} from '../../../../common/constant';
import {LOG, sSize} from '../../../../common/utils';
import {useDispatch, useSelector} from 'react-redux';
import {
  textFontFace,
  textFontFaceLight,
  textFontFaceMedium,
} from '../../../../common/styles';
import {colors} from '../../../../common/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {apiCallAndStore} from '../../../../redux/middleware';
import {likePostAct} from '../../../../redux/authAction';
import moment from 'moment';
import Video, {DRMType, VideoRef} from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PostItem = ({
  item,
  index,
  onCommentPress,
  onMenuPress,
  visibleItemIndex,
}) => {
  const dispatch = useDispatch();
  const userDetails = useSelector(({main}) => main.userDetails);

  const postImageUri = filePath + item.image;
  const profileImageUrl = filePath + item.userImage;

  const [showFull, setShowFull] = useState(false);

  const caption = item.caption;
  const shortCap = caption.length > 10 ? caption.slice(0, 10) + '...' : caption;

  const playerRef = useRef(VideoRef);

  const [showPlayAgain, setShowPlayAgain] = useState(false);

  const likePost = () => {
    const req = {
      postId: item._id,
      reactionType: '1',
    };
    dispatch(apiCallAndStore(likePostAct(req)));
  };

  const onVideoError = err => {
    LOG('video error :', err);
    LOG('onVideoError link : ', postImageUri);
  };

  const onVideoBuffer = buff => {
    LOG('onVideoBuffer :', buff);
  };

  const onPlayedEnd = () => {
    LOG('Played video ended :');
    setShowPlayAgain(true);
  };

  const onPlayAgainPress = () => {
    setShowPlayAgain(false);
  };

  return (
    <View key={index} style={styles.container}>
      <View style={styles.profileView}>
        <View style={styles.profileImageCont}>
          <Image
            source={{uri: profileImageUrl}}
            resizeMode="cover"
            resizeMethod="resize"
            style={styles.profileImageCont}
          />
        </View>

        <View style={styles.profileNameView}>
          <Text style={styles.userNameText}>{item.userName}</Text>
          <Text style={styles.postedDateText}>
            {moment(item.createdAt).calendar()}
          </Text>
        </View>

        <View style={styles.kebabMenuView}>
          <TouchableOpacity onPress={onMenuPress.bind(this, item)}>
            <Entypo
              size={sSize.width * 0.05}
              color={colors.black}
              name={'dots-three-horizontal'}
              style={{alignSelf: 'flex-end'}}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.postImageCont}>
        {item.postType === 'video' ? (
          <View style={styles.videoHolder}>
            <Video
              ref={playerRef}
              resizeMode="stretch"
              drm={DRMType.WIDEVINE}
              source={{uri: postImageUri, customImageUri: profileImageUrl}}
              onError={onVideoError}
              onEnd={onPlayedEnd}
              repeat={!showPlayAgain}
              paused={index !== visibleItemIndex || showPlayAgain}
              style={{flex: 1, height: sSize.height / 1.5, width: sSize.width}}
            />

            {showPlayAgain && (
              <TouchableOpacity
                style={styles.itemPlayIcon}
                onPress={onPlayAgainPress}>
                <Ionicons
                  name={'play'}
                  color={colors.white}
                  size={sSize.width * 0.25}
                />
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View style={styles.postImageHolder}>
            <Image
              source={{uri: postImageUri}}
              resizeMethod="resize"
              style={styles.postImage}
              blurRadius={showFull ? 5 : 0}
            />
          </View>
        )}

        <TouchableOpacity
          style={styles.captionTextView}
          onPress={() => setShowFull(!showFull)}>
          {showFull ? (
            <Text style={styles.captiontext}>{caption}</Text>
          ) : (
            <Text style={styles.captiontext}>{shortCap}</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.postReactionView}>
        <View style={styles.lastReactedProfiles}></View>

        <View style={styles.likeCmdShareView}>
          <TouchableOpacity style={styles.actionButtons} onPress={likePost}>
            <AntDesign
              size={sSize.width * 0.055}
              color={colors.black}
              name={item.youLiked ? 'heart' : 'hearto'}
              style={{color: item.youLiked ? colors.likeRed : colors.darkBlue}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButtons}
            onPress={() => onCommentPress(item)}>
            <AntDesign
              size={sSize.width * 0.055}
              color={colors.black}
              name={'message1'}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButtons}>
            <AntDesign
              size={sSize.width * 0.055}
              color={colors.black}
              name={'sharealt'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 5,
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 8,
  },
  profileView: {
    flexDirection: 'row',
  },
  profileImageCont: {
    height: sSize.width * 0.12,
    width: sSize.width * 0.12,
    borderRadius: sSize.width * 0.06,
  },
  profileNameView: {
    flex: 3,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  userNameText: {
    fontFamily: textFontFaceMedium,
    color: colors.darkBlue,
    fontSize: sSize.width * 0.037,
  },
  postedDateText: {
    fontFamily: textFontFace,
    color: colors.darkGrey,
    fontSize: sSize.width * 0.025,
  },
  kebabMenuView: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  postImageCont: {
    marginVertical: 10,
    width: '100%',
    borderRadius: 10,
  },
  postImageHolder: {
    alignSelf: 'center',
    width: '100%',
    height: '100%',
    flex: 1,
  },
  postImage: {
    width: undefined,
    height: undefined,
    // width: sSize.width,
    // height: sSize.height / 1.5,
    aspectRatio: 1,
    flex: 1,
  },
  postReactionView: {
    flex: 1,
    flexDirection: 'row',
    height: sSize.width * 0.1,
  },
  lastReactedProfiles: {
    // borderWidth: 1,
    flex: 1.5,
  },
  likeCmdShareView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginStart: 15,
  },
  actionButtons: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  captionTextView: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'flex-end',
    shadowColor: colors.white,
    backgroundColor: 'rgba(128, 128, 128, 0.4)',
    paddingHorizontal: 5,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 8,
  },
  captiontext: {
    fontFamily: textFontFace,
    color: colors.white,
    fontSize: sSize.width * 0.03,
    marginVertical: 5,
    lineHeight: 13,
  },

  videoHolder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemPlayIcon: {
    position: 'absolute',
    zIndex: 6,
    elevation: 6,
    shadowColor: colors.black,
  },
});

export default PostItem;
