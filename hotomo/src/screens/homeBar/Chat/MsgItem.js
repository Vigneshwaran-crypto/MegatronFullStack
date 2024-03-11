import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {textFontFace, textFontFaceLight} from '../../../common/styles';
import {colors} from '../../../common/colors';
import {sSize} from '../../../common/utils';
import {useSelector} from 'react-redux';
import moment from 'moment';

const MsgItem = ({item, index}) => {
  const userDetails = useSelector(({main}) => main.userDetails);

  const isYours = userDetails._id === item.senderId ? true : false;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.msgHolder,
          {
            alignSelf: isYours ? 'flex-end' : 'flex-start',
            alignItems: isYours ? 'flex-end' : 'flex-start',
            backgroundColor: isYours ? '#e3f1e2' : '#F3F3F3',
          },
        ]}>
        <Text style={styles.msgText}>{item.msg}</Text>
        <Text style={styles.dateText}>
          {moment(item.updateAt).format('LT')}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 2,
  },
  msgHolder: {
    flex: 1,
    paddingHorizontal: 15,
    marginHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
    elevation: 5,
    zIndex: 5,
    shadowColor: colors.black,
  },
  msgText: {
    fontFamily: textFontFace,
    color: colors.darkBlue,
    fontSize: sSize.width * 0.035,
    minWidth: '30%',
    maxWidth: '90%',
    lineHeight: 16,
  },
  dateText: {
    fontFamily: textFontFaceLight,
    color: colors.darkGrey,
    fontSize: sSize.width * 0.025,
  },
});

export default MsgItem;
