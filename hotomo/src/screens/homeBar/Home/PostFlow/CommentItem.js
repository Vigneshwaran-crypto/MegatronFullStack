import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {
  textFontFace,
  textFontFaceLight,
  textFontFaceMedium,
} from '../../../../common/styles';
import {colors} from '../../../../common/colors';
import {sSize} from '../../../../common/utils';
import {serverUrl} from '../../../../common/constant';
import moment from 'moment';

const CommentItem = ({item, index}) => {
  const userDetails = useSelector(({main}) => main.userDetails);

  const userImage = `${serverUrl}Users/admin/Desktop/Vignesh/imageBank/${item.userImage}`;

  const fromNow = moment(item.updatedAt).startOf('minutes').fromNow();

  //   .slice(0, 1) + 'h'

  return (
    <View style={styles.container}>
      <View style={styles.commentCont}>
        <View style={styles.userImageCont}>
          <Image source={{uri: userImage}} style={styles.userImage} />
        </View>

        <View style={styles.commentTextView}>
          <View style={styles.userNameView}>
            <Text style={styles.userNameText} adjustsFontSizeToFit>
              {item.userName}
            </Text>
            <Text style={styles.timeText}>{fromNow}</Text>
          </View>

          <Text style={styles.commentText}>{item.comment}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  commentCont: {
    padding: 5,
    marginVertical: 3,
    flexDirection: 'row',
    height: 'auto',
    alignSelf: 'flex-start',
  },
  userImageCont: {
    height: sSize.width * 0.1,
    width: sSize.width * 0.1,
    borderRadius: sSize.width * 0.05,
    justifyContent: 'center',
  },
  userImage: {
    height: sSize.width * 0.1,
    width: sSize.width * 0.1,
    borderRadius: sSize.width * 0.05,
  },
  commentTextView: {
    alignSelf: 'flex-end',
    padding: 5,
    paddingHorizontal: 6,
    width: '70%',
  },
  userNameView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userNameText: {
    fontFamily: textFontFaceMedium,
    color: colors.darkBlue,
    fontSize: sSize.width * 0.033,
  },
  timeText: {
    fontFamily: textFontFace,
    color: colors.black,
    marginHorizontal: 10,
    fontSize: sSize.width * 0.024,
    alignSelf: 'center',
  },
  commentText: {
    fontFamily: textFontFaceLight,
    color: colors.matteBlack,
    fontSize: sSize.width * 0.033,
    lineHeight: 13,
    marginTop: 5,
    marginStart: 5,
  },
});

export default CommentItem;
