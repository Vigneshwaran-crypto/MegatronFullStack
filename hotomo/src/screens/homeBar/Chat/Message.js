import {
  Animated,
  Easing,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {colors} from '../../../common/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import {textFontFace, textFontFaceLight} from '../../../common/styles';
import {LOG, sSize} from '../../../common/utils';
import {serverUrl} from '../../../common/constant';
import io from 'socket.io-client';

const Message = props => {
  const [msg, setMsg] = useState('');

  const [chats, setChats] = useState([]);

  const item = props.route.params.item;

  const keyMoveAnime = useRef(new Animated.ValueXY({x: 0, y: 0})).current;
  const profileImageUrl = `${serverUrl}Users/admin/Desktop/Vignesh/imageBank/${item.profileImage}`;

  useEffect(() => {
    const socket = io('http://172.16.16.17:5000');

    socket.on('chat', msg => {
      LOG('message in client socket :', msg);
      setChats([...chats, msg]);
    });
  }, []);

  useEffect(() => {
    LOG('clicked item :', item);

    const whileKeyBoardShow = e => {
      //   LOG('keyboard movement :', e);

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
    };
  }, []);

  const sentMessage = () => {
    const socket = io('http://172.16.16.17:5000');

    socket.emit('chat', msg);

    Keyboard.dismiss();
    setMsg('');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={null}>
      <View style={styles.container}>
        <View style={styles.userDetailsHolder}>
          <TouchableOpacity style={styles.chatCont}>
            <View style={styles.profileImageHolder}>
              <Image
                style={styles.profileImage}
                source={{uri: profileImageUrl}}
              />
            </View>

            <Text style={styles.userNameText}>{item.userName}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.msgListHolder}></View>

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
    // position: 'absolute',
    // height: '100%',
    // width: '100%',
  },

  userDetailsHolder: {
    // flex: 0.1,
    position: 'absolute',
    width: '100%',
    top: 0,
    // borderWidth: 1,
  },

  chatCont: {
    flexDirection: 'row',
    // flex: 1,
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 10,
    borderRadius: 10,
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
    // borderWidth: 1,
  },
  commentInputView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 5,
    // backgroundColor: colors.white,

    position: 'absolute',
    bottom: 10,
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
    // alignSelf: 'center',
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
