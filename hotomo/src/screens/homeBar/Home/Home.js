import {useFocusEffect, useNavigation} from '@react-navigation/native';
import React, {useCallback, useEffect} from 'react';
import {Alert, BackHandler, FlatList, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ActionBar from '../../../components/ActionBar';
import {LOG, globalExitAlert, sSize} from '../../../common/utils';
import PostItem from './PostFlow/PostItem';
import {colors} from '../../../common/colors';

const Home = () => {
  const dispatch = useDispatch();
  const nav = useNavigation();

  const allPosts = useSelector(({main}) => main.allPosts);
  const userDetails = useSelector(({main}) => main.userDetails);

  useEffect(() => {
    LOG('all post in home screen :', allPosts);
    LOG('userDetails in home screen :', userDetails);
  }, [allPosts]);

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

  const renderPost = ({item, index}) => <PostItem item={item} index={index} />;

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
});
