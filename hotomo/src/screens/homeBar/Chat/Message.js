import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Easing,
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {useDispatch, useSelector} from 'react-redux';
import io from 'socket.io-client';
import {colors} from '../../../common/colors';
import {serverUrl} from '../../../common/constant';
import {textFontFace, textFontFaceLight} from '../../../common/styles';
import {LOG, sSize} from '../../../common/utils';
import {clearChats} from '../../../redux/authAction';
import {apiCallAndStore} from '../../../redux/middleware';
import MsgItem from './MsgItem';

const Message = props => {
  const dispatch = useDispatch();
  const item = props.route.params.item;

  const profileImageUrl = `${serverUrl}Users/admin/Desktop/Vignesh/imageBank/${item.profileImage}`;
  const userDetails = useSelector(({main}) => main.userDetails);
  const allChats = useSelector(({main}) => main.allChats);

  const msgListRef = useRef(null);

  const keyMoveAnime = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const [msg, setMsg] = useState('');
  const [chats, setChats] = useState([]);

  const [lastMsg, setLastMsg] = useState({});

  let curOff = 0;

  const pans = useRef(new Animated.ValueXY()).current;

  useEffect(() => {
    LOG('all chanet in msg screen :', allChats);
  }, [allChats]);

  useEffect(() => {
    if (allChats.length !== 0) {
      setChats(allChats);
    }
  }, [allChats]);

  useEffect(() => {
    if (Object.keys(lastMsg).length !== 0) {
      setChats([...chats, lastMsg]);
    }
  }, [lastMsg]);

  useEffect(() => {
    msgListRef.current.scrollToEnd({animated: true});
    LOG('clicked user in chatBox :', item);

    const socket = io('http://172.16.16.17:5000');

    socket.on('chat', msgs => {
      LOG('message in client socket :', msgs);
      userMessages(msgs);
    });
  }, []);

  const userMessages = msg => {
    if (
      (msg.senderId === userDetails._id && msg.receiverId === item._id) ||
      (msg.senderId === item._id && msg.receiverId === userDetails._id)
    ) {
      setLastMsg(msg);
    }
  };

  useEffect(() => {
    LOG('changed chats :', chats);
  }, [chats]);

  useEffect(() => {
    LOG('clicked item :', item);

    const whileKeyBoardShow = e => {
      Animated.timing(keyMoveAnime, {
        toValue: {x: 0, y: -5},
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
      dispatch(apiCallAndStore(clearChats()));
    };
  }, []);

  const sentMessage = () => {
    if (msg) {
      const socket = io('http://172.16.16.17:5000');

      const msgReq = {
        senderId: userDetails._id,
        receiverId: item._id,
        msg,
        updatedAt: new Date(),
      };

      socket.emit('chat', msgReq);

      Keyboard.dismiss();
      setMsg('');
    }
  };

  const messageItemRender = ({item, index}) => (
    <MsgItem item={item} index={index} />
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior={null}>
      <View style={styles.container}>
        <View style={styles.userDetailsHolder}>
          <View style={styles.chatCont}>
            <View style={styles.profileImageHolder}>
              <Animated.Image
                style={[
                  styles.profileImage,
                  {
                    transform: [
                      {
                        translateY: pans.y.interpolate({
                          inputRange: [-1000, 0],
                          outputRange: [-100, 0],
                          extrapolate: 'clamp',
                        }),
                      },
                      {
                        scale: pans.y.interpolate({
                          inputRange: [-1000, 0],
                          outputRange: [20, 1],
                          extrapolate: 'clamp',
                        }),
                      },
                    ],
                  },
                ]}
                source={{uri: profileImageUrl}}
              />
            </View>

            <Text style={styles.userNameText}>{item.userName}</Text>
          </View>
        </View>

        <View style={styles.msgListHolder}>
          <FlatList
            data={chats}
            ref={msgListRef}
            // onScroll={e => {
            //   LOG(e.nativeEvent.contentOffset.y);
            //   let dir = e.nativeEvent.contentOffset.y > curOff ? 'down' : 'up';
            //   curOff = e.nativeEvent.contentOffset.y;
            //   LOG('scroll direction :', dir);
            // }}

            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {y: pans.y}}}],
              {
                useNativeDriver: false,
              },
            )}
            onContentSizeChange={() => msgListRef.current.scrollToEnd()}
            renderItem={messageItemRender}
            key={(ite, ind) => ind}
            keyExtractor={({item, index}) => index}
          />
        </View>

        <Animated.View
          style={[
            styles.commentInputView,
            {transform: [{translateY: keyMoveAnime.y}]},
          ]}>
          <TextInput
            placeholder="Write message"
            style={styles.commentInput}
            multiline
            numberOfLines={4}
            onChangeText={setMsg}
            value={msg}
          />
          <TouchableOpacity
            style={styles.commentSentButton}
            onPress={sentMessage}>
            <Entypo name={'paper-plane'} color={colors.royalBlue} size={30} />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  userDetailsHolder: {
    elevation: 20,
    zIndex: 20,
    shadowColor: colors.black,
  },

  chatCont: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    elevation: 20,
    zIndex: 20,
    shadowColor: colors.black,
    padding: 10,
  },

  userNameText: {
    fontFamily: textFontFace,
    color: colors.darkBlue,
    marginStart: 12,
  },

  profileImageHolder: {
    height: sSize.width * 0.12,
    width: sSize.width * 0.12,
    borderRadius: sSize.width * 0.1,
    justifyContent: 'center',
    elevation: 4,
    zIndex: 4,
    shadowColor: colors.black,
    backgroundColor: colors.white,
  },
  profileImage: {
    height: sSize.width * 0.12,
    width: sSize.width * 0.12,
    borderRadius: sSize.width * 0.1,
    resizeMode: 'cover',
  },

  msgListHolder: {
    flex: 1,
    backgroundColor: colors.halfTrans,
    marginVertical: 2,
  },
  commentInputView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 5,
    paddingBottom: 10,
  },
  commentInput: {
    borderWidth: 1,
    borderColor: colors.royalBlue,
    width: '85%',
    borderRadius: 10,
    paddingHorizontal: 10,
    fontFamily: textFontFace,
    color: colors.royalBlue,
    marginStart: 10,
    backgroundColor: colors.white,
  },
  commentSentButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentEmptyText: {
    fontFamily: textFontFaceLight,
    color: colors.darkBlue,
    alignSelf: 'center',
  },
});

export default Message;
