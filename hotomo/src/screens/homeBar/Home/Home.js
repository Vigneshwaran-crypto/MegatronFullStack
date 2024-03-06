import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  BackHandler,
  FlatList,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import {LOG, globalExitAlert, sSize} from '../../../common/utils';
import ActionBar from '../../../components/ActionBar';
import PostItem from './PostFlow/PostItem';
import Entypo from 'react-native-vector-icons/Entypo';
import {colors} from '../../../common/colors';
import {textFontFace} from '../../../common/styles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const Home = () => {
  const dispatch = useDispatch();
  const nav = useNavigation();

  const allPosts = useSelector(({main}) => main.allPosts);
  const userDetails = useSelector(({main}) => main.userDetails);

  const commentRef = useRef(null);

  const [keyCord, setKeyCord] = useState(1);

  useEffect(() => {
    LOG('all post in home screen :', allPosts);
    LOG('userDetails in home screen :', userDetails);
  }, [allPosts]);

  useEffect(() => {}, []);

  useEffect(() => {
    const whileKeyBoardShow = e => {
      LOG('keyboardShowing :', e);
      const yCord = e.endCoordinates.height;
      setKeyCord(yCord);
    };

    const whileKeyboardHide = () => {
      setKeyCord(5);
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

    commentRef.current.open();
  };

  const renderPost = ({item, index}) => (
    <PostItem item={item} index={index} onCommentPress={commentOnPress} />
  );

  return (
    <View style={styles.container}>
      <ActionBar />

      <View style={styles.feedCont}>
        <View style={styles.postFeedCont}>
          <FlatList
            data={allPosts}
            key={(ite, ind) => ind}
            renderItem={renderPost}
            ListHeaderComponent={<View style={styles.storyCont}></View>}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>

      <RBSheet
        // height={Keyboard.isVisible() ? sSize.height : sSize.height / 2}
        height={sSize.height}
        animationType="slide"
        closeOnPressBack
        closeOnPressMask
        // keyboardAvoidingViewEnabled={true}
        ref={commentRef}
        customStyles={{
          container: styles.rbContainer,
          wrapper: styles.rbWrapper,
        }}>
        <View style={styles.commentListContainer}></View>

        <View style={[styles.commentInputView, {bottom: keyCord}]}>
          <TextInput style={styles.commentInput} multiline numberOfLines={4} />
          <TouchableOpacity style={styles.commentSentButton}>
            <Entypo name={'paper-plane'} color={colors.matteWine} size={30} />
          </TouchableOpacity>
        </View>
      </RBSheet>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(128, 128, 128, 0.1)',
  },
  feedCont: {
    flex: 1,
    marginTop: 10,
    // borderWidth: 1,
  },
  postFeedCont: {
    flex: 1,
    margin: 10,
    marginBottom: 0.7,
  },
  storyCont: {
    flex: 1,
    borderWidth: 1,
    height: sSize.width * 0.25,
    marginBottom: 10,
  },

  rbContainer: {
    // borderWidth: 1,
    height: '100%',
    flex: 1,
    alignSelf: 'center',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    padding: 10,
    // justifyContent: 'space-around',
  },
  rbWrapper: {
    // borderWidth: 1,
    backgroundColor: 'rgba(2,2, 3, 0.3)',
  },

  commentListContainer: {
    flex: 1,
    // borderWidth: 1,
  },

  commentInputView: {
    // borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 5,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: colors.matteWine,
    width: '85%',
    borderRadius: 10,
    paddingHorizontal: 10,
    fontFamily: textFontFace,
    color: colors.royalBlue,
  },
  commentSentButton: {
    // borderWidth: 1,
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
