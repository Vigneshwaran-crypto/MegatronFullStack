import {FlatList, Image, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect} from 'react';
import {serverUrl} from '../../../common/constant';
import socket from './SocketIo';
import {LOG, sSize} from '../../../common/utils';
import {useDispatch, useSelector} from 'react-redux';
import {apiCallAndStore} from '../../../redux/middleware';
import {getAllUsers} from '../../../redux/authAction';
import Header from '../../../components/Header';
import {textFontFaceLight} from '../../../common/styles';
import {colors} from '../../../common/colors';
import ChatItem from './ChatItem';

const Chat = () => {
  const dispatch = useDispatch();

  const allUsers = useSelector(({main}) => main.allUsers);
  const userDetails = useSelector(({main}) => main.userDetails);

  const profileImageUrl = `${serverUrl}Users/admin/Desktop/Vignesh/imageBank/${userDetails.profileImage}`;

  useEffect(() => {
    dispatch(apiCallAndStore(getAllUsers({})));

    LOG('allUsers in chat :', allUsers);
  }, []);

  const renderChatItem = ({item, index}) => (
    <ChatItem item={item} index={index} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchView}>
        <View style={styles.profileImageHolder}>
          <Image style={styles.profileImage} source={{uri: profileImageUrl}} />
        </View>
        <TextInput style={styles.searchInput} placeholder="Search" />
      </View>

      <View style={styles.chatListHolder}>
        <FlatList
          data={allUsers}
          key={(ite, ind) => ind}
          renderItem={renderChatItem}
          showsVerticalScrollIndicator={false}
          style={styles.chatList}
        />
      </View>
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.halfTrans,
  },
  searchView: {
    flexDirection: 'row',
    height: sSize.width * 0.2,
    alignItems: 'center',
    paddingHorizontal: 10,
  },

  profileImageHolder: {
    height: sSize.width * 0.12,
    width: sSize.width * 0.12,
    borderRadius: sSize.width * 0.1,
    justifyContent: 'center',
    elevation: 4,
    zIndex: 4,
    shadowColor: colors.white,
    backgroundColor: colors.white,
  },
  profileImage: {
    height: sSize.width * 0.12,
    width: sSize.width * 0.12,
    borderRadius: sSize.width * 0.1,
    resizeMode: 'cover',
  },
  searchInput: {
    borderColor: colors.matteWine,
    flex: 1,
    borderRadius: 20,
    fontFamily: textFontFaceLight,
    color: colors.darkBlue,
    backgroundColor: colors.white,
    elevation: 2,
    zIndex: 2,
    shadowColor: colors.black,
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    marginHorizontal: 15,
  },
  chatListHolder: {
    // borderWidth: 1,
    flex: 1,
  },
  chatList: {
    padding: 10,
  },
});
