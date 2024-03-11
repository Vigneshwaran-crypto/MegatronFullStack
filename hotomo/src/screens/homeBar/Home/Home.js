import {useFocusEffect, useNavigation} from '@react-navigation/native';
import moment from 'moment';
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  BackHandler,
  Easing,
  FlatList,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import Entypo from 'react-native-vector-icons/Entypo';
import {useDispatch, useSelector} from 'react-redux';
import {colors} from '../../../common/colors';
import {textFontFace, textFontFaceLight} from '../../../common/styles';
import {LOG, Toast, globalExitAlert, sSize} from '../../../common/utils';
import ActionBar from '../../../components/ActionBar';
import {
  commentPostAct,
  getAllUsers,
  getPostComments,
} from '../../../redux/authAction';
import {apiCallAndStore} from '../../../redux/middleware';
import CommentItem from './PostFlow/CommentItem';
import PostItem from './PostFlow/PostItem';

const Home = memo(() => {
  const dispatch = useDispatch();
  const nav = useNavigation();

  const topBarAnime = useRef(new Animated.ValueXY({x: 0, y: 0})).current;

  const allPosts = useSelector(({main}) => main.allPosts);
  const userDetails = useSelector(({main}) => main.userDetails);
  const postComments = useSelector(({main}) => main.postComments);

  const commentRef = useRef(null);
  const keyMoveAnime = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const [cmtText, setCmtText] = useState('');
  const commentPost = useRef({});

  useEffect(() => {
    LOG('all post in home screen :', allPosts);
    LOG('userDetails in home screen :', userDetails);
  }, [allPosts]);

  useEffect(() => {
    const whileKeyBoardShow = e => {
      Animated.timing(keyMoveAnime, {
        toValue: {x: 0, y: -e.endCoordinates.height},
        useNativeDriver: true,
        easing: Easing.ease,
        duration: 0,
      }).start();
    };

    const whileKeyboardHide = () => {
      Animated.timing(keyMoveAnime, {
        toValue: {x: 0, y: 0},
        useNativeDriver: true,
        duration: 2,
      }).start();
    };

    const showKeyboard = Keyboard.addListener(
      'keyboardDidShow',
      whileKeyBoardShow,
    );

    const hideKeyboard = Keyboard.addListener(
      'keyboardDidHide',
      whileKeyboardHide,
    );

    return () => {
      showKeyboard.remove();
      hideKeyboard.remove();
    };
  }, []);

  // Handling back handler
  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        globalExitAlert();
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }, []),
  );

  const commentOnPress = post => {
    LOG('clicked comment post :', post);

    const req = {postId: post._id};
    dispatch(apiCallAndStore(getPostComments(req)));

    commentRef.current.open();
    commentPost.current = post;
  };

  const onCmtSendPress = () => {
    if (!cmtText) {
      return Toast('Enter Comment and send');
    }

    const req = {
      postId: commentPost.current._id,
      comment: cmtText,
    };

    dispatch(apiCallAndStore(commentPostAct(req)));

    Keyboard.dismiss();
    setCmtText('');
  };

  const feedListScroll = event => {
    Animated.spring(topBarAnime, {
      useNativeDriver: true,
      toValue: event === 0 ? {x: 0, y: -sSize.height * 0.07} : {x: 0, y: 0},
      bounciness: 1,
    }).start();
  };

  const onPostsEndReached = () => {};

  const commentItemRenderer = ({item, index}) => (
    <CommentItem item={item} index={index} />
  );

  const renderPost = ({item, index}) => (
    <PostItem item={item} index={index} onCommentPress={commentOnPress} />
  );

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.topBarCont,
          {
            transform: [{translateY: topBarAnime.y}],
          },
        ]}>
        <ActionBar />
      </Animated.View>

      <View style={styles.feedCont}>
        <View style={styles.postFeedCont}>
          <FlatList
            style={styles.feedList}
            data={allPosts}
            key={(ite, ind) => ind}
            renderItem={renderPost}
            onMomentumScrollBegin={feedListScroll.bind(this, 0)}
            onMomentumScrollEnd={feedListScroll.bind(this, 1)}
            onEndReached={onPostsEndReached}
            ListHeaderComponent={<View style={styles.storyCont}></View>}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>

      <RBSheet
        height={undefined}
        openDuration={20}
        animationType="slide"
        closeOnPressBack
        closeOnPressMask
        closeOnDragDown
        ref={commentRef}
        customStyles={{
          container: styles.rbContainer,
          wrapper: styles.rbWrapper,
        }}>
        <View style={styles.commentListContainer}>
          <Text style={styles.commentTopic}>Comments</Text>

          <FlatList
            data={postComments}
            renderItem={commentItemRenderer}
            key={(ite, ind) => ind}
            ListEmptyComponent={
              <Text style={styles.commentEmptyText}>No comments to show</Text>
            }
          />
        </View>

        <Animated.View
          style={[
            styles.commentInputView,
            {transform: [{translateY: keyMoveAnime.y}]},
          ]}>
          <TextInput
            placeholder="Write Comment"
            style={styles.commentInput}
            multiline
            numberOfLines={4}
            onChangeText={setCmtText}
            value={cmtText}
          />
          <TouchableOpacity
            style={styles.commentSentButton}
            onPress={onCmtSendPress}>
            <Entypo name={'paper-plane'} color={colors.royalBlue} size={30} />
          </TouchableOpacity>
        </Animated.View>
      </RBSheet>
    </View>
  );
});

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
  },
  topBarCont: {
    position: 'absolute',
    zIndex: 2,
    elevation: 2,
    width: '100%',
  },
  feedCont: {
    flex: 1,
    marginTop: 3,
  },
  postFeedCont: {
    flex: 1,
    marginBottom: 0.7,
  },
  feedList: {
    paddingTop: sSize.height * 0.08,
  },
  storyCont: {
    flex: 1,
    borderWidth: 1,
    height: sSize.width * 0.25,
    marginBottom: 10,
  },
  rbContainer: {
    height: '80%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    padding: 10,
    justifyContent: 'center',
  },
  rbWrapper: {
    backgroundColor: 'rgba(2,2, 3, 0.3)',
  },

  commentListContainer: {
    flex: 1,
  },

  commentTopic: {
    alignSelf: 'center',
    fontFamily: textFontFace,
    color: colors.darkBlue,
    paddingVertical: 5,
  },
  commentInputView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 5,
    backgroundColor: colors.white,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: colors.royalBlue,
    width: '85%',
    borderRadius: 10,
    paddingHorizontal: 10,
    fontFamily: textFontFace,
    color: colors.royalBlue,
  },
  commentSentButton: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  commentEmptyText: {
    fontFamily: textFontFaceLight,
    color: colors.darkBlue,
    alignSelf: 'center',
  },
});
